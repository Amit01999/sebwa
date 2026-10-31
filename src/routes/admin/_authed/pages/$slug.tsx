import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { pageDetailQueryOptions } from "@/lib/admin/queries";
import { api } from "@/lib/admin/api-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SaveBar } from "@/components/admin/shared/SaveBar";
import { SectionList } from "@/components/admin/shared/SectionList";

export const Route = createFileRoute("/admin/_authed/pages/$slug")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(pageDetailQueryOptions(params.slug));
  },
  component: PageDetailPage,
});

function PageDetailPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(pageDetailQueryOptions(slug));
  const page = data.page;
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(page.title);
  const [seoTitle, setSeoTitle] = useState(page.seo?.title ?? "");
  const [seoDescription, setSeoDescription] = useState(page.seo?.description ?? "");
  const [status, setStatus] = useState(page.status);

  const saveMeta = useMutation({
    mutationFn: () =>
      api.patch(`/api/admin/pages/${slug}`, {
        title,
        seo: { title: seoTitle, description: seoDescription },
        status,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pages"] });
      toast.success("Page saved");
    },
    onError: () => toast.error("Could not save page"),
  });

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold">{page.title}</h1>
        <p className="text-sm text-muted-foreground">/{slug === "home" ? "" : slug}</p>
      </div>

      <section className="space-y-3 rounded-md border border-border p-4">
        <h2 className="font-medium">Page details</h2>
        <div>
          <Label className="mb-1 block text-xs">Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1 block text-xs">SEO title</Label>
          <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1 block text-xs">SEO description</Label>
          <Textarea
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            rows={2}
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Status</Label>
          <Select value={status} onValueChange={(v: "draft" | "published") => setStatus(v)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <SaveBar onSave={() => saveMeta.mutate()} saving={saveMeta.isPending} />
      </section>

      <section className="space-y-3">
        <h2 className="font-medium">Sections</h2>
        <SectionList page={page} />
      </section>
    </div>
  );
}
