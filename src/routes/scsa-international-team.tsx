import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "scsa-international-team";

export const Route = createFileRoute("/scsa-international-team")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "SCSA International Team — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "Meet the SCSA International team focused on the curriculum and assessment needs of international schools.",
      },
    ],
  }),
  component: ScsaInternationalTeamPage,
});

function ScsaInternationalTeamPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
