"use client";
import React from "react";

// Fixes "Select a file" not opening the file picker when inside a nested modal/drawer.
// Root cause: Payload calls inputRef.current.click() via JS, which browsers block
// as "not a trusted user gesture" inside async drawer contexts.
// Fix: overlay the hidden <input type="file"> on top of the button so clicking
// the button area is a direct click on the input — no JS intermediary needed.
export function AdminFileInputFix() {
  return (
    <style>{`
      @layer payload {
        .file-field__dropzoneButtons {
          position: relative !important;
        }
        .file-field__hidden-input {
          display: block !important;
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          opacity: 0 !important;
          cursor: pointer !important;
          z-index: 5 !important;
        }
        .file-field__dropzoneButtons > *:not(.file-field__hidden-input) {
          position: relative;
          z-index: 10;
        }
        .file-field__dropzoneButtons > button:first-of-type {
          z-index: 1 !important;
        }
      }
    `}</style>
  );
}
