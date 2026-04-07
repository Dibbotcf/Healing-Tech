"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X, Plus, ChevronRight, ArrowRight, Sparkles, Menu, ArrowUpRight } from "lucide-react";

interface Category { id: string; title: string; slug: string; }
interface Product  { id: string; name: string; slug: string; category: string; markAsNew?: boolean; image?: string; }

export default function Navbar() {
  const [megaOpen, setMegaOpen]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories]         = useState<Category[]>([]);
  const [products, setProducts]             = useState<Product[]>([]);
  const [loading, setLoading]               = useState(true);
  const [scrolled, setScrolled]             = useState(false);

  const pathname = usePathname();
  const router   = useRouter();

  /* ── close on route change ── */
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  /* ── scroll state for subtle shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── load menu data ── */
  useEffect(() => {
    fetch("/api/menus")
      .then((r) => r.json())
      .then(({ categories: cats, products: prods }) => {
        setCategories(cats ?? []);
        setProducts(prods ?? []);
        if (cats?.length) setActiveCategory(cats[0].id);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ── body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = megaOpen || mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [megaOpen, mobileOpen]);

  const handleProductClick = useCallback((slug: string) => {
    setMegaOpen(false);
    router.push(`/products/${slug}`);
  }, [router]);

  const handleCategoryViewAll = useCallback((catSlug: string) => {
    setMegaOpen(false);
    router.push(`/products?category=${catSlug}`);
  }, [router]);

  const activeProds = products.filter((p) => p.category === activeCategory);
  const activeCat   = categories.find((c) => c.id === activeCategory);

  return (
    <div>
      {/* ═══════════════════════════════════════
          FLOATING PILL HEADER
      ═══════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 pt-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">

          {/* ── LEFT PILL: Logo + Nav ── */}
          <div
            className={`hidden lg:flex items-center gap-0 bg-white rounded-full  transition-shadow duration-300 ${
              scrolled ? "" : ""
            } overflow-hidden`}
            style={{ height: "52px" }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center pl-5 pr-4 flex-shrink-0 border-r border-gray-100" style={{ height: "52px" }}>
              <Image
                src="/healing technology logo SVG-04.svg"
                alt="Healing Technology"
                width={175}
                height={46}
                className="object-contain w-auto"
                style={{ height: "38px", width: "auto", filter: "brightness(0) saturate(100%) invert(12%) sepia(84%) saturate(500%) hue-rotate(180deg)" }}
              />
            </Link>

            {/* Products expand trigger */}
            <button
              onClick={() => setMegaOpen((o) => !o)}
              className={`group flex items-center gap-2 px-4 text-sm font-semibold tracking-tight transition-all duration-200 h-full`}
            >
              <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
                megaOpen
                  ? "bg-[#00355D] text-white"
                  : "text-[#111] hover:bg-gray-100"
              }`}>
                Products
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                    megaOpen
                      ? "bg-white border-white rotate-45"
                      : "border-gray-400 group-hover:border-[#00355D]"
                  }`}
                >
                  <Plus className={`w-3 h-3 ${megaOpen ? "text-[#00355D]" : "text-gray-500 group-hover:text-[#00355D]"}`} />
                </span>
              </span>
            </button>

            {/* Static nav links */}
            {[
              { label: "About Us", href: "/about" },
              { label: "Services",  href: "/global-sourcing" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-2 text-sm font-semibold tracking-tight text-[#111] h-full"
              >
                <span className="px-3 py-1.5 rounded-full hover:bg-gray-100 transition-all duration-200">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* ── MOBILE: compact logo ── */}
          <Link href="/" className="flex items-center lg:hidden bg-white rounded-full px-5 py-2" style={{ height: "52px" }}>
            <Image
              src="/healing technology logo SVG-04.svg"
              alt="Healing Technology"
              width={175}
              height={46}
              className="object-contain w-auto"
              style={{ height: "36px", width: "auto", filter: "brightness(0) saturate(100%) invert(12%) sepia(84%) saturate(500%) hue-rotate(180deg)" }}
            />
          </Link>

          {/* ── RIGHT PILL: Contact ── */}
          <div className="hidden lg:flex items-center bg-white rounded-full  overflow-hidden" style={{ height: "52px" }}>
            <Link
              href="/contact"
              className="pl-6 pr-4 text-sm font-semibold tracking-tight text-[#111] hover:text-[#00355D] transition-colors h-full flex items-center"
            >
              Contact Us
            </Link>
            {/* The dark circle "+"-button */}
            <div className="pr-2 flex items-center h-full">
              <Link
                href="/contact"
                className="w-10 h-10 rounded-full bg-[#00355D] flex items-center justify-center hover:bg-[#12B5CB] transition-colors group"
                aria-label="Contact Us"
              >
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* ── MOBILE hamburger ── */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden w-12 h-12 rounded-full bg-white  flex items-center justify-center text-[#00355D] hover:bg-gray-50 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════
          MEGA MENU (full-viewport panel)
      ═══════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          megaOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "80px" }}
      >
        {/* Backdrop — click to close */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setMegaOpen(false)}
        />

        {/* Panel */}
        <div
          className={`relative bg-white flex flex-col  transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            megaOpen ? "translate-y-0" : "-translate-y-6"
          }`}
          style={{ maxHeight: "calc(100vh - 80px)" }}
        >
          {/* Close bar */}
          <div className="flex items-center justify-between px-10 py-4 border-b border-gray-100 bg-[#F8F9FA] flex-shrink-0">
            <p className="text-xs font-bold text-[#575B5F] uppercase tracking-widest">Product Catalog</p>
            <button
              onClick={() => setMegaOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-[#575B5F] hover:text-[#00355D] transition-colors group"
            >
              <span>Close Menu</span>
              <div className="w-6 h-6 rounded-full bg-gray-200 group-hover:bg-[#00355D] flex items-center justify-center transition-colors">
                <X className="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left — Categories */}
            <div className="w-72 xl:w-80 flex-shrink-0 bg-[#F8F9FA] border-r border-gray-100 overflow-y-auto py-8 px-6">
              <p className="text-[10px] font-black text-[#575B5F] uppercase tracking-[0.15em] mb-5 ml-2">Categories</p>
              <div className="space-y-1">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-11 bg-gray-200 animate-pulse rounded-xl" />
                    ))
                  : categories.map((cat, i) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        style={{ animationDelay: `${i * 40}ms` }}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between group transition-all duration-200 ${
                          activeCategory === cat.id
                            ? "bg-[#00355D] text-white "
                            : "text-[#111111] hover:bg-white hover:"
                        }`}
                      >
                        <span className="text-sm font-semibold tracking-[-0.02em]">{cat.title}</span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            activeCategory === cat.id
                              ? "translate-x-1 text-[#12B5CB]"
                              : "opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </button>
                    ))}
              </div>
            </div>

            {/* Right — Products */}
            <div className="flex-1 overflow-y-auto p-8 xl:p-12">
              {loading ? (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-[#00355D] tracking-[-0.04em]">
                        {activeCat?.title ?? "Products"}
                      </h2>
                      <p className="text-sm text-[#575B5F] mt-1">
                        {activeProds.length} product{activeProds.length !== 1 ? "s" : ""} available
                      </p>
                    </div>
                    <button
                      onClick={() => handleCategoryViewAll(activeCat?.slug ?? "")}
                      className="flex items-center gap-2 text-sm font-bold text-[#12B5CB] hover:text-[#009EE2] transition-colors"
                    >
                      View all <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {activeProds.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm font-semibold text-gray-400">No products in this category yet</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                      {activeProds.slice(0, 9).map((prod, i) => (
                        <button
                          key={prod.id}
                          onClick={() => handleProductClick(prod.slug)}
                          style={{ animationDelay: `${i * 40}ms` }}
                          className="group relative bg-white border border-gray-100 rounded-xl p-5 hover:border-[#12B5CB]/40 hover: transition-all duration-200 text-left cursor-pointer"
                        >
                          {prod.markAsNew && (
                            <div className="absolute top-3 right-3 bg-[#12B5CB] text-white text-[10px] font-bold px-2 py-0.5 rounded-xl flex items-center gap-1 uppercase tracking-wider">
                              <Sparkles className="w-3 h-3" /> New
                            </div>
                          )}
                          {prod.image ? (
                            <div className="relative w-full h-20 mb-3 bg-gray-50 rounded-xl overflow-hidden">
                              <Image src={prod.image} alt={prod.name} fill className="object-contain p-2" />
                            </div>
                          ) : (
                            <div className="h-2 w-8 bg-[#12B5CB]/20 rounded-full mb-3 group-hover:bg-[#12B5CB]/50 transition-colors" />
                          )}
                          <p className={`text-sm font-bold text-[#00355D] tracking-[-0.02em] leading-snug group-hover:text-[#12B5CB] transition-colors line-clamp-2 ${prod.markAsNew ? "pr-12" : ""}`}>
                            {prod.name}
                          </p>
                          <p className="mt-2 text-[11px] font-semibold text-[#12B5CB] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            View details <ArrowRight className="w-3 h-3" />
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Footer strip */}
          <div className="flex-shrink-0 border-t border-gray-100 bg-[#F8F9FA] px-10 py-4 flex items-center justify-between">
            <p className="text-xs text-[#575B5F]">Precision clinical solutions for modern healthcare infrastructure</p>
            <button
              onClick={() => { setMegaOpen(false); router.push("/products"); }}
              className="text-xs font-bold text-[#12B5CB] hover:text-[#009EE2] flex items-center gap-1 transition-colors"
            >
              Full Catalog <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MOBILE MENU
      ═══════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "72px" }}
      >
        <div className="h-full bg-[#00355D] overflow-y-auto px-6 py-8">
          <div className="space-y-1 mb-8">
            {/* Products */}
            <button
              onClick={() => { setMobileOpen(false); router.push("/products"); }}
              className="w-full flex items-center justify-between py-3.5 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm font-semibold"
            >
              Products <ChevronRight className="w-4 h-4 text-[#12B5CB]" />
            </button>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3 px-6 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold"
              >
                {cat.title} <ChevronRight className="w-3 h-3 text-[#12B5CB]" />
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 space-y-3">
            {[
              { label: "About Us", href: "/about" },
              { label: "Services", href: "/global-sourcing" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm font-semibold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-4 w-full bg-[#12B5CB] text-white text-center font-bold py-3.5 rounded-xl text-sm tracking-[-0.02em]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
