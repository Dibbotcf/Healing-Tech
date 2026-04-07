"use client";
import { motion } from "framer-motion";
import { Globe, Ship, ShieldCheck, Award, Wrench, Activity, Stethoscope, Settings, PenTool, CheckCircle2 } from "lucide-react";
import { WorldMap } from "@/components/ui/map";
import Image from "next/image";

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

export default function WhatWeDoPage() {
  return (
    <div className="w-full bg-white font-['Inter'] tracking-tight">
      {/* ── HERO ── */}
      <section className="pt-[160px] pb-16 px-6 lg:px-8 max-w-[1440px] mx-auto mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
          <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-6">Our Services</p>
          <h1 className="font-['Inter'] text-5xl md:text-[80px] font-bold mb-8 tracking-[-0.04em] leading-[1] text-[#00355D]">
            Comprehensive <br className="hidden md:block" /> Healthcare Solutions.
          </h1>
          <p className="text-xl md:text-2xl text-[#575B5F] leading-[1.4] font-normal max-w-3xl">
            From direct global sourcing to 24/7 technical support—we provide an end-to-end ecosystem ensuring your clinical ops never stop.
          </p>
        </motion.div>
      </section>

      {/* ── SECTION 01: GLOBAL SOURCING ── */}
      <section id="global-sourcing" className="scroll-mt-40 pt-24 border-t border-gray-200">
        <div className="px-6 lg:px-8 max-w-[1440px] mx-auto mb-16">
           <h2 className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.15em] mb-4">01. Procurement</h2>
           <h3 className="text-4xl md:text-5xl font-bold text-[#00355D] tracking-[-0.03em] leading-none mb-6">Global Device Sourcing</h3>
           <p className="text-xl text-[#575B5F] max-w-3xl">Direct import routes from world-class manufacturers in Germany, South Korea, China, Japan, and Turkey to Dhaka.</p>
        </div>
        
        {/* MAP */}
        <div className="w-full mb-20 overflow-hidden bg-[#F8F9FA] border-y border-gray-200">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="w-full h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden relative max-w-[1440px] mx-auto">
              <div className="absolute w-[200%] md:w-[150%] lg:w-[120%] h-full left-[-30%] lg:left-[-10%] top-0">
                 <WorldMap dots={supplyRoutes} lineColor="#12B5CB" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* FEATURES */}
        <div className="px-6 lg:px-8 max-w-[1440px] mx-auto mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 mb-24">
            {[
              { icon: Ship, title: "Direct Import", desc: "We import directly from authorized manufacturers, eliminating middlemen and ensuring absolute authenticity." },
              { icon: ShieldCheck, title: "Certified Equipment", desc: "Every product carries CE marking, ISO 13485, and FDA/DGDA compliance. No grey market imports." },
              { icon: Award, title: "Exclusive Partnerships", desc: "We maintain exclusive direct-distribution agreements with leading global medical equipment brands." },
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

          {/* PARTNERS */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#F8F9FA] rounded-3xl p-10 lg:p-16 border border-gray-200">
            <div className="mb-12">
              <Globe className="w-10 h-10 text-[#12B5CB] mb-6" strokeWidth={1} />
              <h2 className="text-3xl md:text-5xl font-bold text-[#00355D] tracking-[-0.03em] leading-none mb-4">Our Manufacturing Partners</h2>
              <p className="text-xl text-[#575B5F] font-normal max-w-2xl">Collaborating with the industry's most reliable names to ensure continuous quality care.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((p, i) => (
                <div key={i} className="border-l-2 border-gray-200 pl-6 py-2 hover:border-[#12B5CB] transition-colors duration-300">
                  <h3 className="text-2xl font-bold text-[#00355D] mb-2 leading-none">{p.name}</h3>
                  <p className="text-sm text-[#12B5CB] font-bold uppercase tracking-wider mb-2">{p.country}</p>
                  <p className="text-base text-[#575B5F] m-0">{p.specialty}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 02: AFTER-SALES SUPPORT ── */}
      <section id="after-sales" className="scroll-mt-40 py-32 bg-[#001729] text-white">
        <div className="px-6 lg:px-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
             <h2 className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.15em] mb-4">02. Engineering</h2>
             <h3 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] leading-none mb-6">After-Sales Support</h3>
             <p className="text-xl text-gray-400 font-normal mb-10 leading-[1.5]">
               A breakdown is an emergency. Our certified biomedical engineers are available 24/7 to minimize equipment downtime and safeguard patient safety.
             </p>
             <ul className="space-y-6">
               {[
                 "Emergency breakdown resolution within 24 hours.",
                 "Original OEM spare parts replacement from factory.",
                 "Remote troubleshooting & real-time tele-diagnostics.",
                 "Comprehensive warranty fulfillment & extended warranties."
               ].map((item, i) => (
                 <li key={i} className="flex items-start gap-4 text-gray-300 text-lg">
                   <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                     <CheckCircle2 className="w-4 h-4 text-[#12B5CB]" />
                   </div>
                   <span>{item}</span>
                 </li>
               ))}
             </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-white/5 border border-white/10">
             {/* Instead of a missing image, we render a highly stylized gradient graphic + stat */}
             <div className="absolute inset-0 object-cover" style={{ backgroundImage: "url('/hero-surgery.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6 }} />
             <div className="absolute inset-0 bg-gradient-to-t from-[#001729] via-[#001729]/40 to-transparent" />
             
             <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-6">
                   <div className="bg-[#12B5CB] p-4 rounded-full shadow-lg"><Wrench className="text-[#001729] w-8 h-8"/></div>
                   <div>
                     <p className="text-white font-bold text-2xl tracking-tight mb-1">24/7 Availability</p>
                     <p className="text-base text-gray-300">Biomedical engineers on standby nationwide.</p>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 03: PREVENTIVE MAINTENANCE ── */}
      <section id="preventive-maintenance" className="scroll-mt-40 py-32 bg-[#F8F9FA]">
        <div className="px-6 lg:px-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden order-2 lg:order-1">
             <div className="absolute inset-0" style={{ backgroundImage: "url('/about-hero-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
             <div className="absolute inset-0 bg-gradient-to-br from-[#00355D]/90 to-[#12B5CB]/40 mix-blend-multiply" />
             
             <div className="absolute top-10 left-10 bg-white shadow-2xl p-8 rounded-3xl max-w-xs">
                <Activity className="w-10 h-10 text-[#12B5CB] mb-5"/>
                <p className="font-bold text-2xl mb-2 text-[#00355D] leading-none">Proactive Care</p>
                <p className="text-sm text-[#575B5F]">Prevent hardware failure before it disrupts clinical workflow.</p>
             </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
             <h2 className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.15em] mb-4">03. Reliability</h2>
             <h3 className="text-4xl md:text-5xl font-bold text-[#00355D] tracking-[-0.03em] leading-none mb-6">Preventive Maintenance</h3>
             <p className="text-xl text-[#575B5F] font-normal mb-10 leading-[1.5]">
               Through scheduled servicing and rigorous calibration protocols, we dramatically extend the lifespan of your critical investments—reducing unexpected Capex.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                 <Settings className="w-8 h-8 text-[#00355D] mb-5" />
                 <h4 className="text-xl font-bold text-[#00355D] mb-3 leading-none">Calibration</h4>
                 <p className="text-base text-[#575B5F] leading-relaxed">Quarterly tuning to maintain FDA/CE accuracy limits.</p>
               </div>
               <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                 <PenTool className="w-8 h-8 text-[#00355D] mb-5" />
                 <h4 className="text-xl font-bold text-[#00355D] mb-3 leading-none">Software Updates</h4>
                 <p className="text-base text-[#575B5F] leading-relaxed">Firmware patching to unlock the newest OEM features securely.</p>
               </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 04: CLINICAL TRAINING & ONBOARDING ── */}
      <section id="clinical-training" className="scroll-mt-40 pt-32 pb-40">
        <div className="px-6 lg:px-8 max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.15em] mb-4">04. Education</h2>
             <h3 className="text-4xl md:text-6xl font-bold text-[#00355D] tracking-[-0.04em] leading-none mb-6">Clinical Training & Onboarding</h3>
             <p className="text-xl text-[#575B5F] font-normal leading-[1.5]">
               A machine is only as good as its operator. We ensure your medical staff masters the equipment on day one.
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
             {[
               { no: '1', title: "On-Site Installation", desc: "Expert unpacking, assembly, and testing integration into your hospital's power, gas, and network ecosystems." },
               { no: '2', title: "Staff Workshops", desc: "Hands-on, department-wide tutorials for doctors and nurses focusing on UI navigation and emergency protocols." },
               { no: '3', title: "Certification", desc: "Providing official OEM operation certificates for your facility's personnel for compliance auditing." },
             ].map((phase, i) => (
                <div key={i} className="bg-white border border-gray-200 p-10 lg:p-12 rounded-[2rem] shadow-sm relative group hover:shadow-xl transition-all duration-300 hover:border-gray-300">
                   <div className="w-14 h-14 rounded-full bg-[#F8F9FA] text-[#00355D] flex items-center justify-center text-2xl font-black absolute top-10 right-10 group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#12B5CB] group-hover:text-white">{phase.no}</div>
                   <Stethoscope className="w-12 h-12 text-[#12B5CB] mb-10" />
                   <h4 className="text-2xl font-bold text-[#00355D] mb-4 leading-none">{phase.title}</h4>
                   <p className="text-[#575B5F] text-lg leading-relaxed">{phase.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
