import type { Metadata } from "next";
import "../globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

export const metadata: Metadata = {
  title: "Healing Technology | Your Trusted Medical Equipment Partner",
  description: "Empowering Bangladesh Healthcare with Precision Clinical Solutions. Importing world-class OT, ICU, and surgical equipment—backed by unwavering 24/7 engineering support.",
  keywords: "medical equipment, Bangladesh, surgical lights, anesthesia machines, hospital beds, OT lights, Healing Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-[#F8F9FA] text-[#111111] tracking-tight flex flex-col font-['Inter']">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppFAB />
        </div>
      </body>
    </html>
  );
}
