import type { FormState } from "@/lib/types";
import { TONE_OPTIONS, SERVICE_TYPE_LABELS } from "@/lib/types";

interface Props {
  formState: FormState;
  onGoToStep: (step: number) => void;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso + "T00:00:00");
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface ReviewRowProps {
  label: string;
  value: string;
  onEdit: () => void;
}

function ReviewRow({ label, value, onEdit }: ReviewRowProps) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-neutral-highlight last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-600 text-neutral-muted uppercase tracking-wide">{label}</p>
        <p className="text-sm text-neutral-text mt-0.5 break-words">{value}</p>
      </div>
      <button
        onClick={onEdit}
        className="ml-3 text-xs font-600 text-gaia-tertiary hover:text-gaia-primary transition-colors flex-shrink-0"
      >
        Edit
      </button>
    </div>
  );
}

export function Step6Review({ formState, onGoToStep }: Props) {
  const toneLabel = TONE_OPTIONS.find((t) => t.value === formState.toneStyle)?.label ?? formState.toneStyle;

  const relText = formState.relationships
    .map((r) => `${r.verb} ${r.name}`)
    .join("; ");

  const serviceTypeLabel = formState.serviceType
    ? SERVICE_TYPE_LABELS[formState.serviceType as keyof typeof SERVICE_TYPE_LABELS]
    : "";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-700 text-neutral-text">Review your details</h2>
        <p className="text-sm text-neutral-muted mt-1">
          Check everything looks right, then click Generate to create your notices.
        </p>
      </div>

      {/* Section: The Person */}
      <div className="bg-white rounded-xl border border-neutral-deep overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-highlight border-b border-neutral-deep">
          <span className="text-xs font-700 text-gaia-primary uppercase tracking-wide">The Person</span>
          <button onClick={() => onGoToStep(0)} className="text-xs font-600 text-gaia-tertiary hover:text-gaia-primary transition-colors">Edit</button>
        </div>
        <div className="px-4">
          <ReviewRow label="Full name" value={formState.fullName} onEdit={() => onGoToStep(0)} />
          <ReviewRow label="Preferred name" value={formState.preferredName} onEdit={() => onGoToStep(0)} />
          <ReviewRow label="Age" value={formState.age ? `${formState.age} years` : ""} onEdit={() => onGoToStep(0)} />
          <ReviewRow label="Date of passing" value={formatDate(formState.dateOfPassing)} onEdit={() => onGoToStep(0)} />
          <ReviewRow label="Place of passing" value={formState.placeOfPassing} onEdit={() => onGoToStep(0)} />
        </div>
      </div>

      {/* Section: Family */}
      {formState.relationships.length > 0 && (
        <div className="bg-white rounded-xl border border-neutral-deep overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-highlight border-b border-neutral-deep">
            <span className="text-xs font-700 text-gaia-primary uppercase tracking-wide">Family & Relationships</span>
            <button onClick={() => onGoToStep(1)} className="text-xs font-600 text-gaia-tertiary hover:text-gaia-primary transition-colors">Edit</button>
          </div>
          <div className="px-4">
            <ReviewRow label="Relationships" value={relText} onEdit={() => onGoToStep(1)} />
          </div>
        </div>
      )}

      {/* Section: Their Life */}
      {(formState.occupation || formState.faith || formState.militaryService || formState.passions) && (
        <div className="bg-white rounded-xl border border-neutral-deep overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-highlight border-b border-neutral-deep">
            <span className="text-xs font-700 text-gaia-primary uppercase tracking-wide">Their Life</span>
            <button onClick={() => onGoToStep(2)} className="text-xs font-600 text-gaia-tertiary hover:text-gaia-primary transition-colors">Edit</button>
          </div>
          <div className="px-4">
            <ReviewRow label="Occupation" value={formState.occupation} onEdit={() => onGoToStep(2)} />
            <ReviewRow label="Faith" value={formState.faith} onEdit={() => onGoToStep(2)} />
            <ReviewRow label="Military service" value={formState.militaryService} onEdit={() => onGoToStep(2)} />
            <ReviewRow label="Passions" value={formState.passions} onEdit={() => onGoToStep(2)} />
          </div>
        </div>
      )}

      {/* Section: Tone */}
      <div className="bg-white rounded-xl border border-neutral-deep overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-highlight border-b border-neutral-deep">
          <span className="text-xs font-700 text-gaia-primary uppercase tracking-wide">Tone & Style</span>
          <button onClick={() => onGoToStep(3)} className="text-xs font-600 text-gaia-tertiary hover:text-gaia-primary transition-colors">Edit</button>
        </div>
        <div className="px-4">
          <ReviewRow label="Selected tone" value={toneLabel} onEdit={() => onGoToStep(3)} />
        </div>
      </div>

      {/* Section: Service */}
      {formState.hasService && (
        <div className="bg-white rounded-xl border border-neutral-deep overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-highlight border-b border-neutral-deep">
            <span className="text-xs font-700 text-gaia-primary uppercase tracking-wide">Service Details</span>
            <button onClick={() => onGoToStep(4)} className="text-xs font-600 text-gaia-tertiary hover:text-gaia-primary transition-colors">Edit</button>
          </div>
          <div className="px-4">
            <ReviewRow label="Service type" value={serviceTypeLabel} onEdit={() => onGoToStep(4)} />
            <ReviewRow label="Date" value={formatDate(formState.serviceDate)} onEdit={() => onGoToStep(4)} />
            <ReviewRow label="Time" value={formState.serviceTime} onEdit={() => onGoToStep(4)} />
            <ReviewRow label="Venue" value={formState.venueName} onEdit={() => onGoToStep(4)} />
            <ReviewRow label="Address" value={formState.venueAddress} onEdit={() => onGoToStep(4)} />
            <ReviewRow label="Special instructions" value={formState.specialInstructions} onEdit={() => onGoToStep(4)} />
          </div>
        </div>
      )}

      {/* Mobile: scroll down hint */}
      <div className="lg:hidden bg-gaia-secondary/30 rounded-lg p-4 text-center">
        <p className="text-sm text-gaia-primary font-500">
          Your live preview is below ↓
        </p>
        <p className="text-xs text-gaia-tertiary mt-1">
          Click Generate to get your AI-polished notices.
        </p>
      </div>
    </div>
  );
}
