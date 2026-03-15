import { FormField, Input } from "@/components/ui/FormField";
import type { FormState } from "@/lib/types";

interface Props {
  formState: FormState;
  onChange: (patch: Partial<FormState>) => void;
}

export function Step1Person({ formState, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-700 text-neutral-text">About the person</h2>
        <p className="text-sm text-neutral-muted mt-1">
          Start with the basic details. Only the full name is required.
        </p>
      </div>

      <FormField label="Full name" htmlFor="fullName">
        <Input
          id="fullName"
          type="text"
          placeholder="e.g. Margaret Anne Thompson"
          value={formState.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          autoFocus
        />
      </FormField>

      <FormField
        label="Preferred name or nickname"
        htmlFor="preferredName"
        optional
        hint="If provided, this appears as 'known as...' in the notice."
      >
        <Input
          id="preferredName"
          type="text"
          placeholder="e.g. Maggie"
          value={formState.preferredName}
          onChange={(e) => onChange({ preferredName: e.target.value })}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Age at passing" htmlFor="age" optional>
          <Input
            id="age"
            type="number"
            min="0"
            max="130"
            placeholder="e.g. 84"
            value={formState.age}
            onChange={(e) => onChange({ age: e.target.value })}
          />
        </FormField>

        <FormField label="Date of passing" htmlFor="dateOfPassing" optional>
          <Input
            id="dateOfPassing"
            type="date"
            value={formState.dateOfPassing}
            onChange={(e) => onChange({ dateOfPassing: e.target.value })}
          />
        </FormField>
      </div>

      <FormField
        label="Place of passing"
        htmlFor="placeOfPassing"
        optional
        hint="City, town, or suburb — e.g. Sydney, NSW"
      >
        <Input
          id="placeOfPassing"
          type="text"
          placeholder="e.g. Canberra, ACT"
          value={formState.placeOfPassing}
          onChange={(e) => onChange({ placeOfPassing: e.target.value })}
        />
      </FormField>
    </div>
  );
}
