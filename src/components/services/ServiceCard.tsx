import Link from "next/link";
import {
  formatInr,
  formatPer,
  serviceHref,
  servicePriceFrom,
  type Package,
  type Pillar,
  type Service,
} from "@/content/services";

type Props = {
  pillar: Pillar;
  service: Service;
  showPillar?: boolean;
};

export function ServiceCard({ pillar, service, showPillar }: Props) {
  const from = servicePriceFrom(service);
  return (
    <Link
      href={serviceHref(pillar, service)}
      className="group flex h-full flex-col rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.25)] transition hover:border-[#bfdbfe] hover:shadow-[0_16px_32px_-18px_rgba(37,99,235,0.35)] sm:p-5"
    >
      {showPillar && (
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#2563eb]">
          {pillar.name}
        </p>
      )}
      <h3 className="mt-1 text-[16px] font-bold leading-snug text-[#0b2c5e]">
        {service.name}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[14.5px] leading-relaxed text-[#64748b]">
        {service.tagline}
      </p>
      <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#eef2f7] pt-3">
        {from !== null ? (
          <p className="text-[13.5px] text-[#64748b]">
            Starting at
            <span className="block text-[20px] font-bold leading-tight text-[#0b2c5e]">
              {formatInr(from)}
            </span>
          </p>
        ) : (
          <p className="text-[14.5px] font-semibold text-[#0b2c5e]">Price on request</p>
        )}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb] transition group-hover:bg-[#2563eb] group-hover:text-white">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function CheckList({
  items,
  className = "",
  size = "md",
}: {
  items: string[];
  className?: string;
  size?: "sm" | "md";
}) {
  const text = size === "sm" ? "text-[14.5px]" : "text-[15.5px]";
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-2.5 ${text} leading-snug text-[#334155]`}>
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden>
              <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PackageCard({
  pkg,
  index,
  ctaHref,
}: {
  pkg: Package;
  index: number;
  ctaHref: string;
}) {
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][index] ?? `${index + 1}`;
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-5 ${
        pkg.popular
          ? "border-[#2563eb] shadow-[0_20px_44px_-22px_rgba(37,99,235,0.55)]"
          : "border-[#e2e8f0] shadow-[0_10px_28px_-22px_rgba(15,23,42,0.3)]"
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-5 rounded-full bg-[#2563eb] px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-white">
          Recommended
        </span>
      )}
      <div className="flex items-center gap-2">
        <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-[#eff6ff] px-1.5 text-[13px] font-bold text-[#2563eb]">
          {roman}
        </span>
        {pkg.audience && (
          <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#64748b]">
            {pkg.audience}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-[17px] font-bold leading-snug text-[#0b2c5e]">{pkg.name}</h3>
      {pkg.description && (
        <p className="mt-2 text-[14.5px] leading-relaxed text-[#64748b]">{pkg.description}</p>
      )}

      <div className="mt-4 border-y border-[#eef2f7] py-3">
        {typeof pkg.price === "number" ? (
          <>
            {pkg.originalPrice && (
              <p className="text-[14.5px] text-[#94a3b8] line-through">
                {formatInr(pkg.originalPrice)}
              </p>
            )}
            <p className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-[28px] font-bold leading-none tracking-tight text-[#0b2c5e]">
                {formatInr(pkg.price)}
              </span>
              {pkg.per && (
                <span className="text-[14.5px] font-medium text-[#64748b]">{formatPer(pkg.per)}</span>
              )}
            </p>
          </>
        ) : (
          <p className="text-[20px] font-bold text-[#0b2c5e]">Price on request</p>
        )}
        {pkg.priceNote && (
          <p className="mt-1.5 text-[13px] font-medium text-[#64748b]">{pkg.priceNote}</p>
        )}
        {pkg.advance && (
          <p className="mt-2.5 inline-flex rounded-lg bg-[#dcfce7] px-2.5 py-1 text-[13.5px] font-semibold text-[#15803d]">
            Start with {formatInr(pkg.advance)} (50% advance)
          </p>
        )}
      </div>
      {pkg.bestFor && (
        <p className="mt-3 text-[14px] leading-snug text-[#475569]">
          <span className="font-semibold text-[#0b2c5e]">Best for: </span>
          {pkg.bestFor}
        </p>
      )}

      <p className="mt-4 text-[13.5px] font-semibold uppercase tracking-[0.06em] text-[#0b2c5e]">
        {pkg.inclusionsLabel ?? "What's included"}
      </p>
      <CheckList items={pkg.inclusions} size="sm" className="mt-3 flex-1" />

      <a
        href={ctaHref}
        className={`mt-5 inline-flex h-11 items-center justify-center gap-1.5 rounded-xl text-[15px] font-semibold transition ${
          pkg.popular
            ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
            : "border border-[#bfdbfe] text-[#1d4ed8] hover:bg-[#eff6ff]"
        }`}
      >
        {typeof pkg.price === "number" ? "Get started" : "Get a quote"}
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
