import { Page } from "../models/Page.js";
import { SiteSettings } from "../models/SiteSettings.js";

/**
 * Best-effort reverse scan: `Section.data` is schema-less JSON, so rather than
 * tracking a relational foreign key we just walk every value looking for the
 * asset id as a string. This catches the common cases (an id stored directly,
 * or nested inside an array of blocks) but is not a guarantee for every
 * possible future shape — callers must still offer a `force` override.
 */
function deepContainsId(value: unknown, id: string): boolean {
  if (value == null) return false;
  if (typeof value === "string") return value === id;
  if (Array.isArray(value)) return value.some((item) => deepContainsId(item, id));
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((v) => deepContainsId(v, id));
  }
  return false;
}

export type MediaReference =
  { kind: "page"; slug: string; title: string } | { kind: "siteSettings" };

export async function findMediaReferences(mediaAssetId: string): Promise<MediaReference[]> {
  const references: MediaReference[] = [];

  const pages = await Page.find({}, { slug: 1, title: 1, sections: 1, seo: 1 }).lean();
  for (const page of pages) {
    const inSections = deepContainsId(page.sections, mediaAssetId);
    const inSeo = page.seo?.ogImage ? String(page.seo.ogImage) === mediaAssetId : false;
    if (inSections || inSeo) {
      references.push({ kind: "page", slug: page.slug, title: page.title });
    }
  }

  const settings = await SiteSettings.findOne({ key: "default" }).lean();
  if (settings && deepContainsId(settings, mediaAssetId)) {
    references.push({ kind: "siteSettings" });
  }

  return references;
}
