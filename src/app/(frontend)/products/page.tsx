import { directusGet, directusAssetUrl } from '@/lib/directus';
import ProductFilterClient from './ProductFilterClient';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const categorySlug = params.category || null;

  let productsRes: { data: any[] } = { data: [] };
  let categoriesRes: { data: any[] } = { data: [] };
  try {
    [productsRes, categoriesRes] = await Promise.all([
      directusGet<{ data: any[] }>(
        "/items/products?fields=id,name,slug,listing_summary,short_summary,mark_as_new,price,discount_price,hero_image,category.id,category.name,category.slug,brand.id,brand.name&filter[status][_eq]=published&sort=-mark_as_new,-date_created&limit=500",
        0
      ),
      directusGet<{ data: any[] }>(
        "/items/categories?fields=id,name,slug&sort=sort_order&limit=100",
        0
      ),
    ]);
  } catch {
    // Directus unavailable — render empty state rather than throwing 500
  }

  const products = (productsRes.data ?? []).map((p: any) => ({
    id: String(p.id),
    name: p.name,
    slug: p.slug,
    listingSummary: p.listing_summary ?? '',
    shortSummary: p.short_summary ?? '',
    markAsNew: !!p.mark_as_new,
    price: p.price ?? null,
    discountPrice: p.discount_price ?? null,
    heroImage: p.hero_image ? { url: directusAssetUrl(p.hero_image), mimeType: '' } : null,
    category: p.category ? { id: String(p.category.id), title: p.category.name, slug: p.category.slug } : null,
    brand: p.brand ? { id: String(p.brand.id), name: p.brand.name } : null,
  }));

  const categories = (categoriesRes.data ?? []).map((c: any) => ({
    id: String(c.id),
    title: c.name,
    slug: c.slug,
  }));

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#EEF4FB] text-[#00355D] pt-[88px] pb-16 md:pt-[96px] md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <h1 className="font-['Inter'] text-4xl md:text-5xl font-bold mb-4 tracking-[-0.03em]">Product Catalog</h1>
          <p className="text-xl text-[#00355D]/80 max-w-2xl font-light">Advanced clinical solutions for modern healthcare infrastructure.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] mt-12">
        <ProductFilterClient
          initialProducts={products}
          categories={categories}
          initialCategorySlug={categorySlug}
        />
      </div>
    </div>
  );
}
