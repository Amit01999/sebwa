import type { Request, Response } from "express";
import { SiteSettings } from "../models/SiteSettings.js";
import { resolveMediaUrls } from "../services/mediaResolve.service.js";
import { ok } from "../utils/apiResponse.js";

async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne({ key: "default" });
  if (!settings) settings = await SiteSettings.create({ key: "default" });
  return settings;
}

export async function getSettings(req: Request, res: Response) {
  // .lean() here, not the shared getOrCreateSettings() — resolveMediaUrls
  // recursively walks the object looking for media ids, and doing that over
  // a live Mongoose document (rather than a plain object) walks into its
  // internal circular references (parent/schema back-references) and blows
  // the call stack.
  let settings = await SiteSettings.findOne({ key: "default" }).lean();
  if (!settings) {
    settings = (await SiteSettings.create({ key: "default" })).toObject();
  }

  return ok(
    res,
    await resolveMediaUrls({
      contact: settings.contact,
      social: settings.social,
      footer: settings.footer,
      seoDefaults: settings.seoDefaults,
    }),
  );
}

export async function getSettingsAdmin(req: Request, res: Response) {
  const settings = await getOrCreateSettings();
  return ok(res, { settings });
}

export async function updateSettings(req: Request, res: Response) {
  const body = req.body;
  const settings = await SiteSettings.findOneAndUpdate(
    { key: "default" },
    { $set: body },
    { new: true, upsert: true },
  );
  return ok(res, { settings });
}
