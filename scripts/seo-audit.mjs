/**
 * Technical SEO audit crawler (inspired by SEOnaut + Lighthouse SEO checks).
 * Usage: node scripts/seo-audit.mjs [baseUrl]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const MAX_PAGES = 80;
const OUT = resolve(process.cwd(), "seo-audit", "run-1");

const findings = [];
const pages = [];

function add(severity, code, message, url = "", evidence = "") {
  findings.push({ severity, code, message, url, evidence });
}

async function fetchText(url) {
  const res = await fetch(url, {
    redirect: "manual",
    headers: { "user-agent": "Filingedge360-SEO-Audit/1.0" },
  });
  const text = res.status < 400 || res.status >= 500 ? await res.text().catch(() => "") : "";
  return { res, text, finalUrl: url };
}

function pick(html, re) {
  const m = html.match(re);
  return m ? (m[1] || m[0]).trim() : "";
}

function all(html, re) {
  return [...html.matchAll(re)].map((m) => (m[1] || m[0]).trim());
}

function analyzePage(url, status, html, headers) {
  const title = pick(html, /<title[^>]*>([^<]*)<\/title>/i);
  const desc = pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
    || pick(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const canonical = pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)
    || pick(html, /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);
  const robotsMeta = pick(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
  const ogTitle = pick(html, /property=["']og:title["'][^>]+content=["']([^"']*)["']/i)
    || pick(html, /content=["']([^"']*)["'][^>]+property=["']og:title["']/i);
  const ogDesc = pick(html, /property=["']og:description["'][^>]+content=["']([^"']*)["']/i)
    || pick(html, /content=["']([^"']*)["'][^>]+property=["']og:description["']/i);
  const ogImage = pick(html, /property=["']og:image["'][^>]+content=["']([^"']*)["']/i)
    || pick(html, /content=["']([^"']*)["'][^>]+property=["']og:image["']/i);
  const h1s = all(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi).map((h) => h.replace(/<[^>]+>/g, "").trim());
  const lang = pick(html, /<html[^>]+lang=["']([^"']+)["']/i);
  const jsonLd = all(html, /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  const imgsMissingAlt = (html.match(/<img\b(?![^>]*\balt=)[^>]*>/gi) || []).length;
  const viewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const hsts = Boolean(headers.get("strict-transport-security"));

  const record = {
    url,
    status,
    title,
    titleLen: title.length,
    desc,
    descLen: desc.length,
    canonical,
    robotsMeta,
    ogTitle: Boolean(ogTitle),
    ogDesc: Boolean(ogDesc),
    ogImage: Boolean(ogImage),
    h1Count: h1s.length,
    h1s,
    lang,
    jsonLdCount: jsonLd.length,
    imgsMissingAlt,
    viewport,
  };
  pages.push(record);

  if (status >= 400) add("critical", "http-error", `HTTP ${status}`, url);
  if (!title) add("critical", "missing-title", "Missing <title>", url);
  else if (title.length < 30) add("high", "short-title", `Title too short (${title.length})`, url, title);
  else if (title.length > 65) add("low", "long-title", `Title long for SERP (${title.length})`, url, title);
  if (!desc) add("critical", "missing-description", "Missing meta description", url);
  else if (desc.length < 70) add("high", "short-description", `Description short (${desc.length})`, url, desc);
  else if (desc.length > 160) add("low", "long-description", `Description long (${desc.length})`, url, desc.slice(0, 120));
  if (!canonical) add("high", "missing-canonical", "Missing canonical link", url);
  if (h1s.length === 0) add("critical", "missing-h1", "No H1 on page", url);
  if (h1s.length > 1) add("high", "multiple-h1", `Multiple H1s (${h1s.length})`, url, h1s.join(" | "));
  if (!ogTitle || !ogDesc) add("high", "weak-og", "Incomplete Open Graph tags", url);
  if (!ogImage) add("medium", "missing-og-image", "Missing og:image", url);
  if (!lang) add("high", "missing-lang", "html lang missing", url);
  if (!viewport) add("critical", "missing-viewport", "Missing viewport meta", url);
  if (imgsMissingAlt > 0) add("medium", "img-alt", `${imgsMissingAlt} <img> without alt`, url);
  if (jsonLd.length === 0 && !url.includes("/blog/") && url.replace(BASE, "") !== "") {
    // homepage/layout may inject org schema — warn only for thin pages
  }
  if (robotsMeta && /noindex/i.test(robotsMeta) && !/thank-you|admin|track/.test(url)) {
    add("high", "noindex", `Page is noindex: ${robotsMeta}`, url);
  }
  return record;
}

function extractLinks(html, pageUrl) {
  const hrefs = all(html, /href=["']([^"'#]+)["']/gi);
  const out = [];
  for (const href of hrefs) {
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
    try {
      const u = new URL(href, pageUrl);
      if (u.origin !== new URL(BASE).origin) continue;
      u.hash = "";
      const clean = u.toString().replace(/\/$/, "") || u.origin;
      if (clean.includes("/admin") || clean.includes("/api/")) continue;
      out.push(clean);
    } catch {
      /* ignore */
    }
  }
  return out;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  console.log(`SEO audit → ${BASE}`);

  // robots + sitemap
  const robots = await fetchText(`${BASE}/robots.txt`);
  const sitemap = await fetchText(`${BASE}/sitemap.xml`);
  writeFileSync(resolve(OUT, "robots.txt"), robots.text || "");
  writeFileSync(resolve(OUT, "sitemap.xml"), sitemap.text.slice(0, 500_000));

  if (robots.res.status !== 200) add("critical", "robots-missing", "robots.txt not reachable", `${BASE}/robots.txt`);
  else if (/Disallow:\s*\/\s*$/m.test(robots.text) && !/Allow:/m.test(robots.text.split("Disallow: /")[1] || "")) {
    // full disallow is expected on non-production; still flag
    if (/Disallow:\s*\/\s*$/m.test(robots.text)) add("critical", "robots-block-all", "robots.txt Disallow: / blocks all crawlers (non-prod or misconfigured)", `${BASE}/robots.txt`, robots.text.slice(0, 400));
  }
  if (sitemap.res.status !== 200) add("critical", "sitemap-missing", "sitemap.xml not reachable", `${BASE}/sitemap.xml`);
  const sitemapUrls = all(sitemap.text, /<loc>([^<]+)<\/loc>/gi);
  if (sitemapUrls.length === 0 && sitemap.res.status === 200) add("critical", "sitemap-empty", "Sitemap has no URLs", `${BASE}/sitemap.xml`);
  if (sitemapUrls.some((u) => u.includes("localhost") || u.includes("127.0.0.1"))) {
    add("critical", "sitemap-localhost", "Sitemap contains localhost URLs — set NEXT_PUBLIC_SITE_URL to production domain", `${BASE}/sitemap.xml`, sitemapUrls[0]);
  }
  if (sitemapUrls.some((u) => u.includes("filing360.in"))) {
    add("high", "sitemap-old-domain", "Sitemap still references filing360.in", `${BASE}/sitemap.xml`);
  }

  const queue = new Set([BASE, ...sitemapUrls.slice(0, MAX_PAGES).map((u) => u.replace(/\/$/, "") || u)]);
  // Seed important paths if sitemap blocked
  for (const p of ["/", "/services", "/services/gst", "/services/income-tax", "/services/startup", "/about", "/contact", "/blog", "/faq", "/guides", "/pricing", "/compare"]) {
    queue.add(`${BASE}${p === "/" ? "" : p}`);
  }

  const visited = new Set();
  const queueList = [...queue];

  for (const url of queueList) {
    if (visited.size >= MAX_PAGES) break;
    const key = url.replace(/\/$/, "") || url;
    if (visited.has(key)) continue;
    visited.add(key);

    try {
      const { res, text } = await fetchText(url);
      const location = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && location) {
        add(res.status === 302 || res.status === 307 ? "medium" : "low", "redirect", `HTTP ${res.status} → ${location}`, url);
        continue;
      }
      analyzePage(url, res.status, text, res.headers);
      for (const link of extractLinks(text, url)) {
        if (!visited.has(link) && queueList.length < MAX_PAGES * 2) queueList.push(link);
      }
    } catch (err) {
      add("critical", "fetch-failed", err instanceof Error ? err.message : "fetch failed", url);
    }
  }

  // Duplicate titles / descriptions
  const byTitle = new Map();
  const byDesc = new Map();
  for (const p of pages) {
    if (p.title) byTitle.set(p.title, [...(byTitle.get(p.title) || []), p.url]);
    if (p.desc) byDesc.set(p.desc, [...(byDesc.get(p.desc) || []), p.url]);
  }
  for (const [title, urls] of byTitle) {
    if (urls.length > 1) add("high", "duplicate-title", `Duplicate title on ${urls.length} pages`, urls[0], title);
  }
  for (const [desc, urls] of byDesc) {
    if (urls.length > 1) add("high", "duplicate-description", `Duplicate description on ${urls.length} pages`, urls[0], desc.slice(0, 100));
  }

  const severityRank = { critical: 0, high: 1, medium: 2, low: 3 };
  findings.sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);

  const summary = {
    base: BASE,
    crawledAt: new Date().toISOString(),
    pagesCrawled: pages.length,
    sitemapUrlCount: sitemapUrls.length,
    counts: {
      critical: findings.filter((f) => f.severity === "critical").length,
      high: findings.filter((f) => f.severity === "high").length,
      medium: findings.filter((f) => f.severity === "medium").length,
      low: findings.filter((f) => f.severity === "low").length,
    },
  };

  writeFileSync(resolve(OUT, "summary.json"), JSON.stringify(summary, null, 2));
  writeFileSync(resolve(OUT, "findings.json"), JSON.stringify(findings, null, 2));
  writeFileSync(resolve(OUT, "pages.json"), JSON.stringify(pages, null, 2));

  const md = [
    `# SEO audit — ${BASE}`,
    "",
    `Crawled **${pages.length}** pages · Sitemap URLs: **${sitemapUrls.length}**`,
    "",
    `| Severity | Count |`,
    `|---|---|`,
    `| Critical | ${summary.counts.critical} |`,
    `| High | ${summary.counts.high} |`,
    `| Medium | ${summary.counts.medium} |`,
    `| Low | ${summary.counts.low} |`,
    "",
    `## Findings`,
    "",
    ...findings.map((f) => `- **[${f.severity}]** \`${f.code}\` — ${f.message}${f.url ? `  \n  ${f.url}` : ""}${f.evidence ? `  \n  > ${f.evidence}` : ""}`),
  ].join("\n");
  writeFileSync(resolve(OUT, "REPORT.md"), md);

  console.log(JSON.stringify(summary, null, 2));
  console.log(`Report: ${resolve(OUT, "REPORT.md")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
