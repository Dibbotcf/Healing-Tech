export function getMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  // Return full URLs as-is (Directus assets, CDN, etc.)
  // Next.js Image is configured to allow https://** in remotePatterns
  try {
    new URL(url);
    return url;
  } catch {
    // Already a relative path — keep it
  }
  return url;
}
