interface LandingHeroProps {
  onStart: () => void;
}

const FORMAT_PREVIEWS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
      </svg>
    ),
    label: "Newspaper",
    sample: "Margaret Anne Thompson (Maggie)\nAged 84, passed away peacefully\non 12 March 2026 in Brisbane.\n\nBeloved wife of Robert, loving\nmother of Sarah and Tom.\n\nForever in our hearts.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    label: "Social Media",
    sample: "It is with heavy but grateful hearts that we share the passing of Margaret Anne Thompson, aged 84, on 12 March 2026.\n\nMaggie was a devoted schoolteacher and a passionate gardener who touched countless lives. She is survived by her beloved husband Robert and loving children Sarah and Tom.\n\nForever in our hearts.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    sample: "Subject: The Passing of Margaret Anne Thompson\n\nDear friends and family,\n\nWe write to share the sad news of the passing of Margaret Anne Thompson, known to many as Maggie, who passed away peacefully, aged 84, on 12 March 2026 in Brisbane...",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us about them",
    desc: "Enter their name, relationships, and the details that made their life unique — career, passions, faith.",
  },
  {
    step: "02",
    title: "Choose your tone",
    desc: "Traditional, warm and personal, religious, or a celebration of life. The language adapts to match.",
  },
  {
    step: "03",
    title: "Get three notices instantly",
    desc: "A newspaper notice, a social media post, and an email announcement — ready to copy, send, or print.",
  },
];

const TRUST_PILLS = ["Free", "Private", "AI-powered", "Ready in 5 minutes", "3 formats at once"];

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <div className="no-print">
      {/* ── Hero ── */}
      <section className="bg-gaia-gradient text-white">
        <div className="max-w-4xl mx-auto px-5 pt-16 pb-20 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gaia-quaternary" />
            <span className="text-xs font-600 text-gaia-secondary tracking-wide uppercase">Free · Powered by Gaia</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-800 tracking-tight leading-tight mb-5">
            The hardest words,<br />
            <span className="text-gaia-quaternary">made a little easier.</span>
          </h1>

          {/* Sub */}
          <p className="text-lg text-gaia-secondary leading-relaxed max-w-xl mx-auto mb-10">
            Create a dignified death notice for newspaper, social media, and email — all at once, in minutes. Personalised by AI.
          </p>

          {/* CTA */}
          <button
            onClick={onStart}
            className="inline-flex items-center gap-3 bg-white text-gaia-primary px-8 py-4 rounded-2xl text-base font-700
              shadow-lg shadow-black/20 hover:bg-gaia-secondary transition-all hover:scale-105 active:scale-100"
          >
            Create your notice
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {TRUST_PILLS.map((pill) => (
              <span key={pill} className="text-xs font-500 text-gaia-secondary bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-12 overflow-hidden">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48 Z" fill="#F3F7FA" />
          </svg>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="bg-neutral-highlight py-16">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-800 text-neutral-text">Three notices. One step.</h2>
            <p className="text-neutral-muted mt-2 text-sm max-w-md mx-auto">
              Instead of writing each format from scratch, Evergreen generates all three — personalised to your loved one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FORMAT_PREVIEWS.map((f) => (
              <div key={f.label} className="bg-white rounded-2xl border border-neutral-deep overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Card header */}
                <div className="flex items-center gap-2.5 px-4 py-3 border-b border-neutral-deep bg-neutral-highlight">
                  <div className="w-7 h-7 rounded-lg bg-gaia-secondary flex items-center justify-center text-gaia-primary">
                    {f.icon}
                  </div>
                  <span className="text-sm font-700 text-neutral-text">{f.label}</span>
                </div>
                {/* Sample text */}
                <div className="p-4">
                  <pre className="whitespace-pre-wrap font-sans text-xs text-neutral-muted leading-relaxed line-clamp-6">
                    {f.sample}
                  </pre>
                </div>
                {/* Blur fade at bottom */}
                <div className="h-6 bg-gradient-to-t from-white to-transparent -mt-6 relative z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white py-16 border-t border-neutral-deep">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-800 text-neutral-text">Three steps. Five minutes.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="text-5xl font-800 text-gaia-secondary leading-none mb-3">{item.step}</div>
                <h3 className="text-base font-700 text-neutral-text mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-3 bg-gaia-primary text-white px-8 py-4 rounded-2xl text-base font-700
                shadow-md hover:bg-gaia-tertiary transition-all hover:scale-105 active:scale-100"
            >
              Get started — it's free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <p className="text-xs text-neutral-muted mt-3">No account needed. Your details stay on your device.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
