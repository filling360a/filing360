"use client";

export type ConsentState = { analytics: boolean; marketing: boolean; at: number; v: 1 };

const KEY = "f360_consent";
const CHANGE_EVENT = "f360:consent";
const OPEN_EVENT = "f360:consent-open";

export const trackingIds = {
  ga: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  gtm: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  googleAds: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
  googleAdsLeadLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL ?? "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  clarity: process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
};

export const usesAnalytics = Boolean(trackingIds.ga || trackingIds.gtm || trackingIds.clarity);
export const usesMarketing = Boolean(trackingIds.metaPixel || trackingIds.googleAds || trackingIds.gtm);
export const usesOptionalCookies = usesAnalytics || usesMarketing;

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    // Ask again after 12 months.
    if (parsed.v !== 1 || Date.now() - parsed.at > 365 * 86_400_000) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }) {
  const state: ConsentState = { ...choice, at: Date.now(), v: 1 };
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Private mode: the choice applies to this page view only.
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CHANGE_EVENT, { detail: state }));
}

export function onConsentChange(listener: (state: ConsentState) => void) {
  const handler = (e: Event) => listener((e as CustomEvent<ConsentState>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentOpen(listener: () => void) {
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}

type TrackWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

/** Fires a conversion/event to whichever tools the visitor has consented to. */
export function trackEvent(name: "generate_lead" | "book_consultation" | "job_apply", params: Record<string, string | number | undefined> = {}) {
  const w = window as TrackWindow;
  w.dataLayer?.push({ event: name, ...params });
  w.gtag?.("event", name, params);
  if (name !== "job_apply" && trackingIds.googleAds && trackingIds.googleAdsLeadLabel) {
    w.gtag?.("event", "conversion", { send_to: `${trackingIds.googleAds}/${trackingIds.googleAdsLeadLabel}` });
  }
  if (name === "generate_lead") w.fbq?.("track", "Lead");
  if (name === "book_consultation") w.fbq?.("track", "Schedule");
}
