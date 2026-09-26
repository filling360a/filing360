import Link from "next/link";
import type { ReactNode } from "react";
import { homeMarketplace } from "@/content/home";
import { pillars } from "@/content/services";
import { HandNote } from "@/components/ui/HandNote";

type Tone =
  | "blue"
  | "purple"
  | "green"
  | "amber"
  | "teal"
  | "sky"
  | "violet"
  | "indigo";

const toneStyles: Record<Tone, { bg: string; color: string }> = {
  blue: { bg: "bg-[#dbeafe]", color: "text-[#2563eb]" },
  purple: { bg: "bg-[#ede9fe]", color: "text-[#7c3aed]" },
  green: { bg: "bg-[#dcfce7]", color: "text-[#16a34a]" },
  amber: { bg: "bg-[#fef3c7]", color: "text-[#d97706]" },
  teal: { bg: "bg-[#ccfbf1]", color: "text-[#0d9488]" },
  sky: { bg: "bg-[#e0f2fe]", color: "text-[#0284c7]" },
  violet: { bg: "bg-[#f3e8ff]", color: "text-[#9333ea]" },
  indigo: { bg: "bg-[#e0e7ff]", color: "text-[#4f46e5]" },
};

/** Flat colored icons in soft squares — marketplace mock style */
const pillarIcons: Record<string, ReactNode> = {
  "business-registration": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M4 20h16M6 20V9l6-4 6 4v11" />
      <path d="M10 20v-5h4v5M9 12h2M13 12h2" strokeLinecap="round" />
    </svg>
  ),
  "ngo-non-profit": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 20s-6.5-4-6.5-9a3.5 3.5 0 0 1 6.5-1.7A3.5 3.5 0 0 1 18.5 11c0 5-6.5 9-6.5 9Z" />
      <circle cx="9" cy="8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  "tax-gst": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14h3M14 14h3" strokeLinecap="round" />
    </svg>
  ),
  "intellectual-property": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 3a5 5 0 0 1 3 9c-.7.6-1.1 1.4-1.2 2.2h-3.6C10.1 13.4 9.7 12.6 9 12a5 5 0 0 1 3-9Z" />
      <path d="M10 17h4M10.5 20h3" strokeLinecap="round" />
    </svg>
  ),
  licenses: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "mca-secretarial": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M7 3h8l3 3v15H7V3Z" />
      <path d="M14 3v4h4M9 12h6M9 16h4" strokeLinecap="round" />
    </svg>
  ),
  "global-incorporation": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.5 2.8 2.5 13.2 0 16M12 4c-2.5 2.8-2.5 13.2 0 16" />
    </svg>
  ),
  advisory: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="9" cy="9" r="3" />
      <circle cx="16" cy="10" r="2.2" />
      <path d="M3 19c.8-2.8 3-4.5 6-4.5s5.2 1.7 6 4.5M14 14.5c1.7.2 3.2 1.2 4 3" />
    </svg>
  ),
};

function DocsStack() {
  return (
    <div className="pointer-events-none absolute -right-2 top-8 hidden w-[120px] opacity-90 xl:block" aria-hidden>
      <svg viewBox="0 0 120 140" className="h-auto w-full">
        <rect x="28" y="28" width="70" height="90" rx="8" fill="#bfdbfe" transform="rotate(8 63 73)" />
        <rect x="18" y="22" width="70" height="90" rx="8" fill="#93c5fd" transform="rotate(-4 53 67)" />
        <rect x="22" y="18" width="70" height="90" rx="8" fill="white" stroke="#60a5fa" strokeWidth="1.5" />
        <rect x="34" y="36" width="40" height="5" rx="2.5" fill="#dbeafe" />
        <rect x="34" y="48" width="46" height="4" rx="2" fill="#eff6ff" />
        <rect x="34" y="58" width="36" height="4" rx="2" fill="#eff6ff" />
        <circle cx="72" cy="88" r="14" fill="#2563eb" />
        <path d="M66 88l4 4 8-8" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function Pillars() {
  return (
    <section
      className="relative overflow-hidden bg-[#f0f7ff]"
      id="marketplace"
      aria-labelledby="marketplace-heading"
    >
      <div
        className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full bg-[#bfdbfe]/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-24 h-80 w-80 rounded-full bg-[#dbeafe]/60 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1180px] px-5 py-12 md:px-8 lg:py-16">
        <HandNote
          text={homeMarketplace.noteLeft}
          className="left-2 top-10 hidden xl:block"
          rotate={-8}
          arrow="se"
          delayMs={200}
        />

        <DocsStack />

        {/* Centered header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="marketplace-heading"
            className="text-[26px] font-bold leading-[1.2] tracking-tight text-[#0b2c5e] md:text-[32px]"
          >
            {homeMarketplace.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-[#64748b]">
            {homeMarketplace.subtitle}
          </p>
        </div>

        {/* 4×2 service cards */}
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => {
            const card = homeMarketplace.cards[pillar.slug];
            const tone = toneStyles[(card?.tone ?? "blue") as Tone];
            return (
              <li key={pillar.slug} className="min-w-0">
                <Link
                  href={`/services/${pillar.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/80 bg-white p-4 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)] transition hover:border-[#bfdbfe] hover:shadow-[0_14px_28px_-14px_rgba(37,99,235,0.28)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.bg} ${tone.color}`}
                    >
                      {pillarIcons[pillar.slug]}
                    </span>
                    <span className="rounded-full bg-[#eff6ff] px-2 py-0.5 text-[10px] font-semibold text-[#2563eb]">
                      {pillar.services.length} services
                    </span>
                  </div>

                  <h3 className="mt-3 text-[14px] font-bold text-[#0b2c5e]">
                    {pillar.name}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-snug text-[#64748b]">
                    {card?.blurb ?? pillar.description}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {(card?.highlights ?? []).map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-[11.5px] leading-snug text-[#475569]"
                      >
                        <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white">
                          <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden>
                            <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto flex justify-end pt-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb] transition group-hover:bg-[#2563eb] group-hover:text-white">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
