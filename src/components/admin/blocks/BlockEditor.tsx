import { ChevronDown, ChevronUp, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "./RichTextEditor";
import { ImagePicker } from "./ImagePicker";
import { CourseTableRefPicker } from "./CourseTableRefPicker";
import { parseVimeoVideo } from "@/lib/vimeo";

export type LinkVariant = "teal" | "orange" | "outline";

export type RichBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title?: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; mediaAssetId: string; alt: string; caption?: string }
  | { type: "links"; items: { label: string; to: string; variant: LinkVariant }[] }
  | { type: "video"; provider: "vimeo"; videoId: string; h?: string; title: string }
  | { type: "deflist"; rows: { title: string; blocks: RichBlock[] }[] }
  | { type: "courseTableRef"; fragmentKey: string };

const BLOCK_TYPE_LABELS: Record<RichBlock["type"], string> = {
  p: "Paragraph",
  h2: "Heading (H2)",
  h3: "Subheading (H3)",
  ul: "Bullet list",
  ol: "Numbered list",
  quote: "Quote",
  callout: "Callout",
  table: "Table",
  image: "Image",
  links: "Link buttons",
  video: "Video embed",
  deflist: "Definition list",
  courseTableRef: "Shared course table",
};

function defaultBlock(type: RichBlock["type"]): RichBlock {
  switch (type) {
    case "p":
    case "quote":
      return { type, text: "" };
    case "h2":
    case "h3":
      return { type, text: "" };
    case "ul":
    case "ol":
      return { type, items: [""] };
    case "callout":
      return { type: "callout", title: "", text: "" };
    case "table":
      return { type: "table", headers: ["Column 1", "Column 2"], rows: [["", ""]] };
    case "image":
      return { type: "image", mediaAssetId: "", alt: "" };
    case "links":
      return { type: "links", items: [{ label: "", to: "", variant: "teal" }] };
    case "video":
      return { type: "video", provider: "vimeo", videoId: "", title: "" };
    case "deflist":
      return { type: "deflist", rows: [{ title: "", blocks: [] }] };
    case "courseTableRef":
      return { type: "courseTableRef", fragmentKey: "" };
  }
}

export function BlockEditor({
  blocks,
  onChange,
  allowedTypes,
}: {
  blocks: RichBlock[];
  onChange: (blocks: RichBlock[]) => void;
  /** Restricts which block types can be added — used to keep `deflist` one level deep. */
  allowedTypes?: RichBlock["type"][];
}) {
  const types = allowedTypes ?? (Object.keys(BLOCK_TYPE_LABELS) as RichBlock["type"][]);

  const updateAt = (index: number, block: RichBlock) => {
    onChange(blocks.map((b, i) => (i === index ? block : b)));
  };
  const removeAt = (index: number) => onChange(blocks.filter((_, i) => i !== index));
  const moveBy = (index: number, delta: number) => {
    const next = [...blocks];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  const addBlock = (type: RichBlock["type"]) => onChange([...blocks, defaultBlock(type)]);

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => (
        <div key={index} className="rounded-md border border-border p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase text-muted-foreground">
              {BLOCK_TYPE_LABELS[block.type]}
            </span>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => moveBy(index, -1)}
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => moveBy(index, 1)}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-destructive hover:text-destructive"
                onClick={() => removeAt(index)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <BlockFields block={block} onChange={(next) => updateAt(index, next)} />
        </div>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" size="sm">
            <Plus className="h-3.5 w-3.5" /> Add block
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {types.map((type) => (
            <DropdownMenuItem key={type} onClick={() => addBlock(type)}>
              {BLOCK_TYPE_LABELS[type]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function BlockFields({
  block,
  onChange,
}: {
  block: RichBlock;
  onChange: (block: RichBlock) => void;
}) {
  switch (block.type) {
    case "p":
    case "quote":
      return (
        <RichTextEditor value={block.text} onChange={(text) => onChange({ ...block, text })} />
      );

    case "h2":
    case "h3":
      return (
        <Input
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="Heading text"
        />
      );

    case "ul":
    case "ol":
      return (
        <ListItemsEditor items={block.items} onChange={(items) => onChange({ ...block, items })} />
      );

    case "callout":
      return (
        <div className="space-y-2">
          <Input
            value={block.title ?? ""}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            placeholder="Title (optional)"
          />
          <RichTextEditor value={block.text} onChange={(text) => onChange({ ...block, text })} />
        </div>
      );

    case "table":
      return <TableBlockEditor block={block} onChange={onChange} />;

    case "image":
      return (
        <div className="space-y-2">
          <ImagePicker
            value={block.mediaAssetId}
            onChange={(mediaAssetId) => onChange({ ...block, mediaAssetId })}
          />
          <Input
            value={block.alt}
            onChange={(e) => onChange({ ...block, alt: e.target.value })}
            placeholder="Alt text"
          />
          <Input
            value={block.caption ?? ""}
            onChange={(e) => onChange({ ...block, caption: e.target.value })}
            placeholder="Caption (optional)"
          />
        </div>
      );

    case "links":
      return <LinksBlockEditor block={block} onChange={onChange} />;

    case "video":
      return (
        <div className="space-y-2">
          <Label className="text-xs">Vimeo video link or ID</Label>
          <Input
            value={block.videoId}
            onChange={(e) => {
              const { videoId, h } = parseVimeoVideo(e.target.value);
              onChange({ ...block, videoId, h: h ?? block.h });
            }}
            placeholder="e.g. https://vimeo.com/727191185 or 727191185"
          />
          <Label className="text-xs">Privacy hash (if required)</Label>
          <Input
            value={block.h ?? ""}
            onChange={(e) => onChange({ ...block, h: e.target.value || undefined })}
            placeholder="e.g. 4809a8fffc — most Vimeo videos need this to play"
          />
          <Input
            value={block.title}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            placeholder="Accessible title"
          />
        </div>
      );

    case "deflist":
      return <DeflistBlockEditorInline block={block} onChange={onChange} />;

    case "courseTableRef":
      return (
        <CourseTableRefPicker
          value={block.fragmentKey}
          onChange={(fragmentKey) => onChange({ ...block, fragmentKey })}
        />
      );
  }
}

function ListItemsEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex-1">
            <RichTextEditor
              value={item}
              onChange={(text) => onChange(items.map((it, j) => (j === i ? text : it)))}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, ""])}>
        <Plus className="h-3.5 w-3.5" /> Add item
      </Button>
    </div>
  );
}

function TableBlockEditor({
  block,
  onChange,
}: {
  block: { type: "table"; headers: string[]; rows: string[][] };
  onChange: (block: RichBlock) => void;
}) {
  const addColumn = () => {
    onChange({
      ...block,
      headers: [...block.headers, `Column ${block.headers.length + 1}`],
      rows: block.rows.map((row) => [...row, ""]),
    });
  };
  const removeColumn = (colIndex: number) => {
    onChange({
      ...block,
      headers: block.headers.filter((_, i) => i !== colIndex),
      rows: block.rows.map((row) => row.filter((_, i) => i !== colIndex)),
    });
  };
  const addRow = () => onChange({ ...block, rows: [...block.rows, block.headers.map(() => "")] });
  const removeRow = (rowIndex: number) =>
    onChange({ ...block, rows: block.rows.filter((_, i) => i !== rowIndex) });

  return (
    <div className="space-y-2 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {block.headers.map((header, colIndex) => (
              <th key={colIndex} className="border border-border p-1">
                <div className="flex items-center gap-1">
                  <Input
                    value={header}
                    className="h-7"
                    onChange={(e) =>
                      onChange({
                        ...block,
                        headers: block.headers.map((h, i) => (i === colIndex ? e.target.value : h)),
                      })
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeColumn(colIndex)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="border border-border p-1">
                  <Input
                    value={cell}
                    className="h-7"
                    onChange={(e) =>
                      onChange({
                        ...block,
                        rows: block.rows.map((r, ri) =>
                          ri === rowIndex
                            ? r.map((c, ci) => (ci === colIndex ? e.target.value : c))
                            : r,
                        ),
                      })
                    }
                  />
                </td>
              ))}
              <td className="border-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeRow(rowIndex)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={addColumn}>
          <Plus className="h-3.5 w-3.5" /> Column
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={addRow}>
          <Plus className="h-3.5 w-3.5" /> Row
        </Button>
      </div>
    </div>
  );
}

function LinksBlockEditor({
  block,
  onChange,
}: {
  block: { type: "links"; items: { label: string; to: string; variant: LinkVariant }[] };
  onChange: (block: RichBlock) => void;
}) {
  const update = (
    index: number,
    patch: Partial<{ label: string; to: string; variant: LinkVariant }>,
  ) => {
    onChange({
      ...block,
      items: block.items.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    });
  };

  return (
    <div className="space-y-2">
      {block.items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={item.label}
            onChange={(e) => update(i, { label: e.target.value })}
            placeholder="Label"
            className="flex-1"
          />
          <Input
            value={item.to}
            onChange={(e) => update(i, { to: e.target.value })}
            placeholder="/path"
            className="flex-1"
          />
          <Select
            value={item.variant}
            onValueChange={(variant: LinkVariant) => update(i, { variant })}
          >
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teal">Teal</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onChange({ ...block, items: block.items.filter((_, j) => j !== i) })}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          onChange({ ...block, items: [...block.items, { label: "", to: "", variant: "teal" }] })
        }
      >
        <Plus className="h-3.5 w-3.5" /> Add link
      </Button>
    </div>
  );
}

// Nested one level deep only: a deflist row's own blocks cannot contain another deflist.
const NON_DEFLIST_TYPES = (Object.keys(BLOCK_TYPE_LABELS) as RichBlock["type"][]).filter(
  (t) => t !== "deflist",
);

function DeflistBlockEditorInline({
  block,
  onChange,
}: {
  block: { type: "deflist"; rows: { title: string; blocks: RichBlock[] }[] };
  onChange: (block: RichBlock) => void;
}) {
  const updateRow = (index: number, patch: Partial<{ title: string; blocks: RichBlock[] }>) => {
    onChange({
      ...block,
      rows: block.rows.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    });
  };

  return (
    <div className="space-y-3">
      {block.rows.map((row, i) => (
        <div key={i} className="space-y-2 rounded-md border border-dashed border-border p-2">
          <div className="flex items-center gap-2">
            <Input
              value={row.title}
              onChange={(e) => updateRow(i, { title: e.target.value })}
              placeholder="Row title"
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onChange({ ...block, rows: block.rows.filter((_, j) => j !== i) })}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <BlockEditor
            blocks={row.blocks}
            onChange={(blocks) => updateRow(i, { blocks })}
            allowedTypes={NON_DEFLIST_TYPES}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange({ ...block, rows: [...block.rows, { title: "", blocks: [] }] })}
      >
        <Plus className="h-3.5 w-3.5" /> Add row
      </Button>
    </div>
  );
}
