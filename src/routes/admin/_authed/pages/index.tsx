import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search, FileText } from "lucide-react";
import {
  pagesListQueryOptions,
  navigationAdminQueryOptions,
  type PageSummary,
  type NavigationMenu,
} from "@/lib/admin/queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/_authed/pages/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(pagesListQueryOptions()),
      context.queryClient.ensureQueryData(navigationAdminQueryOptions()),
    ]);
  },
  component: PagesListPage,
});

// Every page's slug is just its route path without the leading slash — the
// homepage is the one exception, stored as slug "home" for a "/" route.
function slugFromPath(to: string) {
  const trimmed = to.replace(/^\//, "");
  return trimmed === "" ? "home" : trimmed;
}

type GroupedPage = PageSummary & { isPrimary: boolean };
type PageGroup = { label: string; pages: GroupedPage[] };

// Mirrors the public header's nav structure (and its "Contact Us" CTA
// button) to group pages by the menu/submenu an admin would actually find
// them under on the live site — pure presentation, no change to how pages
// are stored, fetched, or edited.
function buildPageGroups(pages: PageSummary[], navigation: NavigationMenu) {
  const bySlug = new Map(pages.map((page) => [page.slug, page]));
  const matchedSlugs = new Set<string>();
  const groups: PageGroup[] = [];

  const sortedItems = [...navigation.items].sort((a, b) => a.order - b.order);
  for (const item of sortedItems) {
    const entries =
      item.children.length > 0
        ? [...item.children].sort((a, b) => a.order - b.order)
        : [{ label: item.label, to: item.to }];
    const primarySlug = slugFromPath(item.to);

    const groupPages: GroupedPage[] = [];
    for (const entry of entries) {
      const slug = slugFromPath(entry.to);
      const page = bySlug.get(slug);
      if (!page || matchedSlugs.has(slug)) continue;
      matchedSlugs.add(slug);
      groupPages.push({ ...page, isPrimary: slug === primarySlug });
    }
    if (groupPages.length > 0) groups.push({ label: item.label, pages: groupPages });
  }

  const ctaSlug = slugFromPath(navigation.ctaButton.to);
  const ctaPage = bySlug.get(ctaSlug);
  if (ctaPage && !matchedSlugs.has(ctaSlug)) {
    matchedSlugs.add(ctaSlug);
    groups.push({ label: navigation.ctaButton.label, pages: [{ ...ctaPage, isPrimary: true }] });
  }

  const unlisted = pages.filter((page) => !matchedSlugs.has(page.slug));
  return { groups, unlisted };
}

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border px-3 py-1.5">
      <span className="text-sm font-semibold">{value}</span>{" "}
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function PageRow({ page }: { page: GroupedPage }) {
  return (
    <li className="flex flex-col gap-2 px-4 py-3 hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/pages/$slug"
            params={{ slug: page.slug }}
            className="truncate font-medium text-primary hover:underline"
          >
            {page.title}
          </Link>
          {page.isPrimary && (
            <Badge variant="outline" className="shrink-0 text-[10px] font-medium">
              Main
            </Badge>
          )}
        </div>
        <p className="truncate text-xs text-muted-foreground">
          /{page.slug === "home" ? "" : page.slug}
        </p>
      </div>
      <div className="flex flex-none flex-wrap items-center gap-3">
        <Badge variant={page.status === "published" ? "default" : "secondary"}>{page.status}</Badge>
        <span className="hidden text-xs text-muted-foreground sm:inline">
          {new Date(page.updatedAt).toLocaleDateString()}
        </span>
        <Button asChild variant="outline" size="sm">
          <Link to="/admin/pages/$slug" params={{ slug: page.slug }}>
            Edit
          </Link>
        </Button>
      </div>
    </li>
  );
}

function PageGroupSection({ group }: { group: PageGroup }) {
  return (
    // min-w-0: this is a CSS grid item (see the `grid` wrapper below); grid
    // items default to min-width:auto, so a long unbroken slug like
    // "/wa-early-years-international-kindergarten-to-year-2" would otherwise
    // force the whole card wider than the viewport instead of truncating.
    <div className="min-w-0 rounded-md border border-border">
      <div className="flex items-center justify-between gap-2 rounded-t-md border-b border-border bg-muted/40 px-4 py-2.5">
        <h2 className="text-sm font-semibold">{group.label}</h2>
        <Badge variant="secondary" className="shrink-0">
          {group.pages.length} page{group.pages.length === 1 ? "" : "s"}
        </Badge>
      </div>
      <ul className="divide-y divide-border">
        {group.pages.map((page) => (
          <PageRow key={page.slug} page={page} />
        ))}
      </ul>
    </div>
  );
}

function matchesSearch(page: PageSummary, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return page.title.toLowerCase().includes(q) || page.slug.toLowerCase().includes(q);
}

function PagesListPage() {
  const { data: pagesData } = useSuspenseQuery(pagesListQueryOptions());
  const { data: navData } = useSuspenseQuery(navigationAdminQueryOptions());
  const [search, setSearch] = useState("");

  const { groups, unlisted } = useMemo(
    () => buildPageGroups(pagesData.pages, navData.navigation),
    [pagesData.pages, navData.navigation],
  );

  const filteredGroups = useMemo(
    () =>
      groups
        .map((group) => ({ ...group, pages: group.pages.filter((p) => matchesSearch(p, search)) }))
        .filter((group) => group.pages.length > 0),
    [groups, search],
  );
  const filteredUnlisted = useMemo(
    () => unlisted.filter((p) => matchesSearch(p, search)),
    [unlisted, search],
  );

  const publishedCount = pagesData.pages.filter((p) => p.status === "published").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Pages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Grouped by the header menu each page appears under on the live site.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatChip label="total" value={pagesData.pages.length} />
          <StatChip label="published" value={publishedCount} />
          <StatChip label="draft" value={pagesData.pages.length - publishedCount} />
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pages by title or slug…"
          className="pl-8"
        />
      </div>

      {filteredGroups.length === 0 && filteredUnlisted.length === 0 && (
        <p className="text-sm text-muted-foreground">No pages match “{search}”.</p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {filteredGroups.map((group) => (
          <PageGroupSection key={group.label} group={group} />
        ))}
      </div>

      {filteredUnlisted.length > 0 && (
        <div className="rounded-md border border-border">
          <div className="flex items-center justify-between gap-2 rounded-t-md border-b border-border bg-muted/40 px-4 py-2.5">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold">
              <FileText className="h-3.5 w-3.5" /> Not in navigation menu
            </h2>
            <Badge variant="secondary">{filteredUnlisted.length}</Badge>
          </div>
          <ul className="divide-y divide-border">
            {filteredUnlisted.map((page) => (
              <PageRow key={page.slug} page={{ ...page, isPrimary: false }} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
