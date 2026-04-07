"use client";
import { motion } from "framer-motion";
import { Scale, CreditCard, FileWarning, Gavel, AlertTriangle } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#00355D] text-white pt-[88px] pb-16 md:pt-[96px] md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <p className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.1em] mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-[-0.04em]">Terms &amp; Conditions</h1>
            <p className="text-lg text-white/70 max-w-2xl">By accessing our website or purchasing our equipment, you agree to these terms.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[900px] -mt-8 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-[2px]  border border-gray-100 p-8 lg:p-12 space-y-10">

          <section>
            <div className="flex items-center gap-3 mb-4"><Scale className="w-6 h-6 text-[#12B5CB]" /><h2 className="text-2xl font-bold text-[#00355D] tracking-tight">General Use</h2></div>
            <ul className="space-y-3 text-[#575B5F] leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-[#12B5CB] mt-1">•</span><span><strong className="text-[#111]">Business Entity:</strong> Healing Technology is a registered medical equipment importer and supplier based in Dhaka, Bangladesh.</span></li>
              <li className="flex items-start gap-2"><span className="text-[#12B5CB] mt-1">•</span><span><strong className="text-[#111]">Accuracy of Information:</strong> While we strive to ensure all product specifications, certifications, and images are accurate, we do not warrant that product descriptions are entirely error-free.</span></li>
              <li className="flex items-start gap-2"><span className="text-[#12B5CB] mt-1">•</span><span><strong className="text-[#111]">Eligibility:</strong> You must be at least 18 years old and authorized to purchase medical equipment on behalf of a registered clinic, hospital, or medical professional in Bangladesh.</span></li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4"><CreditCard className="w-6 h-6 text-[#12B5CB]" /><h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Pricing and Payments</h2></div>
            <ul className="space-y-3 text-[#575B5F] leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-[#12B5CB] mt-1">•</span>All prices, quotes, and transactions are processed in Bangladeshi Taka (BDT) unless explicitly stated otherwise.</li>
              <li className="flex items-start gap-2"><span className="text-[#12B5CB] mt-1">•</span>Prices are subject to change without prior notice due to fluctuations in import duties, foreign exchange rates, or manufacturer pricing.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4"><FileWarning className="w-6 h-6 text-[#12B5CB]" /><h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Regulatory Compliance</h2></div>
            <p className="text-[#575B5F] leading-relaxed">All medical devices imported and supplied by Healing Technology comply with the regulations set forth by the Directorate General of Drug Administration (DGDA) of Bangladesh. Buyers are responsible for ensuring that the equipment is operated only by qualified and certified medical personnel.</p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4"><AlertTriangle className="w-6 h-6 text-[#12B5CB]" /><h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Medical &amp; Operational Disclaimer</h2></div>
            <ul className="space-y-3 text-[#575B5F] leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-[#12B5CB] mt-1">•</span>The information on our website is for informational purposes only and not a substitute for professional medical advice.</li>
              <li className="flex items-start gap-2"><span className="text-[#12B5CB] mt-1">•</span>Equipment is intended strictly for use by licensed healthcare professionals and authorized clinical institutions.</li>
              <li className="flex items-start gap-2"><span className="text-[#12B5CB] mt-1">•</span>Routine maintenance and pre-use safety checks are the responsibility of the purchasing hospital or clinic.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4"><Gavel className="w-6 h-6 text-[#12B5CB]" /><h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Return, Refund, and Warranty</h2></div>
            <div className="space-y-4 text-[#575B5F] leading-relaxed">
              <p><strong className="text-[#111]">Warranty:</strong> All major medical equipment comes with a manufacturer&apos;s warranty and local service support. The warranty is void if equipment is tampered with, repaired by unauthorized technicians, or damaged by power surges without stabilizers.</p>
              <p><strong className="text-[#111]">Returns:</strong> Defective products must be reported within 48 hours of delivery. Non-returnable items include breathing circuits, masks, ECG electrodes, and opened sterile consumables.</p>
              <p><strong className="text-[#111]">Refunds:</strong> Refunds are only processed if we fail to deliver within the agreed timeframe. Refunds are issued within 7–14 business days via the original payment method.</p>
            </div>
          </section>

          <section className="bg-[#F8F9FA] rounded-[2px] p-6 border border-gray-100">
            <p className="text-sm text-[#575B5F] leading-relaxed"><strong className="text-[#00355D]">Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh. Disputes shall be subject to the exclusive jurisdiction of Dhaka courts.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
