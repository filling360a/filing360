"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { pillars } from "@/content/services";
import { ServiceCard } from "@/components/services/ServiceCard";

export default function ServicesHubPage() {
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
      <section className="border-b border-[#d7e4de] bg-gradient-to-br from-[#0f2a45] via-[#0f2a45] to-[#0e7b5b] text-white">
        <div className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 md:py-20">
          <h1 className="text-[30px] font-bold tracking-tight md:text-[46px]">All services</h1>
          <p className="mt-2 max-w-xl text-[16px] text-white/75 md:mt-3 md:text-[16px]">
            Income tax, GST, startup registration, MCA compliance and more — every package listed with its price.
          </p>
          <label className="mt-6 block max-w-lg md:mt-8">
            <span className="sr-only">Search services</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search GST return, ITR, Private Limited…"
              className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-[15px] text-white placeholder:text-white/55 focus:border-white/60 focus:outline-none"
            />
          </label>
          <ul className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:mt-6 md:flex-wrap md:overflow-visible md:px-0">
            {pillars.map((p) => (
              <li key={p.slug} className="shrink-0">
                <a
                  href={`#${p.slug}`}
                  className="inline-block whitespace-nowrap rounded-full border border-white/25 px-3 py-1.5 text-[14.5px] font-medium text-white/85 hover:bg-white/10"
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
