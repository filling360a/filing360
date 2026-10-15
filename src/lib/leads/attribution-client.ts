"use client";

import type { Attribution } from "./schema";

const KEY = "f360_attribution";
const TTL_MS = 30 * 86_400_000;
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;

type Stored = Attribution & { saved_at: number };

/** First-touch attribution: keeps the first campaign that brought the visitor for 30 days. */
export function recordAttribution() {
  try {
    const current = readStored();
    const params = new URLSearchParams(window.location.search);
    const hasCampaign = PARAMS.some((p) => params.get(p));
    if (current && !hasCampaign) return;
    if (current && hasCampaign && current.utm_source) return;

    const next: Stored = { saved_at: Date.now() };
    for (const p of PARAMS) {
      const value = params.get(p);
      if (value) next[p] = value.slice(0, 200);
    }
    next.landing_page = window.location.pathname + window.location.search;
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
      next.referrer = document.referrer.slice(0, 500);
    }
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode); attribution is best-effort.
  }
}

function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed.saved_at || Date.now() - parsed.saved_at > TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getAttribution(): Attribution | undefined {
  const stored = readStored();
  if (!stored) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { saved_at, ...attribution } = stored;
  return attribution;
}
