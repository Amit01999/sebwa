import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type LeadFormData = { variant: "contact" | "lead"; heading?: string; intro?: string };

export function LeadFormSectionEditor({
  value,
  onChange,
}: {
  value: LeadFormData;
  onChange: (v: LeadFormData) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1 block text-xs">Form variant</Label>
        <Select
          value={value.variant}
          onValueChange={(variant: "contact" | "lead") => onChange({ ...value, variant })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contact">Contact (Name / Email / Subject / Message)</SelectItem>
            <SelectItem value="lead">
              Lead (Given Name / Surname / Phone / Email / Location)
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="mt-1 text-xs text-muted-foreground">
          The field set is fixed per variant — only the heading/intro text around the form is
          editable here.
        </p>
      </div>
      <div>
        <Label className="mb-1 block text-xs">Heading (optional)</Label>
        <Input
          value={value.heading ?? ""}
          onChange={(e) => onChange({ ...value, heading: e.target.value })}
        />
      </div>
      <div>
        <Label className="mb-1 block text-xs">Intro (optional)</Label>
        <Input
          value={value.intro ?? ""}
          onChange={(e) => onChange({ ...value, intro: e.target.value })}
        />
      </div>
    </div>
  );
}
