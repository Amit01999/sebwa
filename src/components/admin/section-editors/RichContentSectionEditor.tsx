import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlockEditor, type RichBlock } from "@/components/admin/blocks/BlockEditor";

export type RichContentData = { intro?: string; blocks: RichBlock[] };

export function RichContentSectionEditor({
  value,
  onChange,
}: {
  value: RichContentData;
  onChange: (v: RichContentData) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1 block text-xs">Intro (optional)</Label>
        <Textarea
          value={value.intro ?? ""}
          onChange={(e) => onChange({ ...value, intro: e.target.value })}
          rows={2}
        />
      </div>
      <div>
        <Label className="mb-1 block text-xs">Content blocks</Label>
        <BlockEditor blocks={value.blocks} onChange={(blocks) => onChange({ ...value, blocks })} />
      </div>
    </div>
  );
}
