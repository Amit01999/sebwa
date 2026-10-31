import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "wa-k-10-international-kindergarten-to-year-10";

export const Route = createFileRoute("/wa-k-10-international-kindergarten-to-year-10")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "WA K–10 International — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "WA K–10 International is a comprehensive Kindergarten to Year 10 curriculum program.",
      },
    ],
  }),
  component: WaK10InternationalPage,
});

function WaK10InternationalPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
