/**
 * Dev-only convenience: boots an in-memory MongoDB, seeds an admin user and
 * migrates the transcribed site content into it, then starts the API server
 * against that database and keeps running. Lets you run the full stack
 * locally without real MongoDB Atlas/Cloudinary credentials yet.
 *
 * Run with: npm run dev:memdb
 */
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.MONGODB_URI ??= "mongodb://placeholder";
process.env.JWT_SECRET ??= "dev-only-secret-dev-only-secret-dev-only";
process.env.FRONTEND_ORIGIN ??= "http://localhost:8090";
process.env.CLOUDINARY_CLOUD_NAME ??= "dev";
process.env.CLOUDINARY_API_KEY ??= "dev";
process.env.CLOUDINARY_API_SECRET ??= "dev";
process.env.ADMIN_SEED_EMAIL ??= "admin@example.com";
process.env.ADMIN_SEED_PASSWORD ??= "dev-password-123";
process.env.ADMIN_SEED_NAME ??= "Dev Admin";

async function main() {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  console.log(`In-memory MongoDB running at ${mongod.getUri()}`);

  const { connectToDatabase } = await import("./../db/connect.js");
  await connectToDatabase();

  const bcrypt = (await import("bcryptjs")).default;
  const { AdminUser } = await import("../models/AdminUser.js");
  await AdminUser.create({
    email: process.env.ADMIN_SEED_EMAIL!.toLowerCase(),
    name: process.env.ADMIN_SEED_NAME!,
    passwordHash: await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD!, 12),
  });
  console.log(`Seeded admin: ${process.env.ADMIN_SEED_EMAIL} / ${process.env.ADMIN_SEED_PASSWORD}`);

  const { allPageSeeds } = await import("./seed-data/pages/index.js");
  const { navigationMenuSeed } = await import("./seed-data/navigation-menu.seed.js");
  const { siteSettingsSeed } = await import("./seed-data/site-settings.seed.js");
  const { contentFragmentsSeed } = await import("./seed-data/content-fragments.seed.js");
  const { Page } = await import("../models/Page.js");
  const { NavigationMenu } = await import("../models/NavigationMenu.js");
  const { SiteSettings } = await import("../models/SiteSettings.js");
  const { ContentFragment } = await import("../models/ContentFragment.js");

  for (const seed of allPageSeeds) {
    await Page.findOneAndUpdate(
      { slug: seed.slug },
      {
        $set: {
          slug: seed.slug,
          title: seed.title,
          seo: seed.seo ?? {},
          status: "published",
          sections: seed.sections.map((section, index) => ({
            type: section.type,
            order: index,
            visible: true,
            data: section.data,
          })),
        },
      },
      { upsert: true },
    );
  }
  await NavigationMenu.findOneAndUpdate(
    { key: "main" },
    {
      $set: {
        key: "main",
        items: navigationMenuSeed.items,
        ctaButton: navigationMenuSeed.ctaButton,
      },
    },
    { upsert: true },
  );
  await SiteSettings.findOneAndUpdate(
    { key: "default" },
    {
      $set: {
        key: "default",
        contact: siteSettingsSeed.contact,
        social: siteSettingsSeed.social,
        footer: {
          navLinks: siteSettingsSeed.footer.navLinks,
          accreditationLogos: siteSettingsSeed.footer.accreditationLogos.map((l) => ({
            alt: l.alt,
            order: l.order,
          })),
        },
        seoDefaults: siteSettingsSeed.seoDefaults,
      },
    },
    { upsert: true },
  );
  for (const fragment of contentFragmentsSeed) {
    await ContentFragment.findOneAndUpdate(
      { key: fragment.key },
      { $set: { key: fragment.key, type: fragment.type, data: fragment.data } },
      { upsert: true },
    );
  }
  console.log(`Migrated ${allPageSeeds.length} pages + navigation + settings + fragments.`);

  const { default: app } = await import("../app.js");
  const port = Number(process.env.PORT ?? 4000);
  app.listen(port, () => {
    console.log(`SEBWA API (dev, in-memory DB) listening on http://localhost:${port}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
