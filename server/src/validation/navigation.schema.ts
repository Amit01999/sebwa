import { z } from "zod";

const navChild = z.object({
  label: z.string().min(1),
  to: z.string().min(1),
  order: z.number().default(0),
});

const navItem = z.object({
  label: z.string().min(1),
  to: z.string().min(1),
  order: z.number().default(0),
  children: z.array(navChild).default([]),
});

export const updateNavigationSchema = z.object({
  items: z.array(navItem),
  ctaButton: z.object({ label: z.string(), to: z.string() }),
});
