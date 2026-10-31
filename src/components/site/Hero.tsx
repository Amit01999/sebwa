import { assetUrl } from "./media";

export type HeroProps = {
  backgroundImage?: string;
  eyebrowLines?: string[];
  heading: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Hero({
  backgroundImage,
  eyebrowLines = [],
  heading,
  ctaLabel,
  ctaHref,
}: HeroProps) {
  const src = assetUrl(backgroundImage);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[650px] md:h-[600px] lg:h-[640px] bg-navy">
        {src && (
          <img
            src={src}
            alt="International students on a Western Australia campus"
            className="absolute inset-0 h-full w-full object-cover object-top max-sm:object-right"
            width={1920}
            height={900}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
        <div className="relative z-10 mx-auto h-full max-w-7xl px-4 lg:px-8 flex items-center">
          <div className="max-w-xl text-white animate-in fade-in slide-in-from-left-6 duration-700">
            {eyebrowLines.map((line, i) => (
              <p
                key={i}
                className={`text-sm md:text-base font-medium tracking-wide opacity-90 ${i > 0 ? "mt-1" : ""}`}
              >
                {line}
              </p>
            ))}
            <h1 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">{heading}</h1>
            {ctaLabel && ctaHref && (
              <a
                href={ctaHref}
                className="mt-6 inline-flex items-center rounded-sm bg-orange px-6 py-3 text-sm font-semibold text-orange-foreground shadow-md transition-transform hover:scale-[1.04] hover:bg-orange/90"
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
