import { z } from "zod";

export const updateSettingsSchema = z.object({
  contact: z.object({
    phones: z.array(z.string()).default([]),
    email: z.string().default(""),
    address: z.string().default(""),
    hours: z.string().default(""),
  }),
  social: z.object({
    facebook: z.string().default(""),
    instagram: z.string().default(""),
    youtube: z.string().default(""),
  }),
  footer: z.object({
    navLinks: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
        order: z.number().default(0),
        visible: z.boolean().default(true),
      }),
    ),
    accreditationLogos: z.array(
      z.object({
        mediaAsset: z.string().optional(),
        alt: z.string().default(""),
        order: z.number().default(0),
      }),
    ),
  }),
  seoDefaults: z.object({
    titleSuffix: z.string().default(" — SEBWA"),
    defaultOgImage: z.string().optional(),
  }),
});
