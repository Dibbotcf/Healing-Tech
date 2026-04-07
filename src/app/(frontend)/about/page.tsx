"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Network, Wrench, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <div className="w-full bg-[#F8F9FA] font-['Inter'] tracking-tight pb-24">
      {/* ── HERO ── */}
      <section className="bg-[#00355D] text-white pt-[88px] pb-20 md:pt-[100px] lg:pt-[112px] lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <p className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.1em] mb-4">About Us</p>
            <h1 className="font-['Inter'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Enhancing Patient Outcomes <br className="hidden md:block" /> Through Advanced Solutions.
            </h1>
            <p className="text-xl text-white/80 leading-relaxed font-normal max-w-2xl">
              Healing Technology is a premier medical equipment importer and supplier. We bridge the gap between global medical innovation and local healthcare providers by sourcing high-standard hospital products and OT (Operation Theater) equipment from world-class manufacturers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MD MESSAGE & MISSION/VISION ── */}
      <section className="container mx-auto px-4 lg:px-8 max-w-[1440px] -mt-12 relative z-10 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MD Message (Left, larger) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-7 bg-white border border-gray-200 rounded-[2px] p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
              <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 border border-gray-100 rounded-[2px] overflow-hidden bg-gray-50">
                <Image
                  src="/md-nirob.jpg"
                  alt="Md. Rokibul Islam Nirob"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#00355D] tracking-tighter mb-1">Md. Rokibul Islam Nirob</h2>
                <p className="text-[#12B5CB] font-bold text-sm uppercase tracking-wider">Managing Director</p>
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -top-4 -left-4 text-6xl text-[#12B5CB] opacity-20 font-serif">"</span>
              <p className="text-[#575B5F] text-lg lg:text-xl font-normal leading-relaxed italic relative z-10">
                At Healing Technology, we believe that the right equipment in the right hands saves lives. Our journey began with a simple commitment: to bridge the gap between global medical innovation and our local healthcare providers. By importing only the most reliable OT and hospital solutions, we empower surgeons and medical staff to perform at their best. We don't just supply machines; we provide the precision and reliability that patient care demands. Thank you for trusting us as your partner in health.
              </p>
            </div>
          </motion.div>

          {/* Mission & Vision (Right, smaller) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-white border text-center border-gray-200 rounded-[2px] p-10 flex-1 flex flex-col justify-center">
              <div className="w-12 h-12 bg-[#00AB4E]/10 rounded-[2px] flex items-center justify-center text-[#00AB4E] mb-5 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#00355D] tracking-tighter mb-3">Our Mission</h3>
              <p className="text-[#575B5F] font-normal leading-relaxed">
                Improving healthcare outcomes by supplying world-class medical devices with unmatched professionalism.
              </p>
            </div>

            <div className="bg-[#00355D] text-center border border-[#00355D] rounded-[2px] p-10 flex-1 flex flex-col justify-center">
               <div className="w-12 h-12 bg-white/10 rounded-[2px] flex items-center justify-center text-[#12B5CB] mb-5 mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tighter mb-3">Our Vision</h3>
              <p className="text-white/80 font-normal leading-relaxed">
                To lead the future of medical technology by making advanced surgical and hospital equipment accessible to every healthcare professional.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-white py-24 border-y border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.1em] mb-3">Commitment to Excellence</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00355D] tracking-tighter mb-4">Why Choose Healing Technology?</h2>
            <p className="text-[#575B5F] font-normal leading-relaxed">We support healthcare providers with end-to-end medical equipment solutions built on quality, transparency, and relentless engineering support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Network,
                color: "#12B5CB",
                title: "Global Import Network",
                desc: "Strategic partnerships with leading manufacturers from the USA, Europe, and Asia."
              },
              {
                icon: ShieldCheck,
                color: "#00AB4E",
                title: "Quality Assurance",
                desc: "All products undergo strict inspection to ensure they meet local health standards and safety regulations."
              },
              {
                icon: Wrench,
                color: "#00355D",
                title: "Technical Support",
                desc: "Dedicated team of engineers providing expert installation and dependable after-sales maintenance."
              },
              {
                icon: Clock,
                color: "#F59E0B",
                title: "Reliability",
                desc: "Proven track record of timely delivery and a deep understanding of the clinical needs of healthcare professionals."
              }
            ].map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#F8F9FA] border border-gray-200 rounded-[2px] p-8 hover:border-gray-300 transition-colors"
              >
                 <div className="w-12 h-12 rounded-[2px] flex items-center justify-center mb-6 bg-white border border-gray-200" style={{ color: feat.color }}>
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#00355D] tracking-tighter mb-3">{feat.title}</h3>
                <p className="text-sm text-[#575B5F] leading-relaxed font-normal">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
