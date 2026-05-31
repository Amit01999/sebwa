import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Row 1
import dhaka from "@/assets/Universities/row1/Dhaka-University-150x100.png";
import chittagong from "@/assets/Universities/row1/Chittagong-University-150x100.png";
import harvard from "@/assets/Universities/row1/harvard-university-150x100.png";
import cornell from "@/assets/Universities/row1/Cornell-University-150x100.png";
import auckland from "@/assets/Universities/row1/Auckland-University-150x100.png";
import brown from "@/assets/Universities/row1/Brown-University-150x100.png";
import columbia from "@/assets/Universities/row1/Columbia-University-150x100.png";
import australian from "@/assets/Universities/row1/Australian-National-University-150x100.png";
import dartmouth from "@/assets/Universities/row1/Dartmouth-College-150x100.png";
import buet from "@/assets/Universities/row1/BUET-150x100.png";

// Row 2
import monash from "@/assets/Universities/row2/Monash-University-150x100.png";
import hongkong from "@/assets/Universities/row2/Hong-Kong-University-150x100.png";
import iit from "@/assets/Universities/row2/IIT-Mumbai-150x100.png";
import kaist from "@/assets/Universities/row2/KAIST-150x100.png";
import mcgill from "@/assets/Universities/row2/McGill-University-150x100.png";
import nus from "@/assets/Universities/row2/NUS-Singapore-150x100.png";
import adelaide from "@/assets/Universities/row2/University-of-Adelaide-150x100.png";
import princeton from "@/assets/Universities/row2/Princeton-University-150x100.png";
import alberta from "@/assets/Universities/row2/University-of-Alberta-150x100.png";
import lund from "@/assets/Universities/row2/Lund-University-150x100.png";

// Row 3
import toronto from "@/assets/Universities/row3/University-of-Toronto-150x100.png";
import ubc from "@/assets/Universities/row3/University-of-British-Columbia-150x100.png";
import penn from "@/assets/Universities/row3/University-of-Pennsylvania-150x100.png";
import melbourne from "@/assets/Universities/row3/University-of-Melbourne-150x100.png";
import queensland from "@/assets/Universities/row3/University-of-Queensland-150x100.png";
import sydney from "@/assets/Universities/row3/University-of-Sydney-150x100.png";
import uwa from "@/assets/Universities/row3/UWA-150x100.png";
import tokyo from "@/assets/Universities/row3/University-of-Toyko-150x100.png";
import unsw from "@/assets/Universities/row3/UNSW-Sydney-150x100.png";
import yale from "@/assets/Universities/row3/Yale-University-150x100.png";

const rows = [
  [
    { src: dhaka, alt: "Dhaka University" },
    { src: chittagong, alt: "Chittagong University" },
    { src: harvard, alt: "Harvard University" },
    { src: cornell, alt: "Cornell University" },
    { src: auckland, alt: "Auckland University" },
    { src: brown, alt: "Brown University" },
    { src: columbia, alt: "Columbia University" },
    { src: australian, alt: "Australian National University" },
    { src: dartmouth, alt: "Dartmouth College" },
    { src: buet, alt: "BUET" },
  ],
  [
    { src: monash, alt: "Monash University" },
    { src: hongkong, alt: "Hong Kong University" },
    { src: iit, alt: "IIT Mumbai" },
    { src: kaist, alt: "KAIST" },
    { src: mcgill, alt: "McGill University" },
    { src: nus, alt: "NUS Singapore" },
    { src: adelaide, alt: "University of Adelaide" },
    { src: princeton, alt: "Princeton University" },
    { src: alberta, alt: "University of Alberta" },
    { src: lund, alt: "Lund University" },
  ],
  [
    { src: toronto, alt: "University of Toronto" },
    { src: ubc, alt: "University of British Columbia" },
    { src: penn, alt: "University of Pennsylvania" },
    { src: melbourne, alt: "University of Melbourne" },
    { src: queensland, alt: "University of Queensland" },
    { src: sydney, alt: "University of Sydney" },
    { src: uwa, alt: "UWA" },
    { src: tokyo, alt: "University of Tokyo" },
    { src: unsw, alt: "UNSW Sydney" },
    { src: yale, alt: "Yale University" },
  ],
];

function UniversityRow({ images }: { images: { src: string; alt: string }[] }) {
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
        {images.map((img) => (
          <div
            key={img.alt}
            className="flex-none w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(20%-13px)] aspect-3/2 rounded-md border border-border bg-card grid place-items-center p-3 hover:shadow-md hover:-translate-y-0.5 transition-all"
            style={{ scrollSnapAlign: "start" }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
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

export function Universities() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          Acceptance in World&apos;s Leading Universities
        </h2>
        <div className="mt-12 flex flex-col gap-6">
          {rows.map((row, rowIdx) => (
            <UniversityRow key={rowIdx} images={row} />
          ))}
        </div>
      </div>
    </section>
  );
}
