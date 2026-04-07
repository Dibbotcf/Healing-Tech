"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Network, Wrench, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <div className="w-full bg-white font-['Inter'] tracking-tight pb-32">
      {/* ── HERO ── */}
      <section className="pt-[120px] pb-24 md:pt-[160px] md:pb-32 px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
          <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-6">About Us</p>
          <h1 className="font-['Inter'] text-5xl md:text-7xl font-bold mb-8 tracking-[-0.04em] leading-[1.05] text-[#00355D]">
            Engineering Trust <br className="hidden md:block" /> in Healthcare.
          </h1>
          <p className="text-xl md:text-2xl text-[#575B5F] leading-[1.4] font-normal max-w-3xl">
            Healing Technology is a premier medical equipment importer and supplier. We bridge the gap between global medical innovation and local healthcare providers by sourcing high-standard hospital products and clinical equipment from world-class manufacturers.
          </p>
        </motion.div>
      </section>

      {/* ── MD MESSAGE & MISSION/VISION ── */}
      <section className="px-6 lg:px-8 max-w-[1440px] mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* MD Message (Left, larger) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative border-l-2 border-[#12B5CB] pl-8 md:pl-12 py-4 mb-12">
              <p className="text-[#00355D] text-2xl lg:text-3xl font-medium leading-[1.3] tracking-tight">
                "At Healing Technology, we believe that the right equipment in the right hands saves lives. Our journey began with a simple commitment: to bridge the gap between global medical innovation and our local healthcare providers. By importing only the most reliable OT and hospital solutions, we empower surgeons and medical staff to perform at their best. We don't just supply machines; we provide the precision and reliability that patient care demands. Thank you for trusting us as your partner in health."
              </p>
            </div>
            
            <div className="flex items-center gap-6 pl-8 md:pl-12">
              <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                <Image
                  src="/md-nirob.jpg"
                  alt="Md. Rokibul Islam Nirob"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#00355D] tracking-tight m-0 leading-none mb-1.5">Md. Rokibul Islam Nirob</h2>
                <p className="text-[#575B5F] text-sm uppercase tracking-wider font-medium m-0 leading-none">Managing Director</p>
              </div>
            </div>
          </motion.div>

          {/* Mission & Vision (Right, smaller) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#F8F9FA] rounded-xl p-10 md:p-12 flex-1 flex flex-col justify-center border border-gray-100 hover:border-gray-300 transition-colors duration-300">
              <CheckCircle2 className="w-8 h-8 text-[#00AB4E] mb-6" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-[#00355D] tracking-[-0.02em] mb-4 leading-none">Our Mission</h3>
              <p className="text-[#575B5F] font-normal leading-[1.5] text-lg">
                Improving healthcare outcomes by supplying world-class medical devices with unmatched professionalism.
              </p>
            </div>

            <div className="bg-[#00355D] rounded-xl p-10 md:p-12 flex-1 flex flex-col justify-center">
              <ShieldCheck className="w-8 h-8 text-[#12B5CB] mb-6" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-white tracking-[-0.02em] mb-4 leading-none">Our Vision</h3>
              <p className="text-white/80 font-normal leading-[1.5] text-lg">
                To lead the future of medical technology by making advanced surgical and hospital equipment accessible to every healthcare professional.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-gray-200 pt-32">
        <div className="max-w-3xl mb-20">
          <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-4">Commitment to Excellence</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#00355D] tracking-[-0.03em] leading-[1.1] mb-6">Why Choose Healing Technology?</h2>
          <p className="text-xl text-[#575B5F] font-normal leading-[1.5]">We support healthcare providers with end-to-end medical equipment solutions built on quality, transparency, and relentless engineering support.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {[
            {
              icon: Network,
              title: "Global Import Network",
              desc: "Strategic partnerships with leading manufacturers from the USA, Europe, and Asia."
            },
            {
              icon: ShieldCheck,
              title: "Quality Assurance",
              desc: "All products undergo strict inspection to ensure they meet local health standards and safety regulations."
            },
            {
              icon: Wrench,
              title: "Technical Support",
              desc: "Dedicated team of engineers providing expert installation and dependable after-sales maintenance."
            },
            {
              icon: Clock,
              title: "Reliability",
              desc: "Proven track record of timely delivery and a deep understanding of the clinical needs of healthcare professionals."
            }
          ].map((feat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex flex-col"
            >
              <feat.icon className="w-8 h-8 text-[#00355D] mb-6" strokeWidth={1} />
              <h3 className="text-xl font-bold text-[#00355D] tracking-tight mb-3 leading-none">{feat.title}</h3>
              <p className="text-base text-[#575B5F] leading-[1.5] font-normal">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
