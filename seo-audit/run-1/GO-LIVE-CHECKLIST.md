# Go-live readiness — filingedge360.com

## Verdict

**Soft-launch ready on Vercel + custom domain** for lead capture and service pages.  
**Not fully compliance / E-E-A-T ready** until legal entity fields, Resend domain, and Search Console are done.

| Area | Status | Notes |
|---|---|---|
| Production build | Check build log | Must be green before domain cutover |
| Deploy pipeline | Ready | GitHub `filling360a/filing360` → Vercel `filing360` |
| Core env (Supabase, salt, cron, site URL) | Present on Vercel | Update `NEXT_PUBLIC_SITE_URL` → `https://filingedge360.com` |
| Resend (`RESEND_API_KEY`, reply-to, lead notify) | **Missing on Vercel** | Must add before go-live or lead emails fail in prod |
| Phone / WhatsApp | Ready | Call + WhatsApp set |
| Email From | Configured locally | Use `noreply@filingedge360.com` — domain must be verified in Resend |
| Legal entity (CIN, GSTIN, address, grievance officer name) | **Empty** | Hidden on site; fill ASAP for trust / IT Rules / DPDP |
| Team / Reviews / socials / GBP | Empty | Soft-launch OK; hurts SEO vs competitors |
| SEO tech | Strong | Lighthouse SEO 100; set production site URL |
| Content hubs/blogs batch | Partial | GST live; other batches still to ship |
| Admin auth redirects | Need update | Supabase redirect URLs for `filingedge360.com` |

## Blockers before pointing DNS (must)

1. Add missing Vercel envs: `RESEND_API_KEY`, `EMAIL_REPLY_TO`, `LEAD_NOTIFY_EMAILS`; set `EMAIL_FROM` + `NEXT_PUBLIC_SITE_URL`
2. Verify `filingedge360.com` in Resend (DNS records)
3. Supabase Auth → add `https://filingedge360.com/auth/confirm` (+ www)
4. Successful production deploy on `filing360.vercel.app`

## Should-do same day (strongly recommended)

5. Fill `company.legalName`, address, CIN/GSTIN, grievance officer name  
6. Google Search Console + Bing for `filingedge360.com`  
7. Confirm `support@` / `noreply@` mailboxes or forwards exist  

## Can follow after DNS

8. Team page + CA LinkedIn reviewer  
9. Reviews / GBP  
10. Remaining hub/service/blog batches  
11. Analytics IDs (GA/GTM/Ads) when ready  

## Cloudflare DNS (after Vercel domain add)

Vercel typically asks for:

| Type | Name | Value | Proxy |
|---|---|---|---|
| A | `@` | `76.76.21.21` | DNS only (grey cloud) recommended at first |
| CNAME | `www` | `cname.vercel-dns.com` | DNS only at first |

Exact values: use what `vercel domains add` prints. After SSL works, orange-cloud proxy is optional (often keep grey for Vercel).
