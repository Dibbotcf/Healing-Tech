"use client";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, UserCheck, Mail } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#00355D] text-white pt-[88px] pb-16 md:pt-[96px] md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <p className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.1em] mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-[-0.04em]">Privacy Policy</h1>
            <p className="text-lg text-white/70 max-w-2xl">How we collect, use, and safeguard your personal information.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[900px] -mt-8 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-[2px]  border border-gray-100 p-8 lg:p-12 space-y-10">

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#12B5CB]" />
              <h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Our Commitment</h2>
            </div>
            <p className="text-[#575B5F] leading-relaxed">At Healing Technology (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), your privacy is our priority. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or engage with our services, in compliance with the laws of Bangladesh, including the Cyber Security Act, 2023.</p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-[#12B5CB]" />
              <h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-[#575B5F] leading-relaxed">
              <p><strong className="text-[#111]">Personal Information:</strong> When you request a quote, place an order, or contact us, we may collect your name, hospital/clinic name, designation, email address, phone number, and delivery address.</p>
              <p><strong className="text-[#111]">Non-Personal Information:</strong> We may collect technical data such as your IP address, browser type, and interaction with our website to improve user experience.</p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-[#12B5CB]" />
              <h2 className="text-2xl font-bold text-[#00355D] tracking-tight">How We Use Your Information</h2>
            </div>
            <ul className="space-y-3 text-[#575B5F] leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-[#12B5CB] mt-1">•</span>To process orders, provide technical support, and fulfill warranty obligations.</li>
              <li className="flex items-start gap-2"><span className="text-[#12B5CB] mt-1">•</span>To send administrative information, such as order confirmations and policy updates.</li>
              <li className="flex items-start gap-2"><span className="text-[#12B5CB] mt-1">•</span>To respond to your inquiries and provide customer service.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-[#12B5CB]" />
              <h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Data Security and Sharing</h2>
            </div>
            <p className="text-[#575B5F] leading-relaxed">We implement appropriate technical and organizational measures to protect your data against unauthorized access. We do not sell or rent your personal information to third parties. We may share your details only with trusted partners (such as delivery and logistics services in Bangladesh) strictly for order fulfillment, or when required by Bangladeshi law enforcement agencies.</p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-[#12B5CB]" />
              <h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Your Rights</h2>
            </div>
            <p className="text-[#575B5F] leading-relaxed">You have the right to request access to, correction of, or deletion of your personal data stored by us. To exercise these rights, please contact us at <a href="mailto:heal.tech36@gmail.com" className="text-[#12B5CB] hover:underline font-semibold">heal.tech36@gmail.com</a>.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
