import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fragmentsQueryOptions } from "@/lib/admin/queries";

export const Route = createFileRoute("/admin/_authed/fragments/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(fragmentsQueryOptions());
  },
  component: FragmentsListPage,
});

function FragmentsListPage() {
  const { data } = useSuspenseQuery(fragmentsQueryOptions());

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Shared content fragments</h1>
      <p className="text-sm text-muted-foreground">
        Reusable content blocks referenced from multiple pages — editing one here updates every page
        that references it.
      </p>
      {data.fragments.length === 0 && <p className="text-sm text-muted-foreground">None yet.</p>}
      <ul className="space-y-2">
        {data.fragments.map((fragment) => (
          <li key={fragment.key} className="rounded-md border border-border p-3">
            <Link
              to="/admin/fragments/$key"
              params={{ key: fragment.key }}
              className="font-medium text-primary hover:underline"
            >
              {fragment.key}
            </Link>
            <p className="text-xs text-muted-foreground">
              {fragment.type} — {fragment.data.rows.length} rows × {fragment.data.columns.length}{" "}
              columns
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
