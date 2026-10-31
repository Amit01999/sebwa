import { queryOptions } from "@tanstack/react-query";
import { publicFetch } from "./http";

export type SiteSettingsData = {
  contact: { phones: string[]; email: string; address: string; hours: string };
  social: { facebook: string; instagram: string; youtube: string };
  footer: {
    navLinks: { label: string; href: string; order: number; visible: boolean }[];
    accreditationLogos: { mediaAsset?: string; alt: string; order: number }[];
  };
  seoDefaults: { titleSuffix: string; defaultOgImage?: string };
};

// Last-resort fallback if the backend is unreachable — footer/contact page
// render with empty contact details rather than crashing.
const FALLBACK_SETTINGS: SiteSettingsData = {
  contact: { phones: [], email: "", address: "", hours: "" },
  social: { facebook: "", instagram: "", youtube: "" },
  footer: { navLinks: [], accreditationLogos: [] },
  seoDefaults: { titleSuffix: " — SEBWA" },
};

export function settingsQueryOptions() {
  return queryOptions({
    queryKey: ["settings"],
    queryFn: async (): Promise<SiteSettingsData> => {
      try {
        return await publicFetch<SiteSettingsData>("/api/settings");
      } catch (error) {
        console.error("Failed to load site settings, using fallback", error);
        return FALLBACK_SETTINGS;
      }
    },
    staleTime: 60_000,
  });
}
