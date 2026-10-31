import { VimeoEmbed } from "./VimeoEmbed";

export type AboutProps = {
  eyebrow?: string;
  lead: string;
  bullets?: string[];
  video?: { provider: "vimeo"; videoId: string; h?: string; title?: string };
  closing?: string;
};

export function About({ eyebrow = "Why", lead, bullets = [], video, closing }: AboutProps) {
  return (
    <section id="about" className="bg-background py-16 ">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <h2 className="text-5xl lg:text-6xl font-bold text-muted-foreground/30 leading-none">
          {eyebrow}
          <span className="text-orange">|</span>
        </h2>
        <p className="mt-6 max-w-7xl text-lg md:text-2xl text-black font-bold text-justify text-leading-relaxed">
          {lead}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 items-center">
          <ul className="space-y-3 text-foreground/85">
            {bullets.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-none" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          {video && (
            <div className="rounded-md overflow-hidden shadow-lg">
              <VimeoEmbed
                videoId={video.videoId}
                hash={video.h}
                title={video.title ?? "A World of Opportunity"}
              />
            </div>
          )}
        </div>
        {closing && (
          <p className="text-center mt-6 ext-lg md:text-2xl text-black font-bold text-leading-relaxed">
            {closing}
          </p>
        )}
      </div>
    </section>
  );
}
