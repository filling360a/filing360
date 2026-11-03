import type { ReactNode } from "react";
import { homeWhy, homeDocuments } from "@/content/home";
import { siteConfig } from "@/lib/siteConfig";
import { HandNote } from "@/components/ui/HandNote";

type Tone = "blue" | "green" | "purple" | "orange";

const toneStyles: Record<
  Tone,
  { iconBg: string; iconColor: string; badge: string }
> = {
  blue: {
    iconBg: "bg-[#e3f2ed]",
    iconColor: "text-[#0e7b5b]",
    badge: "bg-[#e3f2ed] text-[#0e7b5b]",
  },
  green: {
    iconBg: "bg-[#0f2a45]/8",
    iconColor: "text-[#0f2a45]",
    badge: "bg-[#0f2a45] text-white",
  },
  purple: {
    iconBg: "bg-[#d4ede4]",
    iconColor: "text-[#0b6550]",
    badge: "bg-[#e8f6f1] text-[#0b6550]",
  },
  orange: {
    iconBg: "bg-[#e3f2ed]",
    iconColor: "text-[#1a8f6c]",
    badge: "bg-[#e8f6f1] text-[#0e7b5b]",
  },
};

const whyIcons: Record<string, ReactNode> = {
  fee: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" strokeLinecap="round" />
    </svg>
  ),
  specialist: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19c1.2-3.2 3.5-4.8 6.5-4.8s5.3 1.6 6.5 4.8" />
    </svg>
  ),
  entity: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4v2.5M12 17.5V20M4 12h2.5M17.5 12H20" strokeLinecap="round" />
    </svg>
  ),
  desk: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="5" y="5" width="14" height="4" rx="1.2" />
      <rect x="6.5" y="10.5" width="11" height="3.5" rx="1" />
      <rect x="8" y="15.5" width="8" height="3.5" rx="1" />
    </svg>
  ),
};

const benefitIcons: Record<string, ReactNode> = {
  shield: (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="9" cy="8" r="2.5" />
      <circle cx="16" cy="9" r="2" />
      <path d="M3 18c.7-2.5 2.6-4 6-4s5.3 1.5 6 4M14 14c1.8.2 3.3 1.2 4 3" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="9" r="5" />
      <path d="M9.5 13.5 8 21l4-2.5L16 21l-1.5-7.5" />
    </svg>
  ),
};

const docIcons: Record<string, ReactNode> = {
  id: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="12" r="2.5" />
      <path d="M14 10h5M14 14h4" strokeLinecap="round" />
    </svg>
  ),
  photo: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="12" cy="11" r="3" />
      <path d="M8 17c1-2 2.5-3 4-3s3 1 4 3" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 11 12 4l8 7v9H4v-9Z" />
      <path d="M10 20v-6h4v6" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M7 3h8l3 3v15H7V3Z" />
      <path d="M14 3v4h4M9 12h6M9 16h4" />
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
      <path d="m13 7 4 4" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.5 2.8 2.5 13.2 0 16M12 4c-2.5 2.8-2.5 13.2 0 16" />
    </svg>
  ),
};

function DocsIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <svg viewBox="0 0 260 220" className="h-auto w-full" aria-hidden>
        <ellipse cx="130" cy="120" rx="100" ry="70" fill="#d4ede4" opacity="0.45" />
        <rect x="48" y="36" width="110" height="140" rx="10" fill="white" stroke="#8ecfbc" strokeWidth="1.5" />
        <text x="62" y="58" fill="#0f2a45" fontSize="10" fontWeight="700" fontFamily="system-ui,sans-serif">
          Documents Checklist
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <circle cx="68" cy={78 + i * 18} r="6" fill="#0e7b5b" />
            <path
              d={`M65 ${78 + i * 18}l2 2 4-4`}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <rect x="82" y={74 + i * 18} width={60 - i * 4} height="6" rx="3" fill="#d4ede4" />
          </g>
        ))}
        <path d="M150 88h56c6 0 10 4 10 10v70c0 6-4 10-10 10H140c-6 0-10-4-10-10V108c0-6 4-10 10-10h10Z" fill="#0e7b5b" />
        <path d="M140 98h30c4 0 6-2 8-5l2-3h26c5 0 9 4 9 9v4H140v-5Z" fill="#1a8f6c" />
        <rect x="158" y="118" width="48" height="34" rx="4" fill="white" />
        <circle cx="172" cy="132" r="6" fill="#c5e8dc" />
        <rect x="182" y="128" width="18" height="3" rx="1.5" fill="#8ecfbc" />
        <rect x="182" y="135" width="14" height="3" rx="1.5" fill="#d4ede4" />
        <path d="M40 70l3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill="#8ecfbc" />
        <path d="M220 60l2.5.8-2.5.8-.8 2.5-.8-2.5-2.5-.8 2.5-.8.8-2.5z" fill="#8ecfbc" />
      </svg>

      <div className="mt-3 rounded-xl border border-[#c5e8dc] bg-white/80 px-3.5 py-3 backdrop-blur-sm">
        <p className="flex items-start gap-2 text-[13.5px] leading-snug text-[#4a5d68]">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e3f2ed] text-[#0e7b5b]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10c-.8.7-1.3 1.6-1.5 2.5h-5C9.3 14.6 8.8 13.7 8 13a6 6 0 0 1 4-10Z" />
            </svg>
          </span>
          {homeDocuments.tip}
        </p>
      </div>
    </div>
  );
}

function DotGrid() {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 grid grid-cols-4 gap-1.5 opacity-40" aria-hidden>
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} className="h-1 w-1 rounded-full bg-[#8a9ba6]" />
      ))}
    </div>
  );
}

export function WhyUs() {
  return (
    <section
      className="relative overflow-hidden bg-[#f7fafc]"
      id="why-filing360"
      aria-labelledby="why-heading"
    >
      <div
        className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#c5e8dc]/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-[#d4ede4]/50 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1180px] px-5 py-10 md:px-8 lg:py-14">
        <HandNote
          text={homeWhy.noteTop}
          className="right-4 top-6 hidden text-right xl:block"
          rotate={6}
          arrow="sw"
          delayMs={200}
        />

        {/* Equal-height two columns */}
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left */}
          <div className="flex min-w-0 flex-col">
            <h2
              id="why-heading"
              className="text-[24px] font-bold leading-[1.2] tracking-tight text-[#0f2a45] md:text-[28px]"
            >
              {homeWhy.title}
            </h2>
            <p className="mt-2 max-w-lg text-[15px] leading-snug text-[#5b6e7a]">
              {homeWhy.subtitle}
            </p>

            <ul className="rail rail-bleed mt-5 grid flex-1 gap-3.5 [--rail-item:72%] [--rail-item-sm:40%] lg:mt-6 lg:grid-cols-2 lg:grid-rows-2">
              {homeWhy.items.map((item) => {
                const tone = toneStyles[item.tone as Tone];
                return (
                  <li key={item.title} className="min-w-0">
                    <a
                      href="#hero-lead"
                      className="group relative flex h-full flex-col rounded-2xl border border-[#e8f2ee] bg-white p-4 shadow-[0_8px_22px_-16px_rgba(15,23,42,0.2)] transition hover:border-[#c5e8dc] hover:shadow-[0_14px_28px_-16px_rgba(14,123,91,0.25)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.iconBg} ${tone.iconColor}`}
                        >
                          {whyIcons[item.icon]}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11.5px] font-bold uppercase tracking-[0.06em] ${tone.badge}`}
                        >
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="mt-3 text-[15px] font-bold text-[#0f2a45]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 flex-1 text-[13.5px] leading-snug text-[#5b6e7a]">
                        {item.body}
                      </p>

                      <span className="mt-3 flex h-7 w-7 items-center justify-center self-end rounded-full bg-[#e3f2ed] text-[#0e7b5b] transition group-hover:bg-[#0e7b5b] group-hover:text-white">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
                          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right — table + benefits + CTA */}
          <div className="relative flex min-w-0 flex-col">
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#e8f2ee] bg-white shadow-[0_12px_32px_-18px_rgba(15,23,42,0.18)]">
              <div className="grid shrink-0 grid-cols-2 text-[12px] font-bold uppercase tracking-[0.08em] sm:text-[13px] sm:tracking-[0.1em]">
                <p className="border-r border-[#e8f2ee] bg-[#f3f7fa] px-3 py-3 text-[#8a9ba6] sm:px-4 sm:py-3.5">
                  Common elsewhere
                </p>
                <p className="flex items-center gap-1.5 bg-[#e3f2ed] px-3 py-3 text-[#0e7b5b] sm:px-4 sm:py-3.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0e7b5b] text-white">
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Filing360 approach
                </p>
              </div>

              <div className="flex flex-1 flex-col">
                {homeWhy.contrast.map((row) => (
                  <div
                    key={row.bad}
                    className="grid flex-1 grid-cols-2 border-t border-[#e8f0ec] text-[13px] leading-snug sm:text-[14px]"
                  >
                    <p className="flex h-full items-center gap-2 border-r border-[#e8f0ec] bg-white px-3 py-3 text-[#5b6e7a] sm:gap-2.5 sm:px-4 sm:py-4">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fee2e2] text-[#ef4444]">
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden>
                          <path d="M7 7l10 10M17 7 7 17" strokeLinecap="round" />
                        </svg>
                      </span>
                      {row.bad}
                    </p>
                    <p className="flex h-full items-center gap-2 bg-[#f3f7fa] px-3 py-3 font-medium text-[#0f2a45] sm:gap-2.5 sm:px-4 sm:py-4">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e3f2ed] text-[#0e7b5b]">
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden>
                          <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {row.good}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <ul className="mt-5 grid grid-cols-3 gap-3">
              {homeWhy.benefits.map((b) => (
                <li key={b.title} className="flex flex-col items-start gap-1.5 sm:flex-row sm:gap-2.5">
                  <span className="mt-0.5 shrink-0 text-[#0e7b5b]">
                    {benefitIcons[b.icon]}
                  </span>
                  <span>
                    <span className="block text-[14px] font-bold text-[#0f2a45]">
                      {b.title}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-[#5b6e7a]">
                      {b.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#0e7b5b] px-6 text-[14.5px] font-semibold text-white transition hover:bg-[#0b6550]"
              >
                {homeWhy.cta}
                <span aria-hidden>→</span>
              </a>
              <p className="max-w-xs text-[13.5px] leading-snug text-[#5b6e7a]">
                {homeWhy.ctaNote}
              </p>
            </div>

            <DotGrid />
          </div>
        </div>

        {/* Documents / Be prepared */}
        <div className="relative mt-8 overflow-hidden rounded-3xl border border-[#d4ede4] bg-[#eef5fc] p-4 sm:p-6 md:p-8 lg:mt-10">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#c5e8dc]/40 blur-2xl"
            aria-hidden
          />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
            <div>
              <h3 className="text-[22px] font-bold leading-tight tracking-tight text-[#0f2a45] md:text-[26px]">
                {homeDocuments.title}
              </h3>
              <p className="mt-2 max-w-xl text-[14.5px] leading-snug text-[#5b6e7a]">
                {homeDocuments.subtitle}
              </p>

              <ul className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-2.5">
                {homeDocuments.items.map((doc) => (
                  <li
                    key={doc.label}
                    className="flex flex-col items-start gap-2 rounded-xl border border-white/80 bg-white px-3 py-2.5 text-[13px] font-medium leading-snug text-[#0f2a45] shadow-[0_4px_14px_-10px_rgba(15,23,42,0.2)] sm:flex-row sm:items-center sm:gap-2.5 sm:px-3.5 sm:py-3 sm:text-[14px]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e3f2ed] text-[#0e7b5b] sm:h-8 sm:w-8">
                      {docIcons[doc.icon]}
                    </span>
                    {doc.label}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href="#hero-lead"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#0e7b5b] px-5 text-[14.5px] font-semibold text-white transition hover:bg-[#0b6550]"
                >
                  Get free consultation
                  <span aria-hidden>→</span>
                </a>
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[#8ecfbc] bg-white px-4 text-[14.5px] font-semibold text-[#0e7b5b] transition hover:border-[#0e7b5b]"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M21 12c0 4-4 7-9 7-1.2 0-2.3-.2-3.3-.6L3 20l1.7-4.2C4.2 14.7 3.9 13.4 3.9 12 3.9 8 7.9 5 12.9 5S21 8 21 12Z" />
                  </svg>
                  Talk to an expert
                </a>
              </div>

              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                {homeDocuments.trust.map((t, i) => (
                  <li
                    key={t}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5b6e7a]"
                  >
                    {i === 0 ? (
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#0e7b5b]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
                      </svg>
                    ) : null}
                    {i === 1 ? (
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#0e7b5b]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <circle cx="12" cy="12" r="8" />
                        <path d="M12 8v4l2.5 1.5" strokeLinecap="round" />
                      </svg>
                    ) : null}
                    {i === 2 ? (
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#0e7b5b]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <circle cx="9" cy="8" r="2.5" />
                        <circle cx="16" cy="9" r="2" />
                        <path d="M3 18c.7-2.5 2.6-4 6-4s5.3 1.5 6 4M14 14c1.8.2 3.3 1.2 4 3" />
                      </svg>
                    ) : null}
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block">
              <DocsIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
