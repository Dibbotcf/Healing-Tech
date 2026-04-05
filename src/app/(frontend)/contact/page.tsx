"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#00355D] text-white py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <h1 className="font-['Inter'] text-4xl md:text-5xl font-medium mb-4 tracking-tighter">Contact Our Team</h1>
          <p className="text-lg text-gray-300 max-w-2xl font-normal leading-tight">Request a consultative quote, inquire about technical specifications, or request emergency engineering support.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-['Inter'] text-2xl font-medium text-[#00355D] mb-6 tracking-tighter">Request a Quote / Inquiry</h2>
            <form className="space-y-6 font-normal text-sm" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block font-medium text-[#111111] mb-2">Full Name *</label><input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#12B5CB] focus:border-transparent transition-all" placeholder="Dr. John Doe" /></div>
                <div><label className="block font-medium text-[#111111] mb-2">Clinical Role *</label><input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#12B5CB] focus:border-transparent transition-all" placeholder="Chief Surgeon" /></div>
              </div>
              <div><label className="block font-medium text-[#111111] mb-2">Hospital / Facility Name *</label><input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#12B5CB] focus:border-transparent transition-all" placeholder="General Hospital Dhaka" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block font-medium text-[#111111] mb-2">Email *</label><input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#12B5CB] focus:border-transparent transition-all" placeholder="john@hospital.com" /></div>
                <div><label className="block font-medium text-[#111111] mb-2">Phone *</label><input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#12B5CB] focus:border-transparent transition-all" placeholder="+880 ..." /></div>
              </div>
              <div><label className="block font-medium text-[#111111] mb-2">Requirements</label><textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#12B5CB] focus:border-transparent transition-all resize-none" placeholder="Please specify the machines..." /></div>
              <button type="submit" className="w-full bg-[#00355D] hover:bg-[#002542] text-white py-4 rounded-lg font-medium text-base font-['Inter'] transition-colors flex items-center justify-center gap-2 tracking-tight">
                <MessageSquare className="w-5 h-5" /> Submit Inquiry to Sales Engineering
              </button>
            </form>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-[#12B5CB]/10 rounded-lg flex items-center justify-center text-[#12B5CB] mb-4"><Phone className="w-5 h-5" /></div>
                <h3 className="font-['Inter'] font-medium text-[#111111] mb-1 tracking-tighter">General Inquiries</h3>
                <p className="text-[#575B5F] text-sm mb-2 font-normal">Sales and product info</p>
                <div className="font-medium text-[#00355D]">+88 01675 292991</div>
              </div>
              <div className="bg-[#00355D] p-6 rounded-xl shadow-sm text-white">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-[#12B5CB] mb-4"><Phone className="w-5 h-5" /></div>
                <h3 className="font-['Inter'] font-medium mb-1 tracking-tighter">Service & Maintenance</h3>
                <p className="text-gray-300 text-sm mb-2 font-normal">24/7 Rapid Response</p>
                <div className="font-medium text-[#12B5CB]">+88 01898 876703</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
                <div className="w-10 h-10 bg-[#12B5CB]/10 rounded-lg flex items-center justify-center text-[#12B5CB] mb-4"><Mail className="w-5 h-5" /></div>
                <h3 className="font-['Inter'] font-medium text-[#111111] mb-1 tracking-tighter">Email</h3>
                <div className="text-[#575B5F] text-sm font-normal">Primary: <a href="mailto:heal.tech36@gmail.com" className="font-medium text-[#00355D]">heal.tech36@gmail.com</a></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-[#12B5CB]/10 rounded-lg flex items-center justify-center text-[#12B5CB] shrink-0"><MapPin className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-['Inter'] font-medium text-[#111111] mb-1 tracking-tighter">Corporate Headquarters</h3>
                  <p className="text-[#575B5F] text-sm leading-tight font-normal">Ansari Bhaban (Ground Floor)<br/>14/2 Topkhana Road, Paltan<br/>Dhaka-1000, Bangladesh</p>
                </div>
              </div>
              <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.554316900829!2d90.4079836!3d23.7275993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f67341ea25%3A0xc66bb6c4d7d9a8e!2sTopkhana%20Rd%2C%20Dhaka%201000!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" className="absolute inset-0 w-full h-full border-0" allowFullScreen={false} loading="lazy" title="Google Maps"></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
