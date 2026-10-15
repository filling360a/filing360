import "server-only";
import sanitizeHtml from "sanitize-html";
import { slugify } from "@/lib/slug";

const SITE_HOSTS = new Set(["filing360.in", "www.filing360.in", "localhost"]);

/** Allowlist sanitiser for editor output. Runs on every save. */
export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li",
      "blockquote", "code", "pre", "hr", "br", "img", "figure", "figcaption",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https", "http"] },
    allowProtocolRelative: false,
    transformTags: {
      h1: "h2",
      h5: "h4",
      h6: "h4",
      b: "strong",
      i: "em",
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        let external = false;
        try {
          const url = new URL(href, "https://filing360.in");
          external = /^https?:$/.test(url.protocol) && !SITE_HOSTS.has(url.hostname);
        } catch {
          external = false;
        }
        const next: Record<string, string> = { href };
        if (attribs.title) next.title = attribs.title;
        if (external) {
          next.target = "_blank";
          next.rel = "noopener noreferrer";
        }
        return { tagName, attribs: next };
      },
    },
    exclusiveFilter: (frame) => frame.tag === "p" && !frame.text.trim() && !frame.mediaChildren.length,
  });
}

export function htmlToText(html: string): string {
  return html
    .replace(/<(br|\/p|\/h[2-4]|\/li|\/blockquote)>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function postStats(html: string): { wordCount: number; readingMinutes: number } {
  const text = htmlToText(html);
  const wordCount = text ? text.split(" ").length : 0;
  return { wordCount, readingMinutes: Math.max(1, Math.round(wordCount / 220)) };
}

export type TocItem = { id: string; text: string; level: 2 | 3 };

/** Adds stable ids to h2/h3 headings and returns a table of contents. */
export function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level: string, inner: string) => {
    const text = htmlToText(inner);
    const base = slugify(text, 60) || "section";
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    const id = n ? `${base}-${n + 1}` : base;
    toc.push({ id, text, level: Number(level) as 2 | 3 });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { html: out, toc };
}
