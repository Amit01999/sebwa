import type { PageSeed } from "../types.js";

export const howDoIApplyPage: PageSeed = {
  slug: "how-do-i-apply",
  title: "How Do I Apply",
  seo: {
    title: "How Do I Apply — SEBWA",
    description: "How to apply to deliver the Western Australian curriculum at your school.",
  },
  sections: [
    { type: "pageHero", data: { title: "How Do I Apply" } },
    {
      type: "richContent",
      data: {
        intro:
          "Prospective SCSA International partners supply information the SCSA uses to evaluate school preparedness to deliver the nominated Western Australian curriculum program or programs.",
        blocks: [
          {
            type: "p",
            text: "Members of the SCSA International team are available to provide guidance and support with the online application process. During this process commercial arrangements are discussed and relevant timeframes are established. All applications for accreditation must be approved by the SCSA's Board.",
          },
          { type: "h2", text: "Next steps" },
          {
            type: "links",
            items: [
              { label: "School Approval Process", to: "/school-approval-process", variant: "teal" },
              { label: "Contact SEBWA", to: "/contact-us", variant: "orange" },
            ],
          },
        ],
      },
    },
  ],
};
