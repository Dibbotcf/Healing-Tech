"use client";

import { Download } from "lucide-react";
import { useState } from "react";

export default function PrintButton({ orderNumber }: { orderNumber?: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById("invoice-content");
    if (!element) { alert("Invoice content not found"); return; }
    setLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDFModule = await import("jspdf");
      // Support both named and default export across versions
      const jsPDF = (jsPDFModule as any).jsPDF ?? (jsPDFModule as any).default;

      // Temporarily pin element width so md: Tailwind classes activate at desktop size
      const prevWidth = element.style.width;
      const prevMinWidth = element.style.minWidth;
      element.style.width = "740px";
      element.style.minWidth = "740px";

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 15000,
        // Evaluate Tailwind responsive classes as if viewport = 1200px
        windowWidth: 1200,
        windowHeight: 900,
        onclone: (doc: Document) => {
          doc.querySelectorAll("img").forEach((img: HTMLImageElement) => {
            img.crossOrigin = "anonymous";
          });
          const cloned = doc.getElementById("invoice-content");
          if (cloned) {
            (cloned as HTMLElement).style.width = "740px";
            (cloned as HTMLElement).style.minWidth = "740px";
            (cloned as HTMLElement).style.borderRadius = "0";
            (cloned as HTMLElement).style.boxShadow = "none";
          }
        },
      });

      // Restore
      element.style.width = prevWidth;
      element.style.minWidth = prevMinWidth;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeightMm = (canvas.height * pdfWidth) / canvas.width;

      // If content is taller than one A4 page, split across pages
      const pageHeightMm = pdf.internal.pageSize.getHeight();
      if (imgHeightMm <= pageHeightMm) {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeightMm);
      } else {
        let yOffset = 0;
        while (yOffset < imgHeightMm) {
          if (yOffset > 0) pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, -yOffset, pdfWidth, imgHeightMm);
          yOffset += pageHeightMm;
        }
      }

      pdf.save(`invoice-${orderNumber ?? "download"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      // Fallback: open print dialog
      window.print();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-2 bg-[#12B5CB] text-white hover:bg-[#009EE2] disabled:opacity-70 px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md"
    >
      <Download className="w-4 h-4" />
      {loading ? "Generating…" : "Download PDF"}
    </button>
  );
}
