import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus } from "lucide-react";
import { parseVimeoVideo } from "@/lib/vimeo";

export type AboutData = {
  eyebrow?: string;
  lead: string;
  bullets: string[];
  video?: { provider: "vimeo"; videoId: string; h?: string; title: string };
  closing?: string;
};

export function AboutSectionEditor({
  value,
  onChange,
}: {
  value: AboutData;
  onChange: (v: AboutData) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1 block text-xs">Eyebrow</Label>
        <Input
          value={value.eyebrow ?? ""}
          onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
        />
      </div>
      <div>
        <Label className="mb-1 block text-xs">Lead paragraph</Label>
        <Input value={value.lead} onChange={(e) => onChange({ ...value, lead: e.target.value })} />
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

      <div className="flex items-center gap-2">
        <Switch
          checked={!!value.video}
          onCheckedChange={(checked) =>
            onChange({
              ...value,
              video: checked ? { provider: "vimeo", videoId: "", title: "" } : undefined,
            })
          }
        />
        <Label className="text-xs">Include video embed</Label>
      </div>
      {value.video && (
        <div className="space-y-3 pl-6">
          <div>
            <Label className="mb-1 block text-xs">Vimeo video link or ID</Label>
            <Input
              value={value.video.videoId}
              placeholder="e.g. https://vimeo.com/727191185 or 727191185"
              onChange={(e) => {
                const { videoId, h } = parseVimeoVideo(e.target.value);
                onChange({
                  ...value,
                  video: { ...value.video!, videoId, h: h ?? value.video!.h },
                });
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-1 block text-xs">Privacy hash (if required)</Label>
              <Input
                value={value.video.h ?? ""}
                placeholder="e.g. 4809a8fffc"
                onChange={(e) =>
                  onChange({ ...value, video: { ...value.video!, h: e.target.value || undefined } })
                }
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                Most Vimeo videos are unlisted and won't play without this. Pasting a full link
                above fills it in automatically if the link includes one.
              </p>
            </div>
            <div>
              <Label className="mb-1 block text-xs">Accessible title</Label>
              <Input
                value={value.video.title}
                onChange={(e) =>
                  onChange({ ...value, video: { ...value.video!, title: e.target.value } })
                }
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <Label className="mb-1 block text-xs">Closing line</Label>
        <Input
          value={value.closing ?? ""}
          onChange={(e) => onChange({ ...value, closing: e.target.value })}
        />
      </div>
    </div>
  );
}
