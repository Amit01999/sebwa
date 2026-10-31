/**
 * Resolves a section/block's image field to a renderable URL. Media fields
 * currently hold a bare MediaAsset id (24-hex Mongo ObjectId) until content
 * is migrated into the database — there's no public "resolve id -> url"
 * endpoint, so a bare id resolves to `undefined` and callers render nothing
 * rather than a broken `<img src="...">`.
 */
export function assetUrl(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") {
    return /^[a-f0-9]{24}$/i.test(value) ? undefined : value;
  }
  if (typeof value === "object" && "url" in (value as Record<string, unknown>)) {
    const url = (value as { url?: unknown }).url;
    return typeof url === "string" ? url : undefined;
  }
  return undefined;
}
