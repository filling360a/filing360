import type { ReactNode } from "react";
import { homePricing } from "@/content/home";

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[14.5px] leading-snug text-[#334155]">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden>
          <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {children}
    </li>
  );
}

function CardFooter({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="mt-auto rounded-xl bg-[#eff6ff] px-3.5 py-3">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#2563eb] shadow-sm">
          {icon}
        </span>
        <p className="text-[13.5px] leading-snug text-[#475569]">
          <span className="font-bold text-[#0b2c5e]">{title}</span>{" "}
          {body}
        </p>
      </div>
    </div>
  );
}

export function PricingClarity() {
  const { professional, government, upsells } = homePricing;

  return (
    <section
      className="relative overflow-hidden bg-[#f3f7fc]"
      id="pricing-clarity"
      aria-labelledby="pricing-heading"
    >
      <div
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#bfdbfe]/35 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-[#dbeafe]/45 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1100px] px-5 py-10 md:px-8 lg:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-heading"
            className="text-[24px] font-bold leading-[1.2] tracking-tight text-[#0b2c5e] md:text-[30px]"
          >
            {homePricing.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] leading-snug text-[#64748b]">
            {homePricing.subtitle}
          </p>
        </div>

        {/* Cards row */}
        <div className="rail rail-bleed mt-6 grid gap-4 [--rail-item:84%] [--rail-item-sm:46%] lg:mt-8 lg:grid-cols-[1fr_auto_1fr_1fr] lg:items-stretch">
          {/* Professional fee */}
          <article className="flex flex-col rounded-2xl border border-[#e8eef5] bg-white p-5 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.16)]">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
                  <path d="M10 12h4" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <h3 className="text-[16px] font-bold text-[#0b2c5e]">
                  {professional.title}
                </h3>
                <p className="mt-0.5 text-[13.5px] text-[#64748b]">
                  {professional.subtitle}
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2.5">
              {professional.items.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
            <div className="mt-4">
              <CardFooter
                title={professional.footerTitle}
                body={professional.footerBody}
                icon={
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <circle cx="9" cy="8" r="2.5" />
                    <circle cx="16" cy="9" r="2" />
                    <path d="M3 18c.7-2.5 2.6-4 6-4s5.3 1.5 6 4M14 14c1.8.2 3.3 1.2 4 3" />
                  </svg>
                }
              />
            </div>
          </article>

          {/* Separator */}
          <div className="hidden flex-col items-center justify-center px-1 lg:flex" aria-hidden>
            <span className="h-10 w-px bg-[#bfdbfe]" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[15px] font-bold text-[#2563eb] shadow-sm">
              +
            </span>
            <span className="h-10 w-px bg-[#bfdbfe]" />
            <p className="mt-2 max-w-[4.5rem] text-center text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#2563eb]">
              Separate and clear
            </p>
          </div>

          {/* Government fees */}
          <article className="flex flex-col rounded-2xl border border-[#e8eef5] bg-white p-5 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.16)]">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                  <path d="M4 20h16M6 20V9l6-4 6 4v11M10 13h4M10 17h4" />
                </svg>
              </span>
              <div>
                <h3 className="text-[16px] font-bold text-[#0b2c5e]">
                  {government.title}
                </h3>
                <p className="mt-0.5 text-[13.5px] text-[#64748b]">
                  {government.subtitle}
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2.5">
              {government.items.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
            <div className="mt-4">
              <CardFooter
                title={government.footerTitle}
                body={government.footerBody}
                icon={
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M7 3h8l3 3v15H7V3Z" />
                    <path d="M14 3v4h4M9 12h6M9 16h4" />
                  </svg>
                }
              />
            </div>
          </article>

          {/* No surprise upsells */}
          <article className="flex flex-col rounded-2xl border border-[#e8eef5] bg-white p-5 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.16)]">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                  <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
                  <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="text-[16px] font-bold text-[#0b2c5e]">
                  {upsells.title}
                </h3>
              </div>
            </div>
            <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-[#64748b]">
              {upsells.body}
            </p>
            <div className="mt-4">
              <CardFooter
                title={upsells.footerTitle}
                body={upsells.footerBody}
                icon={
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M4 10h16v10H4V10ZM12 10V6M8 6h8M4 14h16" />
                  </svg>
                }
              />
            </div>
          </article>
        </div>

        {/* Trust bar */}
        <ul className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-[#e8eef5] bg-white shadow-[0_8px_24px_-18px_rgba(15,23,42,0.14)]">
          {homePricing.trust.map((item, i) => (
            <li
              key={item.title}
              className={`flex flex-col items-center justify-center gap-1.5 px-2 py-3 text-center sm:flex-row sm:gap-3 sm:px-5 sm:py-4 sm:text-left ${
                i > 0 ? "border-l border-[#eef2f7]" : ""
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                {i === 0 ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
                  </svg>
                ) : null}
                {i === 1 ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M7 3h8l3 3v15H7V3Z" />
                    <path d="M14 3v4h4M9 12h6" />
                  </svg>
                ) : null}
                {i === 2 ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <circle cx="12" cy="12" r="8" />
                    <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </span>
              <div>
                <p className="text-[14.5px] font-bold text-[#0b2c5e]">{item.title}</p>
                <p className="text-[13px] text-[#64748b]">{item.sub}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-5 max-w-2xl text-center text-[13.5px] leading-relaxed text-[#64748b]">
          {homePricing.note}
        </p>
      </div>
    </section>
  );
}
