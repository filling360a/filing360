import Link from "next/link";
import { getAllFeaturedServices, formatInr } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent professional fees with government charges always shown separately.",
};

export default function PricingPage() {
  const featured = getAllFeaturedServices();

  return (
    <div className="bg-paper">
      <div className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <h1 className="font-display text-4xl tracking-tight text-ink md:text-5xl">
            Pricing without bait
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted">
            Professional fees cover expert work. Government fees, stamp duty,
            and DSC costs are separate — and always labelled. That is how{" "}
            {siteConfig.brandName} refuses the “from ₹999” trap.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-6 border border-line p-6 md:grid-cols-3 md:p-8">
          <div>
            <h2 className="font-display text-xl text-ink">Professional fee</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Drafting, portal filing, expert review, and status updates.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-ink">Government fees</h2>
            <p className="mt-2 text-sm text-ink-muted">
              MCA, GSTN, trademark office, and state stamp — paid to authorities.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-ink">Ancillary</h2>
            <p className="mt-2 text-sm text-ink-muted">
              DSC tokens, courier, and resubmissions beyond the first round —
              quoted before billing.
            </p>
          </div>
        </div>

        <h2 className="mt-16 font-display text-3xl tracking-tight text-ink">
          Featured packages
        </h2>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {featured.map(({ pillar, service }) => (
            <li
              key={`${pillar.slug}-${service.slug}`}
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <Link
                  href={`/services/${pillar.slug}/${service.slug}`}
                  className="font-display text-xl text-ink hover:text-seal"
                >
                  {service.name}
                </Link>
                <p className="text-sm text-ink-muted">{pillar.name}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-display text-2xl tabular text-ink">
                  {formatInr(service.professionalFeeFrom)}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.06em] text-seal">
                  + Government fees
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/#hero-lead">{siteConfig.cta.quote}</Button>
          <Button variant="secondary" href="/services">
            {siteConfig.cta.browse}
          </Button>
          <Button variant="ghost" href="/about">
            {siteConfig.cta.expert}
          </Button>
        </div>
      </div>
    </div>
  );
}
