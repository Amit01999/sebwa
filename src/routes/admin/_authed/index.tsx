import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { dashboardOverviewQueryOptions } from "@/lib/admin/queries";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_authed/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(dashboardOverviewQueryOptions());
  },
  component: AdminDashboardPage,
});

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function AdminDashboardPage() {
  const { data } = useSuspenseQuery(dashboardOverviewQueryOptions());

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Pages" value={data.pagesTotal} />
        <StatCard label="Published" value={data.pagesPublished} />
        <StatCard label="Drafts" value={data.pagesDraft} />
        <StatCard label="Media assets" value={data.mediaCount} />
        <StatCard label="New submissions" value={data.submissionsNew} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-border p-4">
          <h2 className="mb-3 font-medium">Recent submissions</h2>
          {data.recentSubmissions.length === 0 && (
            <p className="text-sm text-muted-foreground">None yet.</p>
          )}
          <ul className="space-y-2 text-sm">
            {data.recentSubmissions.map((s) => (
              <li key={s._id} className="flex items-center justify-between">
                <Link
                  to="/admin/submissions/$id"
                  params={{ id: s._id }}
                  className="text-primary hover:underline"
                >
                  {s.name} — {s.referenceId}
                </Link>
                <span className="text-muted-foreground">
                  {new Date(s.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md border border-border p-4">
          <h2 className="mb-3 font-medium">Recently updated pages</h2>
          <ul className="space-y-2 text-sm">
            {data.recentlyUpdatedPages.map((p) => (
              <li key={p.slug} className="flex items-center justify-between">
                <Link
                  to="/admin/pages/$slug"
                  params={{ slug: p.slug }}
                  className="text-primary hover:underline"
                >
                  {p.title}
                </Link>
                <span className="text-muted-foreground">{p.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
