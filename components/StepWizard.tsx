"use client";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { TipCard } from "@/components/ui/TipCard";
import { Step1Person } from "@/components/steps/Step1Person";
import { Step2Relationships } from "@/components/steps/Step2Relationships";
import { Step3Life } from "@/components/steps/Step3Life";
import { Step4ToneStyle } from "@/components/steps/Step4ToneStyle";
import { Step5FuneralDetails } from "@/components/steps/Step5FuneralDetails";
import { Step6Review } from "@/components/steps/Step6Review";
import type { FormState } from "@/lib/types";

const STEP_TIPS = [
  "Use the full legal name as it would appear in a newspaper. The preferred name will appear in parentheses.",
  "List closest family first — most publications follow this convention. Each entry can include multiple names (e.g. \"Sarah and Tom\").",
  "These details appear only in the Social Media and Email formats to keep the newspaper notice brief and cost-effective.",
  "The tone shapes the language throughout all three output formats — not just the closing line.",
  "For a private service, you can omit venue details. 'Donations in lieu of flowers' is one of the most common special instructions.",
  "Your AI-polished notices are ready to generate. Check all details above before proceeding.",
];

const TOTAL_STEPS = 6;

interface StepWizardProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formState: FormState;
  onChange: (patch: Partial<FormState>) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function StepWizard({
  currentStep,
  setCurrentStep,
  formState,
  onChange,
  onGenerate,
  isGenerating,
}: StepWizardProps) {
  const canGoNext = currentStep === 0 ? formState.fullName.trim().length > 0 : true;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex flex-col gap-5">
      <ProgressBar currentStep={currentStep} onStepClick={setCurrentStep} />

      <div className="bg-white rounded-2xl border border-neutral-deep shadow-sm p-6">
        {currentStep === 0 && <Step1Person formState={formState} onChange={onChange} />}
        {currentStep === 1 && <Step2Relationships formState={formState} onChange={onChange} />}
        {currentStep === 2 && <Step3Life formState={formState} onChange={onChange} />}
        {currentStep === 3 && <Step4ToneStyle formState={formState} onChange={onChange} />}
        {currentStep === 4 && <Step5FuneralDetails formState={formState} onChange={onChange} />}
        {currentStep === 5 && (
          <Step6Review formState={formState} onGoToStep={setCurrentStep} />
        )}
      </div>

      <TipCard tip={STEP_TIPS[currentStep]} />

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-600
            border border-neutral-deep text-neutral-muted
            hover:text-gaia-primary hover:border-gaia-primary transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        {currentStep < TOTAL_STEPS - 1 ? (
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-600
              bg-gaia-primary text-white
              hover:bg-gaia-tertiary transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ) : (
          <button
            onClick={onGenerate}
            disabled={isGenerating || !formState.fullName.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-700
              bg-gaia-gradient text-white shadow-md
              hover:opacity-90 transition-opacity
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                Generate My Notices
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
