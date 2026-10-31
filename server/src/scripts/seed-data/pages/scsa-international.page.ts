import type { PageSeed } from "../types.js";

// NOTE (flagged deviation): the original page had NO PageHero banner — it
// rendered a bare `<h1>` directly in the article (no navy banner, no
// breadcrumb), with the Vimeo video appearing above that h1. The section
// schema has no "bare h1" block type, so this is mapped to a `pageHero`
// section (for visual consistency with every other inner page) placed
// AFTER the video, preserving the original video-then-title DOM order.
// This is a deliberate, disclosed minor visual change, not a silent guess.
export const scsaInternationalPage: PageSeed = {
  slug: "scsa-international",
  title: "SCSA International",
  seo: {
    title: "SCSA International — SEBWA",
    description:
      "SCSA International has been licensing schools to deliver the Western Australian curriculum since 1987.",
  },
  sections: [
    {
      type: "richContent",
      data: {
        blocks: [
          {
            type: "video",
            provider: "vimeo",
            videoId: "760137188",
            h: "0f8a53853e",
            title: "SCSA International",
          },
        ],
      },
    },
    { type: "pageHero", data: { title: "SCSA International" } },
    {
      type: "richContent",
      data: {
        blocks: [
          {
            type: "p",
            text: "In 1987, the SCSA approved its first international school to deliver the Western Australian curriculum. Since then, the SCSA has acquired an appreciation of curriculum delivery internationally by working with approved schools across a range of countries.",
          },
          { type: "h2", text: "SCSA International areas of operation" },
          {
            type: "image",
            mediaAssetId: "seed:scsa-international-3",
            alt: "SCSA International areas of operation",
          },
          {
            type: "p",
            text: "Making a difference to all students, their teachers and school communities is at the heart of SCSA International's work. SCSA International curriculum programs and support materials and processes are defined by the following four pillars.",
          },
          { type: "h2", text: "SCSA International's commitment to its international partners" },
          {
            type: "image",
            mediaAssetId: "seed:scsa-international-slide1",
            alt: "SCSA International's commitment to its international partners",
          },
        ],
      },
    },
  ],
};
