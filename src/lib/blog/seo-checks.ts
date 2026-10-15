export type SeoInput = {
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  slug: string;
  focusKeyword: string;
  html: string;
  text: string;
  coverUrl: string;
  coverAlt: string;
};

export type SeoCheck = { label: string; status: "good" | "warn" | "bad"; tip?: string };

export function runSeoChecks(input: SeoInput): { checks: SeoCheck[]; score: number; words: number } {
  const title = (input.seoTitle || input.title).trim();
  const description = (input.seoDescription || input.excerpt).trim();
  const words = input.text.trim() ? input.text.trim().split(/\s+/).length : 0;
  const kw = input.focusKeyword.trim().toLowerCase();
  const firstParagraph = (/<p>([\s\S]*?)<\/p>/.exec(input.html)?.[1] ?? "").replace(/<[^>]+>/g, "").toLowerCase();
  const h2Count = (input.html.match(/<h2[\s>]/g) ?? []).length;
  const images = input.html.match(/<img[^>]*>/g) ?? [];
  const missingAlt = images.filter((img) => !/alt="[^"]+"/.test(img)).length;
  const internalLinks = (input.html.match(/href="(\/|https?:\/\/(www\.)?filing360\.in)/g) ?? []).length;
  const slugKw = kw.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const checks: SeoCheck[] = [
    title.length >= 30 && title.length <= 60
      ? { label: `Title length (${title.length}/60)`, status: "good" }
      : { label: `Title length (${title.length}/60)`, status: title.length > 70 || title.length < 15 ? "bad" : "warn", tip: "Aim for 30–60 characters so Google shows it in full." },
    description.length >= 120 && description.length <= 160
      ? { label: `Meta description (${description.length}/160)`, status: "good" }
      : { label: `Meta description (${description.length}/160)`, status: description.length === 0 ? "bad" : "warn", tip: "Write 120–160 characters that make people want to click." },
    words >= 900
      ? { label: `${words.toLocaleString("en-IN")} words`, status: "good" }
      : { label: `${words.toLocaleString("en-IN")} words`, status: words >= 500 ? "warn" : "bad", tip: "In-depth guides (900+ words) rank better for competitive topics." },
    h2Count >= 2
      ? { label: `${h2Count} section headings (H2)`, status: "good" }
      : { label: `${h2Count} section headings (H2)`, status: "warn", tip: "Break the article into sections with H2 headings." },
    internalLinks >= 1
      ? { label: `${internalLinks} internal link${internalLinks === 1 ? "" : "s"}`, status: "good" }
      : { label: "No internal links", status: "warn", tip: "Link to a relevant service page, e.g. /services/startup/private-limited-company." },
    input.coverUrl && input.coverAlt.trim()
      ? { label: "Cover image with alt text", status: "good" }
      : { label: input.coverUrl ? "Cover image is missing alt text" : "No cover image", status: "warn", tip: "Cover images are used in Google Discover and social shares." },
    missingAlt === 0
      ? { label: images.length ? `All ${images.length} images have alt text` : "No inline images", status: images.length ? "good" : "warn" }
      : { label: `${missingAlt} image${missingAlt === 1 ? "" : "s"} missing alt text`, status: "bad" },
  ];

  if (kw) {
    checks.push(
      title.toLowerCase().includes(kw)
        ? { label: "Keyword in title", status: "good" }
        : { label: "Keyword not in title", status: "bad", tip: "Put the focus keyword near the start of the title." },
      description.toLowerCase().includes(kw)
        ? { label: "Keyword in meta description", status: "good" }
        : { label: "Keyword not in meta description", status: "warn" },
      firstParagraph.includes(kw)
        ? { label: "Keyword in first paragraph", status: "good" }
        : { label: "Keyword not in first paragraph", status: "warn", tip: "Mention the keyword in the opening paragraph." },
      slugKw && input.slug.includes(slugKw)
        ? { label: "Keyword in URL", status: "good" }
        : { label: "Keyword not in URL", status: "warn" },
    );
  } else {
    checks.push({ label: "No focus keyword set", status: "warn", tip: "Pick the main search phrase this post should rank for." });
  }

  const points = checks.reduce((sum, c) => sum + (c.status === "good" ? 1 : c.status === "warn" ? 0.5 : 0), 0);
  return { checks, score: Math.round((points / checks.length) * 100), words };
}
