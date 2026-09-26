import Link from "next/link";
import type { ReactNode } from "react";
import { homeNext } from "@/content/home";
import { siteConfig } from "@/lib/siteConfig";

const iconWrap: Record<string, string> = {
  blue: "bg-[#eff6ff] text-[#2563eb]",
  purple: "bg-[#f5f3ff] text-[#7c3aed]",
  green: "bg-[#ecfdf5] text-[#059669]",
};

const badgeWrap: Record<string, string> = {
  blue: "bg-[#fff7ed] text-[#c2410c]",
  purple: "bg-[#f5f3ff] text-[#6d28d9]",
  green: "bg-[#ecfdf5] text-[#047857]",
};

const cardIcons: Record<string, ReactNode> = {
  gst: (
    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden>
      <rect x="10" y="6" width="20" height="28" rx="3" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" />
      <path d="M15 14h10M15 19h8M15 24h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="33" cy="32" r="9" fill="#22c55e" />
      <path d="m29.5 32.2 2.4 2.4 5-5.2" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  tm: (
    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden>
      <path
        d="M24 5 9 12v10c0 9 5.8 15.2 15 16.8C33.2 37.2 39 31 39 22V12L24 5Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <text
        x="24"
        y="27"
        textAnchor="middle"
        fill="currentColor"
        fontSize="12"
        fontWeight="800"
        fontFamily="system-ui,sans-serif"
      >
        TM
      </text>
    </svg>
  ),
  mca: (
    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden>
      <path
        d="M8 36V18L24 8l16 10v18"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M16 36V22h5v14M27 36V22h5v14" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 36h36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 13.5 24 10l5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

const highlightIcons: Record<string, ReactNode> = {
  blue: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="5" y="3" width="10" height="14" rx="1.5" />
      <path d="M8 7h4M8 10h3" strokeLinecap="round" />
    </svg>
  ),
  purple: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 3 5 7v5c0 4.5 2.8 7.6 7 8.5 4.2-.9 7-4 7-8.5V7l-7-4Z" strokeLinejoin="round" />
    </svg>
  ),
  green: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 18V10l8-5 8 5v8" strokeLinejoin="round" />
      <path d="M9 18V12h6v6" />
    </svg>
  ),
};

const badgeIcons: Record<string, ReactNode> = {
  fire: (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden>
      <path d="M8 1.5c.4 1.8-.6 2.8-1.4 3.8C5.5 6.6 4.5 7.8 4.5 10a3.5 3.5 0 0 0 7 0c0-1.6-.7-2.6-1.5-3.6-.7-.9-1.4-1.7-1.5-3.2-.2 1.2.2 2 .5 2.5Z" />
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden>
      <path d="M2 12.5 3.5 5l2.5 3L8 3.5 10 8l2.5-3 1.5 7.5H2Z" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M3 12V8M7 12V5M11 12V7" strokeLinecap="round" />
    </svg>
  ),
};

export function NextSteps() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#f7fbff] via-white to-[#eef6fc]"
      id="after-incorporation"
      aria-labelledby="next-heading"
    >
      {/* Soft blobs */}
      <div
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#bfdbfe]/35 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#93c5fd]/30 blur-3xl"
        aria-hidden
      />

      {/* Dashed arc over cards */}
      <svg
        viewBox="0 0 1200 520"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        fill="none"
        aria-hidden
      >
        <path
          d="M520 70c120-50 280-55 420-10"
          stroke="#93c5fd"
          strokeWidth="1.4"
          strokeDasharray="3 6"
          opacity="0.7"
        />
        <circle cx="760" cy="48" r="4" fill="#3b82f6" opacity="0.85" />
        <circle cx="760" cy="48" r="9" fill="#3b82f6" opacity="0.15" />
      </svg>

      <div className="relative mx-auto max-w-[1180px] px-5 py-14 md:px-8 lg:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
          {/* Left column */}
          <div className="max-w-xl">
            <h2
              id="next-heading"
              className="text-[28px] font-bold leading-[1.2] tracking-tight text-[#0b1f3a] md:text-[34px] lg:text-[38px]"
            >
              {homeNext.title}
            </h2>

            <p className="mt-4 text-[14.5px] leading-relaxed text-[#64748b] md:text-[15px]">
              {homeNext.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#hero-lead"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#0b2c5e] px-5 text-[13.5px] font-semibold text-white transition hover:bg-[#071f42]"
              >
                {siteConfig.cta.quote}
                <span aria-hidden>→</span>
              </a>
              <Link
                href={homeNext.secondaryHref}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#93c5fd] bg-white px-5 text-[13.5px] font-semibold text-[#0b2c5e] transition hover:border-[#2563eb] hover:bg-[#f8fbff]"
              >
                {homeNext.secondaryCta}
              </Link>
            </div>

            {/* Mini highlight bar */}
            <ul className="mt-8 grid gap-3 rounded-2xl border border-[#e2e8f0] bg-white/80 px-4 py-3.5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:grid-cols-3 sm:gap-2 sm:px-3">
              {homeNext.highlights.map((item) => (
                <li key={item.title} className="flex items-center gap-2.5">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconWrap[item.tone]}`}
                  >
                    {highlightIcons[item.tone]}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-bold text-[#0b1f3a]">
                      {item.title}
                    </span>
                    <span className="block text-[11px] leading-snug text-[#64748b]">
                      {item.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-5 flex items-center justify-center gap-3 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-[#94a3b8]">
              <span className="h-px w-8 bg-[#e2e8f0]" aria-hidden />
              {homeNext.footerNote}
              <span className="h-px w-8 bg-[#e2e8f0]" aria-hidden />
            </p>
          </div>

          {/* Right column — stacked cards */}
          <ul className="flex flex-col gap-4">
            {homeNext.items.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="group relative flex gap-4 rounded-2xl border border-[#eef2f7] bg-white p-5 shadow-[0_12px_32px_-16px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(37,99,235,0.2)]"
                >
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${iconWrap[item.tone]}`}
                  >
                    {cardIcons[item.icon]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-start justify-between gap-2">
                      <span className="text-[15px] font-bold leading-snug text-[#0b1f3a]">
                        {item.title}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold ${badgeWrap[item.tone]}`}
                      >
                        {badgeIcons[item.badgeIcon]}
                        {item.badge}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-relaxed text-[#64748b]">
                      {item.body}
                    </span>
                    <span className="mt-3 inline-flex text-[13px] font-semibold text-[#2563eb] transition group-hover:underline">
                      Explore →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
