"use client";
import { useEffect } from "react";

export default function UploadPage() {
  useEffect(() => {
    window.location.replace("https://cms.healingtechnology.com.bd/files");
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <p style={{ color: "#666", fontSize: 14 }}>Redirecting to Directus file manager…</p>
      <a
        href="https://cms.healingtechnology.com.bd/files"
        style={{ color: "#6366f1", fontSize: 13 }}
      >
        Click here if not redirected
      </a>
    </div>
  );
}
