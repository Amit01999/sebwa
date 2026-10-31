import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "how-do-i-apply";

export const Route = createFileRoute("/how-do-i-apply")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "How Do I Apply — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "How to apply to deliver the Western Australian curriculum at your school.",
      },
    ],
  }),
  component: HowDoIApplyPage,
});

function HowDoIApplyPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
