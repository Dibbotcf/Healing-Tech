"use client";

import React from 'react';
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "When upgrading our critical care capabilities, Healing Technology supplied our facility with the advanced Aeonmed 7200 Anesthesia system. Their profound professionalism—from transparent technical consultation to seamless installation and a comprehensive warranty—proved they are far more than a supplier; they are a truly reliable partner in building hospital infrastructure.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Administration",
    role: "Chairman, Sangu Trauma & General Hospital, Chattogram",
  },
  {
    text: "The technical support team from Healing Technology has been exemplary. They guided us seamlessly through the installation of our new surgical lighting systems and continue to provide proactive maintenance support that keeps our OT running at peak performance.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Dr. Rahman",
    role: "Chief of Surgery, National Medical Center",
  },
  {
    text: "Healing Technology's commitment to quality is unmatched. Every piece of equipment we've sourced through them has met rigorous international standards, giving us full confidence in the safety and performance of our medical infrastructure.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Dr. Nasreen Akter",
    role: "Medical Director, Dhaka General Hospital",
  },
  {
    text: "As a growing healthcare facility, we needed a partner who could scale with us. Healing Technology delivered exactly that—from initial consultation to ongoing service contracts, they've been instrumental in our expansion.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Mr. Karim",
    role: "CEO, Eastern Medical Complex",
  },
  {
    text: "The Heyer Purelit OL9570 surgical lights we purchased have transformed our operating theatre. The clarity, adjustable color temperature, and 70,000-hour LED lifespan make it a genuinely world-class investment.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Dr. Fatima Begum",
    role: "Head of OT, Sylhet Women's Hospital",
  },
  {
    text: "What sets Healing Technology apart is their post-sale engineering support. When we needed emergency maintenance on our ventilator systems, their biomedical team arrived within hours—not days.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ms. Anika Chowdhury",
    role: "Hospital Administrator, Comilla Specialized Hospital",
  },
  {
    text: "We've been sourcing medical pumps and anesthesia machines from Healing Technology for three years. Their genuine spare parts inventory and manufacturer-trained engineers give us peace of mind that our equipment is always in top condition.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Mr. Tanvir Hasan",
    role: "Procurement Director, Central Hospital Group",
  },
  {
    text: "The transparency and professionalism in their supply chain is remarkable. From ISO-certified manufacturers in Germany and South Korea to doorstep delivery in Bangladesh—Healing Technology bridges the global-local gap perfectly.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Dr. Sadia Islam",
    role: "Clinical Director, Rajshahi Medical Foundation",
  },
  {
    text: "Their electrosurgical units from Zerone have been flawless in our surgical procedures. The precision cutting and coagulation capabilities exceeded our expectations, and the after-sales support has been outstanding.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Prof. Dr. Ali",
    role: "Head of Surgery, Khulna Medical College",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-10 rounded-[2px] border border-gray-200  shadow-black/5 max-w-xs w-full bg-white transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-[#12B5CB]/30"
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-[#575B5F] leading-relaxed font-normal m-0">
                      {text}
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-[#12B5CB]/30 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-[#00355D]">
                          {name}
                        </cite>
                        <span className="text-sm leading-5 tracking-tight text-[#575B5F] mt-0.5">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-white py-24 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container px-4 z-10 mx-auto max-w-[1440px]"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
          <div className="flex justify-center">
            <div className="border border-gray-300 py-1 px-4 rounded-[2px] text-xs font-semibold tracking-wide uppercase text-[#575B5F] bg-gray-50">
              Testimonials
            </div>
          </div>

          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-extrabold tracking-tighter mt-6 text-center text-[#00355D]">
            Trusted by Leading Institutions
          </h2>
          <p className="text-center mt-5 text-[#575B5F] text-lg leading-relaxed max-w-sm">
            Discover how hospitals across Bangladesh rely on our expertise for world-class medical infrastructure.
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </motion.div>
    </section>
  );
};
