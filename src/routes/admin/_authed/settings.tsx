import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { settingsAdminQueryOptions } from "@/lib/admin/queries";
import { SiteSettingsForm } from "@/components/admin/settings/SiteSettingsForm";

export const Route = createFileRoute("/admin/_authed/settings")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(settingsAdminQueryOptions());
  },
  component: SettingsPage,
});

function SettingsPage() {
  const { data } = useSuspenseQuery(settingsAdminQueryOptions());
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-xl font-semibold">Site settings</h1>
      <SiteSettingsForm settings={data.settings} />
    </div>
  );
}
