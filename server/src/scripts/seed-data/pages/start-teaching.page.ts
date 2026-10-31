import type { PageSeed } from "../types.js";

export const startTeachingPage: PageSeed = {
  slug: "start-teaching",
  title: "Start Teaching",
  seo: {
    title: "Start Teaching — SEBWA",
    description:
      "Get started teaching the Western Australian curriculum with SCSA guidance and professional learning.",
  },
  sections: [
    { type: "pageHero", data: { title: "Start Teaching" } },
    {
      type: "richContent",
      data: {
        intro:
          "Schools approved to deliver Western Australian curriculum programs receive guidance to support implementation and delivery.",
        blocks: [
          {
            type: "p",
            text: "Members of the SCSA International team facilitate a Curriculum Activation Program and provide professional learning pathways to support curriculum delivery, including advice about teaching, assessment and reporting.",
          },
          { type: "h2", text: "Find out more" },
          {
            type: "links",
            items: [
              {
                label: "Curriculum Activation Program",
                to: "/curriculum-activation-program",
                variant: "teal",
              },
              {
                label: "Professional Learning Pathways",
                to: "/professional-learning-pathways-and-support",
                variant: "orange",
              },
            ],
          },
        ],
      },
    },
  ],
};
