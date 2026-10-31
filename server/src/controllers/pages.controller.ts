import type { Request, Response } from "express";
import { Page } from "../models/Page.js";
import { sectionDataSchemaByType, type Section } from "../validation/section.schema.js";
import { resolveMediaUrls } from "../services/mediaResolve.service.js";
import { ok, fail } from "../utils/apiResponse.js";

export async function getPublicPage(req: Request, res: Response) {
  const { slug } = req.params;
  const page = await Page.findOne({ slug, status: "published" }).lean();
  if (!page) return fail(res, 404, "Page not found");
  return ok(res, { page: await resolveMediaUrls(page) });
}

export async function listPages(req: Request, res: Response) {
  const pages = await Page.find({}, { slug: 1, title: 1, status: 1, updatedAt: 1 })
    .sort({ title: 1 })
    .lean();
  return ok(res, { pages });
}

export async function getPageAdmin(req: Request, res: Response) {
  const { slug } = req.params;
  const page = await Page.findOne({ slug }).lean();
  if (!page) return fail(res, 404, "Page not found");
  return ok(res, { page });
}

export async function updatePageMeta(req: Request, res: Response) {
  const { slug } = req.params;
  const { title, seo, status } = req.body as {
    title?: string;
    seo?: { title?: string; description?: string; ogImage?: string };
    status?: "draft" | "published";
  };

  const update: Record<string, unknown> = {};
  if (title !== undefined) update.title = title;
  if (status !== undefined) update.status = status;
  if (seo !== undefined) {
    if (seo.title !== undefined) update["seo.title"] = seo.title;
    if (seo.description !== undefined) update["seo.description"] = seo.description;
    if (seo.ogImage !== undefined) update["seo.ogImage"] = seo.ogImage;
  }
  update.updatedBy = req.admin!.id;

  const page = await Page.findOneAndUpdate({ slug }, { $set: update }, { new: true });
  if (!page) return fail(res, 404, "Page not found");
  return ok(res, { page });
}

export async function addSection(req: Request, res: Response) {
  const { slug } = req.params;
  const section = req.body as Section;

  const page = await Page.findOne({ slug });
  if (!page) return fail(res, 404, "Page not found");

  const maxOrder = page.sections.reduce((max, s) => Math.max(max, s.order), -1);
  page.sections.push({ ...section, order: maxOrder + 1 });
  page.updatedBy = req.admin!.id as never;
  await page.save();

  return ok(res, { page }, 201);
}

export async function updateSection(req: Request, res: Response) {
  const { slug, sectionId } = req.params;
  const { data, visible } = req.body as { data?: unknown; visible?: boolean };

  const page = await Page.findOne({ slug });
  if (!page) return fail(res, 404, "Page not found");

  const section = page.sections.find((s) => String(s._id) === sectionId);
  if (!section) return fail(res, 404, "Section not found");

  if (data !== undefined) {
    const schema = sectionDataSchemaByType[section.type as Section["type"]];
    const result = schema.safeParse(data);
    if (!result.success) return fail(res, 400, "Invalid section data", result.error.flatten());
    section.data = result.data;
  }
  if (visible !== undefined) section.visible = visible;

  page.updatedBy = req.admin!.id as never;
  await page.save();

  return ok(res, { page });
}

export async function reorderSections(req: Request, res: Response) {
  const { slug } = req.params;
  const { order } = req.body as { order: string[] };

  const page = await Page.findOne({ slug });
  if (!page) return fail(res, 404, "Page not found");

  const bySectionId = new Map(order.map((id, index) => [id, index]));
  for (const section of page.sections) {
    const newOrder = bySectionId.get(String(section._id));
    if (newOrder !== undefined) section.order = newOrder;
  }
  page.sections.sort((a, b) => a.order - b.order);
  page.updatedBy = req.admin!.id as never;
  await page.save();

  return ok(res, { page });
}

export async function deleteSection(req: Request, res: Response) {
  const { slug, sectionId } = req.params;

  const page = await Page.findOne({ slug });
  if (!page) return fail(res, 404, "Page not found");

  const before = page.sections.length;
  page.sections = page.sections.filter((s) => String(s._id) !== sectionId) as typeof page.sections;
  if (page.sections.length === before) return fail(res, 404, "Section not found");

  page.updatedBy = req.admin!.id as never;
  await page.save();

  return ok(res, { page });
}
