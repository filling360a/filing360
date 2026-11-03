"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { pillars } from "@/content/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { InnerHero, bannerMarks } from "@/components/site/InnerHero";
import { bannerForPath } from "@/content/pageBanners";

export function ServicesHub() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return pillars.flatMap((pillar) =>
      pillar.services
        .filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.heading.toLowerCase().includes(q) ||
            s.tagline.toLowerCase().includes(q),
        )
        .map((service) => ({ pillar, service })),
    );
  }, [query]);

  return (
    <div className="bg-[#f3f7fa]">
      <InnerHero
        art={bannerForPath("/services")}
        title="Every filing,"
        accent="one place."
        body={
          <p>
            Income tax, GST, startup registration, MCA compliance and more — every package listed with its price.
          </p>
        }
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services" },
        ]}
        marks={[
          {
            label: "Income tax",
            well: "bg-[#e3f2ed] text-[#0e7b5b]",
            icon: bannerMarks.rupee,
          },
          {
            label: "GST filings",
            well: "bg-[#e8f2ee] text-[#0f2a45]",
            icon: bannerMarks.doc,
          },
          {
            label: "Registrations",
            well: "bg-[#d4ede4] text-[#0b6550]",
            icon: bannerMarks.building,
          },
          {
            label: "100% online",
            well: "bg-[#e3f2ed] text-[#0e7b5b]",
            icon: bannerMarks.check,
          },
        ]}
        actions={
          <div className="w-full max-w-lg">
            <label className="block">
              <span className="sr-only">Search services</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search GST return, ITR, Private Limited…"
                className="w-full rounded-xl border border-[#bfd4cb] bg-white px-4 py-3 text-[15px] text-[#0f2a45] placeholder:text-[#8a9ba6] shadow-[0_10px_24px_-18px_rgba(15,42,69,0.45)] focus:border-[#0e7b5b] focus:outline-none"
              />
            </label>
            <ul className="mt-3 flex flex-wrap gap-2">
              {pillars.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`#${p.slug}`}
                    className="inline-block whitespace-nowrap rounded-full border border-[#c5e8dc] bg-white/80 px-3 py-1.5 text-[13.5px] font-semibold text-[#0b6550] hover:border-[#0e7b5b]"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <div className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 lg:py-16">
        {results ? (
          <>
            <p className="mb-6 text-[15px] text-[#5b6e7a]">
              {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
            </p>
            {results.length === 0 ? (
              <p className="rounded-2xl border border-[#d7e4de] bg-white px-5 py-10 text-[#5b6e7a]">
                No services match. Try “GST registration”, “ITR” or “private limited”.
              </p>
            ) : (
              <ul className="rail rail-bleed grid gap-4 [--rail-item:72%] [--rail-item-sm:40%] lg:grid-cols-3 xl:grid-cols-4">
                {results.map(({ pillar, service }) => (
                  <li key={`${pillar.slug}-${service.slug}`}>
                    <ServiceCard pillar={pillar} service={service} showPillar />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <div className="space-y-10 lg:space-y-14">
            {pillars.map((pillar) => (
              <section key={pillar.slug} id={pillar.slug} className="scroll-mt-24">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-[20px] font-bold tracking-tight text-[#0f2a45] md:text-[24px]">
                      {pillar.name}
                      <span className="ml-2 align-middle text-[13.5px] font-semibold text-[#8a9ba6]">
                        {pillar.services.length}
                      </span>
                    </h2>
                    <p className="mt-1 line-clamp-2 max-w-2xl text-[14.5px] text-[#5b6e7a] md:text-[15px]">
                      {pillar.description}
                    </p>
                  </div>
                  <Link
                    href={`/services/${pillar.slug}`}
                    className="shrink-0 whitespace-nowrap text-[15px] font-semibold text-[#0e7b5b] hover:text-[#0b6550]"
                  >
                    View all →
                  </Link>
                </div>
                <ul className="rail rail-bleed mt-4 grid gap-4 [--rail-item:72%] [--rail-item-sm:40%] lg:mt-6 lg:grid-cols-3 xl:grid-cols-4">
                  {pillar.services.map((service) => (
                    <li key={service.slug}>
                      <ServiceCard pillar={pillar} service={service} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
