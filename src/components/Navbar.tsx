"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { getMegaMenuData } from "@/app/actions/getMegaMenu";

interface Category {
  id: string;
  title: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
}

export function Navbar({ initialCategories = [], initialProducts = [] }: { initialCategories?: Category[], initialProducts?: Product[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch payload data via Server Action safely out of HTTP request loop
  useEffect(() => {
    async function fetchPayloadData() {
      try {
        if (categories.length === 0) {
          const { categories: fetchedCats, products: fetchedProds } = await getMegaMenuData();
          if (fetchedCats.length > 0) {
            setCategories(fetchedCats);
            if (!activeCategory) setActiveCategory(fetchedCats[0].id);
          }
          if (fetchedProds.length > 0) {
            setProducts(fetchedProds);
          }
        }
      } catch (err) {
        console.error("Failed to load mega menu", err);
      }
    }
    fetchPayloadData();
  }, [categories.length, activeCategory]);

  const activeCategoryData = categories.find((c: Category) => c.id === activeCategory);
  const activeProducts = products.filter((p: Product) => p.category === activeCategory).slice(0, 8); // Limits to 8

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm py-3 text-[#00355D]"
          : "bg-transparent py-6 text-white"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] flex items-center justify-between">
        <Link href="/" className="flex items-center z-50 hover:opacity-80 transition-opacity">
          <Image 
            src={isScrolled ? "/healing technology logo SVG-03.svg" : "/healing technology logo SVG-04.svg"} 
            alt="Healing Technology" 
            width={180} height={48} 
            className="h-10 md:h-12 w-auto object-contain transition-all duration-300" 
            priority 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-bold hover:text-[#12B5CB] transition-colors">Home</Link>
          <div className="relative group">
            <Link href="/products" className="flex items-center gap-1 text-sm font-bold hover:text-[#12B5CB] transition-colors py-8">
              Products <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            </Link>
            
            {/* Awwwards Full-Viewport Mega Menu */}
            <div className="fixed top-[88px] left-0 w-screen h-[calc(100vh-88px)] bg-black/60 backdrop-blur-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-40 ease-in-out">
              <div className="bg-white text-[#111111] shadow-2xl w-full h-full min-h-[500px] border-t border-gray-100 flex transform translate-y-[-20px] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                
                {/* Categories Left Panel */}
                <div className="w-[30%] bg-gray-50/80 p-8 xl:p-12 border-r border-gray-100 overflow-y-auto custom-scrollbar relative">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-8 font-['Inter']">Select Category</h3>
                  
                  {categories.length === 0 ? (
                    <div className="space-y-4 animate-pulse">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-12 bg-gray-200 rounded-md w-full"></div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {categories.map((cat, i) => (
                        <li key={cat.id} className="transform opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ transitionDelay: `${100 + (i * 30)}ms` }}>
                          <button
                            onMouseEnter={() => setActiveCategory(cat.id)}
                            className={`w-full text-left px-5 py-4 rounded-lg text-base font-bold transition-all duration-300 flex items-center justify-between ${activeCategory === cat.id ? 'bg-white text-[#12B5CB] shadow-sm transform translate-x-2' : 'text-[#00355D] hover:bg-gray-200/50 hover:translate-x-1'}`}
                          >
                            {cat.title}
                            {activeCategory === cat.id && <span className="text-[#12B5CB] text-lg">→</span>}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Products Right Panel */}
                <div className="w-[70%] p-10 xl:p-16 bg-white flex flex-col h-full overflow-y-auto relative">
                  {categories.length === 0 ? (
                    <div className="animate-pulse flex flex-col h-full">
                       <div className="h-8 bg-gray-200 w-1/4 rounded mb-10"></div>
                       <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                         {[1,2,3,4,5,6].map(i => (
                           <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
                         ))}
                       </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-end border-b border-gray-100 pb-6 mb-8">
                        <h4 className="font-['Inter'] font-bold text-[#00355D] text-3xl tracking-tight">
                          {activeCategoryData?.title || 'Products'}
                        </h4>
                        {activeCategoryData && (
                          <Link href={`/products?category=${activeCategoryData.slug}`} className="text-sm uppercase tracking-wide text-[#12B5CB] hover:text-[#00355D] font-bold transition-colors">
                            View All {activeCategoryData.title} Directory
                          </Link>
                        )}
                      </div>
                      
                      <ul className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6 flex-grow">
                        {activeProducts.length > 0 ? (
                          activeProducts.map((product, i) => (
                            <li key={product.id} className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" style={{ transitionDelay: `${200 + (i * 40)}ms` }}>
                              <Link href={`/products/${product.slug}`} className="block p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group/item">
                                <h5 className="font-bold text-[#00355D] mb-1 group-hover/item:text-[#12B5CB] transition-colors line-clamp-2">{product.name}</h5>
                                <p className="text-xs text-gray-400 capitalize">{product.category}</p>
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li className="col-span-full h-full flex items-center justify-center">
                            <p className="text-base text-gray-400 italic">Data synchronization in progress... No products mapped to this category yet.</p>
                          </li>
                        )}
                      </ul>

                      <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                        <Link href="/products" className="inline-flex items-center gap-2 bg-[#00355D] hover:bg-[#12B5CB] text-white px-8 py-4 rounded-full text-sm font-bold transition-colors duration-300">
                          Explore Master Catalog <span>→</span>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Link href="/about" className="text-sm font-bold hover:text-[#12B5CB] transition-colors py-8">About Us</Link>
          <Link href="/contact" className="text-sm font-bold hover:text-[#12B5CB] transition-colors py-8">Contact</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Phone className="w-4 h-4 text-[#12B5CB]" />
            <span>+88 01675 292991</span>
          </div>
          <Link
            href="/contact"
            className="bg-[#12B5CB] hover:bg-[#009EE2] text-[#00355D] px-6 py-2.5 rounded-md text-sm font-bold transition-all shadow-sm hover:shadow-md font-['Inter']"
          >
            Request Quote
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6 h-screen font-['Inter'] text-[#00355D] overflow-y-auto">
          <Link href="/" className="text-xl font-bold border-b border-gray-200 pb-4" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/products" className="text-xl font-bold border-b border-gray-200 pb-4" onClick={() => setMobileMenuOpen(false)}>Products</Link>
          
          <div className="pl-4 border-l-2 border-[#12B5CB]/30 flex flex-col gap-3">
             {categories.map(cat => (
               <Link key={cat.id} href={`/products?category=${cat.slug}`} className="text-base text-gray-600 hover:text-[#12B5CB]" onClick={() => setMobileMenuOpen(false)}>
                 {cat.title}
               </Link>
             ))}
          </div>

          <Link href="/about" className="text-xl font-bold border-b border-gray-200 pb-4" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link href="/contact" className="text-xl font-bold border-b border-gray-200 pb-4" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <div className="mt-8 flex flex-col gap-4 pb-12">
            <div className="flex items-center gap-2 text-lg font-bold">
              <Phone className="w-5 h-5 text-[#12B5CB]" />
              <span>+88 01675 292991</span>
            </div>
            <Link href="/contact" className="bg-[#12B5CB] text-[#111111] text-center px-5 py-3 rounded-md text-lg font-bold">
              Request Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
