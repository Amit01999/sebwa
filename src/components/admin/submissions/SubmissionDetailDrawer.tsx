import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { submissionQueryOptions } from "@/lib/admin/queries";
import { api } from "@/lib/admin/api-client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import { Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function SubmissionDetailDrawer({ id }: { id: string }) {
  const { data, isLoading } = useQuery(submissionQueryOptions(id));
  const [note, setNote] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateStatus = useMutation({
    mutationFn: (status: "new" | "in_progress" | "resolved") =>
      api.patch(`/api/admin/submissions/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "submissions"] });
      toast.success("Status updated");
    },
  });

  const addNote = useMutation({
    mutationFn: (text: string) => api.post(`/api/admin/submissions/${id}/notes`, { text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "submissions"] });
      setNote("");
      toast.success("Note added");
    },
  });

  const remove = useMutation({
    mutationFn: () => api.delete(`/api/admin/submissions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "submissions"] });
      toast.success("Submission deleted");
      navigate({ to: "/admin/submissions" });
    },
  });

  if (isLoading || !data) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const submission = data.submission;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{submission.referenceId}</h2>
          <p className="text-sm text-muted-foreground">
            Submitted {new Date(submission.createdAt).toLocaleString()} on {submission.pageSlug}
          </p>
        </div>
        <ConfirmDialog
          trigger={
            <Button
              type="button"
              variant="outline"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          }
          title="Delete this submission?"
          description="This cannot be undone."
          onConfirm={() => remove.mutate()}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-md border border-border p-4 text-sm">
        <div>
          <p className="text-muted-foreground">Name</p>
          <p className="font-medium">{submission.name}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Email</p>
          <p className="font-medium">{submission.email}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Form type</p>
          <p className="font-medium capitalize">{submission.formType}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Status</p>
          <Select
            value={submission.status}
            onValueChange={(v: "new" | "in_progress" | "resolved") => updateStatus.mutate(v)}
          >
            <SelectTrigger className="h-8 w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_progress">In progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {Object.entries(submission.fields).map(([key, value]) => (
          <div key={key}>
            <p className="capitalize text-muted-foreground">{key}</p>
            <p className="whitespace-pre-wrap font-medium">{value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Internal notes</h3>
        {submission.notes.length === 0 && (
          <p className="text-sm text-muted-foreground">No notes yet.</p>
        )}
        <ul className="space-y-2">
          {submission.notes.map((n) => (
            <li key={n._id} className="rounded-md border border-border p-2 text-sm">
              <p>{n.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add an internal note…"
            rows={2}
          />
          <Button
            type="button"
            disabled={!note.trim() || addNote.isPending}
            onClick={() => addNote.mutate(note)}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
