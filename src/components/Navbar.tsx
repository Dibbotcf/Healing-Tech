"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X, Plus, ChevronRight, ArrowRight, Sparkles, Menu, ArrowUpRight, ShoppingBag, Search } from "lucide-react";
import { CartSidebar } from "./CartSidebar";
import { SearchModal } from "./SearchModal";
import { useCartStore } from "@/lib/cartStore";

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
  const [cartOpen, setCartOpen]             = useState(false);
  const [searchOpen, setSearchOpen]         = useState(false);
  const [mounted, setMounted]               = useState(false);
  
  const getTotalItems = useCartStore((state) => state.getTotalItems);

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
    setMounted(true);
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
      <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 pt-4 pointer-events-none">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">

          {/* ── LEFT PILL: Logo + Nav ── */}
          <div
            className={`hidden lg:flex items-center gap-0 bg-white rounded-full transition-shadow duration-300 pointer-events-auto overflow-hidden`}
            style={{ height: "68px" }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center pl-5 pr-4 flex-shrink-0 border-r border-gray-100" style={{ height: "68px" }}>
              <Image
                src="/logo-dark.svg"
                alt="Healing Technology"
                width={228}
                height={60}
                unoptimized
                priority
                className="object-contain"
                style={{ height: "60px", width: "228px" }}
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
              { label: "What We Do",  href: "/what-we-do" },
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
          <Link href="/" className="flex items-center lg:hidden bg-white rounded-full px-5 py-2 pointer-events-auto" style={{ height: "68px" }}>
            <Image
              src="/logo-dark.svg"
              alt="Healing Technology"
              width={218}
              height={57}
              unoptimized
              priority
              className="object-contain"
              style={{ height: "57px", width: "218px" }}
            />
          </Link>

          <div className="hidden lg:flex flex-1 justify-end">
            <button
               onClick={() => setSearchOpen(true)}
               className="flex items-center justify-center bg-white rounded-full pointer-events-auto hover:bg-gray-50 transition-colors group"
               style={{ width: "68px", height: "68px" }}
               aria-label="Search site"
            >
               <Search className="w-5 h-5 text-[#00355D] group-hover:text-[#12B5CB] group-hover:scale-110 transition-all duration-300" />
            </button>
          </div>

          {/* ── RIGHT PILL: Contact ── */}
          <div className="hidden lg:flex items-center bg-white rounded-full overflow-hidden pointer-events-auto" style={{ height: "68px" }}>
            <button
               onClick={() => setCartOpen(true)}
               className="pl-6 pr-2 text-sm font-semibold tracking-tight text-[#111] hover:text-[#00355D] transition-colors h-full flex items-center gap-2 group"
            >
               <div className="relative">
                 <ShoppingBag className="w-5 h-5 text-[#00355D] group-hover:text-[#12B5CB] transition-colors" />
                 {mounted && getTotalItems() > 0 && (
                   <span className="absolute -top-1.5 -right-2 bg-[#12B5CB] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                     {getTotalItems()}
                   </span>
                 )}
               </div>
               <span className="hidden xl:block">Cart</span>
            </button>
            <div className="w-px h-6 bg-gray-100 mx-2"></div>
            <Link
              href="/contact"
              className="pl-2 pr-4 text-sm font-semibold tracking-tight text-[#111] hover:text-[#00355D] transition-colors h-full flex items-center"
            >
              Contact Us
            </Link>
            {/* The dark circle "+"-button */}
            <div className="pr-2 flex items-center h-full">
              <Link
                href="/contact"
                className="w-14 h-14 rounded-full bg-[#00355D] flex items-center justify-center hover:bg-[#12B5CB] transition-colors group"
                aria-label="Contact Us"
              >
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* ── MOBILE hamburger ── */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#00355D] hover:bg-gray-50 transition-colors pointer-events-auto"
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
          className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            megaOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMegaOpen(false)}
        />

        {/* Panel Wrapper for floating look */}
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] pt-4 pb-8 h-full relative pointer-events-none">
          <div
            className={`relative bg-white flex flex-col rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-full max-h-[600px] ${
              megaOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-6 pointer-events-none"
            }`}
          >
            {/* Close bar */}
            <div className="flex items-center justify-between px-10 py-4 border-b border-gray-100 bg-[#F8F9FA] flex-shrink-0">
              <p className="text-xs font-bold text-[#575B5F] uppercase tracking-widest">Product Catalog</p>
              
              <div className="flex items-center gap-8">
                <button
                  onClick={() => {
                    setMegaOpen(false);
                    router.push("/products");
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-[#12B5CB] hover:text-[#009EE2] transition-colors"
                >
                  Full Catalog <ArrowRight className="w-4 h-4" />
                </button>
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
                            <div className="absolute top-3 right-3 z-10 bg-[#12B5CB] text-white text-[10px] font-bold px-2 py-0.5 rounded-xl flex items-center gap-1 uppercase tracking-wider shadow-sm">
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
        <div className="h-full bg-white overflow-y-auto px-6 py-8 flex flex-col pt-24">
          <p className="text-[10px] font-black text-[#575B5F] uppercase tracking-[0.15em] mb-4 ml-1">Menu</p>
          <div className="space-y-2 mb-8">
            <Link
              href="/products"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-between py-4 px-5 rounded-2xl text-[#111111] hover:bg-gray-50 border border-gray-100 transition-all text-sm font-bold shadow-sm"
            >
              Product Catalog <ChevronRight className="w-4 h-4 text-[#12B5CB]" />
            </Link>
            
            {[
              { label: "About Us", href: "/about" },
              { label: "What We Do", href: "/what-we-do" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-4 px-5 rounded-2xl text-[#111111] hover:bg-gray-50 border border-transparent transition-all text-sm font-bold"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto">
            <div className="bg-[#f8f9fa] rounded-2xl p-5 mb-6">
                <p className="text-xs text-[#575B5F] mb-3 leading-relaxed">Need technical support or have an inquiry?</p>
                <a href="mailto:info@healingtech.com.bd" className="text-sm font-bold text-[#00355D] block">info@healingtech.com.bd</a>
                <a href="tel:+8801675292991" className="text-sm font-bold text-[#00355D] block mt-1">+88 01675 292991</a>
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full bg-[#00355D] hover:bg-[#12B5CB] text-white text-center font-bold py-4 rounded-full text-sm tracking-[-0.02em] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      
      {/* ═══════════════════════════════════════
          CART SIDEBAR
      ═══════════════════════════════════════ */}
      <CartSidebar isOpen={cartOpen} setIsOpen={setCartOpen} />

      {/* ═══════════════════════════════════════
          SEARCH MODAL
      ═══════════════════════════════════════ */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} products={products} />
    </div>
  );
}
