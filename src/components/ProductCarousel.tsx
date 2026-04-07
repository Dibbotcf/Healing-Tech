"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  listingSummary: string;
  markAsNew?: boolean;
  heroImage?: { url: string } | null;
  category?: { title: string; slug: string } | string;
  brand?: { name: string } | string;
}

export function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products?limit=10&sort=-createdAt")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.docs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 380;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[320px] h-[400px] bg-gray-100 rounded-[2px] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.1em] mb-2">From Our Catalog</p>
            <h2 className="font-['Inter'] text-[2.5rem] font-bold text-[#00355D] tracking-tighter">Featured Equipment</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-[2px] border border-gray-200 flex items-center justify-center text-[#575B5F] hover:bg-[#00355D] hover:text-white hover:border-[#00355D] transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-[2px] border border-gray-200 flex items-center justify-center text-[#575B5F] hover:bg-[#00355D] hover:text-white hover:border-[#00355D] transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {products.map((product, i) => {
            const catTitle = product.category && typeof product.category !== "string" ? product.category.title : "";
            const brandName = product.brand && typeof product.brand !== "string" ? product.brand.name : "";
            const heroUrl = product.heroImage?.url;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="min-w-[320px] max-w-[320px] flex-shrink-0 group"
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="bg-white rounded-[2px] border border-gray-100  hover: transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="relative h-[200px] bg-[#F8F9FA] overflow-hidden">
                      {heroUrl ? (
                        <img src={heroUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00355D]/5 to-[#12B5CB]/10">
                          <span className="text-[#00355D]/20 text-6xl font-bold">{product.name.charAt(0)}</span>
                        </div>
                      )}
                      {product.markAsNew && (
                        <div className="absolute top-3 left-3 bg-[#12B5CB] text-white text-[10px] font-bold px-2.5 py-1 rounded-[2px] flex items-center gap-1 uppercase tracking-wider">
                          <Sparkles className="w-3 h-3" /> New
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      {catTitle && <p className="text-[10px] font-bold text-[#12B5CB] uppercase tracking-[0.1em] mb-1">{catTitle}</p>}
                      <h3 className="font-bold text-[#00355D] text-lg tracking-tight mb-2 group-hover:text-[#12B5CB] transition-colors leading-snug">{product.name}</h3>
                      <p className="text-sm text-[#575B5F] leading-relaxed line-clamp-2 mb-3 flex-1">{product.listingSummary}</p>
                      <div className="flex items-center justify-between mt-auto">
                        {brandName && <span className="text-xs text-[#575B5F] font-medium">{brandName}</span>}
                        <span className="text-[#12B5CB] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          View <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
