"use client";

import { useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { countNewsLines } from "@/lib/generateNotice";
import type { GeneratedNotices, OutputFormat } from "@/lib/types";

interface SendEmailModalProps {
  noticeText: string;
  deceasedName: string;
  format: OutputFormat;
  onClose: () => void;
}

function SendEmailModal({ noticeText, deceasedName, format, onClose }: SendEmailModalProps) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/send-notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email, deceasedName, format, noticeText }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to send");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        {sent ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-lg font-700 text-neutral-text">Notice sent!</h3>
            <p className="text-sm text-neutral-muted mt-2">Check your inbox at {email}.</p>
            <button onClick={onClose} className="mt-4 px-5 py-2 bg-gaia-primary text-white rounded-lg text-sm font-600 hover:bg-gaia-tertiary transition-colors">
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-700 text-neutral-text">Send via email</h3>
            <p className="text-sm text-neutral-muted mt-1">Enter an email address to send this notice.</p>
            <div className="mt-4">
              <input
                type="email"
                placeholder="recipient@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="w-full px-3 py-2.5 rounded-lg border border-neutral-deep text-sm
                  focus:outline-none focus:ring-2 focus:ring-gaia-quaternary focus:border-gaia-primary"
              />
              {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSend}
                disabled={sending}
                className="flex-1 py-2.5 bg-gaia-primary text-white rounded-lg text-sm font-600
                  hover:bg-gaia-tertiary transition-colors disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send"}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-neutral-deep text-sm font-600
                  text-neutral-muted hover:text-neutral-text hover:border-gaia-tertiary transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const TABS: { id: OutputFormat; label: string }[] = [
  { id: "newspaper", label: "Newspaper" },
  { id: "social", label: "Social Media" },
  { id: "email", label: "Email" },
];

interface PreviewPanelProps {
  livePreview: { newspaper: string; social: string; email: string };
  aiNotices: GeneratedNotices | null;
  isGenerating: boolean;
  deceasedName: string;
}

export function PreviewPanel({
  livePreview,
  aiNotices,
  isGenerating,
  deceasedName,
}: PreviewPanelProps) {
  const [activeFormat, setActiveFormat] = useState<OutputFormat>("newspaper");
  const [showEmailModal, setShowEmailModal] = useState(false);

  const notices = aiNotices ?? livePreview;
  const currentText = notices[activeFormat];
  const isAI = Boolean(aiNotices);

  const lineCount = activeFormat === "newspaper"
    ? Math.round(countNewsLines(currentText))
    : null;

  const handlePrint = () => {
    // Set print content via a global
    window.dispatchEvent(new CustomEvent("evergreen:print", { detail: { text: currentText } }));
    window.print();
  };

  return (
    <>
      {showEmailModal && currentText && (
        <SendEmailModal
          noticeText={currentText}
          deceasedName={deceasedName}
          format={activeFormat}
          onClose={() => setShowEmailModal(false)}
        />
      )}

      <div className="flex flex-col h-full bg-white rounded-2xl border border-neutral-deep shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-700 text-neutral-text">Live Preview</h3>
              {isAI && (
                <span className="text-xs font-600 px-2 py-0.5 rounded-full bg-gaia-secondary text-gaia-primary">
                  AI Enhanced
                </span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-neutral-highlight rounded-lg p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFormat(tab.id)}
                className={`flex-1 py-1.5 rounded-md text-xs font-600 transition-all
                  ${activeFormat === tab.id
                    ? "bg-gaia-primary text-white shadow-sm"
                    : "text-neutral-muted hover:text-neutral-text"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto preview-scroll p-4">
          {isGenerating ? (
            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="skeleton h-4 w-2/3 mt-2" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-4/5" />
              <div className="skeleton h-4 w-3/4 mt-2" />
              <div className="skeleton h-4 w-full" />
            </div>
          ) : currentText ? (
            <>
              {/* Print-only container */}
              <div data-print-notice className="hidden print:block">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-neutral-text">
                  {currentText}
                </pre>
              </div>
              {/* Screen display */}
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-neutral-text print:hidden">
                {currentText}
              </pre>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <div className="w-10 h-10 rounded-full bg-gaia-secondary/40 flex items-center justify-center mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#48705B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <p className="text-sm text-neutral-muted">
                Start filling in details to see a live preview
              </p>
            </div>
          )}
        </div>

        {/* Metadata bar */}
        {currentText && activeFormat === "newspaper" && lineCount !== null && (
          <div className="px-4 py-2 bg-neutral-highlight border-t border-neutral-deep">
            <p className="text-xs text-neutral-muted">
              <span className="font-600 text-gaia-primary">~{lineCount} lines</span>
              {" "}· Most newspapers charge per line — aim for under 12 lines.
            </p>
          </div>
        )}
        {currentText && activeFormat === "social" && (
          <div className="px-4 py-2 bg-neutral-highlight border-t border-neutral-deep">
            <p className="text-xs text-neutral-muted">
              <span className="font-600 text-gaia-primary">{currentText.length} characters</span>
              {" "}· Works well on Facebook and Instagram.
            </p>
          </div>
        )}
        {currentText && activeFormat === "email" && (
          <div className="px-4 py-2 bg-neutral-highlight border-t border-neutral-deep">
            <p className="text-xs text-neutral-muted">
              <span className="font-600 text-gaia-primary">
                {currentText.split(/\s+/).filter(Boolean).length} words
              </span>
              {" "}· Suitable for forwarding by email.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="no-print px-4 py-3 border-t border-neutral-deep flex flex-wrap gap-2">
          <CopyButton text={currentText} />
          <button
            onClick={() => setShowEmailModal(true)}
            disabled={!currentText}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600
              border border-neutral-deep text-neutral-muted
              hover:text-gaia-primary hover:border-gaia-primary transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Send
          </button>
          <button
            onClick={handlePrint}
            disabled={!currentText}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600
              border border-neutral-deep text-neutral-muted
              hover:text-gaia-primary hover:border-gaia-primary transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print
          </button>
        </div>
      </div>
    </>
  );
}
