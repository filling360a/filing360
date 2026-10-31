"use client";

import { useRef } from "react";
import { homeReviews, homeDisclaimer, homeReadyCta } from "@/content/home";
import { siteConfig } from "@/lib/siteConfig";

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#f59e0b]" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M10 1.5 12.6 7l5.9.5-4.5 3.9 1.4 5.7L10 14.4 4.6 17.1l1.4-5.7L1.5 7.5 7.4 7 10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteMark() {
  return (
    <svg viewBox="0 0 40 32" className="h-8 w-10 text-[#c5e8dc]" fill="currentColor" aria-hidden>
      <path d="M0 18.5C0 9.2 5.4 2.8 14.2 0l2.2 3.6C10.8 6 8.2 10.2 8.4 15.2h7.2V32H0V18.5Zm18.4 0C18.4 9.2 23.8 2.8 32.6 0l2.2 3.6C29.2 6 26.6 10.2 26.8 15.2h7.2V32H18.4V18.5Z" />
    </svg>
  );
}

function Spark({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CertificateArt() {
  return (
    <div className="relative mx-auto hidden h-[168px] w-[150px] shrink-0 lg:block" aria-hidden>
      {/* Back page */}
      <div className="absolute left-3 top-3 h-[140px] w-[118px] rotate-[6deg] rounded-xl bg-[#d4ede4]/70 shadow-sm" />

      {/* Front certificate */}
      <div className="absolute left-0 top-0 z-[1] h-[148px] w-[122px] -rotate-[3deg] rounded-xl bg-white px-3.5 py-3.5 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.4)]">
        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#1a8f6c] shadow-[0_4px_12px_rgba(34,197,94,0.45)]">
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.8">
            <path d="m5 12 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-2.5 text-center text-[13px] font-bold leading-snug text-[#0f2a45]">
          Company
          <br />
          Registered
        </p>
        <div className="mt-2.5 space-y-1.5" aria-hidden>
          <span className="mx-auto block h-1 w-[78%] rounded-full bg-[#d4ede4]" />
          <span className="mx-auto block h-1 w-[62%] rounded-full bg-[#e0e7ff]" />
          <span className="mx-auto block h-1 w-[48%] rounded-full bg-[#d4ede4]" />
        </div>
        {/* India flag */}
        <div className="absolute bottom-3 right-3 flex h-4 w-6 overflow-hidden rounded-[2px] border border-[#d7e4de] shadow-sm">
          <span className="h-full w-1/3 bg-[#FF9933]" />
          <span className="relative h-full w-1/3 bg-white">
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#000080]" />
          </span>
          <span className="h-full w-1/3 bg-[#138808]" />
        </div>
      </div>

      <Spark className="absolute -left-3 top-8 h-5 w-5" color="#8ecfbc" />
      <Spark className="absolute -right-2 top-4 h-4 w-4" color="#fbbf24" />
      <Spark className="absolute bottom-6 -right-4 h-5 w-5" color="#fde047" />
    </div>
  );
}

export function Proof() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f2ee] via-[#f3f7fa] to-white">
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#c5e8dc]/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-[#8ecfbc]/25 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1180px] px-5 py-10 md:px-8 lg:py-16">
        {/* Reviews header — no eyebrow */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          <div className="max-w-xl">
            <h2 className="text-[24px] font-bold leading-[1.2] tracking-tight text-[#0f2a45] md:text-[34px]">
              {homeReviews.titleLead}{" "}
              <span className="relative inline-block text-[#0e7b5b]">
                {homeReviews.titleAccent}
                <svg
                  viewBox="0 0 180 10"
                  className="absolute -bottom-1 left-0 w-full"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 7c40-4 90-6 176-2"
                    stroke="#8ecfbc"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5b6e7a]">
              {homeReviews.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 lg:pt-1">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4ede4] bg-white text-[#0f2a45] transition hover:border-[#8ecfbc] hover:bg-[#e3f2ed]"
              aria-label="Previous reviews"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4ede4] bg-white text-[#0f2a45] transition hover:border-[#8ecfbc] hover:bg-[#e3f2ed]"
              aria-label="Next reviews"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#hero-lead"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#0f2a45] px-5 text-[14.5px] font-semibold text-white transition hover:bg-[#0a2036]"
            >
              {siteConfig.cta.quoteInstant}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* Review cards */}
        <div
          ref={scrollerRef}
          className="rail rail-bleed mt-6 grid gap-5 scroll-smooth [--rail-item:84%] [--rail-item-sm:46%] lg:mt-9 lg:grid-cols-3"
        >
          {homeReviews.items.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-2xl border border-white bg-white p-5 shadow-[0_12px_36px_-16px_rgba(15,23,42,0.16)]"
            >
              <div className="flex items-start justify-between">
                <Stars />
                <QuoteMark />
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[#4a5d68]">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-[#e8f0ec] pt-4">
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d4ede4] text-[13px] font-bold text-[#0f2a45]">
                    {r.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14.5px] font-bold text-[#0f2a45]">
                      {r.name}
                    </span>
                    <span className="block truncate text-[13px] text-[#5b6e7a]">
                      {r.role}
                    </span>
                  </span>
                </span>
                <span className="shrink-0 rounded-full bg-[#e3f2ed] px-2.5 py-1 text-[12.5px] font-semibold text-[#0e7b5b]">
                  {r.service}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Ready CTA banner — matches mock */}
        <div className="relative mt-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0f2a45] via-[#0f2a45] to-[#0e7b5b] px-5 py-7 text-white sm:px-8 md:px-10 md:py-10 lg:mt-12">
          {/* Wave shapes */}
          <div
            className="pointer-events-none absolute -left-16 top-[-40%] h-[180%] w-[55%] rounded-[100%] bg-[#1e4fa8]/35 blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-10 bottom-[-30%] h-[140%] w-[45%] rounded-[100%] bg-[#0e7b5b]/40 blur-2xl"
            aria-hidden
          />
          <svg
            viewBox="0 0 1100 240"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            fill="none"
            aria-hidden
          >
            <path
              d="M-20 180c120-70 220-90 340-40s220 70 360 20 240-90 420-40"
              stroke="#5bb89a"
              strokeWidth="1.4"
            />
            <path
              d="M-20 120c140-50 260-30 380 20s200 40 320-10 260-60 400-20"
              stroke="#8ecfbc"
              strokeWidth="1.1"
              opacity="0.7"
            />
            <path
              d="M200 220c100-30 200-20 300 10"
              stroke="#c5e8dc"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>

          <div className="relative grid items-center gap-6 lg:grid-cols-[1.35fr_auto_auto] lg:gap-10">
            {/* Left copy */}
            <div className="min-w-0">
              <h3 className="text-[24px] font-bold tracking-tight md:text-[28px]">
                {homeReadyCta.title}
              </h3>
              <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-white/80 md:text-[15px]">
                {homeReadyCta.body}
              </p>
              <ul className="mt-6 flex flex-wrap items-center gap-y-2 text-[14px] font-medium text-white sm:text-[14.5px]">
                {homeReadyCta.points.map((point, i) => (
                  <li key={point} className="flex items-center">
                    {i > 0 ? (
                      <span className="mx-3 hidden h-4 w-px bg-white/30 sm:block" aria-hidden />
                    ) : null}
                    <span className="flex items-center gap-2">
                      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white">
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-[#0b6550]" fill="none" stroke="currentColor" strokeWidth="3.2" aria-hidden>
                          <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <CertificateArt />

            {/* Buttons */}
            <div className="grid w-full shrink-0 grid-cols-2 gap-3 sm:flex sm:w-auto sm:min-w-[200px] sm:flex-col">
              <a
                href="#hero-lead"
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-white px-6 text-[15px] font-semibold text-[#0f2a45] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition hover:bg-[#e3f2ed]"
              >
                {siteConfig.cta.quote}
                <span aria-hidden>→</span>
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/50 bg-transparent px-6 text-[15px] font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M7 3h3.5l1.2 4.2-2.2 1.4a12 12 0 0 0 5.7 5.7l1.4-2.2L21 13.5V17a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
                </svg>
                Call now
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 flex items-start gap-2 text-[13px] leading-relaxed text-[#8a9ba6]">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[#8a9ba6]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" strokeLinejoin="round" />
          </svg>
          {homeDisclaimer}
        </p>
      </div>
    </section>
  );
}
