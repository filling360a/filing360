import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  formatInr,
  generalTerms,
  getService,
  pillars,
  serviceHref,
  servicePriceFrom,
} from "@/content/services";
import { JsonLd } from "@/components/blog/JsonLd";
import { CheckList, PackageCard, ServiceCard } from "@/components/services/ServiceCard";
import { LeadForm } from "@/components/leads/LeadForm";
import { HeroAssurance } from "@/components/site/HeroAssurance";
import { serviceResources } from "@/content/links";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

type Props = {
  params: Promise<{ pillar: string; slug: string }>;
};

export function generateStaticParams() {
  return pillars.flatMap((p) =>
    p.services.map((s) => ({ pillar: p.slug, slug: s.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pillar, slug } = await params;
  const result = getService(pillar, slug);
  if (!result) return {};
  const from = servicePriceFrom(result.service);
  const priced = from !== null ? ` Starting at ${formatInr(from)}.` : "";
  return pageMetadata({
    title: result.service.heading,
    description: `${result.service.tagline}${priced}`.slice(0, 300),
    path: serviceHref(result.pillar, result.service),
  });
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[20px] font-bold tracking-tight text-[#0f2a45] md:text-[26px]">
      {children}
    </h2>
  );
}

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#e3f2ed] text-[#0e7b5b]">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" aria-label="Included">
          <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#eef4f1] text-[#8a9ba6]">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-label="Not included">
          <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return <span className="text-[14px] font-semibold text-[#0f2a45]">{value}</span>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { pillar: pillarSlug, slug } = await params;
  const result = getService(pillarSlug, slug);
  if (!result) notFound();
  const { pillar, service } = result;
  const from = servicePriceFrom(service);
  const related = pillar.services.filter((s) => s.slug !== service.slug).slice(0, 4);
  const terms = [...(service.terms ?? []), ...generalTerms];
  const pkgCount = service.packages.length;
  const pkgCols =
    pkgCount % 5 === 0 && pkgCount > 0
      ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      : pkgCount === 4
        ? "md:grid-cols-2 xl:grid-cols-4"
        : pkgCount > 5
          ? "md:grid-cols-2 lg:grid-cols-3"
          : pkgCount === 3
        ? "md:grid-cols-3"
        : service.packages.length === 2
          ? "md:grid-cols-2 lg:max-w-4xl"
          : "max-w-md";

  const href = serviceHref(pillar, service);
  const resources = serviceResources(pillar.slug, service.slug);
  const offers = service.packages
    .filter((p) => typeof p.price === "number")
    .map((p) => ({ name: p.name, price: p.price as number, description: p.description ?? p.bestFor }));

  return (
    <div className="bg-[#f3f7fa]">
      <JsonLd
        data={[
          serviceJsonLd({ name: service.name, description: service.tagline, path: href, category: pillar.name, offers }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: pillar.name, path: `/services/${pillar.slug}` },
            { name: service.shortName ?? service.name, path: href },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#d7e4de] bg-gradient-to-br from-[#e3f2ed] via-white to-[#f3f7fa]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#c5e8dc]/50 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-[1240px] gap-8 px-5 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10 lg:py-16">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[14.5px] text-[#5b6e7a]">
              <Link href="/" className="hover:text-[#0f2a45]">Home</Link>
              <span aria-hidden>/</span>
              <Link href="/services" className="hover:text-[#0f2a45]">Services</Link>
              <span aria-hidden>/</span>
              <Link href={`/services/${pillar.slug}`} className="hover:text-[#0f2a45]">{pillar.name}</Link>
              <span aria-hidden>/</span>
              <span className="text-[#0f2a45]">{service.shortName ?? service.name}</span>
            </nav>
            <h1 className="mt-4 text-[26px] font-bold leading-[1.15] tracking-tight text-[#0f2a45] sm:text-[32px] md:mt-5 lg:text-[44px]">
              {service.heading}
            </h1>
            <p className="mt-3 line-clamp-4 max-w-2xl text-[15.5px] leading-relaxed text-[#4a5d68] md:mt-4 md:line-clamp-none md:text-[16px] lg:text-[17px]">
              {service.tagline}
            </p>
            {service.highlights && (
              <ul className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:mt-5 md:flex-wrap md:overflow-visible md:px-0">
                {service.highlights.map((h) => (
                  <li
                    key={h}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#c5e8dc] bg-white px-3 py-1 text-[14px] font-semibold text-[#0b6550]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1a8f6c]" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3 md:mt-7">
              <a
                href={service.packages.length ? "#packages" : "#service-lead"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0e7b5b] px-4 text-[15px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(14,123,91,0.7)] transition hover:bg-[#0b6550] sm:px-6"
              >
                {service.packages.length ? "View packages" : siteConfig.cta.quote}
                <span aria-hidden>→</span>
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#bfd4cb] bg-white px-4 text-[15px] font-semibold text-[#0f2a45] transition hover:border-[#8a9ba6] sm:px-6"
              >
                <span className="sm:hidden">Call us</span>
                <span className="hidden sm:inline">Call {siteConfig.contact.phone}</span>
              </a>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3 md:mt-8">
              <div className="rounded-xl border border-[#d4ede4] bg-white px-3 py-2.5 sm:px-4 sm:py-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#5b6e7a] sm:text-[13px]">
                  {from !== null ? "Starting at" : "Pricing"}
                </p>
                <p className="mt-0.5 text-[16px] font-bold text-[#0f2a45] sm:text-[20px]">
                  {from !== null ? formatInr(from) : "On request"}
                </p>
              </div>
              {service.timeline && (
                <div className="rounded-xl border border-[#d4ede4] bg-white px-3 py-2.5 sm:px-4 sm:py-3">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#5b6e7a] sm:text-[13px]">Timeline</p>
                  <p className="mt-0.5 text-[16px] font-bold text-[#0f2a45] sm:text-[20px]">{service.timeline}</p>
                </div>
              )}
              <div className="rounded-xl border border-[#d4ede4] bg-white px-3 py-2.5 sm:px-4 sm:py-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#5b6e7a] sm:text-[13px]">Process</p>
                <p className="mt-0.5 text-[16px] font-bold text-[#0f2a45] sm:text-[20px]">100% online</p>
              </div>
            </div>

            <HeroAssurance className="mt-8 hidden md:block" />
          </div>

          <div className="min-w-0 lg:pt-2">
            <div className="md:sticky md:top-24">
              <LeadForm
                id="service-lead"
                compact
                source="service-page"
                service={{ slug: `${pillar.slug}/${service.slug}`, name: service.name }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] space-y-9 px-5 py-9 md:space-y-12 md:px-8 md:py-12 lg:space-y-16 lg:py-16">
        {service.tool && (
          <section className="flex flex-col gap-4 rounded-2xl border border-[#c5e8dc] bg-[#e8f6f1] p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <p className="text-[16px] font-bold text-[#0f3f32]">Quick self-check</p>
              <p className="mt-1 text-[15px] text-[#145a45]">{service.tool.body}</p>
            </div>
            <a
              href={service.tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#0e7b5b] px-5 text-[15px] font-semibold text-white transition hover:bg-[#0b6550]"
            >
              {service.tool.label}
              <span aria-hidden>↗</span>
            </a>
          </section>
        )}

        {(service.about || service.scope) && (
          <section className="grid gap-5 rounded-2xl border border-[#d7e4de] bg-white p-5 md:grid-cols-2 md:gap-8 md:p-8 lg:p-10">
            <div className="min-w-0">
              <SectionTitle>{service.about?.title ?? "Scope"}</SectionTitle>
              {service.about?.body && (
                <p className="mt-3 text-[15px] leading-relaxed text-[#4a5d68] md:mt-4 md:text-[16px]">{service.about.body}</p>
              )}
              {service.scope && (
                <p className="mt-4 rounded-xl bg-[#e3f2ed] px-4 py-3 text-[14.5px] font-medium text-[#145a45] md:mt-5 md:text-[15px]">
                  {service.scope}
                </p>
              )}
            </div>
            {service.about?.points && (
              <div className="rounded-2xl bg-[#f3f7fa] p-4 md:p-6">
                <CheckList items={service.about.points} />
              </div>
            )}
          </section>
        )}

        {service.usps && (
          <section>
            <SectionTitle>Why founders choose Filing360</SectionTitle>
            {service.positioning && (
              <p className="mt-3 max-w-4xl rounded-xl bg-[#e3f2ed] px-4 py-3 text-[15px] font-medium leading-relaxed text-[#145a45] md:mt-4 md:px-5 md:py-4 md:text-[16.5px]">
                {service.positioning}
              </p>
            )}
            <ul
              className={`rail rail-bleed mt-5 grid gap-4 [--rail-item:72%] [--rail-item-sm:40%] md:mt-6 ${service.usps.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-5"}`}
            >
              {service.usps.map((u) => (
                <li key={u.title} className="rounded-2xl border border-[#d7e4de] bg-white p-4 md:p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e3f2ed] text-[#0e7b5b]">
                    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                      <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="mt-3 text-[16px] font-bold leading-snug text-[#0f2a45]">{u.title}</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#5b6e7a]">{u.body}</p>
                </li>
              ))}
            </ul>
            {service.compareHref && (
              <Link
                href={service.compareHref}
                className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0e7b5b] hover:underline"
              >
                See how we compare with other providers <span aria-hidden>→</span>
              </Link>
            )}
          </section>
        )}

        {service.why && (
          <section className="rounded-2xl border border-[#d7e4de] bg-white p-5 md:p-10">
            <SectionTitle>{service.why.title}</SectionTitle>
            {service.why.intro && (
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#4a5d68] md:mt-4 md:text-[16px]">{service.why.intro}</p>
            )}
            <ul className="rail mt-5 grid gap-4 [--rail-item:82%] [--rail-item-sm:46%] md:mt-6 lg:grid-cols-2">
              {service.why.points.map((point) => {
                const [lead, ...rest] = point.split(". ");
                return (
                  <li key={point} className="rounded-xl border border-[#e8f0ec] bg-[#f3f7fa] p-4 text-[15px] leading-relaxed text-[#4a5d68] md:p-5 md:text-[15px]">
                    <span className="font-semibold text-[#0f2a45]">{lead}.</span> {rest.join(". ")}
                  </li>
                );
              })}
            </ul>
            {service.why.outro && (
              <p className="mt-6 rounded-xl bg-[#e3f2ed] px-5 py-4 text-[15.5px] font-medium text-[#145a45]">
                {service.why.outro}
              </p>
            )}
          </section>
        )}

        <section id="packages" className="scroll-mt-24">
          <SectionTitle>{service.packages.length ? "Packages & pricing" : "Pricing"}</SectionTitle>
          {service.packages.length ? (
            <>
              <p className="mt-2 text-[15px] text-[#5b6e7a] md:text-[15px]">
                Transparent professional fees. Government charges, where applicable, are always extra.
                {pkgCount > 1 && <span className="lg:hidden"> Swipe to compare plans →</span>}
              </p>
              <div
                className={`mt-6 grid gap-5 pt-3 md:mt-8 ${pkgCols} ${pkgCount > 1 ? "rail rail-bleed [--rail-item:84%] [--rail-item-sm:46%]" : ""}`}
              >
                {service.packages.map((pkg, i) => (
                  <PackageCard key={`${pkg.name}-${i}`} pkg={pkg} index={i} ctaHref="#service-lead" />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#d4ede4] bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="text-[18px] font-bold text-[#0f2a45]">Price on request</p>
                <p className="mt-1 max-w-xl text-[15px] text-[#5b6e7a]">
                  Every case is different. Share a few details and a Filing360 expert will send you a fixed quote before any work begins.
                </p>
              </div>
              <a
                href="#service-lead"
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#0e7b5b] px-6 text-[15px] font-semibold text-white transition hover:bg-[#0b6550]"
              >
                Get a quote <span aria-hidden>→</span>
              </a>
            </div>
          )}
        </section>

        {service.coverage && (
          <section>
            <SectionTitle>{service.coverage.title ?? "What each plan covers"}</SectionTitle>
            <div className="mt-5 max-h-[70vh] overflow-auto overscroll-contain rounded-2xl border border-[#d7e4de] bg-white md:mt-6 lg:max-h-none">
              <table className="w-full min-w-[560px] border-separate border-spacing-0 text-left md:min-w-[640px]">
                <thead className="sticky top-0 z-[2]">
                  <tr className="bg-[#f3f7fa]">
                    <th className="sticky left-0 z-[1] border-b border-[#d7e4de] bg-[#f3f7fa] px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#5b6e7a] md:px-5 md:py-4 md:text-[13.5px]">
                      {service.coverage.firstColumn ?? "Covers income from"}
                    </th>
                    {service.coverage.columns.map((c) => (
                      <th key={c} className="border-b border-[#d7e4de] bg-[#f3f7fa] px-3 py-3 text-center text-[14.5px] font-bold text-[#0f2a45] md:px-4 md:py-4 md:text-[15px]">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {service.coverage.rows.map((row) => (
                    <Fragment key={row.label}>
                      {row.group && (
                        <tr>
                          <td
                            colSpan={row.values.length + 1}
                            className="border-b border-[#d7e4de] bg-[#e3f2ed] px-4 py-2 text-[13px] font-bold uppercase tracking-[0.08em] text-[#0b6550] md:px-5 md:py-2.5 md:text-[13.5px]"
                          >
                            {row.group}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="sticky left-0 border-b border-[#e8f0ec] bg-white px-4 py-2.5 text-[14.5px] text-[#2c3f4e] md:px-5 md:py-3.5 md:text-[15px]">{row.label}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="border-b border-[#e8f0ec] px-3 py-2.5 text-center md:px-4 md:py-3.5">
                            <Cell value={v} />
                          </td>
                        ))}
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {service.tables?.map((table) => (
          <section key={table.title}>
            <SectionTitle>{table.title}</SectionTitle>
            {table.intro && <p className="mt-2 text-[15px] text-[#5b6e7a] md:text-[15px]">{table.intro}</p>}
            <div className="mt-5 max-h-[70vh] overflow-auto overscroll-contain rounded-2xl border border-[#d7e4de] bg-white md:mt-6 lg:max-h-none">
              <table className="w-full min-w-[620px] border-separate border-spacing-0 text-left md:min-w-[720px]">
                <thead className="sticky top-0 z-[2]">
                  <tr>
                    <th className="sticky left-0 z-[1] border-b border-[#d7e4de] bg-[#f3f7fa] px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#5b6e7a] md:px-5 md:py-4 md:text-[13.5px]">
                      {table.firstColumn}
                    </th>
                    {table.columns.map((c) => (
                      <th key={c} className="border-b border-[#d7e4de] bg-[#f3f7fa] px-3 py-3 text-center text-[14.5px] font-bold text-[#0f2a45] md:px-4 md:py-4 md:text-[15px]">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row) => (
                    <tr key={row.label}>
                      <td className="sticky left-0 max-w-[180px] border-b border-[#e8f0ec] bg-white px-4 py-2.5 md:max-w-none md:px-5 md:py-3.5">
                        <span className="block text-[14.5px] font-semibold text-[#0f2a45] md:text-[15px]">{row.label}</span>
                        {row.detail && <span className="text-[13.5px] text-[#5b6e7a] md:text-[14px]">{row.detail}</span>}
                      </td>
                      {row.values.map((v, i) => (
                        <td key={i} className="border-b border-[#e8f0ec] px-3 py-2.5 text-center text-[14.5px] text-[#2c3f4e] md:px-4 md:py-3.5 md:text-[15px]">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {table.total && (
                    <tr className="bg-[#0f2a45] text-white">
                      <td className="sticky left-0 bg-[#0f2a45] px-4 py-3 text-[13.5px] font-bold uppercase tracking-[0.06em] md:px-5 md:py-3.5 md:text-[14.5px]">
                        {table.total.label}
                      </td>
                      {table.total.values.map((t, i) => (
                        <td key={i} className="px-3 py-3 text-center text-[16px] font-bold md:px-4 md:py-3.5 md:text-[16px]">
                          {t}
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        {service.govtFees && (
          <section className="rounded-2xl border border-[#fde68a] bg-[#fffbeb] p-5 md:p-8">
            <h2 className="text-[17px] font-bold text-[#78350f] md:text-[18px]">Always charged separately (all plans)</h2>
            <p className="mt-1 text-[14.5px] text-[#92400e] md:text-[15px]">
              Paid directly to government authorities — not collected by {siteConfig.brandName}.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3">
              {service.govtFees.map((f) => (
                <li key={f.label} className="rounded-xl border border-[#fde68a] bg-white px-3 py-2.5 md:px-4 md:py-3">
                  <p className="text-[13.5px] font-semibold uppercase tracking-[0.06em] text-[#92400e]">{f.label}</p>
                  <p className="mt-1 text-[16px] font-bold text-[#0f2a45]">{f.amount}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(service.addOns || service.notes) && (
          <section className={`grid gap-4 md:gap-6 ${service.addOns && service.notes ? "md:grid-cols-2" : ""}`}>
            {service.addOns && (
              <div className="rounded-2xl border border-[#d7e4de] bg-white p-5 md:p-6">
                <h2 className="text-[18px] font-bold text-[#0f2a45]">Add-ons</h2>
                <p className="mt-1 text-[14.5px] text-[#5b6e7a]">Not included in the packages above — available on request.</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.addOns.map((a) => (
                    <li key={a} className="rounded-full border border-[#d4ede4] bg-[#e3f2ed] px-3 py-1.5 text-[14px] font-medium text-[#0b6550]">
                      + {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.notes && (
              <div className="rounded-2xl border border-[#d7e4de] bg-white p-5 md:p-6">
                <h2 className="text-[18px] font-bold text-[#0f2a45]">Notes</h2>
                <ul className="mt-4 space-y-2">
                  {service.notes.map((n) => (
                    <li key={n} className="flex gap-2 text-[15px] leading-relaxed text-[#4a5d68]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0e7b5b]" aria-hidden />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        <details className="group rounded-2xl border border-[#d7e4de] bg-white p-5 md:p-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <h2 className="text-[17px] font-bold text-[#0f2a45] md:text-[18px]">
              Terms & conditions
              <span className="ml-2 text-[13.5px] font-semibold text-[#8a9ba6]">{terms.length}</span>
            </h2>
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e3f2ed] text-[#0e7b5b] transition group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[14.5px] leading-relaxed text-[#4a5d68] marker:text-[#8a9ba6] md:text-[15px]">
            {terms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        </details>

        {resources.length > 0 && (
          <section className="rounded-2xl border border-[#d7e4de] bg-white p-5 md:p-8">
            <SectionTitle>Helpful resources</SectionTitle>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="flex items-center justify-between gap-3 rounded-xl border border-[#e8f0ec] bg-[#f3f7fa] px-4 py-3 text-[15px] font-semibold text-[#0f2a45] transition hover:border-[#8ecfbc] hover:text-[#0e7b5b]">
                    {r.label}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <div className="flex items-end justify-between gap-4">
              <SectionTitle>More in {pillar.name}</SectionTitle>
              <Link href={`/services/${pillar.slug}`} className="text-[15px] font-semibold text-[#0e7b5b] hover:text-[#0b6550]">
                View all →
              </Link>
            </div>
            <ul className="rail rail-bleed mt-5 grid gap-4 [--rail-item:72%] [--rail-item-sm:40%] md:mt-6 lg:grid-cols-4">
              {related.map((s) => (
                <li key={s.slug}>
                  <ServiceCard pillar={pillar} service={s} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#5b6e7a] hover:text-[#0f2a45]"
          >
            <span aria-hidden>←</span> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
