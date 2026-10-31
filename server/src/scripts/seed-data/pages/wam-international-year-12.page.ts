import type { PageSeed } from "../types.js";

// Original page has NO visible title (video, then straight into h2
// sections) — no pageHero section, to preserve that. The course table
// (identical to wace-international-years-11-and-12.tsx) is a
// `courseTableRef` pointing at the shared fragment rather than a second
// copy of the data.
export const wamInternationalYear12Page: PageSeed = {
  slug: "wam-international-year-12",
  title: "WAM International (Year 12)",
  seo: {
    title: "WAM International (Year 12) — SEBWA",
    description:
      "WAM International is a one-year, internationally recognised Year 12 program equivalent to WACE.",
  },
  sections: [
    {
      type: "richContent",
      data: {
        blocks: [
          { type: "video", provider: "vimeo", videoId: "727187597", h: "7a28d02886", title: "" },

          { type: "h2", text: "What is WAM International?" },
          {
            type: "p",
            text: "WAM International is an internationally recognised one-year secondary curriculum program equivalent to Year 12 (Grade XII) of the WACE International that enables students to meet the pre-admission requirements of tertiary institutions.",
          },

          { type: "h2", text: "What are the entry requirements for WAM International?" },
          { type: "p", text: "The SCSA sets no entry requirements for WAM International." },
          {
            type: "p",
            text: "Note: the Western Australian curriculum is written in Standard Australian English (SAE) and course content must be taught in English to prepare students for the final examinations conducted by the SCSA.",
          },

          { type: "h2", text: "What courses can be studied as part of WAM International?" },
          {
            type: "p",
            text: "Students in approved international schools may enrol in the following courses as part of their WAM International studies.",
          },
          { type: "h3", text: "WACE courses studied as part of WAM International" },
          { type: "courseTableRef", fragmentKey: "wace-wam-course-availability" },

          {
            type: "h2",
            text: "What are the notional hours of delivery for WAM International courses?",
          },
          {
            type: "p",
            text: "Fifty‑five hours of student contact time are required for each semester‑long unit for each course (subject). While the WAM International is typically a one-year program, schools can discuss alternative delivery arrangements with the SCSA but must deliver all syllabus content, including the required assessments.",
          },

          { type: "h2", text: "Are textbooks prescribed for WAM International courses?" },
          {
            type: "p",
            text: "The SCSA does not publish, prescribe or endorse textbooks, but can supply a list of textbooks and other resources commonly used by Western Australian schools.",
          },

          { type: "h2", text: "How is WAM International assessed?" },
          {
            type: "p",
            text: 'Schools must develop assessments for the assessment types identified in the syllabus for each course delivered. Schools can use the exemplar assessment tasks made available by the SCSA and should observe the Principles of Assessment described in the WACE Manual, accessible from the SCSA website at <a href="https://senior-secondary.scsa.wa.edu.au/further-resources/wace-manual" target="_blank" rel="noopener noreferrer">https://senior-secondary.scsa.wa.edu.au/further-resources/wace-manual</a>.',
          },

          { type: "h2", text: "What happens with the final ATAR course examinations?" },
          {
            type: "p",
            text: "WAM International students enrolled in ATAR courses sit final examinations administered by the SCSA to receive an ATAR for university entrance.",
          },
          {
            type: "p",
            text: "Academic calendars are offered for the Southern hemisphere (October/November) and Northern hemisphere (March/April). The school provides a venue, secure storage of the examinations and the SCSA sets, administers and marks the ATAR course examinations.",
          },

          {
            type: "h2",
            text: "What certification and acknowledgement can WAM International students receive?",
          },
          {
            type: "p",
            text: "WAM International students can achieve the following certification and acknowledgement:",
          },
          {
            type: "ul",
            items: [
              "Western Australian Certificate of Education (WACE)",
              "Western Australian Statement of Student Achievement (WASSA)",
              "Australian Tertiary Admission Rank (ATAR)",
              "Year 12 exhibitions and awards.",
            ],
          },

          { type: "h2", text: "What is the WACE?" },
          {
            type: "p",
            text: "The WACE is the certificate students receive when they meet the specified requirements in their senior secondary schooling. The WACE can be achieved through successful completion of the WACE International or WAM International. Achievement of the WACE shows a student has successfully met a set of standards for breadth and depth, achievement and literacy and numeracy at senior secondary school level and confirms graduation.",
          },

          { type: "h2", text: "What is the WASSA?" },
          {
            type: "p",
            text: "The WASSA provides a formal record of what students leaving in Year 12 have achieved, as a result of their education in Western Australia.",
          },
          {
            type: "p",
            text: "The WASSA formally records what a student has completed during their senior secondary schooling:",
          },
          {
            type: "ul",
            items: [
              "achievement of the WACE requirements",
              "achievement of the literacy (reading and writing) standard",
              "achievement of the numeracy standard",
              "achievement of exhibitions and awards",
              "school grades, school marks, and combined scores in ATAR units",
              "school grades and school marks in General units",
              "completed Preliminary units",
              "completed endorsed programs.",
            ],
          },
          {
            type: "p",
            text: "The WASSA is like the academic transcript students receive from universities and training providers. Students can use the detail in the WASSA to support their applications for employment, further education and training.",
          },

          { type: "h2", text: "What is the ATAR?" },
          {
            type: "p",
            text: "The ATAR reports a student's rank position relative to all other students for a particular year and ranges from 0.00 to 99.95. The ATAR is used to determine eligibility for university entrance and entry into tertiary courses in Australia and internationally.",
          },
          {
            type: "p",
            text: "The ATAR is certified, an ATAR certificate is provided by TISC in hard copy on official TISC stationery. The ATAR certificate indicates a student's ATAR, course data and scaled scores.",
          },
          { type: "p", text: "The ATAR is recognised globally." },

          {
            type: "h2",
            text: "What requirements are needed to achieve the WACE through the WAM International program?",
          },
          {
            type: "p",
            text: "These are the minimum requirements for students to receive a WACE through WAM International in 2023 and beyond.",
          },
          { type: "h3", text: "Breadth and depth" },
          {
            type: "p",
            text: "a) Completion of a minimum of 10 units, which may include unit equivalents attained through VET and/or endorsed programs. This requirement must include at least: (Explanatory notes 1, 2, 3, 4 and 5)",
          },
          {
            type: "ul",
            items: [
              "a minimum of ten Year 12 units, or the equivalent",
              "at least one pair of Year 12 units from an English learning area course",
              "one pair of Year 12 units from each of List A (arts/languages/social sciences) and List B (mathematics/science/technology).",
            ],
          },
          { type: "h3", text: "Achievement standard" },
          {
            type: "p",
            text: "a) Achievement of at least six C grades (or the equivalent) in Year 12 units.",
          },
          { type: "p", text: "b) Completion of:" },
          {
            type: "ul",
            items: [
              "at least four Year 12 ATAR courses (Explanatory note 5), or",
              "at least five Year 12 General courses (Explanatory note 7) (or a combination of General and up to three Year 12 ATAR courses (Explanatory note 5)) or equivalent (Explanatory note 8), or",
              "a Certificate II (or higher) VET qualification (Explanatory notes 9 and 10) in combination with ATAR, General or Foundation courses.",
            ],
          },
          { type: "h3", text: "Literacy and numeracy standard" },
          {
            type: "p",
            text: "a) Demonstration of the minimum standard of literacy and numeracy. (Explanatory notes 11 and 12)",
          },
          {
            type: "p",
            text: 'More information, including explanatory notes, is available from the WACE Requirements page of the SCSA website at <a href="https://senior-secondary.scsa.wa.edu.au/the-wace/wace-requirements" target="_blank" rel="noopener noreferrer">https://senior-secondary.scsa.wa.edu.au/the-wace/wace-requirements</a>.',
          },

          { type: "h2", text: "Where is WACE recognised?" },
          {
            type: "p",
            text: "The Western Australian curriculum has proven to be a strong foundation for students successfully transitioning to higher education studies. The WACE is recognised nationally and internationally by universities and other tertiary institutions, industry and training providers due to SCSA's:",
          },
          {
            type: "ul",
            items: [
              "effective approach to curriculum design and certification standards, including demonstration of a minimum level of literacy and numeracy, a minimum level of academic achievement and breadth and depth in enrolment",
              "rigorous assessment standards and moderation procedures that are informed by the latest national and international research",
              "provision of ATAR courses that allow multiple opportunities for students to acquire and develop highly transferrable skills, including personal and social capabilities, intercultural understandings and critical and creative thinking",
              "provision of ATAR English learning area courses, including English as an Additional Language or Dialect (EAL/D), English and Literature, which develop academic English skills for learners with different abilities to meet university English proficiency requirements internationally.",
            ],
          },

          { type: "h2", text: "How is the ATAR calculated?" },
          {
            type: "p",
            text: 'The ATAR is calculated by the Tertiary Institutions Service Centre (TISC) using the final marks determined by the SCSA. Find out more by visiting the TISC website at <a href="https://www.tisc.edu.au/static/home.tisc" target="_blank" rel="noopener noreferrer">https://www.tisc.edu.au/static/home.tisc</a>.',
          },

          { type: "h2", text: "Where can I find further information?" },
          {
            type: "p",
            text: 'Further information can be found on the Years 11 and 12 page of the SCSA website at <a href="https://senior-secondary.scsa.wa.edu.au/" target="_blank" rel="noopener noreferrer">https://senior-secondary.scsa.wa.edu.au/</a>.',
          },
        ],
      },
    },
  ],
};
