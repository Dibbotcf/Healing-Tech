"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageSquare, HeadphonesIcon, BookOpen, Building2, ChevronDown } from "lucide-react";
import { Map, Marker } from "pigeon-maps";
import { Button } from "@/components/ui/button";
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
      <section className="bg-[#EEF4FB] pt-[88px] pb-20 md:pt-[100px]">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-['Inter'] text-5xl md:text-6xl font-bold text-[#00355D] tracking-tighter mb-4 leading-tight">
                Contact Us
              </h1>
              <p className="text-lg text-[#575B5F] mb-6 font-normal leading-relaxed max-w-sm">
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
              <Link href="#form" className="text-sm font-semibold text-[#00355D] underline underline-offset-4 hover:text-[#12B5CB] transition-colors">
                Sales Engineering Team →
              </Link>

              {/* 3 category cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                {[
                  { icon: HeadphonesIcon, title: "Customer Support", desc: "Our team is available around the clock to address concerns and queries." },
                  { icon: BookOpen,       title: "FAQs",             desc: "Explore our FAQ section for answers to common questions." },
                  { icon: Building2,      title: "Sales Engineering", desc: "Request a consultative quote or technical briefing from our team." },
                ].map((card, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-[2px] p-5">
                    <card.icon className="w-5 h-5 text-[#12B5CB] mb-3" />
                    <h3 className="text-sm font-bold text-[#00355D] mb-1">{card.title}</h3>
                    <p className="text-xs text-[#575B5F] leading-relaxed font-normal">{card.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — form card */}
            <motion.div id="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="bg-white border border-gray-200 rounded-[2px] p-8">
                <h2 className="text-2xl font-bold text-[#00355D] mb-1 tracking-tight">Get in Touch</h2>
                <p className="text-sm text-[#575B5F] mb-6 font-normal">You can reach us anytime</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-[#575B5F]">Full Name *</Label>
                      <Input placeholder="Dr. John Doe" required value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="text-sm rounded-[2px]" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-[#575B5F]">Clinical Role *</Label>
                      <Input placeholder="Chief Surgeon" required value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="text-sm rounded-[2px]" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-[#575B5F]">Hospital / Facility *</Label>
                    <Input placeholder="General Hospital Dhaka" required value={formData.hospital}
                      onChange={(e) => setFormData({ ...formData, hospital: e.target.value })} className="text-sm rounded-[2px]" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-[#575B5F]">Email *</Label>
                    <Input type="email" placeholder="john@hospital.com" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="text-sm rounded-[2px]" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-[#575B5F]">Phone *</Label>
                    <Input type="tel" placeholder="+880 ..." required value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="text-sm rounded-[2px]" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-[#575B5F]">How can we help? <span className="text-gray-400 font-normal">(optional)</span></Label>
                    <Textarea placeholder="Please specify the machines, quantities, and your facility type..." rows={4}
                      className="resize-none text-sm rounded-[2px]" value={formData.requirements}
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
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="w-full h-[380px] rounded-[2px] overflow-hidden border border-gray-200">
                <Map height={380} defaultCenter={[23.7276, 90.4080]} defaultZoom={16}>
                  <Marker width={50} anchor={[23.7276, 90.4080]} />
                </Map>
              </div>
            </motion.div>

            {/* Location info */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.1em] mb-3">Our Location</p>
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
                  <div className="border border-gray-200 rounded-[2px] p-4">
                    <Phone className="w-4 h-4 text-[#12B5CB] mb-2" />
                    <p className="text-xs text-[#575B5F] font-normal mb-1">Sales & General</p>
                    <a href="tel:+8801675292991" className="text-sm font-bold text-[#00355D] hover:text-[#12B5CB] transition-colors">+88 01675 292991</a>
                  </div>
                  <div className="border border-gray-200 rounded-[2px] p-4">
                    <Mail className="w-4 h-4 text-[#12B5CB] mb-2" />
                    <p className="text-xs text-[#575B5F] font-normal mb-1">Email</p>
                    <a href="mailto:info@healingtech.com.bd" className="text-sm font-bold text-[#00355D] hover:text-[#12B5CB] transition-colors break-all">info@healingtech.com.bd</a>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=23.7276,90.4080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#00355D] hover:text-[#12B5CB] transition-colors"
                >
                  <MapPin className="w-4 h-4" /> Open Google Maps →
                </a>
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
