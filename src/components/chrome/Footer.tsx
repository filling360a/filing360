import Link from "next/link";
import { CompanyStrip } from "@/components/site/CompanyDetails";
import { CookieSettingsButton } from "@/components/site/Consent";
import { cities, cityHref } from "@/content/cities";
import { company, socialLinks, whatsappLink } from "@/content/company";
import { policies } from "@/content/policies";
import { pillarHref, pillars } from "@/content/services";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "./Logo";

const COMPANY_LINKS = [
  ["About us", "/about"],
  ["Our team", "/team"],
  ["Client reviews", "/reviews"],
  ["Careers", "/careers"],
  ["Partner program", "/partners"],
  ["Refer & earn", "/refer-and-earn"],
  ["Contact us", "/contact"],
  ["Track status", "/track"],
] as const;

const RESOURCE_LINKS = [
  ["Articles", "/blog"],
  ["Comparison guides", "/guides"],
  ["Free tax tools", "/tools"],
  ["Compliance calendar", "/compliance-calendar"],
  ["Government fees", "/government-fees"],
  ["Document checklists", "/documents"],
  ["Glossary", "/glossary"],
  ["FAQs", "/faq"],
] as const;

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: <path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-4.5a2.5 2.5 0 0 1 5 0v4.5M10.5 9.5v8" strokeLinecap="round" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.8 7.2v.01" strokeLinecap="round" />
    </>
  ),
  x: <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />,
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3.5" />
      <path d="M10.5 9.5v5l4-2.5z" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14.5 8H13a1.5 1.5 0 0 0-1.5 1.5V20M9 12.5h5" strokeLinecap="round" />,
};

function FooterColumn({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <p className="text-[13.5px] font-semibold uppercase tracking-[0.1em] text-[#93c5fd]">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="text-[14.5px] text-white/65 transition hover:text-white md:text-[15px]">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const socials = socialLinks();

  return (
    <footer className="bg-[#071f42] pb-[4.25rem] text-white md:pb-0">
      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-10 md:grid-cols-12 md:gap-10 md:px-8 md:py-14 lg:px-10">
        <div className="md:col-span-4">
          <Link href="/" className="inline-flex rounded-xl bg-white px-3 py-1.5" aria-label={`${siteConfig.brandName} home`}>
            <Logo className="h-11 w-auto" />
          </Link>
          <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-white/65">
            {siteConfig.tagline} A private facilitation platform for Indian registrations and compliance — not a government website.
          </p>
          <div className="mt-5 space-y-3 md:mt-6">
            <Link
              href="/book-consultation"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-[15px] font-semibold text-[#0b2c5e] transition hover:bg-[#eff6ff]"
            >
              Book a free consultation
              <span aria-hidden>→</span>
            </Link>
            <ul className="space-y-1.5 text-[15px] text-white/65">
              <li>
                <a className="hover:text-white" href={`tel:${company.contact.phone.replace(/\s/g, "")}`}>{company.contact.phoneDisplay}</a>
              </li>
              <li>
                <a className="hover:text-white" href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
              </li>
              <li>
                <a className="hover:text-white" href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
              </li>
              <li className="text-white/45">{company.hours.label}</li>
            </ul>
            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-2 pt-1" aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/75 transition hover:border-white hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        {SOCIAL_ICONS[s.key]}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-8 md:grid-cols-4">
          {pillars.slice(0, 4).map((pillar) => (
            <div key={pillar.slug}>
              <p className="text-[13.5px] font-semibold uppercase tracking-[0.1em] text-[#93c5fd]">{pillar.name}</p>
              <ul className="mt-3 space-y-2">
                {pillar.services.slice(0, 5).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${pillar.slug}/${s.slug}`}
                      className="text-[14.5px] text-white/65 transition hover:text-white md:text-[15px]"
                    >
                      {s.shortName ?? s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/services/${pillar.slug}`} className="mt-3 inline-block text-[13.5px] font-semibold text-[#93c5fd] hover:text-white">
                View all →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 md:grid-cols-4 md:px-8 lg:px-10">
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Resources" links={RESOURCE_LINKS} />
          <FooterColumn
            title="Company registration in"
            links={cities.map((c) => [c.name, cityHref(c)] as const)}
          />
          <div>
            <FooterColumn title="Legal" links={policies.map((p) => [p.title, p.path] as const)} />
            <CookieSettingsButton className="mt-2 text-[14.5px] text-white/65 transition hover:text-white md:text-[15px]" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1320px] space-y-3 px-5 py-5 text-[13.5px] text-white/45 md:px-8 md:py-6 lg:px-10">
          <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {siteConfig.brandName}. Registrations are issued solely by government authorities.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {pillars.slice(4).map((pillar) => (
                <Link key={pillar.slug} href={pillarHref(pillar)} className="hover:text-white">
                  {pillar.name}
                </Link>
              ))}
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
              <Link href="/compare" className="hover:text-white">Compare</Link>
              <Link href="/trust" className="hover:text-white">Trust & legal</Link>
            </div>
          </div>
          <CompanyStrip />
        </div>
      </div>
    </footer>
  );
}
