import { MediaAsset } from "../../models/MediaAsset.js";

/**
 * Looks up a MediaAsset by its stable seed tag (set by seedMedia.ts) and
 * returns its real _id as a string. If no matching asset exists yet (e.g.
 * seedMedia.ts hasn't been run against real Cloudinary credentials), the
 * tag string itself is returned unchanged so migrateContent.ts can still
 * run safely against an empty/no-media database.
 */
export async function resolveMediaTag(tag: string): Promise<string> {
  if (!tag.startsWith("seed:")) return tag;
  const asset = await MediaAsset.findOne({ tags: tag }).lean();
  return asset ? String(asset._id) : tag;
}
