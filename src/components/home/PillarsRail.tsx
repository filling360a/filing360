"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

function Arrow({ dir, disabled, onClick }: { dir: -1 | 1; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === -1 ? "Previous services" : "Next services"}
      className={`absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4ede4] bg-white text-[#0f2a45] shadow-[0_10px_24px_-12px_rgba(15,23,42,0.35)] transition hover:border-[#8ecfbc] hover:bg-[#e3f2ed] disabled:pointer-events-none disabled:opacity-0 lg:flex ${
        dir === -1 ? "-left-5" : "-right-5"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
        <path d={dir === -1 ? "M15 6 9 12l6 6" : "m9 6 6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function PillarsRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const scrollBy = (dir: -1 | 1) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <div className="relative mt-6 lg:mt-10">
      <Arrow dir={-1} disabled={edges.start} onClick={() => scrollBy(-1)} />
      <ul
        ref={ref}
        className="rail rail-bleed gap-4 [--rail-item:72%] [--rail-item-sm:40%] lg:-mx-2 lg:-my-4 lg:flex lg:snap-x lg:snap-mandatory lg:scroll-px-2 lg:overflow-x-auto lg:px-2 lg:py-4 lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <Arrow dir={1} disabled={edges.end} onClick={() => scrollBy(1)} />
    </div>
  );
}
