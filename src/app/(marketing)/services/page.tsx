"use client";

import { useMemo, useState } from "react";
import { pillars } from "@/content/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import Link from "next/link";

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
            s.description.toLowerCase().includes(q),
        )
        .map((service) => ({ pillar, service })),
    );
  }, [query]);

  return (
    <div className="bg-paper">
      <div className="border-b border-line bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">
            Services
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Search the full catalog or browse by pillar. Every professional fee
            is listed with government charges called out.
          </p>
          <label className="mt-8 block max-w-lg">
            <span className="sr-only">Search services</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search GST, trademark, Section 8…"
              className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-sm text-paper placeholder:text-white/45"
            />
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        {results ? (
          <>
            <p className="mb-8 text-sm text-ink-muted">
              {results.length} result{results.length === 1 ? "" : "s"} for “
              {query}”
            </p>
            {results.length === 0 ? (
              <p className="border border-line bg-paper-deep/40 px-5 py-10 text-ink-muted">
                No services match. Try “private limited”, “FSSAI”, or “trademark”.
              </p>
            ) : (
              <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {results.map(({ pillar, service }) => (
                  <li key={`${pillar.slug}-${service.slug}`}>
                    <ServiceCard pillar={pillar} service={service} />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <ul className="grid gap-8 md:grid-cols-2">
            {pillars.map((pillar) => (
              <li
                key={pillar.slug}
                className="border border-line bg-paper-deep/25 p-6 md:p-8"
              >
                <Link
                  href={`/services/${pillar.slug}`}
                  className="font-display text-2xl tracking-tight text-ink hover:text-seal"
                >
                  {pillar.name}
                </Link>
                <p className="mt-2 text-sm text-ink-muted">
                  {pillar.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {pillar.services.slice(0, 6).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${pillar.slug}/${s.slug}`}
                        className="inline-block border border-line bg-paper px-2.5 py-1 text-xs text-ink-muted hover:border-line-strong hover:text-ink"
                      >
                        {s.shortName ?? s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
