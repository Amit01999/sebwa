import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "western-australian-curriculum-programs";

export const Route = createFileRoute("/western-australian-curriculum-programs")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "Western Australian Curriculum Programs — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "World-class curriculum programs SCSA offers to international schools — Early Years, K–10, WACE and WAM.",
      },
    ],
  }),
  component: WesternAustralianCurriculumProgramsPage,
});

function WesternAustralianCurriculumProgramsPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
