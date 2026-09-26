"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { pillars } from "@/content/services";
import { siteConfig } from "@/lib/siteConfig";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();
  const panelId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 160);
  }

  const filtered = query.trim()
    ? pillars.flatMap((p) =>
        p.services
          .filter((s) =>
            s.name.toLowerCase().includes(query.trim().toLowerCase()),
          )
          .map((s) => ({ pillar: p, service: s })),
      )
    : [];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label={`${siteConfig.brandName} home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-seal text-xs font-bold text-white shadow-sm">
            F
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-ink">
              Filing<span className="text-accent">360</span>
            </span>
            <span className="hidden text-[10px] font-medium text-ink-muted sm:block">
              Business. Compliant. Ahead.
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-paper-deep hover:text-ink"
              aria-expanded={menuOpen}
              aria-controls={panelId}
              onClick={() => setMenuOpen((v) => !v)}
              onFocus={openMenu}
            >
              Services ▾
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-label="Services menu"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full z-50 mt-2 w-[min(92vw,880px)] rounded-2xl border border-line bg-white p-5 shadow-[0_24px_60px_-24px_rgba(11,31,58,0.35)]"
                  onMouseEnter={openMenu}
                  onMouseLeave={scheduleClose}
                >
                  <div className="mb-4 flex items-center gap-3 border-b border-line pb-4">
                    <label className="sr-only" htmlFor="mega-search">
                      Search services
                    </label>
                    <input
                      id="mega-search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search trademark, GST, Section 8…"
                      className="field-lux"
                    />
                    <Link
                      href="/services"
                      className="shrink-0 text-sm font-semibold text-accent hover:text-seal"
                      onClick={() => setMenuOpen(false)}
                    >
                      View all
                    </Link>
                  </div>

                  {query.trim() ? (
                    <ul className="grid max-h-72 gap-1 overflow-auto sm:grid-cols-2">
                      {filtered.length === 0 && (
                        <li className="col-span-full px-2 py-6 text-sm text-ink-muted">
                          No services match “{query}”.
                        </li>
                      )}
                      {filtered.map(({ pillar, service }) => (
                        <li key={`${pillar.slug}-${service.slug}`}>
                          <Link
                            href={`/services/${pillar.slug}/${service.slug}`}
                            className="block rounded-lg px-2 py-2 text-sm hover:bg-paper-deep"
                            onClick={() => setMenuOpen(false)}
                          >
                            <span className="font-medium text-ink">
                              {service.name}
                            </span>
                            <span className="mt-0.5 block text-xs text-ink-muted">
                              {pillar.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      {pillars.slice(0, 8).map((pillar) => (
                        <div key={pillar.slug}>
                          <Link
                            href={`/services/${pillar.slug}`}
                            className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-accent"
                            onClick={() => setMenuOpen(false)}
                          >
                            {pillar.name}
                          </Link>
                          <ul className="space-y-1">
                            {pillar.services.slice(0, 4).map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${pillar.slug}/${s.slug}`}
                                  className="block text-sm text-ink-muted hover:text-ink"
                                  onClick={() => setMenuOpen(false)}
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/pricing"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-paper-deep hover:text-ink"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-paper-deep hover:text-ink"
          >
            Resources
          </Link>
          <Link
            href="/about"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-paper-deep hover:text-ink"
          >
            About Us
          </Link>
          <Link
            href="/trust"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-paper-deep hover:text-ink"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 xl:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-accent">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 13.5l4 1.5v3A2 2 0 0 1 18 20 14 14 0 0 1 4 6a2 2 0 0 1 2.5-2Z" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-ink">
                {siteConfig.contact.phone}
              </span>
              <span className="block text-[10px] text-ink-muted">
                Mon – Sat, 9 AM – 7 PM
              </span>
            </span>
          </a>
          <Link
            href="/#hero-lead"
            className="rounded-xl border border-line px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-line-strong hover:text-ink"
          >
            Login
          </Link>
          <Link
            href="/#hero-lead"
            className="inline-flex items-center gap-1.5 rounded-xl bg-seal px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-seal-deep"
          >
            Get Started
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line lg:hidden"
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
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <div className="max-h-[80vh] space-y-3 overflow-auto px-5 py-4">
              <Link href="/services" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Services
              </Link>
              <Link href="/pricing" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Pricing
              </Link>
              <Link href="/about" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                About Us
              </Link>
              <Link href="/#hero-lead" className="block rounded-xl bg-seal py-3 text-center text-sm font-semibold text-white" onClick={() => setMobileOpen(false)}>
                Get Started →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
