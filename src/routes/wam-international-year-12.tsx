import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "wam-international-year-12";

export const Route = createFileRoute("/wam-international-year-12")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "WAM International (Year 12) — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "WAM International is a one-year, internationally recognised Year 12 program equivalent to WACE.",
      },
    ],
  }),
  component: WamInternationalPage,
});

function WamInternationalPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
