import { queryOptions } from "@tanstack/react-query";
import { publicFetch } from "./http";

export type NavChild = { label: string; to: string; order: number };
export type NavItem = { label: string; to: string; order: number; children: NavChild[] };
export type NavigationData = { items: NavItem[]; ctaButton: { label: string; to: string } };

// Last-resort fallback if the backend is unreachable — keeps the header
// usable (logo + a way to get home/contact) instead of crashing the SSR
// pipeline or rendering an empty nav bar.
const FALLBACK_NAVIGATION: NavigationData = {
  items: [{ label: "Home", to: "/", order: 0, children: [] }],
  ctaButton: { label: "Contact Us", to: "/contact-us" },
};

export function navigationQueryOptions() {
  return queryOptions({
    queryKey: ["navigation"],
    queryFn: async (): Promise<NavigationData> => {
      try {
        return await publicFetch<NavigationData>("/api/navigation");
      } catch (error) {
        console.error("Failed to load navigation, using fallback", error);
        return FALLBACK_NAVIGATION;
      }
    },
    staleTime: 60_000,
  });
}
