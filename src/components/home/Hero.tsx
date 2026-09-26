import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/leads/LeadForm";
import { siteConfig } from "@/lib/siteConfig";

const benefits = [
  {
    label: "Fast & Hassle-Free Process",
    color: "text-orange-500 bg-orange-50/90",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
        <path d="M13 2 4 14h7l-1 8 10-14h-7l1-6Z" />
      </svg>
    ),
  },
  {
    label: "Expert Support at Every Step",
    color: "text-emerald-600 bg-emerald-50/90",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Transparent Pricing",
    color: "text-blue-600 bg-blue-50/90",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M8 3h8a2 2 0 0 1 2 2v15l-6-2.5L6 20V5a2 2 0 0 1 2-2Z" />
      </svg>
    ),
  },
  {
    label: "Trusted by 50,000+ Businesses",
    color: "text-emerald-600 bg-emerald-50/90",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="9" cy="8" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3 19c.8-3 3-5 6-5s5.2 2 6 5" />
        <path d="M14 14c2.2.2 4 1.6 5 4" />
      </svg>
    ),
  },
];

const quickLinks = [
  {
    label: "Company Registration",
    href: "/services/business-registration",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M4 20h16M6 20V8l6-4 6 4v12M10 12h4M10 16h4" />
      </svg>
    ),
  },
  {
    label: "GST Filing",
    href: "/services/tax-gst",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M7 3h7l3 3v15H7V3Z" />
        <path d="M14 3v4h4M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    label: "Trademark Registration",
    href: "/services/intellectual-property",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <circle cx="12" cy="12" r="8" />
        <path d="M9 15V9h3.2a2 2 0 0 1 0 4H9" />
      </svg>
    ),
  },
  {
    label: "Annual Compliance",
    href: "/services/mca-secretarial",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M9 11.5 11 13.5 15.5 9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    ),
  },
];

const trustStats = [
  { value: "50,000+", label: "Businesses Trust Us" },
  { value: "99%", label: "Success Rate" },
  { value: "4.8/5", label: "Customer Rating" },
  { value: "10+", label: "Years of Experience" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Full hero background */}
      <div className="absolute inset-0">
        <Image
          src="/images/image.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Soft left veil only — keep the building clearly visible */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/25 to-transparent md:from-white/60 md:via-white/15 md:to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1320px] px-5 pt-10 pb-10 md:px-6 lg:px-8 lg:pt-12 lg:pb-12">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* LEFT copy */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f8ef]/95 px-3.5 py-1.5 text-[12px] font-semibold text-[#1a7a45] shadow-sm backdrop-blur-sm">
              <span className="flex -space-x-1.5" aria-hidden>
                <span className="h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-[#e8f8ef]" />
                <span className="h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-[#e8f8ef]" />
                <span className="h-4 w-4 rounded-full bg-emerald-600 ring-2 ring-[#e8f8ef]" />
              </span>
              Trusted by 50,000+ Indian Businesses
            </div>

            <h1 className="mt-5 max-w-[440px] text-[34px] font-bold leading-[1.18] tracking-[-0.02em] text-[#0b1f3a] sm:text-[40px] lg:text-[44px]">
              Turn Your Business{" "}
              <span className="bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] bg-clip-text text-transparent">
                Idea into Reality
              </span>
              .
            </h1>

            <p className="mt-4 max-w-[400px] text-[15px] leading-[1.65] text-[#334155]">
              Company registration, GST, compliance and more — all in one place.
              Fast, transparent and hassle-free, so you can focus on growing your
              business.
            </p>

            <ul className="mt-6 grid max-w-[440px] grid-cols-2 gap-x-4 gap-y-4">
              {benefits.map((b) => (
                <li key={b.label} className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg backdrop-blur-sm ${b.color}`}
                  >
                    {b.icon}
                  </span>
                  <span className="pt-1 text-[12.5px] font-medium leading-snug text-[#1e293b]">
                    {b.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#hero-lead"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0b2c5e] px-6 text-[14px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(11,44,94,0.55)] transition hover:bg-[#071f42]"
              >
                Register Your Business
                <span aria-hidden className="text-base">
                  →
                </span>
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/80 px-5 text-[14px] font-semibold text-[#0b2c5e] shadow-sm backdrop-blur-sm transition hover:bg-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 13.5l4 1.5v3A2 2 0 0 1 18 20 14 14 0 0 1 4 6a2 2 0 0 1 2.5-2Z" strokeLinejoin="round" />
                </svg>
                Talk to an Expert
              </a>
            </div>

            <div className="mt-8 flex max-w-[480px] gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible">
              {quickLinks.map((q) => (
                <Link
                  key={q.label}
                  href={q.href}
                  className="flex min-w-[108px] flex-1 flex-col items-center gap-2 rounded-2xl border border-white/60 bg-white/75 px-2.5 py-3.5 text-center shadow-sm backdrop-blur-sm transition hover:bg-white/95"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                    {q.icon}
                  </span>
                  <span className="text-[11px] font-semibold leading-tight text-[#0f172a]">
                    {q.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Middle spacer — building shows through the bg */}
          <div className="hidden lg:col-span-3 xl:col-span-3 lg:block" aria-hidden />

          {/* RIGHT form — wider + pushed right */}
          <div className="lg:col-span-4 xl:col-span-4 lg:justify-self-end">
            <div className="ml-auto w-full max-w-[460px] lg:mr-0 xl:-mr-2">
              <LeadForm id="hero-lead" variant="glass" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative z-[1] border-t border-white/50 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-5 px-5 py-5 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <ul className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {trustStats.map((s) => (
              <li key={s.label} className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[13px] font-bold text-[#0b1f3a]">{s.value}</p>
                  <p className="text-[11px] text-[#64748b]">{s.label}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4 border-t border-[#e2e8f0] pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#94a3b8]">
              Backed by Leading Investors
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[12px] font-bold tracking-wide text-[#64748b]">
              <span>ACCEL</span>
              <span>SEQUOIA</span>
              <span>TIGER GLOBAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
