import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { VimeoEmbed } from "./VimeoEmbed";
import { assetUrl } from "./media";
import { fragmentQueryOptions } from "@/lib/queries/fragments";

export type RichBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title?: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; mediaAssetId?: string; alt: string; caption?: string }
  | {
      type: "links";
      items: { label: string; to: string; variant?: "teal" | "orange" | "outline" }[];
    }
  | { type: "video"; provider: "vimeo"; videoId: string; h?: string; title?: string }
  | { type: "deflist"; rows: { title: string; blocks: RichBlock[] }[] }
  | { type: "courseTableRef"; fragmentKey: string };

const LINK_VARIANT_CLASS: Record<string, string> = {
  teal: "bg-teal text-teal-foreground hover:bg-teal/90",
  orange: "bg-orange text-white hover:bg-orange/90",
  outline: "border border-border text-foreground hover:bg-muted",
};

// Block text is sanitized server-side (`sanitize-html`) before it's ever
// saved, so rendering it as raw HTML here is safe.
function RichTextHtml({ html, className }: { html: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function LinksBlockLink({
  label,
  to,
  variant = "teal",
}: {
  label: string;
  to: string;
  variant?: string;
}) {
  const className = `inline-flex items-center rounded-sm px-4 py-2 text-sm font-semibold transition-colors ${
    LINK_VARIANT_CLASS[variant] ?? LINK_VARIANT_CLASS.teal
  }`;

  if (to.startsWith("/")) {
    return (
      <Link to={to} className={className}>
        {label}
      </Link>
    );
  }

  const isExternal = /^https?:\/\//.test(to);
  return (
    <a
      href={to}
      className={className}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}

// Groups value-column labels like "ATAR (Southern hemisphere academic
// calendar)" into a shared spanning header, reproducing the original
// table's two-row rowSpan/colSpan grouped header generically from the
// fragment's own column labels (rather than hardcoding this one table's
// specific group names).
function groupValueColumns(columns: string[]) {
  const groups: { label: string; subLabels: string[] }[] = [];
  for (const col of columns) {
    const match = col.match(/^(.*)\s\((.+)\)$/);
    const subLabel = match ? match[1] : col;
    const groupLabel = match ? match[2] : "";
    const last = groups[groups.length - 1];
    if (last && last.label === groupLabel) {
      last.subLabels.push(subLabel);
    } else {
      groups.push({ label: groupLabel, subLabels: [subLabel] });
    }
  }
  return groups;
}

const COURSE_TABLE_TH = "border border-border px-3 py-2 text-center font-semibold bg-mist/40";

function CourseTableRefBlock({ fragmentKey }: { fragmentKey: string }) {
  const { data: fragment } = useQuery(fragmentQueryOptions(fragmentKey));
  if (!fragment) return null;

  // columns[0] is the row-label header ("WACE course"); the rest line up
  // 1:1 with each row's `values`.
  const [rowLabelHeader, ...valueColumns] = fragment.data.columns;
  const groups = groupValueColumns(valueColumns);
  const hasGroups = groups.length > 1 && groups.every((g) => g.label);

  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border border-border">
        <thead>
          {hasGroups ? (
            <>
              <tr>
                <th rowSpan={2} className={`${COURSE_TABLE_TH} text-left align-middle`}>
                  {rowLabelHeader}
                </th>
                {groups.map((group, gi) => (
                  <th key={gi} colSpan={group.subLabels.length} className={COURSE_TABLE_TH}>
                    {group.label}
                  </th>
                ))}
              </tr>
              <tr>
                {groups.flatMap((group, gi) =>
                  group.subLabels.map((sub, si) => (
                    <th key={`${gi}-${si}`} className={COURSE_TABLE_TH}>
                      {sub}
                    </th>
                  )),
                )}
              </tr>
            </>
          ) : (
            <tr>
              <th className={`${COURSE_TABLE_TH} text-left`}>{rowLabelHeader}</th>
              {valueColumns.map((col, j) => (
                <th key={j} className={COURSE_TABLE_TH}>
                  {col}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {fragment.data.rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 1 ? "bg-mist/20" : ""}>
              <td className="border border-border px-3 py-2">{row.program}</td>
              {row.values.map((value, ci) => (
                <td key={ci} className="border border-border px-3 py-2 text-center">
                  {typeof value === "boolean" ? (value ? "Yes" : "") : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RichBlockItem({ block }: { block: RichBlock }) {
  switch (block.type) {
    case "p":
      return <RichTextHtml html={block.text} />;
    case "h2":
      // text-left overrides the inherited `text-justify` from the content
      // wrapper below — justify only makes sense for wrapped body text; on
      // a heading, text-align:justify stretches the (non-last) wrapped
      // line's word-spacing to fill the full width, which reads as
      // abnormally wide spacing whenever a long heading wraps to 2+ lines.
      return (
        <h2 className="text-2xl md:text-3xl font-semibold text-navy mt-10 mb-2 text-left">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-1 text-left">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-none" />
              <RichTextHtml html={item} className="inline" />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-6 space-y-2 marker:text-orange marker:font-semibold">
          {block.items.map((item, j) => (
            <li key={j}>
              <RichTextHtml html={item} className="inline" />
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-teal bg-mist/60 p-4 italic">
          <RichTextHtml html={block.text} />
        </blockquote>
      );
    case "callout":
      return (
        <div className="rounded-md bg-mist/70 border border-border p-5">
          {block.title && <p className="font-semibold text-navy mb-2">{block.title}</p>}
          <RichTextHtml html={block.text} />
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border">
            <thead className="bg-navy text-white">
              <tr>
                {block.headers.map((h, j) => (
                  <th key={j} className="text-left px-3 py-2 font-semibold border border-navy/40">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 ? "bg-mist/40" : ""}>
                  {row.map((c, ci) => (
                    <td key={ci} className="px-3 py-2 border border-border align-top">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image": {
      const src = assetUrl(block.mediaAssetId);
      if (!src) return null;
      return (
        <figure>
          <img src={src} alt={block.alt} className="w-full rounded-md object-cover" />
          {block.caption && (
            <figcaption className="mt-2 text-sm text-foreground/60">{block.caption}</figcaption>
          )}
        </figure>
      );
    }
    case "links":
      return (
        <div className="flex flex-wrap gap-3 not-prose">
          {block.items.map((item, j) => (
            <LinksBlockLink key={j} {...item} />
          ))}
        </div>
      );
    case "video":
      return (
        <div className="rounded-md overflow-hidden">
          <VimeoEmbed videoId={block.videoId} hash={block.h} title={block.title} />
        </div>
      );
    case "deflist":
      return (
        <table className="w-full text-sm border border-border my-4">
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i}>
                <td className="px-3 py-3 border border-border align-top font-semibold text-navy w-[28%] bg-mist/40 leading-snug">
                  {row.title}
                </td>
                <td className="px-3 py-3 border border-border align-top">
                  <div className="space-y-3 leading-relaxed">
                    {row.blocks.map((inner, bi) => (
                      <RichBlockItem key={bi} block={inner} />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "courseTableRef":
      return <CourseTableRefBlock fragmentKey={block.fragmentKey} />;
    default:
      return null;
  }
}

export function RichContentRenderer({ intro, blocks }: { intro?: string; blocks: RichBlock[] }) {
  return (
    <article className="rich-content mx-auto max-w-5xl px-4 lg:px-8 py-14 lg:py-16">
      {intro && (
        <RichTextHtml
          html={intro}
          className="text-lg leading-relaxed text-foreground/85 mb-8 border-l-4 border-orange pl-5"
        />
      )}
      <div className="space-y-5 text-foreground/85 leading-relaxed text-justify text-[15.5px]">
        {blocks.map((block, i) => (
          <RichBlockItem key={i} block={block} />
        ))}
      </div>
    </article>
  );
}
