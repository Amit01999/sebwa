import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { ImagePicker } from "@/components/admin/blocks/ImagePicker";

export type ProgramsGridData = {
  heading: string;
  heroImage: string;
  icon: string;
  items: { title: string; sub: string }[];
};

export function ProgramsGridSectionEditor({
  value,
  onChange,
}: {
  value: ProgramsGridData;
  onChange: (v: ProgramsGridData) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1 block text-xs">Heading</Label>
        <Input
          value={value.heading}
          onChange={(e) => onChange({ ...value, heading: e.target.value })}
        />
      </div>
      <div>
        <Label className="mb-1 block text-xs">Hero image</Label>
        <ImagePicker
          value={value.heroImage}
          onChange={(heroImage) => onChange({ ...value, heroImage })}
        />
      </div>
      <div>
        <Label className="mb-1 block text-xs">Icon (shared across all items)</Label>
        <ImagePicker value={value.icon} onChange={(icon) => onChange({ ...value, icon })} />
      </div>

      <div>
        <Label className="mb-1 block text-xs">Items</Label>
        <div className="space-y-2">
          {value.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={item.title}
                placeholder="Title"
                onChange={(e) =>
                  onChange({
                    ...value,
                    items: value.items.map((it, j) =>
                      j === i ? { ...it, title: e.target.value } : it,
                    ),
                  })
                }
              />
              <Input
                value={item.sub}
                placeholder="Subtitle"
                onChange={(e) =>
                  onChange({
                    ...value,
                    items: value.items.map((it, j) =>
                      j === i ? { ...it, sub: e.target.value } : it,
                    ),
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onChange({ ...value, items: value.items.filter((_, j) => j !== i) })}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange({ ...value, items: [...value.items, { title: "", sub: "" }] })}
          >
            <Plus className="h-3.5 w-3.5" /> Add item
          </Button>
        </div>
      </div>
    </div>
  );
}
