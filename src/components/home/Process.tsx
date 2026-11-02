"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { homeHow } from "@/content/home";
import { siteConfig } from "@/lib/siteConfig";

type Palette = {
  well: string;
  wellDeep: string;
  mid: string;
  accent: string;
  deep: string;
  highlight: string;
  border: string;
  muted: string;
};

const palettes: Palette[] = [
  {
    well: "#f3e2e6",
    wellDeep: "#e3b7c0",
    mid: "#c47a88",
    accent: "#7a3044",
    deep: "#5a2032",
    highlight: "#fbecee",
    border: "#ead0d5",
    muted: "#6b534c",
  },
  {
    well: "#f0e4c4",
    wellDeep: "#dcc07a",
    mid: "#c4a35a",
    accent: "#8a6914",
    deep: "#6b5210",
    highlight: "#fbf6ea",
    border: "#e2d19a",
    muted: "#6b5a3a",
  },
  {
    well: "#dce6ef",
    wellDeep: "#b0c3d4",
    mid: "#6e8aa3",
    accent: "#0f2a45",
    deep: "#0a1d30",
    highlight: "#eef3f8",
    border: "#cdd8e4",
    muted: "#4a5f73",
  },
];

const green: Palette = {
  well: "#e8f6f1",
  wellDeep: "#8ecfbc",
  mid: "#5bb89a",
  accent: "#0e7b5b",
  deep: "#0b6550",
  highlight: "#e3f2ed",
  border: "#8ecfbc",
  muted: "#3d6e5e",
};

function hexAlpha(hex: string, alpha: number) {
  const n = hex.replace("#", "");
  const r = Number.parseInt(n.slice(0, 2), 16);
  const g = Number.parseInt(n.slice(2, 4), 16);
  const b = Number.parseInt(n.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function StepIllustration({ index, p }: { index: number; p: Palette }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 160 100" className="h-[88px] w-auto" aria-hidden>
        <ellipse cx="80" cy="52" rx="62" ry="38" fill={p.well} opacity="0.9" />
        <rect x="42" y="22" width="76" height="62" rx="10" fill="#fff" stroke={p.mid} strokeWidth="1.5" />
        <circle cx="58" cy="40" r="7" fill={p.highlight} stroke={p.accent} strokeWidth="1.4" />
        <path d="M53 40c0-2.5 2-4.5 5-4.5s5 2 5 4.5" fill="none" stroke={p.deep} strokeWidth="1.2" />
        <rect x="70" y="36" width="36" height="4" rx="2" fill={p.wellDeep} />
        <rect x="70" y="44" width="28" height="3" rx="1.5" fill={p.well} />
        <circle cx="56" cy="58" r="5" fill={p.highlight} stroke={p.accent} strokeWidth="1.2" />
        <path d="M54 58h4M56 56v4" stroke={p.deep} strokeWidth="1.2" strokeLinecap="round" />
        <rect x="66" y="55" width="34" height="4" rx="2" fill={p.wellDeep} />
        <circle cx="56" cy="72" r="5" fill={p.highlight} stroke={p.accent} strokeWidth="1.2" />
        <path d="M56 69.5v5M54 71.5c1.2 1.5 2.8 1.5 4 0" fill="none" stroke={p.deep} strokeWidth="1.1" />
        <rect x="66" y="69" width="30" height="4" rx="2" fill={p.well} />
        <rect x="52" y="80" width="56" height="10" rx="5" fill={p.accent} />
        <path d="M128 28l4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5 1.5-4z" fill={p.mid} />
        <path d="M34 70h6M37 67v6" stroke={p.mid} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 160 100" className="h-[88px] w-auto" aria-hidden>
        <ellipse cx="80" cy="54" rx="58" ry="36" fill={p.well} opacity="0.9" />
        <rect x="48" y="18" width="64" height="68" rx="8" fill="#fff" stroke={p.mid} strokeWidth="1.5" />
        <text
          x="80"
          y="42"
          textAnchor="middle"
          fill={p.accent}
          fontSize="18"
          fontWeight="700"
          fontFamily="system-ui,sans-serif"
        >
          ₹
        </text>
        <rect x="58" y="50" width="44" height="3.5" rx="1.75" fill={p.wellDeep} />
        <rect x="58" y="58" width="36" height="3.5" rx="1.75" fill={p.well} />
        <rect x="58" y="66" width="40" height="3.5" rx="1.75" fill={p.well} />
        <circle cx="104" cy="74" r="11" fill={p.accent} />
        <path
          d="M98.5 74.5l3.2 3.2 7-7"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M36 34h5M38.5 31.5v5" stroke={p.mid} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M122 40l3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill={p.mid} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 100" className="h-[88px] w-auto" aria-hidden>
      <ellipse cx="80" cy="54" rx="60" ry="36" fill={p.well} opacity="0.9" />
      <rect x="36" y="24" width="88" height="56" rx="8" fill="#fff" stroke={p.mid} strokeWidth="1.5" />
      <rect x="36" y="24" width="88" height="12" rx="8" fill={p.accent} />
      <circle cx="46" cy="30" r="2" fill="#fca5a5" />
      <circle cx="54" cy="30" r="2" fill="#fde68a" />
      <circle cx="62" cy="30" r="2" fill="#86efac" />
      <line x1="52" y1="52" x2="108" y2="52" stroke={p.wellDeep} strokeWidth="3" strokeLinecap="round" />
      <line x1="52" y1="52" x2="88" y2="52" stroke={p.accent} strokeWidth="3" strokeLinecap="round" />
      <circle cx="52" cy="52" r="5" fill={p.accent} />
      <circle cx="80" cy="52" r="5" fill={p.mid} />
      <circle cx="108" cy="52" r="5" fill={p.wellDeep} />
      <rect x="58" y="64" width="52" height="14" rx="7" fill={p.highlight} stroke={p.mid} strokeWidth="1" />
      <circle cx="70" cy="71" r="3" fill={p.accent} />
      <text x="78" y="74" fill={p.deep} fontSize="7.5" fontWeight="600" fontFamily="system-ui,sans-serif">
        In Progress
      </text>
      <path d="M128 28l3.5 1.2-3.5 1.2-1.2 3.5-1.2-3.5-3.5-1.2 3.5-1.2 1.2-3.5z" fill={p.mid} />
    </svg>
  );
}

function ConnectorArrow({ color, active }: { color: string; active: boolean }) {
  return (
    <span
      className="hidden shrink-0 items-center justify-center transition-colors duration-500 lg:flex"
      style={{ color }}
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

function StepCard({
  index,
  step,
  done,
  current,
  p,
}: {
  index: number;
  step: (typeof homeHow.steps)[number];
  done: boolean;
  current: boolean;
  p: Palette;
}) {
  return (
    <article
      className="relative flex h-full flex-col rounded-2xl border p-5 transition-all duration-500"
      style={{
        borderColor: current ? green.border : p.border,
        background: current
          ? "#ffffff"
          : `linear-gradient(180deg, ${done ? p.well : p.highlight} 0%, #ffffff 48%)`,
        boxShadow: current
          ? "0 16px 36px -14px rgba(14,123,91,0.45)"
          : `0 12px 28px -18px ${hexAlpha(p.accent, 0.22)}`,
        outline: current ? "2px solid rgba(197,232,220,0.8)" : "none",
        outlineOffset: current ? "1px" : 0,
      }}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full text-[13.5px] font-bold transition-colors duration-500"
        style={{
          backgroundColor: done || current ? p.accent : p.well,
          color: done || current ? "#fff" : p.muted,
        }}
      >
        {done ? (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
            <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          index + 1
        )}
      </span>
      <div className="mt-3 flex justify-center">
        <StepIllustration index={index} p={p} />
      </div>
      <h3 className="mt-3 text-center text-[16px] font-bold" style={{ color: p.accent }}>
        {step.title}
      </h3>
      <p className="mt-1.5 flex-1 text-center text-[13.5px] leading-snug" style={{ color: p.muted }}>
        {step.body}
      </p>
      {current ? (
        <span
          className="mx-auto mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: p.well, color: p.accent }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ backgroundColor: p.accent }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.accent }} />
          </span>
          In progress
        </span>
      ) : done ? (
        <span
          className="mx-auto mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: p.highlight, color: p.accent }}
        >
          Done
        </span>
      ) : (
        <span
          className="mx-auto mt-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: p.highlight, color: p.muted }}
        >
          Up next
        </span>
      )}
    </article>
  );
}

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
          0%, 100% { box-shadow: 0 0 0 0 var(--pulse-color); }
          50% { box-shadow: 0 0 0 10px transparent; }
        }
      `}</style>

      <div
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#e3b7c0]/35 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-[#e8d5a8]/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#b0c3d4]/40 blur-3xl"
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

      <div className="relative mx-auto max-w-[1100px] px-5 py-8 md:px-8 lg:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-heading"
            className="text-[26px] font-bold leading-[1.2] tracking-tight text-[#0f2a45] md:text-[30px]"
          >
            {homeHow.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] leading-snug text-[#5b6e7a]">
            {homeHow.subtitle}
          </p>
        </div>

        <ol className="mx-auto mt-6 flex max-w-md items-start justify-between lg:mt-8">
          {homeHow.track.map((item, i) => {
            const done = i < active;
            const current = i === active;
            const p = current ? green : (palettes[i] ?? palettes[0]);
            return (
              <li key={item.label} className="relative flex flex-1 flex-col items-center text-center">
                {i < homeHow.track.length - 1 ? (
                  <span
                    className="absolute left-[calc(50%+18px)] right-[calc(-50%+18px)] top-[15px] h-0.5 overflow-hidden rounded-full"
                    style={{ backgroundColor: p.well }}
                    aria-hidden
                  >
                    <span
                      className={`block h-full origin-left rounded-full transition-transform duration-700 ease-out ${
                        i < active ? "scale-x-100" : "scale-x-0"
                      }`}
                      style={{
                        background: `linear-gradient(90deg, ${p.accent}, ${palettes[i + 1]?.accent ?? p.accent})`,
                      }}
                    />
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="relative z-[1] flex flex-col items-center"
                  aria-current={current ? "step" : undefined}
                  aria-label={`Step ${i + 1}: ${item.label}`}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[13.5px] font-bold transition-all duration-500"
                    style={
                      done || current
                        ? {
                            backgroundColor: p.accent,
                            color: "#fff",
                            boxShadow: current ? `0 0 0 4px ${p.well}` : undefined,
                            animation: current && !reduceMotion ? "process-pulse 1.6s ease-out infinite" : undefined,
                            ["--pulse-color" as string]: hexAlpha(p.accent, 0.4),
                          }
                        : {
                            backgroundColor: p.highlight,
                            color: p.mid,
                            border: `1px solid ${p.border}`,
                          }
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
                    className="mt-2 text-[13px] font-semibold transition-colors duration-500"
                    style={{ color: current || done ? p.accent : "#8a9ba6" }}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <StepCard
                index={active}
                step={homeHow.steps[active]}
                done={false}
                current
                p={green}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 hidden md:grid md:grid-cols-3 md:gap-3 lg:mt-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center lg:gap-3">
          {homeHow.steps.map((step, i) => {
            const done = i < active;
            const current = i === active;
            const p = current ? green : (palettes[i] ?? palettes[0]);
            return (
              <div key={step.title} className="contents">
                <StepCard index={i} step={step} done={done} current={current} p={p} />
                {i < homeHow.steps.length - 1 ? (
                  <ConnectorArrow color={i < active ? p.accent : p.wellDeep} active={i < active} />
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col items-stretch justify-center gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="#hero-lead"
            className="inline-flex h-12 items-center justify-center gap-1.5 rounded-lg bg-[#0e7b5b] px-5 text-[15px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(14,123,91,0.6)] transition hover:bg-[#0b6550] sm:h-10 sm:text-[14.5px]"
          >
            Get free consultation
            <span aria-hidden>→</span>
          </a>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-[#8ecfbc] bg-white px-5 text-[15px] font-semibold text-[#0e7b5b] transition hover:border-[#0e7b5b] sm:h-10 sm:text-[14.5px]"
          >
            Talk to an Expert
          </a>
          <Link
            href="/how-it-works"
            className="inline-flex h-12 items-center justify-center gap-1 px-2 text-[15px] font-semibold text-[#0e7b5b] transition hover:text-[#0f2a45] sm:h-10 sm:text-[14.5px]"
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
