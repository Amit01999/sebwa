/**
 * Accepts either a bare Vimeo video id ("727191185") or any link copied
 * from Vimeo — vimeo.com/727191185, vimeo.com/727191185/4809a8fffc,
 * player.vimeo.com/video/727191185?h=4809a8fffc, with or without extra
 * query params — and pulls out the numeric id and, if present, the privacy
 * hash Vimeo requires to embed an unlisted/private video.
 */
export function parseVimeoVideo(input: string): { videoId: string; h?: string } {
  const trimmed = input.trim();
  if (!trimmed) return { videoId: "" };

  if (/^\d+$/.test(trimmed)) return { videoId: trimmed };

  const idMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (!idMatch) return { videoId: trimmed };
  const videoId = idMatch[1];

  const queryHashMatch = trimmed.match(/[?&]h=([a-z0-9]+)/i);
  if (queryHashMatch) return { videoId, h: queryHashMatch[1] };

  const pathHashMatch = trimmed.match(new RegExp(`${videoId}/([a-z0-9]+)`, "i"));
  if (pathHashMatch) return { videoId, h: pathHashMatch[1] };

  return { videoId };
}
