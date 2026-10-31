import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type CtaData = { heading: string; ctaLabel: string; ctaHref: string };

export function CtaSectionEditor({
  value,
  onChange,
}: {
  value: CtaData;
  onChange: (v: CtaData) => void;
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
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="mb-1 block text-xs">Button label</Label>
          <Input
            value={value.ctaLabel}
            onChange={(e) => onChange({ ...value, ctaLabel: e.target.value })}
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Button link</Label>
          <Input
            value={value.ctaHref}
            onChange={(e) => onChange({ ...value, ctaHref: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
