"use client";
import { motion } from "framer-motion";
import { Calendar, ClipboardCheck, Activity, Shield, Settings, BarChart } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function PreventiveMaintenancePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#00355D] text-white pt-[88px] pb-16 md:pt-[96px] md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <p className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.1em] mb-3">What We Do</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-[-0.04em]">Preventive Maintenance</h1>
            <p className="text-lg text-white/70 max-w-2xl">Scheduled maintenance programs to maximize equipment uptime and extend operational lifespan.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] -mt-8 relative z-10 space-y-12">
        {/* Process Steps */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}
          className="bg-white rounded-xl  border border-gray-100 p-8 lg:p-12"
        >
          <h2 className="text-2xl font-bold text-[#00355D] tracking-tight mb-8 text-center">Our Maintenance Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Assessment", desc: "Comprehensive evaluation of all installed equipment to establish baseline performance metrics." },
              { step: "02", title: "Schedule", desc: "Custom maintenance calendar based on manufacturer recommendations and usage intensity." },
              { step: "03", title: "Service", desc: "Certified biomedical engineers perform thorough inspection, calibration, and parts replacement." },
              { step: "04", title: "Report", desc: "Detailed service report with findings, actions taken, and recommendations for future care." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-[#12B5CB]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#12B5CB]">{item.step}</span>
                </div>
                <h3 className="font-bold text-[#00355D] mb-2">{item.title}</h3>
                <p className="text-sm text-[#575B5F] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Calendar, title: "Scheduled Inspections", desc: "Regular quarterly and semi-annual equipment inspections following ISO protocols." },
            { icon: ClipboardCheck, title: "Calibration Services", desc: "Precision calibration of monitors, ventilators, and electrosurgical units to factory specifications." },
            { icon: Activity, title: "Performance Testing", desc: "Comprehensive performance benchmarking against manufacturer standards." },
            { icon: Shield, title: "Safety Audits", desc: "Electrical safety (leakage current) and mechanical integrity testing for patient safety compliance." },
            { icon: Settings, title: "Parts Replacement", desc: "Proactive replacement of wear-and-tear components before they cause failures." },
            { icon: BarChart, title: "Lifecycle Analytics", desc: "Data-driven equipment lifecycle tracking to inform replacement planning and budgeting." },
          ].map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl  border border-gray-100 p-6 hover: transition-all"
            >
              <item.icon className="w-8 h-8 text-[#12B5CB] mb-4" />
              <h3 className="font-bold text-[#00355D] tracking-tight mb-2">{item.title}</h3>
              <p className="text-sm text-[#575B5F] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
