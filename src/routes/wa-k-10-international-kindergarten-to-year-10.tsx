import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import type { ReactNode } from "react";

export const Route = createFileRoute("/wa-k-10-international-kindergarten-to-year-10")({
  head: () => ({
    meta: [
      { title: "WA K–10 International — SEBWA" },
      {
        name: "description",
        content:
          "WA K–10 International is a comprehensive Kindergarten to Year 10 curriculum program.",
      },
    ],
  }),
  component: WaK10International,
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

function WaK10International() {
  return (
    <SiteLayout>
      {/* Vimeo video */}
      <div className="mx-auto max-w-5xl px-4 lg:px-8 pt-14">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/727197014?h=25c5babb45"
            style={{ border: 0 }}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-4 lg:px-8 py-14 space-y-10 text-foreground/85 leading-relaxed text-[15.5px]">

        {/* What is WA K–10 International? */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What is WA K–10 International?
          </h2>
          <p>
            WA K–10 International is a curriculum program for Kindergarten to Year 10 designed to
            provide schools with comprehensive information to:
          </p>
          <Bullet
            items={[
              "plan student learning programs",
              "assess student progress",
              "report to parents.",
            ]}
          />
          <p>
            WA K–10 International clearly sets out the knowledge, understanding, skills, values,
            attitudes and standards of achievement that all students are expected to acquire by
            completing the Western Australian curriculum. Successful completion of the curriculum
            provided within WA K–10 International ensures students are well placed to progress to
            the Western Australian Certificate of Education International (WACE International).
          </p>
        </section>

        {/* Entry requirements */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What are the entry requirements for WA K–10 International?
          </h2>
          <p>The SCSA sets no entry requirements for WA K–10 International.</p>
          <p>Note: the Western Australian curriculum is written in Standard Australian English (SAE).</p>
        </section>

        {/* Structure */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            How is WA K–10 International structured?
          </h2>
          <p>
            WA K–10 International contains year‑level syllabuses for the eight learning areas of
            the Western Australian curriculum shown below.
          </p>
          <h3 className="text-xl font-semibold text-foreground">
            Learning areas of the Western Australian curriculum
          </h3>
          <p>
            Learning areas must be implemented and the Western Australian curriculum delivered by
            schools in accordance with the SCSA's Pre‑primary to Year 10: Teaching, Assessing and
            Reporting Policy and Policy Standards for Pre-primary to Year 10: Teaching, Assessing
            and Reporting (
            <Ext href="https://k10outline.scsa.wa.edu.au/home/policy/teaching-assessing-and-reporting-policy">
              https://k10outline.scsa.wa.edu.au/home/policy/teaching-assessing-and-reporting-policy
            </Ext>
            ). The SCSA provides scope and sequence documents which summarise the content and skills
            needed to be taught for each year level and learning area.
          </p>
        </section>

        {/* Notional hours */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What are the notional hours of delivery for WA K–10 International?
          </h2>
          <p>
            SCSA's notional time allocation guidelines for WA K–10 International assume a 25‑hour
            teaching week over 40 teaching weeks per year. It is recognised that school teaching
            hours often exceed 25 hours per week and that the length of the school year may vary.
          </p>
        </section>

        {/* Textbooks */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            Are textbooks prescribed for WA K–10 International?
          </h2>
          <p>
            The SCSA does not publish, prescribe or endorse textbooks, but supplies a list of
            textbooks and other resources commonly used by Western Australian schools in sample
            teaching and learning outlines for each learning area and year level.
          </p>
        </section>

        {/* Assessment */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            How is WA K–10 International assessed?
          </h2>
          <p>
            Schools develop assessments in relation to the curriculum content and achievement
            standards, observing the SCSA's Principles of Assessment. The SCSA provides exemplar
            assessments and guidance.
          </p>
          <p>There are no external tests or examinations.</p>
        </section>

        {/* Moderation */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What type of moderation activities take place?
          </h2>
          <p>
            Schools can elect to participate in moderation activities. The purpose of the moderation
            process is to work with schools and teachers to develop a comprehensive and shared
            understanding of the achievement standards. Teachers will develop an understanding of
            the benefits and use of marking keys as diagnostic tools and make valid, reliable and
            consistent judgements on student achievement. Schools that participate in the moderation
            process with the SCSA will be able to apply the model within their school for
            school‑based moderation and comparability practices across all year levels.
          </p>
        </section>

        {/* Further information */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            Where can I find further information?
          </h2>
          <p>
            Further information relating to WA K–10 International can be found on the K–10 Outline
            page of the SCSA's website at{" "}
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
