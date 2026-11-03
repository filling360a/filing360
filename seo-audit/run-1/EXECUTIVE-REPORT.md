# Filingedge360 SEO audit — executive report

**Tools used**
- [Unlighthouse / Lighthouse](https://github.com/GoogleChrome/lighthouse) (Google, industry standard) — SEO category
- Custom crawler modeled on [SEOnaut](https://github.com/stjudewashere/seonaut) (best free open-source full-site SEO auditor) — 80 pages + 167 sitemap URLs
- Competitor page review: ClearTax, RegisterKaro, Vakilsearch, IndiaFilings, Startupwala, Razorpay Rize, Corpbiz

**Audit date:** 3 Nov 2026 · Base crawl: `http://localhost:3000`

---

## Scores (Lighthouse)

| Page | SEO | Accessibility | Best practices |
|---|---|---|---|
| Home | **100** | 91 | 100 |
| GST hub | **100** | — | — |
| Pvt Ltd registration | **100** | — | — |

Technical SEO foundations are strong. The gap vs ClearTax / RegisterKaro is **content depth, E-E-A-T, topical authority and backlinks** — not missing basic tags.

---

## Crawl findings (before fixes)

| Severity | Count | Theme |
|---|---|---|
| Critical | 1 | Sitemap used localhost (local env) — **must set `NEXT_PUBLIC_SITE_URL=https://filingedge360.com` in Vercel production** |
| High | 16 | Missing canonicals on hub pages; short titles; duplicate home/services description |
| Medium | 2 | Weak og:image on a few pages |
| Low | 38 | Titles/descriptions slightly long for SERP (cosmetic) |

### Fixes applied in this pass
1. Home, `/services`, `/pricing`, `/how-it-works`, `/compare` — unique titles, descriptions, **canonicals**, keywords
2. Split `/services` client hub so metadata can be emitted (was a pure client page → inherited site default)
3. Pillar + service pages — keyword-rich absolute titles (`… Online in India | Filing360`)
4. Site-wide description shortened to SERP-friendly length
5. `WebSite` JSON-LD **SearchAction** for sitelinks search box eligibility
6. `public/llms.txt` for AI/answer-engine discovery
7. Robots rules for GPTBot / Google-Extended

---

## Competitor gap analysis (6-month win plan)

| Capability | ClearTax | RegisterKaro / Vakilsearch / IndiaFilings | Filing360 today | Priority |
|---|---|---|---|---|
| Keyword-rich service URLs + fee pages | Strong | Strong | Good structure; deepen copy | P0 |
| Topical blog clusters (73 planned) | Huge | Large | GST batch done; ship 17 then 3–4/week | P0 |
| City / industry landing pages | Medium | Strong (RegisterKaro) | Scaffold exists — expand | P0 |
| Reviews + schema AggregateRating | Strong | Strong (20k+ claims) | Reviews content empty | P0 |
| Named experts / CA E-E-A-T | Strong | Medium | Team empty; LinkedIn reviewer pending | P0 |
| Compare / “vs” pages | Medium | Medium | `/compare` live — add RegisterKaro + Corpbiz rows | P1 |
| Tools & calculators (links + rankings) | Very strong | Medium | Tools exist — interlink from every service | P1 |
| Backlinks / PR / directories | Dominates | Strong | Need GBP, Justdial, directories, guest posts | P0 |
| Brand = domain consistency | Clear | Clear | Brand Filing360 / domain filingedge360.com — align messaging | P1 |
| Paid + organic synergy | Heavy | Heavy | Capture money pages first (Pvt Ltd, GST, ITR) | P0 |

### Money keywords to own first (months 1–3)
1. private limited company registration  
2. GST registration / GST return filing  
3. ITR filing online / income tax return filing  
4. LLP registration / OPC registration  
5. company registration fees / GST return filing charges  

### Content machine (months 1–6)
- **Week 0–2:** Publish 17 launch blogs + all hub/service pages from your batches  
- **Ongoing:** 3–4 blogs/week (looks natural to Ads + Google)  
- **Clusters:** GST → MCA → Accounting/CFO → Ind AS → Project finance → Income tax → Registration/winding up  
- Internal links: every blog → 1 hub + 1 service + 1 tool  

---

## Production checklist (do this week)

1. Vercel env: `NEXT_PUBLIC_SITE_URL=https://filingedge360.com`  
2. Google Search Console + Bing Webmaster → property + sitemap `https://filingedge360.com/sitemap.xml`  
3. Verify domain in Resend; confirm robots is **not** `Disallow: /` on production  
4. Fill `company.ts`: legal name, CIN, GSTIN, address, maps URL, socials, GBP  
5. Add CA Rahul LinkedIn when ready; publish Team + Reviews  
6. Google Business Profile for local pack  

---

## Accessibility follow-ups (Lighthouse 91)
- `color-contrast`, `target-size`, `aria-prohibited-attr`, `label-content-name-mismatch`  
- Not SEO blockers; fix in a UI polish pass for Core Web Vitals / UX trust.

---

## Artifacts
- `seo-audit/run-1/REPORT.md` — raw crawl findings  
- `seo-audit/run-1/findings.json` / `pages.json` / `summary.json`  
- `seo-audit/run-1/lighthouse-*.json`  
- Re-run: `node scripts/seo-audit.mjs https://filingedge360.com`  
- Lighthouse: `npx lighthouse https://filingedge360.com --only-categories=seo`
