import { Types } from "mongoose";
import { MediaAsset } from "../models/MediaAsset.js";

/**
 * Section/block/settings fields that hold a MediaAsset id. Closed set,
 * matching the field names used across validation/section.schema.ts,
 * validation/richBlock.schema.ts, and models/Page.ts / SiteSettings.ts.
 *
 * Note: some of these (e.g. `mediaAsset`, `ogImage`, `defaultOgImage`) are
 * declared as real Mongoose ObjectId refs, so even with `.lean()` they come
 * back as `Types.ObjectId` instances, not plain strings — others (e.g.
 * `backgroundImage`, stored inside a schema-less `Mixed` section.data) are
 * plain strings because that's just whatever the admin UI sent. Both are
 * handled the same way below.
 */
const MEDIA_ID_KEYS = new Set([
  "backgroundImage",
  "heroImage",
  "icon",
  "mediaAssetId",
  "mediaAsset",
  "ogImage",
  "defaultOgImage",
]);

const OBJECT_ID_RE = /^[a-f0-9]{24}$/i;

function asIdString(value: unknown): string | null {
  if (typeof value === "string") return OBJECT_ID_RE.test(value) ? value : null;
  if (value instanceof Types.ObjectId) return value.toHexString();
  return null;
}

function collectMediaIds(value: unknown, ids: Set<string>) {
  if (value == null || value instanceof Types.ObjectId) return;
  if (Array.isArray(value)) {
    for (const item of value) collectMediaIds(item, ids);
    return;
  }
  if (typeof value === "object") {
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      if (MEDIA_ID_KEYS.has(key)) {
        const id = asIdString(v);
        if (id) ids.add(id);
      } else {
        collectMediaIds(v, ids);
      }
    }
  }
}

function replaceMediaIds(value: unknown, urlById: Map<string, string>): unknown {
  if (value == null || value instanceof Types.ObjectId) return value;
  if (Array.isArray(value)) return value.map((item) => replaceMediaIds(item, urlById));
  if (typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      if (MEDIA_ID_KEYS.has(key)) {
        const id = asIdString(v);
        result[key] = id && urlById.has(id) ? urlById.get(id) : v;
      } else {
        result[key] = replaceMediaIds(v, urlById);
      }
    }
    return result;
  }
  return value;
}

/**
 * Returns a deep copy of `doc` with every MediaAsset id (stored under one of
 * MEDIA_ID_KEYS, as either a plain string or a Mongoose ObjectId) replaced
 * by that asset's real Cloudinary URL, for public, unauthenticated reads.
 * Does NOT mutate the input or touch the database — stored documents keep
 * raw ids, since the admin UI and the media delete-reference-check both
 * depend on that. `doc` must already be a plain object (e.g. via `.lean()`
 * or `.toObject()`) — walking a live Mongoose document's internal circular
 * references (parent/schema back-references) will blow the call stack.
 */
export async function resolveMediaUrls<T>(doc: T): Promise<T> {
  const ids = new Set<string>();
  collectMediaIds(doc, ids);
  if (ids.size === 0) return doc;

  const assets = await MediaAsset.find({ _id: { $in: [...ids] } }, { url: 1 }).lean();
  if (assets.length === 0) return doc;

  const urlById = new Map(assets.map((asset) => [String(asset._id), asset.url]));
  return replaceMediaIds(doc, urlById) as T;
}
