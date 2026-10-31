"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { useReducedMotion } from "motion/react";
import { homeBanners } from "@/content/home";

const INTERVAL_MS = 5500;
const COUNT = homeBanners.length;
const STEP = 76;

function relativeIndex(i: number, active: number) {
  let rel = ((i - active) % COUNT + COUNT) % COUNT;
  if (rel > Math.floor(COUNT / 2)) rel -= COUNT;
  return rel;
}

export function BannerCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLElement>(null);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const lastRel = useRef<number[]>(homeBanners.map((_, i) => relativeIndex(i, 0)));
  const rels = useMemo(() => homeBanners.map((_, i) => relativeIndex(i, index)), [index]);
  const jumped = useMemo(
    () => rels.map((rel, i) => Math.abs(rel - lastRel.current[i]) > 1),
    [rels],
  );

  useLayoutEffect(() => {
    lastRel.current = rels;
  }, [rels]);

  const go = useCallback((delta: number) => {
    setIndex((current) => (current + delta + COUNT) % COUNT);
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex(((next % COUNT) + COUNT) % COUNT);
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => go(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [go, index, paused, reduce]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!regionRef.current?.contains(document.activeElement) && document.activeElement !== regionRef.current) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragStart.current = e.clientX;
    dragged.current = false;
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (dragStart.current == null) return;
    if (Math.abs(e.clientX - dragStart.current) > 12) dragged.current = true;
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    if (dragStart.current == null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
  }

  const current = homeBanners[index];

  return (
    <section
      ref={regionRef}
      className="relative overflow-x-clip bg-[#f3f7fa] pb-10 pt-1 md:pb-14"
      aria-roledescription="carousel"
      aria-label="Filing highlights"
    >
      <div
        className="relative mx-auto h-[138px] w-full max-w-[1320px] touch-pan-y select-none sm:h-[196px] md:h-[280px] lg:h-[348px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragStart.current = null;
        }}
      >
        {homeBanners.map((banner, i) => {
          const rel = rels[i];
          const active = rel === 0;
          return (
            <article
              key={banner.src}
              aria-hidden={!active}
              aria-label={active ? banner.title : `Show: ${banner.title}`}
              className={`absolute top-0 h-full w-[min(1140px,86%)] origin-center overflow-hidden rounded-[22px] md:rounded-[28px] ${
                active
                  ? "z-[3] shadow-[0_22px_50px_-24px_rgba(15,42,69,0.45)]"
                  : "z-[1] cursor-pointer shadow-[0_10px_28px_-20px_rgba(15,42,69,0.35)]"
              }`}
              style={{
                left: `${50 + rel * STEP}%`,
                transform: `translateX(-50%) scale(${active ? 1 : 0.92})`,
                opacity: Math.abs(rel) > 1 ? 0 : active ? 1 : 0.72,
                pointerEvents: Math.abs(rel) > 1 ? "none" : "auto",
                transition:
                  reduce || jumped[i]
                    ? "none"
                    : "left 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease",
              }}
              onClick={() => {
                if (dragged.current) return;
                if (!active) goTo(i);
              }}
            >
              <Image
                src={banner.src}
                alt=""
                fill
                sizes="(max-width: 768px) 90vw, 1140px"
                className="object-cover object-center"
                priority={i === 0}
              />
              {active ? (
                <div
                  className={
                    banner.align === "left"
                      ? "absolute inset-y-0 left-[5%] z-10 hidden w-[32%] min-w-[13rem] max-w-[320px] flex-col justify-center md:flex lg:left-[6%]"
                      : "absolute inset-y-0 right-[3.5%] z-10 hidden w-[32%] min-w-[13rem] max-w-[320px] flex-col justify-center md:flex lg:right-[5%]"
                  }
                >
                  <h3
                    className="text-balance text-[22px] font-bold leading-[1.18] tracking-[-0.03em] lg:text-[28px]"
                    style={{ color: banner.color }}
                  >
                    {banner.title}
                  </h3>
                  <p
                    className="mt-1.5 max-w-[22ch] text-[13.5px] leading-snug lg:mt-2 lg:text-[15px]"
                    style={{ color: banner.muted }}
                  >
                    {banner.line}
                  </p>
                  <Link
                    href={banner.href}
                    className="mt-3 inline-flex h-10 w-fit items-center rounded-full px-4 text-[13.5px] font-semibold text-white shadow-[0_10px_22px_-12px_rgba(15,42,69,0.55)] transition duration-200 hover:translate-y-[-1px] hover:brightness-110 hover:shadow-[0_14px_26px_-12px_rgba(15,42,69,0.5)] lg:mt-4 lg:h-11 lg:px-5 lg:text-[14.5px]"
                    style={{ backgroundColor: banner.button }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {banner.cta}
                    <span aria-hidden className="ml-1.5">
                      →
                    </span>
                  </Link>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3 md:mt-6">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e4de] bg-white text-[#0f2a45] shadow-[0_8px_18px_-12px_rgba(15,42,69,0.45)] transition hover:border-[#0e7b5b] hover:bg-[#0e7b5b] hover:text-white"
          aria-label="Previous banner"
          onClick={() => go(-1)}
        >
          <Chevron dir="left" />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose a banner">
          {homeBanners.map((banner, i) => {
            const active = i === index;
            return (
              <button
                key={banner.src}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Banner ${i + 1}: ${banner.title}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active ? "w-7 bg-[#0e7b5b]" : "w-2 bg-[#c5e8dc] hover:bg-[#8ecfbc]"
                }`}
              />
            );
          })}
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e4de] bg-white text-[#0f2a45] shadow-[0_8px_18px_-12px_rgba(15,42,69,0.45)] transition hover:border-[#0e7b5b] hover:bg-[#0e7b5b] hover:text-white"
          aria-label="Next banner"
          onClick={() => go(1)}
        >
          <Chevron dir="right" />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {current.title}
      </p>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 12 20"
      className={`h-4 w-2.5 ${dir === "left" ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden
    >
      <path d="M2 2l8 8-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
