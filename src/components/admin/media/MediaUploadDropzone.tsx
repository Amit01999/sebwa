import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";
import { api } from "@/lib/admin/api-client";
import type { MediaAsset } from "@/lib/admin/queries";
import { cn } from "@/lib/utils";

export function MediaUploadDropzone({ onUploaded }: { onUploaded?: (asset: MediaAsset) => void }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const upload = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return api.upload<{ asset: MediaAsset }>("/api/admin/media/upload", formData);
    },
    onSuccess: ({ asset }) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
      toast.success("Image uploaded");
      onUploaded?.(asset);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Upload failed"),
  });

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) upload.mutate(file);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border p-6 text-center text-sm text-muted-foreground transition-colors",
        dragOver && "border-primary bg-accent",
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <UploadCloud className="h-6 w-6" />
      <p>
        Drag an image here, or{" "}
        <button
          type="button"
          className="font-medium text-primary underline-offset-4 hover:underline"
          onClick={() => inputRef.current?.click()}
        >
          browse
        </button>
      </p>
      {upload.isPending && <p className="text-xs">Uploading…</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
