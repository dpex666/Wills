"use client";

import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";
import { Input } from "@/components/ui/FormField";
import type { FormState, RelationshipEntry, RelationshipVerb } from "@/lib/types";
import { RELATIONSHIP_VERBS } from "@/lib/types";

interface Props {
  formState: FormState;
  onChange: (patch: Partial<FormState>) => void;
}

export function Step2Relationships({ formState, onChange }: Props) {
  const relationships = formState.relationships;

  const addRelationship = () => {
    const newEntry: RelationshipEntry = {
      id: crypto.randomUUID(),
      verb: "beloved husband of",
      name: "",
    };
    onChange({ relationships: [...relationships, newEntry] });
  };

  const updateRelationship = (id: string, patch: Partial<RelationshipEntry>) => {
    onChange({
      relationships: relationships.map((r) =>
        r.id === id ? { ...r, ...patch } : r
      ),
    });
  };

  const removeRelationship = (id: string) => {
    onChange({ relationships: relationships.filter((r) => r.id !== id) });
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-700 text-neutral-text">Family & relationships</h2>
        <p className="text-sm text-neutral-muted mt-1">
          Add the relationships you'd like to mention. Order matters — first listed appears first in the notice.
        </p>
      </div>

      {relationships.length === 0 && (
        <div className="border-2 border-dashed border-neutral-deep rounded-lg p-6 text-center">
          <p className="text-sm text-neutral-muted">No relationships added yet.</p>
          <p className="text-xs text-neutral-muted mt-1">
            This step is optional — you can skip it for a shorter notice.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {relationships.map((rel, index) => (
          <div
            key={rel.id}
            className="flex gap-2 items-start bg-neutral-highlight rounded-lg p-3 border border-neutral-deep"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gaia-secondary flex items-center justify-center text-xs font-700 text-gaia-primary mt-2">
              {index + 1}
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormField label="Relationship" htmlFor={`verb-${rel.id}`}>
                <SelectField
                  id={`verb-${rel.id}`}
                  value={rel.verb}
                  onChange={(e) =>
                    updateRelationship(rel.id, { verb: e.target.value as RelationshipVerb })
                  }
                >
                  {RELATIONSHIP_VERBS.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </SelectField>
              </FormField>

              <FormField
                label="Name(s)"
                htmlFor={`name-${rel.id}`}
                hint="Use 'and' for multiple, e.g. Sarah and Tom"
              >
                <Input
                  id={`name-${rel.id}`}
                  type="text"
                  placeholder="e.g. John or Sarah and Tom"
                  value={rel.name}
                  onChange={(e) =>
                    updateRelationship(rel.id, { name: e.target.value })
                  }
                />
              </FormField>
            </div>

            <button
              onClick={() => removeRelationship(rel.id)}
              className="flex-shrink-0 mt-2 w-7 h-7 rounded-md flex items-center justify-center
                text-neutral-muted hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Remove"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addRelationship}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
          border-2 border-dashed border-gaia-secondary
          text-sm font-600 text-gaia-primary
          hover:bg-gaia-secondary/30 hover:border-gaia-primary transition-all"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add a relationship
      </button>
    </div>
  );
}
