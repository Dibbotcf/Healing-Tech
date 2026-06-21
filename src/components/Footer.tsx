"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
  const [categories, setCategories] = useState<{ id: string; title: string; slug: string }[]>([]);

  useEffect(() => {
    fetch("/api/public-categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data.slice(0, 6));
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);
  return (
    <footer className="bg-[#001729] text-white pt-24 pb-0 font-['Inter'] relative overflow-hidden print:hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-4">
            <div className="mb-8">
              <Image src="/logo-light.svg" alt="Healing Technology" width={180} height={48} className="h-10 md:h-12 w-auto object-contain opacity-90 mb-6" />
              <h2 className="text-xl lg:text-2xl font-bold text-white uppercase tracking-tighter leading-none mb-2">
                Serving Bangladesh
              </h2>
              <h2 className="text-xl lg:text-2xl font-bold text-[#12B5CB] uppercase tracking-tighter leading-none">
                With World-Class Equipment
              </h2>
            </div>
            <ul className="space-y-4 text-sm text-gray-400 font-normal leading-tight mb-8">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-gray-400 group-hover:text-[#12B5CB] transition-colors" />
                <a href="https://maps.app.goo.gl/NfU877HUg3ktpMaX7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Ansari Bhaban (Ground Floor), 14/2 Topkhana Road, Paltan, Dhaka-1000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>+88 01675 292991</span>
              </li>
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.facebook.com/healingtechnologybd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/healing-technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href="https://www.youtube.com/@HealingTechnology"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Our Instagram page will be available soon!"); }}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-gradient-to-tr hover:from-[#fdf497] hover:via-[#fd5949] hover:to-[#d6249f] hover:text-white hover:border-transparent transition-all"
                aria-label="Instagram"
                title="Instagram (Coming soon)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 lg:col-span-8 gap-x-8 lg:gap-x-6 gap-y-8 mt-4 lg:mt-0">
            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-4 text-sm text-gray-400 font-normal">
                <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Company Info</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Products</h3>
              <ul className="space-y-4 text-sm text-gray-400 font-normal">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat.id}>
                      <Link href={`/products?category=${cat.slug}`} className="hover:text-white transition-colors">
                        {cat.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li><span className="opacity-50">Loading...</span></li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">What We Do</h3>
              <ul className="space-y-4 text-sm text-gray-400 font-normal">
                <li><Link href="/what-we-do#global-sourcing" className="hover:text-white transition-colors">Global Device Sourcing</Link></li>
                <li><Link href="/what-we-do#after-sales" className="hover:text-white transition-colors">After-Sales Support</Link></li>
                <li><Link href="/what-we-do#preventive-maintenance" className="hover:text-white transition-colors">Preventive Maintenance</Link></li>
                <li><Link href="/what-we-do#clinical-training" className="hover:text-white transition-colors">Clinical Training & Onboarding</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Legal & Compliance</h3>
              <ul className="space-y-4 text-sm text-gray-400 font-normal">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/[0.08] pt-10 pb-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="max-w-3xl">
            <h4 className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Global Quality & Regulatory Compliance</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-normal mb-8">
              All medical equipment supplied by Healing Technology is sourced from globally recognized manufacturers. Our partners strictly adhere to international manufacturing and safety standards, holding active ISO 13485, ISO 9001, CE, and FDA certifications to guarantee safe, effective patient care.
            </p>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
              <p className="text-[11px] text-[#575B5F] leading-relaxed font-normal lg:text-justify max-w-[85ch]">
                &copy; 2026-2027 HEALING TECHNOLOGY Ltd. All rights reserved. All trademarks are property of their respective owners. Healing Technology is a medical equipment distributor, not a clinical facility. By using our platform, you agree to our terms of service and all applicable laws.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 shrink-0 items-center justify-end">
            {['dgda.svg', 'ce.svg', 'iso-9001.svg', 'iso-13485.svg', 'fda.svg'].map((logo, i) => (
              <Image 
                key={i} 
                src={`/certs/${logo}`} 
                alt={logo.split('.')[0].toUpperCase()} 
                width={60} 
                height={60} 
                className="h-10 md:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        </div>


      </div>

      <div className="w-full flex translate-y-[20%] pointer-events-none select-none overflow-hidden mt-[-5%] whitespace-nowrap">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          <span className="font-['Inter'] font-bold text-white/[0.02] whitespace-nowrap leading-none tracking-tighter pr-16" style={{ fontSize: "clamp(6rem, 15vw, 300px)" }}>
            HEALING TECHNOLOGY <span className="mx-8 opacity-50">•</span> HEALING TECHNOLOGY <span className="mx-8 opacity-50">•</span>
          </span>
          <span className="font-['Inter'] font-bold text-white/[0.02] whitespace-nowrap leading-none tracking-tighter pr-16" style={{ fontSize: "clamp(6rem, 15vw, 300px)" }}>
            HEALING TECHNOLOGY <span className="mx-8 opacity-50">•</span> HEALING TECHNOLOGY <span className="mx-8 opacity-50">•</span>
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
