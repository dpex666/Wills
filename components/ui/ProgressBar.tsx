const STEPS = [
  "The Person",
  "Family",
  "Their Life",
  "Tone",
  "Service",
  "Generate",
];

interface ProgressBarProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function ProgressBar({ currentStep, onStepClick }: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Desktop: labeled steps */}
      <div className="hidden sm:flex items-center gap-0">
        {STEPS.map((label, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;
          return (
            <div key={i} className="flex items-center flex-1 min-w-0">
              <button
                onClick={() => isDone && onStepClick?.(i)}
                disabled={!isDone}
                className={`flex flex-col items-center gap-1 flex-1 min-w-0 px-1 py-2 rounded-lg transition-all
                  ${isDone ? "cursor-pointer hover:bg-gaia-secondary/40" : "cursor-default"}
                  ${isActive ? "" : ""}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 transition-all
                    ${isDone ? "bg-gaia-tertiary text-white" : ""}
                    ${isActive ? "bg-gaia-primary text-white ring-2 ring-gaia-quaternary ring-offset-2" : ""}
                    ${!isDone && !isActive ? "bg-neutral-highlight border-2 border-neutral-deep text-neutral-muted" : ""}`}
                >
                  {isDone ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-xs font-500 truncate max-w-full
                    ${isActive ? "text-gaia-primary" : isDone ? "text-gaia-tertiary" : "text-neutral-muted"}`}
                >
                  {label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-1 rounded-full transition-all
                    ${isDone ? "bg-gaia-tertiary" : "bg-neutral-deep"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: dots */}
      <div className="sm:hidden flex items-center justify-center gap-2">
        {STEPS.map((_, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;
          return (
            <div
              key={i}
              className={`rounded-full transition-all
                ${isActive ? "w-6 h-2.5 bg-gaia-primary" : ""}
                ${isDone ? "w-2.5 h-2.5 bg-gaia-tertiary" : ""}
                ${!isDone && !isActive ? "w-2.5 h-2.5 bg-neutral-deep" : ""}`}
            />
          );
        })}
      </div>
      {/* Mobile step label */}
      <p className="sm:hidden text-center text-xs font-600 text-gaia-primary mt-2">
        Step {currentStep + 1} of {STEPS.length} — {STEPS[currentStep]}
      </p>
    </div>
  );
}
