"use client";

import dynamic from "next/dynamic";

const TestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
  { ssr: false },
);

const FAQSection = dynamic(
  () => import("@/components/FAQSection").then((m) => ({ default: m.FAQSection })),
  { ssr: false },
);

export function HomeClosing() {
  return (
    <>
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
