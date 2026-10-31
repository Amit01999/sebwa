import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { ImagePicker } from "@/components/admin/blocks/ImagePicker";

export type HeroData = {
  backgroundImage: string;
  eyebrowLines: string[];
  heading: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function HeroSectionEditor({
  value,
  onChange,
}: {
  value: HeroData;
  onChange: (v: HeroData) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1 block text-xs">Background image</Label>
        <ImagePicker
          value={value.backgroundImage}
          onChange={(backgroundImage) => onChange({ ...value, backgroundImage })}
        />
      </div>

      <div>
        <Label className="mb-1 block text-xs">Eyebrow lines</Label>
        <div className="space-y-2">
          {value.eyebrowLines.map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={line}
                onChange={(e) =>
                  onChange({
                    ...value,
                    eyebrowLines: value.eyebrowLines.map((l, j) => (j === i ? e.target.value : l)),
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  onChange({ ...value, eyebrowLines: value.eyebrowLines.filter((_, j) => j !== i) })
                }
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange({ ...value, eyebrowLines: [...value.eyebrowLines, ""] })}
          >
            <Plus className="h-3.5 w-3.5" /> Add line
          </Button>
        </div>
      </div>

      <div>
        <Label className="mb-1 block text-xs">Heading</Label>
        <Input
          value={value.heading}
          onChange={(e) => onChange({ ...value, heading: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="mb-1 block text-xs">CTA label</Label>
          <Input
            value={value.ctaLabel ?? ""}
            onChange={(e) => onChange({ ...value, ctaLabel: e.target.value })}
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">CTA link</Label>
          <Input
            value={value.ctaHref ?? ""}
            onChange={(e) => onChange({ ...value, ctaHref: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
