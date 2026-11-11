export type BlogFaq = { q: string; a: string };

export function normalizeFaqs(input: unknown): BlogFaq[] {
  if (!Array.isArray(input)) return [];
  const out: BlogFaq[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const q = String(row.q ?? row.question ?? "")
      .trim()
      .slice(0, 300);
    const a = String(row.a ?? row.answer ?? "")
      .trim()
      .slice(0, 2000);
    if (q && a) out.push({ q, a });
  }
  return out.slice(0, 30);
}

export function emptyFaq(): BlogFaq {
  return { q: "", a: "" };
}
