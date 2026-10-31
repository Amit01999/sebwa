import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type PageHeroData = { title: string; crumbLabel?: string };

export function PageHeroSectionEditor({
  value,
  onChange,
}: {
  value: PageHeroData;
  onChange: (v: PageHeroData) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1 block text-xs">Title</Label>
        <Input
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>
      <div>
        <Label className="mb-1 block text-xs">Breadcrumb label (optional, defaults to title)</Label>
        <Input
          value={value.crumbLabel ?? ""}
          onChange={(e) => onChange({ ...value, crumbLabel: e.target.value })}
        />
      </div>
    </div>
  );
}
