import type { PageSeed } from "../types.js";

// Original page has NO visible title — no pageHero section. The final
// "How can I find out more?" heading + intro + lead-capture form becomes
// one `leadForm` section.
export const professionalLearningPathwaysAndSupportPage: PageSeed = {
  slug: "professional-learning-pathways-and-support",
  title: "Professional Learning Pathways and Support",
  seo: {
    title: "Professional Learning Pathways and Support — SEBWA",
    description:
      "Diverse professional learning pathways for school leaders, curriculum leaders and teachers.",
  },
  sections: [
    {
      type: "richContent",
      data: {
        blocks: [
          {
            type: "p",
            text: "The SCSA offers a diverse range of professional learning pathways and support to help approved international schools implement and deliver the Western Australian curriculum. It has a well-established process to analyse, identify and tailor the provision of professional learning to address the different levels of experience school leaders, curriculum leaders and teachers have with the Western Australian curriculum.",
          },
          {
            type: "p",
            text: "Implementing and delivering an international curriculum is a significant undertaking for schools. Therefore, as part of their agreement with the SCSA, schools participate in professional learning activities and information sharing meetings.",
          },
          {
            type: "p",
            text: "The SCSA's professional learning pathways balance the expertise of the SCSA's curriculum specialists with the needs of the school to tailor a professional learning journey that is respectful of each teacher's professional standing. The design, creation and delivery of the SCSA's professional learning take into consideration school contexts and levels of experience with the Western Australian curriculum.",
          },

          {
            type: "h2",
            text: "What professional learning does the SCSA provide for school leaders?",
          },
          {
            type: "p",
            text: "The breadth and depth of the SCSA professional learning help school and curriculum leaders to transition into delivering the Western Australian curriculum, in addition to providing ongoing support.",
          },
          {
            type: "p",
            text: "The SCSA's professional learning modules will assist school and curriculum leaders to:",
          },
          {
            type: "ul",
            items: [
              "understand the mandated requirements of a licensed school",
              "facilitate the school's implementation of the Western Australian curriculum",
              "develop policy (as required)",
              "develop whole-school curriculum planning (as required)",
              "map links to the school's current education system (as required).",
            ],
          },

          { type: "h2", text: "What professional learning does the SCSA provide for teachers?" },
          {
            type: "p",
            text: "The SCSA offers a range of professional learning designed to meet the needs of teachers in international schools. These modules can be tailored to specific needs and/or areas of interest.",
          },
          { type: "p", text: "The SCSA's professional learning modules will assist teachers to:" },
          {
            type: "ul",
            items: [
              "understand learning area syllabus content",
              "understand the SCSA's mandated teaching, learning and assessment requirements",
              "design effective lesson plans",
              "optimise their ability to deliver the Western Australian curriculum in the classroom",
              "address pedagogy to meet the ways of teaching, learning and assessing in the Western Australian curriculum",
              "address the specific needs of the different phases of schooling",
              "reflect on their professional practice.",
            ],
          },

          { type: "h2", text: "What other types of professional learning are offered?" },
          {
            type: "p",
            text: "Regular and ongoing opportunities exist for teachers to explore, analyse and plan their teaching, learning, assessment and reporting practices with SCSA International officers. These officers are specialists in the fields of teaching, learning and assessment and can be contacted by phone, email or online communication platforms.",
          },

          { type: "h2", text: "How is professional learning facilitated?" },
          {
            type: "p",
            text: "The professional learning is conducted through face‑to‑face sessions, either online or in‑country, self‑directed learning opportunities and tailored offerings. The design and delivery of the SCSA's professional learning are customised to the school's needs to ensure improved outcomes for students.",
          },
        ],
      },
    },
    {
      type: "leadForm",
      data: {
        variant: "lead",
        heading: "How can I find out more?",
        intro:
          "To find out more about the professional learning pathways and support offered by SCSA International, complete the form below. A member of SEBWA will be in touch.",
      },
    },
  ],
};
