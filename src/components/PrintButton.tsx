"use client";

import { Download } from "lucide-react";
import { useState } from "react";

export default function PrintButton({ orderNumber }: { orderNumber?: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById("invoice-content");
    if (!element) return;
    setLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${orderNumber ?? "download"}.pdf`);
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
