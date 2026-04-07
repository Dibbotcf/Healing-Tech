"use client";
import { motion } from "framer-motion";
import { Headphones, Clock, Wrench, Phone, CheckCircle2, Zap } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function AfterSalesSupportPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#00355D] text-white pt-[88px] pb-16 md:pt-[96px] md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <p className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.1em] mb-3">What We Do</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-[-0.04em]">After-Sales Support</h1>
            <p className="text-lg text-white/70 max-w-2xl">24/7 engineering support, spare parts inventory, and rapid response — because lives depend on equipment uptime.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] -mt-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Clock, title: "24/7 Hotline", desc: "Round-the-clock service desk staffed by certified biomedical engineers for emergency support.", color: "bg-blue-50 text-blue-600" },
            { icon: Wrench, title: "On-Site Repairs", desc: "Our mobile engineering teams provide on-site repair services across Dhaka and major cities within 24 hours.", color: "bg-emerald-50 text-emerald-600" },
            { icon: Zap, title: "Rapid Parts Supply", desc: "Comprehensive spare parts inventory maintained locally. Critical components available within 48 hours.", color: "bg-amber-50 text-amber-600" },
            { icon: Headphones, title: "Remote Diagnostics", desc: "Real-time remote diagnostic support for complex equipment with video-guided troubleshooting.", color: "bg-purple-50 text-purple-600" },
            { icon: CheckCircle2, title: "Warranty Management", desc: "We manage all warranty claims directly with manufacturers, ensuring hassle-free resolution.", color: "bg-cyan-50 text-cyan-600" },
            { icon: Phone, title: "Dedicated Account Manager", desc: "Every hospital gets a dedicated account manager who understands your equipment portfolio.", color: "bg-rose-50 text-rose-600" },
          ].map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl  border border-gray-100 p-8 hover: transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#00355D] tracking-tight mb-3">{item.title}</h3>
              <p className="text-[#575B5F] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}
          className="bg-[#00355D] rounded-xl p-8 lg:p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Need Emergency Support?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">Call our 24/7 engineering hotline for immediate assistance.</p>
          <a href="tel:+8801898876703" className="inline-flex items-center gap-2 bg-[#12B5CB] hover:bg-[#009EE2] text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg">
            <Phone className="w-5 h-5" /> 01898 876703
          </a>
        </motion.div>
      </div>
    </div>
  );
}
