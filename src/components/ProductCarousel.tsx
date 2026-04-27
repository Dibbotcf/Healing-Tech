"use client";
import React, { useEffect, useState } from "react";
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

export function ProductCarousel() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // 0-indexed page

  useEffect(() => {
    // Fetch enough products to paginate (up to 60)
    fetch("/api/products?limit=60&sort=-createdAt&depth=1")
      .then((r) => r.json())
      .then((data) => {
        setAllProducts(data.docs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="w-full h-[400px] bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!allProducts.length) return null;

  // Separate NEW products for the spotlight row
  const newProducts = allProducts.filter((p) => p.markAsNew).slice(0, 4);
  const hasNewRow = newProducts.length > 0;

  // Paginated regular products
  const totalPages = Math.ceil(allProducts.length / PAGE_SIZE);
  const pageProducts = allProducts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const goNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setPage((p) => Math.max(p - 1, 0));

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
            <h2 className="font-['Inter'] text-[2.5rem] font-bold text-[#00355D] tracking-tighter">Latest Products</h2>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#00355D] hover:text-[#12B5CB] transition-colors"
            >
              EXPLORE ALL PRODUCTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* ── NEW PRODUCTS SPOTLIGHT ROW ── */}
        {hasNewRow && (
          <div className="mb-10">
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="bg-[#12B5CB] text-white text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest shadow-lg shadow-[#12B5CB]/30"
              >
                <Sparkles className="w-3.5 h-3.5" /> Just Arrived
              </motion.div>
              <div className="h-px flex-1 bg-gradient-to-r from-[#12B5CB]/40 to-transparent" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {newProducts.map((product, i) => {
                const catTitle = product.category && typeof product.category !== "string" ? product.category.title : "";
                const brandName = product.brand && typeof product.brand !== "string" ? product.brand.name : "";
                const heroUrl = getMediaUrl(product.heroImage?.url);

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.1 }}
                    className="group relative"
                  >
                    {/* Animated glow border */}
                    <motion.div
                      className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#12B5CB] via-[#009EE2] to-[#12B5CB] opacity-60 blur-sm"
                      animate={{ opacity: [0.4, 0.75, 0.4] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: i * 0.3 }}
                    />
                    <Link href={`/products/${product.slug}`} className="block h-full relative z-10">
                      <div className="bg-white rounded-xl border border-[#12B5CB]/20 hover:shadow-2xl hover:shadow-[#12B5CB]/20 transition-all duration-300 overflow-hidden h-full flex flex-col">
                        <div className="relative h-[140px] md:h-[200px] bg-[#F0FAFD] overflow-hidden pointer-events-none">
                          {heroUrl ? (
                            product.heroImage?.mimeType?.startsWith("video/") ? (
                              <video src={heroUrl} autoPlay loop muted playsInline className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                              <img src={heroUrl} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                            )
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00355D]/5 to-[#12B5CB]/10">
                              <span className="text-[#00355D]/20 text-6xl font-bold">{product.name.charAt(0)}</span>
                            </div>
                          )}
                          {/* Floating NEW badge */}
                          <motion.div
                            className="absolute top-3 left-3 bg-[#12B5CB] text-white text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 uppercase tracking-wider shadow-lg"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: i * 0.2 }}
                          >
                            <Sparkles className="w-3 h-3" /> New
                          </motion.div>
                        </div>
                        <div className="p-3 md:p-6 flex flex-col flex-1 pointer-events-none">
                          {catTitle && <p className="text-[10px] font-bold text-[#12B5CB] uppercase tracking-[0.1em] mb-2">{catTitle}</p>}
                          <h3 className="font-bold text-[#00355D] text-base md:text-xl tracking-tight mb-2 md:mb-3 group-hover:text-[#12B5CB] transition-colors leading-snug">{product.name}</h3>
                          <p className="text-sm text-[#575B5F] leading-relaxed line-clamp-2 mb-4 flex-1">{product.listingSummary}</p>
                          <div className="mt-auto flex flex-col gap-3">
                            {(product.price != null || product.discountPrice != null) && (
                              <div className="flex items-center gap-2">
                                {product.discountPrice != null ? (
                                  <>
                                    <span className="text-lg font-extrabold text-[#12B5CB]">৳{product.discountPrice.toLocaleString()}</span>
                                    <span className="text-sm text-gray-400 line-through">৳{product.price?.toLocaleString()}</span>
                                  </>
                                ) : (
                                  <span className="text-lg font-extrabold text-[#12B5CB]">৳{product.price?.toLocaleString()}</span>
                                )}
                              </div>
                            )}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                              {brandName && <span className="text-xs text-[#575B5F] font-bold uppercase tracking-wider">{brandName}</span>}
                              <span className="text-[#12B5CB] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                View Details <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── PAGINATED PRODUCT GRID ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
          >
            {pageProducts.map((product, i) => {
              const catTitle = product.category && typeof product.category !== "string" ? product.category.title : "";
              const brandName = product.brand && typeof product.brand !== "string" ? product.brand.name : "";
              const heroUrl = getMediaUrl(product.heroImage?.url);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="group"
                >
                  <Link href={`/products/${product.slug}`} className="block h-full relative">
                    <div className="bg-white rounded-xl border border-gray-100 hover:border-[#12B5CB]/30 hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                      <div className="relative h-[200px] bg-[#F8F9FA] overflow-hidden pointer-events-none">
                        {heroUrl ? (
                          product.heroImage?.mimeType?.startsWith("video/") ? (
                            <video src={heroUrl} autoPlay loop muted playsInline className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <img src={heroUrl} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00355D]/5 to-[#12B5CB]/10">
                            <span className="text-[#00355D]/20 text-6xl font-bold">{product.name.charAt(0)}</span>
                          </div>
                        )}
                        {product.markAsNew && (
                          <div className="absolute top-3 left-3 bg-[#12B5CB] text-white text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 uppercase tracking-wider shadow-sm">
                            <Sparkles className="w-3 h-3" /> New
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1 pointer-events-none">
                        {catTitle && <p className="text-[10px] font-bold text-[#12B5CB] uppercase tracking-[0.1em] mb-2">{catTitle}</p>}
                        <h3 className="font-bold text-[#00355D] text-xl tracking-tight mb-3 group-hover:text-[#12B5CB] transition-colors leading-snug">{product.name}</h3>
                        <p className="text-sm text-[#575B5F] leading-relaxed line-clamp-2 mb-4 flex-1">{product.listingSummary}</p>
                        <div className="mt-auto flex flex-col gap-3">
                          {(product.price != null || product.discountPrice != null) && (
                            <div className="flex items-center gap-2">
                              {product.discountPrice != null ? (
                                <>
                                  <span className="text-lg font-extrabold text-[#12B5CB]">৳{product.discountPrice.toLocaleString()}</span>
                                  <span className="text-sm text-gray-400 line-through">৳{product.price?.toLocaleString()}</span>
                                </>
                              ) : (
                                <span className="text-lg font-extrabold text-[#12B5CB]">৳{product.price?.toLocaleString()}</span>
                              )}
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            {brandName && <span className="text-xs text-[#575B5F] font-bold uppercase tracking-wider">{brandName}</span>}
                            <span className="text-[#12B5CB] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                              View Details <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── PAGINATION CONTROLS ── */}
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

            {/* Page dots */}
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
