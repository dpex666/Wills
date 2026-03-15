import { FormField, Input, Textarea } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";
import type { FormState, ServiceType } from "@/lib/types";
import { SERVICE_TYPE_LABELS } from "@/lib/types";

interface Props {
  formState: FormState;
  onChange: (patch: Partial<FormState>) => void;
}

export function Step5FuneralDetails({ formState, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-700 text-neutral-text">Service details</h2>
        <p className="text-sm text-neutral-muted mt-1">
          Optionally include service information in the notice.
        </p>
      </div>

      {/* Toggle */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <button
          role="switch"
          aria-checked={formState.hasService}
          onClick={() => onChange({ hasService: !formState.hasService })}
          className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gaia-quaternary focus:ring-offset-2
            ${formState.hasService ? "bg-gaia-primary" : "bg-neutral-deep"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform
              ${formState.hasService ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
        <span className="text-sm font-600 text-neutral-text group-hover:text-gaia-primary transition-colors">
          Include service details in the notice
        </span>
      </label>

      {formState.hasService && (
        <div className="flex flex-col gap-4 pt-2">
          <FormField label="Service type" htmlFor="serviceType">
            <SelectField
              id="serviceType"
              value={formState.serviceType}
              onChange={(e) => onChange({ serviceType: e.target.value as ServiceType })}
            >
              <option value="">Select type...</option>
              {Object.entries(SERVICE_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectField>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Date" htmlFor="serviceDate" optional>
              <Input
                id="serviceDate"
                type="date"
                value={formState.serviceDate}
                onChange={(e) => onChange({ serviceDate: e.target.value })}
              />
            </FormField>
            <FormField label="Time" htmlFor="serviceTime" optional>
              <Input
                id="serviceTime"
                type="time"
                value={formState.serviceTime}
                onChange={(e) => onChange({ serviceTime: e.target.value })}
              />
            </FormField>
          </div>

          <FormField
            label="Venue name"
            htmlFor="venueName"
            optional
            hint="e.g. St Mary's Church, Chapel of Peace"
          >
            <Input
              id="venueName"
              type="text"
              placeholder="e.g. Chapel of Remembrance"
              value={formState.venueName}
              onChange={(e) => onChange({ venueName: e.target.value })}
            />
          </FormField>

          <FormField
            label="Venue address"
            htmlFor="venueAddress"
            optional
          >
            <Input
              id="venueAddress"
              type="text"
              placeholder="e.g. 42 Memorial Drive, Parramatta NSW 2150"
              value={formState.venueAddress}
              onChange={(e) => onChange({ venueAddress: e.target.value })}
            />
          </FormField>

          <FormField
            label="Special instructions"
            htmlFor="specialInstructions"
            optional
            hint="e.g. Flowers welcome. In lieu of flowers, donations to the Cancer Council are appreciated."
          >
            <Textarea
              id="specialInstructions"
              rows={3}
              placeholder="e.g. Family flowers only. Donations to the Heart Foundation appreciated."
              value={formState.specialInstructions}
              onChange={(e) => onChange({ specialInstructions: e.target.value })}
            />
          </FormField>
        </div>
      )}

      {!formState.hasService && (
        <div className="rounded-lg bg-neutral-highlight p-4 text-sm text-neutral-muted">
          Service details are optional. You can always add them later and regenerate the notice.
        </div>
      )}
    </div>
  );
}
