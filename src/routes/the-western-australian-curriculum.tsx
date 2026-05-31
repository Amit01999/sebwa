import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/the-western-australian-curriculum")({
  head: () => ({
    meta: [
      { title: "The Western Australian Curriculum — SEBWA" },
      {
        name: "description",
        content:
          "An overview of the Western Australian curriculum delivered by SCSA-licensed international schools.",
      },
    ],
  }),
  component: WesternAustralianCurriculum,
});

function WesternAustralianCurriculum() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 lg:px-8 py-14 lg:py-20 flex flex-col gap-10">
        {/* Video 1 */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/727191185?h=4809a8fffc"
            style={{ border: 0 }}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Video 2 */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/727192729?h=4f74a500fc"
            style={{ border: 0 }}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </SiteLayout>
  );
}
