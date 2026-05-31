import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import slide1 from "@/assets/scsa-international/Slide1.jpg";
import img3 from "@/assets/scsa-international/3.jpg";

export const Route = createFileRoute("/scsa-international")({
  head: () => ({
    meta: [
      { title: "SCSA International — SEBWA" },
      {
        name: "description",
        content:
          "SCSA International has been licensing schools to deliver the Western Australian curriculum since 1987.",
      },
    ],
  }),
  component: ScsaInternational,
});

function ScsaInternational() {
  return (
    <SiteLayout>
      {/* Vimeo video — centered, 16:9 */}
      <div className="mx-auto max-w-4xl px-4 lg:px-8 pt-14">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            src="https://player.vimeo.com/video/760137188?h=0f8a53853e&badge=0&autopause=0&player_id=0&app_id=58479"
            style={{ border: 0 }}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            className="absolute inset-0 w-full h-full"
            title="SCSA International"
          />
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 lg:px-8 py-14 lg:py-20 space-y-5 text-foreground/85 leading-relaxed text-[15.5px]">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">SCSA International</h1>

        <p>
          In 1987, the SCSA approved its first international school to deliver the Western
          Australian curriculum. Since then, the SCSA has acquired an appreciation of curriculum
          delivery internationally by working with approved schools across a range of countries.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold text-navy !mt-10">
          SCSA International areas of operation
        </h2>

        <img
          src={img3}
          alt="SCSA International areas of operation"
          className="w-full rounded-md object-cover"
        />

        <p>
          Making a difference to all students, their teachers and school communities is at the heart
          of SCSA International's work. SCSA International curriculum programs and support materials
          and processes are defined by the following four pillars.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold text-navy !mt-10">
          SCSA International's commitment to its international partners
        </h2>

        <img
          src={slide1}
          alt="SCSA International's commitment to its international partners"
          className="w-full rounded-md object-cover"
        />
      </article>
    </SiteLayout>
  );
}
