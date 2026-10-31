import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "start-teaching";

export const Route = createFileRoute("/start-teaching")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "Start Teaching — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "Get started teaching the Western Australian curriculum with SCSA guidance and professional learning.",
      },
    ],
  }),
  component: StartTeachingPage,
});

function StartTeachingPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
