import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ImageOff } from "lucide-react";
import { mediaListQueryOptions, type MediaAsset } from "@/lib/admin/queries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MediaLibraryGrid } from "@/components/admin/media/MediaLibraryGrid";
import { MediaUploadDropzone } from "@/components/admin/media/MediaUploadDropzone";

/**
 * Picks (or uploads) a MediaAsset and returns its id — used by any section
 * or block field that stores a `mediaAssetId`.
 */
export function ImagePicker({
  value,
  onChange,
  label = "Choose image",
}: {
  value?: string;
  onChange: (mediaAssetId: string) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  // Best-effort preview: look up the currently-selected asset in whatever
  // page of the library happens to be cached; if it isn't, we just show the id.
  const { data } = useQuery({ ...mediaListQueryOptions({ limit: 100 }), enabled: !!value });
  const selectedAsset = data?.items.find((item) => item._id === value);

  const handleSelect = (asset: MediaAsset) => {
    onChange(asset._id);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-md border border-border bg-muted/30">
        {selectedAsset ? (
          <img
            src={selectedAsset.url}
            alt={selectedAsset.altText}
            className="h-full w-full object-cover"
          />
        ) : (
          <ImageOff className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" size="sm">
            {value ? "Change image" : label}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Choose an image</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="library">
            <TabsList>
              <TabsTrigger value="library">Library</TabsTrigger>
              <TabsTrigger value="upload">Upload new</TabsTrigger>
            </TabsList>
            <TabsContent value="library" className="max-h-[60vh] overflow-y-auto pt-2">
              <MediaLibraryGrid selectable selectedId={value} onSelect={handleSelect} />
            </TabsContent>
            <TabsContent value="upload" className="pt-2">
              <MediaUploadDropzone onUploaded={handleSelect} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
