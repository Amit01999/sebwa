import type { Request, Response } from "express";
import { NavigationMenu } from "../models/NavigationMenu.js";
import { ok } from "../utils/apiResponse.js";

async function getOrCreateMenu() {
  let menu = await NavigationMenu.findOne({ key: "main" });
  if (!menu) menu = await NavigationMenu.create({ key: "main" });
  return menu;
}

export async function getNavigation(req: Request, res: Response) {
  const menu = await getOrCreateMenu();
  return ok(res, { items: menu.items, ctaButton: menu.ctaButton });
}

export async function getNavigationAdmin(req: Request, res: Response) {
  const menu = await getOrCreateMenu();
  return ok(res, { navigation: menu });
}

export async function updateNavigation(req: Request, res: Response) {
  const { items, ctaButton } = req.body as { items: unknown; ctaButton: unknown };
  const menu = await NavigationMenu.findOneAndUpdate(
    { key: "main" },
    { $set: { items, ctaButton } },
    { new: true, upsert: true },
  );
  return ok(res, { navigation: menu });
}
