import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import type { ReactNode } from "react";

export const Route = createFileRoute("/wa-early-years-international-kindergarten-to-year-2")({
  head: () => ({
    meta: [
      { title: "WA Early Years International — SEBWA" },
      {
        name: "description",
        content: "WA Early Years International is a Kindergarten to Year 2 curriculum program.",
      },
    ],
  }),
  component: WaEarlyYearsInternational,
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

function WaEarlyYearsInternational() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-5xl px-4 lg:px-8 py-14 space-y-10 text-foreground/85 leading-relaxed text-[15.5px]">

        {/* What is WA Early Years International? */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What is WA Early Years International?
          </h2>
          <p>
            WA Early Years International is a curriculum program for Kindergarten to Year 2 designed
            to provide schools with comprehensive information to:
          </p>
          <Bullet
            items={[
              "plan student learning programs",
              "observe, monitor and assess student progress",
              "report to parents.",
            ]}
          />
          <p>
            WA Early Years International clearly sets out the knowledge, understanding, skills,
            values, attitudes and standards of achievement that all students are expected to acquire
            by completing the curriculum.
          </p>
        </section>

        {/* Entry requirements */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What are the entry requirements for WA Early Years International?
          </h2>
          <p>The SCSA sets no entry requirements for WA Early Years International.</p>
          <p>
            Note: the Kindergarten Curriculum Guidelines and the Western Australian curriculum are
            written in Standard Australian English (SAE).
          </p>
        </section>

        {/* Structure */}
        <section className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            How is WA Early Years International structured?
          </h2>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Kindergarten and Pre-Primary</h3>
            <p>
              In Western Australia, the principles, practice and learning outcomes of the Early Years
              Learning Framework (EYLF), guide educators' pedagogical decision making about
              children's learning in Kindergarten and Pre-primary.
            </p>
            <p>
              The Kindergarten Curriculum Guidelines (
              <Ext href="https://k10outline.scsa.wa.edu.au/home/teaching/kindergarten-curriculum-guidelines">
                https://k10outline.scsa.wa.edu.au/home/teaching/kindergarten-curriculum-guidelines
              </Ext>
              ) reinforce the themes of the SCSA's Kindergarten and Preprimary statement and the
              guiding principles for schools outlined in the Western Australian Curriculum and
              Assessment Outline (the Outline). The Outline can be found on the SCSA website at{" "}
              <Ext href="https://k10outline.scsa.wa.edu.au/">
                https://k10outline.scsa.wa.edu.au/
              </Ext>
              .
            </p>
            <p>
              The Kindergarten Curriculum Guidelines are based on the key ideas and related content
              from the EYLF to construct an integrated curriculum which ensures all children in
              Kindergarten experience quality learning. Kindergarten is not a compulsory year of
              schooling in Western Australia.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Pre-primary to Year 2</h3>
            <p>
              WA Early Years International contains year‑level syllabuses for the eight learning
              areas of the Western Australian curriculum shown below.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">
              Learning areas of the Western Australian curriculum
            </h3>
            <p>
              The teaching and learning in Years 1 and 2 continue to be influenced by the
              principles, practice and pedagogy of the EYLF (birth to Year 2).
            </p>
            <p>
              Learning areas must be implemented and the Western Australian curriculum delivered by
              schools in accordance with the SCSA's Pre‑primary to Year 10: Teaching, Assessing and
              Reporting Policy and Policy Standards for Pre-primary to Year 10: Teaching, Assessing
              and Reporting. The SCSA provides scope and sequence documents which summarise the
              content and skills needed to be taught for each year level and learning area.
            </p>
          </div>
        </section>

        {/* Notional hours */}
        <section className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What are the notional hours of delivery for WA Early Years International?
          </h2>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Kindergarten</h3>
            <p>
              The Department of Education, Western Australia, recommends that Kindergarten runs for
              15 hours each week.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Pre-Primary to Year 2</h3>
            <p>
              SCSA's notional time allocation guidelines for Pre-primary to Year 2 assume a 25‑hour
              teaching week over 40 teaching weeks per year. It is recognised that school teaching
              hours often exceed 25 hours per week and that the length of the school year may vary.
            </p>
          </div>
        </section>

        {/* Textbooks */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            Are textbooks prescribed for WA Early Years International?
          </h2>
          <p>
            The SCSA does not publish, prescribe or endorse textbooks, but supplies a list of
            textbooks and other resources commonly used by Western Australian schools in sample
            teaching and learning outlines for each learning area and year level.
          </p>
        </section>

        {/* Assessment */}
        <section className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            How is WA Early Years International assessed?
          </h2>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Kindergarten and Pre-Primary</h3>
            <p>
              Assessment for learning is guided by the EYLF and refers to the process of gathering
              and analysing information as evidence about what children know, can do and understand.
              It is an ongoing cycle that includes planning, documenting and evaluating children's
              learning.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Pre-primary to Year 2</h3>
            <p>
              Schools develop assessments in relation to the curriculum content and achievement
              standards, observing the SCSA's Principles of Assessment. The SCSA provides exemplar
              assessments and guidance.
            </p>
            <p>
              There are no external tests or examinations. Schools may decide to conduct on-entry
              testing.
            </p>
          </div>
        </section>

        {/* Moderation */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What type of moderation activities take place?
          </h2>
          <p>
            The purpose of the moderation process is to work with schools and teachers to develop a
            comprehensive and shared understanding of the achievement standards. Teachers will
            develop an understanding of the benefits and use of diagnostic tools and assessment
            strategies to make valid, reliable and consistent judgements on student progression and
            achievement. Schools that participate in the moderation process with the SCSA will be
            able to apply the model within their school for school‑based moderation and
            comparability practices across all year levels.
          </p>
        </section>

        {/* Further information */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            Where can I find further information?
          </h2>
          <p>
            Further information relating to WA Early Years International can be found on the K–10
            Outline page of the SCSA's website at{" "}
            <Ext href="https://k10outline.scsa.wa.edu.au/home">
              https://k10outline.scsa.wa.edu.au/home
            </Ext>
            .
          </p>
        </section>

      </article>
    </SiteLayout>
  );
}
