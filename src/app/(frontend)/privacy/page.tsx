"use client";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-white font-['Inter'] tracking-tight pb-32">
      {/* ── HEADER ── */}
      <section className="pt-[160px] pb-16 px-6 lg:px-8 max-w-[900px] mx-auto border-b border-gray-200 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-6">Legal Information</p>
          <h1 className="font-['Inter'] text-5xl md:text-6xl font-bold mb-6 tracking-[-0.03em] leading-[1.05] text-[#00355D]">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-[#575B5F] leading-[1.4] font-normal">
            How we collect, use, and safeguard your personal information.
          </p>
        </motion.div>
      </section>

      {/* ── CONTENT ── */}
      <section className="px-6 lg:px-8 max-w-[900px] mx-auto text-[#575B5F] leading-[1.7] text-lg font-normal">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-16">

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">1. Our Commitment</h2>
            <p className="mb-4">
              At Healing Technology (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), your privacy is our priority. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or engage with our services, in compliance with the laws of Bangladesh, including the Cyber Security Act, 2023.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">2. Information We Collect</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#111] mb-2 leading-none">Personal Information</h3>
                <p>When you request a quote, place an order, or contact us, we may collect your name, hospital/clinic name, designation, email address, phone number, and delivery address.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111] mb-2 leading-none">Non-Personal Information</h3>
                <p>We may collect technical data such as your IP address, browser type, and interaction with our website to improve user experience.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-3 marker:text-[#12B5CB]">
              <li>To process orders, provide technical support, and fulfill warranty obligations.</li>
              <li>To send administrative information, such as order confirmations and policy updates.</li>
              <li>To respond to your inquiries and provide customer service.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">4. Data Security and Sharing</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data against unauthorized access. We do not sell or rent your personal information to third parties. We may share your details only with trusted partners (such as delivery and logistics services in Bangladesh) strictly for order fulfillment, or when required by Bangladeshi law enforcement agencies.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">5. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal data stored by us. To exercise these rights, please contact us at <a href="mailto:heal.tech36@gmail.com" className="text-[#12B5CB] hover:text-[#00355D] transition-colors font-semibold border-b border-[#12B5CB] hover:border-[#00355D] pb-0.5 inline-flex">heal.tech36@gmail.com</a>.
            </p>
          </div>

        </motion.div>
      </section>
    </div>
  );
}
