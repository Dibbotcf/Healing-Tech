"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageSquare, HeadphonesIcon, BookOpen, Building2, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ContactMap = dynamic(() => import("@/components/ContactMap"), { ssr: false });
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const faqs = [
  { q: "How do I request a quotation for medical equipment?", a: "You can fill in the inquiry form above, call us directly at +88 01675 292991, or email info@healingtech.com.bd. Our sales engineering team will respond within 24 hours." },
  { q: "Do you provide after-sales support for all equipment?", a: "Yes. All equipment supplied by Healing Technology is backed by our dedicated biomedical engineering team, including warranty, preventive maintenance contracts, and emergency on-site support." },
  { q: "Are the products DGDA certified?", a: "All equipment we import and distribute is sourced from internationally accredited manufacturers and is compliant with Bangladesh DGDA regulations." },
  { q: "Can I get product demonstrations before purchasing?", a: "Yes — we arrange live product demonstrations for hospitals and clinics. Contact our sales team to schedule a session at your facility." },
];

export default function Contact() {
  const [formData, setFormData] = useState({ fullName: "", role: "", hospital: "", email: "", phone: "", requirements: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ fullName: "", role: "", hospital: "", email: "", phone: "", requirements: "" });
      } else { setSubmitStatus("error"); }
    } catch { setSubmitStatus("error"); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-white font-['Inter'] tracking-tight">

      {/* ── HERO SECTION ── */}
      <section className="bg-[#EEF4FB] pt-32 md:pt-[120px] pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-4 md:mt-0">

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-['Inter'] text-4xl md:text-6xl font-bold text-[#00355D] tracking-tighter mb-4 leading-tight">
                Contact Us
              </h1>
              <p className="text-base md:text-lg text-[#575B5F] mb-6 font-normal leading-relaxed max-w-sm">
                Email, call, or complete the form to learn how Healing Technology can serve your facility.
              </p>
              <div className="space-y-2 mb-6">
                <a href="mailto:info@healingtech.com.bd" className="flex items-center gap-2 text-[#00355D] font-semibold hover:underline text-sm">
                  <Mail className="w-4 h-4 text-[#12B5CB]" /> info@healingtech.com.bd
                </a>
                <a href="tel:+8801675292991" className="flex items-center gap-2 text-[#00355D] font-semibold hover:underline text-sm">
                  <Phone className="w-4 h-4 text-[#12B5CB]" /> +88 01675 292991
                </a>
              </div>
              {/* Text Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                {[
                  { title: "Technical Support", desc: "Our biomedical engineers are on standby 24/7 to resolve equipment breakdowns and handle urgent servicing." },
                  { title: "Clinical Onboarding", desc: "We provide comprehensive operational training to ensure your medical staff masters the equipment on day one." },
                  { title: "Sales & Procurement", desc: "Request tailored equipment quotations, or arrange live product demonstrations for your medical facility." },
                ].map((col, i) => (
                  <div key={i} className="flex flex-col">
                    <h3 className="text-[15px] font-bold text-[#00355D] mb-2 leading-tight">{col.title}</h3>
                    <p className="text-[13px] text-[#575B5F] leading-[1.6] font-normal">{col.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — form card */}
            <motion.div id="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#00355D] mb-1 tracking-tight">Get in Touch</h2>
                <p className="text-sm text-[#575B5F] mb-6 font-normal">You can reach us anytime</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-[#575B5F]">Full Name *</Label>
                      <Input placeholder="Dr. Tariqur Rahman" required value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="text-sm rounded-xl" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-[#575B5F]">Clinical Role *</Label>
                      <Input placeholder="Director / Head of Department" required value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="text-sm rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-[#575B5F]">Hospital / Facility *</Label>
                    <Input placeholder="Square Hospitals Ltd." required value={formData.hospital}
                      onChange={(e) => setFormData({ ...formData, hospital: e.target.value })} className="text-sm rounded-xl" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-[#575B5F]">Email *</Label>
                    <Input type="email" placeholder="tariqur@squarehospital.com" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="text-sm rounded-xl" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-[#575B5F]">Phone *</Label>
                    <Input type="tel" placeholder="+880 1711 ..." required value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="text-sm rounded-xl" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-[#575B5F]">How can we help? <span className="text-gray-400 font-normal">(optional)</span></Label>
                    <Textarea placeholder="Please specify the machines, quantities, and your facility type..." rows={4}
                      className="resize-none text-sm rounded-xl" value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} />
                  </div>

                  <Button type="submit" disabled={isSubmitting}
                    className="w-full bg-[#00355D] hover:bg-[#12B5CB] text-white font-bold py-3 h-auto rounded-full text-sm transition-all duration-300">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>

                  {submitStatus === "success" && (
                    <p className="text-green-600 font-medium text-center text-sm">✓ Inquiry submitted! We'll respond within 24 hours.</p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-600 font-medium text-center text-sm">Something went wrong. Please try again.</p>
                  )}

                  <p className="text-[11px] text-[#575B5F] text-center leading-relaxed font-normal">
                    By contacting us, you agree to our{" "}
                    <Link href="/terms" className="font-bold text-[#00355D] hover:underline">Terms of Service</Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-bold text-[#00355D] hover:underline">Privacy Policy</Link>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAP + LOCATION ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Map */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="w-full h-[400px] rounded-[32px] overflow-hidden border border-gray-200 relative bg-[#f8f9fa]">
                <ContactMap />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-16 z-10 bg-white p-5 rounded-2xl shadow-xl w-[260px] pointer-events-auto">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="bg-[#00355D] w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden relative">
                          <Image src="/location.png" alt="logo" fill className="object-cover" />
                       </div>
                       <div>
                         <p className="font-bold text-sm text-[#00355D] leading-tight">Healing Technology</p>
                         <p className="text-[10px] text-[#575B5F]">Your Trusted Partner</p>
                       </div>
                    </div>
                    <p className="text-xs font-bold text-[#00355D] mt-4">Dhaka, Bangladesh</p>
                    <p className="text-[11px] text-[#575B5F] mt-1 mb-4">14/2 Topkhana Road</p>
                    <a href="https://maps.app.goo.gl/NfU877HUg3ktpMaX7" target="_blank" className="text-[11px] font-bold text-[#00355D] flex items-center gap-1 hover:text-[#12B5CB] transition-colors">
                      Open Google Maps <span className="text-[14px]">›</span>
                    </a>
                </div>
              </div>
            </motion.div>

            {/* Location info */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00355D] tracking-tighter mb-8 leading-tight">
                Connecting Near<br />and Far
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#00355D] mb-3">Headquarters</h3>
                  <div className="space-y-1 text-sm text-[#575B5F] font-normal">
                    <p>Healing Technology Ltd.</p>
                    <p className="flex items-start gap-2"><MapPin className="w-4 h-4 text-[#12B5CB] mt-0.5 shrink-0" />
                      Ansari Bhaban (Ground Floor), 14/2 Topkhana Road, Paltan, Dhaka-1000, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <p className="text-xs text-[#575B5F] font-normal mb-1">Sales & General</p>
                    <a href="tel:+8801675292991" className="text-sm font-bold text-[#00355D] hover:text-[#12B5CB] transition-colors">+88 01675 292991</a>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs text-[#575B5F] font-normal mb-1">Email</p>
                    <a href="mailto:info@healingtech.com.bd" className="text-sm font-bold text-[#00355D] hover:text-[#12B5CB] transition-colors break-all">info@healingtech.com.bd</a>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#EEF4FB]">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left label */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.1em] mb-3">FAQ</p>
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
                    {openFaq === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-sm text-[#575B5F] font-normal leading-relaxed mt-3"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
