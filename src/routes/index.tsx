import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Programs } from "@/components/site/Programs";
import { WhyWace } from "@/components/site/WhyWace";
import { Universities } from "@/components/site/Universities";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEBWA — Sunshine Education Bangladesh WACE Australia" },
      {
        name: "description",
        content:
          "SEBWA brings the Western Australian Curriculum to schools across Bangladesh — world-class programs, structured support and professional learning.",
      },
      { property: "og:title", content: "SEBWA — Western Australian Curriculum in Bangladesh" },
      { property: "og:description", content: "Join SEBWA's family of schools leading the way to a world of opportunity." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <About />
      <Programs />
      <WhyWace />
      <Universities />
      <CTA />
    </SiteLayout>
  );
}
