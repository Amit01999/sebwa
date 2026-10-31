import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assetUrl } from "./media";

export type UniversityLogo = { mediaAssetId?: string; alt: string };

function UniversityRow({ images }: { images: UniversityLogo[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    const card = ref.current.querySelector("div");
    const cardWidth = card ? card.offsetWidth + 16 : 160;
    ref.current.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={() => scroll("left")}
        className="flex-none w-7 h-7 rounded-full border border-border bg-card grid place-items-center hover:bg-muted transition-colors shrink-0"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        ref={ref}
        className="flex gap-4 overflow-x-hidden flex-1"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((img, idx) => {
          const src = assetUrl(img.mediaAssetId);
          return (
            <div
              key={`${img.alt}-${idx}`}
              className="flex-none w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(20%-13px)] aspect-3/2 rounded-md border border-border bg-card grid place-items-center p-3 hover:shadow-md hover:-translate-y-0.5 transition-all"
              style={{ scrollSnapAlign: "start" }}
            >
              {src && (
                <img src={src} alt={img.alt} className="max-h-full max-w-full object-contain" />
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => scroll("right")}
        className="flex-none w-7 h-7 rounded-full border border-border bg-card grid place-items-center hover:bg-muted transition-colors shrink-0"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export type UniversitiesProps = {
  heading: string;
  rows: UniversityLogo[][];
};

export function Universities({ heading, rows }: UniversitiesProps) {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">{heading}</h2>
        <div className="mt-12 flex flex-col gap-6">
          {rows.map((row, rowIdx) => (
            <UniversityRow key={rowIdx} images={row} />
          ))}
        </div>
      </div>
    </section>
  );
}
