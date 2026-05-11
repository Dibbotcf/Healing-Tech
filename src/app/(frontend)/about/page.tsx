"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Network, Wrench, Clock, CheckCircle2, TrendingUp, HeartPulse, Building2, Activity } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <div className="w-full bg-white font-['Inter'] tracking-tight pb-32">
      {/* ── HERO ── */}
      <section className="relative w-full pt-32 pb-16 md:pt-[160px] md:pb-32 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/about-hero-bg.jpg" 
            alt="Medical Facility Background" 
            fill 
            className="object-cover object-center md:object-right" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 md:via-white/50 to-white/30 md:to-transparent" />
        </div>
        
        <div className="px-6 lg:px-8 max-w-[1440px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl lg:max-w-4xl">
            <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-6">About Us</p>
            <h1 className="font-['Inter'] text-4xl md:text-[80px] font-bold mb-6 md:mb-8 tracking-[-0.04em] leading-tight md:leading-[1.05] text-[#00355D]">
              Engineering Trust <br className="hidden md:block" /> in Healthcare.
            </h1>
            <p className="text-lg md:text-2xl text-[#575B5F] leading-relaxed md:leading-[1.4] font-normal max-w-2xl">
              Healing Technology is a premier medical equipment importer and supplier. We bridge the gap between global medical innovation and local healthcare providers by sourcing high-standard hospital products and clinical equipment from world-class manufacturers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MD MESSAGE & MISSION/VISION ── */}
      <section className="px-6 lg:px-8 max-w-[1440px] mx-auto pt-16 md:pt-24 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* MD Message (Left, larger) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Premium MD Message Card */}
            <div className="relative bg-[#00355D] rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
              {/* Decorative background rings */}
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/5" />
              <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full border border-white/5" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#12B5CB]/5" />

              {/* Top label */}
              <p className="text-[#12B5CB] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Message from the Managing Director</p>

              {/* Giant decorative quote mark */}
              <div className="text-[#12B5CB]/20 text-[120px] leading-none font-serif absolute top-6 left-8 select-none pointer-events-none">&ldquo;</div>

              {/* Quote text */}
              <blockquote className="relative z-10 text-white/90 text-lg md:text-xl leading-[1.7] font-light tracking-normal mt-6">
                At Healing Technology, we believe that the right equipment in the right hands saves lives. Our journey began with a simple commitment: to bridge the gap between global medical innovation and our local healthcare providers. By importing only the most reliable OT and hospital solutions, we empower surgeons and medical staff to perform at their best.
                <br /><br />
                We don&apos;t just supply machines — we provide the precision and reliability that patient care demands. Thank you for trusting us as your partner in health.
              </blockquote>

              {/* Divider */}
              <div className="w-16 h-px bg-[#12B5CB]/40 my-8" />

              {/* Signature area */}
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  {/* Teal accent ring */}
                  <div className="absolute inset-0 rounded-full ring-2 ring-[#12B5CB] ring-offset-2 ring-offset-[#00355D]" />
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10">
                    <Image
                      src="/md-nirob.jpg"
                      alt="Md. Rokibul Islam Nirob"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-white text-lg font-bold tracking-tight leading-tight mb-1">Md. Rokibul Islam Nirob</h2>
                  <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em]">Managing Director</p>
                  <p className="text-white/40 text-xs mt-0.5">Healing Technology</p>
                </div>
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

      {/* ── THE HEALTHCARE LANDSCAPE ── */}
      <section className="px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-gray-200 pt-32 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-4">Macroeconomic Context</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#00355D] tracking-[-0.03em] leading-[1.1] mb-6">Equipping a Rapidly Growing Ecosystem.</h2>
            <p className="text-xl text-[#575B5F] font-normal leading-[1.5] mb-6">
              The medical equipment sector in Bangladesh is undergoing a profound transformation. With over 5,000 public and private hospitals, the ecosystem faces rising demand for advanced diagnostic and critical care tools due to epidemiological shifts.
            </p>
            <p className="text-lg text-[#575B5F] font-normal leading-[1.5]">
              Healing Technology operates precisely at this intersection. We are scaling our import capacity to meet the demands of a modernized infrastructure, preventing technological bottlenecks in regional and tertiary healthcare centers.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="bg-[#F8F9FA] rounded-xl p-8 border border-gray-100 flex flex-col justify-center">
               <Building2 className="w-8 h-8 text-[#12B5CB] mb-4" />
               <h4 className="text-3xl font-bold text-[#00355D] mb-2 tracking-tight">5,000+</h4>
               <p className="text-sm text-[#575B5F] font-medium uppercase tracking-wider">Hospitals Nationwide</p>
             </div>
             <div className="bg-[#F8F9FA] rounded-xl p-8 border border-gray-100 flex flex-col justify-center">
               <Activity className="w-8 h-8 text-[#12B5CB] mb-4" />
               <h4 className="text-3xl font-bold text-[#00355D] mb-2 tracking-tight">14 Billion</h4>
               <p className="text-sm text-[#575B5F] font-medium uppercase tracking-wider">Expected Healthcare Spend (USD)</p>
             </div>
             <div className="bg-[#00355D] rounded-xl p-8 flex flex-col justify-center sm:col-span-2">
               <TrendingUp className="w-8 h-8 text-[#00AB4E] mb-4" />
               <h4 className="text-xl font-bold text-white mb-2 tracking-tight">Systematic Modernization</h4>
               <p className="text-white/80 font-normal leading-snug">Aligning with the Eighth Five-Year Plan of Bangladesh for hospital infrastructure and precision surgical enablement.</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ── OUR SOCIETAL CONTRIBUTION ── */}
      <section className="bg-[#F8F9FA] py-32 border-y border-gray-200 mb-32">
        <div className="px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <HeartPulse className="w-12 h-12 text-[#00AB4E] mx-auto mb-8" strokeWidth={1.5} />
          <h2 className="text-4xl md:text-5xl font-bold text-[#00355D] tracking-[-0.03em] leading-[1.1] mb-8">Our Societal Contribution</h2>
          <p className="text-xl md:text-2xl text-[#575B5F] font-normal leading-[1.6]">
            In a country where out-of-pocket expenses account for a staggering 74% of all health expenditures, equipment downtime or misdiagnosis forces vulnerable families into severe financial distress.
          </p>
          <div className="w-24 h-px bg-gray-300 mx-auto my-10" />
          <p className="text-lg md:text-xl text-[#111111] font-medium leading-[1.6]">
            By importing hyper-reliable OT solutions and backing them with relentless 24/7 engineering support, we empower surgeons to operate with uncompromised precision. We ensure that provincial clinics and major urban trauma centers can provide uninterrupted, life-saving care.
          </p>
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
