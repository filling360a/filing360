"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { homeHow } from "@/content/home";
import { siteConfig } from "@/lib/siteConfig";

function StepIllustration({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 160 100" className="h-[88px] w-auto" aria-hidden>
        <ellipse cx="80" cy="52" rx="62" ry="38" fill="#dbeafe" opacity="0.55" />
        <rect x="42" y="22" width="76" height="62" rx="10" fill="white" stroke="#93c5fd" strokeWidth="1.5" />
        <circle cx="58" cy="40" r="7" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1.4" />
        <path d="M53 40c0-2.5 2-4.5 5-4.5s5 2 5 4.5" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
        <rect x="70" y="36" width="36" height="4" rx="2" fill="#bfdbfe" />
        <rect x="70" y="44" width="28" height="3" rx="1.5" fill="#dbeafe" />
        <circle cx="56" cy="58" r="5" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1.2" />
        <path d="M54 58h4M56 56v4" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="66" y="55" width="34" height="4" rx="2" fill="#bfdbfe" />
        <circle cx="56" cy="72" r="5" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1.2" />
        <path d="M56 69.5v5M54 71.5c1.2 1.5 2.8 1.5 4 0" fill="none" stroke="#3b82f6" strokeWidth="1.1" />
        <rect x="66" y="69" width="30" height="4" rx="2" fill="#bfdbfe" />
        <rect x="52" y="80" width="56" height="10" rx="5" fill="#2563eb" />
        <path d="M128 28l4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5 1.5-4z" fill="#93c5fd" />
        <path d="M34 70h6M37 67v6" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 160 100" className="h-[88px] w-auto" aria-hidden>
        <ellipse cx="80" cy="54" rx="58" ry="36" fill="#dbeafe" opacity="0.5" />
        <rect x="48" y="18" width="64" height="68" rx="8" fill="white" stroke="#93c5fd" strokeWidth="1.5" />
        <text x="80" y="42" textAnchor="middle" fill="#0b2c5e" fontSize="18" fontWeight="700" fontFamily="system-ui,sans-serif">
          ₹
        </text>
        <rect x="58" y="50" width="44" height="3.5" rx="1.75" fill="#bfdbfe" />
        <rect x="58" y="58" width="36" height="3.5" rx="1.75" fill="#dbeafe" />
        <rect x="58" y="66" width="40" height="3.5" rx="1.75" fill="#dbeafe" />
        <circle cx="104" cy="74" r="11" fill="#22c55e" />
        <path d="M98.5 74.5l3.2 3.2 7-7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 34h5M38.5 31.5v5" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M122 40l3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill="#93c5fd" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 100" className="h-[88px] w-auto" aria-hidden>
      <ellipse cx="80" cy="54" rx="60" ry="36" fill="#dbeafe" opacity="0.5" />
      <rect x="36" y="24" width="88" height="56" rx="8" fill="white" stroke="#93c5fd" strokeWidth="1.5" />
      <rect x="36" y="24" width="88" height="12" rx="8" fill="#eff6ff" />
      <circle cx="46" cy="30" r="2" fill="#fca5a5" />
      <circle cx="54" cy="30" r="2" fill="#fde68a" />
      <circle cx="62" cy="30" r="2" fill="#86efac" />
      <line x1="52" y1="52" x2="108" y2="52" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
      <line x1="52" y1="52" x2="88" y2="52" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <circle cx="52" cy="52" r="5" fill="#2563eb" />
      <circle cx="80" cy="52" r="5" fill="#2563eb" />
      <circle cx="108" cy="52" r="5" fill="#cbd5e1" />
      <rect x="58" y="64" width="52" height="14" rx="7" fill="#ecfdf5" stroke="#86efac" strokeWidth="1" />
      <circle cx="70" cy="71" r="3" fill="#22c55e" />
      <text x="78" y="74" fill="#166534" fontSize="7.5" fontWeight="600" fontFamily="system-ui,sans-serif">
        In Progress
      </text>
      <path d="M128 28l3.5 1.2-3.5 1.2-1.2 3.5-1.2-3.5-3.5-1.2 3.5-1.2 1.2-3.5z" fill="#93c5fd" />
    </svg>
  );
}

function ConnectorArrow({ active }: { active: boolean }) {
  return (
    <span
      className={`hidden shrink-0 items-center justify-center transition-colors duration-500 lg:flex ${
        active ? "text-[#2563eb]" : "text-[#bfdbfe]"
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

const STEP_COUNT = homeHow.steps.length;
const CYCLE_MS = 2200;

export function Process() {
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.45); }
          50% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
        }
        @keyframes process-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      <div
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#bfdbfe]/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#dbeafe]/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-6 top-1/3 hidden h-16 w-10 opacity-40 xl:block"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-6 top-1/3 hidden h-16 w-10 opacity-40 xl:block"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1100px] px-5 py-12 md:px-8 lg:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-heading"
            className="text-[24px] font-bold leading-[1.2] tracking-tight text-[#0b2c5e] md:text-[30px]"
          >
            {homeHow.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[14px] leading-snug text-[#64748b]">
            {homeHow.subtitle}
          </p>
        </div>

        {/* Progress track — fills as steps advance */}
        <ol className="mx-auto mt-8 flex max-w-md items-start justify-between">
          {homeHow.track.map((item, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <li key={item.label} className="relative flex flex-1 flex-col items-center text-center">
                {i < homeHow.track.length - 1 ? (
                  <span
                    className="absolute left-[calc(50%+18px)] right-[calc(-50%+18px)] top-[15px] h-0.5 overflow-hidden rounded-full bg-[#dbeafe]"
                    aria-hidden
                  >
                    <span
                      className={`block h-full origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa] transition-transform duration-700 ease-out ${
                        i < active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                ) : null}
                <span
                  className={`relative z-[1] flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold transition-all duration-500 ${
                    done
                      ? "bg-[#2563eb] text-white"
                      : current
                        ? "bg-[#2563eb] text-white ring-4 ring-[#bfdbfe]"
                        : "border border-[#bfdbfe] bg-[#eff6ff] text-[#93c5fd]"
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
                  className={`mt-2 text-[11px] font-semibold transition-colors duration-500 ${
                    current || done ? "text-[#0b2c5e]" : "text-[#94a3b8]"
                  }`}
                >
                  {item.label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Step cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center lg:gap-3">
          {homeHow.steps.map((step, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <div key={step.title} className="contents">
                <article
                  className={`flex h-full flex-col rounded-2xl border p-5 transition-all duration-500 ${
                    current
                      ? "border-[#93c5fd] bg-white shadow-[0_16px_36px_-14px_rgba(37,99,235,0.45)] ring-2 ring-[#bfdbfe]/80"
                      : done
                        ? "border-[#bbf7d0] bg-[#f0fdf4]/60 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.12)]"
                        : "border-[#e8eef5] bg-white/80 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.12)] opacity-70"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold transition-colors duration-500 ${
                      done
                        ? "bg-[#22c55e] text-white"
                        : current
                          ? "bg-[#2563eb] text-white"
                          : "bg-[#e2e8f0] text-[#94a3b8]"
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
                    className={`mt-3 text-center text-[15px] font-bold transition-colors duration-500 ${
                      current ? "text-[#2563eb]" : "text-[#0b2c5e]"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-center text-[12px] leading-snug text-[#64748b]">
                    {step.body}
                  </p>
                  {current ? (
                    <span className="mx-auto mt-3 inline-flex items-center gap-1 rounded-full bg-[#eff6ff] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#2563eb]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2563eb] opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                      </span>
                      In progress
                    </span>
                  ) : done ? (
                    <span className="mx-auto mt-3 inline-flex items-center gap-1 rounded-full bg-[#ecfdf5] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#16a34a]">
                      Done
                    </span>
                  ) : (
                    <span className="mx-auto mt-3 inline-flex items-center rounded-full bg-[#f1f5f9] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#94a3b8]">
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
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#2563eb] px-5 text-[13px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(37,99,235,0.6)] transition hover:bg-[#1d4ed8]"
          >
            Get free consultation
            <span aria-hidden>→</span>
          </a>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#93c5fd] bg-white px-5 text-[13px] font-semibold text-[#2563eb] transition hover:border-[#2563eb]"
          >
            Talk to an Expert
          </a>
          <Link
            href="/how-it-works"
            className="inline-flex h-10 items-center justify-center gap-1 px-2 text-[13px] font-semibold text-[#2563eb] transition hover:text-[#0b2c5e]"
          >
            View Process
            <span aria-hidden>→</span>
          </Link>
        </div>

        <ul className="mx-auto mt-6 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {homeHow.trust.map((item, i) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#475569]"
            >
              {i === 0 ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
                  <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
              {i === 1 ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <circle cx="9" cy="8" r="3" />
                  <circle cx="16" cy="9" r="2.5" />
                  <path d="M3 19c.8-3 3-5 6-5s5.2 2 6 5M14 14c2.2.2 4 1.6 5 4" />
                </svg>
              ) : null}
              {i === 2 ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#2563eb]" fill="currentColor" aria-hidden>
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
