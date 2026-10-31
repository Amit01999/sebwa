import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { SectionRenderer } from "@/components/site/SectionRenderer";
import { pageQueryOptions } from "@/lib/queries/pages";

const SLUG = "about-us";

export const Route = createFileRoute("/about-us")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(pageQueryOptions(SLUG)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.seo?.title || "About Us — SEBWA" },
      {
        name: "description",
        content:
          loaderData?.seo?.description ||
          "Learn about Sunshine Grammar School, SEBWA and the School Curriculum and Standards Authority of Western Australia.",
      },
    ],
  }),
  component: AboutUsPage,
});

function AboutUsPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(SLUG));
  return (
    <SiteLayout>{page && <SectionRenderer sections={page.sections} pageSlug={SLUG} />}</SiteLayout>
  );
}
