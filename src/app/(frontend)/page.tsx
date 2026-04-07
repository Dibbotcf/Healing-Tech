"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe2, ShieldCheck, Wrench, CheckCircle2 } from "lucide-react";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ProductCarousel } from "@/components/ProductCarousel";
import { WorldMap } from "@/components/ui/map";

const supplyRoutes = [
  { start: { lat: 51.1657, lng: 10.4515, label: "Germany" },     end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 37.5665, lng: 126.978, label: "South Korea" }, end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 35.8617, lng: 104.1954, label: "China" },      end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 36.2048, lng: 138.2529, label: "Japan" },      end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 38.9637, lng: 35.2433, label: "Turkey" },      end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
];

const partners = [
  { id: 1, name: "Aeonmed" }, { id: 2, name: "Heyer Medical AG" },
  { id: 3, name: "Zerone" }, { id: 4, name: "Osram" },
  { id: 5, name: "Bng Medical" }, { id: 6, name: "Suxin" }
];





export default function Home() {
  return (
    <div className="w-full font-['Inter'] tracking-tight">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-end pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/figma-assets/39874e1a514d8a3f83c95d2fb9c7db3c89ab86f0.png"
            alt="Modern Operation Theater"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00355D]/90 via-[#00355D]/20 to-transparent" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-white"
          >
            <h1 className="font-['Inter'] text-4xl md:text-5xl lg:text-[4.5rem] font-normal leading-[1.1] tracking-tight mb-6 text-white">
              Empowering Bangladesh<br/>Healthcare with Precision<br/>Clinical Solutions.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-snug font-normal max-w-2xl">
              We bridge the gap between global medical innovation and local healthcare providers. Importing world-class OT, ICU, and surgical equipment—backed by unwavering 24/7 engineering support.
            </p>
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

      {/* Global Partners Marquee */}
      <section className="bg-white py-12 border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 mb-6 text-center">
          <p className="text-sm font-bold text-[#575B5F] uppercase tracking-wide">
            Trusted by global innovators, delivered to your hospital.
          </p>
        </div>
        <div className="flex space-x-12 animate-[marquee_20s_linear_infinite] opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap px-4">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div key={index} className="inline-block text-2xl font-['Inter'] font-bold text-[#575B5F] mx-8 tracking-tighter">
              {partner.name}
            </div>
          ))}
        </div>
      </section>


      {/* Featured Equipment Carousel (CMS-driven) */}
      <ProductCarousel />

      {/* Value Proposition */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <h2 className="font-['Inter'] text-[2.5rem] font-bold text-[#00355D] mb-4 tracking-tighter">Beyond Procurement. A Partnership in Patient Care.</h2>
            <p className="text-lg text-[#575B5F] max-w-2xl mx-auto font-normal leading-tight">We mitigate your operational risks through uncompromising quality and dedicated post-sale engineering support.</p>
          </motion.div>

          <div className="space-y-24">
            {/* Global Import Network Map */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }} className="w-full">
              <div className="bg-[#F8F9FA] rounded-xl p-6 lg:p-12 border border-gray-100 overflow-hidden w-full h-[300px] md:h-[400px] lg:h-[500px]">
                <WorldMap dots={supplyRoutes} lineColor="#12B5CB" />
              </div>
            </motion.div>

            {/* Quality Assurance */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
              <div className="flex-1">
                <div className="w-16 h-16 bg-[#00AB4E]/10 rounded-xl flex items-center justify-center mb-6 text-[#00AB4E]"><ShieldCheck className="w-8 h-8" /></div>
                <h3 className="font-['Inter'] text-2xl font-bold text-[#00355D] mb-4 tracking-tighter">Uncompromising Quality Assurance</h3>
                <p className="text-[#575B5F] text-lg leading-tight mb-6 font-normal">Every device undergoes strict inspection protocols ensuring absolute compliance with DGDA and international health standards.</p>
                <ul className="space-y-3 font-normal">
                  <li className="flex items-center gap-3 text-[#111111] font-bold"><CheckCircle2 className="w-5 h-5 text-[#00AB4E]" /> ISO 9001 Certified processes</li>
                  <li className="flex items-center gap-3 text-[#111111] font-bold"><CheckCircle2 className="w-5 h-5 text-[#00AB4E]" /> DGDA Compliance guarantees</li>
                </ul>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-[#F8F9FA] rounded-xl p-12 flex items-center justify-center h-full min-h-[300px] border border-gray-100"><ShieldCheck className="w-48 h-48 text-[#00AB4E]/20" /></div>
              </div>
            </motion.div>

            {/* 24/7 Support */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
              <div className="flex-1">
                <div className="w-16 h-16 bg-[#12B5CB]/10 rounded-xl flex items-center justify-center mb-6 text-[#12B5CB]"><Wrench className="w-8 h-8" /></div>
                <h3 className="font-['Inter'] text-2xl font-bold text-[#00355D] mb-4 tracking-tighter">24/7 Technical Support</h3>
                <p className="text-[#575B5F] text-lg leading-tight mb-6 font-normal">Equipment downtime costs lives. We deploy dedicated, manufacturer-trained biomedical engineers for rapid-response maintenance.</p>
                <ul className="space-y-3 font-normal">
                  <li className="flex items-center gap-3 text-[#111111] font-bold"><CheckCircle2 className="w-5 h-5 text-[#00AB4E]" /> Emergency response teams</li>
                  <li className="flex items-center gap-3 text-[#111111] font-bold"><CheckCircle2 className="w-5 h-5 text-[#00AB4E]" /> Genuine spare parts inventory</li>
                </ul>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-[#00355D] rounded-xl p-12 flex flex-col items-center justify-center h-full min-h-[300px] text-white">
                  <Wrench className="w-16 h-16 text-[#12B5CB] mb-4" />
                  <div className="text-3xl font-bold font-['Inter'] tracking-tighter">+88 01898 876703</div>
                  <div className="text-[#12B5CB] mt-2 font-normal">Direct Service Hotline</div>
                </div>
              </div>
            </motion.div>
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
