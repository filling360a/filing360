"use client";

import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { homePopular } from "@/content/home";
import { formatInr } from "@/content/services";

type Tone = "pink" | "blue" | "green" | "purple" | "orange" | "sky" | "teal";

const toneStyles: Record<Tone, { price: string; btn: string; badge: string }> = {
  pink: {
    price: "text-[#0f2a45]",
    btn: "bg-[#e3f2ed] text-[#0f2a45] group-hover:bg-[#0f2a45] group-hover:text-white",
    badge: "bg-[#0f2a45]",
  },
  blue: {
    price: "text-[#0e7b5b]",
    btn: "bg-[#d4ede4] text-[#0e7b5b] group-hover:bg-[#0e7b5b] group-hover:text-white",
    badge: "bg-[#0e7b5b]",
  },
  green: {
    price: "text-[#0e7b5b]",
    btn: "bg-[#d4ede4] text-[#0e7b5b] group-hover:bg-[#0e7b5b] group-hover:text-white",
    badge: "bg-[#0e7b5b]",
  },
  purple: {
    price: "text-[#0b6550]",
    btn: "bg-[#e8f6f1] text-[#0b6550] group-hover:bg-[#0b6550] group-hover:text-white",
    badge: "bg-[#0b6550]",
  },
  orange: {
    price: "text-[#1a8f6c]",
    btn: "bg-[#e3f2ed] text-[#0e7b5b] group-hover:bg-[#1a8f6c] group-hover:text-white",
    badge: "bg-[#1a8f6c]",
  },
  sky: {
    price: "text-[#0f2a45]",
    btn: "bg-[#e3f2ed] text-[#0f2a45] group-hover:bg-[#0f2a45] group-hover:text-white",
    badge: "bg-[#0f2a45]",
  },
  teal: {
    price: "text-[#0e7b5b]",
    btn: "bg-[#d4ede4] text-[#0e7b5b] group-hover:bg-[#0e7b5b] group-hover:text-white",
    badge: "bg-[#0e7b5b]",
  },
};

/** Soft 3D / glass-style icons matching the carousel mock */
function SoftIcon({ name }: { name: string }) {
  const icons: Record<string, ReactNode> = {
    "Section 8 Company": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="s8-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e3f2ed" />
            <stop offset="100%" stopColor="#c5e8dc" />
          </linearGradient>
          <linearGradient id="s8-p" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5bb89a" />
            <stop offset="100%" stopColor="#0f2a45" />
          </linearGradient>
          <filter id="s8-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#0f2a45" floodOpacity="0.22" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#s8-bg)" />
        <g filter="url(#s8-sh)">
          {/* back person */}
          <circle cx="34" cy="22" r="7" fill="#8ecfbc" />
          <path d="M24 40c1.2-5.2 4.8-8 10-8s8.8 2.8 10 8" fill="#8ecfbc" />
          {/* front person */}
          <circle cx="22" cy="23" r="8" fill="url(#s8-p)" />
          <path d="M8 42c1.5-6.2 6-9.5 14-9.5S36.5 35.8 38 42" fill="url(#s8-p)" />
          <ellipse cx="19" cy="21" rx="2.2" ry="1.4" fill="#fff" opacity="0.35" />
        </g>
      </svg>
    ),
    "Private Limited Company": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="pl-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e3f2ed" />
            <stop offset="100%" stopColor="#8ecfbc" />
          </linearGradient>
          <linearGradient id="pl-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5bb89a" />
            <stop offset="100%" stopColor="#0e7b5b" />
          </linearGradient>
          <filter id="pl-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#0b6550" floodOpacity="0.28" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#pl-bg)" />
        <g filter="url(#pl-sh)">
          <rect x="10" y="22" width="12" height="22" rx="2" fill="#8ecfbc" />
          <rect x="22" y="12" width="14" height="32" rx="2" fill="url(#pl-b)" />
          <rect x="36" y="18" width="11" height="26" rx="2" fill="#1a8f6c" />
          {/* windows */}
          {[0, 1, 2, 3].map((r) =>
            [0, 1].map((c) => (
              <rect
                key={`m-${r}-${c}`}
                x={25 + c * 5}
                y={16 + r * 6}
                width="3"
                height="3.2"
                rx="0.6"
                fill="#d4ede4"
                opacity="0.9"
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
                fill="#e3f2ed"
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
              fill="#c5e8dc"
              opacity="0.9"
            />
          ))}
          <rect x="26" y="38" width="6" height="6" rx="1" fill="#0b6550" />
        </g>
      </svg>
    ),
    "GST Registration": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="gst-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4ede4" />
            <stop offset="100%" stopColor="#6ee7b7" />
          </linearGradient>
          <linearGradient id="gst-d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#e8f6f1" />
          </linearGradient>
          <filter id="gst-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#0b6550" floodOpacity="0.25" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#gst-bg)" />
        <g filter="url(#gst-sh)">
          <path
            d="M16 10h18l8 8v26a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3Z"
            fill="url(#gst-d)"
            stroke="#34d399"
            strokeWidth="1.2"
          />
          <path d="M34 10v7a2 2 0 0 0 2 2h7" fill="#c5e8dc" stroke="#34d399" strokeWidth="1.2" />
          <text
            x="28"
            y="28"
            textAnchor="middle"
            fill="#0b6550"
            fontSize="9"
            fontWeight="800"
            fontFamily="system-ui,sans-serif"
          >
            GST
          </text>
          <rect x="18" y="33" width="20" height="2.2" rx="1.1" fill="#6ee7b7" />
          <rect x="18" y="38" width="16" height="2.2" rx="1.1" fill="#c5e8dc" />
          <rect x="18" y="43" width="12" height="2.2" rx="1.1" fill="#c5e8dc" />
        </g>
      </svg>
    ),
    "Income Tax Return (ITR)": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="tm-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e3f2ed" />
            <stop offset="100%" stopColor="#c5e8dc" />
          </linearGradient>
          <linearGradient id="tm-s" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5bb89a" />
            <stop offset="55%" stopColor="#0e7b5b" />
            <stop offset="100%" stopColor="#0b6550" />
          </linearGradient>
          <filter id="tm-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#0e7b5b" floodOpacity="0.28" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#tm-bg)" />
        <g filter="url(#tm-sh)">
          <path
            d="M17 9h16l8 8v28a2.5 2.5 0 0 1-2.5 2.5h-21.5A2.5 2.5 0 0 1 14.5 45V11.5A2.5 2.5 0 0 1 17 9Z"
            fill="url(#tm-s)"
          />
          <path d="M33 9v8h8" fill="#1a8f6c" opacity="0.7" />
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
          <rect x="20" y="39" width="15" height="2.2" rx="1.1" fill="#c5e8dc" />
        </g>
      </svg>
    ),
    "Annual MCA Compliance": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="mca-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e3f2ed" />
            <stop offset="100%" stopColor="#8ecfbc" />
          </linearGradient>
          <linearGradient id="mca-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a8f6c" />
            <stop offset="100%" stopColor="#0e7b5b" />
          </linearGradient>
          <filter id="mca-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#0e7b5b" floodOpacity="0.28" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#mca-bg)" />
        <g filter="url(#mca-sh)">
          <path
            d="M18 18h20a2 2 0 0 1 2 2v2H16v-2a2 2 0 0 1 2-2Z"
            fill="#8ecfbc"
          />
          <path
            d="M20 16a4 4 0 0 1 8 0"
            fill="none"
            stroke="#0e7b5b"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <rect x="10" y="22" width="36" height="24" rx="4" fill="url(#mca-b)" />
          <rect x="10" y="30" width="36" height="4" fill="#0b6550" opacity="0.35" />
          <rect x="24" y="32" width="8" height="5" rx="1.5" fill="#c5e8dc" />
          <ellipse cx="18" cy="26" rx="3" ry="1.6" fill="#fff" opacity="0.25" />
        </g>
      </svg>
    ),
    "Limited Liability Partnership": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="llp-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e3f2ed" />
            <stop offset="100%" stopColor="#8ecfbc" />
          </linearGradient>
          <linearGradient id="llp-p" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5bb89a" />
            <stop offset="100%" stopColor="#0e7b5b" />
          </linearGradient>
          <filter id="llp-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#0369a1" floodOpacity="0.28" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#llp-bg)" />
        <g filter="url(#llp-sh)">
          <circle cx="34" cy="22" r="7" fill="#8ecfbc" />
          <path d="M24 40c1.2-5.2 4.8-8 10-8s8.8 2.8 10 8" fill="#8ecfbc" />
          <circle cx="22" cy="23" r="8" fill="url(#llp-p)" />
          <path d="M8 42c1.5-6.2 6-9.5 14-9.5S36.5 35.8 38 42" fill="url(#llp-p)" />
        </g>
      </svg>
    ),
    "One Person Company": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="opc-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4ede4" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
          <linearGradient id="opc-p" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0e7b5b" />
          </linearGradient>
          <filter id="opc-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#0f766e" floodOpacity="0.28" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#opc-bg)" />
        <g filter="url(#opc-sh)">
          <circle cx="28" cy="22" r="9" fill="url(#opc-p)" />
          <path d="M10 44c2-7.5 8-11.5 18-11.5S44 36.5 46 44" fill="url(#opc-p)" />
          <ellipse cx="24" cy="19" rx="2.5" ry="1.5" fill="#fff" opacity="0.35" />
        </g>
      </svg>
    ),
  };

  return (
    <span className="inline-flex shrink-0 drop-shadow-[0_4px_10px_rgba(15,23,42,0.12)]">
      {icons[name] ?? icons["Private Limited Company"]}
    </span>
  );
}

const VISIBLE = 5;

function arcStyle(offset: number): CSSProperties {
  // offset: -2 .. +2 from center
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
      {/* Soft bokeh */}
      <div
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#c5e8dc]/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-10 top-24 h-56 w-56 rounded-full bg-[#fed7aa]/35 blur-3xl"
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

      <div className="relative mx-auto max-w-[1200px] px-5 py-10 md:px-8 lg:pb-8 lg:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="services-heading"
            className="text-[24px] font-bold leading-[1.2] tracking-tight text-[#0f2a45] md:text-[30px]"
          >
            {homePopular.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#5b6e7a]">
            {homePopular.subtitle}
          </p>
        </div>

        {/* Arc carousel */}
        <div className="relative mt-6 lg:mt-10">
          <ul
            className={
              isRail
                ? "rail rail-bleed pt-3 [--rail-item-sm:31%] [--rail-item:60%]"
                : "flex items-start justify-center gap-3 px-2 md:gap-4 lg:gap-5"
            }
          >
            {visible.map((item, i) => {
              const tone = toneStyles[(item.tone as Tone) ?? "blue"];
              const offset = i - centerIdx;
              const popular = "badge" in item && Boolean(item.badge);
              const style =
                perView >= 5 ? arcStyle(offset) : { zIndex: 1 };

              return (
                <li
                  key={item.name}
                  className="w-[min(100%,220px)] shrink-0 transition-transform duration-500 ease-out sm:w-[200px] lg:w-[210px]"
                  style={style}
                >
                  <Link
                    href={item.href}
                    className={`group relative flex h-full min-h-[280px] flex-col rounded-2xl border bg-white p-4 shadow-[0_12px_32px_-16px_rgba(15,23,42,0.2)] transition hover:shadow-[0_18px_36px_-14px_rgba(14,123,91,0.28)] ${
                      popular
                        ? "border-[#8ecfbc] ring-1 ring-[#8ecfbc]/60"
                        : "border-[#e8f0ec]"
                    }`}
                    aria-label={`View ${item.name}`}
                  >
                    {popular ? (
                      <span
                        className={`absolute -right-1 -top-2 inline-flex items-center gap-1 rounded-full ${tone.badge} px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wide text-white shadow-md`}
                      >
                        <span aria-hidden>★</span> Most Popular
                      </span>
                    ) : null}

                    <div className="flex justify-center">
                      <SoftIcon name={item.name} />
                    </div>

                    <h3 className="mt-3 text-[15px] font-bold leading-snug text-[#0f2a45]">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 flex-1 text-[13px] leading-snug text-[#5b6e7a]">
                      {item.blurb}
                    </p>

                    <div className="mt-3">
                      <p className="text-[12px] text-[#8a9ba6]">From</p>
                      <p className={`text-[20px] font-bold leading-none ${tone.price}`}>
                        {formatInr(item.feeFrom)}
                      </p>
                      <p className="mt-0.5 text-[13px] text-[#8a9ba6]">{item.feeNote}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#eef4f1] pt-3">
                      <p className="flex min-w-0 items-center gap-1 text-[12.5px] leading-snug text-[#5b6e7a]">
                        <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                          <circle cx="12" cy="12" r="8" />
                          <path d="M12 8v4l2.5 1.5" strokeLinecap="round" />
                        </svg>
                        <span className="truncate">{item.timeline}</span>
                      </p>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${tone.btn}`}
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

          {/* Controls */}
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
