"use client";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="w-full bg-white font-['Inter'] tracking-tight pb-32">
      {/* ── HEADER ── */}
      <section className="pt-[160px] pb-16 px-6 lg:px-8 max-w-[900px] mx-auto border-b border-gray-200 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-6">Legal Information</p>
          <h1 className="font-['Inter'] text-5xl md:text-6xl font-bold mb-6 tracking-[-0.03em] leading-[1.05] text-[#00355D]">
            Terms & Conditions
          </h1>
          <p className="text-xl md:text-2xl text-[#575B5F] leading-[1.4] font-normal">
            By accessing our website or purchasing our equipment, you agree to these terms.
          </p>
        </motion.div>
      </section>

      {/* ── CONTENT ── */}
      <section className="px-6 lg:px-8 max-w-[900px] mx-auto text-[#575B5F] leading-[1.7] text-lg font-normal">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-16">

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">1. General Use</h2>
            <ul className="list-disc pl-6 space-y-4 marker:text-[#12B5CB]">
              <li><strong className="text-[#111]">Business Entity:</strong> Healing Technology is a registered medical equipment importer and supplier based in Dhaka, Bangladesh.</li>
              <li><strong className="text-[#111]">Accuracy of Information:</strong> While we strive to ensure all product specifications, certifications, and images are accurate, we do not warrant that product descriptions are entirely error-free.</li>
              <li><strong className="text-[#111]">Eligibility:</strong> You must be at least 18 years old and authorized to purchase medical equipment on behalf of a registered clinic, hospital, or medical professional in Bangladesh.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">2. Pricing and Payments</h2>
            <ul className="list-disc pl-6 space-y-4 marker:text-[#12B5CB]">
              <li>All prices, quotes, and transactions are processed in Bangladeshi Taka (BDT) unless explicitly stated otherwise.</li>
              <li>Prices are subject to change without prior notice due to fluctuations in import duties, foreign exchange rates, or manufacturer pricing.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">3. Regulatory Compliance</h2>
            <p>
              All medical devices imported and supplied by Healing Technology comply with the regulations set forth by the Directorate General of Drug Administration (DGDA) of Bangladesh. Buyers are responsible for ensuring that the equipment is operated only by qualified and certified medical personnel.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">4. Medical & Operational Disclaimer</h2>
            <ul className="list-disc pl-6 space-y-4 marker:text-[#12B5CB]">
              <li>The information on our website is for informational purposes only and not a substitute for professional medical advice.</li>
              <li>Equipment is intended strictly for use by licensed healthcare professionals and authorized clinical institutions.</li>
              <li>Routine maintenance and pre-use safety checks are the responsibility of the purchasing hospital or clinic.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">5. Return, Refund, and Warranty</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#111] mb-2 leading-none">Warranty</h3>
                <p>All major medical equipment comes with a manufacturer&apos;s warranty and local service support. The warranty is void if equipment is tampered with, repaired by unauthorized technicians, or damaged by power surges without stabilizers.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111] mb-2 leading-none">Returns</h3>
                <p>Defective products must be reported within 48 hours of delivery. Non-returnable items include breathing circuits, masks, ECG electrodes, and opened sterile consumables.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111] mb-2 leading-none">Refunds</h3>
                <p>Refunds are only processed if we fail to deliver within the agreed timeframe. Refunds are issued within 7–14 business days via the original payment method.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F9FA] rounded-xl p-8 border border-gray-200 mt-20">
            <p className="text-base text-[#575B5F] leading-[1.6]">
              <strong className="text-[#00355D]">Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh. Disputes shall be subject to the exclusive jurisdiction of Dhaka courts.
            </p>
          </div>

        </motion.div>
      </section>
    </div>
  );
}
