import type { Metadata } from "next";
import "../globals.css";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

export const metadata: Metadata = {
  title: "Healing Technology - Leading Medical Equipment supplier in Bangladesh",
  description: "Empowering Bangladesh Healthcare with Precision Clinical Solutions. Importing world-class OT, ICU, and surgical equipment—backed by unwavering 24/7 engineering support.",
  keywords: "medical equipment supplier Bangladesh, surgical lights, anesthesia machines, hospital beds, OT lights, direct medical import Dhaka, ICU equipment Bangladesh, Healing Technology, DGDA compliant medical devices, preventive maintenance medical equipment",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.healingtechnologybd.com",
    title: "Healing Technology - Leading Medical Equipment supplier in Bangladesh",
    description: "Importing world-class medical equipment from globally certified manufacturers to Dhaka, Bangladesh. CE, FDA, and DGDA compliant.",
    siteName: "Healing Technology",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healing Technology - Leading Medical Equipment supplier in Bangladesh",
    description: "Importing world-class medical equipment from globally certified manufacturers to Dhaka, Bangladesh. CE, FDA, and DGDA compliant.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
