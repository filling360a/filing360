import Link from "next/link";
import { notFound } from "next/navigation";
import { getPillar, pillars } from "@/content/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

type Props = { params: Promise<{ pillar: string }> };

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};
  return {
    title: pillar.name,
    description: pillar.description,
  };
}

export default async function PillarPage({ params }: Props) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  return (
    <div className="bg-paper">
      <div className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <p className="text-sm text-ink-muted">
            <Link href="/services" className="hover:text-ink">
              Services
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            {pillar.name}
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl">
            {pillar.name}
          </h1>
          <p className="mt-4 max-w-2xl text-ink-muted">{pillar.description}</p>
          <p className="mt-6 text-sm text-ink-muted">
            {siteConfig.brandName} lists professional fees openly — government
            fees are always additive.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillar.services.map((service) => (
            <li key={service.slug}>
              <ServiceCard pillar={pillar} service={service} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
