import { FormField, Input, Textarea } from "@/components/ui/FormField";
import type { FormState } from "@/lib/types";

interface Props {
  formState: FormState;
  onChange: (patch: Partial<FormState>) => void;
}

export function Step3Life({ formState, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-700 text-neutral-text">Their life</h2>
        <p className="text-sm text-neutral-muted mt-1">
          These details personalise the Social Media and Email formats. The Newspaper Notice
          stays brief to save cost.
        </p>
      </div>

      <FormField
        label="Occupation or career"
        htmlFor="occupation"
        optional
        hint="e.g. nurse, carpenter, school teacher"
      >
        <Input
          id="occupation"
          type="text"
          placeholder="e.g. retired schoolteacher"
          value={formState.occupation}
          onChange={(e) => onChange({ occupation: e.target.value })}
        />
      </FormField>

      <FormField
        label="Faith or religion"
        htmlFor="faith"
        optional
        hint="e.g. Catholic, Anglican, Buddhist — only if relevant to the family"
      >
        <Input
          id="faith"
          type="text"
          placeholder="e.g. lifelong Catholic"
          value={formState.faith}
          onChange={(e) => onChange({ faith: e.target.value })}
        />
      </FormField>

      <FormField
        label="Military service"
        htmlFor="militaryService"
        optional
        hint="e.g. Vietnam veteran, served with the RAAF"
      >
        <Input
          id="militaryService"
          type="text"
          placeholder="e.g. Vietnam veteran, 1968–1970"
          value={formState.militaryService}
          onChange={(e) => onChange({ militaryService: e.target.value })}
        />
      </FormField>

      <FormField
        label="Passions & interests"
        htmlFor="passions"
        optional
        hint="Separate with commas — e.g. gardening, cricket, woodworking, family history"
      >
        <Textarea
          id="passions"
          rows={3}
          placeholder="e.g. gardening, cricket, woodworking, volunteering at the local RSL"
          value={formState.passions}
          onChange={(e) => onChange({ passions: e.target.value })}
        />
      </FormField>
    </div>
  );
}
