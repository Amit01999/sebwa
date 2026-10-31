import { queryOptions } from "@tanstack/react-query";
import { api } from "./api-client";

// --- Shared types -----------------------------------------------------

export type AdminUserSummary = { id: string; email: string; name: string };
export type MeResponse = { user: AdminUserSummary; csrfToken: string };

export type Section = {
  _id: string;
  type:
    | "hero"
    | "pageHero"
    | "about"
    | "programsGrid"
    | "whyWace"
    | "universitiesGrid"
    | "cta"
    | "richContent"
    | "leadForm";
  order: number;
  visible: boolean;
  data: Record<string, unknown>;
};

export type Page = {
  slug: string;
  title: string;
  seo?: { title?: string; description?: string; ogImage?: string };
  status: "draft" | "published";
  sections: Section[];
  updatedAt: string;
};

export type PageSummary = {
  slug: string;
  title: string;
  status: "draft" | "published";
  updatedAt: string;
};

export type NavChild = { _id?: string; label: string; to: string; order: number };
export type NavItem = {
  _id?: string;
  label: string;
  to: string;
  order: number;
  children: NavChild[];
};
export type NavigationMenu = { items: NavItem[]; ctaButton: { label: string; to: string } };

export type SiteSettings = {
  contact: { phones: string[]; email: string; address: string; hours: string };
  social: { facebook: string; instagram: string; youtube: string };
  footer: {
    navLinks: { _id?: string; label: string; href: string; order: number; visible: boolean }[];
    accreditationLogos: { _id?: string; mediaAsset?: string; alt: string; order: number }[];
  };
  seoDefaults: { titleSuffix: string; defaultOgImage?: string };
};

export type MediaAsset = {
  _id: string;
  publicId: string;
  url: string;
  resourceType: "image" | "video";
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  altText: string;
  tags: string[];
  createdAt: string;
};

export type ContentFragment = {
  _id: string;
  key: string;
  type: "courseTable";
  data: { columns: string[]; rows: { program: string; values: (boolean | string)[] }[] };
};

export type FormSubmissionNote = {
  _id: string;
  text: string;
  createdBy?: string;
  createdAt: string;
};
export type FormSubmission = {
  _id: string;
  formType: "contact" | "lead";
  pageSlug: string;
  name: string;
  email: string;
  fields: Record<string, string>;
  referenceId: string;
  status: "new" | "in_progress" | "resolved";
  notes: FormSubmissionNote[];
  createdAt: string;
};

export type AdminUserRecord = {
  _id: string;
  email: string;
  name: string;
  role: "admin";
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
};

export type DashboardOverview = {
  pagesTotal: number;
  pagesPublished: number;
  pagesDraft: number;
  mediaCount: number;
  submissionsNew: number;
  submissionsTotal: number;
  recentSubmissions: FormSubmission[];
  recentlyUpdatedPages: PageSummary[];
};

// --- Query option factories --------------------------------------------

export const meQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "me"],
    queryFn: () => api.get<MeResponse>("/api/admin/auth/me"),
    retry: false,
  });

export const dashboardOverviewQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "dashboard", "overview"],
    queryFn: () => api.get<DashboardOverview>("/api/admin/dashboard/overview"),
  });

export const pagesListQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "pages"],
    queryFn: () => api.get<{ pages: PageSummary[] }>("/api/admin/pages"),
  });

export const pageDetailQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["admin", "pages", slug],
    queryFn: () => api.get<{ page: Page }>(`/api/admin/pages/${slug}`),
  });

export const navigationAdminQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "navigation"],
    queryFn: () => api.get<{ navigation: NavigationMenu }>("/api/admin/navigation"),
  });

export const settingsAdminQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "settings"],
    queryFn: () => api.get<{ settings: SiteSettings }>("/api/admin/settings"),
  });

export type MediaListParams = { search?: string; tag?: string; page?: number; limit?: number };
function buildQueryString(params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const mediaListQueryOptions = (params: MediaListParams = {}) =>
  queryOptions({
    queryKey: ["admin", "media", params],
    queryFn: () =>
      api.get<{ items: MediaAsset[]; total: number; page: number; limit: number }>(
        `/api/admin/media${buildQueryString(params)}`,
      ),
  });

export const fragmentsQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "fragments"],
    queryFn: () => api.get<{ fragments: ContentFragment[] }>("/api/admin/fragments"),
  });

export const fragmentQueryOptions = (key: string) =>
  queryOptions({
    queryKey: ["admin", "fragments", key],
    queryFn: () => api.get<{ fragment: ContentFragment }>(`/api/admin/fragments/${key}`),
  });

export type SubmissionsListParams = {
  status?: "new" | "in_progress" | "resolved";
  formType?: "contact" | "lead";
  search?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
};

export const submissionsQueryOptions = (params: SubmissionsListParams = {}) =>
  queryOptions({
    queryKey: ["admin", "submissions", params],
    queryFn: () =>
      api.get<{ items: FormSubmission[]; total: number; page: number; limit: number }>(
        `/api/admin/submissions${buildQueryString(params)}`,
      ),
  });

export const submissionQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["admin", "submissions", "detail", id],
    queryFn: () => api.get<{ submission: FormSubmission }>(`/api/admin/submissions/${id}`),
  });

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "users"],
    queryFn: () => api.get<{ users: AdminUserRecord[] }>("/api/admin/users"),
  });
