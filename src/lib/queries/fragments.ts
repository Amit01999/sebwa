import { queryOptions } from "@tanstack/react-query";
import { publicFetch } from "./http";

export type ContentFragmentData = {
  key: string;
  type: "courseTable";
  data: { columns: string[]; rows: { program: string; values: (boolean | string)[] }[] };
};

// Needed by the `courseTableRef` rich-content block (e.g. the shared
// WACE/WAM course-availability table) to resolve its data on public pages.
export function fragmentQueryOptions(key: string) {
  return queryOptions({
    queryKey: ["fragment", key],
    queryFn: async (): Promise<ContentFragmentData | null> => {
      try {
        const { fragment } = await publicFetch<{ fragment: ContentFragmentData }>(
          `/api/fragments/${key}`,
        );
        return fragment;
      } catch (error) {
        console.error(`Failed to load fragment "${key}"`, error);
        return null;
      }
    },
    staleTime: 60_000,
  });
}
