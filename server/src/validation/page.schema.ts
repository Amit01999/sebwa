import { z } from "zod";

export const slugParamSchema = z.object({
  slug: z.string().min(1),
});

export const updatePageMetaSchema = z.object({
  title: z.string().min(1).optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: z.string().optional(),
    })
    .optional(),
  status: z.enum(["draft", "published"]).optional(),
});
