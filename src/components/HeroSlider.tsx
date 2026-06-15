"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    src: "/figma-assets/39874e1a514d8a3f83c95d2fb9c7db3c89ab86f0.png",
    alt: "Surgeons in a modern operation theater",
    headline: "Empowering Bangladesh Healthcare with Precision Clinical Solutions.",
    sub: "Internationally certified medical devices delivered directly to your facility.",
  },
  {
    src: "/figma-assets/hero-slide-2.jpg",
    alt: "Advanced LED shadowless operating lamp",
    headline: "World-Class Operating Theater Equipment for Every Surgical Need.",
    sub: "Sourced directly from ISO-certified manufacturers across Germany, China & Korea.",
  },
  {
    src: "/figma-assets/hero-slide-3.jpg",
    alt: "Patient monitoring in ICU",
    headline: "Keeping Bangladesh ICUs Running 24/7 with Critical Care Devices.",
    sub: "Ventilators, monitors, anaesthesia machines — always in stock, always compliant.",
  },
  {
    src: "/figma-assets/hero-slide-4.jpg",
    alt: "Diagnostic imaging equipment",
    headline: "Precision Diagnostics That Give Doctors the Answers They Need.",
    sub: "Ultrasound, hematology analysers, bio-chemistry systems and more.",
  },
  {
    src: "/figma-assets/hero-slide-5.jpg",
    alt: "Biomedical engineer servicing equipment",
    headline: "After-Sales Support You Can Count On — Day or Night.",
    sub: "Manufacturer-trained engineers on call with genuine OEM spare parts.",
  },
];

// Fallback: if custom slides can't load, reuse the original hero image
const FALLBACK_SRC = "/figma-assets/39874e1a514d8a3f83c95d2fb9c7db3c89ab86f0.png";

interface Slide {
  src: string;
  alt: string;
  headline: string;
  sub: string;
}

function SlideImage({ slide, isFirst }: { slide: Slide; isFirst: boolean }) {
  const [errored, setErrored] = useState(false);
  const src = errored ? FALLBACK_SRC : slide.src;
  return (
    <Image
      src={src}
      alt={slide.alt}
      fill
      sizes="100vw"
      quality={85}
      priority={isFirst}
      className="object-cover"
      onError={() => setErrored(true)}
    />
  );
}

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const goTo = (i: number) => setCurrent(i);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <SlideImage slide={slides[current]} isFirst={current === 0} />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay — same as before */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00355D]/95 via-[#00355D]/35 to-[#00355D]/25 pointer-events-none" />

      {/* Dynamic Text Overlay — bottom-left aligned */}
      <div className="absolute inset-0 flex items-end z-10 pointer-events-none pb-24 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-white pointer-events-auto"
            >
              <h1 className="font-['Inter'] text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-normal leading-[1.1] tracking-tight mb-8 text-white text-balance">
                {slides[current].headline}
              </h1>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <Link
                  href="/products"
                  className="bg-[#12B5CB] hover:bg-[#009EE2] text-white px-6 py-3.5 md:px-8 md:py-4 rounded-xl text-[15px] md:text-base font-bold transition-all hover:scale-105 inline-flex justify-center flex-1 sm:flex-none items-center gap-2"
                >
                  Explore Product Catalog
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3.5 md:px-8 md:py-4 rounded-xl text-[15px] md:text-base font-bold transition-all inline-flex justify-center flex-1 sm:flex-none"
                >
                  Speak to an Expert
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot indicators — bottom left */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-7 h-2.5 bg-[#12B5CB]"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-10">
          <motion.div
            key={`progress-${current}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-[#12B5CB]/60"
          />
        </div>
      )}
    </div>
  );
}
