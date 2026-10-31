import type { PageSeed } from "../types.js";

// Original page has NO visible title at all — just two stacked Vimeo
// embeds. No pageHero section, to preserve that exactly.
export const westernAustraliaPage: PageSeed = {
  slug: "western-australia",
  title: "Western Australia",
  seo: {
    title: "Western Australia — SEBWA",
    description: "Why Western Australia is a leading study destination for international students.",
  },
  sections: [
    {
      type: "richContent",
      data: {
        blocks: [
          { type: "video", provider: "vimeo", videoId: "760150280", h: "a1a6dfebcb", title: "" },
          { type: "video", provider: "vimeo", videoId: "727188788", h: "ac074d5513", title: "" },
        ],
      },
    },
  ],
};
