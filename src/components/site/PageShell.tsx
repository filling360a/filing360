import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/blog/JsonLd";
import { InnerHero } from "@/components/site/InnerHero";
import { bannerForPath, splitHeading } from "@/content/pageBanners";
import { whatsappLink } from "@/content/company";
import { breadcrumbJsonLd, faqJsonLd, type Crumb } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const container = "mx-auto max-w-[1100px] px-5 md:px-8";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <nav aria-label="Breadcrumb" className="text-[13.5px] text-[#5b6e7a]">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-[#2c3f4e]">{c.name}</span>
              ) : (
                <Link href={c.path} className="hover:text-[#0e7b5b]">{c.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function PageHero({
  title,
  intro,
  crumbs,
  children,
  aside,
  imageKey,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
  imageKey?: string;
}) {
  const path = imageKey ?? crumbs?.at(-1)?.path ?? (typeof title === "string" ? title : "/");
  const heading = typeof title === "string" ? splitHeading(title) : null;
  return (
    <>
      {crumbs ? <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...crumbs])} /> : null}
      <InnerHero
        art={bannerForPath(path)}
        title={heading ? heading.title : title}
        accent={heading?.accent}
        body={intro}
        crumbs={
          crumbs
            ? [{ name: "Home", href: "/" }, ...crumbs.map((c) => ({ name: c.name, href: c.path }))]
            : undefined
        }
        form={aside}
        actions={children}
      />
    </>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:/.test(href);
  const cls =
    "inline-flex h-11 items-center gap-2 rounded-xl bg-[#0e7b5b] px-5 text-[15px] font-semibold text-white transition hover:bg-[#0b6550]";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const cls =
    "inline-flex h-11 items-center gap-2 rounded-xl border border-[#bfd4cb] bg-white px-5 text-[15px] font-semibold text-[#0f2a45] transition hover:border-[#0e7b5b] hover:text-[#0e7b5b]";
  return external ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export function SectionHeading({ title, intro, id }: { title: string; intro?: string; id?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="scroll-mt-24 text-[22px] font-bold tracking-tight text-[#0f2a45] md:text-[28px]">{title}</h2>
      {intro && <p className="mt-2 text-[16px] leading-relaxed text-[#4a5d68]">{intro}</p>}
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
    <section className="bg-[#0f2a45]">
      <div className={`${container} flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12`}>
        <div className="max-w-2xl">
          <h2 className="text-[24px] font-bold tracking-tight text-white md:text-[30px]">{title}</h2>
          <p className="mt-2 text-[16px] leading-relaxed text-white/75">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/book-consultation"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-[15px] font-semibold text-[#0f2a45] transition hover:bg-[#e3f2ed]"
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
            href={`tel:${siteConfig.contact.phoneTel}`}
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
      <div className="divide-y divide-[#d7e4de] overflow-hidden rounded-2xl border border-[#d7e4de] bg-white">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-[16px] font-semibold text-[#0f2a45] marker:hidden hover:bg-[#f3f7fa] [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <span className="mt-0.5 shrink-0 text-[#0e7b5b] transition group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="px-5 pb-5 text-[15.5px] leading-relaxed text-[#4a5d68]">{f.a}</p>
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
            className="group flex h-full flex-col rounded-2xl border border-[#d7e4de] bg-white p-5 transition hover:border-[#8ecfbc] hover:shadow-[0_12px_30px_-18px_rgba(14,123,91,0.45)]"
          >
            {item.meta && <span className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[#0e7b5b]">{item.meta}</span>}
            <span className="mt-1 text-[17px] font-bold text-[#0f2a45] group-hover:text-[#0e7b5b]">{item.title}</span>
            {item.body && <span className="mt-2 text-[15px] leading-relaxed text-[#4a5d68]">{item.body}</span>}
            <span className="mt-auto pt-3 text-[14px] font-semibold text-[#0e7b5b]">Read more →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
