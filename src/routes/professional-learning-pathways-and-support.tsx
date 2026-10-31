import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "professional-learning-pathways-and-support";

export const Route = createFileRoute("/professional-learning-pathways-and-support")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "Professional Learning Pathways and Support — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "Diverse professional learning pathways for school leaders, curriculum leaders and teachers.",
      },
    ],
  }),
  component: ProfessionalLearning,
});

function ProfessionalLearning() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
