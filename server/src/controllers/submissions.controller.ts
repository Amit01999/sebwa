import type { Request, Response } from "express";
import { FormSubmission } from "../models/FormSubmission.js";
import { parsePagination } from "../utils/pagination.js";
import { ok, fail } from "../utils/apiResponse.js";

function buildFilter(query: Record<string, unknown>) {
  const filter: Record<string, unknown> = {};
  if (query.status) filter.status = query.status;
  if (query.formType) filter.formType = query.formType;
  if (query.search) {
    const regex = { $regex: String(query.search), $options: "i" };
    filter.$or = [{ name: regex }, { email: regex }, { referenceId: regex }];
  }
  return filter;
}

export async function listSubmissions(req: Request, res: Response) {
  const { page, limit, skip } = parsePagination(req, { limit: 20, maxLimit: 100 });
  const filter = buildFilter(req.query as Record<string, unknown>);
  const sort = req.query.sort === "oldest" ? { createdAt: 1 as const } : { createdAt: -1 as const };

  const [items, total] = await Promise.all([
    FormSubmission.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    FormSubmission.countDocuments(filter),
  ]);

  return ok(res, { items, total, page, limit });
}

export async function getSubmission(req: Request, res: Response) {
  const submission = await FormSubmission.findById(req.params.id).lean();
  if (!submission) return fail(res, 404, "Submission not found");
  return ok(res, { submission });
}

export async function updateSubmissionStatus(req: Request, res: Response) {
  const { status } = req.body as { status: "new" | "in_progress" | "resolved" };
  const submission = await FormSubmission.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  );
  if (!submission) return fail(res, 404, "Submission not found");
  return ok(res, { submission });
}

export async function addSubmissionNote(req: Request, res: Response) {
  const { text } = req.body as { text: string };
  const submission = await FormSubmission.findByIdAndUpdate(
    req.params.id,
    { $push: { notes: { text, createdBy: req.admin!.id, createdAt: new Date() } } },
    { new: true },
  );
  if (!submission) return fail(res, 404, "Submission not found");
  return ok(res, { submission });
}

export async function deleteSubmission(req: Request, res: Response) {
  const submission = await FormSubmission.findByIdAndDelete(req.params.id);
  if (!submission) return fail(res, 404, "Submission not found");
  return ok(res, null);
}

function csvEscape(value: unknown): string {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export async function exportSubmissions(req: Request, res: Response) {
  const filter = buildFilter(req.query as Record<string, unknown>);
  const items = await FormSubmission.find(filter).sort({ createdAt: -1 }).lean();

  const headers = [
    "referenceId",
    "formType",
    "pageSlug",
    "name",
    "email",
    "status",
    "createdAt",
    "fields",
  ];
  const rows = items.map((item) =>
    [
      item.referenceId,
      item.formType,
      item.pageSlug,
      item.name,
      item.email,
      item.status,
      (item.createdAt as Date)?.toISOString?.() ?? "",
      JSON.stringify(item.fields ?? {}),
    ]
      .map(csvEscape)
      .join(","),
  );

  const csv = [headers.join(","), ...rows].join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename="submissions-${Date.now()}.csv"`);
  res.send(csv);
}
