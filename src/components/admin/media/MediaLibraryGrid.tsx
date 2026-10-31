import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Check } from "lucide-react";
import { mediaListQueryOptions, type MediaAsset } from "@/lib/admin/queries";
import { api } from "@/lib/admin/api-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MediaDeleteConfirmDialog } from "./MediaDeleteConfirmDialog";

export function MediaLibraryGrid({
  selectable = false,
  selectedId,
  onSelect,
}: {
  selectable?: boolean;
  selectedId?: string;
  onSelect?: (asset: MediaAsset) => void;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(mediaListQueryOptions({ search, page, limit: 24 }));

  const updateAlt = useMutation({
    mutationFn: ({ id, altText }: { id: string; altText: string }) =>
      api.patch(`/api/admin/media/${id}`, { altText }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "media"] }),
    onError: () => toast.error("Could not update alt text"),
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by alt text…"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="max-w-sm"
      />

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {!isLoading && data?.items.length === 0 && (
        <p className="text-sm text-muted-foreground">No media yet.</p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {data?.items.map((asset) => (
          <div
            key={asset._id}
            className={cn(
              "group relative overflow-hidden rounded-md border border-border bg-muted/30",
              selectable && "cursor-pointer",
              selectedId === asset._id && "ring-2 ring-primary",
            )}
            onClick={() => selectable && onSelect?.(asset)}
          >
            <div className="flex aspect-square items-center justify-center bg-background">
              {asset.resourceType === "image" ? (
                <img src={asset.url} alt={asset.altText} className="h-full w-full object-contain" />
              ) : (
                <video src={asset.url} className="h-full w-full object-contain" muted />
              )}
            </div>
            {selectable && selectedId === asset._id && (
              <div className="absolute right-1 top-1 rounded-full bg-primary p-1 text-primary-foreground">
                <Check className="h-3 w-3" />
              </div>
            )}
            <div className="space-y-1 p-2">
              <Input
                defaultValue={asset.altText}
                placeholder="Alt text"
                className="h-7 text-xs"
                onClick={(e) => e.stopPropagation()}
                onBlur={(e) => {
                  if (e.target.value !== asset.altText) {
                    updateAlt.mutate({ id: asset._id, altText: e.target.value });
                  }
                }}
              />
              {!selectable && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-full justify-start gap-1 text-xs text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingId(asset._id);
                  }}
                >
                  <Trash2 className="h-3 w-3" /> Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {data && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {deletingId && (
        <MediaDeleteConfirmDialog
          mediaId={deletingId}
          open={!!deletingId}
          onOpenChange={(open) => !open && setDeletingId(null)}
        />
      )}
    </div>
  );
}
