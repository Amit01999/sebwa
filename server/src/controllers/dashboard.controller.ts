import type { Request, Response } from "express";
import { Page } from "../models/Page.js";
import { MediaAsset } from "../models/MediaAsset.js";
import { FormSubmission } from "../models/FormSubmission.js";
import { ok } from "../utils/apiResponse.js";

export async function getOverview(req: Request, res: Response) {
  const [
    pagesTotal,
    pagesPublished,
    pagesDraft,
    mediaCount,
    submissionsNew,
    submissionsTotal,
    recentSubmissions,
    recentlyUpdatedPages,
  ] = await Promise.all([
    Page.countDocuments(),
    Page.countDocuments({ status: "published" }),
    Page.countDocuments({ status: "draft" }),
    MediaAsset.countDocuments(),
    FormSubmission.countDocuments({ status: "new" }),
    FormSubmission.countDocuments(),
    FormSubmission.find().sort({ createdAt: -1 }).limit(5).lean(),
    Page.find({}, { slug: 1, title: 1, status: 1, updatedAt: 1 })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean(),
  ]);

  return ok(res, {
    pagesTotal,
    pagesPublished,
    pagesDraft,
    mediaCount,
    submissionsNew,
    submissionsTotal,
    recentSubmissions,
    recentlyUpdatedPages,
  });
}
