"use client";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Wrench } from "lucide-react";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ProductCarousel } from "@/components/ProductCarousel";
import Image from "next/image";
import { WorldMap } from "@/components/ui/map";

const supplyRoutes = [
  { start: { lat: 51.1657, lng: 10.4515, label: "Germany" },     end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 37.5665, lng: 126.978, label: "South Korea" }, end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 35.8617, lng: 104.1954, label: "China" },      end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 36.2048, lng: 138.2529, label: "Japan" },      end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 38.9637, lng: 35.2433, label: "Turkey" },      end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 37.0902, lng: -95.7129, label: "USA" },        end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 55.3781, lng: -3.4360, label: "UK" },          end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 20.5937, lng: 78.9629, label: "India" },       end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 41.8719, lng: 12.5674, label: "Italy" },       end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: -25.2744, lng: 133.7751, label: "Australia" }, end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 46.8182, lng: 8.2275, label: "Switzerland" }, end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 52.1326, lng: 5.2913, label: "Netherlands" }, end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 46.2276, lng: 2.2137, label: "France" },      end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },  end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 60.1282, lng: 18.6435, label: "Sweden" },     end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
];

const INITIAL_BRAND_LOGOS = [
  { name: "Heyer Medical", logo: "/brands/heyer.svg", country: "Germany" },
  { name: "Aeomed", logo: "/brands/Aeomed.svg", country: "China" },
  { name: "Perlong Medical", logo: "/brands/perlong.svg", country: "China" },
  { name: "Zerone", logo: "/brands/zerone.svg", country: "South Korea" },
];


const clientLogos = [
  { name: "Care Specialized Hospital", logo: "/clients/Care Specialized Hospital.svg" },
  { name: "City Hospital", logo: "/clients/City Hospital.svg" },
  { name: "Continental Hospital", logo: "/clients/Continental Hospital.svg" },
  { name: "Implus Hospital", logo: "/clients/Implus Hospital.svg" },
  { name: "Popular Hospital", logo: "/clients/Popular Hospital .svg" },
  { name: "United Hospital", logo: "/clients/United Hospital.svg" },
];




export default function Home() {
  const [brands, setBrands] = useState(INITIAL_BRAND_LOGOS);

  useEffect(() => {
    fetch("/api/public-partner-logos")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setBrands(data);
      })
      .catch((err) => console.error("Error fetching partner logos:", err));
  }, []);

  return (
    <div className="w-full font-['Inter'] tracking-tight">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] lg:h-screen lg:min-h-[700px] flex items-start pt-48 md:pt-56 lg:pt-64 pb-24 lg:pb-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/figma-assets/39874e1a514d8a3f83c95d2fb9c7db3c89ab86f0.png"
            alt="Modern Operation Theater"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00355D]/95 via-[#00355D]/30 to-[#00355D]/20 md:to-transparent" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-white"
          >
            <h1 className="font-['Inter'] text-4xl md:text-5xl lg:text-[4rem] font-normal leading-tight tracking-tight mb-4 md:mb-6 text-white text-balance">
              Empowering Bangladesh<br className="hidden md:block"/> Healthcare with Precision<br className="hidden md:block"/> Clinical Solutions.
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-[#12B5CB] hover:bg-[#009EE2] text-white px-8 py-4 rounded-xl text-base font-bold transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Explore Product Catalog
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl text-base font-bold transition-all"
              >
                Speak to an Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Partners Marquee */}
      <section className="bg-white py-12 border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 mb-6 text-center">
          <p className="text-sm font-bold text-[#575B5F] uppercase tracking-wide">
            Clients who continue to trust us
          </p>
        </div>
        <div className="flex items-center space-x-24 animate-[marquee_30s_linear_infinite] whitespace-nowrap px-4 py-6">
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
            <div key={index} className="inline-flex items-center mx-12">
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-12 md:h-16 w-auto max-w-none object-contain brightness-0 opacity-60 hover:opacity-100 transition-all duration-300" 
              />
            </div>
          ))}
        </div>
      </section>


      {/* Featured Equipment Carousel (CMS-driven) */}
      <ProductCarousel />

      {/* Value Proposition */}
      <section className="py-24 bg-white overflow-visible">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">

          {/* Globe + Brands Split */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center bg-white">
              {/* Left — Text + Brand Logos */}
              <div className="px-2 lg:pr-16 py-8 lg:py-16">
                <h2 className="text-3xl md:text-[2.6rem] font-bold text-[#00355D] tracking-[-0.03em] leading-[1.1] mb-6">
                  We Bring the World&apos;s<br className="hidden md:block" /> Best Medical Equipment<br className="hidden md:block" /> Directly to Bangladesh
                </h2>
                <p className="text-lg text-[#575B5F] leading-relaxed mb-12 max-w-lg font-normal">
                  No middlemen. No grey markets. We source, import, and deliver internationally certified medical devices from the brands that hospitals worldwide rely on — straight to your facility.
                </p>

                {/* Big Brand Logos */}
                <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                  {brands.map((brand, i) => (
                    <div key={i} className="flex items-center">
                      <div className="relative h-10 w-full max-w-[160px]">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          fill
                          className="object-contain object-left"
                          style={{ filter: "brightness(0) saturate(100%) invert(14%) sepia(47%) saturate(2894%) hue-rotate(192deg) brightness(97%) contrast(101%)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — 3D Globe (glow overflows) */}
              <div className="relative lg:-mr-8 overflow-visible">
                <WorldMap dots={supplyRoutes} lineColor="#12B5CB" />
              </div>
            </div>
          </motion.div>

          {/* ── Why Hospitals Choose Us ── */}
          <div className="mt-32">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
              <h2 className="font-['Inter'] text-[2.5rem] font-bold text-[#00355D] mb-4 tracking-tighter">Why Hospitals Choose Us</h2>
              <p className="text-lg text-[#575B5F] max-w-xl mx-auto font-normal">Beyond selling equipment — we invest in your operations, your team, and your patients.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Quality Card */}
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="bg-[#F8F9FA] rounded-2xl p-10 lg:p-12 border border-gray-100 hover:border-[#12B5CB]/20 transition-colors"
              >
                <div className="w-12 h-12 bg-[#00AB4E]/10 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-[#00AB4E]" />
                </div>
                <h3 className="font-['Inter'] text-2xl font-bold text-[#00355D] mb-4 tracking-[-0.02em]">Zero-Compromise Quality</h3>
                <p className="text-[#575B5F] text-base leading-relaxed mb-8 font-normal">
                  We don&apos;t cut corners. Every device we deliver has passed factory inspections, carries CE/ISO certification, and meets DGDA regulatory standards — because patient safety isn&apos;t negotiable.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00AB4E]" />
                    <span className="text-sm font-semibold text-[#00355D]">ISO 9001 · CE · FDA compliant processes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00AB4E]" />
                    <span className="text-sm font-semibold text-[#00355D]">Full DGDA documentation on every shipment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00AB4E]" />
                    <span className="text-sm font-semibold text-[#00355D]">Factory-sealed, never refurbished</span>
                  </div>
                </div>
              </motion.div>

              {/* Support Card */}
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
                className="bg-[#00355D] rounded-2xl p-10 lg:p-12 text-white"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <Wrench className="w-6 h-6 text-[#12B5CB]" />
                </div>
                <h3 className="font-['Inter'] text-2xl font-bold mb-4 tracking-[-0.02em]">24/7 Engineering On Call</h3>
                <p className="text-white/70 text-base leading-relaxed mb-8 font-normal">
                  When a ventilator goes down at 3 AM, our manufacturer-trained biomedical engineers are already on the way. We keep hospitals running — around the clock, every single day.
                </p>
                <div className="flex flex-col gap-3 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#12B5CB]" />
                    <span className="text-sm font-semibold text-white/90">Rapid-response on-site repair teams</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#12B5CB]" />
                    <span className="text-sm font-semibold text-white/90">Genuine OEM spare parts — always in stock</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#12B5CB]" />
                    <span className="text-sm font-semibold text-white/90">Preventive maintenance contracts</span>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Direct Service Hotline</p>
                  <a href="tel:+8801898876703" className="text-2xl font-bold text-white hover:text-[#12B5CB] transition-colors tracking-tight">
                    +88 01898 876703
                  </a>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
