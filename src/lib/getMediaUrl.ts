/**
 * Normalizes a Payload CMS media URL into a safe relative path
 * for use with Next.js <Image> and <img> elements.
 *
 * Payload stores absolute URLs (e.g. https://healingtechnologybd.com/api/media/file/foo.png)
 * that break Next.js image optimization when served from a different origin.
 * This utility strips the origin and returns a relative path.
 */
export function getMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    // Return just the pathname (e.g. /api/media/file/foo.png)
    return parsed.pathname;
  } catch {
    // Already a relative path — return as-is
    return url;
  }
}
