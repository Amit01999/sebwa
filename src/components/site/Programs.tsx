import programs from "@/assets/Programs-Image.png";
import books from "@/assets/books-icon2.png";

const items = [
  { title: "WAM International", sub: "(Year-12)" },
  { title: "WACE International", sub: "(Year 11 and 12)" },
  { title: "WA K-10 International", sub: "(Kindergarten to Year-10)" },
  { title: "WA Early Years International", sub: "(Kindergarten to Year-2)" },
];

export function Programs() {
  return (
    <section className="bg-navy text-white py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8 text-center">
        <h2 className="text-5xl lg:text-7xl font-bold text-white/15 leading-none">
          Programs<span className="text-orange">|</span>
        </h2>
        <div className="mt-8 mx-auto max-w-3xl overflow-hidden rounded-md shadow-2xl">
          <img
            src={programs}
            alt="Student studying"
            className="w-full h-auto"
            width={1100}
            height={700}
            loading="lazy"
          />
        </div>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it) => (
            <div key={it.title} className="flex flex-col items-center text-center group">
              <img
                src={books}
                alt=""
                className="h-20 w-20 object-contain transition-transform group-hover:-translate-y-1"
                width={100}
                height={100}
                loading="lazy"
              />
              <p className="mt-4 text-lg font-semibold leading-snug">{it.title}</p>
              <p className="text-md text-white/70">{it.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
