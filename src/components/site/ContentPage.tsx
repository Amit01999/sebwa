import { SiteLayout } from "./Layout";
import { PageHero } from "./PageHero";
import type { ReactNode } from "react";

export type ContentBlock =
  | { type: "p"; text: ReactNode }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: ReactNode[] }
  | { type: "ol"; items: ReactNode[] }
  | { type: "quote"; text: ReactNode }
  | { type: "callout"; title?: string; text: ReactNode }
  | { type: "table"; headers: string[]; rows: (string | ReactNode)[][] }
  | { type: "node"; node: ReactNode };

export function ContentPage({
  title,
  intro,
  blocks,
}: {
  title: string;
  intro?: ReactNode;
  blocks: ContentBlock[];
}) {
  return (
    <SiteLayout>
      <PageHero title={title} />
      <article className="mx-auto max-w-5xl px-4 lg:px-8 py-14 lg:py-16">
        {intro && (
          <p className="text-lg leading-relaxed text-foreground/85 mb-8 border-l-4 border-orange pl-5">
            {intro}
          </p>
        )}
        <div className="space-y-5 text-foreground/85 leading-relaxed text-justify text-[15.5px]">
          {blocks.map((b, i) => {
            switch (b.type) {
              case "p":
                return <p key={i}>{b.text}</p>;
              case "h2":
                return (
                  <h2 key={i} className="text-2xl md:text-3xl font-semibold text-navy mt-10 mb-2">
                    {b.text}
                  </h2>
                );
              case "h3":
                return (
                  <h3
                    key={i}
                    className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-1"
                  >
                    {b.text}
                  </h3>
                );
              case "ul":
                return (
                  <ul key={i} className="space-y-2 pl-1">
                    {b.items.map((it, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-none" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              case "ol":
                return (
                  <ol
                    key={i}
                    className="list-decimal pl-6 space-y-2 marker:text-orange marker:font-semibold"
                  >
                    {b.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ol>
                );
              case "quote":
                return (
                  <blockquote key={i} className="border-l-4 border-teal bg-mist/60 p-4 italic">
                    {b.text}
                  </blockquote>
                );
              case "callout":
                return (
                  <div key={i} className="rounded-md bg-mist/70 border border-border p-5">
                    {b.title && <p className="font-semibold text-navy mb-2">{b.title}</p>}
                    <p>{b.text}</p>
                  </div>
                );
              case "table":
                return (
                  <div key={i} className="overflow-x-auto my-4">
                    <table className="w-full text-sm border border-border">
                      <thead className="bg-navy text-white">
                        <tr>
                          {b.headers.map((h, j) => (
                            <th
                              key={j}
                              className="text-left px-3 py-2 font-semibold border border-navy/40"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {b.rows.map((row, ri) => (
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
              case "node":
                return <div key={i}>{b.node}</div>;
            }
          })}
        </div>
      </article>
    </SiteLayout>
  );
}
