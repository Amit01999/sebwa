import { createFileRoute } from "@tanstack/react-router";
import { submissionQueryOptions } from "@/lib/admin/queries";
import { SubmissionDetailDrawer } from "@/components/admin/submissions/SubmissionDetailDrawer";

export const Route = createFileRoute("/admin/_authed/submissions/$id")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(submissionQueryOptions(params.id));
  },
  component: SubmissionDetailPage,
});

function SubmissionDetailPage() {
  const { id } = Route.useParams();
  return <SubmissionDetailDrawer id={id} />;
}
