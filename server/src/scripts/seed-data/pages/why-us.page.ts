import type { PageSeed, RichBlockSeed } from "../types.js";

// Most complex page on the site. Transcribed from src/routes/why-us.tsx.
//
// Flagged decisions:
// - The page's own inline `table` block (27-row feature matrix with FLAT
//   headers) is kept as a native `table` block rather than redirected to
//   the shared `courseTableRef` fragment, even though the underlying data
//   is identical to the WACE/WAM course-availability table — the two
//   render completely differently (flat 5-column table here vs a grouped
//   2-row-header table on the WACE/WAM pages), so this is a second,
//   intentionally separate transcription of the same figures, exactly as
//   the original site duplicated it.
// - Inline hyperlinks inside a paragraph (both working internal links and
//   the 3 still-dead `href="#"` placeholders: "Further study" and
//   "SCSA Associate Program" x2) are kept as inline `<a>` tags inside the
//   relevant `p` block's HTML, NOT pulled out into a `links` block — the
//   `links` block type is reserved for the site's flex-row CTA-button
//   groups (see how-do-i-apply / start-teaching), which this page doesn't
//   have; these are plain inline prose links.
const supportDeflistRows: { title: string; blocks: RichBlockSeed[] }[] = [
  {
    title: "Single point of contact",
    blocks: [
      {
        type: "p",
        text: "The SCSA will assign an experienced education consultant to coordinate support activities and provide a point of contact for all interactions between the school and the SCSA. These interactions cover areas that include:",
      },
      {
        type: "ul",
        items: [
          "agreements and invoicing",
          "curriculum support",
          "professional learning and moderation",
          "activities, reporting and other administrative matters.",
        ],
      },
      {
        type: "p",
        text: "The education consultant can provide a range of manuals and guidelines for reference by school leaders and teachers to ensure that the Western Australian curriculum is implemented in accordance with the SCSA's requirements and reflects commonly accepted practice.",
      },
      {
        type: "p",
        text: 'Find out more about SCSA International\'s:<br><a href="/school-approval-process">School approval process</a><br><a href="/curriculum-activation-program">Curriculum Activation Program</a><br><a href="#">SCSA Associate Program</a>.',
      },
    ],
  },
  {
    title: "Policies to guide teaching, assessing and reporting",
    blocks: [
      {
        type: "p",
        text: "The SCSA provides guidelines for schools about assessing and reporting student progress and achievement. Schools delivering Western Australian curriculum programs are required to develop a policy that provides their school community – students, parents/guardians/carers, teachers, school leaders and other relevant stakeholders, such as the School Board – with information about teaching, assessing and reporting in their school context.",
      },
      {
        type: "p",
        text: 'Find out more about policy support in P–10 by visiting the <a href="https://k10outline.scsa.wa.edu.au/home/policy/teaching-assessing-and-reporting-policy" target="_blank" rel="noopener noreferrer">Pre-primary to Year 10: Teaching, Assessing and Reporting Policy</a> page of the SCSA website.',
      },
      {
        type: "p",
        text: 'For Years 11 and 12, the <a href="https://senior-secondary.scsa.wa.edu.au/assessment/school-based-assessment/school-assessment-policy" target="_blank" rel="noopener noreferrer">school assessment policy</a> page of the SCSA website provides more information about policy support for senior secondary curriculum programs.',
      },
    ],
  },
  {
    title: "Sample programs, resources, tasks and marking keys",
    blocks: [
      {
        type: "p",
        text: "The SCSA provides sample teaching and learning outlines (K–10), course and assessment outlines (Years 11 and 12), sample assessment tasks and marking keys, and past Year 12 ATAR course examination papers with marking keys.",
      },
    ],
  },
  {
    title: "Annotated work samples",
    blocks: [
      {
        type: "p",
        text: "The SCSA provides an extensive range of annotated student work samples which demonstrate how teachers may apply assessment pointers and grade descriptors to make fair and valid judgements of student achievement and inform reporting to parents.",
      },
    ],
  },
  {
    title: "Moderation processes",
    blocks: [
      {
        type: "p",
        text: "The SCSA conducts a number of moderation processes annually to support schools in achieving the standards encapsulated in the Western Australian curriculum. These processes help ensure the comparability of school marks and grades and fairness and credibility in marking and grading students. The SCSA's moderation processes include:",
      },
      {
        type: "ul",
        items: [
          "pre-delivery documentation review – focuses on teaching and assessment planning and assessment documentation before commencing the delivery of the Western Australian curriculum",
          "syllabus delivery audit – focuses on teaching and assessment planning and assessment documentation after the first year of implementation",
          "grading review – a review of planning and assessment documentation in addition to a ranked list of student marks, proposed grade distribution and selected student files",
          "consensus moderation – an analysis of de-identified student responses to assessment tasks administered by other schools",
          "small group moderation – where a school has less than six students in a particular Year 12 ATAR course, the school partners with another school to use common assessment-related documentation and processes for each applicable course.",
        ],
      },
      {
        type: "p",
        text: 'Find out more about the range of moderation processes used by the SCSA by visiting the <a href="https://senior-secondary.scsa.wa.edu.au/moderation" target="_blank" rel="noopener noreferrer">moderation page</a> of the SCSA website.',
      },
    ],
  },
  {
    title: "Statistical reporting",
    blocks: [
      {
        type: "p",
        text: 'The SCSA publishes statistical reports each year that include student achievement data and secondary education statistics. The reports can be found on the <a href="https://www.scsa.wa.edu.au/publications/reports/statistical-reports" target="_blank" rel="noopener noreferrer">statistical reports page</a> of the SCSA website.',
      },
      {
        type: "p",
        text: "Schools can also download and review WACE achievement data for their school. The comprehensive data and statistical reporting provided by the SCSA enables schools to review their approach to teaching and assessment and make adjustments where necessary.",
      },
    ],
  },
];

const professionalLearningDeflistRows: { title: string; blocks: RichBlockSeed[] }[] = [
  {
    title: "Syllabus-specific training",
    blocks: [
      {
        type: "p",
        text: "The SCSA provides breadth and depth in its professional learning programs to support international schools in their transition to delivering the Western Australian curriculum and ongoing support thereafter. The SCSA's professional learning is delivered through face-to-face sessions, either online or in‑country, self‑directed e‑learning opportunities and tailored offerings. The SCSA's professional learning design and delivery are customised to the needs of individual international schools.",
      },
      {
        type: "p",
        text: "The SCSA's professional learning modules assist school and curriculum leaders to:",
      },
      {
        type: "ul",
        items: [
          "understand the SCSA's requirements",
          "facilitate the school's implementation of the Western Australian curriculum",
          "develop policy and whole-school curriculum planning.",
        ],
      },
      {
        type: "p",
        text: "The SCSA's professional learning modules build teacher capacity to implement the Western Australian curriculum through their focus on:",
      },
      {
        type: "ul",
        items: [
          "developing an understanding of the depth and breadth of syllabus content",
          "the SCSA's mandated teaching, assessment and reporting requirements",
          "effective lesson planning",
          "applying pedagogy to meet the ways of teaching and learning in the Western Australian curriculum",
          "the needs of learners across the various phases of schooling, including English language skills",
          "reflecting on professional practice, including teacher development and effective lesson planning.",
        ],
      },
      {
        type: "p",
        text: 'Find out more about SCSA International\'s:<br><a href="/professional-learning-pathways-and-support">Professional learning pathways</a>',
      },
    ],
  },
  {
    title: "Mentoring by curriculum and assessment experts",
    blocks: [
      {
        type: "p",
        text: "The SCSA provides curriculum experts who understand the intercultural complexities of international teaching contexts. They support teachers and school leaders by demonstrating how the Western Australian curriculum may be planned, sequenced, taught and assessed.",
      },
    ],
  },
  {
    title: "Improving student performance workshops",
    blocks: [
      {
        type: "p",
        text: "The SCSA conducts improving student performance workshops for teachers of selected Year 11 and Year 12 ATAR and/or General WACE courses. These hands-on workshops, which are free to attend, support participants in developing their understanding of a range of topics, including syllabus content, course standards and assessment task design.",
      },
    ],
  },
  {
    title: "Networking opportunities",
    blocks: [
      {
        type: "p",
        text: 'The SCSA hosts a range of events that support teachers. These include assessment seminars, consensus moderation and professional development events. A complete list of events planned for this year is available on the <a href="https://www.scsa.wa.edu.au/events" target="_blank" rel="noopener noreferrer">events page</a> of the SCSA website.',
      },
    ],
  },
  {
    title: "School visits",
    blocks: [
      {
        type: "p",
        text: "SCSA visits to international schools develop a positive working relationship and promote goodwill and an effective partnership over time. The SCSA visits each of its approved international schools when international travel allows. The typical focus of school visits includes:",
      },
      {
        type: "ul",
        items: [
          "review of school planning to ensure the effective implementation of Western Australian curriculum programs",
          "professional learning",
          "school leader and teacher support",
          "establishing and reviewing rectification strategies to address areas of non‑compliance or concern",
          "speeches to groups of students and/or parents.",
        ],
      },
    ],
  },
  {
    title: "School performance data",
    blocks: [
      {
        type: "p",
        text: "Approved international schools may access the Australian Council for Educational Research Progressive Achievement Tests (ACER PAT), which are standardised numeracy and literacy online tests that support the delivery of the WA K–10 International and inform teaching and assessment practices. The ACER PAT provides norm-referenced reports to enable schools to compare the achievement of their student cohorts to national norm samples.",
      },
    ],
  },
];

export const whyUsPage: PageSeed = {
  slug: "why-us",
  title: "Why Us",
  seo: {
    title: "Why Us — SEBWA",
    description:
      "Why partner with SCSA International — comprehensive curriculum, support, professional learning and recognition.",
  },
  sections: [
    { type: "pageHero", data: { title: "Why Us" } },
    {
      type: "richContent",
      data: {
        intro:
          "SCSA International offers schools the opportunity to be approved to deliver the following Western Australian curriculum programs:",
        blocks: [
          {
            type: "ul",
            items: [
              "Western Australian Early Years Learning Program International (WA Early Years International) Kindergarten to Year 2",
              "Western Australian Kindergarten to Year 10 Curriculum International (WA K–10 International) Kindergarten to Year 10",
              "Western Australian Certificate of Education International (WACE International) Years 11 and 12",
              "Western Australian Matriculation Program International (WAM International) Year 12 only.",
            ],
          },
          {
            type: "p",
            text: "The key to the successful delivery of any curriculum is ongoing professional support based on effective and personalised working relationships. The SCSA assigns an experienced education consultant who liaises with the school to ensure it is well supported and has a single, convenient point of contact.",
          },
          {
            type: "p",
            text: "The SCSA International team also provides ongoing opportunities for school leaders and teachers to access support to explore, analyse and plan their teaching, assessment and reporting practices. This support involves engagement between the SCSA and international schools to build their expertise in delivering the Western Australian curriculum programs.",
          },
          {
            type: "p",
            text: "The school support provided by the SCSA International team include the following.",
          },

          { type: "h3", text: "Detailed year-level syllabuses" },
          {
            type: "p",
            text: "Full access to learning area syllabus documents outlining key knowledge and understandings, content and skills, and student achievement standards.",
          },
          { type: "h3", text: "Teacher support materials" },
          {
            type: "p",
            text: "Sample teaching and learning outlines and exemplar teaching and learning programs, including assessment tasks with assessment tools and annotated student work samples.",
          },
          { type: "h3", text: "Pedagogical support" },
          {
            type: "p",
            text: "Advice and facilitated forums and workshops that allow teachers and schools to reflect on their teaching practices and develop targeted, practical strategies to improve student performance.",
          },
          { type: "h3", text: "Assessment support" },
          {
            type: "p",
            text: "The Judging standards tool that supports teachers when reporting against the achievement standards for Pre‑primary to Year 10.",
          },
          { type: "h3", text: "Documentation support" },
          {
            type: "p",
            text: "Assistance for teachers to ensure their documentation meets Western Australian curriculum standards and advice contextualised to particular school needs.",
          },
          { type: "h3", text: "Moderation processes" },
          {
            type: "p",
            text: "Ongoing moderation processes to assist schools in developing or confirming their understanding of the standards defined in the Western Australian curriculum.",
          },
          { type: "h3", text: "Networking support" },
          {
            type: "p",
            text: "Opportunities for teachers to share de-identified student work samples and investigate and discuss student achievement (marks and grades) in relation to Judging standards materials.",
          },
          {
            type: "p",
            text: "Find out more about SCSA International and how it supports schools by selecting the menu items below.",
          },

          { type: "h2", text: "Curriculum" },
          { type: "h3", text: "Eight learning areas (P–Year 10)" },
          {
            type: "p",
            text: "The SCSA provides international schools with access to a detailed curriculum for eight learning areas from Pre-primary to Year 10. The Western Australian curriculum includes mandated content descriptions, guiding principles for teaching, learning and assessment, and support for teachers in their assessment and reporting of student achievement. It recognises that all students in schools delivering the Western Australian curriculum are entitled to be given access to the eight learning areas:",
          },
          {
            type: "ul",
            items: [
              "English",
              "Health and Physical Education",
              "Humanities and Social Sciences",
              "Languages",
              "Mathematics",
              "Science",
              "Technologies",
              "The Arts.",
            ],
          },
          {
            type: "p",
            text: 'The eight learning area syllabuses can be found on the Western Australian curriculum page of the SCSA website at <a href="https://k10outline.scsa.wa.edu.au/" target="_blank" rel="noopener noreferrer">https://k10outline.scsa.wa.edu.au/</a>.',
          },
          {
            type: "p",
            text: 'Find out more about SCSA International\'s curriculum programs for students in Kindergarten to Year 10:<br><a href="/wa-early-years-international-kindergarten-to-year-2">WA Early Years International (Kindergarten to Year 2)</a><br><a href="/wa-k-10-international-kindergarten-to-year-10">WA K–10 International (Kindergarten to Year 10)</a>.',
          },

          { type: "h3", text: "Adopted and adapted from the Australian curriculum" },
          {
            type: "p",
            text: "The SCSA's Western Australian curriculum encompasses ACARA's Australian curriculum English, Mathematics and Science. In addition, year-level syllabuses for Humanities and Social Sciences, Health and Physical Education, Technologies, The Arts and Languages remain broadly consistent with the Australian curriculum but have been contextualised to make them more suitable for students and teachers engaged in the Western Australian curriculum.",
          },

          { type: "h3", text: "Kindergarten Curriculum Guidelines" },
          {
            type: "p",
            text: 'The SCSA provides Kindergarten Curriculum Guidelines to support educators in planning a curriculum that enables learners to develop general capabilities that encompass the knowledge, skills, behaviours and dispositions that will assist learners in the twenty‑first century. Children will be successful learners when they are encouraged to be confident, creative problem solvers and immersed in environments where they can explore multiple perspectives and ways of working. More information can be found on the Kindergarten Curriculum Guidelines page of the SCSA website at <a href="https://k10outline.scsa.wa.edu.au/home/teaching/kindergarten-curriculum-guidelines" target="_blank" rel="noopener noreferrer">https://k10outline.scsa.wa.edu.au/home/teaching/kindergarten-curriculum-guidelines</a>.',
          },

          { type: "h3", text: "Wide range of courses (Years 11 and 12)" },
          {
            type: "p",
            text: "The SCSA makes a specific range of WACE courses available for approved international schools to deliver to students in Years 11 and/or 12, as shown below.",
          },
          {
            type: "table",
            headers: [
              "WACE course",
              "ATAR (Southern)",
              "General (Southern)",
              "ATAR (Northern)",
              "General (Northern)",
            ],
            rows: [
              ["Accounting and Finance", "Yes", "Yes", "Yes", ""],
              ["Applied Information Technology", "Yes", "Yes", "", "Yes"],
              ["Biology", "Yes", "", "", ""],
              ["Business Management and Enterprise", "Yes", "Yes", "Yes", ""],
              ["Career and Enterprise", "Yes", "Yes", "", ""],
              ["Chemistry", "Yes", "", "Yes", ""],
              ["Chinese: First Language", "Yes", "", "", ""],
              ["Chinese: Second Language", "Yes", "", "", ""],
              ["Computer Science", "Yes", "Yes", "", "Yes"],
              ["Design", "", "Yes", "", ""],
              ["Drama", "", "Yes", "", ""],
              ["Economics", "Yes", "Yes", "Yes", ""],
              ["Engineering", "", "Yes", "", ""],
              ["English", "Yes", "Yes", "Yes", "Yes"],
              ["English as an Additional Language or Dialect", "Yes", "Yes", "Yes", ""],
              ["Food Science and Technology", "", "Yes", "", ""],
              ["Human Biology", "Yes", "", "Yes", ""],
              ["Literature", "Yes", "", "", ""],
              ["Mathematics Applications", "Yes", "", "Yes", ""],
              ["Mathematics Essential", "", "Yes", "", ""],
              ["Mathematics Methods", "Yes", "", "Yes", ""],
              ["Mathematics Specialist", "Yes", "", "Yes", ""],
              ["Media Production and Analysis", "Yes", "Yes", "", ""],
              ["Modern History", "Yes", "", "", ""],
              ["Physics", "Yes", "", "Yes", ""],
              ["Politics and Law", "", "Yes", "", ""],
              ["Psychology", "Yes", "", "Yes", ""],
            ],
          },
          {
            type: "p",
            text: "The specific WACE courses each international school may offer their students are documented in the agreement between the school and the SCSA. Students should select the available WACE courses most suited to their desired pathways.",
          },
          { type: "p", text: "The year-level syllabuses for WACE courses include:" },
          {
            type: "ul",
            items: [
              "comprehensive content descriptions organised to guide teachers in the planning of teaching and assessment",
              "information about the skills, understanding and academic behaviours that students should demonstrate through their learning",
              "information about assessment",
              "grade descriptions to support teacher decision making with respect to student academic progress and reporting to parents.",
            ],
          },
          {
            type: "p",
            text: 'Find out more about SCSA International\'s curriculum programs for students in Years 11 and/or 12:<br><a href="/wace-international-years-11-and-12">WACE International (Years 11 and 12)</a><br><a href="/wam-international-year-12">WAM International (Year 12)</a>.',
          },

          { type: "h3", text: "Embedded general capabilities" },
          {
            type: "p",
            text: "The SCSA provides a set of general capabilities that encompass the knowledge, skills, behaviours and dispositions that will assist students in living and working successfully in the twenty-first century.",
          },
          { type: "p", text: "The general capabilities are:" },
          {
            type: "ul",
            items: [
              "literacy",
              "numeracy",
              "information and communication technology capability",
              "critical and creative thinking",
              "personal and social capability",
              "ethical understanding",
              "intercultural understanding.",
            ],
          },
          {
            type: "p",
            text: 'Students develop capability when they apply knowledge and skills confidently, effectively and appropriately in their learning at school and in their lives outside of school. The general capabilities are interrelated and are not taught separately but addressed through the content of each of the learning areas. Therefore, they are not assessed separately. More information can be found on the general capabilities in the Western Australian curriculum page of the SCSA website at <a href="https://k10outline.scsa.wa.edu.au/home/teaching/general-capabilities-over/general-capabilities-overview/general-capabilities-in-the-australian-curriculum" target="_blank" rel="noopener noreferrer">https://k10outline.scsa.wa.edu.au/home/teaching/general-capabilities-over/general-capabilities-overview/general-capabilities-in-the-australian-curriculum</a>.',
          },

          { type: "h3", text: "Recognised qualification for university entrance" },
          {
            type: "p",
            text: "The SCSA's internationally recognised senior secondary curriculum programs provide a robust pathway that enables students to meet the pre-admission requirements of universities and other tertiary institutions.",
          },

          { type: "h3", text: "WACE International curriculum program" },
          {
            type: "p",
            text: "While students typically complete the WACE International in their final two years of senior secondary school, there is no specified time limit for completion of this curriculum program. Study towards the achievement of the WACE may be undertaken over a lifetime. Individuals continuing to work towards the achievement of the WACE after they leave school will need to meet the WACE requirements applicable at that time. Schools must be approved to deliver the WACE International before enrolling students in this program.",
          },

          { type: "h3", text: "WAM International curriculum program" },
          {
            type: "p",
            text: "The WAM International is a pre-university curriculum program recognised around the world and creates pathways to a wide range of study and career opportunities. The one-year WAM International is equivalent to Year 12 of the WACE International. Students who complete the requirements of the WAM International can achieve WACE certification. Schools must be approved to deliver the WAM International before enrolling students in this program.",
          },

          {
            type: "p",
            text: 'Find out more about SCSA International\'s curriculum programs for students in Years 11 and/or 12:<br><a href="/wace-international-years-11-and-12">WACE International (Years 11 and 12)</a><br><a href="/wam-international-year-12">WAM International (Year 12)</a>.<br><br>Find out more about the higher education opportunities that your students can pursue in Western Australia:<br><a href="#">Further study</a>.',
          },

          { type: "h2", text: "Information for Parents" },
          {
            type: "p",
            text: '<a href="https://parent.scsa.wa.edu.au/" target="_blank" rel="noopener noreferrer">https://parent.scsa.wa.edu.au/</a> Parents and community.',
          },

          { type: "h2", text: "Support" },
          { type: "deflist", rows: supportDeflistRows },

          { type: "h2", text: "Information for SCSA Associates" },
          { type: "p", text: '<a href="#">SCSA Associate Program</a>' },

          { type: "h2", text: "Professional Learning" },
          { type: "deflist", rows: professionalLearningDeflistRows },
        ],
      },
    },
  ],
};
