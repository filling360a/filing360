import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/blog/JsonLd";
import { HeroAssurance } from "@/components/site/HeroAssurance";
import { whatsappLink } from "@/content/company";
import { breadcrumbJsonLd, faqJsonLd, type Crumb } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const container = "mx-auto max-w-[1100px] px-5 md:px-8";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <nav aria-label="Breadcrumb" className="text-[13.5px] text-[#64748b]">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-[#334155]">{c.name}</span>
              ) : (
                <Link href={c.path} className="hover:text-[#2563eb]">{c.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-[#e2e8f0] bg-gradient-to-br from-[#eff6ff] via-white to-[#f0f9ff]">
      <div className={`${container} py-8 md:py-14`}>
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        <div className={`${crumbs ? "mt-5" : ""} ${aside ? "grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start" : ""}`}>
          <div>
            {eyebrow && <p className="text-[13.5px] font-bold uppercase tracking-[0.12em] text-[#2563eb]">{eyebrow}</p>}
            <h1 className="mt-2 max-w-3xl text-balance text-[30px] font-bold leading-tight tracking-tight text-[#0b2c5e] md:text-[42px]">{title}</h1>
            {intro && <div className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#475569] md:text-[17px]">{intro}</div>}
            {children && <div className="mt-6 flex flex-wrap items-center gap-3">{children}</div>}
            {aside && <HeroAssurance className="mt-8 hidden lg:block" />}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:/.test(href);
  const cls =
    "inline-flex h-11 items-center gap-2 rounded-xl bg-[#0b2c5e] px-5 text-[15px] font-semibold text-white transition hover:bg-[#123a74]";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const cls =
    "inline-flex h-11 items-center gap-2 rounded-xl border border-[#cbd5e1] bg-white px-5 text-[15px] font-semibold text-[#0b2c5e] transition hover:border-[#2563eb] hover:text-[#2563eb]";
  return external ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export function SectionHeading({ title, intro, id }: { title: string; intro?: string; id?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="scroll-mt-24 text-[22px] font-bold tracking-tight text-[#0b2c5e] md:text-[28px]">{title}</h2>
      {intro && <p className="mt-2 text-[16px] leading-relaxed text-[#475569]">{intro}</p>}
    </div>
  );
}

export function CtaBand({
  title = "Not sure where to start?",
  body = "Talk to a qualified expert for free. We'll tell you exactly what you need, what it costs and how long it takes — before you pay anything.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-[#0b2c5e]">
      <div className={`${container} flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12`}>
        <div className="max-w-2xl">
          <h2 className="text-[24px] font-bold tracking-tight text-white md:text-[30px]">{title}</h2>
          <p className="mt-2 text-[16px] leading-relaxed text-white/75">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/book-consultation"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-[15px] font-semibold text-[#0b2c5e] transition hover:bg-[#eff6ff]"
          >
            Book a free consultation <span aria-hidden>→</span>
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/30 px-5 text-[15px] font-semibold text-white transition hover:bg-white/10"
          >
            WhatsApp us
          </a>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/30 px-5 text-[15px] font-semibold text-white transition hover:bg-white/10"
          >
            Call {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items, withSchema = true }: { items: { q: string; a: string }[]; withSchema?: boolean }) {
  return (
    <>
      {withSchema && <JsonLd data={faqJsonLd(items)} />}
      <div className="divide-y divide-[#e2e8f0] overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-[16px] font-semibold text-[#0b2c5e] marker:hidden hover:bg-[#f8fafc] [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <span className="mt-0.5 shrink-0 text-[#2563eb] transition group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="px-5 pb-5 text-[15.5px] leading-relaxed text-[#475569]">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}

export function LinkCards({ items }: { items: { href: string; title: string; body?: string; meta?: string }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex h-full flex-col rounded-2xl border border-[#e2e8f0] bg-white p-5 transition hover:border-[#93c5fd] hover:shadow-[0_12px_30px_-18px_rgba(37,99,235,0.45)]"
          >
            {item.meta && <span className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[#2563eb]">{item.meta}</span>}
            <span className="mt-1 text-[17px] font-bold text-[#0b2c5e] group-hover:text-[#2563eb]">{item.title}</span>
            {item.body && <span className="mt-2 text-[15px] leading-relaxed text-[#475569]">{item.body}</span>}
            <span className="mt-auto pt-3 text-[14px] font-semibold text-[#2563eb]">Read more →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
