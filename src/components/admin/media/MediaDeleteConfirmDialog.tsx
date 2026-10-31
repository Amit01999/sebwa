import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/admin/api-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

type MediaReference = { kind: "page"; slug: string; title: string } | { kind: "siteSettings" };

export function MediaDeleteConfirmDialog({
  mediaId,
  open,
  onOpenChange,
  onDeleted,
}: {
  mediaId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
}) {
  const [references, setReferences] = useState<MediaReference[] | null>(null);
  const queryClient = useQueryClient();

  const deleteAsset = useMutation({
    mutationFn: (force: boolean) =>
      api.delete(`/api/admin/media/${mediaId}${force ? "?force=true" : ""}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
      toast.success("Media deleted");
      onOpenChange(false);
      setReferences(null);
      onDeleted?.();
    },
    onError: (error) => {
      if (error instanceof ApiError && error.status === 409) {
        setReferences((error.details as { referencedBy: MediaReference[] })?.referencedBy ?? []);
        return;
      }
      toast.error(error instanceof Error ? error.message : "Delete failed");
    },
  });

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setReferences(null);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this media asset?</AlertDialogTitle>
          <AlertDialogDescription>
            {references === null
              ? "This permanently removes the file from Cloudinary and the media library."
              : references.length === 0
                ? "No references found, but the check is best-effort. Delete anyway?"
                : "This asset is still used on:"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {references && references.length > 0 && (
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            {references.map((ref, i) => (
              <li key={i}>
                {ref.kind === "page" ? `Page: ${ref.title} (${ref.slug})` : "Site settings"}
              </li>
            ))}
          </ul>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => deleteAsset.mutate(references !== null)}
          >
            {references && references.length > 0 ? "Delete anyway" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
