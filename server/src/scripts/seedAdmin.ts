import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { connectToDatabase } from "../db/connect.js";
import { AdminUser } from "../models/AdminUser.js";

async function main() {
  if (!env.ADMIN_SEED_EMAIL || !env.ADMIN_SEED_PASSWORD) {
    throw new Error(
      "Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in your .env before running this script.",
    );
  }

  await connectToDatabase();

  const email = env.ADMIN_SEED_EMAIL.toLowerCase();
  const existing = await AdminUser.findOne({ email });
  if (existing) {
    console.log(`Admin user ${email} already exists — skipping.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(env.ADMIN_SEED_PASSWORD, 12);
  await AdminUser.create({
    email,
    name: env.ADMIN_SEED_NAME ?? "Admin",
    passwordHash,
  });

  console.log(`Created admin user ${email}.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
