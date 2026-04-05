import { motion } from "motion/react";
import { CheckCircle2, Shield, HeartPulse } from "lucide-react";

export function About() {
  return (
    <div className="w-full bg-white font-['Arimo'] tracking-tight">
      {/* Hero Section */}
      <section className="bg-[#00355D] text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-['Arimo'] text-4xl md:text-5xl lg:text-6xl font-medium mb-6 tracking-tighter leading-tight">
              Engineering Trust in Healthcare.
            </h1>
            <p className="text-xl text-gray-300 leading-tight font-normal">
              Healing Technology was founded on a singular commitment: bridging the vast gap between rapid global medical innovation and the day-to-day realities faced by local healthcare providers in Bangladesh.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Corporate Vision & Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-['Arimo'] text-3xl md:text-4xl font-medium text-[#00355D] mb-6 tracking-tighter">
                Our Corporate Vision
              </h2>
              <div className="space-y-6 text-lg text-[#575B5F] leading-tight font-normal">
                <p>
                  In a country where healthcare demands are rapidly evolving, ensuring uninterrupted access to life-saving technologies is not just a business metric—it is a profound societal responsibility.
                </p>
                <p>
                  Under the leadership of our Managing Director, Md. Rokibul Islam Nirob, we operate on the fundamental belief that the right equipment in the right hands saves lives. By importing world-class OT solutions and backing them with rigorous quality assurance, we empower surgeons to operate with uncompromised precision.
                </p>
                <p>
                  We aim to reduce the systemic strain on overburdened tertiary hospitals by ensuring provincial clinics and major urban trauma centers alike have reliable, 24/7 access to the tools they need.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1565688527174-775059ac429c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Healing Technology Corporate Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl hidden md:block border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#12B5CB]/10 rounded-full flex items-center justify-center text-[#12B5CB]">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-['Arimo'] font-medium text-[#00355D] tracking-tighter">Decades of Trust</div>
                    <div className="text-sm text-[#575B5F] font-normal">Reliable B2B Partner</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Societal Contribution CSR */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-['Arimo'] text-3xl md:text-4xl font-medium text-[#00355D] mb-6 tracking-tighter">
              Societal Contribution
            </h2>
            <p className="text-lg text-[#575B5F] font-normal leading-tight">
              Addressing the macroeconomic health challenges of Bangladesh through technological reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[#00AB4E]/10 rounded-lg flex items-center justify-center text-[#00AB4E] mb-6">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-['Arimo'] text-xl font-medium text-[#111111] mb-3 tracking-tighter">Tackling NCDs</h3>
              <p className="text-[#575B5F] text-sm leading-tight font-normal">
                As non-communicable diseases escalate, our advanced diagnostic and surgical tools provide the precision necessary for complex cardiovascular and oncological procedures.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[#12B5CB]/10 rounded-lg flex items-center justify-center text-[#12B5CB] mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-['Arimo'] text-xl font-medium text-[#111111] mb-3 tracking-tighter">Preventing Downtime</h3>
              <p className="text-[#575B5F] text-sm leading-tight font-normal">
                Equipment failure forces vulnerable families into financial distress. Our 24/7 dedicated engineering teams prevent catastrophic downtime, ensuring care continuity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[#00355D]/10 rounded-lg flex items-center justify-center text-[#00355D] mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-['Arimo'] text-xl font-medium text-[#111111] mb-3 tracking-tighter">Elevating Standards</h3>
              <p className="text-[#575B5F] text-sm leading-tight font-normal">
                By maintaining strict DGDA compliance and sourcing only from global leaders, we elevate the baseline standard of medical technology deployed across the nation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}