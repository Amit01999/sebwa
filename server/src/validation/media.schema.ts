import { z } from "zod";

export const listMediaQuerySchema = z.object({
  search: z.string().optional(),
  tag: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export const uploadMediaBodySchema = z.object({
  altText: z.string().optional(),
  tags: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((value) => (Array.isArray(value) ? value : value ? [value] : [])),
});

export const updateMediaSchema = z.object({
  altText: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const deleteMediaQuerySchema = z.object({
  force: z.string().optional(),
});
