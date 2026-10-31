import type { Request, Response } from "express";
import { ContentFragment } from "../models/ContentFragment.js";
import { ok, fail } from "../utils/apiResponse.js";

export async function listFragments(req: Request, res: Response) {
  const fragments = await ContentFragment.find().lean();
  return ok(res, { fragments });
}

export async function getFragment(req: Request, res: Response) {
  const { key } = req.params;
  const fragment = await ContentFragment.findOne({ key }).lean();
  if (!fragment) return fail(res, 404, "Fragment not found");
  return ok(res, { fragment });
}

export async function upsertFragment(req: Request, res: Response) {
  const { key } = req.params;
  const { type, data } = req.body as { type: "courseTable"; data: unknown };

  const fragment = await ContentFragment.findOneAndUpdate(
    { key },
    { $set: { key, type, data } },
    { new: true, upsert: true },
  );

  return ok(res, { fragment });
}
