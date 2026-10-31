/**
 * One-time (but safe-to-re-run) migration: upserts the transcribed
 * seed-data into MongoDB so the public site's content is DB-sourced
 * instead of hardcoded, with no visible change on cutover. Resolves any
 * "seed:*" media tags to real Cloudinary-backed MediaAsset ids where
 * seedMedia.ts has already been run; otherwise leaves the tag string in
 * place (safe against an empty/no-media database, just without real
 * images until seedMedia.ts runs against real Cloudinary credentials).
 */
import { connectToDatabase } from "../db/connect.js";
import { Page } from "../models/Page.js";
import { NavigationMenu } from "../models/NavigationMenu.js";
import { SiteSettings } from "../models/SiteSettings.js";
import { ContentFragment } from "../models/ContentFragment.js";
import { MediaAsset } from "../models/MediaAsset.js";
import { resolveMediaTag } from "./seed-data/resolveMedia.js";
import { allPageSeeds } from "./seed-data/pages/index.js";
import { navigationMenuSeed } from "./seed-data/navigation-menu.seed.js";
import { siteSettingsSeed } from "./seed-data/site-settings.seed.js";
import { contentFragmentsSeed } from "./seed-data/content-fragments.seed.js";
import type { PageSeed, RichBlockSeed, SectionSeed } from "./seed-data/types.js";

async function resolveBlocks(blocks: RichBlockSeed[]): Promise<RichBlockSeed[]> {
  const resolved: RichBlockSeed[] = [];
  for (const block of blocks) {
    if (block.type === "image") {
      resolved.push({ ...block, mediaAssetId: await resolveMediaTag(block.mediaAssetId) });
    } else if (block.type === "deflist") {
      const rows = [];
      for (const row of block.rows) {
        rows.push({ ...row, blocks: await resolveBlocks(row.blocks) });
      }
      resolved.push({ ...block, rows });
    } else {
      resolved.push(block);
    }
  }
  return resolved;
}

async function resolveSection(section: SectionSeed): Promise<SectionSeed> {
  switch (section.type) {
    case "hero":
      return {
        ...section,
        data: {
          ...section.data,
          backgroundImage: await resolveMediaTag(section.data.backgroundImage),
        },
      };
    case "programsGrid":
      return {
        ...section,
        data: {
          ...section.data,
          heroImage: await resolveMediaTag(section.data.heroImage),
          icon: await resolveMediaTag(section.data.icon),
        },
      };
    case "universitiesGrid": {
      const rows = [];
      for (const row of section.data.rows) {
        const resolvedRow = [];
        for (const item of row) {
          resolvedRow.push({ ...item, mediaAssetId: await resolveMediaTag(item.mediaAssetId) });
        }
        rows.push(resolvedRow);
      }
      return { ...section, data: { ...section.data, rows } };
    }
    case "richContent":
      return {
        ...section,
        data: { ...section.data, blocks: await resolveBlocks(section.data.blocks) },
      };
    default:
      return section;
  }
}

async function resolvePageSeed(seed: PageSeed): Promise<PageSeed> {
  const sections = [];
  for (const section of seed.sections) {
    sections.push(await resolveSection(section));
  }
  return { ...seed, sections };
}

async function migratePages() {
  for (const seed of allPageSeeds) {
    const resolved = await resolvePageSeed(seed);
    await Page.findOneAndUpdate(
      { slug: resolved.slug },
      {
        $set: {
          slug: resolved.slug,
          title: resolved.title,
          seo: resolved.seo ?? {},
          status: "published",
          sections: resolved.sections.map((section, index) => ({
            type: section.type,
            order: index,
            visible: true,
            data: section.data,
          })),
        },
      },
      { upsert: true },
    );
    console.log(`upserted page: ${resolved.slug}`);
  }
}

async function migrateNavigation() {
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
  console.log("upserted navigation menu");
}

async function migrateSettings() {
  const accreditationLogos = [];
  for (const logo of siteSettingsSeed.footer.accreditationLogos) {
    const resolved = await resolveMediaTag(logo.mediaAssetTag);
    const asset = await MediaAsset.findById(resolved).catch(() => null);
    accreditationLogos.push({
      mediaAsset: asset ? asset._id : undefined,
      alt: logo.alt,
      order: logo.order,
    });
  }

  await SiteSettings.findOneAndUpdate(
    { key: "default" },
    {
      $set: {
        key: "default",
        contact: siteSettingsSeed.contact,
        social: siteSettingsSeed.social,
        footer: { navLinks: siteSettingsSeed.footer.navLinks, accreditationLogos },
        seoDefaults: siteSettingsSeed.seoDefaults,
      },
    },
    { upsert: true },
  );
  console.log("upserted site settings");
}

async function migrateFragments() {
  for (const fragment of contentFragmentsSeed) {
    await ContentFragment.findOneAndUpdate(
      { key: fragment.key },
      { $set: { key: fragment.key, type: fragment.type, data: fragment.data } },
      { upsert: true },
    );
    console.log(`upserted content fragment: ${fragment.key}`);
  }
}

async function main() {
  await connectToDatabase();
  await migratePages();
  await migrateNavigation();
  await migrateSettings();
  await migrateFragments();
  console.log("\nMigration complete.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
