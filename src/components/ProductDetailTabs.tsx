"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  ChevronDown,
  CheckCircle2,
  Stethoscope,
  ShieldCheck,
  HeadphonesIcon,
  HelpCircle,
  Layers,
  BookOpen,
} from "lucide-react";

// ──────────────────────────────────────────────
// Minimal Lexical rich-text → plain HTML renderer
// Payload stores lexical nodes in JSON; we walk them here.
// ──────────────────────────────────────────────
function renderNode(node: any): string {
  if (!node) return "";

  if (node.type === "text") {
    let text = node.text || "";
    if (node.format & 1) text = `<strong>${text}</strong>`; // bold
    if (node.format & 2) text = `<em>${text}</em>`; // italic
    if (node.format & 8) text = `<u>${text}</u>`; // underline
    return text;
  }

  const children = (node.children || []).map(renderNode).join("");

  switch (node.type) {
    case "root":
    case "paragraph":
      return `<p>${children}</p>`;
    case "heading": {
      const tag = node.tag || "h2";
      return `<${tag}>${children}</${tag}>`;
    }
    case "list":
      return node.listType === "number"
        ? `<ol>${children}</ol>`
        : `<ul>${children}</ul>`;
    case "listitem":
      return `<li>${children}</li>`;
    case "link":
      return `<a href="${node.url || "#"}" target="_blank" rel="noopener noreferrer">${children}</a>`;
    case "horizontalrule":
      return `<hr/>`;
    default:
      return children;
  }
}

function lexicalToHtml(richText: any): string {
  if (!richText) return "";
  try {
    const root = richText?.root ?? richText;
    return renderNode(root);
  } catch {
    return "";
  }
}

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface Props {
  overview?: any;
  specGroups?: any[];
  applications?: { department: string }[];
  certificationSummary?: string;
  downloadItems?: any[];
  supportBlocks?: { title: string; body: string }[];
  faqItems?: { question: string; answer: string }[];
}

// ──────────────────────────────────────────────
// FAQ Accordion Item
// ──────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#F8F9FA] transition-colors"
      >
        <span className="text-sm font-bold text-[#00355D] leading-snug">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#12B5CB] flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[#575B5F] leading-relaxed border-t border-gray-100 pt-4 bg-[#F8F9FA]/50">
          {answer}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────
export function ProductDetailTabs({
  overview,
  specGroups = [],
  applications = [],
  certificationSummary,
  downloadItems = [],
  supportBlocks = [],
  faqItems = [],
}: Props) {
  const overviewHtml = lexicalToHtml(overview);

  // Build tabs array dynamically — only include tabs with content
  const allTabs: (Tab & { hasContent: boolean })[] = [
    {
      id: "overview",
      label: "Overview",
      icon: <BookOpen className="w-4 h-4" />,
      hasContent: !!overviewHtml,
    },
    {
      id: "specs",
      label: "Specifications",
      icon: <Layers className="w-4 h-4" />,
      hasContent: specGroups.length > 0,
    },
    {
      id: "applications",
      label: "Applications",
      icon: <Stethoscope className="w-4 h-4" />,
      hasContent: applications.length > 0,
    },
    {
      id: "certifications",
      label: "Certifications",
      icon: <ShieldCheck className="w-4 h-4" />,
      hasContent: !!certificationSummary,
    },
    {
      id: "downloads",
      label: "Downloads",
      icon: <FileText className="w-4 h-4" />,
      hasContent: downloadItems.length > 0,
    },
    {
      id: "support",
      label: "Support",
      icon: <HeadphonesIcon className="w-4 h-4" />,
      hasContent: supportBlocks.length > 0,
    },
    {
      id: "faq",
      label: "FAQ",
      icon: <HelpCircle className="w-4 h-4" />,
      hasContent: faqItems.length > 0,
    },
  ];

  const visibleTabs = allTabs.filter((t) => t.hasContent);

  const [activeTab, setActiveTab] = useState<string>(
    visibleTabs[0]?.id ?? "overview"
  );

  // Nothing to show
  if (visibleTabs.length === 0) {
    return (
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] -mt-10 relative z-10 mb-24">
        <div className="bg-white rounded-3xl border border-gray-100 p-12 shadow-sm text-center text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No additional information available yet.</p>
          <p className="text-sm mt-1">Contact us for detailed product information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] -mt-10 relative z-10 mb-24">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        {/* ── Tab Bar ── */}
        {visibleTabs.length > 1 && (
          <div className="border-b border-gray-100 bg-[#F8F9FA] px-6 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {visibleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-[#12B5CB] text-[#12B5CB]"
                      : "border-transparent text-[#575B5F] hover:text-[#00355D] hover:border-gray-300"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab Content ── */}
        <div className="p-8 lg:p-12">

          {/* OVERVIEW */}
          {activeTab === "overview" && overviewHtml && (
            <div
              className="prose prose-slate max-w-none
                prose-headings:text-[#00355D] prose-headings:font-bold prose-headings:tracking-tight
                prose-p:text-[#575B5F] prose-p:leading-relaxed prose-p:text-base
                prose-strong:text-[#00355D]
                prose-li:text-[#575B5F] prose-ul:list-disc prose-ol:list-decimal
                prose-a:text-[#12B5CB] prose-a:no-underline hover:prose-a:underline
                prose-hr:border-gray-200"
              dangerouslySetInnerHTML={{ __html: overviewHtml }}
            />
          )}

          {/* SPECIFICATIONS */}
          {activeTab === "specs" && specGroups.length > 0 && (
            <div className="space-y-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#00355D] tracking-[-0.03em]">
                Technical Specifications
              </h2>
              <div className="space-y-8">
                {specGroups.map((group: any, i: number) => (
                  <div key={i}>
                    {group.groupTitle && (
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#575B5F] mb-3">
                        {group.groupTitle}
                      </p>
                    )}
                    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-200 bg-[#F8F9FA]">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#575B5F] w-2/5">
                              Feature
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#575B5F]">
                              Specification
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.rows?.map((row: any, j: number) => (
                            <tr
                              key={j}
                              className={`border-b border-gray-100 last:border-0 hover:bg-[#F8F9FA] transition-colors ${
                                j % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                              }`}
                            >
                              <td className="px-6 py-4 text-sm text-[#575B5F] font-medium">
                                {row.label}
                              </td>
                              <td className="px-6 py-4 text-sm text-[#111111] font-semibold">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* APPLICATIONS */}
          {activeTab === "applications" && applications.length > 0 && (
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#00355D] tracking-[-0.03em] mb-3">
                Clinical Applications
              </h2>
              <p className="text-[#575B5F] mb-8 text-base">
                This equipment is suitable for use in the following departments and clinical settings.
              </p>
              <div className="flex flex-wrap gap-3">
                {applications.map((app: any, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EEF4FB] text-[#00355D] text-sm font-semibold border border-[#12B5CB]/15 hover:bg-[#12B5CB]/15 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#12B5CB] flex-shrink-0" />
                    {app.department}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {activeTab === "certifications" && certificationSummary && (
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#00355D] tracking-[-0.03em] mb-8">
                Quality & Certifications
              </h2>
              <div className="bg-[#EEF4FB] border border-[#12B5CB]/20 rounded-2xl p-8 flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#12B5CB]/15 flex items-center justify-center mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-[#12B5CB]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#12B5CB] mb-2">
                    Regulatory Compliance
                  </p>
                  <p className="text-[#00355D] text-base leading-relaxed font-medium whitespace-pre-line">
                    {certificationSummary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DOWNLOADS */}
          {activeTab === "downloads" && downloadItems.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-[#00355D] mb-8 tracking-[-0.03em]">
                Brochures & Manuals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {downloadItems.map((doc: any, i: number) => {
                  const href =
                    doc.externalUrl ||
                    (doc.file && typeof doc.file !== "string"
                      ? doc.file.url
                      : null);
                  const inner = (
                    <div className="flex items-center justify-between gap-6 border border-gray-200 rounded-2xl p-5 bg-gray-50 hover:bg-[#EEF4FB] hover:border-[#12B5CB]/30 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-[#EEF4FB] text-[#12B5CB] group-hover:bg-white group-hover:shadow-sm transition-all">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#111111] text-sm tracking-[-0.01em]">
                            {doc.title}
                          </div>
                          <div className="text-[10px] text-[#575B5F] uppercase tracking-[0.08em] mt-0.5">
                            {doc.type}
                          </div>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-[#12B5CB] group-hover:translate-y-0.5 transition-transform flex-shrink-0" />
                    </div>
                  );
                  return href ? (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer">
                      {inner}
                    </a>
                  ) : (
                    <div key={i}>{inner}</div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUPPORT */}
          {activeTab === "support" && supportBlocks.length > 0 && (
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#00355D] tracking-[-0.03em] mb-8">
                After-Sales Support
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportBlocks.map((block, i) => (
                  <div
                    key={i}
                    className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 hover:border-[#12B5CB]/20 hover:bg-[#EEF4FB] transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#12B5CB]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HeadphonesIcon className="w-4 h-4 text-[#12B5CB]" />
                      </div>
                      <h3 className="text-base font-bold text-[#00355D] leading-snug tracking-[-0.02em]">
                        {block.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#575B5F] leading-relaxed pl-11">
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeTab === "faq" && faqItems.length > 0 && (
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#00355D] tracking-[-0.03em] mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqItems.map((item, i) => (
                  <FaqItem
                    key={i}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
