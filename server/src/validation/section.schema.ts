import { z } from "zod";
import { richBlockSchema } from "./richBlock.schema.js";

const heroData = z.object({
  backgroundImage: z.string(),
  eyebrowLines: z.array(z.string()).default([]),
  heading: z.string(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
});

const pageHeroData = z.object({
  title: z.string(),
  crumbLabel: z.string().optional(),
});

const videoRef = z.object({
  provider: z.literal("vimeo"),
  videoId: z.string(),
  // Vimeo's privacy hash, required to embed an unlisted/private video —
  // every video currently on this site needs one or the player shows
  // Vimeo's own "Sorry, we're having a little trouble" error.
  h: z.string().optional(),
  title: z.string().default(""),
});

const aboutData = z.object({
  eyebrow: z.string().optional(),
  lead: z.string(),
  bullets: z.array(z.string()).default([]),
  video: videoRef.optional(),
  closing: z.string().optional(),
});

const programsGridData = z.object({
  heading: z.string(),
  heroImage: z.string(),
  icon: z.string(),
  items: z.array(z.object({ title: z.string(), sub: z.string() })),
});

const whyWaceData = z.object({
  heading: z.string(),
  paragraph: z.string(),
  bullets: z.array(z.string()).default([]),
});

const universitiesGridData = z.object({
  heading: z.string(),
  rows: z.array(z.array(z.object({ mediaAssetId: z.string(), alt: z.string() }))),
});

const ctaData = z.object({
  heading: z.string(),
  ctaLabel: z.string(),
  ctaHref: z.string(),
});

const richContentData = z.object({
  intro: z.string().optional(),
  blocks: z.array(richBlockSchema),
});

const leadFormData = z.object({
  variant: z.enum(["contact", "lead"]),
  heading: z.string().optional(),
  intro: z.string().optional(),
});

function section<Type extends string, Data extends z.ZodType>(type: Type, data: Data) {
  return z.object({
    type: z.literal(type),
    order: z.number().default(0),
    visible: z.boolean().default(true),
    data,
  });
}

export const sectionSchema = z.discriminatedUnion("type", [
  section("hero", heroData),
  section("pageHero", pageHeroData),
  section("about", aboutData),
  section("programsGrid", programsGridData),
  section("whyWace", whyWaceData),
  section("universitiesGrid", universitiesGridData),
  section("cta", ctaData),
  section("richContent", richContentData),
  section("leadForm", leadFormData),
]);

export type Section = z.infer<typeof sectionSchema>;

export const addSectionSchema = sectionSchema;
export const updateSectionSchema = z.object({
  data: z.unknown().optional(),
  visible: z.boolean().optional(),
});
export const reorderSectionsSchema = z.object({
  order: z.array(z.string()),
});

// Looked up by controllers to re-validate `data` on a PATCH, once the
// section's existing `type` has been loaded from the database.
export const sectionDataSchemaByType: Record<Section["type"], z.ZodType> = {
  hero: heroData,
  pageHero: pageHeroData,
  about: aboutData,
  programsGrid: programsGridData,
  whyWace: whyWaceData,
  universitiesGrid: universitiesGridData,
  cta: ctaData,
  richContent: richContentData,
  leadForm: leadFormData,
};
