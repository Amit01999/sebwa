import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "the-scsa-and-sebwa";

export const Route = createFileRoute("/the-scsa-and-sebwa")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "The SCSA and SEBWA — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "How SEBWA partners with the SCSA to deliver the Western Australian curriculum across Bangladesh.",
      },
    ],
  }),
  component: TheScsaAndSebwaPage,
});

function TheScsaAndSebwaPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
