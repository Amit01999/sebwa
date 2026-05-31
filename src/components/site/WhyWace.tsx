export function WhyWace() {
  return (
    <section className="bg-mist py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-8 grid gap-8 lg:grid-cols-2 items-start">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">Why WACE?</h2>
          <p className="mt-6 text-black text-justify leading-relaxed text-lg">
            The Western Australian Certificate of Education (WACE) is a highly regarded high school
            graduation certificate that is recognised by all the leading universities around the
            world. A WACE educational certification is your gateway to strong future opportunities,
            whether in a preferred tertiary degree qualification or entering the workforce.
          </p>
        </div>
        <div className="relative bg-purple text-purple-foreground p-8 lg:p-10 rounded-tr-[60px] rounded-bl-[60px] shadow-xl">
          <ul className="space-y-3 text-lg">
            {[
              "50% Coursework & 50% Exam",
              "Emphasis on Applied Learning & Job Readiness",
              "Recognised by all leading universities of the world",
              "WACE graduates are prioritised for Prestigious Scholarships offered by Universities located in Western Australia",
            ].map((t) => (
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
