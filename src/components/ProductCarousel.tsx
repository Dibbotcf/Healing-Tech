"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { getMediaUrl } from "@/lib/getMediaUrl";

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

const PAGE_SIZE = 12; // 3 rows × 4 columns

/** Single product card */
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

  return (
    <Link href={`/products/${product.slug}`} className="block h-full group">
      <div className="bg-white rounded-xl border border-gray-100 hover:border-[#12B5CB]/30 hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden pointer-events-none h-[140px] md:h-[200px] bg-[#F8F9FA]">
          {heroUrl ? (
            product.heroImage?.mimeType?.startsWith("video/") ? (
              <video
                src={heroUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <img
                src={heroUrl}
                alt={product.name}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00355D]/5 to-[#12B5CB]/10">
              <span className="text-[#00355D]/20 text-6xl font-bold">
                {product.name.charAt(0)}
              </span>
            </div>
          )}
          {product.markAsNew && (
            <div className="absolute top-3 left-3 bg-[#12B5CB] text-white text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3 h-3" /> New
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3 md:p-6 flex flex-col flex-1 pointer-events-none">
          {catTitle && (
            <p className="text-[10px] font-bold text-[#12B5CB] uppercase tracking-[0.1em] mb-2">
              {catTitle}
            </p>
          )}
          <h3 className="font-bold text-[#00355D] text-base md:text-xl tracking-tight mb-2 md:mb-3 group-hover:text-[#12B5CB] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-sm text-[#575B5F] leading-relaxed line-clamp-2 mb-4 flex-1">
            {product.listingSummary}
          </p>
          <div className="mt-auto flex flex-col gap-3">
            {(product.price != null || product.discountPrice != null) && (
              <div className="flex items-center gap-2">
                {product.discountPrice != null ? (
                  <>
                    <span className="text-lg font-extrabold text-[#12B5CB]">
                      ৳{product.discountPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ৳{product.price?.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-extrabold text-[#12B5CB]">
                    ৳{product.price?.toLocaleString()}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              {brandName && (
                <span className="text-xs text-[#575B5F] font-bold uppercase tracking-wider">
                  {brandName}
                </span>
              )}
              <span className="text-[#12B5CB] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProductCarousel() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  // rowOrder[0] = which data-row index sits in visual slot 0, etc.
  const [rowOrder, setRowOrder] = useState([0, 1, 2]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/products?limit=60&sort=-createdAt&depth=1")
      .then((r) => r.json())
      .then((data) => {
        setAllProducts(data.docs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Rotate row positions every 4 seconds (slow & calm)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRowOrder((prev) => {
        const next = [...prev];
        next.push(next.shift()!); // [0,1,2] → [1,2,0] → [2,0,1] → [0,1,2]
        return next;
      });
    }, 8000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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

  const totalPages = Math.ceil(allProducts.length / PAGE_SIZE);
  const pageProducts = allProducts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const goNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setPage((p) => Math.max(p - 1, 0));

  // Split page products into fixed rows of 4
  const dataRows: Product[][] = [];
  for (let r = 0; r < pageProducts.length; r += 4) {
    dataRows.push(pageProducts.slice(r, r + 4));
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

        {/* ── ROTATING ROWS ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-3 md:space-y-6"
          >
            {/*
              rowOrder tells us which data-row to display in each visual slot.
              layoutId ensures Framer Motion animates the row to its new physical position.
            */}
            {rowOrder.map((dataIdx) => {
              const row = dataRows[dataIdx];
              if (!row || row.length === 0) return null;
              return (
                <motion.div
                  key={`row-data-${dataIdx}`}
                  layoutId={`row-data-${dataIdx}`}
                  layout
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 25,
                      damping: 20,
                      duration: 2.5,
                    },
                  }}
                  className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
                >
                  {row.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
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
