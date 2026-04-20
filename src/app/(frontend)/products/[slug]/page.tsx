import { getPayload } from 'payload'
import configPromise from '@/payload.config'
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
import { getMediaUrl } from '@/lib/getMediaUrl'

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
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 3,
  });

  if (docs.length === 0) return notFound();

  const product   = docs[0];
  const brand     = product.brand    && typeof product.brand    !== 'string' ? product.brand    : null;
  const category  = product.category && typeof product.category !== 'string' ? product.category : null;

  // ── Gallery images ────────────────────────────────────────
  const images: { url: string; alt?: string; mimeType?: string }[] = [];
  if (product.heroImage && typeof product.heroImage !== 'string' && product.heroImage.url) {
    const url = getMediaUrl(product.heroImage.url);
    if (url) images.push({ url, alt: (product.heroImage as any).alt || product.name, mimeType: (product.heroImage as any).mimeType });
  }
  if (product.gallery && product.gallery.length > 0) {
    product.gallery.forEach((g: any) => {
      if (g.image && typeof g.image !== 'string' && g.image.url) {
        const url = getMediaUrl(g.image.url);
        if (url) images.push({ url, alt: g.alt || g.image.alt || product.name, mimeType: (g.image as any).mimeType });
      }
    });
  }
  
  // Ultimate fallback to SEO meta image if still empty
  if (images.length === 0 && product.meta?.image && typeof product.meta.image !== 'string' && product.meta.image.url) {
    const backupUrl = getMediaUrl(product.meta.image.url);
    if (backupUrl) images.push({ url: backupUrl, alt: product.name, mimeType: (product.meta.image as any).mimeType });
  }

  // ── Country ───────────────────────────────────────────────
  const rawCountry   = product.originCountry || '';
  const countryClean = rawCountry ? extractCountry(rawCountry) : '';
  const countryCode  = countryClean ? getCountryCode(countryClean) : null;

  // ── Brand logo ────────────────────────────────────────────
  const brandLogoUrl = brand?.logo && typeof brand.logo !== 'string'
    ? getMediaUrl((brand.logo as any).url)
    : null;

  // ── Related products ──────────────────────────────────────
  const relatedRaw: any[] = product.relatedProducts
    ? (product.relatedProducts as any[]).filter(
        (r: any) => r && typeof r === 'object' && r.slug
      )
    : [];

  return (
    <div className="min-h-screen bg-white font-['Inter']">

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
                    {category.title}
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
                {category?.title && (
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] bg-[#12B5CB]/10 text-[#12B5CB] border border-[#12B5CB]/20">
                    {category.title}
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

              {/* Product Description — listingSummary first, shortSummary fallback.
                  SmartDescription auto-formats any "Feature: Detail." text pattern
                  into icon cards. Works for ALL products automatically. */}
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
                  <BrandPopupCard brand={brand} brandLogoUrl={brandLogoUrl} />
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
