import type { PageSeed } from "../types.js";

// Original page has NO visible title — no pageHero section.
export const waK10InternationalPage: PageSeed = {
  slug: "wa-k-10-international-kindergarten-to-year-10",
  title: "WA K–10 International (Kindergarten to Year 10)",
  seo: {
    title: "WA K–10 International — SEBWA",
    description:
      "WA K–10 International is a comprehensive Kindergarten to Year 10 curriculum program.",
  },
  sections: [
    {
      type: "richContent",
      data: {
        blocks: [
          { type: "video", provider: "vimeo", videoId: "727197014", h: "25c5babb45", title: "" },

          { type: "h2", text: "What is WA K–10 International?" },
          {
            type: "p",
            text: "WA K–10 International is a curriculum program for Kindergarten to Year 10 designed to provide schools with comprehensive information to:",
          },
          {
            type: "ul",
            items: [
              "plan student learning programs",
              "assess student progress",
              "report to parents.",
            ],
          },
          {
            type: "p",
            text: "WA K–10 International clearly sets out the knowledge, understanding, skills, values, attitudes and standards of achievement that all students are expected to acquire by completing the Western Australian curriculum. Successful completion of the curriculum provided within WA K–10 International ensures students are well placed to progress to the Western Australian Certificate of Education International (WACE International).",
          },

          { type: "h2", text: "What are the entry requirements for WA K–10 International?" },
          { type: "p", text: "The SCSA sets no entry requirements for WA K–10 International." },
          {
            type: "p",
            text: "Note: the Western Australian curriculum is written in Standard Australian English (SAE).",
          },

          { type: "h2", text: "How is WA K–10 International structured?" },
          {
            type: "p",
            text: "WA K–10 International contains year‑level syllabuses for the eight learning areas of the Western Australian curriculum shown below.",
          },
          { type: "h3", text: "Learning areas of the Western Australian curriculum" },
          {
            type: "p",
            text: 'Learning areas must be implemented and the Western Australian curriculum delivered by schools in accordance with the SCSA\'s Pre‑primary to Year 10: Teaching, Assessing and Reporting Policy and Policy Standards for Pre-primary to Year 10: Teaching, Assessing and Reporting (<a href="https://k10outline.scsa.wa.edu.au/home/policy/teaching-assessing-and-reporting-policy" target="_blank" rel="noopener noreferrer">https://k10outline.scsa.wa.edu.au/home/policy/teaching-assessing-and-reporting-policy</a>). The SCSA provides scope and sequence documents which summarise the content and skills needed to be taught for each year level and learning area.',
          },

          {
            type: "h2",
            text: "What are the notional hours of delivery for WA K–10 International?",
          },
          {
            type: "p",
            text: "SCSA's notional time allocation guidelines for WA K–10 International assume a 25‑hour teaching week over 40 teaching weeks per year. It is recognised that school teaching hours often exceed 25 hours per week and that the length of the school year may vary.",
          },

          { type: "h2", text: "Are textbooks prescribed for WA K–10 International?" },
          {
            type: "p",
            text: "The SCSA does not publish, prescribe or endorse textbooks, but supplies a list of textbooks and other resources commonly used by Western Australian schools in sample teaching and learning outlines for each learning area and year level.",
          },

          { type: "h2", text: "How is WA K–10 International assessed?" },
          {
            type: "p",
            text: "Schools develop assessments in relation to the curriculum content and achievement standards, observing the SCSA's Principles of Assessment. The SCSA provides exemplar assessments and guidance.",
          },
          { type: "p", text: "There are no external tests or examinations." },

          { type: "h2", text: "What type of moderation activities take place?" },
          {
            type: "p",
            text: "Schools can elect to participate in moderation activities. The purpose of the moderation process is to work with schools and teachers to develop a comprehensive and shared understanding of the achievement standards. Teachers will develop an understanding of the benefits and use of marking keys as diagnostic tools and make valid, reliable and consistent judgements on student achievement. Schools that participate in the moderation process with the SCSA will be able to apply the model within their school for school‑based moderation and comparability practices across all year levels.",
          },

          { type: "h2", text: "Where can I find further information?" },
          {
            type: "p",
            text: 'Further information relating to WA K–10 International can be found on the K–10 Outline page of the SCSA\'s website at <a href="https://k10outline.scsa.wa.edu.au/home" target="_blank" rel="noopener noreferrer">https://k10outline.scsa.wa.edu.au/home</a>.',
          },
        ],
      },
    },
  ],
};
