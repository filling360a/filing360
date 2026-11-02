function strip(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Pulls H3/P pairs after an FAQs heading for FAQPage schema. */
export function extractFaqs(html: string): { question: string; answer: string }[] {
  const idx = html.search(/<h2[^>]*>\s*(FAQs|Frequently asked questions)/i);
  if (idx < 0) return [];
  const rest = html.slice(idx);
  const faqs: { question: string; answer: string }[] = [];
  const re = /<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(rest))) {
    const question = strip(match[1]);
    const answer = strip(match[2]);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

/** Pulls a numbered list under a “step-by-step” heading for HowTo schema. */
export function extractHowTo(html: string): { name: string; steps: string[] } | null {
  const match = html.match(/<h2[^>]*>([\s\S]*?step-by-step[\s\S]*?)<\/h2>\s*<ol>([\s\S]*?)<\/ol>/i);
  if (!match) return null;
  const steps = [...match[2].matchAll(/<li>([\s\S]*?)<\/li>/gi)].map((item) => strip(item[1])).filter(Boolean);
  if (steps.length < 3) return null;
  return { name: strip(match[1]), steps };
}
