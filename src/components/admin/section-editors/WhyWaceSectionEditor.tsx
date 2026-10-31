import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

export type WhyWaceData = { heading: string; paragraph: string; bullets: string[] };

export function WhyWaceSectionEditor({
  value,
  onChange,
}: {
  value: WhyWaceData;
  onChange: (v: WhyWaceData) => void;
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
        <Label className="mb-1 block text-xs">Paragraph</Label>
        <Textarea
          value={value.paragraph}
          onChange={(e) => onChange({ ...value, paragraph: e.target.value })}
          rows={3}
        />
      </div>
      <div>
        <Label className="mb-1 block text-xs">Bullets</Label>
        <div className="space-y-2">
          {value.bullets.map((bullet, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={bullet}
                onChange={(e) =>
                  onChange({
                    ...value,
                    bullets: value.bullets.map((b, j) => (j === i ? e.target.value : b)),
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  onChange({ ...value, bullets: value.bullets.filter((_, j) => j !== i) })
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
            onClick={() => onChange({ ...value, bullets: [...value.bullets, ""] })}
          >
            <Plus className="h-3.5 w-3.5" /> Add bullet
          </Button>
        </div>
      </div>
    </div>
  );
}
