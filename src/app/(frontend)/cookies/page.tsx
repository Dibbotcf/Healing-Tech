"use client";
import { motion } from "framer-motion";

export default function CookiePolicyPage() {
  return (
    <div className="w-full bg-white font-['Inter'] tracking-tight pb-32">
      {/* ── HEADER ── */}
      <section className="pt-[160px] pb-16 px-6 lg:px-8 max-w-[900px] mx-auto border-b border-gray-200 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-6">Legal Information</p>
          <h1 className="font-['Inter'] text-5xl md:text-6xl font-bold mb-6 tracking-[-0.03em] leading-[1.05] text-[#00355D]">
            Cookie Policy
          </h1>
          <p className="text-xl md:text-2xl text-[#575B5F] leading-[1.4] font-normal">
            Understanding how we use cookies to improve your browsing experience.
          </p>
        </motion.div>
      </section>

      {/* ── CONTENT ── */}
      <section className="px-6 lg:px-8 max-w-[900px] mx-auto text-[#575B5F] leading-[1.7] text-lg font-normal">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-16">

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit our website. They help us recognize your browser, remember your preferences, and understand how you interact with our content.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">2. Types of Cookies We Use</h2>
            <div className="space-y-8 mt-8">
              {[
                { title: "Essential Cookies", desc: "Required for the website to function properly. These include session management cookies and security tokens. They cannot be disabled." },
                { title: "Analytics Cookies", desc: "Help us understand how visitors use our website so we can improve content and user experience. These cookies collect anonymized data about page visits and interactions." },
                { title: "Preference Cookies", desc: "Remember your language, region, and product browsing preferences for a personalized experience when you return to our site." },
              ].map((cookie, i) => (
                <div key={i} className="border-l-2 border-[#12B5CB] pl-6 py-2">
                  <h3 className="text-xl font-bold text-[#111] mb-2 leading-none">{cookie.title}</h3>
                  <p className="m-0 text-[#575B5F] text-base">{cookie.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">3. Managing Your Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings. Most modern browsers allow you to refuse or delete cookies. However, please note that disabling certain cookies may impact the functionality of our website.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#00355D] tracking-tight mb-6 leading-none">4. Third-Party Cookies</h2>
            <p>
              We do not allow third-party advertising cookies on our website. Any third-party services we use (such as analytics providers) are bound by their own privacy and cookie policies. We regularly review our third-party partners to ensure they maintain appropriate data protection standards.
            </p>
          </div>

          <div className="bg-[#F8F9FA] rounded-xl p-8 border border-gray-200 mt-20">
            <p className="text-base text-[#575B5F] m-0 leading-[1.6]">
              For questions about our cookie practices, contact us at <a href="mailto:heal.tech36@gmail.com" className="text-[#12B5CB] hover:text-[#00355D] transition-colors font-semibold border-b border-[#12B5CB] hover:border-[#00355D] pb-0.5 inline-flex">heal.tech36@gmail.com</a>.
            </p>
          </div>

        </motion.div>
      </section>
    </div>
  );
}
