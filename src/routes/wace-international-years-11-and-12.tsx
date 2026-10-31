import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "wace-international-years-11-and-12";

export const Route = createFileRoute("/wace-international-years-11-and-12")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "WACE International (Years 11 & 12) — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "WACE International is an internationally recognised two-year senior secondary program for Years 11 and 12.",
      },
    ],
  }),
  component: WaceInternationalPage,
});

function WaceInternationalPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
