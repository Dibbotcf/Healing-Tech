"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getMediaUrl } from "@/lib/getMediaUrl";

interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  listingSummary?: string;
  shortSummary?: string;
  markAsNew?: boolean;
  price?: number | null;
  discountPrice?: number | null;
  heroImage?: { url: string; mimeType?: string } | null;
  category?: { title: string } | string;
  brand?: { name: string } | string;
}

function RelatedProductCard({ product }: { product: RelatedProduct }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const heroUrl = getMediaUrl(
    typeof product.heroImage !== "string" ? product.heroImage?.url : undefined
  );

  useEffect(() => {
    setImgFailed(false);
    setImgLoaded(false);
    // Cached images won't re-fire onLoad — check manually
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, [heroUrl]);

  const catTitle =
    product.category && typeof product.category !== "string"
      ? product.category.title
      : "";
  const brandName =
    product.brand && typeof product.brand !== "string"
      ? product.brand.name
      : "";
  const summary = product.listingSummary || product.shortSummary || "";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative bg-white rounded-2xl border border-gray-100 hover:border-[#12B5CB]/30 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {product.markAsNew && (
        <div className="absolute top-3 right-3 z-10 bg-[#12B5CB] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 uppercase tracking-widest shadow-sm">
          <Sparkles className="w-2.5 h-2.5" /> New
        </div>
      )}

      <div className="relative h-44 bg-[#F8F9FA] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#00355D]/5 to-[#12B5CB]/10">
          <span className="text-[#00355D]/20 text-5xl font-bold">
            {product.name.charAt(0)}
          </span>
        </div>
        {heroUrl && !imgFailed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={heroUrl}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
            style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.3s" }}
            className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {catTitle && (
          <p className="text-[10px] font-bold text-[#12B5CB] uppercase tracking-[0.1em] mb-1.5">
            {catTitle}
          </p>
        )}
        <h3 className="font-bold text-[#00355D] text-sm leading-snug tracking-[-0.02em] mb-2 group-hover:text-[#12B5CB] transition-colors line-clamp-2">
          {product.name}
        </h3>
        {summary && (
          <p className="text-xs text-[#575B5F] leading-relaxed line-clamp-2 flex-1 mb-3">
            {summary}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          {brandName && (
            <span className="text-[10px] text-[#575B5F] font-bold uppercase tracking-wider">
              {brandName}
            </span>
          )}
          <span className="text-[#12B5CB] text-xs font-bold inline-flex items-center gap-1 ml-auto group-hover:gap-1.5 transition-all">
            Details <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function RelatedProducts({ products }: { products: RelatedProduct[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 lg:px-8 max-w-[1440px] mb-24">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] font-black text-[#12B5CB] uppercase tracking-[0.15em] mb-2">
            You May Also Like
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#00355D] tracking-[-0.04em]">
            Related Products
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden md:flex items-center gap-2 text-sm font-bold text-[#00355D] hover:text-[#12B5CB] transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.slice(0, 4).map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
