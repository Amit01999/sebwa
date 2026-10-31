/**
 * Dev-only smoke test: boots an in-memory MongoDB (no Atlas/Cloudinary
 * credentials needed) and exercises the auth + page CRUD flow end-to-end
 * against the real Express app. Not a replacement for a real test suite —
 * just a fast way to verify the backend works without cloud credentials.
 *
 * Run with: npm run smoke
 */
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.NODE_ENV = "test";
process.env.MONGODB_URI = "mongodb://placeholder"; // overwritten below before any import touches it
process.env.JWT_SECRET = "smoke-test-secret-smoke-test-secret";
process.env.FRONTEND_ORIGIN = "http://localhost:3000";
process.env.CLOUDINARY_CLOUD_NAME = "smoke";
process.env.CLOUDINARY_API_KEY = "smoke";
process.env.CLOUDINARY_API_SECRET = "smoke";
process.env.ADMIN_SEED_EMAIL = "admin@smoke.test";
process.env.ADMIN_SEED_PASSWORD = "smoke-test-password";
process.env.ADMIN_SEED_NAME = "Smoke Admin";

let failures = 0;

function assert(condition: unknown, message: string) {
  if (!condition) {
    failures++;
    console.error(`FAIL: ${message}`);
  } else {
    console.log(`ok:   ${message}`);
  }
}

async function main() {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();

  const { default: app } = await import("../app.js");
  const bcrypt = (await import("bcryptjs")).default;
  const { AdminUser } = await import("../models/AdminUser.js");
  const { connectToDatabase } = await import("../db/connect.js");

  await connectToDatabase();
  await AdminUser.create({
    email: "admin@smoke.test",
    name: "Smoke Admin",
    passwordHash: await bcrypt.hash("smoke-test-password", 12),
  });

  const http = await import("node:http");
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Failed to bind test server");
  const base = `http://127.0.0.1:${address.port}`;

  // --- health check (DB connected) ---
  const health = (await fetch(`${base}/api/health`).then((r) => r.json())) as {
    success: boolean;
    data: { db: string };
  };
  assert(health.success && health.data.db === "connected", "GET /api/health reports connected");

  // --- auth: me without a cookie is rejected ---
  const meNoAuth = await fetch(`${base}/api/admin/auth/me`);
  assert(meNoAuth.status === 401, "GET /api/admin/auth/me without cookie -> 401");

  // --- auth: wrong password rejected ---
  const badLogin = await fetch(`${base}/api/admin/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "admin@smoke.test", password: "wrong-password" }),
  });
  assert(badLogin.status === 401, "POST /api/admin/auth/login with wrong password -> 401");

  // --- auth: correct login succeeds and sets a cookie ---
  const login = await fetch(`${base}/api/admin/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "admin@smoke.test", password: "smoke-test-password" }),
  });
  const loginBody = (await login.json()) as { success: boolean; data: { csrfToken: string } };
  const setCookie = login.headers.get("set-cookie") ?? "";
  assert(
    login.status === 200 && loginBody.success,
    "POST /api/admin/auth/login with correct password -> 200",
  );
  assert(setCookie.includes("sebwa_admin_token="), "login response sets the auth cookie");
  const cookie = setCookie.split(";")[0];
  const csrfToken = loginBody.data.csrfToken;
  assert(
    typeof csrfToken === "string" && csrfToken.length > 0,
    "login response includes a csrfToken",
  );

  // --- auth: /me now succeeds with the cookie ---
  const meAuthed = await fetch(`${base}/api/admin/auth/me`, { headers: { cookie } });
  assert(meAuthed.status === 200, "GET /api/admin/auth/me with cookie -> 200");

  // --- CSRF: mutating request without the header is rejected ---
  const createUserNoCsrf = await fetch(`${base}/api/admin/users`, {
    method: "POST",
    headers: { cookie, "content-type": "application/json" },
    body: JSON.stringify({
      email: "second@smoke.test",
      name: "Second",
      password: "another-password",
    }),
  });
  assert(createUserNoCsrf.status === 403, "POST /api/admin/users without X-CSRF-Token -> 403");

  // --- CSRF: mutating request with the header succeeds ---
  const createUser = await fetch(`${base}/api/admin/users`, {
    method: "POST",
    headers: { cookie, "content-type": "application/json", "x-csrf-token": csrfToken },
    body: JSON.stringify({
      email: "second@smoke.test",
      name: "Second",
      password: "another-password",
    }),
  });
  assert(createUser.status === 201, "POST /api/admin/users with X-CSRF-Token -> 201");

  // --- Page CRUD: create via direct model insert, then exercise the API ---
  const { Page } = await import("../models/Page.js");
  await Page.create({
    slug: "smoke-test-page",
    title: "Smoke Test Page",
    status: "draft",
    sections: [{ type: "pageHero", order: 0, visible: true, data: { title: "Smoke Test Page" } }],
  });

  const publicDraftFetch = await fetch(`${base}/api/pages/smoke-test-page`);
  assert(publicDraftFetch.status === 404, "GET /api/pages/:slug for a draft page -> 404 (public)");

  const adminPageFetch = await fetch(`${base}/api/admin/pages/smoke-test-page`, {
    headers: { cookie },
  });
  const adminPageBody = (await adminPageFetch.json()) as {
    data: { page: { sections: unknown[] } };
  };
  assert(adminPageFetch.status === 200, "GET /api/admin/pages/:slug -> 200 (admin, any status)");

  const publish = await fetch(`${base}/api/admin/pages/smoke-test-page`, {
    method: "PATCH",
    headers: { cookie, "content-type": "application/json", "x-csrf-token": csrfToken },
    body: JSON.stringify({ status: "published" }),
  });
  assert(publish.status === 200, "PATCH /api/admin/pages/:slug {status:published} -> 200");

  const publicPublishedFetch = await fetch(`${base}/api/pages/smoke-test-page`);
  assert(publicPublishedFetch.status === 200, "GET /api/pages/:slug after publish -> 200 (public)");

  const addSection = await fetch(`${base}/api/admin/pages/smoke-test-page/sections`, {
    method: "POST",
    headers: { cookie, "content-type": "application/json", "x-csrf-token": csrfToken },
    body: JSON.stringify({
      type: "richContent",
      data: { intro: "intro", blocks: [{ type: "p", text: "<p>Hello</p>" }] },
    }),
  });
  assert(addSection.status === 201, "POST /api/admin/pages/:slug/sections -> 201");

  // --- Form submission (public, rate-limited route) ---
  const submit = await fetch(`${base}/api/forms/submit`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      formType: "contact",
      pageSlug: "contact-us",
      name: "Smoke Tester",
      email: "tester@smoke.test",
      fields: { subject: "Hello", message: "Test message" },
    }),
  });
  const submitBody = (await submit.json()) as { data: { referenceId: string } };
  assert(
    submit.status === 201 && submitBody.data.referenceId?.startsWith("SEBWA-"),
    "POST /api/forms/submit -> 201 with referenceId",
  );

  const submissionsList = await fetch(`${base}/api/admin/submissions`, { headers: { cookie } });
  const submissionsBody = (await submissionsList.json()) as { data: { total: number } };
  assert(submissionsBody.data.total === 1, "GET /api/admin/submissions sees the new submission");

  // --- Logout clears access ---
  const logout = await fetch(`${base}/api/admin/auth/logout`, {
    method: "POST",
    headers: { cookie },
  });
  assert(logout.status === 200, "POST /api/admin/auth/logout -> 200");

  await new Promise<void>((resolve) => server.close(() => resolve()));
  await mongod.stop();

  if (failures > 0) {
    console.error(`\n${failures} smoke check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll smoke checks passed.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
