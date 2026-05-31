import { Link } from "@tanstack/react-router";

export function CTA() {
  return (
    <section className="bg-mist py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h3 className="text-xl md:text-4xl font-semibold text-black leading-snug">
          World-Class Curriculum, Structured Support and Professional Learning
        </h3>
        <Link
          to="/contact-us"
          className="mt-6 inline-flex items-center rounded-sm bg-orange px-6 py-3 text-sm font-semibold text-orange-foreground shadow-md transition-transform hover:scale-[1.04] hover:bg-orange/90"
        >
          Get Connected With Us
        </Link>
      </div>
    </section>
  );
}
