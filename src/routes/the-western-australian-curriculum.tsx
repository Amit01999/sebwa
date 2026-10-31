import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "the-western-australian-curriculum";

export const Route = createFileRoute("/the-western-australian-curriculum")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "The Western Australian Curriculum — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "An overview of the Western Australian curriculum delivered by SCSA-licensed international schools.",
      },
    ],
  }),
  component: WesternAustralianCurriculumPage,
});

function WesternAustralianCurriculumPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
