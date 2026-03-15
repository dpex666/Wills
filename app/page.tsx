"use client";

import { useState, useMemo, useRef } from "react";
import { StepWizard } from "@/components/StepWizard";
import { PreviewPanel } from "@/components/PreviewPanel";
import { LeadCaptureGate } from "@/components/LeadCaptureGate";
import { GaiaServicesCTA } from "@/components/GaiaServicesCTA";
import { LandingHero } from "@/components/LandingHero";
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
  const [showTool, setShowTool] = useState(false);

  const toolRef = useRef<HTMLDivElement>(null);

  const handleStartTool = () => {
    setShowTool(true);
    // Scroll to tool after a short paint delay
    setTimeout(() => {
      toolRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleChange = (patch: Partial<FormState>) => {
    setFormState((prev) => ({ ...prev, ...patch }));
    if (aiNotices) setAiNotices(null);
  };

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
    try {
      await fetch("/api/send-notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: lead.yourEmail,
          deceasedName: lead.deceasedName,
          format: "newspaper",
          noticeText: `Thank you ${lead.yourName},\n\nYour notices for ${lead.deceasedName} are being generated now.\n\nIf you need support with funeral arrangements, our team at Gaia is here to help.\n\nhttps://gaia.com.au`,
        }),
      });
    } catch { /* non-critical */ }
    doGenerate();
  };

  const handleStartOver = () => {
    setFormState(INITIAL_FORM_STATE);
    setCurrentStep(0);
    setAiNotices(null);
    setLeadCaptured(false);
    setShowTool(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        {/* Persistent nav */}
        <nav className="no-print fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-deep">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <button
              onClick={handleStartOver}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <div className="w-7 h-7 rounded-lg bg-gaia-gradient flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M8 12h8M12 8l4 4-4 4" />
                </svg>
              </div>
              <span className="text-sm font-700 text-neutral-text">Evergreen</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-muted hidden sm:block">Powered by</span>
              <span className="text-xs font-700 text-gaia-primary bg-gaia-secondary px-3 py-1 rounded-full">
                Gaia
              </span>
              {!showTool && (
                <button
                  onClick={handleStartTool}
                  className="hidden sm:flex items-center gap-1.5 bg-gaia-primary text-white text-xs font-600 px-4 py-2 rounded-lg hover:bg-gaia-tertiary transition-colors"
                >
                  Create notice
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Spacer for fixed nav */}
        <div className="h-14 no-print" />

        {/* Landing hero — hidden after tool starts */}
        {!showTool && <LandingHero onStart={handleStartTool} />}

        {/* Tool section */}
        {showTool && (
          <div ref={toolRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Tool header */}
            <div className="no-print mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-700 text-neutral-text">Create your notice</h2>
                <p className="text-sm text-neutral-muted mt-0.5">Fill in the details below — your preview updates live.</p>
              </div>
              <button
                onClick={handleStartOver}
                className="text-xs text-neutral-muted hover:text-gaia-primary transition-colors"
              >
                ← Back to home
              </button>
            </div>

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

              {/* Right: Preview */}
              <div className="mt-8 lg:mt-0 lg:w-2/5 lg:sticky lg:top-20 lg:self-start">
                <PreviewPanel
                  livePreview={livePreview}
                  aiNotices={aiNotices}
                  isGenerating={isGenerating}
                  deceasedName={formState.fullName}
                />
              </div>
            </div>

            {/* Gaia CTA */}
            {aiNotices && (
              <div className="mt-10 no-print">
                <GaiaServicesCTA />
              </div>
            )}
          </div>
        )}

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
