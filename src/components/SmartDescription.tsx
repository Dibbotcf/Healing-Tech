/**
 * SmartDescription
 *
 * Parses a plain-text product summary that may contain embedded
 * "Feature Name: Detail sentence." patterns and renders them as
 * a premium card grid, while preserving the intro text separately.
 */

import {
  Zap,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Settings,
  Activity,
  Star,
  CheckCircle2,
  Info,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

// Cycle through icons for each discovered feature card
const ICON_POOL = [
  Zap,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Settings,
  Activity,
  Star,
];

/**
 * Split text into { intro, features[] } by detecting "Title: Body" segments.
 *
 * Rules:
 *  - An intro is everything before the first "Title:" pattern (capital-word colon).
 *  - "Key Highlights:" (or similar section headers with no body) are dropped.
 *  - "Title: Body text." is captured as a feature.
 */
function parseDescription(raw: string): { intro: string; features: Feature[] } {
  if (!raw?.trim()) return { intro: "", features: [] };

  // Normalise whitespace
  const text = raw.replace(/\r\n/g, "\n").replace(/\n+/g, " ").trim();

  // Split on potential "Feature Title:" — a capitalised word (or multiple words)
  // followed by a colon. We look for: start-of-segment + Word(s) + ":"
  // Strategy: split on the pattern (?<=[.!?]\s+|\n)([A-Z][^:]+):\s
  // but JS still lacks full lookbehind depth. Instead we use a token approach.

  // 1. Extract all "Token: rest of sentence until next Title: or end"
  //    by finding all matches of /([A-Z][^:.\n]{1,60}):\s+([^:]+?)(?=\s+[A-Z][^:.\n]{1,60}:|$)/g
  const featureRegex = /([A-Z][A-Za-z &\-/]{1,60}):\s+([A-Za-z"(][^]*?)(?=\s+[A-Z][A-Za-z &\-/]{1,60}:\s|$)/g;

  const features: Feature[] = [];
  let introEnd = text.length;

  let match: RegExpExecArray | null;
  while ((match = featureRegex.exec(text)) !== null) {
    const title = match[1].trim();
    const body  = match[2].trim();

    // Skip pure section headers like "Key Highlights" with no real body
    if (body.length < 10 || /^key highlights?$/i.test(title)) continue;

    features.push({ title, description: body });

    // The intro ends at the first match start
    if (match.index < introEnd) introEnd = match.index;
  }

  // Everything before the first feature match is the intro
  let intro = text.slice(0, introEnd).trim();
  // Strip trailing section headers like "Key Highlights:" or partial spill like "Key Highlights: High-Quality"
  intro = intro.replace(/\s*key highlights?:?(\s+[A-Z][a-zA-Z\-]*)?\s*$/i, "").trim();

  return { intro, features };
}

// ──────────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────────
export function SmartDescription({ text }: { text: string }) {
  const { intro, features } = parseDescription(text);

  // Fallback: if no features detected, just render pretty prose
  if (features.length === 0) {
    return (
      <div className="mb-8">
        <p className="text-base md:text-lg text-[#00355D]/75 font-light leading-relaxed tracking-[-0.01em] max-w-xl">
          {text}
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8 space-y-5">
      {/* ── Intro paragraph ── */}
      {intro && (
        <p className="text-base md:text-[17px] text-[#00355D]/80 font-light leading-relaxed tracking-[-0.01em] max-w-xl border-l-2 border-[#12B5CB] pl-4">
          {intro}
        </p>
      )}

      {/* ── Feature cards grid ── */}
      <div className={`grid gap-3 ${features.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        {features.map((feat, i) => {
          const Icon = ICON_POOL[i % ICON_POOL.length];
          return (
            <div
              key={i}
              className="group flex gap-4 bg-white/70 backdrop-blur-sm border border-[#00355D]/6 rounded-2xl p-4 hover:border-[#12B5CB]/30 hover:bg-white hover:shadow-md transition-all duration-200"
            >
              {/* Icon badge */}
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#12B5CB]/15 to-[#00355D]/10 flex items-center justify-center mt-0.5 group-hover:from-[#12B5CB]/25 group-hover:to-[#00355D]/15 transition-all">
                <Icon className="w-4 h-4 text-[#12B5CB]" />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p className="text-[11px] font-black text-[#00355D] uppercase tracking-[0.08em] mb-1">
                  {feat.title}
                </p>
                <p className="text-sm text-[#575B5F] leading-relaxed font-light">
                  {feat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
