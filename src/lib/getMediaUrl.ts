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

  let pathname = url;
  try {
    const parsed = new URL(url);
    pathname = parsed.pathname;
  } catch {
    // Already a relative path — keep it
  }

  // Payload v3 stores URLs as /api/media/file/[filename]
  // We keep this path because Payload's API route will correctly serve the file 
  // from the configured staticDir (e.g. persistent storage), even for files uploaded 
  // after the server has started. This fixes the broken images issue on production.
  // if (pathname.startsWith('/api/media/file/')) {
  //   pathname = pathname.replace('/api/media/file/', '/media/');
  // }

  return pathname;
}
