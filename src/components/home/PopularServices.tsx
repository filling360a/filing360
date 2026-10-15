"use client";

import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { homePopular } from "@/content/home";
import { formatInr } from "@/content/services";

type Tone = "pink" | "blue" | "green" | "purple" | "orange" | "sky" | "teal";

const toneStyles: Record<Tone, { price: string; btn: string; badge: string }> = {
  pink: {
    price: "text-[#db2777]",
    btn: "bg-[#fce7f3] text-[#db2777] group-hover:bg-[#db2777] group-hover:text-white",
    badge: "bg-[#db2777]",
  },
  blue: {
    price: "text-[#2563eb]",
    btn: "bg-[#dbeafe] text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white",
    badge: "bg-[#2563eb]",
  },
  green: {
    price: "text-[#059669]",
    btn: "bg-[#d1fae5] text-[#059669] group-hover:bg-[#059669] group-hover:text-white",
    badge: "bg-[#059669]",
  },
  purple: {
    price: "text-[#7c3aed]",
    btn: "bg-[#ede9fe] text-[#7c3aed] group-hover:bg-[#7c3aed] group-hover:text-white",
    badge: "bg-[#7c3aed]",
  },
  orange: {
    price: "text-[#ea580c]",
    btn: "bg-[#ffedd5] text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white",
    badge: "bg-[#ea580c]",
  },
  sky: {
    price: "text-[#0284c7]",
    btn: "bg-[#e0f2fe] text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white",
    badge: "bg-[#0284c7]",
  },
  teal: {
    price: "text-[#0d9488]",
    btn: "bg-[#ccfbf1] text-[#0d9488] group-hover:bg-[#0d9488] group-hover:text-white",
    badge: "bg-[#0d9488]",
  },
};

/** Soft 3D / glass-style icons matching the carousel mock */
function SoftIcon({ name }: { name: string }) {
  const icons: Record<string, ReactNode> = {
    "Section 8 Company": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="s8-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fce7f3" />
            <stop offset="100%" stopColor="#f9a8d4" />
          </linearGradient>
          <linearGradient id="s8-p" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
          <filter id="s8-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#be185d" floodOpacity="0.28" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#s8-bg)" />
        <g filter="url(#s8-sh)">
          {/* back person */}
          <circle cx="34" cy="22" r="7" fill="#f9a8d4" />
          <path d="M24 40c1.2-5.2 4.8-8 10-8s8.8 2.8 10 8" fill="#f9a8d4" />
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
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <linearGradient id="pl-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <filter id="pl-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#1d4ed8" floodOpacity="0.28" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#pl-bg)" />
        <g filter="url(#pl-sh)">
          <rect x="10" y="22" width="12" height="22" rx="2" fill="#93c5fd" />
          <rect x="22" y="12" width="14" height="32" rx="2" fill="url(#pl-b)" />
          <rect x="36" y="18" width="11" height="26" rx="2" fill="#3b82f6" />
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
                fill="#dbeafe"
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
                fill="#e0f2fe"
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
              fill="#bfdbfe"
              opacity="0.9"
            />
          ))}
          <rect x="26" y="38" width="6" height="6" rx="1" fill="#1e40af" />
        </g>
      </svg>
    ),
    "GST Registration": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="gst-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d1fae5" />
            <stop offset="100%" stopColor="#6ee7b7" />
          </linearGradient>
          <linearGradient id="gst-d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#ecfdf5" />
          </linearGradient>
          <filter id="gst-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#047857" floodOpacity="0.25" />
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
          <path d="M34 10v7a2 2 0 0 0 2 2h7" fill="#a7f3d0" stroke="#34d399" strokeWidth="1.2" />
          <text
            x="28"
            y="28"
            textAnchor="middle"
            fill="#047857"
            fontSize="9"
            fontWeight="800"
            fontFamily="system-ui,sans-serif"
          >
            GST
          </text>
          <rect x="18" y="33" width="20" height="2.2" rx="1.1" fill="#6ee7b7" />
          <rect x="18" y="38" width="16" height="2.2" rx="1.1" fill="#a7f3d0" />
          <rect x="18" y="43" width="12" height="2.2" rx="1.1" fill="#a7f3d0" />
        </g>
      </svg>
    ),
    "Income Tax Return (ITR)": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="tm-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ede9fe" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
          <linearGradient id="tm-s" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="55%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <filter id="tm-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#5b21b6" floodOpacity="0.3" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#tm-bg)" />
        <g filter="url(#tm-sh)">
          <path
            d="M17 9h16l8 8v28a2.5 2.5 0 0 1-2.5 2.5h-21.5A2.5 2.5 0 0 1 14.5 45V11.5A2.5 2.5 0 0 1 17 9Z"
            fill="url(#tm-s)"
          />
          <path d="M33 9v8h8" fill="#8b5cf6" opacity="0.7" />
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
          <rect x="20" y="39" width="15" height="2.2" rx="1.1" fill="#ddd6fe" />
        </g>
      </svg>
    ),
    "Annual MCA Compliance": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="mca-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="100%" stopColor="#fdba74" />
          </linearGradient>
          <linearGradient id="mca-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <filter id="mca-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#c2410c" floodOpacity="0.28" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#mca-bg)" />
        <g filter="url(#mca-sh)">
          <path
            d="M18 18h20a2 2 0 0 1 2 2v2H16v-2a2 2 0 0 1 2-2Z"
            fill="#fdba74"
          />
          <path
            d="M20 16a4 4 0 0 1 8 0"
            fill="none"
            stroke="#ea580c"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <rect x="10" y="22" width="36" height="24" rx="4" fill="url(#mca-b)" />
          <rect x="10" y="30" width="36" height="4" fill="#c2410c" opacity="0.35" />
          <rect x="24" y="32" width="8" height="5" rx="1.5" fill="#fed7aa" />
          <ellipse cx="18" cy="26" rx="3" ry="1.6" fill="#fff" opacity="0.25" />
        </g>
      </svg>
    ),
    "Limited Liability Partnership": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="llp-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </linearGradient>
          <linearGradient id="llp-p" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <filter id="llp-sh" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#0369a1" floodOpacity="0.28" />
          </filter>
        </defs>
        <rect width="56" height="56" rx="14" fill="url(#llp-bg)" />
        <g filter="url(#llp-sh)">
          <circle cx="34" cy="22" r="7" fill="#7dd3fc" />
          <path d="M24 40c1.2-5.2 4.8-8 10-8s8.8 2.8 10 8" fill="#7dd3fc" />
          <circle cx="22" cy="23" r="8" fill="url(#llp-p)" />
          <path d="M8 42c1.5-6.2 6-9.5 14-9.5S36.5 35.8 38 42" fill="url(#llp-p)" />
        </g>
      </svg>
    ),
    "One Person Company": (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <defs>
          <linearGradient id="opc-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ccfbf1" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
          <linearGradient id="opc-p" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0d9488" />
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
      className="relative overflow-hidden bg-[#f8fbff]"
      id="services"
      aria-labelledby="services-heading"
    >
      {/* Soft bokeh */}
      <div
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#bfdbfe]/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-10 top-24 h-56 w-56 rounded-full bg-[#fed7aa]/35 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-[#dbeafe]/55 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-20 h-48 w-48 rounded-full bg-[#bfdbfe]/40 blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1200px] px-5 py-10 md:px-8 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="services-heading"
            className="text-[24px] font-bold leading-[1.2] tracking-tight text-[#0b2c5e] md:text-[30px]"
          >
            {homePopular.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#64748b]">
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
                    className={`group relative flex h-full min-h-[280px] flex-col rounded-2xl border bg-white p-4 shadow-[0_12px_32px_-16px_rgba(15,23,42,0.2)] transition hover:shadow-[0_18px_36px_-14px_rgba(37,99,235,0.28)] ${
                      popular
                        ? "border-[#86efac] ring-1 ring-[#86efac]/60"
                        : "border-[#eef2f7]"
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

                    <h3 className="mt-3 text-[15px] font-bold leading-snug text-[#0f172a]">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 flex-1 text-[13px] leading-snug text-[#64748b]">
                      {item.blurb}
                    </p>

                    <div className="mt-3">
                      <p className="text-[12px] text-[#94a3b8]">From</p>
                      <p className={`text-[20px] font-bold leading-none ${tone.price}`}>
                        {formatInr(item.feeFrom)}
                      </p>
                      <p className="mt-0.5 text-[13px] text-[#94a3b8]">{item.feeNote}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#f1f5f9] pt-3">
                      <p className="flex min-w-0 items-center gap-1 text-[12.5px] leading-snug text-[#64748b]">
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#64748b] shadow-sm transition hover:border-[#cbd5e1] hover:text-[#0b2c5e] disabled:cursor-not-allowed disabled:opacity-40"
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
                    i === start ? "w-2.5 bg-[#2563eb]" : "w-2 bg-[#bfdbfe]"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              disabled={start >= maxStart}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#64748b] shadow-sm transition hover:border-[#cbd5e1] hover:text-[#0b2c5e] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next services"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8] lg:mt-10">
          <span className="h-px w-10 bg-[#cbd5e1] sm:w-16" aria-hidden />
          {homePopular.trust}
          <span className="h-px w-10 bg-[#cbd5e1] sm:w-16" aria-hidden />
        </p>
      </div>
    </section>
  );
}
