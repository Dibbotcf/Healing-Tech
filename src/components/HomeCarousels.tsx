import { directusGet, directusAssetThumb } from "@/lib/directus";
import { HomeCarouselsClient } from "@/components/HomeCarouselsClient";

export async function HomeCarousels() {
  let initialProducts: any[] = [];
  let initialTotalDocs = 0;

  try {
    const fields = "id,name,slug,listing_summary,mark_as_new,price,discount_price,hero_image,date_updated,category.id,category.name,category.slug,brand.id,brand.name";
    const [itemsRes, countRes] = await Promise.all([
      directusGet<{ data: any[] }>(
        `/items/products?fields=${fields}&limit=12&offset=0&sort=-mark_as_new,-date_created&filter[status][_eq]=published`,
        0
      ),
      directusGet<{ data: any[] }>(
        `/items/products?fields=id&limit=-1&filter[status][_eq]=published`,
        0
      ),
    ]);
    initialTotalDocs = countRes.data.length;
    initialProducts = (itemsRes.data ?? []).map((p: any) => ({
      id: String(p.id),
      name: p.name,
      slug: p.slug,
      listingSummary: p.listing_summary ?? "",
      markAsNew: !!p.mark_as_new,
      price: p.price ?? null,
      discountPrice: p.discount_price ?? null,
      heroImage: p.hero_image
        ? { url: directusAssetThumb(p.hero_image, 500, 82, p.date_updated)!, mimeType: "" }
        : null,
      category: p.category ? { title: p.category.name, slug: p.category.slug } : null,
      brand: p.brand ? { name: p.brand.name } : null,
    }));
  } catch {
    // If server fetch fails, ProductCarousel will fetch client-side on mount
  }

  return (
    <HomeCarouselsClient initialProducts={initialProducts} initialTotalDocs={initialTotalDocs} />
  );
}
