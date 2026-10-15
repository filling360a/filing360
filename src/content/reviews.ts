/**
 * Genuine client reviews only, with the client's permission. Copy them from
 * Google Business Profile or written feedback. The /reviews page stays
 * noindexed while this list is empty.
 */
export type Review = {
  name: string;
  city?: string;
  service: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** ISO date, e.g. "2026-09-14" */
  date: string;
  source: "Google" | "Email" | "WhatsApp" | "Other";
};

export const reviews: Review[] = [];

export function reviewSummary() {
  if (reviews.length === 0) return null;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return { count: reviews.length, average: Math.round(avg * 10) / 10 };
}
