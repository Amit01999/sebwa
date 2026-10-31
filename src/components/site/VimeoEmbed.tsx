/**
 * Shared replacement for the 9 hand-rolled Vimeo `<iframe>` embeds across
 * the site. Every one of the site's original videos is unlisted/private and
 * requires Vimeo's `h` privacy-hash query param to embed at all — without
 * it the player shows Vimeo's own "Sorry, we're having a little trouble"
 * error instead of the video, so `hash` is not just cosmetic here.
 */
export function VimeoEmbed({
  videoId,
  hash,
  title,
}: {
  videoId: string;
  hash?: string;
  title?: string;
}) {
  const src = hash
    ? `https://player.vimeo.com/video/${videoId}?h=${hash}`
    : `https://player.vimeo.com/video/${videoId}`;

  return (
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      <iframe
        title={title || "vimeo-player"}
        src={src}
        style={{ border: 0 }}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
