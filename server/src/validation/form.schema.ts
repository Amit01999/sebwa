import { z } from "zod";

export const submitFormSchema = z.object({
  formType: z.enum(["contact", "lead"]),
  pageSlug: z.string().min(1),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  fields: z.record(z.string(), z.string().max(5000)).default({}),
});

export const listSubmissionsQuerySchema = z.object({
  status: z.enum(["new", "in_progress", "resolved"]).optional(),
  formType: z.enum(["contact", "lead"]).optional(),
  search: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.string().optional(),
});

export const updateSubmissionStatusSchema = z.object({
  status: z.enum(["new", "in_progress", "resolved"]),
});

export const addSubmissionNoteSchema = z.object({
  text: z.string().min(1).max(2000),
});
