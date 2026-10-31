import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { navigationAdminQueryOptions } from "@/lib/admin/queries";
import { NavMenuEditor } from "@/components/admin/nav/NavMenuEditor";

export const Route = createFileRoute("/admin/_authed/navigation")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(navigationAdminQueryOptions());
  },
  component: NavigationPage,
});

function NavigationPage() {
  const { data } = useSuspenseQuery(navigationAdminQueryOptions());
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-xl font-semibold">Navigation menu</h1>
      <NavMenuEditor navigation={data.navigation} />
    </div>
  );
}
