import Image from "next/image";
import type { ReactNode } from "react";
import { homeHuman } from "@/content/home";
import { siteConfig } from "@/lib/siteConfig";
import { HandNote } from "@/components/ui/HandNote";

const pointIcons: Record<string, ReactNode> = {
  search: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 3.5 3.5" strokeLinecap="round" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M7 3h8l3 3v15H7V3Z" />
      <path d="M14 3v4h4M9 12h6M9 16h4" strokeLinecap="round" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 19h16M7 16V9M12 16V5M17 16v-4" strokeLinecap="round" />
    </svg>
  ),
};

const statIcons: Record<string, ReactNode> = {
  people: (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="9" cy="8" r="2.5" />
      <circle cx="16" cy="9" r="2" />
      <path d="M3 18c.7-2.5 2.6-4 6-4s5.3 1.5 6 4M14 14c1.8.2 3.3 1.2 4 3" />
    </svg>
  ),
  rupee: (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M7 6h10M7 10h10M7 6c4 0 6 2 6 5s-2 5-6 5H9l5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19c1.2-3.2 3.5-4.8 6.5-4.8s5.3 1.6 6.5 4.8" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" strokeLinejoin="round" />
    </svg>
  ),
};

function McaLogo() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
      <circle cx="20" cy="20" r="18" fill="#e3f2ed" stroke="#8ecfbc" strokeWidth="1" />
      <g fill="#0f2a45">
        <circle cx="20" cy="14" r="3.2" />
        <ellipse cx="14" cy="15.5" rx="2.4" ry="2.8" />
        <ellipse cx="26" cy="15.5" rx="2.4" ry="2.8" />
        <path d="M12 22c2-3 5-4.5 8-4.5s6 1.5 8 4.5v1.5H12V22Z" />
        <rect x="17.5" y="24" width="5" height="6" rx="0.8" />
        <path d="M13 31h14v1.5H13z" />
      </g>
      <text x="20" y="37" textAnchor="middle" fill="#0e7b5b" fontSize="5" fontWeight="700" fontFamily="system-ui,sans-serif">
        MCA
      </text>
    </svg>
  );
}

function GstLogo() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
      <circle cx="20" cy="20" r="17" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="#0e7b5b" strokeWidth="1.4" />
      <path d="M20 9.5 23 16h7l-5.5 4.2 2 6.8L20 23.2 13.5 27l2-6.8L10 16h7z" fill="#ef4444" />
      <text x="20" y="22.5" textAnchor="middle" fill="#0f2a45" fontSize="7" fontWeight="800" fontFamily="system-ui,sans-serif">
        GST
      </text>
    </svg>
  );
}

function IpLogo() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
      <circle cx="20" cy="20" r="17" fill="#e3f2ed" stroke="#8ecfbc" strokeWidth="1.2" />
      <path
        d="M14 12h8.5c3.2 0 5.5 2.2 5.5 5.2S25.7 22.4 22.5 22.4H18V28h-4V12Zm4 3.2v4h4c1.5 0 2.4-.9 2.4-2s-.9-2-2.4-2H18Z"
        fill="#0f2a45"
      />
      <text x="20" y="36" textAnchor="middle" fill="#0e7b5b" fontSize="5.5" fontWeight="700" fontFamily="system-ui,sans-serif">
        IP
      </text>
    </svg>
  );
}

function CheckDot() {
  return (
    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#1a8f6c] text-white shadow-[0_2px_6px_rgba(34,197,94,0.45)]">
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.2" aria-hidden>
        <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function FilingCard({
  title,
  logo,
  className,
  tall,
}: {
  title: string;
  logo: ReactNode;
  className?: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`relative w-[210px] rounded-2xl border border-[#e8f2ee] bg-white px-3.5 shadow-[0_16px_36px_-14px_rgba(15,23,42,0.3)] ${
        tall ? "py-5" : "py-4"
      } ${className ?? ""}`}
    >
      <div className="flex items-start gap-2.5">
        <span className="shrink-0">{logo}</span>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[14.5px] font-bold leading-snug text-[#0f2a45]">{title}</p>
            <CheckDot />
          </div>
          <div className={`space-y-2 ${tall ? "mt-4" : "mt-3.5"}`} aria-hidden>
            <span className="block h-1.5 w-full rounded-full bg-[#e8f0ec]" />
            <span className="block h-1.5 w-[88%] rounded-full bg-[#e8f0ec]" />
            <span className="block h-1.5 w-[58%] rounded-full bg-[#e8f0ec]" />
            {tall ? <span className="block h-1.5 w-[42%] rounded-full bg-[#e8f0ec]" /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Right-side floating filings cluster — matches mock exactly */
function FilingsCluster() {
  return (
    <div className="relative mx-auto h-[400px] w-[280px] shrink-0">
      {/* Navy arc lines — top loop + bottom curve */}
      <svg
        viewBox="0 0 280 380"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
        fill="none"
        aria-hidden
      >
        {/* Arc over MCA → paper plane */}
        <path
          d="M188 78c28-42 72-58 108-42"
          stroke="#0f2a45"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.75"
        />
        {/* Soft inner arc under plane */}
        <path
          d="M200 92c22-28 58-40 88-28"
          stroke="#145a45"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.35"
        />
        {/* Arc behind / left of IP card */}
        <path
          d="M18 250c-8 48 12 92 58 118"
          stroke="#0f2a45"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M32 262c-4 38 14 72 48 94"
          stroke="#145a45"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.32"
        />
      </svg>

      {/* Green paper plane at arc tip */}
      <div className="absolute right-0 top-6 z-[6] rotate-[18deg]" aria-hidden>
        <svg viewBox="0 0 36 28" className="h-6 w-8 drop-shadow-sm">
          <path d="M2 14 32 4 18 24 14 15Z" fill="#1a8f6c" />
          <path d="M14 15 32 4 20 16Z" fill="#0e7b5b" />
          <path d="M14 15 18 24" stroke="#0b6550" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* MCA — left, tilted counter-clockwise */}
      <div className="absolute left-1 top-12 z-[3] -rotate-[9deg]">
        <FilingCard title="MCA Registration" logo={<McaLogo />} />
      </div>
      {/* GST — further right, taller, slight tilt */}
      <div className="absolute left-[58px] top-[128px] z-[4] -rotate-[1deg]">
        <FilingCard title="GST Registration" logo={<GstLogo />} tall />
      </div>
      {/* IP — back leftish, slight clockwise */}
      <div className="absolute left-3 top-[262px] z-[5] rotate-[4deg]">
        <FilingCard title="IP India Trademarks" logo={<IpLogo />} />
      </div>

      <HandNote
        text={homeHuman.noteRight}
        className="-bottom-1 -right-4 text-right"
        rotate={-4}
        arrow="nw"
        delayMs={350}
      />
    </div>
  );
}

export function HumanOverview() {
  return (
    <section
      className="relative overflow-hidden bg-[#e8f2fc]"
      id="expert-led"
      aria-labelledby="human-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[#c5e8dc]/45 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-[380px] w-[380px] rounded-full bg-[#8ecfbc]/35 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1240px] px-5 py-10 md:px-8 lg:py-12">
        <div className="relative lg:min-h-[440px]">
          {/* Photo */}
          <div className="relative z-[1] mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:absolute lg:inset-y-0 lg:left-0 lg:mx-0 lg:w-[46%] lg:max-w-none">
            <HandNote
              text={homeHuman.noteLeft}
              className="left-2 top-2 hidden text-left xl:block"
              rotate={-8}
              arrow="se"
              delayMs={200}
            />
            <div className="relative aspect-[1448/1086] w-full lg:absolute lg:inset-0 lg:aspect-auto">
              <Image
                src="/cta/image.png?v=2"
                alt="Founder at work — bigger businesses, happier founders"
                fill
                className="object-contain object-left-bottom"
                sizes="(max-width: 1024px) 560px, 46vw"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* CTA card + filings cluster */}
          <div className="relative z-[3] mt-4 flex w-full flex-col items-center gap-8 lg:ml-auto lg:mt-0 lg:w-[62%] lg:flex-row lg:items-start lg:gap-4 lg:pl-2 xl:gap-6">
            <div className="w-full min-w-0 flex-1">
              <div className="rounded-[28px] border border-white bg-white px-5 py-6 text-center shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] md:px-8 md:py-8">
                <p className="mx-auto inline-flex rounded-full bg-[#e3f2ed] px-3.5 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f2a45]">
                  {homeHuman.eyebrow}
                </p>
                <h2
                  id="human-heading"
                  className="mt-3 text-[24px] font-bold leading-[1.25] tracking-tight text-[#0f2a45] md:text-[28px]"
                >
                  {homeHuman.titleLead}{" "}
                  <span className="text-[#0e7b5b]">{homeHuman.titleAccent}</span>
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-[#5b6e7a]">
                  {homeHuman.body}
                </p>

                <ul className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-3 text-left">
                  {homeHuman.points.map((point) => (
                    <li key={point.label} className="flex items-start gap-2 sm:gap-2.5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e3f2ed] text-[#0e7b5b] sm:h-7 sm:w-7">
                        {pointIcons[point.icon]}
                      </span>
                      <span className="text-[13px] font-semibold leading-snug text-[#0f2a45] sm:text-[14px]">
                        {point.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href="#hero-lead"
                    className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-[#0f2a45] px-5 text-[14.5px] font-semibold text-white transition hover:bg-[#0a2036]"
                  >
                    {siteConfig.cta.quote}
                    <span aria-hidden>→</span>
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phoneTel}`}
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-[#d1d5db] bg-white px-5 text-[14.5px] font-semibold text-[#0f2a45] transition hover:border-[#0f2a45]/40"
                  >
                    {siteConfig.cta.expert}
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 lg:block">
              <FilingsCluster />
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <ul className="mx-auto mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-white/80 bg-white px-4 py-4 shadow-[0_12px_32px_-20px_rgba(15,23,42,0.2)] sm:px-5 sm:py-5 lg:mt-10 lg:grid-cols-4 lg:px-8">
          {homeHuman.stats.map((stat) => (
            <li key={stat.title} className="flex items-start gap-2.5 sm:gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e3f2ed] text-[#0e7b5b] sm:h-10 sm:w-10">
                {statIcons[stat.icon]}
              </span>
              <span>
                <span className="block text-[14.5px] font-bold text-[#0f2a45]">
                  {stat.title}
                </span>
                <span className="mt-0.5 block text-[13px] text-[#5b6e7a]">
                  {stat.body}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
