import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { ImagePicker } from "@/components/admin/blocks/ImagePicker";

export type UniversitiesGridData = {
  heading: string;
  rows: { mediaAssetId: string; alt: string }[][];
};

export function UniversitiesGridSectionEditor({
  value,
  onChange,
}: {
  value: UniversitiesGridData;
  onChange: (v: UniversitiesGridData) => void;
}) {
  const updateRow = (rowIndex: number, row: { mediaAssetId: string; alt: string }[]) => {
    onChange({ ...value, rows: value.rows.map((r, i) => (i === rowIndex ? row : r)) });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1 block text-xs">Heading</Label>
        <Input
          value={value.heading}
          onChange={(e) => onChange({ ...value, heading: e.target.value })}
        />
      </div>

      {value.rows.map((row, rowIndex) => (
        <div key={rowIndex} className="space-y-2 rounded-md border border-dashed border-border p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Row {rowIndex + 1}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                onChange({ ...value, rows: value.rows.filter((_, i) => i !== rowIndex) })
              }
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          {row.map((logo, logoIndex) => (
            <div key={logoIndex} className="flex items-center gap-2">
              <ImagePicker
                value={logo.mediaAssetId}
                onChange={(mediaAssetId) =>
                  updateRow(
                    rowIndex,
                    row.map((l, j) => (j === logoIndex ? { ...l, mediaAssetId } : l)),
                  )
                }
              />
              <Input
                value={logo.alt}
                placeholder="Alt text (university name)"
                onChange={(e) =>
                  updateRow(
                    rowIndex,
                    row.map((l, j) => (j === logoIndex ? { ...l, alt: e.target.value } : l)),
                  )
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  updateRow(
                    rowIndex,
                    row.filter((_, j) => j !== logoIndex),
                  )
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
            onClick={() => updateRow(rowIndex, [...row, { mediaAssetId: "", alt: "" }])}
          >
            <Plus className="h-3.5 w-3.5" /> Add logo
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange({ ...value, rows: [...value.rows, []] })}
      >
        <Plus className="h-3.5 w-3.5" /> Add row
      </Button>
    </div>
  );
}
