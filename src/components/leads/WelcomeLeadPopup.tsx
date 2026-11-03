"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LeadForm } from "@/components/leads/LeadForm";

const STORAGE_KEY = "filing360_welcome_lead_dismissed";
const OPEN_DELAY_MS = 1800;
const SKIP_PATHS = ["/thank-you", "/book-consultation", "/track", "/admin"];

function shouldSkip(pathname: string) {
  return SKIP_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function wasDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function WelcomeLeadPopup() {
  const pathname = usePathname();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    markDismissed();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (shouldSkip(pathname)) {
      if (open) setOpen(false);
      return;
    }
    if (open || wasDismissed()) return;

    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduceMotion ? 400 : OPEN_DELAY_MS;

    const timer = window.setTimeout(() => {
      markDismissed();
      setOpen(true);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [pathname, open]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close popup"
        className="absolute inset-0 bg-[#0f2a45]/55 backdrop-blur-[2px] transition-opacity"
        onClick={close}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#d7e4de] bg-white shadow-[0_28px_80px_-24px_rgba(15,23,42,0.55)]"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f2a45] via-[#143652] to-[#0e7b5b] px-5 pb-5 pt-4 text-white sm:px-6 sm:pt-5">
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-label="Dismiss free quote popup"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/75">
            Free expert consult
          </p>
          <h2 id={titleId} className="mt-1.5 max-w-[22ch] text-[22px] font-bold leading-tight tracking-tight sm:text-[24px]">
            Get a free quote within 12 hours
          </h2>
          <p className="mt-2 max-w-[34ch] text-[14.5px] leading-relaxed text-white/85">
            Share a few details and a Filing360 Chartered Accountant will guide your next step.
          </p>
        </div>

        <div className="max-h-[min(70vh,560px)] overflow-y-auto px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
          <LeadForm
            id="welcome-popup-lead"
            source="welcome-popup"
            compact
            redirect={false}
            title="Tell us how we can help"
            subtitle=""
            submitLabel="Get free quote"
            badge="No obligation"
            className="!border-0 !bg-transparent !p-0 !shadow-none"
          />
        </div>
      </div>
    </div>
  );
}
