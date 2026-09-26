import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, pillars } from "@/content/services";
import {
  Inclusions,
  PriceHonesty,
} from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/leads/LeadForm";
import type { Metadata } from "next";
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
  return {
    title: result.service.name,
    description: result.service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { pillar: pillarSlug, slug } = await params;
  const result = getService(pillarSlug, slug);
  if (!result) notFound();
  const { pillar, service } = result;

  return (
    <div className="bg-paper">
      <div className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
          <div className="md:col-span-7">
            <p className="text-sm text-ink-muted">
              <Link href="/services" className="hover:text-ink">
                Services
              </Link>
              <span aria-hidden className="mx-2">
                /
              </span>
              <Link
                href={`/services/${pillar.slug}`}
                className="hover:text-ink"
              >
                {pillar.name}
              </Link>
            </p>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl">
              {service.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
              {service.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#service-lead">{siteConfig.cta.quote}</Button>
              <Button variant="secondary" href="/how-it-works">
                How filing works
              </Button>
            </div>
            <div className="mt-10 border border-line bg-paper-deep/40 p-6 md:p-8">
              <PriceHonesty amount={service.professionalFeeFrom} />
              <p className="mt-6 text-sm text-ink-muted">
                Timeline:{" "}
                <span className="font-medium text-ink">{service.timeline}</span>
              </p>
              <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                Government fees, stamp duty, and DSC costs vary by state and
                capital. {siteConfig.brandName} confirms the full estimate before
                payment.
              </p>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-md bg-ink p-4 md:sticky md:top-24 md:p-5">
              <p className="mb-3 text-center text-xs text-white/70">
                Call{" "}
                <a
                  className="font-medium text-seal-soft"
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <LeadForm id="service-lead" compact />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-6">
          <h2 className="font-display text-2xl tracking-tight text-ink">
            What&apos;s included
          </h2>
          <div className="mt-6">
            <Inclusions items={service.inclusions} />
          </div>
        </div>
        <div className="md:col-span-6">
          <h2 className="font-display text-2xl tracking-tight text-ink">
            Best suited for
          </h2>
          <ul className="mt-6 space-y-3">
            {service.bestFor.map((item) => (
              <li key={item} className="text-sm text-ink-muted">
                <span className="mr-2 text-seal" aria-hidden>
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="#service-lead">{siteConfig.cta.quoteInstant}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
