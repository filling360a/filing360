"use client";

import { LeadForm } from "@/components/leads/LeadForm";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

const INTERVAL_MS = 5000;

const easeArrival = [0.16, 1, 0.3, 1] as const;
const easeExit = [0.4, 0, 1, 1] as const;

type Align = "left" | "right";

type Slide = {
  src: string;
  align: Align;
  object: string;
  title: string;
  accent: string;
  body: string;
  lightNav?: boolean;
};

const slides: Slide[] = [
  {
    src: "/images/hero/start.png",
    align: "left",
    object: "object-[82%_center]",
    title: "Turn your business",
    accent: "idea into reality.",
    body: "Company registration, GST and compliance — all in one place, so you can grow the business.",
  },
  {
    src: "/images/hero/filings.png",
    align: "right",
    object: "object-[18%_center]",
    title: "GST, ITR and ROC —",
    accent: "filed in one place.",
    body: "Returns and annual filings with transparent professional fees plus government charges.",
    lightNav: true,
  },
  {
    src: "/images/hero/advisor.png",
    align: "left",
    object: "object-[84%_center]",
    title: "Stay compliant.",
    accent: "Stay on the work that matters.",
    body: "MCA, GST and income tax — handled by CAs, pan-India.",
  },
];

function wipeFrom(align: Align) {
  return align === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";
}

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [toggledPaused, setToggledPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const remainingRef = useRef(INTERVAL_MS);
  const lastTickRef = useRef<number | null>(null);
  const slide = slides[index];
  const paused = hoverPaused || toggledPaused || offscreen || hidden;

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + slides.length) % slides.length);
    },
    [],
  );

  const goTo = useCallback((next: number) => {
    setIndex(next);
  }, []);

  useEffect(() => {
    const node = regionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    remainingRef.current = INTERVAL_MS;
    lastTickRef.current = null;
    setProgress(0);
  }, [index]);

  useEffect(() => {
    const light = Boolean(slide.lightNav);
    document.documentElement.dataset.heroLight = light ? "1" : "0";
    window.dispatchEvent(new CustomEvent("hero-slide", { detail: { light } }));
    return () => {
      delete document.documentElement.dataset.heroLight;
    };
  }, [slide.lightNav]);

  useEffect(() => {
    if (paused) {
      lastTickRef.current = null;
      return;
    }
    let frame = 0;
    const tick = (now: number) => {
      if (lastTickRef.current == null) lastTickRef.current = now;
      remainingRef.current -= now - lastTickRef.current;
      lastTickRef.current = now;
      const next = 1 - remainingRef.current / INTERVAL_MS;
      setProgress(Math.min(1, Math.max(0, next)));
      if (remainingRef.current <= 0) {
        go(1);
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [paused, index, go]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f3f7fa]">
      <div
        ref={regionRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Filing360 highlights"
        onKeyDown={onKeyDown}
        onMouseEnter={() => {
          if (window.matchMedia("(min-width: 1280px)").matches) setHoverPaused(true);
        }}
        onMouseLeave={() => setHoverPaused(false)}
        onFocus={() => {
          if (window.matchMedia("(min-width: 1280px)").matches) setHoverPaused(true);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setHoverPaused(false);
          }
        }}
        className="relative outline-none md:h-[min(78vh,680px)] md:min-h-[580px] lg:h-[min(85vh,760px)] lg:min-h-[720px]"
      >
        <div className="relative h-[232px] overflow-hidden sm:h-[280px] md:absolute md:inset-0 md:h-auto">
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 1, scale: 1.06, clipPath: wipeFrom(slide.align) }
              }
              animate={
                reduce
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }
              }
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0.4, scale: 1.03, filter: "blur(6px)" }
              }
              transition={
                reduce
                  ? { duration: 0.2 }
                  : { duration: 0.85, ease: easeArrival }
              }
            >
              <Image
                src={slide.src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className={`object-cover ${slide.object}`}
              />
            </motion.div>
          </AnimatePresence>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f3f7fa] md:hidden"
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 hidden w-[48%] md:block ${
              slide.align === "left"
                ? "left-0 bg-gradient-to-r from-[#f3f7fa]/55 via-[#f3f7fa]/12 to-transparent"
                : "right-0 bg-gradient-to-l from-[#f3f7fa]/50 via-[#f3f7fa]/10 to-transparent"
            }`}
          />
        </div>

        <div className="relative z-[1] mx-auto flex max-w-[1320px] px-5 pb-3 pt-4 md:h-[min(78vh,680px)] md:min-h-[580px] md:px-6 md:pb-6 md:pt-[88px] lg:h-[min(85vh,760px)] lg:min-h-[720px] lg:px-8 lg:pt-[96px]">
          <motion.div
            layout
            transition={{ duration: reduce ? 0 : 0.7, ease: easeArrival }}
            className={`flex w-full max-w-[40rem] flex-col md:h-full md:w-[min(40rem,100%)] ${
              slide.align === "right" ? "md:ml-auto" : "md:mr-auto"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.src}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: reduce ? 0 : 0.08,
                      delayChildren: reduce ? 0 : 0.1,
                    },
                  },
                  exit: {
                    transition: { staggerChildren: 0.04, staggerDirection: -1 },
                  },
                }}
                aria-live="polite"
              >
                <motion.h1
                  variants={copyVariants(slide.align, reduce)}
                  className="max-w-[22ch] text-[28px] font-bold leading-[1.14] tracking-[-0.03em] text-[#0f2a45] sm:text-[36px] md:text-[42px] lg:text-[48px]"
                >
                  {slide.title}{" "}
                  <Accent text={slide.accent} />
                </motion.h1>
                <motion.p
                  variants={copyVariants(slide.align, reduce)}
                  className="mt-2.5 max-w-[46ch] text-[15.5px] leading-[1.5] text-[#2c3f4e] sm:mt-3 sm:text-[16px] lg:text-[17.5px]"
                >
                  {slide.body}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <ul className="mt-4 grid grid-cols-2 gap-y-3 sm:mt-5 sm:grid-cols-4 sm:gap-y-0">
              {heroMarks.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 border-[#d7e4de] px-1 sm:flex-col sm:items-center sm:gap-1.5 sm:border-r sm:text-center sm:last:border-r-0"
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${item.well}`}>
                    {item.icon}
                  </span>
                  <span className="text-[13.5px] font-semibold leading-tight text-[#0f2a45] sm:max-w-[9ch] sm:text-[12px] md:max-w-none md:text-[12.5px]">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 w-full md:mt-8">
              <LeadForm
                id="hero-lead"
                compact
                source="hero"
                title="Get a free quote"
                submitLabel="Get free quote"
                interestLabel="Service"
                badge="Fast · Easy · No Obligation"
              />
            </div>
          </motion.div>
        </div>

        <div className="relative z-[2] flex items-center justify-center gap-3 px-5 py-2 md:absolute md:inset-x-0 md:bottom-5 md:py-0">
          <button
            type="button"
            onClick={() => go(-1)}
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-[#0f2a45]/90 text-white transition hover:bg-[#0f2a45] xl:flex"
            aria-label="Previous banner"
          >
            <Chevron dir="left" />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose banner">
            {slides.map((item, i) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show banner ${i + 1} of ${slides.length}`}
                onClick={() => goTo(i)}
                className="h-1.5 overflow-hidden rounded-full bg-[#0f2a45]/18 transition-[width] duration-300"
                style={{ width: i === index ? 44 : 18 }}
              >
                {i === index ? (
                  <span
                    className="block h-full origin-left rounded-full bg-[#0e7b5b]"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                ) : null}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-[#0f2a45]/90 text-white transition hover:bg-[#0f2a45] xl:flex"
            aria-label="Next banner"
          >
            <Chevron dir="right" />
          </button>
          <button
            type="button"
            onClick={() => setToggledPaused((value) => !value)}
            className="ml-1 hidden text-[12px] font-semibold tracking-wide text-[#0f2a45]/70 underline-offset-2 hover:text-[#0f2a45] hover:underline xl:inline"
            aria-label={toggledPaused ? "Play banners" : "Pause banners"}
          >
            {toggledPaused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
    </section>
  );
}

function copyVariants(align: Align, reduce: boolean | null) {
  const fromX = align === "left" ? -28 : 28;
  if (reduce) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.12 } },
    };
  }
  return {
    hidden: { opacity: 0, x: fromX, filter: "blur(8px)" },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: easeArrival },
    },
    exit: {
      opacity: 0,
      x: fromX * 0.4,
      filter: "blur(4px)",
      transition: { duration: 0.28, ease: easeExit },
    },
  };
}

function Accent({ text }: { text: string }) {
  const period = text.endsWith(".");
  const body = period ? text.slice(0, -1) : text;
  const words = body.split(" ");
  const last = words.pop() ?? "";
  const lead = words.join(" ");
  return (
    <span className="text-[#0e7b5b]">
      {lead ? `${lead} ` : null}
      <span className="relative inline-block whitespace-nowrap">
        {last}
        <svg
          viewBox="0 0 88 8"
          className="absolute -bottom-[0.12em] left-0 w-full"
          fill="none"
          aria-hidden
        >
          <path
            d="M2 6c18-3.2 48-4.4 84-.6"
            stroke="#8ecfbc"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {period ? "." : null}
    </span>
  );
}

const heroMarks = [
  {
    label: "Company Registration",
    well: "bg-[#e3f2ed] text-[#0e7b5b]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M4 20h16M6 20V8l6-4 6 4v12M10 11h4M10 15h4" />
      </svg>
    ),
  },
  {
    label: "GST Compliance",
    well: "bg-[#e8f2ee] text-[#0f2a45]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M7 3.5h7l4.5 4.5V20A1.5 1.5 0 0 1 17 21.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" />
        <path d="M14 3.5V9h5.5M8.5 13h7M8.5 16.5h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Annual Filings",
    well: "bg-[#d4ede4] text-[#0b6550]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M8.5 9h7M8.5 13h7M8.5 17h4.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Ongoing Support",
    well: "bg-[#e3f2ed] text-[#0e7b5b]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
        <rect x="3.5" y="12.5" width="4" height="6" rx="1.2" />
        <rect x="16.5" y="12.5" width="4" height="6" rx="1.2" />
        <path d="M19.5 18.5v.8A2.7 2.7 0 0 1 16.8 22h-1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      {dir === "left" ? (
        <path d="M14.5 6 9 12l5.5 6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9.5 6 15 12l-5.5 6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

