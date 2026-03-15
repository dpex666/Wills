interface TipCardProps {
  tip: string;
}

export function TipCard({ tip }: TipCardProps) {
  return (
    <div className="flex gap-3 bg-neutral-highlight border-l-4 border-gaia-quaternary rounded-r-lg p-4">
      <div className="shrink-0 mt-0.5">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#48705B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="text-sm text-gaia-tertiary leading-relaxed">{tip}</p>
    </div>
  );
}
