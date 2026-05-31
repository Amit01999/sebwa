export function About() {
  return (
    <section id="about" className="bg-background py-16 ">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <h2 className="text-5xl lg:text-6xl font-bold text-muted-foreground/30 leading-none">
          Why<span className="text-orange">|</span>
        </h2>
        <p className="mt-6 max-w-7xl text-lg md:text-2xl text-black font-bold text-justify text-leading-relaxed">
          The School Curriculum and Standards Authority takes a holistic approach to the support it
          provides to oversee schools, which is informed by more than 34 years of operating its
          international education program.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 items-center">
          <ul className="space-y-3 text-foreground/85">
            {[
              "Ongoing tailored expert support.",
              "Access to tools to monitor and report on student progress.",
              "Curriculum and assessment resources which enable effective teaching practices.",
              "Resources reflect teaching in diverse international contexts.",
              "Extensive professional learning accessible through flexible modes of delivery.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-none" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="aspect-video w-full rounded-md overflow-hidden shadow-lg">
            <iframe
              src="https://player.vimeo.com/video/727191185?color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1&h=4809a8fffc#t=0s"
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="A World of Opportunity"
            />
          </div>
        </div>
        <p className="text-center mt-6 ext-lg md:text-2xl text-black font-bold text-leading-relaxed">
          A World of Opportunity Awaits
        </p>
      </div>
    </section>
  );
}
