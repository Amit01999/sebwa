# SEBWA

Public marketing site + admin CMS for SEBWA (Sunshine Education Bangladesh WACE Australia).

- **`/` (this directory)** — public TanStack Start frontend, including the admin dashboard at `/admin`. Content is fetched from the API at build/request time; nothing is hardcoded.
- **`server/`** — Express + MongoDB + Cloudinary API backend, deployed as a **separate** Vercel project. See [`server/README.md`](server/README.md) for backend-specific setup and deployment.

## Local development

Two servers, two terminals:

```bash
# terminal 1 — backend (either real credentials via .env, or a throwaway in-memory DB)
cd server
npm install
npm run dev:memdb     # no credentials needed, resets on restart — OR: npm run dev with a real .env

# terminal 2 — frontend
npm install
npm run dev
```

Copy `.env.example` to `.env` at the repo root first (`VITE_API_BASE_URL`, pointing at wherever the backend is running — `http://localhost:4000` by default).

Log into the admin dashboard at `/admin/login`. Using `npm run dev:memdb`, the seeded credentials are `admin@example.com` / `dev-password-123`.

## Deployment

Two **separate** Vercel projects, linked only by environment variables (no shared build, no proxy/rewrite):

1. **Frontend** (this directory, repo root) — deploys as-is via its existing Nitro/Vercel build. Set `VITE_API_BASE_URL` to the backend project's deployed URL.
2. **Backend** (`server/`) — new Vercel project, Root Directory `server/`. Set `FRONTEND_ORIGIN` to this frontend project's deployed URL, plus `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`. See [`server/README.md`](server/README.md) for the full list and setup steps.

Neither project needs to know about the other's build — they communicate purely over HTTP using the URLs above, with CORS + cookie auth (`SameSite=None; Secure` in production) handling cross-origin requests.

### What you still need to do yourself

This repo does not and cannot provision third-party accounts on your behalf:

- Create a MongoDB Atlas cluster (or point `MONGODB_URI` at any MongoDB-compatible database) and run `npm run seed:admin && npm run seed:media && npm run migrate` in `server/` against it once.
- Create a Cloudinary account for image hosting.
- Create the two Vercel projects and wire up the environment variables above.

## Implemented features

- Full admin dashboard (`/admin`) — dashboard overview, page/section editor for all 19 public pages, navigation menu editor, site settings (contact/social/footer/accreditation), media library with Cloudinary upload and reference-checked delete, a shared course-availability table editor, form submissions/inquiries management (search/filter/status/notes/CSV export), and admin user management.
- Secure admin auth: JWT in an httpOnly cookie, bcrypt password hashing, CSRF protection, login rate limiting, CORS locked to the configured frontend origin.
- Every public page's content (text, images, navigation, footer, video embeds, the WACE/WAM course-availability table) is served from MongoDB via the API, not hardcoded — edits made in the admin dashboard appear on the public site immediately, no redeploy needed.
- All 4 of the site's forms (contact, and the 3 duplicated "lead" forms) submit for real to the backend, are validated server-side, get a unique reference id, and appear in the admin Submissions screen.
- A one-time migration script transcribes the site's original hardcoded content into the exact same database shape, so cutover is a no-visible-change event.

## Known limitations

- **Migration has not been run against real infrastructure yet.** `npm run migrate`/`seed:media` were verified against an in-memory MongoDB during development (including a full browser-driven pass: logging in, editing a section, confirming the public page updates); they have not yet been run against a real MongoDB Atlas cluster or a real Cloudinary account, because this repo doesn't have credentials for either. Do this as the first step before going live (see above).
- **No automated test suite.** Verification so far is a backend smoke-test script (`server/npm run smoke`) plus manual/scripted browser testing during development. Worth adding if ongoing changes are expected.
- **Deployment has not been exercised against real Vercel projects.** The architecture (two separate projects, env-var-only coupling) is designed for this, and each half builds/typechecks/lints cleanly, but the actual Vercel deploy — and therefore things like production cold-start latency — hasn't been tested end-to-end yet.
- **Media reference-checking on delete is best-effort**, not a relational guarantee (see `server/README.md`'s architecture notes).
