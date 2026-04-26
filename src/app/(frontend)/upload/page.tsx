"use client";
import React, { useState, useCallback, useRef } from "react";

interface UploadState {
  status: "idle" | "uploading" | "success" | "error";
  progress: number;
  loaded?: number;
  total?: number;
  filename?: string;
  filesize?: string;
  mimetype?: string;
  error?: string;
  mediaId?: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatSpeed(bytesPerSec: number): string {
  return `${formatBytes(bytesPerSec)}/s`;
}

function getFileIcon(mimeType: string): string {
  if (mimeType?.startsWith("video/")) return "🎬";
  if (mimeType?.startsWith("image/")) return "🖼️";
  if (mimeType === "application/pdf") return "📄";
  return "📁";
}

export default function UploadPage() {
  const [uploadState, setUploadState] = useState<UploadState>({ status: "idle", progress: 0 });
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [speed, setSpeed] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastProgressRef = useRef<{ time: number; loaded: number }>({ time: 0, loaded: 0 });

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setUploadState({ status: "idle", progress: 0 });
    setSpeed(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const cancelUpload = () => {
    xhrRef.current?.abort();
    setUploadState({ status: "idle", progress: 0 });
    setSpeed(null);
  };

  const doUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (altText.trim()) {
      // Payload expects JSON fields alongside the file
      const jsonData = JSON.stringify({ alt: altText.trim() });
      formData.append("_payload", jsonData);
    }

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    startTimeRef.current = Date.now();
    lastProgressRef.current = { time: Date.now(), loaded: 0 };

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        const now = Date.now();
        const elapsed = (now - lastProgressRef.current.time) / 1000;
        if (elapsed > 0.3) {
          const bytesPerSec = (e.loaded - lastProgressRef.current.loaded) / elapsed;
          setSpeed(bytesPerSec);
          lastProgressRef.current = { time: now, loaded: e.loaded };
        }
        setUploadState((prev) => ({ ...prev, progress: pct, loaded: e.loaded, total: e.total }));
      }
    });

    xhr.upload.addEventListener("loadstart", () => {
      setUploadState({
        status: "uploading",
        progress: 0,
        filename: selectedFile.name,
        filesize: formatBytes(selectedFile.size),
        mimetype: selectedFile.type,
      });
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          setUploadState((prev) => ({
            ...prev,
            status: "success",
            progress: 100,
            mediaId: data?.doc?.id,
          }));
          setSpeed(null);
        } catch {
          setUploadState((prev) => ({
            ...prev,
            status: "error",
            error: "Upload succeeded but the server response was unreadable. Check the Media library.",
          }));
        }
      } else {
        let errorMsg = `Server returned ${xhr.status}`;
        try {
          const errData = JSON.parse(xhr.responseText);
          if (errData?.errors?.[0]?.message) errorMsg = errData.errors[0].message;
        } catch {}
        if (xhr.status === 401 || xhr.status === 403) {
          errorMsg = "Not authenticated. Please log into the admin panel first.";
        } else if (xhr.status === 413) {
          errorMsg = "File too large. Check the server's Nginx configuration.";
        }
        setUploadState((prev) => ({ ...prev, status: "error", error: errorMsg }));
        setSpeed(null);
      }
    });

    xhr.addEventListener("error", () => {
      setUploadState((prev) => ({
        ...prev,
        status: "error",
        error: "Network error — connection was interrupted. Check your internet and try again.",
      }));
      setSpeed(null);
    });

    xhr.addEventListener("abort", () => {
      setUploadState({ status: "idle", progress: 0 });
      setSpeed(null);
    });

    xhr.open("POST", "/api/media");
    xhr.withCredentials = true; // Sends Payload's auth cookie automatically
    xhr.send(formData);
  };

  const reset = () => {
    setSelectedFile(null);
    setAltText("");
    setUploadState({ status: "idle", progress: 0 });
    setSpeed(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const { status, progress, loaded, total, filename, filesize, mimetype, error, mediaId } = uploadState;

  const eta = speed && total && loaded
    ? Math.ceil((total - loaded) / speed)
    : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0a0a0f 0%, #0d0d1a 100%)",
        color: "#fff",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <a
            href="/admin/collections/media"
            style={{
              color: "#666",
              textDecoration: "none",
              fontSize: 13,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16,
              padding: "6px 12px",
              background: "#111",
              borderRadius: 8,
              border: "1px solid #222",
            }}
          >
            ← Back to Media Library
          </a>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 800,
              margin: "0 0 10px",
              background: "linear-gradient(135deg, #fff 40%, #aaa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Upload Media
          </h1>
          <p style={{ color: "#666", fontSize: 14, margin: 0 }}>
            All formats supported: images, videos (MP4, MKV, AVI, MOV, WebM…), PDFs. Up to 2GB per file.
          </p>
        </div>

        {/* === IDLE STATE === */}
        {status === "idle" && (
          <>
            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !selectedFile && fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? "#6366f1" : selectedFile ? "#22c55e" : "#2a2a2a"}`,
                borderRadius: 20,
                padding: selectedFile ? "28px 24px" : "60px 24px",
                textAlign: "center",
                cursor: selectedFile ? "default" : "pointer",
                transition: "all 0.25s ease",
                background: dragOver
                  ? "rgba(99,102,241,0.07)"
                  : selectedFile
                  ? "rgba(34,197,94,0.06)"
                  : "#111",
                marginBottom: 20,
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,application/pdf,.mkv,.avi,.mov,.wmv,.flv,.webm,.m4v,.3gp,.ts,.mts,.mp4,.mpeg,.mpg"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {selectedFile ? (
                <div style={{ display: "flex", alignItems: "center", gap: 16, textAlign: "left" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      background: "#1a1a1a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      flexShrink: 0,
                      border: "1px solid #2a2a2a",
                    }}
                  >
                    {getFileIcon(selectedFile.type)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        marginBottom: 4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {selectedFile.name}
                    </div>
                    <div style={{ color: "#888", fontSize: 13 }}>
                      {formatBytes(selectedFile.size)} &bull;{" "}
                      {selectedFile.type || "unknown format"}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); reset(); }}
                    style={{
                      background: "transparent",
                      border: "1px solid #333",
                      color: "#888",
                      padding: "6px 14px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 12,
                      flexShrink: 0,
                    }}
                  >
                    Change
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>
                    {dragOver ? "📂" : "☁️"}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>
                    {dragOver ? "Drop your file here" : "Drag & drop your file"}
                  </div>
                  <div style={{ color: "#555", fontSize: 13, marginBottom: 16 }}>or</div>
                  <div
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      padding: "10px 24px",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Browse Files
                  </div>
                  <div style={{ color: "#444", fontSize: 12, marginTop: 16 }}>
                    Supports: JPG · PNG · WebP · GIF · SVG · MP4 · MKV · AVI · MOV · WebM · PDF and more
                  </div>
                </>
              )}
            </div>

            {/* Alt Text Input */}
            {selectedFile && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, color: "#aaa", marginBottom: 8 }}>
                  Alt Text{" "}
                  <span style={{ color: "#444" }}>(optional — for accessibility)</span>
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="e.g. Surgical monitor front view"
                  style={{
                    width: "100%",
                    background: "#111",
                    border: "1px solid #2a2a2a",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "#fff",
                    fontSize: 14,
                    boxSizing: "border-box",
                    outline: "none",
                    transition: "border 0.2s",
                  }}
                />
              </div>
            )}

            {/* Upload Button */}
            {selectedFile && (
              <button
                onClick={doUpload}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                  border: "none",
                  borderRadius: 14,
                  padding: "15px",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: 0.3,
                }}
              >
                Upload {getFileIcon(selectedFile.type)} {selectedFile.name}
              </button>
            )}
          </>
        )}

        {/* === UPLOADING STATE === */}
        {status === "uploading" && (
          <div
            style={{
              background: "#111",
              border: "1px solid #1e1e2e",
              borderRadius: 20,
              padding: 32,
            }}
          >
            {/* File info row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  flexShrink: 0,
                }}
              >
                {getFileIcon(mimetype || "")}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginBottom: 4,
                  }}
                >
                  {filename}
                </div>
                <div style={{ fontSize: 13, color: "#666" }}>
                  {loaded != null && total != null
                    ? `${formatBytes(loaded)} of ${formatBytes(total)}`
                    : filesize}
                </div>
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #6366f1, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  flexShrink: 0,
                }}
              >
                {progress}%
              </div>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                height: 12,
                background: "#1a1a1a",
                borderRadius: 999,
                overflow: "hidden",
                marginBottom: 16,
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                  borderRadius: 999,
                  transition: "width 0.4s ease",
                  position: "relative",
                }}
              >
                {/* Shimmer effect */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
              </div>
            </div>
            <style>{`
              @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
              }
            `}</style>

            {/* Speed & ETA */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 12,
                color: "#555",
              }}
            >
              <div>
                {speed != null && speed > 0 ? (
                  <>
                    <span style={{ color: "#888" }}>Speed:</span>{" "}
                    <span style={{ color: "#aaa" }}>{formatSpeed(speed)}</span>
                    {eta != null && eta > 0 && (
                      <>
                        {" · "}
                        <span style={{ color: "#888" }}>ETA:</span>{" "}
                        <span style={{ color: "#aaa" }}>
                          {eta < 60 ? `${eta}s` : `${Math.ceil(eta / 60)}m`}
                        </span>
                      </>
                    )}
                  </>
                ) : progress < 100 ? (
                  "Calculating speed…"
                ) : (
                  <span style={{ color: "#aaa" }}>Processing on server…</span>
                )}
              </div>
              <button
                onClick={cancelUpload}
                style={{
                  background: "transparent",
                  border: "1px solid #333",
                  color: "#666",
                  padding: "4px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* === SUCCESS STATE === */}
        {status === "success" && (
          <div
            style={{
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 10px" }}>
              Upload Complete!
            </h2>
            <p style={{ color: "#888", marginBottom: 28, fontSize: 15 }}>
              <strong style={{ color: "#ccc" }}>{filename}</strong> has been saved to your Media
              library.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="/admin/collections/media"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  borderRadius: 12,
                  padding: "12px 24px",
                  color: "#fff",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: 14,
                }}
              >
                📁 View Media Library
              </a>
              {mediaId && (
                <a
                  href={`/admin/collections/media/${mediaId}`}
                  style={{
                    background: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: 12,
                    padding: "12px 24px",
                    color: "#fff",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  🔍 View This File
                </a>
              )}
              <button
                onClick={reset}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: 12,
                  padding: "12px 24px",
                  color: "#888",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                ↑ Upload Another
              </button>
            </div>
          </div>
        )}

        {/* === ERROR STATE === */}
        {status === "error" && (
          <div
            style={{
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 56, marginBottom: 16 }}>❌</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 10px" }}>
              Upload Failed
            </h2>
            <p
              style={{
                color: "#f87171",
                marginBottom: 8,
                fontSize: 14,
                maxWidth: 480,
                margin: "0 auto 24px",
              }}
            >
              {error}
            </p>
            <button
              onClick={reset}
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
                border: "none",
                borderRadius: 12,
                padding: "12px 28px",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              ↩ Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
