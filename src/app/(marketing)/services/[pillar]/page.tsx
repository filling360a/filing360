import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPillar, pillars } from "@/content/services";
import { ServiceCard } from "@/components/services/ServiceCard";
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
    title: `${pillar.name} services`,
    description: pillar.description,
  };
}

export default async function PillarPage({ params }: Props) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  return (
    <div className="bg-[#f3f7fa]">
      <section className="relative overflow-hidden border-b border-[#d7e4de] bg-gradient-to-br from-[#e3f2ed] via-white to-[#f3f7fa]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#c5e8dc]/50 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-[1240px] px-5 py-9 md:px-8 lg:py-16">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[14.5px] text-[#5b6e7a]">
            <Link href="/" className="hover:text-[#0f2a45]">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="hover:text-[#0f2a45]">Services</Link>
            <span aria-hidden>/</span>
            <span className="text-[#0f2a45]">{pillar.name}</span>
          </nav>
          <h1 className="mt-4 text-[28px] font-bold tracking-tight text-[#0f2a45] md:mt-5 md:text-[44px]">
            {pillar.name}
          </h1>
          <p className="mt-2 max-w-2xl text-[15.5px] leading-relaxed text-[#4a5d68] md:mt-3 md:text-[16px]">
            {pillar.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3 md:mt-7">
            <Link
              href="/#hero-lead"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#0e7b5b] px-5 text-[15px] font-semibold text-white transition hover:bg-[#0b6550]"
            >
              {siteConfig.cta.quote} <span aria-hidden>→</span>
            </Link>
            <span className="inline-flex h-11 items-center rounded-xl border border-[#d4ede4] bg-white px-4 text-[15px] font-medium text-[#4a5d68]">
              {pillar.services.length} services
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] space-y-9 px-5 py-8 md:px-8 lg:space-y-12 lg:py-16">
        {pillar.groups.map((group, gi) => (
          <section key={group.name ?? gi}>
            {group.name && (
              <h2 className="mb-4 text-[18px] font-bold tracking-tight text-[#0f2a45] md:mb-5 md:text-[20px]">
                {group.name}
                <span className="ml-2 align-middle text-[13.5px] font-semibold text-[#8a9ba6]">
                  {group.services.length}
                </span>
              </h2>
            )}
            <ul className="rail rail-bleed grid gap-4 [--rail-item:72%] [--rail-item-sm:40%] lg:grid-cols-3 xl:grid-cols-4">
              {group.services.map((service) => (
                <li key={service.slug}>
                  <ServiceCard pillar={pillar} service={service} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#5b6e7a] hover:text-[#0f2a45]">
            <span aria-hidden>←</span> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
