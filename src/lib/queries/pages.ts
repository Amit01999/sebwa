import { queryOptions } from "@tanstack/react-query";
import { publicFetch } from "./http";

export type Section = {
  _id?: string;
  type: string;
  order: number;
  visible?: boolean;
  data: Record<string, unknown>;
};

export type PageDoc = {
  slug: string;
  title: string;
  seo?: { title?: string; description?: string; ogImage?: string };
  status: "draft" | "published";
  sections: Section[];
};

export type PageData = PageDoc | null;

export function pageQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["page", slug],
    queryFn: async (): Promise<PageData> => {
      try {
        const { page } = await publicFetch<{ page: PageDoc }>(`/api/pages/${slug}`);
        return page;
      } catch (error) {
        // Page missing, unpublished, or the backend is briefly down — render
        // just the header/footer shell instead of failing the whole route.
        console.error(`Failed to load page "${slug}", rendering an empty shell`, error);
        return null;
      }
    },
    staleTime: 30_000,
  });
}
