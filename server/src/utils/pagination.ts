import type { Request } from "express";

export function parsePagination(
  req: Request,
  defaults: { limit?: number; maxLimit?: number } = {},
) {
  const page = Math.max(1, Number.parseInt(String(req.query.page ?? "1"), 10) || 1);
  const fallbackLimit = defaults.limit ?? 20;
  const parsedLimit = Number.parseInt(String(req.query.limit ?? String(fallbackLimit)), 10);
  const limit = Math.min(defaults.maxLimit ?? 100, Math.max(1, parsedLimit || fallbackLimit));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
