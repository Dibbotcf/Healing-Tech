import type { Metadata, Viewport } from "next";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.85,
  maximumScale: 5,
};

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { FacebookPixel } from "@/components/FacebookPixel";
import CartToast from "@/components/CartToast";

const inter = {
  variable: "font-inter",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://healingtechnology.com.bd'),
  manifest: '/site.webmanifest',
  title: "Healing Technology - Leading Medical Equipment supplier in Bangladesh",
  description: "Empowering Bangladesh Healthcare with Precision Clinical Solutions. Importing world-class OT, ICU, and surgical equipment—backed by unwavering 24/7 engineering support.",
  keywords: "medical equipment supplier Bangladesh, surgical lights, anesthesia machines, hospital beds, OT lights, direct medical import Dhaka, ICU equipment Bangladesh, Healing Technology, DGDA compliant medical devices, preventive maintenance medical equipment",
  robots: "index, follow",
  // ── Favicon / icons ─────────────────────────────────────────
  // SVG favicon — used by Google search results, browser tabs, bookmarks.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  // ── Open Graph (social sharing + Google Knowledge Panel) ────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://healingtechnology.com.bd",
    title: "Healing Technology - Leading Medical Equipment supplier in Bangladesh",
    description: "Importing world-class medical equipment from globally certified manufacturers to Dhaka, Bangladesh. CE, FDA, and DGDA compliant.",
    siteName: "Healing Technology",
    images: [
      {
        url: "https://healingtechnology.com.bd/og-image.png",
        width: 1200,
        height: 630,
        alt: "Healing Technology - Leading Medical Equipment Supplier in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healing Technology - Leading Medical Equipment supplier in Bangladesh",
    description: "Importing world-class medical equipment from globally certified manufacturers to Dhaka, Bangladesh. CE, FDA, and DGDA compliant.",
    images: ["https://healingtechnology.com.bd/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <div className="min-h-screen bg-[#F8F9FA] text-[#111111] tracking-tight flex flex-col" style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppFAB />
          <CartToast />
          <FacebookPixel />
        </div>
      </body>
    </html>
  );
}
