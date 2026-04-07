"use client";
import { motion } from "framer-motion";
import { Cookie, Settings, BarChart, Shield } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#00355D] text-white pt-[88px] pb-16 md:pt-[96px] md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <p className="text-[#12B5CB] text-sm font-bold uppercase tracking-[0.1em] mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-[-0.04em]">Cookie Policy</h1>
            <p className="text-lg text-white/70 max-w-2xl">Understanding how we use cookies to improve your browsing experience.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[900px] -mt-8 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-[2px]  border border-gray-100 p-8 lg:p-12 space-y-10">

          <section>
            <div className="flex items-center gap-3 mb-4"><Cookie className="w-6 h-6 text-[#12B5CB]" /><h2 className="text-2xl font-bold text-[#00355D] tracking-tight">What Are Cookies?</h2></div>
            <p className="text-[#575B5F] leading-relaxed">Cookies are small text files placed on your device when you visit our website. They help us recognize your browser, remember your preferences, and understand how you interact with our content.</p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4"><Settings className="w-6 h-6 text-[#12B5CB]" /><h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Types of Cookies We Use</h2></div>
            <div className="space-y-4">
              {[
                { title: "Essential Cookies", desc: "Required for the website to function properly. These include session management cookies and security tokens. They cannot be disabled." },
                { title: "Analytics Cookies", desc: "Help us understand how visitors use our website so we can improve content and user experience. These cookies collect anonymized data about page visits and interactions." },
                { title: "Preference Cookies", desc: "Remember your language, region, and product browsing preferences for a personalized experience when you return to our site." },
              ].map((cookie, i) => (
                <div key={i} className="bg-[#F8F9FA] rounded-[2px] p-5 border border-gray-100">
                  <h3 className="font-bold text-[#00355D] mb-1">{cookie.title}</h3>
                  <p className="text-sm text-[#575B5F] leading-relaxed">{cookie.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4"><BarChart className="w-6 h-6 text-[#12B5CB]" /><h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Managing Your Cookies</h2></div>
            <p className="text-[#575B5F] leading-relaxed">You can control and manage cookies through your browser settings. Most modern browsers allow you to refuse or delete cookies. However, please note that disabling certain cookies may impact the functionality of our website.</p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4"><Shield className="w-6 h-6 text-[#12B5CB]" /><h2 className="text-2xl font-bold text-[#00355D] tracking-tight">Third-Party Cookies</h2></div>
            <p className="text-[#575B5F] leading-relaxed">We do not allow third-party advertising cookies on our website. Any third-party services we use (such as analytics providers) are bound by their own privacy and cookie policies. We regularly review our third-party partners to ensure they maintain appropriate data protection standards.</p>
          </section>

          <section className="bg-[#F8F9FA] rounded-[2px] p-6 border border-gray-100">
            <p className="text-sm text-[#575B5F]">For questions about our cookie practices, contact us at <a href="mailto:heal.tech36@gmail.com" className="text-[#12B5CB] hover:underline font-semibold">heal.tech36@gmail.com</a>.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
