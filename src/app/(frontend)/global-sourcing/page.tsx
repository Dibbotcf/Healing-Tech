"use client";
import { motion } from "framer-motion";
import { Globe, Ship, CheckCircle2, ShieldCheck, Award } from "lucide-react";
import { WorldMap } from "@/components/ui/map";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

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
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#00355D] text-white pt-[88px] pb-16 md:pt-[96px] md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <p className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.1em] mb-3">What We Do</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-[-0.04em]">Global Device Sourcing</h1>
            <p className="text-lg text-white/70 max-w-2xl">Importing world-class medical equipment from certified manufacturers across Germany, South Korea, China, Japan, and Turkey — directly to Bangladesh.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] -mt-8 relative z-10 space-y-16">
        {/* Map Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.8 }}>
          <div className="bg-white rounded-[2px]  border border-gray-100 p-4 lg:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#00355D] tracking-tight mb-2">Our Supply Chain Network</h2>
              <p className="text-[#575B5F]">Direct import routes from world-class manufacturers to Dhaka, Bangladesh</p>
            </div>
            <WorldMap dots={supplyRoutes} lineColor="#12B5CB" />
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Ship, title: "Direct Import", desc: "We import directly from authorized manufacturers, eliminating middlemen and ensuring authenticity of every device." },
            { icon: ShieldCheck, title: "Certified Equipment", desc: "Every product carries CE marking, ISO 13485, and DGDA compliance. No grey market imports—ever." },
            { icon: Award, title: "Exclusive Partnerships", desc: "We maintain exclusive distribution agreements with leading global medical equipment brands." },
          ].map((feat, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-[2px]  border border-gray-100 p-8 hover: transition-shadow"
            >
              <feat.icon className="w-10 h-10 text-[#12B5CB] mb-4" />
              <h3 className="text-xl font-bold text-[#00355D] tracking-tight mb-3">{feat.title}</h3>
              <p className="text-[#575B5F] leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Partners */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <div className="bg-white rounded-[2px]  border border-gray-100 p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Globe className="w-7 h-7 text-[#12B5CB]" />
              <h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Our Manufacturing Partners</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="border border-gray-100 rounded-[2px] p-5 hover:border-[#12B5CB]/40 transition-all"
                >
                  <h3 className="font-bold text-[#00355D] mb-1">{p.name}</h3>
                  <p className="text-xs text-[#12B5CB] font-semibold uppercase tracking-wider mb-2">{p.country}</p>
                  <p className="text-sm text-[#575B5F]">{p.specialty}</p>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-3" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
