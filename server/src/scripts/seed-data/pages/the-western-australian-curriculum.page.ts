import type { PageSeed } from "../types.js";

// Original page has NO visible title at all — just two stacked Vimeo
// embeds. No pageHero section, to preserve that exactly.
export const theWesternAustralianCurriculumPage: PageSeed = {
  slug: "the-western-australian-curriculum",
  title: "The Western Australian Curriculum",
  seo: {
    title: "The Western Australian Curriculum — SEBWA",
    description:
      "An overview of the Western Australian curriculum delivered by SCSA-licensed international schools.",
  },
  sections: [
    {
      type: "richContent",
      data: {
        blocks: [
          { type: "video", provider: "vimeo", videoId: "727191185", h: "4809a8fffc", title: "" },
          { type: "video", provider: "vimeo", videoId: "727192729", h: "4f74a500fc", title: "" },
        ],
      },
    },
  ],
};
