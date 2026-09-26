import Link from "next/link";
import { pillars } from "@/content/services";
import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="bg-[#071f42] text-white">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 md:grid-cols-12 md:px-8 lg:px-10">
        <div className="md:col-span-4">
          <p className="text-2xl font-bold tracking-tight">
            Filing<span className="text-[#38bdf8]">360</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
            {siteConfig.tagline} A private facilitation platform for Indian
            registrations and compliance — not a government website.
          </p>
          <a
            href="/#hero-lead"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#0b2c5e] transition hover:bg-[#eff6ff]"
          >
            {siteConfig.cta.quote}
            <span aria-hidden>→</span>
          </a>
          <p className="mt-6 text-sm text-white/55">
            <a
              className="underline-offset-4 hover:text-white hover:underline"
              href={`mailto:${siteConfig.contact.email}`}
            >
              {siteConfig.contact.email}
            </a>
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-8 md:grid-cols-4">
          {pillars.slice(0, 4).map((pillar) => (
            <div key={pillar.slug}>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#93c5fd]">
                {pillar.name}
              </p>
              <ul className="mt-3 space-y-2">
                {pillar.services.slice(0, 4).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${pillar.slug}/${s.slug}`}
                      className="text-sm text-white/65 transition hover:text-white"
                    >
                      {s.shortName ?? s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-5 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}. Registrations
            are issued solely by government authorities.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/trust" className="hover:text-white">
              Trust & disclaimer
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
