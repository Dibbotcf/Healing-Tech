import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import ReactCountryFlag from "react-country-flag"
import { ProductGallery } from '@/components/ProductGallery'
import { BrandPopupCard } from '@/components/BrandPopupCard'
import { ProductClientActions } from '@/components/ProductClientActions'
import { ProductDetailTabs } from '@/components/ProductDetailTabs'
import { RelatedProducts } from '@/components/RelatedProducts'
import { SmartDescription } from '@/components/SmartDescription'
import { PixelViewContent } from '@/components/PixelEvents'
import { directusGet, directusAssetUrl, directusAssetThumb } from '@/lib/directus'

// ── Helpers ──────────────────────────────────────────────────
const extractCountry = (raw: string): string =>
  raw.replace(/\s*\(.*?\)\s*/g, '').trim();

const getCountryCode = (c: string) => {
  const n = c.toLowerCase();
  if (n.includes("malaysia"))      return "MY";
  if (n.includes("germany"))       return "DE";
  if (n.includes("china"))         return "CN";
  if (n.includes("korea"))         return "KR";
  if (n.includes("japan"))         return "JP";
  if (n.includes("turkey"))        return "TR";
  if (n.includes("usa") || n.includes("united states")) return "US";
  if (n.includes("uk") || n.includes("united kingdom"))  return "GB";
  if (n.includes("italy"))         return "IT";
  if (n.includes("france"))        return "FR";
  if (n.includes("taiwan"))        return "TW";
  if (n.includes("india"))         return "IN";
  if (n.includes("singapore"))     return "SG";
  if (n.includes("netherlands"))   return "NL";
  if (n.includes("sweden"))        return "SE";
  return null;
};

export const dynamic = 'force-dynamic';

// ── Page ──────────────────────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const fields = [
    "id,name,slug,sku,mark_as_new,listing_summary,short_summary",
    "price,discount_price,overview,hero_image",
    "origin_country,certification_summary,brochure_page_ref,status",
    "key_highlights,applications,spec_groups,download_items,support_blocks,faq_items,gallery",
    "brand.id,brand.name,brand.slug,brand.logo,brand.certifications_text",
    "category.id,category.name,category.slug",
    "images.directus_files_id",
    "related_products.related_products_id.id,related_products.related_products_id.name,related_products.related_products_id.slug",
    "related_products.related_products_id.listing_summary,related_products.related_products_id.short_summary",
    "related_products.related_products_id.mark_as_new,related_products.related_products_id.price,related_products.related_products_id.discount_price",
    "related_products.related_products_id.hero_image,related_products.related_products_id.category.name,related_products.related_products_id.brand.name",
  ].join(",");

  const res = await directusGet<{ data: any[] }>(
    `/items/products?filter[slug][_eq]=${encodeURIComponent(slug)}&fields=${fields}&limit=1`
  );

  if (!res.data?.length) return notFound();

  const p = res.data[0];

  // Normalise to a shape the existing JSX expects
  const product = {
    id: p.id,
    name: p.name,
    slug: p.slug,
    sku: p.sku,
    markAsNew: !!p.mark_as_new,
    listingSummary: p.listing_summary ?? '',
    shortSummary: p.short_summary ?? '',
    price: p.price ?? null,
    discountPrice: p.discount_price ?? null,
    overview: p.overview ?? null,
    originCountry: p.origin_country ?? '',
    certificationSummary: p.certification_summary ?? '',
    brochurePageRef: p.brochure_page_ref ?? '',
    keyHighlights: Array.isArray(p.key_highlights) ? p.key_highlights : [],
    applications: Array.isArray(p.applications) ? p.applications : [],
    specGroups: Array.isArray(p.spec_groups) ? p.spec_groups : [],
    downloadItems: Array.isArray(p.download_items) ? p.download_items : [],
    supportBlocks: Array.isArray(p.support_blocks) ? p.support_blocks : [],
    faqItems: Array.isArray(p.faq_items) ? p.faq_items : [],
    gallery: Array.isArray(p.gallery) ? p.gallery : [],
  };

  const brand = p.brand ?? null;
  const category = p.category ?? null;

  // ── Gallery images ────────────────────────────────────────
  const images: { url: string; alt?: string; mimeType?: string }[] = [];
  if (p.hero_image) {
    const url = directusAssetUrl(p.hero_image);
    if (url) images.push({ url, alt: product.name });
  }
  // M2M images from products_files junction
  if (Array.isArray(p.images)) {
    for (const rel of p.images) {
      const fileId = typeof rel === 'object' ? (rel.directus_files_id ?? null) : rel;
      const url = directusAssetUrl(typeof fileId === 'object' ? fileId?.id : fileId);
      if (url) images.push({ url, alt: product.name });
    }
  }
  // Gallery JSON field (stores {image: uuid, alt: string})
  // Skip non-UUID values — legacy Payload entries store integer IDs (as numbers or numeric strings)
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (images.length === 0 && product.gallery.length > 0) {
    for (const g of product.gallery) {
      if (!g.image || typeof g.image !== 'string' || !UUID_RE.test(g.image)) continue;
      const url = directusAssetUrl(g.image);
      if (url) images.push({ url, alt: g.alt || product.name });
    }
  }

  // ── Country ───────────────────────────────────────────────
  const rawCountry   = product.originCountry || '';
  const countryClean = rawCountry ? extractCountry(rawCountry) : '';
  const countryCode  = countryClean ? getCountryCode(countryClean) : null;

  // ── Brand logo ────────────────────────────────────────────
  const brandLogoUrl = brand?.logo ? directusAssetUrl(brand.logo) : null;

  const relatedRaw = Array.isArray(p.related_products)
    ? p.related_products
        .map((r: any) => {
          const rel = r?.related_products_id;
          if (!rel) return null;
          return {
            id: String(rel.id),
            name: rel.name,
            slug: rel.slug,
            listingSummary: rel.listing_summary ?? '',
            shortSummary: rel.short_summary ?? '',
            markAsNew: !!rel.mark_as_new,
            price: rel.price ?? null,
            discountPrice: rel.discount_price ?? null,
            heroImage: rel.hero_image ? { url: directusAssetThumb(rel.hero_image)! } : null,
            category: rel.category?.name ? { title: rel.category.name } : undefined,
            brand: rel.brand?.name ? { name: rel.brand.name } : undefined,
          };
        })
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-white font-['Inter']">
      <PixelViewContent
        id={String(product.id)}
        name={product.name}
        price={product.price ?? null}
        discountPrice={product.discountPrice ?? null}
        category={category?.name}
      />

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <div className="bg-[#EEF4FB] pt-[88px] pb-28 lg:pt-[96px] lg:pb-36">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">

          {/* Breadcrumb */}
          <div className="flex items-center gap-4 mb-10 text-sm font-medium tracking-[-0.01em]">
            <Link
              href="/products"
              className="flex items-center gap-2 text-[#00355D]/60 hover:text-[#12B5CB] transition-colors pr-4 border-r border-gray-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <nav className="flex items-center text-[#00355D]/60 w-full overflow-hidden">
              <Link href="/" className="hover:text-[#12B5CB] transition-colors flex-shrink-0">Home</Link>
              <span className="mx-2 text-gray-300">/</span>
              <Link href="/products" className="hover:text-[#12B5CB] transition-colors">Products</Link>
              {category && (
                <>
                  <span className="mx-2 text-gray-300">/</span>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="hover:text-[#12B5CB] transition-colors"
                  >
                    {category.name}
                  </Link>
                </>
              )}
              <span className="mx-2 text-gray-300">/</span>
              <span className="text-[#00355D] font-bold line-clamp-1">{product.name}</span>
            </nav>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left: Gallery */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <ProductGallery images={images} />
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-7">

              {/* Tag chips */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {category?.name && (
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] bg-[#12B5CB]/10 text-[#12B5CB] border border-[#12B5CB]/20">
                    {category.name}
                  </span>
                )}
                {countryClean && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.04em] bg-white text-[#00355D] border border-[#00355D]/10 shadow-sm">
                    {countryCode && (
                      <ReactCountryFlag
                        countryCode={countryCode}
                        svg
                        style={{ width: '1rem', height: '0.75rem', borderRadius: '2px' }}
                      />
                    )}
                    {countryClean}
                  </span>
                )}
                {product.markAsNew && (
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] bg-emerald-500 text-white">
                    NEW
                  </span>
                )}
              </div>

              {/* Name */}
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-[#00355D] tracking-[-0.03em] leading-[1.05] mb-5">
                {product.name}
              </h1>

              {/* SKU */}
              {product.sku && (
                <p className="text-xs font-semibold text-[#575B5F] uppercase tracking-[0.1em] mb-5">
                  SKU: <span className="text-[#00355D]">{product.sku}</span>
                </p>
              )}

              {/* Pricing */}
              {(product.price != null || product.discountPrice != null) && (
                <div className="flex items-end gap-3 mb-7">
                  {product.discountPrice != null ? (
                    <>
                      <span className="text-4xl md:text-5xl font-extrabold text-[#12B5CB] tracking-tight">
                        ৳{product.discountPrice.toLocaleString()}
                      </span>
                      <span className="text-xl md:text-2xl text-[#575B5F]/50 line-through pb-1">
                        ৳{product.price?.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl md:text-5xl font-extrabold text-[#12B5CB] tracking-tight">
                      ৳{product.price?.toLocaleString()}
                    </span>
                  )}
                </div>
              )}

              {(product.listingSummary || product.shortSummary) && (
                <SmartDescription text={(product.listingSummary || product.shortSummary) as string} />
              )}

              {/* Key Highlights */}
              {product.keyHighlights && product.keyHighlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 p-5 bg-white/60 rounded-2xl border border-[#00355D]/6">
                  <p className="col-span-full text-[10px] font-black text-[#575B5F] uppercase tracking-[0.12em] mb-1">
                    Key Highlights
                  </p>
                  {product.keyHighlights.map((hl: any, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 text-[#00355D]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#12B5CB] flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium leading-snug">{hl.item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Row */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#00355D]/8">
                <ProductClientActions product={product} />
                {brand && (
                  <BrandPopupCard brand={{ ...brand, name: brand.name, slug: brand.slug, certificationsText: brand.certifications_text }} brandLogoUrl={brandLogoUrl} />
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          TABBED CONTENT PANEL
      ═══════════════════════════════════════ */}
      <ProductDetailTabs
        overview={product.overview}
        specGroups={product.specGroups as any[]}
        applications={product.applications as any[]}
        certificationSummary={product.certificationSummary as string | undefined}
        downloadItems={product.downloadItems as any[]}
        supportBlocks={product.supportBlocks as any[]}
        faqItems={product.faqItems as any[]}
      />

      {/* ═══════════════════════════════════════
          RELATED PRODUCTS
      ═══════════════════════════════════════ */}
      {relatedRaw.length > 0 && (
        <RelatedProducts products={relatedRaw} />
      )}

    </div>
  );
}
