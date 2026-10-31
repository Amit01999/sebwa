import { useEffect } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { meQueryOptions } from "@/lib/admin/queries";
import { setCsrfToken } from "@/lib/admin/api-client";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/_authed")({
  beforeLoad: async ({ context }) => {
    try {
      const data = await context.queryClient.ensureQueryData(meQueryOptions());
      // Only takes effect for a client-side navigation — on SSR this sets
      // the server process's own module instance, which the browser never
      // sees. The effect below is what makes it stick after hydration.
      setCsrfToken(data.csrfToken);
      return { user: data.user, csrfToken: data.csrfToken };
    } catch {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const { user, csrfToken } = Route.useRouteContext();

  // beforeLoad's setCsrfToken call above only reaches the SERVER's module
  // instance on a hard navigation/refresh (SSR), since the browser and the
  // Node SSR process are separate JS realms with separate module state.
  // Re-applying it here, in an effect, guarantees the browser's in-memory
  // token is set after hydration too — without this, every mutating admin
  // request after a page reload fails CSRF validation.
  useEffect(() => {
    setCsrfToken(csrfToken);
  }, [csrfToken]);

  return (
    <AdminShell user={user}>
      <Outlet />
    </AdminShell>
  );
}
