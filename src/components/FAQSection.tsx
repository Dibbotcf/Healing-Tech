"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Do you provide installation and post-sales maintenance?",
    answer:
      "Absolutely. Healing Technology stands by an unwavering commitment of 24/7 engineering support. Our globally trained technicians handle end-to-end installation, calibration, and provide ongoing comprehensive post-sales service across Bangladesh to ensure zero downtime.",
  },
  {
    question: "Are your medical equipments internationally certified?",
    answer:
      "Yes. Every piece of equipment we import is backed by rigorous global certifications including CE, ISO, and FDA standards where applicable, ensuring absolute clinical precision and uncompromised patient safety.",
  },
  {
    question: "How do you handle urgent spare part replacements?",
    answer:
      "We maintain a robust, localized inventory of critical spare parts at our Dhaka headquarters. In the event of failure, our rapid-response team is dispatched immediately to replace parts and restore operational continuity within hours.",
  },
  {
    question: "Do you assist with healthcare facility planning and OT setup?",
    answer:
      "We transcend just selling equipment. Our team provides comprehensive macro-level consultancy for modular Operating Theaters (OT) and Intensive Care Units (ICU), covering architectural planning, medical gas pipelines, and equipment zoning.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#ffffff]">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1000px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-['Inter'] font-bold text-[#00355D] mb-6 tracking-tight"
          >
            Frequently Asked <span className="text-[#12B5CB]">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            Transparent answers to common inquiries about our operations, equipment quality, and localized support framework.
          </motion.p>
        </div>

        {/* Webflow Style Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className={`border border-gray-200 rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? "bg-[#F8F9FA] border-[#12B5CB]/30" : "bg-white hover:bg-gray-50"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex justify-between items-center focus:outline-none"
                >
                  <span className={`text-lg md:text-xl font-bold font-['Inter'] tracking-tight pr-8 transition-colors duration-300 ${isOpen ? "text-[#00355D]" : "text-gray-800"}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-[#12B5CB] text-white" : "bg-gray-100 text-[#00355D]"}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-8 md:px-8 md:pb-8 pt-0 text-base md:text-lg text-gray-600 leading-relaxed max-w-[85%]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
