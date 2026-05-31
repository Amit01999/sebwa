import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import type { ReactNode } from "react";

export const Route = createFileRoute("/wam-international-year-12")({
  head: () => ({
    meta: [
      { title: "WAM International (Year 12) — SEBWA" },
      {
        name: "description",
        content:
          "WAM International is a one-year, internationally recognised Year 12 program equivalent to WACE.",
      },
    ],
  }),
  component: WamInternational,
});

const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-orange underline hover:opacity-80 break-all"
  >
    {children}
  </a>
);

function Bullet({ items }: { items: ReactNode[] }) {
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

const courses: [string, string, string, string, string][] = [
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
];

function WamInternational() {
  return (
    <SiteLayout>
      {/* Vimeo video */}
      <div className="mx-auto max-w-5xl px-4 lg:px-8 pt-14">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/727187597?h=7a28d02886"
            style={{ border: 0 }}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-4 lg:px-8 py-14 space-y-10 text-foreground/85 leading-relaxed text-[15.5px]">

        {/* What is WAM International? */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">What is WAM International?</h2>
          <p>
            WAM International is an internationally recognised one-year secondary curriculum program
            equivalent to Year 12 (Grade XII) of the WACE International that enables students to meet
            the pre-admission requirements of tertiary institutions.
          </p>
        </section>

        {/* Entry requirements */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What are the entry requirements for WAM International?
          </h2>
          <p>The SCSA sets no entry requirements for WAM International.</p>
          <p>
            Note: the Western Australian curriculum is written in Standard Australian English (SAE)
            and course content must be taught in English to prepare students for the final
            examinations conducted by the SCSA.
          </p>
        </section>

        {/* Courses */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What courses can be studied as part of WAM International?
          </h2>
          <p>
            Students in approved international schools may enrol in the following courses as part of
            their WAM International studies.
          </p>
          <h3 className="text-xl font-semibold text-foreground">
            WACE courses studied as part of WAM International
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    className="border border-border px-3 py-2 text-left font-semibold bg-mist/40 align-middle"
                  >
                    WACE course
                  </th>
                  <th
                    colSpan={2}
                    className="border border-border px-3 py-2 text-center font-semibold bg-mist/40"
                  >
                    Southern hemisphere
                    <br />
                    <span className="font-normal text-xs">academic calendar</span>
                  </th>
                  <th
                    colSpan={2}
                    className="border border-border px-3 py-2 text-center font-semibold bg-mist/40"
                  >
                    Northern hemisphere
                    <br />
                    <span className="font-normal text-xs">academic calendar</span>
                  </th>
                </tr>
                <tr>
                  <th className="border border-border px-3 py-2 text-center font-semibold bg-mist/40">ATAR</th>
                  <th className="border border-border px-3 py-2 text-center font-semibold bg-mist/40">General</th>
                  <th className="border border-border px-3 py-2 text-center font-semibold bg-mist/40">ATAR</th>
                  <th className="border border-border px-3 py-2 text-center font-semibold bg-mist/40">General</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(([course, sATAR, sGen, nATAR, nGen], i) => (
                  <tr key={i} className={i % 2 === 1 ? "bg-mist/20" : ""}>
                    <td className="border border-border px-3 py-2">{course}</td>
                    <td className="border border-border px-3 py-2 text-center">{sATAR}</td>
                    <td className="border border-border px-3 py-2 text-center">{sGen}</td>
                    <td className="border border-border px-3 py-2 text-center">{nATAR}</td>
                    <td className="border border-border px-3 py-2 text-center">{nGen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Notional hours */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What are the notional hours of delivery for WAM International courses?
          </h2>
          <p>
            Fifty‑five hours of student contact time are required for each semester‑long unit for
            each course (subject). While the WAM International is typically a one-year program,
            schools can discuss alternative delivery arrangements with the SCSA but must deliver all
            syllabus content, including the required assessments.
          </p>
        </section>

        {/* Textbooks */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            Are textbooks prescribed for WAM International courses?
          </h2>
          <p>
            The SCSA does not publish, prescribe or endorse textbooks, but can supply a list of
            textbooks and other resources commonly used by Western Australian schools.
          </p>
        </section>

        {/* Assessment */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            How is WAM International assessed?
          </h2>
          <p>
            Schools must develop assessments for the assessment types identified in the syllabus for
            each course delivered. Schools can use the exemplar assessment tasks made available by
            the SCSA and should observe the Principles of Assessment described in the WACE Manual,
            accessible from the SCSA website at{" "}
            <Ext href="https://senior-secondary.scsa.wa.edu.au/further-resources/wace-manual">
              https://senior-secondary.scsa.wa.edu.au/further-resources/wace-manual
            </Ext>
            .
          </p>
        </section>

        {/* Final examinations */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What happens with the final ATAR course examinations?
          </h2>
          <p>
            WAM International students enrolled in ATAR courses sit final examinations administered
            by the SCSA to receive an ATAR for university entrance.
          </p>
          <p>
            Academic calendars are offered for the Southern hemisphere (October/November) and
            Northern hemisphere (March/April). The school provides a venue, secure storage of the
            examinations and the SCSA sets, administers and marks the ATAR course examinations.
          </p>
        </section>

        {/* Certification */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What certification and acknowledgement can WAM International students receive?
          </h2>
          <p>WAM International students can achieve the following certification and acknowledgement:</p>
          <Bullet
            items={[
              "Western Australian Certificate of Education (WACE)",
              "Western Australian Statement of Student Achievement (WASSA)",
              "Australian Tertiary Admission Rank (ATAR)",
              "Year 12 exhibitions and awards.",
            ]}
          />
        </section>

        {/* WACE */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">What is the WACE?</h2>
          <p>
            The WACE is the certificate students receive when they meet the specified requirements in
            their senior secondary schooling. The WACE can be achieved through successful completion
            of the WACE International or WAM International. Achievement of the WACE shows a student
            has successfully met a set of standards for breadth and depth, achievement and literacy
            and numeracy at senior secondary school level and confirms graduation.
          </p>
        </section>

        {/* WASSA */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">What is the WASSA?</h2>
          <p>
            The WASSA provides a formal record of what students leaving in Year 12 have achieved, as
            a result of their education in Western Australia.
          </p>
          <p>The WASSA formally records what a student has completed during their senior secondary schooling:</p>
          <Bullet
            items={[
              "achievement of the WACE requirements",
              "achievement of the literacy (reading and writing) standard",
              "achievement of the numeracy standard",
              "achievement of exhibitions and awards",
              "school grades, school marks, and combined scores in ATAR units",
              "school grades and school marks in General units",
              "completed Preliminary units",
              "completed endorsed programs.",
            ]}
          />
          <p>
            The WASSA is like the academic transcript students receive from universities and training
            providers. Students can use the detail in the WASSA to support their applications for
            employment, further education and training.
          </p>
        </section>

        {/* ATAR */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">What is the ATAR?</h2>
          <p>
            The ATAR reports a student's rank position relative to all other students for a
            particular year and ranges from 0.00 to 99.95. The ATAR is used to determine eligibility
            for university entrance and entry into tertiary courses in Australia and internationally.
          </p>
          <p>
            The ATAR is certified, an ATAR certificate is provided by TISC in hard copy on official
            TISC stationery. The ATAR certificate indicates a student's ATAR, course data and scaled
            scores.
          </p>
          <p>The ATAR is recognised globally.</p>
        </section>

        {/* WACE requirements */}
        <section className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What requirements are needed to achieve the WACE through the WAM International program?
          </h2>
          <p>
            These are the minimum requirements for students to receive a WACE through WAM
            International in 2023 and beyond.
          </p>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Breadth and depth</h3>
            <p>
              a) Completion of a minimum of 10 units, which may include unit equivalents attained
              through VET and/or endorsed programs. This requirement must include at least:
              (Explanatory notes 1, 2, 3, 4 and 5)
            </p>
            <Bullet
              items={[
                "a minimum of ten Year 12 units, or the equivalent",
                "at least one pair of Year 12 units from an English learning area course",
                "one pair of Year 12 units from each of List A (arts/languages/social sciences) and List B (mathematics/science/technology).",
              ]}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Achievement standard</h3>
            <p>a) Achievement of at least six C grades (or the equivalent) in Year 12 units.</p>
            <p>b) Completion of:</p>
            <Bullet
              items={[
                "at least four Year 12 ATAR courses (Explanatory note 5), or",
                "at least five Year 12 General courses (Explanatory note 7) (or a combination of General and up to three Year 12 ATAR courses (Explanatory note 5)) or equivalent (Explanatory note 8), or",
                "a Certificate II (or higher) VET qualification (Explanatory notes 9 and 10) in combination with ATAR, General or Foundation courses.",
              ]}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Literacy and numeracy standard</h3>
            <p>
              a) Demonstration of the minimum standard of literacy and numeracy. (Explanatory notes
              11 and 12)
            </p>
            <p>
              More information, including explanatory notes, is available from the WACE Requirements
              page of the SCSA website at{" "}
              <Ext href="https://senior-secondary.scsa.wa.edu.au/the-wace/wace-requirements">
                https://senior-secondary.scsa.wa.edu.au/the-wace/wace-requirements
              </Ext>
              .
            </p>
          </div>
        </section>

        {/* Where is WACE recognised? */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">Where is WACE recognised?</h2>
          <p>
            The Western Australian curriculum has proven to be a strong foundation for students
            successfully transitioning to higher education studies. The WACE is recognised nationally
            and internationally by universities and other tertiary institutions, industry and
            training providers due to SCSA's:
          </p>
          <Bullet
            items={[
              "effective approach to curriculum design and certification standards, including demonstration of a minimum level of literacy and numeracy, a minimum level of academic achievement and breadth and depth in enrolment",
              "rigorous assessment standards and moderation procedures that are informed by the latest national and international research",
              "provision of ATAR courses that allow multiple opportunities for students to acquire and develop highly transferrable skills, including personal and social capabilities, intercultural understandings and critical and creative thinking",
              "provision of ATAR English learning area courses, including English as an Additional Language or Dialect (EAL/D), English and Literature, which develop academic English skills for learners with different abilities to meet university English proficiency requirements internationally.",
            ]}
          />
        </section>

        {/* ATAR calculated */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            How is the ATAR calculated?
          </h2>
          <p>
            The ATAR is calculated by the Tertiary Institutions Service Centre (TISC) using the
            final marks determined by the SCSA. Find out more by visiting the TISC website at{" "}
            <Ext href="https://www.tisc.edu.au/static/home.tisc">
              https://www.tisc.edu.au/static/home.tisc
            </Ext>
            .
          </p>
        </section>

        {/* Further information */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            Where can I find further information?
          </h2>
          <p>
            Further information can be found on the Years 11 and 12 page of the SCSA website at{" "}
            <Ext href="https://senior-secondary.scsa.wa.edu.au/">
              https://senior-secondary.scsa.wa.edu.au/
            </Ext>
            .
          </p>
        </section>

      </article>
    </SiteLayout>
  );
}
