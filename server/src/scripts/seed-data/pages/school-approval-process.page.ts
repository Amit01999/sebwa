import type { PageSeed } from "../types.js";

// Original page has NO visible title — no pageHero section. The final
// "How do I get started?" heading + intro paragraph + lead-capture form
// becomes a single `leadForm` section (heading/intro carry that copy)
// rather than duplicating the heading in both richContent and the form.
export const schoolApprovalProcessPage: PageSeed = {
  slug: "school-approval-process",
  title: "School Approval Process",
  seo: {
    title: "School Approval Process — SEBWA",
    description: "How the SCSA evaluates licensing applications from international schools.",
  },
  sections: [
    {
      type: "richContent",
      data: {
        blocks: [
          {
            type: "p",
            text: "The SCSA considers applications from international schools, or third parties acting on their behalf, to license the delivery of Western Australian curriculum programs.",
          },

          { type: "h2", text: "What does the licensing application process involve?" },
          {
            type: "p",
            text: "The SCSA evaluates applications using information supplied by prospective schools or third parties through its online application process.",
          },
          { type: "p", text: "The SCSA's evaluation process includes understanding the:" },
          {
            type: "ul",
            items: [
              "curriculum program or programs in a school and/or courses that a school wishes to deliver",
              "resources available to deliver the nominated program or programs",
              "educational background of students likely to enrol in the program or programs",
              "school's approach to assisting students in meeting desired education outcomes.",
            ],
          },
          { type: "p", text: "As part of the evaluation process, the SCSA will organise a:" },
          {
            type: "ul",
            items: [
              "meeting with the school and/or its representatives via a web‑based conference to discuss the school, curriculum program or programs and services offered by the SCSA, as well as pricing",
              "visit by a member of the SCSA International team (conducted virtually or in‑country) to validate information provided in the online application and to meet with key people involved in the implementation of the curriculum program or programs (if approved).",
            ],
          },

          { type: "h2", text: "How long does the licensing application process take?" },
          { type: "p", text: "The application process is typically completed within 4–6 weeks." },

          {
            type: "h2",
            text: "What happens after the licensing application is submitted to the SCSA?",
          },
          {
            type: "p",
            text: "All applications are reviewed by the SCSA's International Education Advisory Committee (IEAC). The SCSA Board will approve or decline an application based on the IEAC's recommendation. If approved, the SCSA will provide the school with a licence to use and deliver its curriculum program or programs and an agreement is established that sets out the arrangements between the SCSA, the school and third parties (where applicable). The SCSA then commences its Curriculum Activation Program to support the school and its teachers with curriculum delivery.",
          },

          { type: "h2", text: "Is support available during the licensing application process?" },
          {
            type: "p",
            text: "Yes. SCSA International team members will provide support to the school and/or its representatives during the licensing application process. Schools or third parties are advised to contact the SCSA before commencing the online licensing application process.",
          },
        ],
      },
    },
    {
      type: "leadForm",
      data: {
        variant: "lead",
        heading: "How do I get started?",
        intro:
          "To register your interest or find out more about the school approval process, complete the form below. SEBWA will be in touch.",
      },
    },
  ],
};
