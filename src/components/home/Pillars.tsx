import Link from "next/link";
import type { ReactNode } from "react";
import { homeMarketplace } from "@/content/home";
import { pillarHref, pillars } from "@/content/services";
import { HandNote } from "@/components/ui/HandNote";
import { PillarsRail } from "./PillarsRail";

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
  blue: { bg: "bg-[#d4ede4]", color: "text-[#0e7b5b]" },
  purple: { bg: "bg-[#e3f2ed]", color: "text-[#0f2a45]" },
  green: { bg: "bg-[#e3f2ed]", color: "text-[#0e7b5b]" },
  amber: { bg: "bg-[#e8f6f1]", color: "text-[#0b6550]" },
  teal: { bg: "bg-[#d4ede4]", color: "text-[#0e7b5b]" },
  sky: { bg: "bg-[#e3f2ed]", color: "text-[#0f2a45]" },
  violet: { bg: "bg-[#e8f2ee]", color: "text-[#0f2a45]" },
  indigo: { bg: "bg-[#d4ede4]", color: "text-[#0b6550]" },
};

/** Flat colored icons in soft squares — marketplace mock style */
const pillarIcons: Record<string, ReactNode> = {
  "income-tax": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M7 3h8l3 3v15H7V3Z" />
      <path d="M14 3v4h4M10 10h4M10 12.5h4M12.5 10c1 0 1.5.7 1.5 1.6 0 1-.8 1.7-2 1.7h-.8l2.6 2.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  gst: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14h3M14 14h3" strokeLinecap="round" />
    </svg>
  ),
  startup: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M4 20h16M6 20V9l6-4 6 4v11" />
      <path d="M10 20v-5h4v5M9 12h2M13 12h2" strokeLinecap="round" />
    </svg>
  ),
  mca: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  consultation: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="9" cy="9" r="3" />
      <circle cx="16" cy="10" r="2.2" />
      <path d="M3 19c.8-2.8 3-4.5 6-4.5s5.2 1.7 6 4.5M14 14.5c1.7.2 3.2 1.2 4 3" />
    </svg>
  ),
  accounting: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 11h2M11 11h2M14 11h2M8 14h2M11 14h2M14 14h2M8 17h2M11 17h5" strokeLinecap="round" />
    </svg>
  ),
  "other-services": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <path d="M16.5 13.5v6M13.5 16.5h6" strokeLinecap="round" />
    </svg>
  ),
};

function DocsStack() {
  return (
    <div className="pointer-events-none absolute -right-2 top-8 hidden w-[120px] opacity-90 xl:block" aria-hidden>
      <svg viewBox="0 0 120 140" className="h-auto w-full">
        <rect x="28" y="28" width="70" height="90" rx="8" fill="#c5e8dc" transform="rotate(8 63 73)" />
        <rect x="18" y="22" width="70" height="90" rx="8" fill="#8ecfbc" transform="rotate(-4 53 67)" />
        <rect x="22" y="18" width="70" height="90" rx="8" fill="white" stroke="#5bb89a" strokeWidth="1.5" />
        <rect x="34" y="36" width="40" height="5" rx="2.5" fill="#d4ede4" />
        <rect x="34" y="48" width="46" height="4" rx="2" fill="#e3f2ed" />
        <rect x="34" y="58" width="36" height="4" rx="2" fill="#e3f2ed" />
        <circle cx="72" cy="88" r="14" fill="#0e7b5b" />
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
        className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full bg-[#c5e8dc]/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-24 h-80 w-80 rounded-full bg-[#d4ede4]/60 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1180px] px-5 py-10 md:px-8 lg:py-16">
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
            className="text-[26px] font-bold leading-[1.2] tracking-tight text-[#0f2a45] md:text-[32px]"
          >
            {homeMarketplace.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#5b6e7a]">
            {homeMarketplace.subtitle}
          </p>
        </div>

        <PillarsRail>
          {pillars.map((pillar) => {
            const card = homeMarketplace.cards[pillar.slug];
            const tone = toneStyles[(card?.tone ?? "blue") as Tone];
            return (
              <li
                key={pillar.slug}
                className="min-w-0 lg:shrink-0 lg:grow-0 lg:basis-[calc((100%-3rem)/4)] lg:snap-start"
              >
                <Link
                  href={pillarHref(pillar)}
                  className="group flex h-full flex-col rounded-2xl border border-white/80 bg-white p-4 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)] transition hover:border-[#c5e8dc] hover:shadow-[0_14px_28px_-14px_rgba(14,123,91,0.28)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.bg} ${tone.color}`}
                    >
                      {pillarIcons[pillar.slug]}
                    </span>
                    <span className="rounded-full bg-[#e3f2ed] px-2 py-0.5 text-[12px] font-semibold text-[#0e7b5b]">
                      {pillar.services.length} service{pillar.services.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[15px] font-bold text-[#0f2a45]">
                    {pillar.name}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-snug text-[#5b6e7a]">
                    {card?.blurb ?? pillar.description}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {(card?.highlights ?? []).map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-[13px] leading-snug text-[#4a5d68]"
                      >
                        <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#0e7b5b] text-white">
                          <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden>
                            <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto flex justify-end pt-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e3f2ed] text-[#0e7b5b] transition group-hover:bg-[#0e7b5b] group-hover:text-white">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </PillarsRail>
      </div>
    </section>
  );
}
