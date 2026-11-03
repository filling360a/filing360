import Link from "next/link";
import {
  formatInr,
  formatPer,
  generalTerms,
  pillars,
  serviceHref,
  type Service,
} from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = pageMetadata({
  title: "Pricing — Company Registration, GST & Tax Filing Fees",
  description:
    "Transparent Filing360 professional fees for company registration, GST returns, ITR filing and MCA compliance. Government charges shown separately.",
  path: "/pricing",
  absoluteTitle: true,
  keywords: ["company registration fees", "GST return filing price", "ITR filing charges"],
});

function cheapest(service: Service) {
  const priced = service.packages.filter((p) => typeof p.price === "number");
  if (!priced.length) return null;
  return priced.reduce((a, b) => ((b.price as number) < (a.price as number) ? b : a));
}

export default function PricingPage() {
  return (
    <div className="bg-[#f3f7fa]">
      <section className="border-b border-[#d7e4de] bg-gradient-to-br from-[#e3f2ed] via-white to-[#f3f7fa]">
        <div className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 md:py-20">
          <h1 className="text-[30px] font-bold tracking-tight text-[#0f2a45] md:text-[46px]">
            Simple, transparent pricing
          </h1>
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-[#4a5d68] md:mt-4 md:text-[16px]">
            Every price below is a {siteConfig.brandName} professional fee, exclusive of GST unless the
            package says otherwise (Private Limited plans are GST-inclusive).
            Government fees, stamp duty and DSC charges are always shown separately — never hidden
            in the fine print.
          </p>
          <div className="rail rail-bleed mt-6 grid gap-4 [--rail-item:72%] [--rail-item-sm:40%] md:mt-8 lg:grid-cols-3">
            {[
              ["Professional fee", "Drafting, portal filing, expert review and status updates."],
              ["Government fees", "MCA, GSTN, Income Tax and state stamp duty — paid to authorities at actuals."],
              ["Ancillary", "DSC tokens, notary, courier and department visits — quoted before billing."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-[#d4ede4] bg-white p-5">
                <h2 className="text-[16px] font-bold text-[#0f2a45]">{title}</h2>
                <p className="mt-1.5 text-[15px] text-[#5b6e7a]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] space-y-8 px-5 py-8 md:px-8 lg:space-y-12 lg:py-16">
        {pillars.map((pillar) => (
          <section key={pillar.slug} id={pillar.slug} className="scroll-mt-24">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-[20px] font-bold tracking-tight text-[#0f2a45] md:text-[24px]">{pillar.name}</h2>
              <Link href={`/services/${pillar.slug}`} className="text-[15px] font-semibold text-[#0e7b5b] hover:text-[#0b6550]">
                View all →
              </Link>
            </div>
            <div className="mt-3 overflow-hidden rounded-2xl border border-[#d7e4de] bg-white md:mt-5">
              <ul className="divide-y divide-[#e8f0ec] md:grid md:grid-cols-2 md:divide-y-0 lg:block lg:divide-y">
                {pillar.services.map((service) => {
                  const pkg = cheapest(service);
                  return (
                    <li key={service.slug} className="md:border-b md:border-[#e8f0ec] md:odd:border-r lg:border-r-0 lg:border-b-0">
                      <Link
                        href={serviceHref(pillar, service)}
                        className="flex items-center justify-between gap-3 px-4 py-3 transition hover:bg-[#f3f7fa] sm:px-5 lg:py-4"
                      >
                        <span className="min-w-0">
                          <span className="block text-[15px] font-semibold leading-snug text-[#0f2a45] md:text-[16px]">{service.name}</span>
                          {service.packages.length > 1 && (
                            <span className="text-[14px] text-[#5b6e7a]">
                              {service.packages.length} packages
                            </span>
                          )}
                        </span>
                        <span className="shrink-0 text-right">
                          {pkg ? (
                            <>
                              <span className="hidden text-[13.5px] text-[#5b6e7a] sm:inline">Starting at </span>
                              <span className="text-[16px] font-bold text-[#0f2a45] md:text-[18px]">{formatInr(pkg.price as number)}</span>
                              {pkg.per && (
                                <span className="block text-[13px] text-[#5b6e7a] sm:ml-1 sm:inline sm:text-[14px]">{formatPer(pkg.per)}</span>
                              )}
                            </>
                          ) : (
                            <span className="whitespace-nowrap text-[14.5px] font-semibold text-[#0e7b5b] md:text-[15px]">Get a quote →</span>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ))}

        <section className="rounded-2xl border border-[#d7e4de] bg-white p-6 md:p-8">
          <h2 className="text-[18px] font-bold text-[#0f2a45]">Terms & conditions</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-[#4a5d68] marker:text-[#8a9ba6]">
            {generalTerms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/#hero-lead"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#0e7b5b] px-5 text-[15px] font-semibold text-white transition hover:bg-[#0b6550]"
          >
            {siteConfig.cta.quote} <span aria-hidden>→</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex h-11 items-center rounded-xl border border-[#bfd4cb] bg-white px-5 text-[15px] font-semibold text-[#0f2a45] hover:border-[#8a9ba6]"
          >
            {siteConfig.cta.browse}
          </Link>
        </div>
      </div>
    </div>
  );
}
