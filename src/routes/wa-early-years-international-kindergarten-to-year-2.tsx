import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "wa-early-years-international-kindergarten-to-year-2";

export const Route = createFileRoute("/wa-early-years-international-kindergarten-to-year-2")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "WA Early Years International — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "WA Early Years International is a Kindergarten to Year 2 curriculum program.",
      },
    ],
  }),
  component: WaEarlyYearsInternationalPage,
});

function WaEarlyYearsInternationalPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
