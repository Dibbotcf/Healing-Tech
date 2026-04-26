"use client";
import React from "react";

export function UploadBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.15) 100%)",
        border: "1px solid rgba(99,102,241,0.3)",
        borderRadius: 10,
        padding: "10px 16px",
        margin: "0 0 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: 13,
        color: "#ccc",
      }}
    >
      <span>🎬</span>
      <span>
        Uploading large videos? Use the{" "}
        <a
          href="/upload"
          target="_blank"
          style={{
            color: "#a5b4fc",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          Custom Upload Page
        </a>{" "}
        for real-time progress tracking and full video format support.
      </span>
    </div>
  );
}
