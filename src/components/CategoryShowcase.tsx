"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  image?: string | null;
  productImages?: string[];
  productCount?: number;
}

export function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 8;

  useEffect(() => {
    fetch("/api/public-categories")
      .then((r) => r.json())
      .then((data) => {
        setCategories(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-[#F8FAFC] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[380px] bg-gray-100 rounded-2xl animate-pulse w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  const visibleCategories = categories.slice(startIndex, startIndex + visibleCount);

  const slideNext = () => {
    if (startIndex + visibleCount < categories.length) {
      setStartIndex((prev) => prev + visibleCount);
    }
  };

  const slidePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - visibleCount);
    }
  };

  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < categories.length;

  return (
    <section className="py-20 bg-[#F8FAFC] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-12 max-w-[1500px]">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <span className="text-[#12B5CB] font-bold tracking-widest text-xs lg:text-sm uppercase mb-2 block">
              Browse by Department
            </span>
            <h2 className="font-['Inter'] text-3xl lg:text-[2.5rem] font-bold text-[#00355D] tracking-tighter">
              Our Medical Categories
            </h2>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={slidePrev}
              disabled={!canPrev}
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                canPrev
                  ? "border-[#00355D] text-[#00355D] hover:bg-[#00355D] hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={slideNext}
              disabled={!canNext}
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                canNext
                  ? "border-[#00355D] text-[#00355D] hover:bg-[#00355D] hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((category, index) => {
              const imageUrl = category.image ? getMediaUrl(category.image) : null;

              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, y: 48, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.18 } }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.025,
                    transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] },
                  }}
                  className="group cursor-pointer"
                >
                  <Link href={`/products?category=${category.slug}`} className="block h-full">
                    <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-[0_2px_16px_rgba(0,53,93,0.07)] hover:shadow-[0_16px_48px_rgba(0,53,93,0.16)] transition-shadow duration-350 border border-transparent hover:border-[#12B5CB]/20">

                      {/* ── Image Zone (dominant) ── */}
                      <div className="relative h-[190px] sm:h-[230px] lg:h-[280px] bg-gradient-to-br from-[#EEF4FB] to-[#F1F5F9] overflow-hidden flex-shrink-0">
                        {/* Dark gradient reveal on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00355D]/40 via-[#00355D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 pointer-events-none" />

                        {/* Product count pill — always visible */}
                        <div className="absolute top-3 left-3 z-20">
                          <span className="text-[10px] font-bold text-[#12B5CB] uppercase tracking-[0.08em] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#12B5CB]/20 shadow-sm">
                            {category.productCount || 0} Products
                          </span>
                        </div>

                        {/* Arrow badge (slides in on hover) */}
                        <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <div className="w-9 h-9 rounded-full bg-[#12B5CB] flex items-center justify-center shadow-lg">
                            <ArrowRight className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        <CategoryImageSlider
                          productImages={category.productImages}
                          fallbackImage={imageUrl}
                          categoryTitle={category.title}
                        />
                      </div>

                      {/* ── Info Area (compact — no description) ── */}
                      <div className="px-5 py-4 flex items-center justify-between gap-3">
                        {/* Category Name */}
                        <h3 className="font-['Inter'] font-bold text-[#00355D] text-base sm:text-lg lg:text-xl tracking-tight leading-snug group-hover:text-[#12B5CB] transition-colors duration-300 flex-1">
                          {category.title}
                        </h3>

                        {/* Animated arrow hint */}
                        <ArrowRight className="w-5 h-5 text-[#12B5CB] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
                      </div>

                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

// ── Animated Image Slider ────────────────────────────────────────────────────
function CategoryImageSlider({
  productImages,
  fallbackImage,
  categoryTitle,
}: {
  productImages?: string[];
  fallbackImage: string | null;
  categoryTitle: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!productImages || productImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [productImages]);

  if (productImages && productImages.length > 0) {
    return (
      <div className="w-full h-full relative group-hover:scale-[1.07] transition-transform duration-500 ease-out">
        {productImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${categoryTitle} product ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-contain p-6 transition-opacity duration-1000 ease-in-out ${
              i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>
    );
  }

  if (fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt={categoryTitle}
        className="w-full h-full object-contain p-6 group-hover:scale-[1.07] transition-transform duration-500 ease-out"
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center group-hover:scale-[1.07] transition-transform duration-500 ease-out">
      <span className="text-[#00355D]/12 text-8xl font-black select-none tracking-tighter">
        {categoryTitle.charAt(0)}
      </span>
    </div>
  );
}
