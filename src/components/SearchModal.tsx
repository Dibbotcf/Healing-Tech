"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, ArrowRight, Package } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: { id: string; name: string; slug: string; category: string; image?: string }[];
}

const STATIC_PAGES = [
  { title: "Home", href: "/", description: "Healing Technology Homepage" },
  { title: "About Us", href: "/about", description: "Learn about our mission and engineering trust in healthcare." },
  { title: "What We Do", href: "/what-we-do", description: "Comprehensive healthcare solutions and import network." },
  { title: "Contact Us", href: "/contact", description: "Get in touch with our technical and sales team." },
  { title: "Product Catalog", href: "/products", description: "Browse all our medical equipment categories." },
];

export function SearchModal({ isOpen, onClose, products }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavigate = (url: string) => {
    onClose();
    router.push(url);
  };

  const searchTerm = query.toLowerCase().trim();

  // Filter logic
  const matchedPages = searchTerm
    ? STATIC_PAGES.filter(p => p.title.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm))
    : [];

  const matchedProducts = searchTerm
    ? products.filter(p => p.name.toLowerCase().includes(searchTerm) || (p.category && p.category.toLowerCase().includes(searchTerm)))
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Area */}
            <div className="flex items-center px-6 py-5 border-b border-gray-100 shrink-0 relative">
              <Search className="w-6 h-6 text-[#12B5CB] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, pages, or categories..."
                className="flex-1 bg-transparent border-none outline-none px-4 text-xl font-medium text-[#00355D] placeholder:text-gray-300"
              />
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results Area */}
            <div className="overflow-y-auto flex-1 p-2 bg-[#F8F9FA]">
              {!searchTerm ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                    <Search className="w-6 h-6 text-gray-300" />
                  </div>
                  <p className="text-[#575B5F] font-medium text-lg">What are you looking for?</p>
                  <p className="text-gray-400 text-sm mt-1">Start typing to search across the whole site.</p>
                </div>
              ) : matchedPages.length === 0 && matchedProducts.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-[#00355D] font-bold text-lg">No results found</p>
                  <p className="text-gray-400 text-sm mt-1">We couldn&apos;t find anything matching &quot;{query}&quot;</p>
                </div>
              ) : (
                <div className="p-4 space-y-6">
                  {/* Pages Category */}
                  {matchedPages.length > 0 && (
                    <div>
                      <p className="text-[11px] font-black tracking-widest text-[#575B5F] uppercase mb-3 ml-2">Pages</p>
                      <div className="space-y-1">
                        {matchedPages.slice(0, 4).map((page, i) => (
                          <button
                            key={i}
                            onClick={() => handleNavigate(page.href)}
                            className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all text-left group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#00355D]/5 flex items-center justify-center group-hover:bg-[#12B5CB]/10 transition-colors shrink-0">
                              <FileText className="w-5 h-5 text-[#00355D] group-hover:text-[#12B5CB]" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-[#00355D] leading-none mb-1">{page.title}</h4>
                              <p className="text-xs text-[#575B5F] truncate">{page.description}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#12B5CB] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Products Category */}
                  {matchedProducts.length > 0 && (
                     <div>
                     <p className="text-[11px] font-black tracking-widest text-[#575B5F] uppercase mb-3 ml-2">Products</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                       {matchedProducts.slice(0, 10).map((prod) => (
                         <button
                           key={prod.id}
                           onClick={() => handleNavigate(`/products/${prod.slug}`)}
                           className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all text-left group bg-white/50"
                         >
                           {prod.image ? (
                             <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100 p-1 relative">
                               <Image src={prod.image} alt={prod.name} fill className="object-contain" />
                             </div>
                           ) : (
                             <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                               <Package className="w-5 h-5 text-gray-400" />
                             </div>
                           )}
                           <div className="flex-1 overflow-hidden shrink min-w-0 pr-4">
                             <h4 className="text-sm font-bold text-[#00355D] leading-snug group-hover:text-[#12B5CB] transition-colors truncate">{prod.name}</h4>
                             <p className="text-[11px] text-[#575B5F] font-semibold mt-0.5 truncate uppercase tracking-wider">{prod.category || 'Product'}</p>
                           </div>
                         </button>
                       ))}
                     </div>
                   </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-6 py-3 bg-white border-t border-gray-100 shrink-0 text-center flex justify-center items-center gap-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Site Search</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
