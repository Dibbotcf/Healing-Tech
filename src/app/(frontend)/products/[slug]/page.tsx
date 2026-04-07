import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CheckCircle2, FileText, Download } from 'lucide-react'
import { notFound } from 'next/navigation'
import ReactCountryFlag from "react-country-flag"
import { ProductGallery } from '@/components/ProductGallery'

// Extracts the first word/country from strings like "Malaysia (Pressure regulator)"
const extractCountry = (raw: string): string => {
  // Strip anything in parentheses
  return raw.replace(/\s*\(.*?\)\s*/g, '').trim();
}

const getCountryCode = (countryName: string) => {
  const norm = countryName.toLowerCase();
  if (norm.includes("malaysia")) return "MY";
  if (norm.includes("germany")) return "DE";
  if (norm.includes("china")) return "CN";
  if (norm.includes("korea")) return "KR";
  if (norm.includes("japan")) return "JP";
  if (norm.includes("turkey")) return "TR";
  if (norm.includes("usa") || norm.includes("united states")) return "US";
  if (norm.includes("uk") || norm.includes("united kingdom")) return "GB";
  if (norm.includes("italy")) return "IT";
  if (norm.includes("france")) return "FR";
  if (norm.includes("taiwan")) return "TW";
  if (norm.includes("india")) return "IN";
  if (norm.includes("singapore")) return "SG";
  if (norm.includes("netherlands")) return "NL";
  if (norm.includes("sweden")) return "SE";
  return null; // null means we won't show a flag for unknown
}

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise })
  
  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2
  })

  if (docs.length === 0) return notFound()

  const product = docs[0]
  const brand    = product.brand    && typeof product.brand    !== 'string' ? product.brand    : null;
  const category = product.category && typeof product.category !== 'string' ? product.category : null;

  // Gather all images for the gallery (hero + gallery array)
  const images: { url: string; alt?: string }[] = [];
  if (product.heroImage && typeof product.heroImage !== 'string' && product.heroImage.url) {
    images.push({ url: product.heroImage.url, alt: (product.heroImage as any).alt || product.name });
  }
  if (product.gallery && product.gallery.length > 0) {
    product.gallery.forEach((g: any) => {
      if (g.image && typeof g.image !== 'string' && g.image.url) {
        images.push({ url: g.image.url, alt: g.alt || g.image.alt || product.name });
      }
    });
  }

  // Parse originCountry — field may contain notes like "Malaysia (Pressure regulator)"
  const rawCountry = product.originCountry || '';
  const countryClean = rawCountry ? extractCountry(rawCountry) : '';
  const countryCode = countryClean ? getCountryCode(countryClean) : null;

  const brandLogoUrl = brand?.logo && typeof brand.logo !== 'string' ? (brand.logo as any).url : null;

  return (
    <div className="min-h-screen bg-white pb-24 font-['Inter']">
      {/* ─── Hero Section ─── */}
      <div className="bg-[#EEF4FB] pt-[88px] pb-24 lg:pt-[96px] lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          {/* Back link */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#00355D]/60 hover:text-[#00355D] mb-10 transition-colors text-sm font-medium tracking-[-0.02em]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Image Gallery */}
            <div className="lg:col-span-5">
              <ProductGallery images={images} />
            </div>

            {/* Right: Product Info */}
            <div className="lg:col-span-7">
              {/* Chips row — plain styled spans, no HeroUI in SSR */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {category?.title && (
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] bg-[#12B5CB]/10 text-[#12B5CB] border border-[#12B5CB]/20">
                    {category.title}
                  </span>
                )}
                {countryClean && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.04em] bg-white text-[#00355D] border border-[#00355D]/10 shadow-sm">
                    {countryCode ? (
                      <ReactCountryFlag countryCode={countryCode} svg style={{ width: '1rem', height: '0.75rem', borderRadius: '2px' }} />
                    ) : null}
                    {countryClean}
                  </span>
                )}
                {product.markAsNew && (
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] bg-emerald-500 text-white">
                    NEW
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-[#00355D] tracking-[-0.03em] leading-[1.04] mb-5">
                {product.name}
              </h1>

              {/* Short Summary */}
              {product.shortSummary && (
                <p className="text-base md:text-lg text-[#00355D]/70 font-light leading-relaxed mb-10 max-w-xl tracking-[-0.01em]">
                  {product.shortSummary}
                </p>
              )}

              {/* Key Highlights */}
              {product.keyHighlights && product.keyHighlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {product.keyHighlights.map((hl: any, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 text-[#00355D]/80">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#12B5CB] flex-shrink-0 mt-0.5 w-5 h-5" />
                      <span className="text-sm font-medium leading-snug">{hl.item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Row */}
              <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-[#00355D]/8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#12B5CB] hover:bg-[#009EE2] active:bg-[#007ab5] text-white px-7 py-3.5 rounded-full text-sm font-bold transition-colors shadow-md hover:shadow-lg"
                >
                  Request a Quote
                </Link>

                {/* Brand card — only logo (no icon fallback) */}
                {brand && (
                  <div className="flex items-center gap-3 bg-white pl-4 pr-5 py-2.5 rounded-full border border-[#00355D]/8 shadow-sm">
                    {brandLogoUrl ? (
                      <div className="relative h-7 w-[72px] mix-blend-multiply flex-shrink-0">
                        <Image src={brandLogoUrl} alt={brand.name} fill className="object-contain" />
                      </div>
                    ) : null}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] text-[#00355D]/40 uppercase tracking-[0.2em] font-bold leading-none">
                        Manufacturer
                      </span>
                      <span className="text-sm text-[#00355D] font-bold leading-none tracking-[-0.02em]">
                        {brand.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Specs & Downloads ─── */}
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] -mt-10 relative z-10">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 lg:p-12 shadow-sm">

          {/* Technical Specifications — dark HeroUI-style HTML table */}
          {product.specGroups && product.specGroups.length > 0 && (
            <div className="mb-14">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#00355D] mb-8 tracking-[-0.03em]">
                Technical Specifications
              </h2>
              <div className="space-y-8">
                {product.specGroups.map((group: any, i: number) => (
                  <div key={i}>
                    {group.groupTitle && (
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#575B5F] mb-3">
                        {group.groupTitle}
                      </p>
                    )}
                    {/* Dark table — matches HeroUI dark table from screenshot exactly */}
                    <div className="rounded-2xl overflow-hidden border border-[#27272a] bg-[#18181b]">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-[#27272a]">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500 w-2/5">
                              Feature
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                              Specification
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.rows?.map((row: any, j: number) => (
                            <tr
                              key={j}
                              className={`border-b border-[#27272a] last:border-0 hover:bg-white/5 transition-colors ${j % 2 === 0 ? '' : ''}`}
                            >
                              <td className="px-6 py-4 text-sm text-zinc-400 font-medium">
                                {row.label}
                              </td>
                              <td className="px-6 py-4 text-sm text-zinc-100 font-semibold">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Brochures & Manuals */}
          {product.downloadItems && product.downloadItems.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-[#00355D] mb-6 tracking-[-0.03em] border-b border-gray-100 pb-4">
                Brochures & Manuals
              </h2>
              <div className="flex flex-wrap gap-4">
                {product.downloadItems.map((doc: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-6 border border-gray-200 rounded-2xl p-4 bg-gray-50 hover:bg-[#EEF4FB] hover:border-[#12B5CB]/30 transition-all cursor-pointer w-full md:w-auto md:min-w-[280px] group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-[#EEF4FB] text-[#12B5CB] group-hover:bg-white group-hover:shadow-sm transition-all">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#111111] text-sm tracking-[-0.01em]">{doc.title}</div>
                        <div className="text-[10px] text-[#575B5F] uppercase tracking-[0.08em] mt-0.5">{doc.type}</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-[#12B5CB] group-hover:translate-y-0.5 transition-transform flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state if no specs or downloads */}
          {(!product.specGroups || product.specGroups.length === 0) && (!product.downloadItems || product.downloadItems.length === 0) && (
            <div className="py-16 text-center text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No specifications available yet.</p>
              <p className="text-sm mt-1">Contact us for detailed product information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
