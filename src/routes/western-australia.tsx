import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/western-australia")({
  head: () => ({
    meta: [
      { title: "Western Australia — SEBWA" },
      {
        name: "description",
        content: "Why Western Australia is a leading study destination for international students.",
      },
    ],
  }),
  component: WesternAustralia,
});

function WesternAustralia() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 lg:px-8 py-14 lg:py-20 flex flex-col gap-10">
        {/* Video 1 */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/760150280?h=a1a6dfebcb"
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
            src="https://player.vimeo.com/video/727188788?h=ac074d5513"
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
