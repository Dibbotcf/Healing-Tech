"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Do you provide installation and post-sales maintenance?", a: "Absolutely. Healing Technology stands by an unwavering commitment of 24/7 engineering support. Our globally trained technicians handle end-to-end installation, calibration, and provide ongoing comprehensive post-sales service across Bangladesh to ensure zero downtime." },
  { q: "Are your medical equipments internationally certified?", a: "Yes. Every piece of equipment we import is backed by rigorous global certifications including CE, ISO, and FDA standards where applicable, ensuring absolute clinical precision and uncompromised patient safety." },
  { q: "How do you handle urgent spare part replacements?", a: "We maintain a robust, localized inventory of critical spare parts at our Dhaka headquarters. In the event of failure, our rapid-response team is dispatched immediately to replace parts and restore operational continuity within hours." },
  { q: "Do you assist with healthcare facility planning and OT setup?", a: "We transcend just selling equipment. Our team provides comprehensive macro-level consultancy for modular Operating Theaters (OT) and Intensive Care Units (ICU), covering architectural planning, medical gas pipelines, and equipment zoning." },
];

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#EEF4FB]">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left label */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00355D] tracking-tighter mb-4 leading-tight">
              Do you have any<br />questions for us?
            </h2>
            <p className="text-sm text-[#575B5F] font-normal leading-relaxed max-w-xs">
              If there are questions you want to ask, we will answer all your questions.
            </p>
          </motion.div>

          {/* Right accordion */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left group"
                  >
                    <span className="text-sm font-semibold text-[#00355D] group-hover:text-[#12B5CB] transition-colors">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#575B5F] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-[#575B5F] font-normal leading-relaxed mt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
