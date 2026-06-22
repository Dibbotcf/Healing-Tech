const DIRECTUS_URL = process.env.DIRECTUS_URL ?? 'https://cms.healingtechnology.com.bd';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN ?? '';

/** Absolute URL to a Directus file asset */
export function directusAssetUrl(uuid: string | null | undefined): string | null {
  if (!uuid) return null;
  return `${DIRECTUS_URL}/assets/${uuid}`;
}

/**
 * Directus asset URL with resize + WebP conversion for product card thumbnails.
 * Serves ~30-60 KB instead of the original 1-2 MB, dramatically reducing load time.
 */
export function directusAssetThumb(
  uuid: string | null | undefined,
  width = 500,
  quality = 82,
  modified?: string | null
): string | null {
  if (!uuid) return null;
  const base = `${DIRECTUS_URL}/assets/${uuid}?width=${width}&quality=${quality}&format=webp`;
  return modified ? `${base}&v=${new Date(modified).getTime()}` : base;
}

/** Fetch Directus items with admin token */
export async function directusFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${DIRECTUS_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: options.next,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Directus ${endpoint}: ${res.status} ${text.slice(0, 200)}`);
  }
  return res.json();
}

export async function directusGet<T = any>(path: string, revalidate?: number): Promise<T> {
  return directusFetch<T>(path, revalidate !== undefined ? { next: { revalidate } } : {});
}

export async function directusPost<T = any>(path: string, body: unknown): Promise<T> {
  return directusFetch<T>(path, { method: 'POST', body: JSON.stringify(body) });
}

export async function directusPatch<T = any>(path: string, body: unknown): Promise<T> {
  return directusFetch<T>(path, { method: 'PATCH', body: JSON.stringify(body) });
}
