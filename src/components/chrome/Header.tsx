"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  formatInr,
  pillarHref,
  pillars,
  serviceHref,
  servicePriceFrom,
  type Pillar,
} from "@/content/services";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "./Logo";

type NavItem =
  | { kind: "pillar"; pillar: Pillar }
  | { kind: "link"; label: string; href: string };

const navItems: NavItem[] = [
  ...pillars.map((pillar) =>
    pillar.services.length === 1
      ? ({ kind: "link", label: pillar.name, href: pillarHref(pillar) } as const)
      : ({ kind: "pillar", pillar } as const),
  ),
  { kind: "link", label: "Articles", href: "/blog" },
];

const pillarIcons: Record<string, React.ReactNode> = {
  "income-tax": (
    <>
      <path d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21Z" strokeLinejoin="round" />
      <path d="M10 8h4M10 12h4M10 16h2" strokeLinecap="round" />
    </>
  ),
  gst: (
    <>
      <path d="M19 5 5 19" strokeLinecap="round" />
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </>
  ),
  startup: (
    <>
      <path d="M12 3c3.5 2 5 5.5 5 9l-2.5 3h-5L7 12c0-3.5 1.5-7 5-9Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="1.6" />
      <path d="M9.5 18 8 21M14.5 18l1.5 3" strokeLinecap="round" />
    </>
  ),
  mca: (
    <>
      <path d="M4 21h16M6 21V9l6-4 6 4v12" strokeLinejoin="round" />
      <path d="M10 21v-5h4v5M9.5 11.5h.01M14.5 11.5h.01" strokeLinecap="round" />
    </>
  ),
};

const defaultPillarIcon = (
  <>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </>
);

function MegaPanel({ pillar, onNavigate }: { pillar: Pillar; onNavigate: () => void }) {
  const cols = pillar.groups.map((g) =>
    g.services.length > 8 || (pillar.groups.length === 1 && g.services.length > 4) ? 2 : 1,
  );
  const total = cols.reduce((a, b) => a + b, 0);

  return (
    <div
      className="flex overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_30px_70px_-28px_rgba(11,31,58,0.45)] ring-1 ring-black/[0.02]"
      style={{ width: `min(96vw, ${total * 262 + 48}px)` }}
    >
      <div className="min-w-0 flex-1 p-6">
        <div className="flex items-start justify-between gap-6 border-b border-[#eef2f7] pb-4">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] text-[#1d4ed8] ring-1 ring-[#bfdbfe]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                {pillarIcons[pillar.slug] ?? defaultPillarIcon}
              </svg>
            </span>
            <div>
              <p className="text-[16px] font-bold tracking-tight text-[#0b2c5e]">{pillar.name}</p>
              <p className="mt-0.5 max-w-lg text-[14px] leading-snug text-[#64748b]">{pillar.description}</p>
            </div>
          </div>
          <Link
            href={`/services/${pillar.slug}`}
            onClick={onNavigate}
            className="group/all inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-[#dbeafe] bg-[#f8fbff] px-3.5 py-1.5 text-[14px] font-semibold text-[#1d4ed8] transition hover:border-[#93c5fd] hover:bg-[#eff6ff]"
          >
            View all {pillar.services.length}
            <span aria-hidden className="transition group-hover/all:translate-x-0.5">→</span>
          </Link>
        </div>

        <div
          className="mt-5 grid gap-x-6 gap-y-5"
          style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        >
          {pillar.groups.map((group, gi) => (
            <div key={group.name ?? gi} style={{ gridColumn: `span ${cols[gi]} / span ${cols[gi]}` }}>
              {group.name && (
                <p className="mb-2 flex items-center gap-2 px-2.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
                  {group.name}
                  <span className="h-px flex-1 bg-[#eef2f7]" aria-hidden />
                </p>
              )}
              <ul className={cols[gi] === 2 ? "columns-2 gap-x-6" : ""}>
                {group.services.map((s) => {
                  const from = servicePriceFrom(s);
                  return (
                    <li key={s.slug} className="break-inside-avoid">
                      <Link
                        href={serviceHref(pillar, s)}
                        onClick={onNavigate}
                        className="group/item flex items-center gap-2 rounded-lg px-2.5 py-[7px] text-[15px] text-[#334155] transition hover:bg-[#eff6ff] hover:text-[#1d4ed8]"
                      >
                        <span className="min-w-0 flex-1 truncate font-medium">{s.shortName ?? s.name}</span>
                        {from !== null && (
                          <span className="shrink-0 text-[13px] tabular-nums text-[#94a3b8] transition group-hover/item:text-[#3b82f6]">
                            {formatInr(from)}
                          </span>
                        )}
                        <span
                          aria-hidden
                          className="-ml-1 w-0 shrink-0 overflow-hidden text-[#2563eb] opacity-0 transition-all group-hover/item:ml-0 group-hover/item:w-3 group-hover/item:opacity-100"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TopBar() {
  return (
    <div className="hidden bg-[#0b2c5e] text-[14px] text-white/75 lg:block">
      <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between gap-6 px-5 md:px-8">
        <p className="flex items-center gap-2 whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" aria-hidden />
          CA-backed filings · 100% online · Pan-India
        </p>
        <div className="flex items-center gap-5 whitespace-nowrap">
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 transition hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 13.5l4 1.5v3A2 2 0 0 1 18 20 14 14 0 0 1 4 6a2 2 0 0 1 2.5-2Z" strokeLinejoin="round" />
            </svg>
            {siteConfig.contact.phone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="inline-flex items-center gap-1.5 transition hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" strokeLinejoin="round" />
            </svg>
            {siteConfig.contact.email}
          </a>
          <span className="hidden xl:inline">Mon – Sat, 9 AM – 7 PM</span>
          <span className="h-3.5 w-px bg-white/20" aria-hidden />
          <Link href="/pricing" className="transition hover:text-white">
            Pricing
          </Link>
          <Link href="/tools" className="transition hover:text-white">
            Free tools
          </Link>
          <Link href="/track" className="transition hover:text-white">
            Track status
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openMenu(slug: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(slug);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  }

  const activePillar = pillars.find((p) => p.slug === open);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "border-line shadow-[0_8px_24px_-16px_rgba(11,31,58,0.35)]" : "border-line"
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-5 md:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={`${siteConfig.brandName} home`}
        >
          <Logo priority className="h-11 w-auto" />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-0.5 xl:flex"
          aria-label="Primary"
          onMouseLeave={scheduleClose}
        >
          {navItems.map((item) =>
            item.kind === "link" ? (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => setOpen(null)}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-[15px] font-medium text-ink-soft transition hover:bg-paper-deep hover:text-ink"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.pillar.slug}
                type="button"
                aria-expanded={open === item.pillar.slug}
                onMouseEnter={() => openMenu(item.pillar.slug)}
                onFocus={() => openMenu(item.pillar.slug)}
                onClick={() => setOpen((v) => (v === item.pillar.slug ? null : item.pillar.slug))}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-[15px] font-medium transition hover:bg-paper-deep hover:text-ink ${
                  open === item.pillar.slug ? "bg-paper-deep text-ink" : "text-ink-soft"
                }`}
              >
                {item.pillar.name}
                <svg viewBox="0 0 12 8" className={`h-1.5 w-2.5 opacity-60 transition ${open === item.pillar.slug ? "rotate-180" : ""}`} aria-hidden>
                  <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </button>
            ),
          )}
        </nav>

        <AnimatePresence>
          {activePillar && (
            <motion.div
              key={activePillar.slug}
              role="region"
              aria-label={`${activePillar.name} services`}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 pt-2 xl:block"
              onMouseEnter={() => openMenu(activePillar.slug)}
              onMouseLeave={scheduleClose}
            >
              <MegaPanel pillar={activePillar} onNavigate={() => setOpen(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex xl:ml-0">
          <Link
            href="/track"
            className="whitespace-nowrap rounded-xl px-4 py-2.5 text-[15px] font-semibold text-ink-soft transition hover:bg-paper-deep hover:text-ink"
          >
            Track status
          </Link>
          <Link
            href="/book-consultation"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-seal px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition hover:bg-seal-deep"
          >
            Get Started
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line xl:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span aria-hidden className="flex w-4 flex-col gap-1">
            <span
              className={`block h-0.5 bg-ink transition ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 bg-ink transition ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-ink transition ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line xl:hidden"
          >
            <div className="max-h-[80vh] overflow-auto px-5 py-3">
              <ul className="divide-y divide-[#eef2f7]">
                {navItems.map((item) =>
                  item.kind === "link" ? (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="block py-3 text-[16px] font-medium text-ink"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={item.pillar.slug}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-3 text-left text-[16px] font-medium text-ink"
                        aria-expanded={mobileSection === item.pillar.slug}
                        onClick={() =>
                          setMobileSection((v) => (v === item.pillar.slug ? null : item.pillar.slug))
                        }
                      >
                        {item.pillar.name}
                        <svg viewBox="0 0 12 8" className={`h-2 w-3 transition ${mobileSection === item.pillar.slug ? "rotate-180" : ""}`} aria-hidden>
                          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      </button>
                      {mobileSection === item.pillar.slug && (
                        <div className="pb-3">
                          {item.pillar.groups.map((group, gi) => (
                            <div key={group.name ?? gi} className="mb-2">
                              {group.name && (
                                <p className="px-2 pb-1 pt-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#2563eb]">
                                  {group.name}
                                </p>
                              )}
                              <ul>
                                {group.services.map((s) => (
                                  <li key={s.slug}>
                                    <Link
                                      href={serviceHref(item.pillar, s)}
                                      className="block rounded-lg px-2 py-1.5 text-[15px] text-ink-muted hover:bg-paper-deep hover:text-ink"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {s.shortName ?? s.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  ),
                )}
                {[
                  ["Pricing", "/pricing"],
                  ["Free tools", "/tools"],
                  ["Guides", "/guides"],
                  ["Compliance calendar", "/compliance-calendar"],
                  ["Track status", "/track"],
                  ["About Us", "/about"],
                  ["Careers", "/careers"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block py-3 text-[16px] font-medium text-ink"
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/book-consultation"
                className="mt-3 block rounded-xl bg-seal py-3 text-center text-[15px] font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Book a free consultation →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
