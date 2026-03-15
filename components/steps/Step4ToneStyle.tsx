import type { FormState, ToneStyle } from "@/lib/types";
import { TONE_OPTIONS } from "@/lib/types";

interface Props {
  formState: FormState;
  onChange: (patch: Partial<FormState>) => void;
}

export function Step4ToneStyle({ formState, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-700 text-neutral-text">Tone & style</h2>
        <p className="text-sm text-neutral-muted mt-1">
          Choose a tone — it shapes the language across all three output formats.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TONE_OPTIONS.map((option) => {
          const isSelected = formState.toneStyle === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onChange({ toneStyle: option.value as ToneStyle })}
              className={`text-left p-4 rounded-xl border-2 transition-all
                ${isSelected
                  ? "border-gaia-primary bg-gaia-secondary/30"
                  : "border-neutral-deep bg-white hover:border-gaia-secondary hover:bg-neutral-highlight"
                }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-sm font-700 ${isSelected ? "text-gaia-primary" : "text-neutral-text"}`}
                >
                  {option.label}
                </span>
                <div
                  className={`flex-shrink-0 w-4 h-4 rounded-full border-2 mt-0.5 transition-all
                    ${isSelected ? "border-gaia-primary bg-gaia-primary" : "border-neutral-muted"}`}
                >
                  {isSelected && (
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-neutral-muted mt-1 leading-relaxed">
                {option.description}
              </p>
              <div className={`mt-3 pt-3 border-t text-xs italic leading-relaxed
                ${isSelected ? "border-gaia-secondary text-gaia-tertiary" : "border-neutral-deep text-neutral-muted"}`}>
                "{option.preview}"
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
