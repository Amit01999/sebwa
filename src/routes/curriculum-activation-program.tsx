import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "curriculum-activation-program";

export const Route = createFileRoute("/curriculum-activation-program")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "Curriculum Activation Program — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "A sequenced plan to help schools access the Western Australian curriculum, resources and professional learning.",
      },
    ],
  }),
  component: CurriculumActivationProgram,
});

function CurriculumActivationProgram() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
