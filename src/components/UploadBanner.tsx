"use client";
import React from "react";

export function UploadBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(79,156,249,0.12) 0%, rgba(124,58,237,0.12) 100%)",
        border: "1px solid rgba(79,156,249,0.25)",
        borderRadius: 10,
        padding: "12px 18px",
        margin: "0 0 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: 13,
        color: "#ccc",
      }}
    >
      <span style={{ fontSize: 18 }}>🎬</span>
      <div style={{ flex: 1 }}>
        <strong style={{ color: "#fff" }}>Upload large videos or images</strong>
        {" — "}use the{" "}
        <a
          href="/admin/upload"
          style={{ color: "#93c5fd", fontWeight: 700, textDecoration: "underline" }}
        >
          Custom Upload Page
        </a>{" "}
        for real-time progress tracking and support for all video formats (MP4, MKV, AVI, MOV…).
      </div>
    </div>
  );
}

