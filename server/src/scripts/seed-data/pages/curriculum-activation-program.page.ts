import type { PageSeed } from "../types.js";

// Original page has NO visible title — no pageHero section. The final
// "How can I find out more?" heading + intro + lead-capture form becomes
// one `leadForm` section.
export const curriculumActivationProgramPage: PageSeed = {
  slug: "curriculum-activation-program",
  title: "Curriculum Activation Program",
  seo: {
    title: "Curriculum Activation Program — SEBWA",
    description:
      "A sequenced plan to help schools access the Western Australian curriculum, resources and professional learning.",
  },
  sections: [
    {
      type: "richContent",
      data: {
        blocks: [
          {
            type: "p",
            text: "The Curriculum Activation Program provides a sequenced plan for international schools to access the Western Australian curriculum, supporting resources and professional learning. The SCSA International team will work with each approved international school to ensure that professional learning and ongoing support are provided to implement and deliver the approved curriculum program or programs.",
          },
          {
            type: "p",
            text: "Designed for schools that are delivering the Western Australian curriculum for the first time, the Curriculum Activation Program involves a step-by-step process facilitated by the SCSA to guide schools through the first two years of implementation of the curriculum program or programs that they have been approved to deliver. Where a third party is involved in supporting the international school, this third party will be included in discussions about the curriculum implementation timeline.",
          },
          {
            type: "p",
            text: "The Implementation Guide for WA Early Years International and WA K–10 International and the Implementation Guide for WACE International and WAM International are made available in the Curriculum Activation Program. They contain introductory information about the various services and resources provided by the SCSA to support the establishment of Western Australian curriculum programs.",
          },
          {
            type: "p",
            text: "The SCSA understands that international schools may have a number of operational and strategic activities to undertake in addition to SCSA's required preparation processes for the implementation of the curriculum. As they conceptualise implementation of the curriculum, common questions asked by international schools include the following.",
          },

          { type: "h2", text: "Why is a curriculum plan important?" },
          {
            type: "p",
            text: "The SCSA provides syllabus documents that set out curriculum content. These are used to plan curriculum delivery across the school over the academic year. This planning will show how learning is sequenced and developed within and across the learning areas and the year levels. A whole-school curriculum plan can form the basis for all other layers of curriculum planning by teachers, using yearly overviews and/or a scope and sequence document. This makes clear to teachers what they should be teaching and when, as well as the progression of teaching across the year levels. A curriculum plan can also be used to show the opportunities for integrated or interdisciplinary teaching and learning by illustrating connections between related content.",
          },

          { type: "h2", text: "Who should lead curriculum planning at the school level?" },
          {
            type: "p",
            text: "School leaders can designate curriculum leaders within the school who will work with teaching teams to implement and deliver the school's teaching and learning program.",
          },

          { type: "h2", text: "What about the local context of each school?" },
          {
            type: "p",
            text: "Each school is unique and should therefore shape delivery of the curriculum to meet the context of the school and the students. Implementation and delivery of the curriculum is an ongoing process that will benefit from review, evaluation and adjustment.",
          },

          { type: "h2", text: "What about academic calendar alignment?" },
          {
            type: "p",
            text: "Schools in Western Australia have an academic calendar that operates from late January to December. SCSA International offers Year 12 ATAR examinations aligned to both the Southern and Northern hemisphere academic calendars.",
          },

          { type: "h2", text: "What about teacher selection?" },
          {
            type: "p",
            text: "Teacher selection is at the discretion of the school. Teacher qualifications are as per in-country requirements.",
          },

          {
            type: "h2",
            text: "What happens at the conclusion of the Curriculum Activation Program?",
          },
          {
            type: "p",
            text: "Following the completion of the program, it is anticipated that a school will enter into a consolidation phase. In this phase, the school will continue to be supported by the SCSA but operate with a higher level of independence and confidence, accessing appropriate systems and processes as needed.",
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
          "To find out more about SCSA International's Curriculum Activation Program, complete the form below. A member of SEBWA will be in touch.",
      },
    },
  ],
};
