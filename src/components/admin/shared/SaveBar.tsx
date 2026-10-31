import { Button } from "@/components/ui/button";

export function SaveBar({
  onSave,
  onCancel,
  saving,
  dirty = true,
}: {
  onSave: () => void;
  onCancel?: () => void;
  saving?: boolean;
  dirty?: boolean;
}) {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-border bg-background/95 py-3">
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      )}
      <Button type="button" onClick={onSave} disabled={saving || !dirty}>
        {saving ? "Saving…" : "Save"}
      </Button>
    </div>
  );
}
