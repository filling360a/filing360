"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { pillarHref, pillars, serviceHref, type Pillar, type Service } from "@/content/services";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "./Logo";
import { ServiceIcon } from "./NavIcons";

const extraLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Articles" },
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 8"
      className={`h-[6px] w-[9px] opacity-60 transition duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function hasMenu(pillar: Pillar) {
  return pillar.services.length > 1;
}

function ServiceRow({
  pillar,
  service,
  onNavigate,
  compact = false,
}: {
  pillar: Pillar;
  service: Service;
  onNavigate: () => void;
  compact?: boolean;
}) {
  const label = service.shortName ?? service.name;
  return (
    <Link
      href={serviceHref(pillar, service)}
      onClick={onNavigate}
      className={`group flex items-center gap-3 rounded-lg text-[#0f2a45] transition hover:text-[#0e7b5b] ${
        compact ? "px-1 py-2 text-[15px] font-medium" : "px-1.5 py-2 text-[14.5px] font-medium"
      }`}
    >
      <span className="text-[#0e7b5b] transition group-hover:text-[#0b6550]">
        <ServiceIcon slug={service.slug} name={label} />
      </span>
      <span>{label}</span>
    </Link>
  );
}

export function TopBar() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <div className="h-[4px] bg-[#0e7b5b]" aria-hidden />;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [heroLight, setHeroLight] = useState(false);
  const reduce = useReducedMotion();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onHome = pathname === "/";
  const overHero = onHome && !scrolled && !mobileOpen;
  const startHref = onHome ? "#hero-lead" : "/book-consultation";
  const active = pillars.find((p) => p.slug === open);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sync = (event?: Event) => {
      const light =
        event instanceof CustomEvent
          ? Boolean(event.detail?.light)
          : document.documentElement.dataset.heroLight === "1";
      setHeroLight(light);
    };
    sync();
    window.addEventListener("hero-slide", sync);
    return () => window.removeEventListener("hero-slide", sync);
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

  function openMenu(id: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(id);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  }

  function closeAll() {
    setOpen(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  return (
    <header
      className={`z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        onHome ? "fixed inset-x-0 top-0" : "sticky top-0"
      } ${
        overHero
          ? "border-b-0 bg-transparent"
          : scrolled || (onHome && mobileOpen)
            ? "border-b border-[#d7e4de] bg-white/80 shadow-[0_8px_24px_-18px_rgba(15,42,69,0.35)] backdrop-blur-md"
            : "border-b border-[#d7e4de] bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="relative mx-auto flex h-[72px] max-w-[1320px] items-center gap-3 px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className={`flex shrink-0 items-center rounded-lg px-1.5 py-0.5 transition ${
            overHero && heroLight ? "bg-white/40" : ""
          }`}
          aria-label={`${siteConfig.brandName} home`}
        >
          <Logo priority className="h-10 w-auto" />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center xl:flex"
          aria-label="Primary"
          onMouseLeave={scheduleClose}
        >
          {pillars.map((pillar) => {
            const menu = hasMenu(pillar);
            if (!menu) {
              return (
                <Link
                  key={pillar.slug}
                  href={pillarHref(pillar)}
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-[14px] font-medium text-[#0f2a45] transition hover:text-[#0e7b5b] xl:px-3 xl:text-[14.5px]"
                >
                  {pillar.name}
                </Link>
              );
            }
            return (
              <div key={pillar.slug} className="relative" onMouseEnter={() => openMenu(pillar.slug)}>
                <Link
                  href={pillarHref(pillar)}
                  aria-expanded={open === pillar.slug}
                  aria-haspopup="true"
                  onFocus={() => openMenu(pillar.slug)}
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-[14px] font-medium transition xl:px-3 xl:text-[14.5px] ${
                    open === pillar.slug ? "text-[#0e7b5b]" : "text-[#0f2a45] hover:text-[#0e7b5b]"
                  }`}
                >
                  {pillar.name}
                  <Chevron open={open === pillar.slug} />
                </Link>
              </div>
            );
          })}
          {extraLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-lg px-2.5 py-2 text-[14px] font-medium text-[#0f2a45] transition hover:text-[#0e7b5b] xl:px-3 xl:text-[14.5px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {active && hasMenu(active) && (
          <div
            role="region"
            aria-label={`${active.name} services`}
            className="absolute left-1/2 top-full z-50 hidden w-[min(92vw,680px)] -translate-x-1/2 pt-2 xl:block"
            onMouseEnter={() => openMenu(active.slug)}
            onMouseLeave={scheduleClose}
          >
            <div className="overflow-hidden rounded-2xl border border-[#d7e4de] bg-white shadow-[0_18px_50px_-18px_rgba(15,42,69,0.28)]">
              <div className="px-6 pb-5 pt-5">
                <div
                  className={`grid gap-x-10 gap-y-6 ${
                    active.groups.length > 1 || active.services.length > 6 ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {active.groups.length > 1 ? (
                    active.groups.map((group) => (
                      <div key={group.name ?? active.slug}>
                        {group.name ? (
                          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8a9ba6]">
                            {group.name}
                          </p>
                        ) : null}
                        <ul>
                          {group.services.map((service) => (
                            <li key={service.slug}>
                              <ServiceRow pillar={active} service={service} onNavigate={closeAll} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <ul className={active.services.length > 6 ? "col-span-2 grid grid-cols-2 gap-x-10" : ""}>
                      {active.services.map((service) => (
                        <li key={service.slug}>
                          <ServiceRow pillar={active} service={service} onNavigate={closeAll} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-4 border-t border-[#d7e4de] pt-3">
                  <Link
                    href={pillarHref(active)}
                    onClick={closeAll}
                    className="text-[14px] font-semibold text-[#0e7b5b] transition hover:text-[#0b6550]"
                  >
                    View all {active.name} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <Link
            href={startHref}
            className="hidden h-10 items-center rounded-full bg-[#0f2a45] px-5 text-[14.5px] font-semibold text-white transition hover:bg-[#0a2036] xl:inline-flex"
          >
            Get Started
            <span aria-hidden className="ml-1">
              →
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#d7e4de] xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span aria-hidden className="flex w-4 flex-col gap-1">
              <span className={`block h-0.5 bg-ink transition ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-0.5 bg-ink transition ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-ink transition ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[#d7e4de] bg-white xl:hidden"
          >
            <div className="max-h-[80vh] overflow-auto px-5 py-2">
              <ul>
                {pillars.map((pillar) => (
                  <li key={pillar.slug} className="border-b border-[#d7e4de]">
                    {hasMenu(pillar) ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-3.5 text-left text-[16px] font-medium text-ink"
                          aria-expanded={mobileSection === pillar.slug}
                          onClick={() => setMobileSection((v) => (v === pillar.slug ? null : pillar.slug))}
                        >
                          {pillar.name}
                          <Chevron open={mobileSection === pillar.slug} />
                        </button>
                        {mobileSection === pillar.slug && (
                          <div className="pb-3">
                            {pillar.groups.map((group) => (
                              <div key={group.name ?? pillar.slug} className="mb-1">
                                {group.name && (
                                  <p className="px-1 pb-1 pt-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8a9ba6]">
                                    {group.name}
                                  </p>
                                )}
                                <ul>
                                  {group.services.map((service) => (
                                    <li key={service.slug}>
                                      <ServiceRow
                                        pillar={pillar}
                                        service={service}
                                        onNavigate={closeAll}
                                        compact
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            <Link
                              href={pillarHref(pillar)}
                              className="mt-1 block px-1 py-2 text-[14px] font-semibold text-[#0e7b5b]"
                              onClick={closeAll}
                            >
                              View all {pillar.name} →
                            </Link>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={pillarHref(pillar)}
                        className="block py-3.5 text-[16px] font-medium text-ink"
                        onClick={closeAll}
                      >
                        {pillar.name}
                      </Link>
                    )}
                  </li>
                ))}
                {extraLinks.map((link) => (
                  <li key={link.href} className="border-b border-[#d7e4de]">
                    <Link
                      href={link.href}
                      className="block py-3.5 text-[16px] font-medium text-ink"
                      onClick={closeAll}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={startHref}
                className="my-3 flex h-11 items-center justify-center rounded-full bg-[#0f2a45] text-[15px] font-semibold text-white"
                onClick={closeAll}
              >
                Get Started →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
