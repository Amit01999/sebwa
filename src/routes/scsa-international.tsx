import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "scsa-international";

export const Route = createFileRoute("/scsa-international")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "SCSA International — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "SCSA International has been licensing schools to deliver the Western Australian curriculum since 1987.",
      },
    ],
  }),
  component: ScsaInternationalPage,
});

function ScsaInternationalPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
