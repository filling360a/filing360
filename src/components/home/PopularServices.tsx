"use client";

import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { homePopular } from "@/content/home";
import { formatInr } from "@/content/services";

type Tone = "pink" | "blue" | "green" | "purple" | "orange" | "sky" | "teal";

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

const palettes: Record<Tone, Palette> = {
  pink: {
    well: "#f3e2e6",
    wellDeep: "#e3b7c0",
    mid: "#c47a88",
    accent: "#7a3044",
    deep: "#5a2032",
    highlight: "#fbecee",
    border: "#ead0d5",
    muted: "#6b534c",
  },
  blue: {
    well: "#dce6ef",
    wellDeep: "#b0c3d4",
    mid: "#6e8aa3",
    accent: "#0f2a45",
    deep: "#0a1d30",
    highlight: "#eef3f8",
    border: "#cdd8e4",
    muted: "#4a5f73",
  },
  green: {
    well: "#cfe8dc",
    wellDeep: "#7ec9b0",
    mid: "#3fa07e",
    accent: "#0e7b5b",
    deep: "#0b6550",
    highlight: "#e8f6f1",
    border: "#a8d5c4",
    muted: "#3d6e5e",
  },
  purple: {
    well: "#f0e4c4",
    wellDeep: "#dcc07a",
    mid: "#c4a35a",
    accent: "#8a6914",
    deep: "#6b5210",
    highlight: "#fbf6ea",
    border: "#e2d19a",
    muted: "#6b5a3a",
  },
  orange: {
    well: "#d5e4db",
    wellDeep: "#9bb9a8",
    mid: "#5d8f76",
    accent: "#1f4f3d",
    deep: "#16382c",
    highlight: "#eef5f1",
    border: "#c3d6cb",
    muted: "#3e5a4c",
  },
  sky: {
    well: "#cfe8e5",
    wellDeep: "#86cdc6",
    mid: "#4aa39b",
    accent: "#0d6b66",
    deep: "#0a524e",
    highlight: "#eaf7f6",
    border: "#b5d8d3",
    muted: "#3e5e5c",
  },
  teal: {
    well: "#d5e0e7",
    wellDeep: "#a3b8c6",
    mid: "#5d7d90",
    accent: "#163a4a",
    deep: "#0f2834",
    highlight: "#eef3f6",
    border: "#c5d2da",
    muted: "#445864",
  },
};

function uid(name: string, part: string) {
  return `${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${part}`;
}

function SoftIcon({ name, p }: { name: string; p: Palette }) {
  const bg = uid(name, "bg");
  const fg = uid(name, "fg");
  const sh = uid(name, "sh");

  const icons: Record<string, ReactNode> = {
    "Section 8 Company": (
      <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden>
        <defs>
          <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={p.well} />
          </linearGradient>
          <linearGradient id={fg} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.mid} />
            <stop offset="45%" stopColor={p.accent} />
            <stop offset="100%" stopColor={p.deep} />
          </linearGradient>
          <filter id={sh} x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor={p.deep} floodOpacity="0.28" />
          </filter>
        </defs>
        <rect x="1" y="1" width="54" height="54" rx="15" fill={`url(#${bg})`} stroke="#fff" strokeWidth="2" />
        <g filter={`url(#${sh})`}>
          <circle cx="34" cy="22" r="7" fill={p.mid} />
          <path d="M24 40c1.2-5.2 4.8-8 10-8s8.8 2.8 10 8" fill={p.mid} />
          <circle cx="22" cy="23" r="8" fill={`url(#${fg})`} />
          <path d="M8 42c1.5-6.2 6-9.5 14-9.5S36.5 35.8 38 42" fill={`url(#${fg})`} />
          <ellipse cx="19" cy="21" rx="2.2" ry="1.4" fill="#fff" opacity="0.4" />
        </g>
      </svg>
    ),
    "Private Limited Company": (
      <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden>
        <defs>
          <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={p.well} />
          </linearGradient>
          <linearGradient id={fg} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.mid} />
            <stop offset="45%" stopColor={p.accent} />
            <stop offset="100%" stopColor={p.deep} />
          </linearGradient>
          <filter id={sh} x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor={p.deep} floodOpacity="0.28" />
          </filter>
        </defs>
        <rect x="1" y="1" width="54" height="54" rx="15" fill={`url(#${bg})`} stroke="#fff" strokeWidth="2" />
        <g filter={`url(#${sh})`}>
          <rect x="10" y="22" width="12" height="22" rx="2" fill={p.mid} />
          <rect x="22" y="12" width="14" height="32" rx="2" fill={`url(#${fg})`} />
          <rect x="36" y="18" width="11" height="26" rx="2" fill={p.accent} />
          {[0, 1, 2, 3].map((r) =>
            [0, 1].map((c) => (
              <rect
                key={`m-${r}-${c}`}
                x={25 + c * 5}
                y={16 + r * 6}
                width="3"
                height="3.2"
                rx="0.6"
                fill={p.highlight}
                opacity="0.95"
              />
            )),
          )}
          {[0, 1, 2].map((r) =>
            [0, 1].map((c) => (
              <rect
                key={`l-${r}-${c}`}
                x={12.5 + c * 4.5}
                y={26 + r * 5}
                width="2.8"
                height="2.8"
                rx="0.5"
                fill={p.highlight}
                opacity="0.85"
              />
            )),
          )}
          {[0, 1, 2, 3].map((r) => (
            <rect
              key={`r-${r}`}
              x="39"
              y={22 + r * 5}
              width="5"
              height="2.8"
              rx="0.5"
              fill={p.well}
              opacity="0.95"
            />
          ))}
          <rect x="26" y="38" width="6" height="6" rx="1" fill={p.deep} />
        </g>
      </svg>
    ),
    "GST Registration": (
      <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden>
        <defs>
          <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={p.well} />
          </linearGradient>
          <linearGradient id={fg} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor={p.highlight} />
          </linearGradient>
          <filter id={sh} x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor={p.deep} floodOpacity="0.25" />
          </filter>
        </defs>
        <rect x="1" y="1" width="54" height="54" rx="15" fill={`url(#${bg})`} stroke="#fff" strokeWidth="2" />
        <g filter={`url(#${sh})`}>
          <path
            d="M16 10h18l8 8v26a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3Z"
            fill={`url(#${fg})`}
            stroke={p.mid}
            strokeWidth="1.2"
          />
          <path d="M34 10v7a2 2 0 0 0 2 2h7" fill={p.well} stroke={p.mid} strokeWidth="1.2" />
          <text
            x="28"
            y="28"
            textAnchor="middle"
            fill={p.deep}
            fontSize="9"
            fontWeight="800"
            fontFamily="system-ui,sans-serif"
          >
            GST
          </text>
          <rect x="18" y="33" width="20" height="2.2" rx="1.1" fill={p.mid} />
          <rect x="18" y="38" width="16" height="2.2" rx="1.1" fill={p.wellDeep} />
          <rect x="18" y="43" width="12" height="2.2" rx="1.1" fill={p.wellDeep} />
        </g>
      </svg>
    ),
    "Income Tax Return (ITR)": (
      <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden>
        <defs>
          <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={p.well} />
          </linearGradient>
          <linearGradient id={fg} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.mid} />
            <stop offset="55%" stopColor={p.accent} />
            <stop offset="100%" stopColor={p.deep} />
          </linearGradient>
          <filter id={sh} x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor={p.deep} floodOpacity="0.28" />
          </filter>
        </defs>
        <rect x="1" y="1" width="54" height="54" rx="15" fill={`url(#${bg})`} stroke="#fff" strokeWidth="2" />
        <g filter={`url(#${sh})`}>
          <path
            d="M17 9h16l8 8v28a2.5 2.5 0 0 1-2.5 2.5h-21.5A2.5 2.5 0 0 1 14.5 45V11.5A2.5 2.5 0 0 1 17 9Z"
            fill={`url(#${fg})`}
          />
          <path d="M33 9v8h8" fill={p.mid} opacity="0.8" />
          <text
            x="27.5"
            y="35"
            textAnchor="middle"
            fill="#fff"
            fontSize="16"
            fontWeight="800"
            fontFamily="system-ui,sans-serif"
          >
            ₹
          </text>
          <rect x="20" y="39" width="15" height="2.2" rx="1.1" fill={p.highlight} opacity="0.7" />
        </g>
      </svg>
    ),
    "Annual MCA Compliance": (
      <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden>
        <defs>
          <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={p.well} />
          </linearGradient>
          <linearGradient id={fg} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.mid} />
            <stop offset="45%" stopColor={p.accent} />
            <stop offset="100%" stopColor={p.deep} />
          </linearGradient>
          <filter id={sh} x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor={p.deep} floodOpacity="0.28" />
          </filter>
        </defs>
        <rect x="1" y="1" width="54" height="54" rx="15" fill={`url(#${bg})`} stroke="#fff" strokeWidth="2" />
        <g filter={`url(#${sh})`}>
          <path d="M18 18h20a2 2 0 0 1 2 2v2H16v-2a2 2 0 0 1 2-2Z" fill={p.mid} />
          <path
            d="M20 16a4 4 0 0 1 8 0"
            fill="none"
            stroke={p.accent}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <rect x="10" y="22" width="36" height="24" rx="4" fill={`url(#${fg})`} />
          <rect x="10" y="30" width="36" height="4" fill={p.deep} opacity="0.35" />
          <rect x="24" y="32" width="8" height="5" rx="1.5" fill={p.highlight} />
          <ellipse cx="18" cy="26" rx="3" ry="1.6" fill="#fff" opacity="0.28" />
        </g>
      </svg>
    ),
    "Limited Liability Partnership": (
      <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden>
        <defs>
          <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={p.well} />
          </linearGradient>
          <linearGradient id={fg} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.mid} />
            <stop offset="45%" stopColor={p.accent} />
            <stop offset="100%" stopColor={p.deep} />
          </linearGradient>
          <filter id={sh} x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor={p.deep} floodOpacity="0.28" />
          </filter>
        </defs>
        <rect x="1" y="1" width="54" height="54" rx="15" fill={`url(#${bg})`} stroke="#fff" strokeWidth="2" />
        <g filter={`url(#${sh})`}>
          <circle cx="34" cy="22" r="7" fill={p.mid} />
          <path d="M24 40c1.2-5.2 4.8-8 10-8s8.8 2.8 10 8" fill={p.mid} />
          <circle cx="22" cy="23" r="8" fill={`url(#${fg})`} />
          <path d="M8 42c1.5-6.2 6-9.5 14-9.5S36.5 35.8 38 42" fill={`url(#${fg})`} />
        </g>
      </svg>
    ),
    "One Person Company": (
      <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden>
        <defs>
          <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={p.well} />
          </linearGradient>
          <linearGradient id={fg} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.mid} />
            <stop offset="45%" stopColor={p.accent} />
            <stop offset="100%" stopColor={p.deep} />
          </linearGradient>
          <filter id={sh} x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor={p.deep} floodOpacity="0.28" />
          </filter>
        </defs>
        <rect x="1" y="1" width="54" height="54" rx="15" fill={`url(#${bg})`} stroke="#fff" strokeWidth="2" />
        <g filter={`url(#${sh})`}>
          <circle cx="28" cy="22" r="9" fill={`url(#${fg})`} />
          <path d="M10 44c2-7.5 8-11.5 18-11.5S44 36.5 46 44" fill={`url(#${fg})`} />
          <ellipse cx="24" cy="19" rx="2.5" ry="1.5" fill="#fff" opacity="0.4" />
        </g>
      </svg>
    ),
  };

  return (
    <span className="inline-flex shrink-0 drop-shadow-[0_8px_16px_rgba(15,42,69,0.16)]">
      {icons[name] ?? icons["Private Limited Company"]}
    </span>
  );
}

const VISIBLE = 5;

function arcStyle(offset: number): CSSProperties {
  const rotate = offset * 7;
  const y = Math.abs(offset) * 14;
  const scale = offset === 0 ? 1.06 : 1 - Math.abs(offset) * 0.04;
  const z = 10 - Math.abs(offset);
  return {
    transform: `translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
    zIndex: z,
  };
}

export function PopularServices() {
  const items = homePopular.items;
  const [start, setStart] = useState(0);
  const [perView, setPerView] = useState(VISIBLE);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1);
      else if (window.innerWidth < 1024) setPerView(3);
      else setPerView(VISIBLE);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxStart = Math.max(0, items.length - perView);
  const pageCount = maxStart + 1;

  const prev = useCallback(() => {
    setStart((s) => Math.max(0, s - 1));
  }, []);

  const next = useCallback(() => {
    setStart((s) => Math.min(maxStart, s + 1));
  }, [maxStart]);

  const isRail = perView < VISIBLE;
  const visible = isRail ? items : items.slice(start, start + perView);
  const centerIdx = Math.floor((visible.length - 1) / 2);

  return (
    <section
      className="relative overflow-hidden bg-[#f3f7fa]"
      id="services"
      aria-labelledby="services-heading"
    >
      <div
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#c5e8dc]/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-10 top-24 h-56 w-56 rounded-full bg-[#e8d5a8]/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-[#d4ede4]/55 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-20 h-48 w-48 rounded-full bg-[#c5e8dc]/40 blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1200px] px-5 py-8 md:px-8 lg:pb-8 lg:pt-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="services-heading"
            className="text-[26px] font-bold leading-[1.2] tracking-tight text-[#0f2a45] md:text-[30px]"
          >
            {homePopular.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-[#5b6e7a] md:mt-3">
            {homePopular.subtitle}
          </p>
        </div>

        <div className="relative mt-6 lg:mt-10">
          <ul
            className={
              isRail
                ? "rail rail-bleed pt-3 [--rail-item-sm:31%] [--rail-item:60%]"
                : "flex items-start justify-center gap-3 px-2 md:gap-4 lg:gap-5"
            }
          >
            {visible.map((item, i) => {
              const p = palettes[(item.tone as Tone) ?? "blue"];
              const offset = i - centerIdx;
              const popular = "badge" in item && Boolean(item.badge);
              const style = perView >= 5 ? arcStyle(offset) : { zIndex: 1 };

              return (
                <li
                  key={item.name}
                  className="w-[min(100%,220px)] shrink-0 transition-transform duration-500 ease-out sm:w-[200px] lg:w-[210px]"
                  style={style}
                >
                  <Link
                    href={item.href}
                    className="group relative flex h-full min-h-[288px] flex-col rounded-2xl border p-4 pt-5 transition hover:-translate-y-1"
                    style={{
                      borderColor: p.border,
                      background: `linear-gradient(180deg, ${p.well} 0%, #ffffff 46%)`,
                      boxShadow: popular
                        ? `0 20px 44px -18px ${p.accent}66`
                        : `0 16px 36px -18px ${p.accent}44`,
                    }}
                    aria-label={`View ${item.name}`}
                  >
                    <span
                      className="absolute inset-x-px top-px h-[3px] rounded-t-[14px]"
                      style={{ backgroundColor: p.accent }}
                      aria-hidden
                    />
                    {popular ? (
                      <span
                        className="absolute -right-1 -top-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wide text-white shadow-md"
                        style={{ backgroundColor: p.accent }}
                      >
                        <span aria-hidden>★</span> Most Popular
                      </span>
                    ) : null}

                    <div className="flex justify-center">
                      <SoftIcon name={item.name} p={p} />
                    </div>

                    <h3 className="mt-3 text-[15px] font-bold leading-snug text-[#0f2a45]">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 flex-1 text-[13px] leading-snug" style={{ color: p.muted }}>
                      {item.blurb}
                    </p>

                    <div className="mt-3">
                      <p className="text-[12px]" style={{ color: p.muted }}>
                        From
                      </p>
                      <p className="text-[20px] font-bold leading-none" style={{ color: p.accent }}>
                        {formatInr(item.feeFrom)}
                      </p>
                      <p className="mt-0.5 text-[13px]" style={{ color: p.muted }}>
                        {item.feeNote}
                      </p>
                    </div>

                    <div
                      className="mt-3 flex items-center justify-between gap-2 border-t pt-3"
                      style={{ borderColor: `${p.border}` }}
                    >
                      <p
                        className="flex min-w-0 items-center gap-1 text-[12.5px] leading-snug"
                        style={{ color: p.muted }}
                      >
                        <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                          <circle cx="12" cy="12" r="8" />
                          <path d="M12 8v4l2.5 1.5" strokeLinecap="round" />
                        </svg>
                        <span className="truncate">{item.timeline}</span>
                      </p>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition group-hover:brightness-110"
                        style={{ backgroundColor: p.accent }}
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={`mt-8 items-center justify-center gap-4 ${isRail ? "hidden" : "flex"}`}>
            <button
              type="button"
              onClick={prev}
              disabled={start === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e4de] bg-white text-[#5b6e7a] shadow-sm transition hover:border-[#bfd4cb] hover:text-[#0f2a45] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous services"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Carousel pages">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === start}
                  onClick={() => setStart(i)}
                  className={`h-2 rounded-full transition ${
                    i === start ? "w-2.5 bg-[#0e7b5b]" : "w-2 bg-[#c5e8dc]"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              disabled={start >= maxStart}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e4de] bg-white text-[#5b6e7a] shadow-sm transition hover:border-[#bfd4cb] hover:text-[#0f2a45] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next services"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
