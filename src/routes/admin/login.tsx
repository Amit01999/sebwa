import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/admin/LoginForm";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — SEBWA" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-background p-6 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold">SEBWA Admin</h1>
        <p className="mb-6 text-sm text-muted-foreground">Sign in to manage the site.</p>
        <LoginForm />
      </div>
    </div>
  );
}
