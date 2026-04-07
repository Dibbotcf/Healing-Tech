"use client";
import { motion } from "framer-motion";
import { Globe, Ship, ShieldCheck, Award } from "lucide-react";
import { WorldMap } from "@/components/ui/map";

const supplyRoutes = [
  { start: { lat: 51.1657, lng: 10.4515, label: "Germany" }, end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 37.5665, lng: 126.978, label: "South Korea" }, end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 35.8617, lng: 104.1954, label: "China" }, end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 36.2048, lng: 138.2529, label: "Japan" }, end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
  { start: { lat: 38.9637, lng: 35.2433, label: "Turkey" }, end: { lat: 23.685, lng: 90.3563, label: "Dhaka" } },
];

const partners = [
  { name: "Heyer Medical", country: "Germany", specialty: "Anesthesia & Ventilation" },
  { name: "Aeomed", country: "China", specialty: "Respiratory Care & BiPAP" },
  { name: "Perlong Medical", country: "China", specialty: "Patient Monitors & ECG" },
  { name: "Zerone", country: "South Korea", specialty: "Electrosurgical Units" },
  { name: "Luminex-Lumen", country: "International", specialty: "Surgical Lights & OT Lamps" },
];

export default function GlobalSourcingPage() {
  return (
    <div className="w-full bg-white font-['Inter'] tracking-tight pb-32">
      {/* ── HERO ── */}
      <section className="pt-[160px] pb-16 px-6 lg:px-8 max-w-[1440px] mx-auto border-b border-gray-200 mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-6">What We Do</p>
          <h1 className="font-['Inter'] text-5xl md:text-7xl font-bold mb-8 tracking-[-0.04em] leading-[1.05] text-[#00355D]">
            Global Device <br className="hidden md:block" /> Sourcing.
          </h1>
          <p className="text-xl md:text-2xl text-[#575B5F] leading-[1.4] font-normal max-w-3xl">
            Importing world-class medical equipment from certified manufacturers across Germany, South Korea, China, Japan, and Turkey — directly to Bangladesh.
          </p>
        </motion.div>
      </section>

      {/* ── MAP SECTION (FULL WIDTH) ── */}
      <section className="w-full mb-32 overflow-hidden bg-[#F8F9FA] border-y border-gray-200">
        <div className="px-6 lg:px-8 max-w-[1440px] mx-auto pt-16 pb-8">
          <h2 className="text-4xl font-bold text-[#00355D] tracking-[-0.03em] leading-none mb-4">Our Supply Chain Network</h2>
          <p className="text-lg text-[#575B5F] font-normal leading-[1.5]">Direct import routes from world-class manufacturers to Dhaka, Bangladesh.</p>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-full h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden relative">
            <div className="absolute w-[200%] md:w-[150%] lg:w-[120%] h-full left-[-30%] lg:left-[-10%] top-0">
               <WorldMap dots={supplyRoutes} lineColor="#12B5CB" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-gray-200 pt-32 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {[
            { icon: Ship, title: "Direct Import", desc: "We import directly from authorized manufacturers, eliminating middlemen and ensuring authenticity of every device." },
            { icon: ShieldCheck, title: "Certified Equipment", desc: "Every product carries CE marking, ISO 13485, and DGDA compliance. No grey market imports—ever." },
            { icon: Award, title: "Exclusive Partnerships", desc: "We maintain exclusive distribution agreements with leading global medical equipment brands." },
          ].map((feat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex flex-col"
            >
              <feat.icon className="w-10 h-10 text-[#00355D] mb-6" strokeWidth={1} />
              <h3 className="text-2xl font-bold text-[#00355D] tracking-[-0.02em] mb-4 leading-none">{feat.title}</h3>
              <p className="text-lg text-[#575B5F] leading-[1.5] font-normal">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#F8F9FA] rounded-xl p-12 lg:p-20 border border-gray-200">
          <div className="mb-16">
            <Globe className="w-10 h-10 text-[#12B5CB] mb-6" strokeWidth={1} />
            <h2 className="text-4xl md:text-5xl font-bold text-[#00355D] tracking-[-0.03em] leading-none mb-4">Our Manufacturing Partners</h2>
            <p className="text-xl text-[#575B5F] font-normal max-w-2xl">Collaborating with the industry's most reliable names to ensure continuous quality care.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((p, i) => (
              <div key={i} className="border-l-2 border-gray-200 pl-6 py-2 hover:border-[#12B5CB] transition-colors duration-300">
                <h3 className="text-2xl font-bold text-[#00355D] mb-2 leading-none">{p.name}</h3>
                <p className="text-sm text-[#12B5CB] font-bold uppercase tracking-wider mb-2">{p.country}</p>
                <p className="text-base text-[#575B5F] m-0">{p.specialty}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
