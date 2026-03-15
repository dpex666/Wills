"use client";

import { useState, useMemo } from "react";
import { StepWizard } from "@/components/StepWizard";
import { PreviewPanel } from "@/components/PreviewPanel";
import { LeadCaptureGate } from "@/components/LeadCaptureGate";
import { GaiaServicesCTA } from "@/components/GaiaServicesCTA";
import { generateAllNotices } from "@/lib/generateNotice";
import type { FormState, GeneratedNotices, LeadData } from "@/lib/types";
import { INITIAL_FORM_STATE } from "@/lib/types";

export default function Home() {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [aiNotices, setAiNotices] = useState<GeneratedNotices | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLeadGate, setShowLeadGate] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  const handleChange = (patch: Partial<FormState>) => {
    setFormState((prev) => ({ ...prev, ...patch }));
    // Reset AI notices if form changes after generation
    if (aiNotices) setAiNotices(null);
  };

  // Fast template preview — updates live as user types
  const livePreview = useMemo(() => generateAllNotices(formState), [formState]);

  const doGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data: GeneratedNotices = await res.json();
      setAiNotices(data);
    } catch {
      // Fall back to template notices silently
      setAiNotices(generateAllNotices(formState));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateClick = () => {
    if (!leadCaptured) {
      setShowLeadGate(true);
      return;
    }
    doGenerate();
  };

  const handleLeadSubmit = async (lead: LeadData) => {
    setShowLeadGate(false);
    setLeadCaptured(true);

    // Fire-and-forget: send lead notification email
    try {
      await fetch("/api/send-notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: lead.yourEmail,
          deceasedName: lead.deceasedName,
          format: "newspaper",
          noticeText:
            `Thank you ${lead.yourName},\n\nYour notices for ${lead.deceasedName} are being generated now.\n\nIf you need support with funeral arrangements, our team at Gaia is here to help.\n\nhttps://gaia.com.au`,
        }),
      });
    } catch {
      // Non-critical — don't block generation
    }

    doGenerate();
  };

  const handleStartOver = () => {
    setFormState(INITIAL_FORM_STATE);
    setCurrentStep(0);
    setAiNotices(null);
    setLeadCaptured(false);
  };

  return (
    <>
      {showLeadGate && (
        <LeadCaptureGate
          deceasedName={formState.fullName}
          onSubmit={handleLeadSubmit}
          onClose={() => setShowLeadGate(false)}
        />
      )}

      <div className="min-h-screen bg-neutral-highlight">
        {/* Header */}
        <header className="no-print bg-gaia-gradient text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-800 tracking-tight">Evergreen</h1>
              <p className="text-xs text-gaia-secondary mt-0.5 font-400 tracking-wide">
                A notice that endures
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gaia-secondary hidden sm:block">Powered by</p>
              <span className="text-sm font-700 text-white bg-white/20 px-3 py-1 rounded-full">
                Gaia
              </span>
            </div>
          </div>

          {/* Hero bar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
            <p className="text-sm text-gaia-secondary max-w-xl leading-relaxed">
              Create a dignified death notice for newspaper, social media, or email — in minutes.
              Free, private, and powered by AI.
            </p>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="lg:flex lg:gap-8 lg:items-start">
            {/* Left: Wizard */}
            <div className="lg:w-3/5">
              <StepWizard
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                formState={formState}
                onChange={handleChange}
                onGenerate={handleGenerateClick}
                isGenerating={isGenerating}
              />

              {aiNotices && (
                <div className="mt-4 no-print">
                  <button
                    onClick={handleStartOver}
                    className="text-sm text-neutral-muted hover:text-gaia-primary transition-colors"
                  >
                    ← Start over with a new notice
                  </button>
                </div>
              )}
            </div>

            {/* Right: Preview (sticky on desktop) */}
            <div className="mt-8 lg:mt-0 lg:w-2/5 lg:sticky lg:top-8 lg:self-start">
              <PreviewPanel
                livePreview={livePreview}
                aiNotices={aiNotices}
                isGenerating={isGenerating}
                deceasedName={formState.fullName}
              />
            </div>
          </div>

          {/* Gaia CTA — shown after generation */}
          {aiNotices && (
            <div className="mt-10 no-print">
              <GaiaServicesCTA />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="no-print mt-16 border-t border-neutral-deep bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-700 text-neutral-text">Evergreen</p>
              <p className="text-xs text-neutral-muted mt-0.5">
                A free tool by{" "}
                <a href="https://gaia.com.au" className="text-gaia-primary hover:underline font-600">
                  Gaia
                </a>
              </p>
            </div>
            <p className="text-xs text-neutral-muted text-center">
              Your information is never stored or shared. All notices are generated privately.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
