"use client";

import React from 'react';
import { motion } from "framer-motion";

interface Testimonial {
  id?: string;
  quote: string;
  clientName: string;
  designation?: string;
  hospital?: string;
  avatar?: { url: string; alt?: string } | string | null;
}

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  if (!props.testimonials || props.testimonials.length === 0) return null;
  
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
              {props.testimonials.map(({ quote, avatar, clientName, designation, hospital }, i) => {
                const avatarUrl = avatar && typeof avatar === 'object' && avatar.url 
                  ? avatar.url 
                  : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150";
                  
                return (
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
                    className="p-10 rounded-xl border border-gray-200  shadow-black/5 max-w-xs w-full bg-white transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-[#12B5CB]/30"
                  >
                    <blockquote className="m-0 p-0">
                      <p className="text-[#575B5F] leading-relaxed font-normal m-0" style={{ whiteSpace: 'pre-line' }}>
                        {quote}
                      </p>
                      <footer className="flex items-center gap-3 mt-6">
                        <img
                          width={40}
                          height={40}
                          src={avatarUrl}
                          alt={`Avatar of ${clientName}`}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-[#12B5CB]/30 transition-all duration-300 ease-in-out"
                        />
                        <div className="flex flex-col">
                          <cite className="font-semibold not-italic tracking-tight leading-5 text-[#00355D]">
                            {clientName}
                          </cite>
                          <span className="text-sm leading-5 tracking-tight text-[#575B5F] mt-0.5">
                            {[designation, hospital].filter(Boolean).join(', ')}
                          </span>
                        </div>
                      </footer>
                    </blockquote>
                  </motion.li>
                );
              })}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/x-api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        let docs = data.docs || [];
        // Duplicate if too few to look good in the marquee
        if (docs.length > 0 && docs.length < 6) {
           docs = [...docs, ...docs, ...docs].slice(0, 9);
        }
        setTestimonials(docs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="py-24 bg-white" />; // Placeholder or empty while fetching to avoid layout shift
  }

  if (!loading && testimonials.length === 0) return null;

  const third = Math.ceil(testimonials.length / 3);
  const firstColumn = testimonials.slice(0, third);
  const secondColumn = testimonials.slice(third, third * 2);
  const thirdColumn = testimonials.slice(third * 2);

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
            <div className="border border-gray-300 py-1 px-4 rounded-xl text-xs font-semibold tracking-wide uppercase text-[#575B5F] bg-gray-50">
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
