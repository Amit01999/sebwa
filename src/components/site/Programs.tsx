import { assetUrl } from "./media";

export type ProgramsProps = {
  heading: string;
  heroImage?: string;
  icon?: string;
  items: { title: string; sub: string }[];
};

export function Programs({ heading, heroImage, icon, items }: ProgramsProps) {
  const heroSrc = assetUrl(heroImage);
  const iconSrc = assetUrl(icon);

  return (
    <section className="bg-navy text-white py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8 text-center">
        <h2 className="text-5xl lg:text-7xl font-bold text-white/15 leading-none">
          {heading}
          <span className="text-orange">|</span>
        </h2>
        {heroSrc && (
          <div className="mt-8 mx-auto max-w-3xl overflow-hidden rounded-md shadow-2xl">
            <img
              src={heroSrc}
              alt="Student studying"
              className="w-full h-auto"
              width={1100}
              height={700}
              loading="lazy"
            />
          </div>
        )}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it) => (
            <div key={it.title} className="flex flex-col items-center text-center group">
              {iconSrc && (
                <img
                  src={iconSrc}
                  alt=""
                  className="h-20 w-20 object-contain transition-transform group-hover:-translate-y-1"
                  width={100}
                  height={100}
                  loading="lazy"
                />
              )}
              <p className="mt-4 text-lg font-semibold leading-snug">{it.title}</p>
              <p className="text-md text-white/70">{it.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
