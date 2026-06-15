"use client";
import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen, Video, Award, ClipboardList } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function ClinicalTrainingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#00355D] text-white pt-[88px] pb-16 md:pt-[96px] md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <p className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.1em] mb-3">What We Do</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-[-0.04em]">Clinical Training &amp; Onboarding</h1>
            <p className="text-lg text-white/70 max-w-2xl">Comprehensive hands-on training programs to ensure your clinical staff can confidently and safely operate all equipment.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] -mt-8 relative z-10 space-y-12">
        {/* Training Programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: GraduationCap, title: "Equipment Onboarding", desc: "Every new equipment installation includes a structured onboarding session for your clinical team. Our biomedical engineers walk through setup, daily operation, safety protocols, and basic troubleshooting.", highlight: true },
            { icon: Users, title: "Group Training Sessions", desc: "Scheduled training sessions for nursing staff, technicians, and doctors on specialized equipment including anesthesia machines, ventilators, and electrosurgical units.", highlight: false },
            { icon: BookOpen, title: "User Manuals & Quick Guides", desc: "Comprehensive documentation including user manuals, quick-start guides, and troubleshooting flowcharts provided with every equipment delivery.", highlight: false },
            { icon: Video, title: "Video Training Library", desc: "Access to our growing library of video tutorials covering operation, maintenance tips, and safety checks for all our equipment categories.", highlight: true },
          ].map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-xl border border-gray-100 p-8 hover:shadow-md transition-all ${item.highlight ? "bg-[#00355D] text-white" : "bg-white"}`}
            >
              <item.icon className={`w-10 h-10 ${item.highlight ? "text-[#12B5CB]" : "text-[#12B5CB]"} mb-5`} />
              <h3 className={`text-xl font-bold tracking-tight mb-3 ${item.highlight ? "text-white" : "text-[#00355D]"}`}>{item.title}</h3>
              <p className={`leading-relaxed ${item.highlight ? "text-white/80" : "text-[#575B5F]"}`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Certification Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}
          className="bg-white rounded-xl border border-gray-100 p-8 lg:p-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-7 h-7 text-[#12B5CB]" />
            <h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Training Standards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "500+", label: "Nurses Trained", sub: "Across Dhaka hospitals" },
              { num: "100+", label: "Hospitals Served", sub: "Public and private" },
              { num: "24hr", label: "Response Time", sub: "For re-training requests" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="text-center p-6 bg-[#F8F9FA] rounded-xl"
              >
                <p className="text-4xl font-bold text-[#12B5CB] mb-1">{stat.num}</p>
                <p className="font-bold text-[#00355D]">{stat.label}</p>
                <p className="text-sm text-[#575B5F]">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#00355D] to-[#004A7F] rounded-xl p-8 lg:p-12 text-white text-center"
        >
          <ClipboardList className="w-10 h-10 text-[#12B5CB] mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Schedule a Training Session</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">Contact us to arrange a personalized training program for your clinical team.</p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-[#12B5CB] hover:bg-[#009EE2] text-white font-bold px-8 py-4 rounded-xl transition-colors">
            Request Training
          </a>
        </motion.div>
      </div>
    </div>
  );
}
