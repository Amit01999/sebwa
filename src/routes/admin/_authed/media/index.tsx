import { createFileRoute } from "@tanstack/react-router";
import { MediaUploadDropzone } from "@/components/admin/media/MediaUploadDropzone";
import { MediaLibraryGrid } from "@/components/admin/media/MediaLibraryGrid";

export const Route = createFileRoute("/admin/_authed/media/")({
  component: MediaLibraryPage,
});

function MediaLibraryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Media library</h1>
      <MediaUploadDropzone />
      <MediaLibraryGrid />
    </div>
  );
}
