import type { Section } from "@/lib/queries/pages";
import { Hero } from "./Hero";
import { PageHero } from "./PageHero";
import { About } from "./About";
import { Programs } from "./Programs";
import { WhyWace } from "./WhyWace";
import { Universities } from "./Universities";
import { CTA } from "./CTA";
import { RichContentRenderer, type RichBlock } from "./RichContentRenderer";
import { LeadForm } from "./LeadForm";

export function SectionRenderer({ sections, pageSlug }: { sections: Section[]; pageSlug: string }) {
  const visible = [...sections]
    .filter((section) => section.visible !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {visible.map((section) => (
        <SectionItem
          key={section._id ?? `${section.type}-${section.order}`}
          section={section}
          pageSlug={pageSlug}
        />
      ))}
    </>
  );
}

function SectionItem({ section, pageSlug }: { section: Section; pageSlug: string }) {
  const data = section.data;

  switch (section.type) {
    case "hero":
      return (
        <Hero
          backgroundImage={data.backgroundImage as string | undefined}
          eyebrowLines={data.eyebrowLines as string[] | undefined}
          heading={data.heading as string}
          ctaLabel={data.ctaLabel as string | undefined}
          ctaHref={data.ctaHref as string | undefined}
        />
      );
    case "pageHero":
      return (
        <PageHero title={data.title as string} crumb={data.crumbLabel as string | undefined} />
      );
    case "about":
      return (
        <About
          eyebrow={data.eyebrow as string | undefined}
          lead={data.lead as string}
          bullets={data.bullets as string[] | undefined}
          video={data.video as { provider: "vimeo"; videoId: string; title?: string } | undefined}
          closing={data.closing as string | undefined}
        />
      );
    case "programsGrid":
      return (
        <Programs
          heading={data.heading as string}
          heroImage={data.heroImage as string | undefined}
          icon={data.icon as string | undefined}
          items={(data.items as { title: string; sub: string }[]) ?? []}
        />
      );
    case "whyWace":
      return (
        <WhyWace
          heading={data.heading as string}
          paragraph={data.paragraph as string}
          bullets={data.bullets as string[] | undefined}
        />
      );
    case "universitiesGrid":
      return (
        <Universities
          heading={data.heading as string}
          rows={(data.rows as { mediaAssetId?: string; alt: string }[][]) ?? []}
        />
      );
    case "cta":
      return (
        <CTA
          heading={data.heading as string}
          ctaLabel={data.ctaLabel as string}
          ctaHref={data.ctaHref as string}
        />
      );
    case "richContent":
      return (
        <RichContentRenderer
          intro={data.intro as string | undefined}
          blocks={(data.blocks as RichBlock[]) ?? []}
        />
      );
    case "leadForm":
      // LeadForm itself is deliberately unwrapped (contact-us.tsx places it
      // directly inside its own two-column grid), so as a standalone
      // top-level section it needs the same content container
      // RichContentRenderer's <article> provides — without this it renders
      // full-bleed, flush to the viewport edge instead of the page's
      // centered content column.
      return (
        <div className="mx-auto max-w-5xl px-4 lg:px-8 pb-14 lg:pb-16">
          <LeadForm
            variant={data.variant as "contact" | "lead"}
            heading={data.heading as string | undefined}
            intro={data.intro as string | undefined}
            pageSlug={pageSlug}
          />
        </div>
      );
    default:
      return null;
  }
}
