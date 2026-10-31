import type { Request, Response } from "express";
import { MediaAsset } from "../models/MediaAsset.js";
import { uploadBuffer, destroyAsset } from "../services/cloudinary.service.js";
import { findMediaReferences } from "../services/mediaReference.service.js";
import { parsePagination } from "../utils/pagination.js";
import { ok, fail } from "../utils/apiResponse.js";

export async function listMedia(req: Request, res: Response) {
  const { search, tag } = req.query as { search?: string; tag?: string };
  const { page, limit, skip } = parsePagination(req, { limit: 24, maxLimit: 100 });

  const filter: Record<string, unknown> = {};
  if (tag) filter.tags = tag;
  if (search) filter.altText = { $regex: search, $options: "i" };

  const [items, total] = await Promise.all([
    MediaAsset.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    MediaAsset.countDocuments(filter),
  ]);

  return ok(res, { items, total, page, limit });
}

export async function uploadMedia(req: Request, res: Response) {
  if (!req.file) return fail(res, 400, "No file provided");

  const { altText, tags } = req.body as { altText?: string; tags?: string[] };
  const result = await uploadBuffer(req.file.buffer, { folder: "sebwa" });

  const asset = await MediaAsset.create({
    publicId: result.public_id,
    url: result.secure_url,
    resourceType: result.resource_type === "video" ? "video" : "image",
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    altText: altText ?? "",
    tags: tags ?? [],
    createdBy: req.admin!.id,
  });

  return ok(res, { asset }, 201);
}

export async function updateMedia(req: Request, res: Response) {
  const { id } = req.params;
  const { altText, tags } = req.body as { altText?: string; tags?: string[] };

  const update: Record<string, unknown> = {};
  if (altText !== undefined) update.altText = altText;
  if (tags !== undefined) update.tags = tags;

  const asset = await MediaAsset.findByIdAndUpdate(id, update, { new: true });
  if (!asset) return fail(res, 404, "Media asset not found");
  return ok(res, { asset });
}

export async function deleteMedia(req: Request, res: Response) {
  const { id } = req.params;
  const force = req.query.force === "true";

  const asset = await MediaAsset.findById(id);
  if (!asset) return fail(res, 404, "Media asset not found");

  if (!force) {
    const references = await findMediaReferences(String(asset._id));
    if (references.length > 0) {
      return fail(res, 409, "This media asset is still used elsewhere", {
        referencedBy: references,
      });
    }
  }

  await destroyAsset(asset.publicId);
  await asset.deleteOne();

  return ok(res, null);
}
