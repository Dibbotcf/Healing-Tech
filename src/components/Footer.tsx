"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#001729] text-white pt-24 pb-0 font-['Inter'] relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-4">
            <div className="mb-8">
              <Image src="/healing technology logo SVG-04.svg" alt="Healing Technology" width={180} height={48} className="h-10 md:h-12 w-auto object-contain opacity-90 mb-6" />
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
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/healingtechnologybd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Find us on Facebook
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-7 lg:col-start-6 gap-x-8 lg:gap-x-6 gap-y-8 mt-4 lg:mt-0">
            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-4 text-sm text-gray-400 font-normal">
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Company Info</Link></li>
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
