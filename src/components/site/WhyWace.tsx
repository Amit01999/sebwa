export type WhyWaceProps = {
  heading: string;
  paragraph: string;
  bullets?: string[];
};

export function WhyWace({ heading, paragraph, bullets = [] }: WhyWaceProps) {
  return (
    <section className="bg-mist py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-8 grid gap-8 lg:grid-cols-2 items-start">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">{heading}</h2>
          <p className="mt-6 text-black text-justify leading-relaxed text-lg">{paragraph}</p>
        </div>
        <div className="relative bg-purple text-purple-foreground p-8 lg:p-10 rounded-tr-[60px] rounded-bl-[60px] shadow-xl">
          <ul className="space-y-3 text-lg">
            {bullets.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white flex-none" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
