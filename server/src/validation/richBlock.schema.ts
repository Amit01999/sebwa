import { z } from "zod";

const pBlock = z.object({ type: z.literal("p"), text: z.string() });
const h2Block = z.object({ type: z.literal("h2"), text: z.string() });
const h3Block = z.object({ type: z.literal("h3"), text: z.string() });
const ulBlock = z.object({ type: z.literal("ul"), items: z.array(z.string()) });
const olBlock = z.object({ type: z.literal("ol"), items: z.array(z.string()) });
const quoteBlock = z.object({ type: z.literal("quote"), text: z.string() });
const calloutBlock = z.object({
  type: z.literal("callout"),
  title: z.string().optional(),
  text: z.string(),
});
const tableBlock = z.object({
  type: z.literal("table"),
  headers: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});
const imageBlock = z.object({
  type: z.literal("image"),
  mediaAssetId: z.string(),
  alt: z.string().default(""),
  caption: z.string().optional(),
});
const linkItem = z.object({
  label: z.string(),
  to: z.string(),
  variant: z.enum(["teal", "orange", "outline"]).default("teal"),
});
const linksBlock = z.object({ type: z.literal("links"), items: z.array(linkItem) });
const videoBlock = z.object({
  type: z.literal("video"),
  provider: z.literal("vimeo"),
  videoId: z.string(),
  // Vimeo's privacy hash, required to embed an unlisted/private video —
  // every video currently on this site needs one, see VimeoEmbed.tsx.
  h: z.string().optional(),
  title: z.string().default(""),
});
const courseTableRefBlock = z.object({
  type: z.literal("courseTableRef"),
  fragmentKey: z.string(),
});

// Blocks allowed anywhere, including nested one level inside a `deflist` row.
const baseBlock = z.discriminatedUnion("type", [
  pBlock,
  h2Block,
  h3Block,
  ulBlock,
  olBlock,
  quoteBlock,
  calloutBlock,
  tableBlock,
  imageBlock,
  linksBlock,
  videoBlock,
  courseTableRefBlock,
]);

const deflistBlock = z.object({
  type: z.literal("deflist"),
  rows: z.array(
    z.object({
      title: z.string(),
      blocks: z.array(baseBlock), // one nesting level only — no deflist-in-deflist
    }),
  ),
});

export const richBlockSchema = z.union([baseBlock, deflistBlock]);
export type RichBlock = z.infer<typeof richBlockSchema>;
