"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { homeHow } from "@/content/home";
import { siteConfig } from "@/lib/siteConfig";

function StepIllustration({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 160 100" className="h-[88px] w-auto" aria-hidden>
        <ellipse cx="80" cy="52" rx="62" ry="38" fill="#d4ede4" opacity="0.55" />
        <rect x="42" y="22" width="76" height="62" rx="10" fill="white" stroke="#8ecfbc" strokeWidth="1.5" />
        <circle cx="58" cy="40" r="7" fill="#e3f2ed" stroke="#5bb89a" strokeWidth="1.4" />
        <path d="M53 40c0-2.5 2-4.5 5-4.5s5 2 5 4.5" fill="none" stroke="#1a8f6c" strokeWidth="1.2" />
        <rect x="70" y="36" width="36" height="4" rx="2" fill="#c5e8dc" />
        <rect x="70" y="44" width="28" height="3" rx="1.5" fill="#d4ede4" />
        <circle cx="56" cy="58" r="5" fill="#e3f2ed" stroke="#5bb89a" strokeWidth="1.2" />
        <path d="M54 58h4M56 56v4" stroke="#1a8f6c" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="66" y="55" width="34" height="4" rx="2" fill="#c5e8dc" />
        <circle cx="56" cy="72" r="5" fill="#e3f2ed" stroke="#5bb89a" strokeWidth="1.2" />
        <path d="M56 69.5v5M54 71.5c1.2 1.5 2.8 1.5 4 0" fill="none" stroke="#1a8f6c" strokeWidth="1.1" />
        <rect x="66" y="69" width="30" height="4" rx="2" fill="#c5e8dc" />
        <rect x="52" y="80" width="56" height="10" rx="5" fill="#0e7b5b" />
        <path d="M128 28l4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5 1.5-4z" fill="#8ecfbc" />
        <path d="M34 70h6M37 67v6" stroke="#8ecfbc" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 160 100" className="h-[88px] w-auto" aria-hidden>
        <ellipse cx="80" cy="54" rx="58" ry="36" fill="#d4ede4" opacity="0.5" />
        <rect x="48" y="18" width="64" height="68" rx="8" fill="white" stroke="#8ecfbc" strokeWidth="1.5" />
        <text x="80" y="42" textAnchor="middle" fill="#0f2a45" fontSize="18" fontWeight="700" fontFamily="system-ui,sans-serif">
          ₹
        </text>
        <rect x="58" y="50" width="44" height="3.5" rx="1.75" fill="#c5e8dc" />
        <rect x="58" y="58" width="36" height="3.5" rx="1.75" fill="#d4ede4" />
        <rect x="58" y="66" width="40" height="3.5" rx="1.75" fill="#d4ede4" />
        <circle cx="104" cy="74" r="11" fill="#1a8f6c" />
        <path d="M98.5 74.5l3.2 3.2 7-7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 34h5M38.5 31.5v5" stroke="#8ecfbc" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M122 40l3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill="#8ecfbc" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 100" className="h-[88px] w-auto" aria-hidden>
      <ellipse cx="80" cy="54" rx="60" ry="36" fill="#d4ede4" opacity="0.5" />
      <rect x="36" y="24" width="88" height="56" rx="8" fill="white" stroke="#8ecfbc" strokeWidth="1.5" />
      <rect x="36" y="24" width="88" height="12" rx="8" fill="#e3f2ed" />
      <circle cx="46" cy="30" r="2" fill="#fca5a5" />
      <circle cx="54" cy="30" r="2" fill="#fde68a" />
      <circle cx="62" cy="30" r="2" fill="#8ecfbc" />
      <line x1="52" y1="52" x2="108" y2="52" stroke="#d7e4de" strokeWidth="3" strokeLinecap="round" />
      <line x1="52" y1="52" x2="88" y2="52" stroke="#0e7b5b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="52" cy="52" r="5" fill="#0e7b5b" />
      <circle cx="80" cy="52" r="5" fill="#0e7b5b" />
      <circle cx="108" cy="52" r="5" fill="#bfd4cb" />
      <rect x="58" y="64" width="52" height="14" rx="7" fill="#e8f6f1" stroke="#8ecfbc" strokeWidth="1" />
      <circle cx="70" cy="71" r="3" fill="#1a8f6c" />
      <text x="78" y="74" fill="#145a45" fontSize="7.5" fontWeight="600" fontFamily="system-ui,sans-serif">
        In Progress
      </text>
      <path d="M128 28l3.5 1.2-3.5 1.2-1.2 3.5-1.2-3.5-3.5-1.2 3.5-1.2 1.2-3.5z" fill="#8ecfbc" />
    </svg>
  );
}

function ConnectorArrow({ active }: { active: boolean }) {
  return (
    <span
      className={`hidden shrink-0 items-center justify-center transition-colors duration-500 lg:flex ${
        active ? "text-[#0e7b5b]" : "text-[#c5e8dc]"
      }`}
      aria-hidden
    >
      <svg viewBox="0 0 28 16" className="h-4 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
          d="M2 8h20M16 3l7 5-7 5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={active ? "animate-[process-dash_1.2s_linear_infinite]" : undefined}
          strokeDasharray={active ? "6 4" : undefined}
        />
      </svg>
    </span>
  );
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

const STEP_COUNT = homeHow.steps.length;
const CYCLE_MS = 2200;

export function Process() {
  const [active, setActive] = useState(0);
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((s) => (s + 1) % STEP_COUNT);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      className="relative overflow-hidden bg-[#f5f8fc]"
      id="how-it-works"
      aria-labelledby="how-heading"
    >
      <style>{`
        @keyframes process-dash {
          to { stroke-dashoffset: -20; }
        }
        @keyframes process-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(14,123,91, 0.45); }
          50% { box-shadow: 0 0 0 10px rgba(14,123,91, 0); }
        }
        @keyframes process-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      <div
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#c5e8dc]/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#d4ede4]/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-6 top-1/3 hidden h-16 w-10 opacity-40 xl:block"
        style={{
          backgroundImage: "radial-gradient(#8a9ba6 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-6 top-1/3 hidden h-16 w-10 opacity-40 xl:block"
        style={{
          backgroundImage: "radial-gradient(#8a9ba6 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1100px] px-5 py-10 md:px-8 lg:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-heading"
            className="text-[24px] font-bold leading-[1.2] tracking-tight text-[#0f2a45] md:text-[30px]"
          >
            {homeHow.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] leading-snug text-[#5b6e7a]">
            {homeHow.subtitle}
          </p>
        </div>

        {/* Progress track — fills as steps advance */}
        <ol className="mx-auto mt-6 flex max-w-md items-start justify-between lg:mt-8">
          {homeHow.track.map((item, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <li key={item.label} className="relative flex flex-1 flex-col items-center text-center">
                {i < homeHow.track.length - 1 ? (
                  <span
                    className="absolute left-[calc(50%+18px)] right-[calc(-50%+18px)] top-[15px] h-0.5 overflow-hidden rounded-full bg-[#d4ede4]"
                    aria-hidden
                  >
                    <span
                      className={`block h-full origin-left rounded-full bg-gradient-to-r from-[#0e7b5b] to-[#5bb89a] transition-transform duration-700 ease-out ${
                        i < active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                ) : null}
                <span
                  className={`relative z-[1] flex h-8 w-8 items-center justify-center rounded-full text-[13.5px] font-bold transition-all duration-500 ${
                    done
                      ? "bg-[#0e7b5b] text-white"
                      : current
                        ? "bg-[#0e7b5b] text-white ring-4 ring-[#c5e8dc]"
                        : "border border-[#c5e8dc] bg-[#e3f2ed] text-[#8ecfbc]"
                  }`}
                  style={
                    current && !reduceMotion
                      ? { animation: "process-pulse 1.6s ease-out infinite" }
                      : undefined
                  }
                >
                  {done ? (
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={`mt-2 text-[13px] font-semibold transition-colors duration-500 ${
                    current || done ? "text-[#0f2a45]" : "text-[#8a9ba6]"
                  }`}
                >
                  {item.label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Step cards */}
        <div className="rail rail-bleed mt-6 grid gap-4 [--rail-item:72%] [--rail-item-sm:40%] lg:mt-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center lg:gap-3">
          {homeHow.steps.map((step, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <div key={step.title} className="contents">
                <article
                  className={`flex h-full flex-col rounded-2xl border p-5 transition-all duration-500 ${
                    current
                      ? "border-[#8ecfbc] bg-white shadow-[0_16px_36px_-14px_rgba(14,123,91,0.45)] ring-2 ring-[#c5e8dc]/80"
                      : done
                        ? "border-[#c5e8dc] bg-[#e8f6f1]/60 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.12)]"
                        : "border-[#e8f2ee] bg-white/80 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.12)] opacity-70"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[13.5px] font-bold transition-colors duration-500 ${
                      done
                        ? "bg-[#1a8f6c] text-white"
                        : current
                          ? "bg-[#0e7b5b] text-white"
                          : "bg-[#d7e4de] text-[#8a9ba6]"
                    }`}
                  >
                    {done ? (
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                        <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <div
                    className={`mt-3 flex justify-center transition-opacity duration-500 ${
                      current ? "opacity-100" : "opacity-80"
                    }`}
                  >
                    <StepIllustration index={i} />
                  </div>
                  <h3
                    className={`mt-3 text-center text-[16px] font-bold transition-colors duration-500 ${
                      current ? "text-[#0e7b5b]" : "text-[#0f2a45]"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-center text-[13.5px] leading-snug text-[#5b6e7a]">
                    {step.body}
                  </p>
                  {current ? (
                    <span className="mx-auto mt-3 inline-flex items-center gap-1 rounded-full bg-[#e3f2ed] px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-wide text-[#0e7b5b]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0e7b5b] opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0e7b5b]" />
                      </span>
                      In progress
                    </span>
                  ) : done ? (
                    <span className="mx-auto mt-3 inline-flex items-center gap-1 rounded-full bg-[#e8f6f1] px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-wide text-[#0e7b5b]">
                      Done
                    </span>
                  ) : (
                    <span className="mx-auto mt-3 inline-flex items-center rounded-full bg-[#eef4f1] px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-wide text-[#8a9ba6]">
                      Up next
                    </span>
                  )}
                </article>
                {i < homeHow.steps.length - 1 ? (
                  <ConnectorArrow active={i < active} />
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="#hero-lead"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#0e7b5b] px-5 text-[14.5px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(14,123,91,0.6)] transition hover:bg-[#0b6550]"
          >
            Get free consultation
            <span aria-hidden>→</span>
          </a>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#8ecfbc] bg-white px-5 text-[14.5px] font-semibold text-[#0e7b5b] transition hover:border-[#0e7b5b]"
          >
            Talk to an Expert
          </a>
          <Link
            href="/how-it-works"
            className="inline-flex h-10 items-center justify-center gap-1 px-2 text-[14.5px] font-semibold text-[#0e7b5b] transition hover:text-[#0f2a45]"
          >
            View Process
            <span aria-hidden>→</span>
          </Link>
        </div>

        <ul className="mx-auto mt-6 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {homeHow.trust.map((item, i) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#4a5d68]"
            >
              {i === 0 ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0e7b5b]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
                  <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
              {i === 1 ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0e7b5b]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <circle cx="9" cy="8" r="3" />
                  <circle cx="16" cy="9" r="2.5" />
                  <path d="M3 19c.8-3 3-5 6-5s5.2 2 6 5M14 14c2.2.2 4 1.6 5 4" />
                </svg>
              ) : null}
              {i === 2 ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0e7b5b]" fill="currentColor" aria-hidden>
                  <path d="M13 2 4 14h7l-1 8 10-14h-7l1-6Z" />
                </svg>
              ) : null}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
