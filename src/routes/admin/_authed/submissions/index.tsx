import { createFileRoute } from "@tanstack/react-router";
import { SubmissionsTable } from "@/components/admin/submissions/SubmissionsTable";

export const Route = createFileRoute("/admin/_authed/submissions/")({
  component: SubmissionsPage,
});

function SubmissionsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Submissions</h1>
      <SubmissionsTable />
    </div>
  );
}
