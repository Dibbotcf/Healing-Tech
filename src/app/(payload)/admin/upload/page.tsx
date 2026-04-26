"use client";
import React, { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

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

function formatSpeed(bps: number): string {
  return `${formatBytes(bps)}/s`;
}

function getIcon(mimeType?: string): string {
  if (!mimeType) return "📁";
  if (mimeType.startsWith("video/")) return "🎬";
  if (mimeType.startsWith("image/")) return "🖼️";
  if (mimeType === "application/pdf") return "📄";
  return "📁";
}

export default function AdminUploadPage() {
  const router = useRouter();
  const [state, setState] = useState<UploadState>({ status: "idle", progress: 0 });
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [speed, setSpeed] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);
  const lastRef = useRef<{ time: number; loaded: number }>({ time: 0, loaded: 0 });

  const pickFile = (f: File) => {
    setFile(f);
    setState({ status: "idle", progress: 0 });
    setSpeed(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) pickFile(e.dataTransfer.files[0]);
  }, []);

  const reset = () => {
    setFile(null);
    setAlt("");
    setState({ status: "idle", progress: 0 });
    setSpeed(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const upload = () => {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    if (alt.trim()) form.append("_payload", JSON.stringify({ alt: alt.trim() }));

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    lastRef.current = { time: Date.now(), loaded: 0 };

    xhr.upload.addEventListener("loadstart", () => {
      setState({
        status: "uploading",
        progress: 0,
        filename: file.name,
        filesize: formatBytes(file.size),
        mimetype: file.type,
      });
    });

    xhr.upload.addEventListener("progress", (e) => {
      if (!e.lengthComputable) return;
      const pct = Math.round((e.loaded / e.total) * 100);
      const now = Date.now();
      const elapsed = (now - lastRef.current.time) / 1000;
      if (elapsed > 0.4) {
        setSpeed((e.loaded - lastRef.current.loaded) / elapsed);
        lastRef.current = { time: now, loaded: e.loaded };
      }
      // Clear speed at 100% so "Processing on server…" shows immediately
      if (pct === 100) setSpeed(null);
      setState((p) => ({ ...p, progress: pct, loaded: e.loaded, total: e.total }));
    });

    // upload.load fires when transfer is complete (server starts processing)
    xhr.upload.addEventListener("load", () => {
      setSpeed(null);
    });

    xhr.addEventListener("load", () => {
      setSpeed(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          // Payload v3 returns { doc: {...} } for REST creates
          const id = data?.doc?.id ?? data?.id ?? null;
          setState((p) => ({ ...p, status: "success", progress: 100, mediaId: id }));
          // Auto-redirect to media dashboard after 2.5 seconds
          setTimeout(() => router.push("/admin/collections/media"), 2500);
        } catch {
          // Even if parse fails, treat as success if status was 2xx
          setState((p) => ({ ...p, status: "success", progress: 100 }));
          setTimeout(() => router.push("/admin/collections/media"), 2500);
        }
      } else {
        // Try to extract the real error from Payload's response
        let msg = `Upload failed (HTTP ${xhr.status})`;
        try {
          const err = JSON.parse(xhr.responseText);
          // Payload returns errors array or a message field
          if (err?.errors?.[0]?.message) msg = `${err.errors[0].message} (${xhr.status})`;
          else if (err?.message) msg = `${err.message} (${xhr.status})`;
          else if (err?.error) msg = `${err.error} (${xhr.status})`;
        } catch {
          // Response wasn't JSON — show first 200 chars
          msg = xhr.responseText?.slice(0, 200) || msg;
        }
        if (xhr.status === 401 || xhr.status === 403) msg = "Not authenticated — please log in to the admin panel first.";
        if (xhr.status === 413) msg = "File too large — the server rejected it (413). Check Nginx client_max_body_size.";
        if (xhr.status === 0) msg = "No response from server — the connection was reset. The file may be too large for the current server config.";
        setState((p) => ({ ...p, status: "error", error: msg }));
      }
    });

    xhr.addEventListener("error", () => {
      setSpeed(null);
      setState((p) => ({ ...p, status: "error", error: "Network error — connection was interrupted." }));
    });

    xhr.addEventListener("abort", () => {
      setState({ status: "idle", progress: 0 });
      setSpeed(null);
    });

    xhr.open("POST", "/api/media");
    xhr.withCredentials = true;
    xhr.send(form);
  };

  const { status, progress, loaded, total, filename, filesize, mimetype, error, mediaId } = state;
  const eta = speed && total && loaded ? Math.ceil((total - loaded) / speed) : null;

  // ─── Styles matching Payload admin dark theme ───────────────
  const card: React.CSSProperties = {
    background: "var(--theme-elevation-50, #1a1a1a)",
    border: "1px solid var(--theme-elevation-150, #2a2a2a)",
    borderRadius: 12,
    padding: 32,
  };

  return (
    <div style={{ padding: "32px 40px", maxWidth: 720, margin: "0 auto" }}>

      {/* Breadcrumb header — matches Payload's style */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 13, color: "var(--theme-elevation-500, #888)" }}>
          <span
            onClick={() => router.push("/admin/collections/media")}
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            Media
          </span>
          <span>/</span>
          <span style={{ color: "var(--theme-text, #fff)" }}>Upload File</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: "var(--theme-text, #fff)" }}>
          Upload Media
        </h1>
        <p style={{ marginTop: 8, fontSize: 14, color: "var(--theme-elevation-500, #888)" }}>
          Supports all images, videos (MP4, MKV, AVI, MOV, WebM…), and PDFs up to 2 GB.
        </p>
      </div>

      {/* ── IDLE: Drop zone + form ── */}
      {status === "idle" && (
        <>
          {/* Drop zone */}
          <div
            {...(!file
              ? {
                  onClick: () => fileInputRef.current?.click(),
                  onDragOver: (e) => { e.preventDefault(); setDragOver(true); },
                  onDragLeave: () => setDragOver(false),
                  onDrop: handleDrop,
                  style: {
                    ...card,
                    border: `2px dashed ${dragOver ? "#4f9cf9" : file ? "#22c55e" : "var(--theme-elevation-200, #333)"}`,
                    textAlign: "center",
                    cursor: "pointer",
                    background: dragOver ? "rgba(79,156,249,0.05)" : "var(--theme-elevation-50, #111)",
                    marginBottom: 20,
                    padding: "48px 24px",
                  },
                }
              : { style: { ...card, marginBottom: 20 } })}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*,application/pdf,.mkv,.avi,.mov,.wmv,.flv,.webm,.m4v,.3gp,.ts,.mts,.mp4,.mpeg,.mpg"
              onChange={(e) => { if (e.target.files?.[0]) pickFile(e.target.files[0]); }}
              style={{ display: "none" }}
            />

            {file ? (
              // File selected
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 40, flexShrink: 0 }}>{getIcon(file.type)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--theme-text, #fff)" }}>
                    {file.name}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--theme-elevation-500, #888)" }}>
                    {formatBytes(file.size)} · {file.type || "unknown type"}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); reset(); }}
                  style={{ background: "transparent", border: "1px solid var(--theme-elevation-200, #333)", color: "var(--theme-elevation-500, #888)", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, flexShrink: 0 }}
                >
                  Change
                </button>
              </div>
            ) : (
              // Empty drop zone
              <>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{dragOver ? "📂" : "☁️"}</div>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: "var(--theme-text, #fff)" }}>
                  {dragOver ? "Drop it here!" : "Drag & drop your file"}
                </div>
                <div style={{ color: "var(--theme-elevation-500, #888)", fontSize: 13, marginBottom: 16 }}>or</div>
                <button
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  style={{ background: "#4f9cf9", border: "none", borderRadius: 8, padding: "10px 24px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
                >
                  Browse Files
                </button>
                <div style={{ color: "var(--theme-elevation-400, #666)", fontSize: 12, marginTop: 14 }}>
                  JPG · PNG · WebP · GIF · SVG · MP4 · MKV · AVI · MOV · WebM · PDF
                </div>
              </>
            )}
          </div>

          {/* Alt text input */}
          {file && (
            <div style={{ ...card, marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--theme-elevation-500, #aaa)", marginBottom: 8 }}>
                Alt Text <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional — for images)</span>
              </label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Describe the file for accessibility…"
                style={{ width: "100%", background: "var(--theme-elevation-100, #1a1a1a)", border: "1px solid var(--theme-elevation-200, #333)", borderRadius: 8, padding: "10px 14px", color: "var(--theme-text, #fff)", fontSize: 14, boxSizing: "border-box", outline: "none" }}
              />
            </div>
          )}

          {/* Upload button */}
          {file && (
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={upload}
                style={{ flex: 1, background: "linear-gradient(135deg, #4f9cf9 0%, #7c3aed 100%)", border: "none", borderRadius: 10, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}
              >
                {getIcon(file.type)} Upload {file.name}
              </button>
              <button
                onClick={() => router.push("/admin/collections/media")}
                style={{ background: "transparent", border: "1px solid var(--theme-elevation-200, #333)", borderRadius: 10, padding: "14px 20px", color: "var(--theme-elevation-500, #888)", fontSize: 14, cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}

      {/* ── UPLOADING ── */}
      {status === "uploading" && (
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 40, flexShrink: 0 }}>{getIcon(mimetype)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--theme-text, #fff)" }}>{filename}</div>
              <div style={{ fontSize: 13, color: "var(--theme-elevation-500, #888)" }}>
                {loaded != null && total != null ? `${formatBytes(loaded)} of ${formatBytes(total)}` : filesize}
              </div>
            </div>
            <div style={{ fontSize: 34, fontWeight: 900, background: "linear-gradient(135deg, #4f9cf9, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", flexShrink: 0 }}>
              {progress}%
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 10, background: "var(--theme-elevation-100, #222)", borderRadius: 999, overflow: "hidden", marginBottom: 14 }}>
            <div
              style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #4f9cf9 0%, #7c3aed 100%)", borderRadius: 999, transition: "width 0.4s ease" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--theme-elevation-500, #666)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {progress === 100 ? (
                // Pulsing dot + message when server is processing
                <>
                  <span style={{
                    display: "inline-block", width: 8, height: 8, borderRadius: "50%",
                    background: "#4f9cf9",
                    animation: "pulse 1.2s ease-in-out infinite",
                  }} />
                  <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }`}</style>
                  ⏳ Saving to Media Library… please wait
                </>
              ) : speed != null && speed > 0 ? (
                <>
                  {formatSpeed(speed)}
                  {eta != null && eta > 0 && <> · ETA {eta < 60 ? `${eta}s` : `${Math.ceil(eta / 60)}m`}</> }
                </>
              ) : "Uploading…"}
            </span>
            {progress < 100 && (
              <button
                onClick={() => xhrRef.current?.abort()}
                style={{ background: "transparent", border: "1px solid var(--theme-elevation-200, #333)", color: "var(--theme-elevation-500, #888)", padding: "2px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── SUCCESS ── */}
      {status === "success" && (
        <div style={{ ...card, textAlign: "center", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.05)" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: "var(--theme-text, #fff)" }}>Upload Complete!</h2>
          <p style={{ color: "var(--theme-elevation-500, #888)", marginBottom: 8 }}>
            <strong style={{ color: "var(--theme-text, #ccc)" }}>{filename}</strong> saved to your Media library.
          </p>
          <p style={{ fontSize: 13, color: "var(--theme-elevation-400, #666)", marginBottom: 24 }}>
            Redirecting to Media dashboard…
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => router.push("/admin/collections/media")}
              style={{ background: "linear-gradient(135deg, #4f9cf9 0%, #7c3aed 100%)", border: "none", borderRadius: 10, padding: "12px 24px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
            >
              📁 View Media Library
            </button>
            {mediaId && (
              <button
                onClick={() => router.push(`/admin/collections/media/${mediaId}`)}
                style={{ background: "var(--theme-elevation-100, #1a1a1a)", border: "1px solid var(--theme-elevation-200, #333)", borderRadius: 10, padding: "12px 24px", color: "var(--theme-text, #fff)", fontWeight: 600, cursor: "pointer", fontSize: 14 }}
              >
                🔍 View This File
              </button>
            )}
            <button
              onClick={reset}
              style={{ background: "transparent", border: "1px solid var(--theme-elevation-200, #333)", borderRadius: 10, padding: "12px 24px", color: "var(--theme-elevation-500, #888)", cursor: "pointer", fontSize: 14 }}
            >
              ↑ Upload Another
            </button>
          </div>
        </div>
      )}

      {/* ── ERROR ── */}
      {status === "error" && (
        <div style={{ ...card, textAlign: "center", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.05)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "var(--theme-text, #fff)" }}>Upload Failed</h2>
          <p style={{ color: "#f87171", marginBottom: 24, fontSize: 14 }}>{error}</p>
          <button
            onClick={reset}
            style={{ background: "#ef4444", border: "none", borderRadius: 10, padding: "12px 24px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
