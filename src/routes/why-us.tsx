import { createFileRoute, Link } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import type { ReactNode } from "react";

const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-orange underline hover:opacity-80 break-all">
    {children}
  </a>
);

function Ul({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-1 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-none shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DefTable({ rows }: { rows: { title: string; content: ReactNode }[] }) {
  return (
    <table className="w-full text-sm border border-border my-4">
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td className="px-3 py-3 border border-border align-top font-semibold text-navy w-[28%] bg-mist/40 leading-snug">
              {row.title}
            </td>
            <td className="px-3 py-3 border border-border align-top">
              <div className="space-y-3 leading-relaxed">{row.content}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const Route = createFileRoute("/why-us")({
  head: () => ({
    meta: [
      { title: "Why Us — SEBWA" },
      {
        name: "description",
        content:
          "Why partner with SCSA International — comprehensive curriculum, support, professional learning and recognition.",
      },
    ],
  }),
  component: () => (
    <ContentPage
      title="Why Us"
      intro="SCSA International offers schools the opportunity to be approved to deliver the following Western Australian curriculum programs:"
      blocks={[
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
        { type: "p", text: "Full access to learning area syllabus documents outlining key knowledge and understandings, content and skills, and student achievement standards." },

        { type: "h3", text: "Teacher support materials" },
        { type: "p", text: "Sample teaching and learning outlines and exemplar teaching and learning programs, including assessment tasks with assessment tools and annotated student work samples." },

        { type: "h3", text: "Pedagogical support" },
        { type: "p", text: "Advice and facilitated forums and workshops that allow teachers and schools to reflect on their teaching practices and develop targeted, practical strategies to improve student performance." },

        { type: "h3", text: "Assessment support" },
        { type: "p", text: "The Judging standards tool that supports teachers when reporting against the achievement standards for Pre‑primary to Year 10." },

        { type: "h3", text: "Documentation support" },
        { type: "p", text: "Assistance for teachers to ensure their documentation meets Western Australian curriculum standards and advice contextualised to particular school needs." },

        { type: "h3", text: "Moderation processes" },
        { type: "p", text: "Ongoing moderation processes to assist schools in developing or confirming their understanding of the standards defined in the Western Australian curriculum." },

        { type: "h3", text: "Networking support" },
        { type: "p", text: "Opportunities for teachers to share de-identified student work samples and investigate and discuss student achievement (marks and grades) in relation to Judging standards materials." },

        { type: "p", text: "Find out more about SCSA International and how it supports schools by selecting the menu items below." },

        // ── CURRICULUM ───────────────────────────────────────────────────────
        { type: "h2", text: "Curriculum" },

        { type: "h3", text: "Eight learning areas (P–Year 10)" },
        { type: "p", text: "The SCSA provides international schools with access to a detailed curriculum for eight learning areas from Pre-primary to Year 10. The Western Australian curriculum includes mandated content descriptions, guiding principles for teaching, learning and assessment, and support for teachers in their assessment and reporting of student achievement. It recognises that all students in schools delivering the Western Australian curriculum are entitled to be given access to the eight learning areas:" },
        { type: "ul", items: ["English", "Health and Physical Education", "Humanities and Social Sciences", "Languages", "Mathematics", "Science", "Technologies", "The Arts."] },
        {
          type: "p",
          text: <>The eight learning area syllabuses can be found on the Western Australian curriculum page of the SCSA website at <Ext href="https://k10outline.scsa.wa.edu.au/">https://k10outline.scsa.wa.edu.au/</Ext>.</>,
        },
        {
          type: "p",
          text: <>Find out more about SCSA International's curriculum programs for students in Kindergarten to Year 10:<br /><Link to="/wa-early-years-international-kindergarten-to-year-2" className="text-orange underline hover:opacity-80">WA Early Years International (Kindergarten to Year 2)</Link><br /><Link to="/wa-k-10-international-kindergarten-to-year-10" className="text-orange underline hover:opacity-80">WA K–10 International (Kindergarten to Year 10)</Link>.</>,
        },

        { type: "h3", text: "Adopted and adapted from the Australian curriculum" },
        { type: "p", text: "The SCSA's Western Australian curriculum encompasses ACARA's Australian curriculum English, Mathematics and Science. In addition, year-level syllabuses for Humanities and Social Sciences, Health and Physical Education, Technologies, The Arts and Languages remain broadly consistent with the Australian curriculum but have been contextualised to make them more suitable for students and teachers engaged in the Western Australian curriculum." },

        { type: "h3", text: "Kindergarten Curriculum Guidelines" },
        {
          type: "p",
          text: <>The SCSA provides Kindergarten Curriculum Guidelines to support educators in planning a curriculum that enables learners to develop general capabilities that encompass the knowledge, skills, behaviours and dispositions that will assist learners in the twenty‑first century. Children will be successful learners when they are encouraged to be confident, creative problem solvers and immersed in environments where they can explore multiple perspectives and ways of working. More information can be found on the Kindergarten Curriculum Guidelines page of the SCSA website at <Ext href="https://k10outline.scsa.wa.edu.au/home/teaching/kindergarten-curriculum-guidelines">https://k10outline.scsa.wa.edu.au/home/teaching/kindergarten-curriculum-guidelines</Ext>.</>,
        },

        { type: "h3", text: "Wide range of courses (Years 11 and 12)" },
        { type: "p", text: "The SCSA makes a specific range of WACE courses available for approved international schools to deliver to students in Years 11 and/or 12, as shown below." },
        {
          type: "table",
          headers: ["WACE course", "ATAR (Southern)", "General (Southern)", "ATAR (Northern)", "General (Northern)"],
          rows: [
            ["Accounting and Finance",                       "Yes", "Yes", "Yes", ""],
            ["Applied Information Technology",               "Yes", "Yes", "",    "Yes"],
            ["Biology",                                      "Yes", "",    "",    ""],
            ["Business Management and Enterprise",           "Yes", "Yes", "Yes", ""],
            ["Career and Enterprise",                        "Yes", "Yes", "",    ""],
            ["Chemistry",                                    "Yes", "",    "Yes", ""],
            ["Chinese: First Language",                      "Yes", "",    "",    ""],
            ["Chinese: Second Language",                     "Yes", "",    "",    ""],
            ["Computer Science",                             "Yes", "Yes", "",    "Yes"],
            ["Design",                                       "",    "Yes", "",    ""],
            ["Drama",                                        "",    "Yes", "",    ""],
            ["Economics",                                    "Yes", "Yes", "Yes", ""],
            ["Engineering",                                  "",    "Yes", "",    ""],
            ["English",                                      "Yes", "Yes", "Yes", "Yes"],
            ["English as an Additional Language or Dialect", "Yes", "Yes", "Yes", ""],
            ["Food Science and Technology",                  "",    "Yes", "",    ""],
            ["Human Biology",                                "Yes", "",    "Yes", ""],
            ["Literature",                                   "Yes", "",    "",    ""],
            ["Mathematics Applications",                     "Yes", "",    "Yes", ""],
            ["Mathematics Essential",                        "",    "Yes", "",    ""],
            ["Mathematics Methods",                          "Yes", "",    "Yes", ""],
            ["Mathematics Specialist",                       "Yes", "",    "Yes", ""],
            ["Media Production and Analysis",                "Yes", "Yes", "",    ""],
            ["Modern History",                               "Yes", "",    "",    ""],
            ["Physics",                                      "Yes", "",    "Yes", ""],
            ["Politics and Law",                             "",    "Yes", "",    ""],
            ["Psychology",                                   "Yes", "",    "Yes", ""],
          ],
        },
        { type: "p", text: "The specific WACE courses each international school may offer their students are documented in the agreement between the school and the SCSA. Students should select the available WACE courses most suited to their desired pathways." },
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
          text: <>Find out more about SCSA International's curriculum programs for students in Years 11 and/or 12:<br /><Link to="/wace-international-years-11-and-12" className="text-orange underline hover:opacity-80">WACE International (Years 11 and 12)</Link><br /><Link to="/wam-international-year-12" className="text-orange underline hover:opacity-80">WAM International (Year 12)</Link>.</>,
        },

        { type: "h3", text: "Embedded general capabilities" },
        { type: "p", text: "The SCSA provides a set of general capabilities that encompass the knowledge, skills, behaviours and dispositions that will assist students in living and working successfully in the twenty-first century." },
        { type: "p", text: "The general capabilities are:" },
        {
          type: "ul",
          items: ["literacy", "numeracy", "information and communication technology capability", "critical and creative thinking", "personal and social capability", "ethical understanding", "intercultural understanding."],
        },
        {
          type: "p",
          text: <>Students develop capability when they apply knowledge and skills confidently, effectively and appropriately in their learning at school and in their lives outside of school. The general capabilities are interrelated and are not taught separately but addressed through the content of each of the learning areas. Therefore, they are not assessed separately. More information can be found on the general capabilities in the Western Australian curriculum page of the SCSA website at <Ext href="https://k10outline.scsa.wa.edu.au/home/teaching/general-capabilities-over/general-capabilities-overview/general-capabilities-in-the-australian-curriculum">https://k10outline.scsa.wa.edu.au/home/teaching/general-capabilities-over/general-capabilities-overview/general-capabilities-in-the-australian-curriculum</Ext>.</>,
        },

        { type: "h3", text: "Recognised qualification for university entrance" },
        { type: "p", text: "The SCSA's internationally recognised senior secondary curriculum programs provide a robust pathway that enables students to meet the pre-admission requirements of universities and other tertiary institutions." },

        { type: "h3", text: "WACE International curriculum program" },
        { type: "p", text: "While students typically complete the WACE International in their final two years of senior secondary school, there is no specified time limit for completion of this curriculum program. Study towards the achievement of the WACE may be undertaken over a lifetime. Individuals continuing to work towards the achievement of the WACE after they leave school will need to meet the WACE requirements applicable at that time. Schools must be approved to deliver the WACE International before enrolling students in this program." },

        { type: "h3", text: "WAM International curriculum program" },
        { type: "p", text: "The WAM International is a pre-university curriculum program recognised around the world and creates pathways to a wide range of study and career opportunities. The one-year WAM International is equivalent to Year 12 of the WACE International. Students who complete the requirements of the WAM International can achieve WACE certification. Schools must be approved to deliver the WAM International before enrolling students in this program." },

        {
          type: "p",
          text: <>Find out more about SCSA International's curriculum programs for students in Years 11 and/or 12:<br /><Link to="/wace-international-years-11-and-12" className="text-orange underline hover:opacity-80">WACE International (Years 11 and 12)</Link><br /><Link to="/wam-international-year-12" className="text-orange underline hover:opacity-80">WAM International (Year 12)</Link>.<br /><br />Find out more about the higher education opportunities that your students can pursue in Western Australia:<br /><a href="#" className="text-orange underline hover:opacity-80">Further study</a>.</>,
        },

        // ── INFORMATION FOR PARENTS ──────────────────────────────────────────
        { type: "h2", text: "Information for Parents" },
        {
          type: "p",
          text: <><Ext href="https://parent.scsa.wa.edu.au/">https://parent.scsa.wa.edu.au/</Ext> Parents and community.</>,
        },

        // ── SUPPORT ───────────────────────────────────────────────────────────
        { type: "h2", text: "Support" },
        {
          type: "node",
          node: (
            <DefTable
              rows={[
                {
                  title: "Single point of contact",
                  content: (
                    <>
                      <p>The SCSA will assign an experienced education consultant to coordinate support activities and provide a point of contact for all interactions between the school and the SCSA. These interactions cover areas that include:</p>
                      <Ul items={["agreements and invoicing", "curriculum support", "professional learning and moderation", "activities, reporting and other administrative matters."]} />
                      <p>The education consultant can provide a range of manuals and guidelines for reference by school leaders and teachers to ensure that the Western Australian curriculum is implemented in accordance with the SCSA's requirements and reflects commonly accepted practice.</p>
                      <p>Find out more about SCSA International's:<br />
                        <Link to="/school-approval-process" className="text-orange underline hover:opacity-80">School approval process</Link><br />
                        <Link to="/curriculum-activation-program" className="text-orange underline hover:opacity-80">Curriculum Activation Program</Link><br />
                        <a href="#" className="text-orange underline hover:opacity-80">SCSA Associate Program</a>.
                      </p>
                    </>
                  ),
                },
                {
                  title: "Policies to guide teaching, assessing and reporting",
                  content: (
                    <>
                      <p>The SCSA provides guidelines for schools about assessing and reporting student progress and achievement. Schools delivering Western Australian curriculum programs are required to develop a policy that provides their school community – students, parents/guardians/carers, teachers, school leaders and other relevant stakeholders, such as the School Board – with information about teaching, assessing and reporting in their school context.</p>
                      <p>Find out more about policy support in P–10 by visiting the <Ext href="https://k10outline.scsa.wa.edu.au/home/policy/teaching-assessing-and-reporting-policy">Pre-primary to Year 10: Teaching, Assessing and Reporting Policy</Ext> page of the SCSA website.</p>
                      <p>For Years 11 and 12, the <Ext href="https://senior-secondary.scsa.wa.edu.au/assessment/school-based-assessment/school-assessment-policy">school assessment policy</Ext> page of the SCSA website provides more information about policy support for senior secondary curriculum programs.</p>
                    </>
                  ),
                },
                {
                  title: "Sample programs, resources, tasks and marking keys",
                  content: <p>The SCSA provides sample teaching and learning outlines (K–10), course and assessment outlines (Years 11 and 12), sample assessment tasks and marking keys, and past Year 12 ATAR course examination papers with marking keys.</p>,
                },
                {
                  title: "Annotated work samples",
                  content: <p>The SCSA provides an extensive range of annotated student work samples which demonstrate how teachers may apply assessment pointers and grade descriptors to make fair and valid judgements of student achievement and inform reporting to parents.</p>,
                },
                {
                  title: "Moderation processes",
                  content: (
                    <>
                      <p>The SCSA conducts a number of moderation processes annually to support schools in achieving the standards encapsulated in the Western Australian curriculum. These processes help ensure the comparability of school marks and grades and fairness and credibility in marking and grading students. The SCSA's moderation processes include:</p>
                      <Ul items={[
                        "pre-delivery documentation review – focuses on teaching and assessment planning and assessment documentation before commencing the delivery of the Western Australian curriculum",
                        "syllabus delivery audit – focuses on teaching and assessment planning and assessment documentation after the first year of implementation",
                        "grading review – a review of planning and assessment documentation in addition to a ranked list of student marks, proposed grade distribution and selected student files",
                        "consensus moderation – an analysis of de-identified student responses to assessment tasks administered by other schools",
                        "small group moderation – where a school has less than six students in a particular Year 12 ATAR course, the school partners with another school to use common assessment-related documentation and processes for each applicable course.",
                      ]} />
                      <p>Find out more about the range of moderation processes used by the SCSA by visiting the <Ext href="https://senior-secondary.scsa.wa.edu.au/moderation">moderation page</Ext> of the SCSA website.</p>
                    </>
                  ),
                },
                {
                  title: "Statistical reporting",
                  content: (
                    <>
                      <p>The SCSA publishes statistical reports each year that include student achievement data and secondary education statistics. The reports can be found on the <Ext href="https://www.scsa.wa.edu.au/publications/reports/statistical-reports">statistical reports page</Ext> of the SCSA website.</p>
                      <p>Schools can also download and review WACE achievement data for their school. The comprehensive data and statistical reporting provided by the SCSA enables schools to review their approach to teaching and assessment and make adjustments where necessary.</p>
                    </>
                  ),
                },
              ]}
            />
          ),
        },

        // ── INFORMATION FOR SCSA ASSOCIATES ──────────────────────────────────
        { type: "h2", text: "Information for SCSA Associates" },
        { type: "p", text: <><a href="#" className="text-orange underline hover:opacity-80">SCSA Associate Program</a></> },

        // ── PROFESSIONAL LEARNING ─────────────────────────────────────────────
        { type: "h2", text: "Professional Learning" },
        {
          type: "node",
          node: (
            <DefTable
              rows={[
                {
                  title: "Syllabus-specific training",
                  content: (
                    <>
                      <p>The SCSA provides breadth and depth in its professional learning programs to support international schools in their transition to delivering the Western Australian curriculum and ongoing support thereafter. The SCSA's professional learning is delivered through face-to-face sessions, either online or in‑country, self‑directed e‑learning opportunities and tailored offerings. The SCSA's professional learning design and delivery are customised to the needs of individual international schools.</p>
                      <p>The SCSA's professional learning modules assist school and curriculum leaders to:</p>
                      <Ul items={[
                        "understand the SCSA's requirements",
                        "facilitate the school's implementation of the Western Australian curriculum",
                        "develop policy and whole-school curriculum planning.",
                      ]} />
                      <p>The SCSA's professional learning modules build teacher capacity to implement the Western Australian curriculum through their focus on:</p>
                      <Ul items={[
                        "developing an understanding of the depth and breadth of syllabus content",
                        "the SCSA's mandated teaching, assessment and reporting requirements",
                        "effective lesson planning",
                        "applying pedagogy to meet the ways of teaching and learning in the Western Australian curriculum",
                        "the needs of learners across the various phases of schooling, including English language skills",
                        "reflecting on professional practice, including teacher development and effective lesson planning.",
                      ]} />
                      <p>Find out more about SCSA International's:<br />
                        <Link to="/professional-learning-pathways-and-support" className="text-orange underline hover:opacity-80">Professional learning pathways</Link>
                      </p>
                    </>
                  ),
                },
                {
                  title: "Mentoring by curriculum and assessment experts",
                  content: <p>The SCSA provides curriculum experts who understand the intercultural complexities of international teaching contexts. They support teachers and school leaders by demonstrating how the Western Australian curriculum may be planned, sequenced, taught and assessed.</p>,
                },
                {
                  title: "Improving student performance workshops",
                  content: <p>The SCSA conducts improving student performance workshops for teachers of selected Year 11 and Year 12 ATAR and/or General WACE courses. These hands-on workshops, which are free to attend, support participants in developing their understanding of a range of topics, including syllabus content, course standards and assessment task design.</p>,
                },
                {
                  title: "Networking opportunities",
                  content: (
                    <p>The SCSA hosts a range of events that support teachers. These include assessment seminars, consensus moderation and professional development events. A complete list of events planned for this year is available on the <Ext href="https://www.scsa.wa.edu.au/events">events page</Ext> of the SCSA website.</p>
                  ),
                },
                {
                  title: "School visits",
                  content: (
                    <>
                      <p>SCSA visits to international schools develop a positive working relationship and promote goodwill and an effective partnership over time. The SCSA visits each of its approved international schools when international travel allows. The typical focus of school visits includes:</p>
                      <Ul items={[
                        "review of school planning to ensure the effective implementation of Western Australian curriculum programs",
                        "professional learning",
                        "school leader and teacher support",
                        "establishing and reviewing rectification strategies to address areas of non‑compliance or concern",
                        "speeches to groups of students and/or parents.",
                      ]} />
                    </>
                  ),
                },
                {
                  title: "School performance data",
                  content: <p>Approved international schools may access the Australian Council for Educational Research Progressive Achievement Tests (ACER PAT), which are standardised numeracy and literacy online tests that support the delivery of the WA K–10 International and inform teaching and assessment practices. The ACER PAT provides norm-referenced reports to enable schools to compare the achievement of their student cohorts to national norm samples.</p>,
                },
              ]}
            />
          ),
        },
      ]}
    />
  ),
});
