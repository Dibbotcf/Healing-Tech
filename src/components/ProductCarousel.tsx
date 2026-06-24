"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { useCartStore } from "@/lib/cartStore";

interface Product {
  id: string;
  name: string;
  slug: string;
  listingSummary: string;
  markAsNew?: boolean;
  price?: number | null;
  discountPrice?: number | null;
  heroImage?: { url: string; mimeType?: string } | null;
  category?: { title: string; slug: string } | string;
  brand?: { name: string } | string;
}

const PAGE_SIZE = 12; // 3 rows × 4 columns per page

/** Single product card — matches the products page card style */
function ProductCard({ product }: { product: Product }) {
  const catTitle =
    product.category && typeof product.category !== "string"
      ? product.category.title
      : "";
  const brandName =
    product.brand && typeof product.brand !== "string"
      ? product.brand.name
      : "";
  const heroUrl = getMediaUrl(product.heroImage?.url);
  const [imgFailed, setImgFailed] = React.useState(false);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const { addItem, removeItem, items } = useCartStore();
  const isAlreadyInCart = items.some((item) => String(item.product.id) === String(product.id));

  React.useEffect(() => {
    setImgFailed(false);
    setImgLoaded(false);
    // Cached images won't re-fire onLoad — check manually
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, [heroUrl]);

  const cartProduct = {
    id: product.id,
    name: product.name,
    price: product.price ?? null,
    discountPrice: product.discountPrice ?? null,
    heroImage: product.heroImage
      ? { ...product.heroImage, url: getMediaUrl(product.heroImage.url) }
      : undefined,
    slug: product.slug,
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(cartProduct, 1);
  };

  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(cartProduct, 1);
    window.location.href = "/checkout";
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col relative group">
      {product.markAsNew && (
        <div className="absolute top-4 right-4 z-10 bg-[#12B5CB] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3 h-3" /> NEW
        </div>
      )}

      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative h-36 md:h-48 bg-[#F8F9FA] overflow-hidden group-hover:bg-[#EEF4FB] transition-colors cursor-pointer"
      >
        {/* Fallback always mounted behind the image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-gray-200 text-7xl select-none">
            {product.name.substring(0, 2)}
          </span>
        </div>

        {heroUrl && !imgFailed && (
          product.heroImage?.mimeType?.startsWith("video/") ? (
            <video
              src={heroUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
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
          )
        )}
      </Link>

      {/* Info */}
      <div className="p-3 md:p-5 flex-1 flex flex-col cursor-default">
        {/* Category • Brand */}
        <div className="text-[10px] font-bold text-[#12B5CB] mb-2 uppercase tracking-widest">
          {catTitle || "Product"}
          {brandName && <span className="text-[#575B5F] px-1.5">•</span>}
          {brandName && <span className="text-[#575B5F]">{brandName}</span>}
        </div>

        <Link href={`/products/${product.slug}`} className="cursor-pointer">
          <h3 className="font-['Inter'] text-sm md:text-lg font-bold text-[#111111] mb-1 md:mb-2 leading-tight tracking-[-0.03em] hover:text-[#12B5CB] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-[#575B5F] text-xs md:text-sm mb-3 md:mb-4 font-light line-clamp-3 leading-relaxed flex-1">
          {product.listingSummary ||
            "Premium medical equipment by Healing Technology."}
        </p>

        <div className="pt-2 md:pt-3 border-t border-gray-100 flex flex-col gap-1.5 md:gap-2">
          {/* Price */}
          {(product.price != null || product.discountPrice != null) && (
            <div className="flex items-end gap-2 mb-0.5">
              {product.discountPrice != null ? (
                <>
                  <span className="text-base md:text-xl font-extrabold text-[#12B5CB] tracking-tight leading-none">
                    ৳{product.discountPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#575B5F]/50 line-through pb-0.5">
                    ৳{product.price?.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-base md:text-xl font-extrabold text-[#12B5CB] tracking-tight leading-none">
                  ৳{product.price?.toLocaleString()}
                </span>
              )}
            </div>
          )}

          {/* Cart + Order buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-1.5 md:gap-2 mt-0.5">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); isAlreadyInCart ? removeItem(String(product.id)) : addToCart(e); }}
              className={`w-full text-center py-2 rounded-xl text-xs font-bold transition-colors shadow-sm flex justify-center items-center gap-1 cursor-pointer ${
                isAlreadyInCart
                  ? "bg-green-500/10 hover:bg-red-50 text-green-600 hover:text-red-500"
                  : "bg-[#12B5CB]/10 hover:bg-[#12B5CB]/20 text-[#12B5CB]"
              }`}
            >
              {isAlreadyInCart ? "✓ In Cart" : "🛒 Cart"}
            </button>
            <button
              onClick={handleOrder}
              className="w-full bg-[#00355D] hover:bg-[#002543] text-white text-center py-2 rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer flex justify-center items-center gap-1"
            >
              ⚡ Order Now
            </button>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="hidden sm:block w-full text-center py-2 text-xs font-bold text-[#575B5F] hover:text-[#12B5CB] transition-colors cursor-pointer mt-1"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ProductCarousel() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalDocs, setTotalDocs] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch(`/api/public-products?limit=${PAGE_SIZE}&page=${page + 1}&sort=-mark_as_new,-date_created`)
        .then((r) => r.json())
        .then((data) => {
          if (cancelled) return;
          if (Array.isArray(data.docs) && data.docs.length > 0) {
            setAllProducts(data.docs);
            setTotalDocs(data.totalDocs || 0);
          } else if (Array.isArray(data.docs) && data.docs.length === 0 && (data.totalDocs ?? 0) > 0 && page > 0) {
            // current page is out of bounds after a deletion — go back to page 0
            setPage(0);
          }
          setLoading(false);
        })
        .catch(() => { if (!cancelled) setLoading(false); });
    };
    load();
    const interval = setInterval(load, 30_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [page]);

  if (loading) {
    return (
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="w-full h-[400px] bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!allProducts.length) return null;

  const totalPages = Math.ceil(totalDocs / PAGE_SIZE);
  const pageProducts = allProducts; // already the right page from the API

  const goNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setPage((p) => Math.max(p - 1, 0));

  // Pad products with null placeholders to always fill PAGE_SIZE (3 rows × 4 cols)
  const ghostCount = PAGE_SIZE - pageProducts.length;
  const paddedProducts: (Product | null)[] = [
    ...pageProducts,
    ...Array.from({ length: Math.max(0, ghostCount) }, () => null),
  ];

  // Split into rows of 4
  const dataRows: (Product | null)[][] = [];
  for (let r = 0; r < paddedProducts.length; r += 4) {
    dataRows.push(paddedProducts.slice(r, r + 4));
  }

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="font-['Inter'] text-[2.5rem] font-bold text-[#00355D] tracking-tighter">
              Latest Products
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#00355D] hover:text-[#12B5CB] transition-colors"
            >
              EXPLORE ALL PRODUCTS{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* ── PRODUCT ROWS ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-3 md:space-y-6"
          >
            {dataRows.map((row, rowIdx) => {
              if (!row || row.length === 0) return null;
              return (
                <div
                  key={`row-${page}-${rowIdx}`}
                  className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
                >
                  {row.map((product, colIdx) =>
                    product ? (
                      <ProductCard key={product.id} product={product} />
                    ) : (
                      <div
                        key={`ghost-${rowIdx}-${colIdx}`}
                        aria-hidden="true"
                        className="bg-white rounded-2xl border-2 border-dashed border-gray-100 h-full min-h-[340px] md:min-h-[380px]"
                      />
                    )
                  )}
                </div>
              );
            })}
          </motion.div>

        </AnimatePresence>

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <button
              onClick={goPrev}
              disabled={page === 0}
              id="products-prev-btn"
              className="group flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#00355D] text-[#00355D] font-bold text-sm hover:bg-[#00355D] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  id={`products-page-${i}`}
                  onClick={() => setPage(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === page
                      ? "w-7 h-2.5 bg-[#12B5CB]"
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-[#12B5CB]/50"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={page === totalPages - 1}
              id="products-next-btn"
              className="group flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#00355D] text-[#00355D] font-bold text-sm hover:bg-[#00355D] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
