interface CTACard {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  href: string;
}

const cards: CTACard[] = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Funeral arrangements",
    description:
      "Our compassionate team is here to guide you through every step of the funeral process, with care and no pressure.",
    cta: "Talk to Gaia",
    href: "https://gaia.com.au/funerals",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Pre-paid funeral plans",
    description:
      "Give your family the gift of certainty. Lock in today's prices and spare your loved ones difficult decisions.",
    cta: "Explore plans",
    href: "https://gaia.com.au/prepaid",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Update your Will",
    description:
      "Witnessing this moment is a reminder. Make sure your own wishes are documented and your family is protected.",
    cta: "Create a Will",
    href: "https://gaia.com.au/wills",
  },
];

export function GaiaServicesCTA() {
  return (
    <div className="no-print rounded-2xl overflow-hidden border border-gaia-secondary">
      {/* Header */}
      <div className="bg-gaia-gradient px-6 py-5">
        <p className="text-xs font-600 text-gaia-secondary uppercase tracking-widest mb-1">
          Powered by Gaia
        </p>
        <h3 className="text-xl font-700 text-white">
          We're here to help
        </h3>
        <p className="text-sm text-gaia-secondary mt-1 leading-relaxed">
          Creating this notice is one step. Our team can support you through the rest.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 bg-white">
        {cards.map((card, i) => (
          <a
            key={i}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col gap-3 p-5 hover:bg-neutral-highlight transition-colors
              ${i < cards.length - 1 ? "border-b sm:border-b-0 sm:border-r border-neutral-deep" : ""}`}
          >
            <div className="w-10 h-10 rounded-xl bg-gaia-secondary flex items-center justify-center text-gaia-primary
              group-hover:bg-gaia-primary group-hover:text-white transition-colors">
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-700 text-neutral-text group-hover:text-gaia-primary transition-colors">
                {card.title}
              </p>
              <p className="text-xs text-neutral-muted mt-1 leading-relaxed">
                {card.description}
              </p>
            </div>
            <span className="mt-auto text-xs font-700 text-gaia-primary flex items-center gap-1
              group-hover:gap-2 transition-all">
              {card.cta}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
