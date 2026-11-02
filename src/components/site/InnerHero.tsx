import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { BannerArt } from "@/content/pageBanners";

type Crumb = { name: string; href?: string };

type Mark = {
  label: string;
  well?: string;
  icon: ReactNode;
};

export function InnerHero({
  title,
  accent,
  body,
  crumbs,
  art,
  marks,
  form,
  actions,
  imageAlt = "",
}: {
  title: ReactNode;
  accent?: string;
  body?: ReactNode;
  crumbs?: Crumb[];
  art: BannerArt;
  marks?: Mark[];
  form?: ReactNode;
  actions?: ReactNode;
  imageAlt?: string;
}) {
  const tall = Boolean(form);
  const height = tall ? "lg:min-h-[620px]" : "lg:min-h-[400px]";

  return (
    <section className="relative overflow-hidden bg-[#f3f7fa]">
      <div className={`relative ${height}`}>
        <div className="relative h-[220px] overflow-hidden sm:h-[268px] md:h-[320px] lg:absolute lg:inset-0 lg:h-auto">
          <Image
            src={art.src}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${art.object}`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f3f7fa] lg:hidden"
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 hidden w-[50%] lg:block ${
              art.align === "left"
                ? "left-0 bg-gradient-to-r from-[#f3f7fa]/70 via-[#f3f7fa]/18 to-transparent"
                : "right-0 bg-gradient-to-l from-[#f3f7fa]/65 via-[#f3f7fa]/16 to-transparent"
            }`}
          />
        </div>

        <div className={`relative z-[1] mx-auto flex max-w-[1320px] px-5 pb-5 pt-4 md:px-6 md:pb-8 md:pt-5 lg:items-center lg:px-8 lg:py-12 ${height}`}>
          <div
            className={`flex w-full max-w-[40rem] flex-col lg:w-[min(40rem,100%)] ${
              art.align === "right" ? "lg:ml-auto" : "lg:mr-auto"
            }`}
          >
            {crumbs && crumbs.length > 0 ? (
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13.5px] text-[#5b6e7a]">
                {crumbs.map((crumb, i) => (
                  <span key={`${crumb.name}-${i}`} className="flex items-center gap-1.5">
                    {i > 0 ? <span aria-hidden>/</span> : null}
                    {crumb.href && i < crumbs.length - 1 ? (
                      <Link href={crumb.href} className="hover:text-[#0f2a45]">
                        {crumb.name}
                      </Link>
                    ) : (
                      <span className={i === crumbs.length - 1 ? "text-[#0f2a45]" : undefined}>{crumb.name}</span>
                    )}
                  </span>
                ))}
              </nav>
            ) : null}

            <h1 className="mt-3 max-w-[22ch] text-[28px] font-bold leading-[1.14] tracking-[-0.03em] text-[#0f2a45] sm:text-[36px] md:mt-4 md:text-[42px] lg:text-[48px]">
              {title}
              {accent ? (
                <>
                  {title ? " " : null}
                  <Accent text={accent} />
                </>
              ) : null}
            </h1>

            {body ? (
              <div className="mt-2.5 max-w-[46ch] text-[15.5px] leading-[1.5] text-[#2c3f4e] sm:mt-3 sm:text-[16px] lg:text-[17.5px]">
                {body}
              </div>
            ) : null}

            {marks && marks.length > 0 ? (
              <ul className="mt-4 grid grid-cols-2 gap-y-3 sm:mt-5 sm:grid-cols-4 sm:gap-y-0">
                {marks.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-2.5 border-[#d7e4de] px-1 sm:flex-col sm:items-center sm:gap-1.5 sm:border-r sm:text-center sm:last:border-r-0"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${
                        item.well ?? "bg-[#e3f2ed] text-[#0e7b5b]"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-[13.5px] font-semibold leading-tight text-[#0f2a45] sm:max-w-[11ch] sm:text-[12px] md:max-w-none md:text-[12.5px]">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            {actions ? <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-5">{actions}</div> : null}

            {form ? <div className="mt-5 w-full md:mt-7">{form}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Accent({ text }: { text: string }) {
  const period = text.endsWith(".");
  const body = period ? text.slice(0, -1) : text;
  const words = body.split(" ");
  const last = words.pop() ?? "";
  const lead = words.join(" ");
  return (
    <span className="text-[#0e7b5b]">
      {lead ? `${lead} ` : null}
      <span className="relative inline-block whitespace-nowrap">
        {last}
        <svg viewBox="0 0 88 8" className="absolute -bottom-[0.12em] left-0 w-full" fill="none" aria-hidden>
          <path
            d="M2 6c18-3.2 48-4.4 84-.6"
            stroke="#8ecfbc"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {period ? "." : null}
    </span>
  );
}

export const bannerMarks = {
  rupee: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M7 6h10M7 10h10M7 6c4 0 6 2 6 4s-2 4-6 4H7l8 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 1.5" strokeLinecap="round" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M20 6.5 9.5 17 4 11.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 3.5 5.5 6.2v5.3c0 4.1 2.7 7.4 6.5 8.8 3.8-1.4 6.5-4.7 6.5-8.8V6.2L12 3.5Z" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M4 20h16M6 20V8l6-4 6 4v12M10 11h4M10 15h4" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M7 3.5h7l4.5 4.5V20A1.5 1.5 0 0 1 17 21.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.5V9h5.5M8.5 13h7M8.5 16.5h5" strokeLinecap="round" />
    </svg>
  ),
};
