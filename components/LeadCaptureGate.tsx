"use client";

import { useState } from "react";
import type { LeadData } from "@/lib/types";

interface LeadCaptureGateProps {
  deceasedName: string;
  onSubmit: (lead: LeadData) => void;
  onClose: () => void;
}

export function LeadCaptureGate({ deceasedName, onSubmit, onClose }: LeadCaptureGateProps) {
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [wantsContact, setWantsContact] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!yourName.trim()) errs.name = "Please enter your name.";
    if (!yourEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(yourEmail))
      errs.email = "Please enter a valid email address.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({
      yourName,
      yourEmail,
      wantsContact,
      deceasedName,
      submittedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gaia-gradient p-6 text-white">
          <h2 className="text-xl font-700">Almost there</h2>
          <p className="text-sm text-gaia-secondary mt-1 leading-relaxed">
            Enter your details to generate the notices for{" "}
            <span className="font-600">{deceasedName || "your loved one"}</span>.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-600 text-neutral-text mb-1.5">
              Your name
            </label>
            <input
              type="text"
              placeholder="e.g. Sarah Thompson"
              value={yourName}
              onChange={(e) => { setYourName(e.target.value); setErrors((e2) => ({ ...e2, name: undefined })); }}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm
                focus:outline-none focus:ring-2 focus:ring-gaia-quaternary focus:border-gaia-primary
                ${errors.name ? "border-red-400" : "border-neutral-deep"}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-600 text-neutral-text mb-1.5">
              Your email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={yourEmail}
              onChange={(e) => { setYourEmail(e.target.value); setErrors((e2) => ({ ...e2, email: undefined })); }}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm
                focus:outline-none focus:ring-2 focus:ring-gaia-quaternary focus:border-gaia-primary
                ${errors.email ? "border-red-400" : "border-neutral-deep"}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            <p className="text-xs text-neutral-muted mt-1">
              We'll send a copy of your notices to this address.
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={wantsContact}
              onChange={(e) => setWantsContact(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-neutral-deep accent-gaia-primary cursor-pointer"
            />
            <span className="text-sm text-neutral-muted leading-relaxed group-hover:text-neutral-text transition-colors">
              I'd like Gaia to reach out about funeral arrangements or other support services.
            </span>
          </label>

          <p className="text-xs text-neutral-muted">
            By continuing, you agree to Gaia's privacy policy. We'll never spam you.
          </p>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-gaia-primary text-white rounded-xl text-sm font-700
              hover:bg-gaia-tertiary transition-colors"
          >
            Generate My Notices
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm text-neutral-muted hover:text-neutral-text transition-colors"
          >
            Cancel — go back
          </button>
        </div>
      </div>
    </div>
  );
}
