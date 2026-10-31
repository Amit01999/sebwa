import { Link } from "@tanstack/react-router";

export type CTAProps = {
  heading: string;
  ctaLabel: string;
  ctaHref: string;
};

export function CTA({ heading, ctaLabel, ctaHref }: CTAProps) {
  const className =
    "mt-6 inline-flex items-center rounded-sm bg-orange px-6 py-3 text-sm font-semibold text-orange-foreground shadow-md transition-transform hover:scale-[1.04] hover:bg-orange/90";

  return (
    <section className="bg-mist py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h3 className="text-xl md:text-4xl font-semibold text-black leading-snug">{heading}</h3>
        {ctaHref.startsWith("/") ? (
          <Link to={ctaHref} className={className}>
            {ctaLabel}
          </Link>
        ) : (
          <a href={ctaHref} className={className}>
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
