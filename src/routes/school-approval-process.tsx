import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "school-approval-process";

export const Route = createFileRoute("/school-approval-process")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "School Approval Process — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "How the SCSA evaluates licensing applications from international schools.",
      },
    ],
  }),
  component: SchoolApprovalProcess,
});

function SchoolApprovalProcess() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
