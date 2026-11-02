"use client";

import Link from "next/link";

type Props = {
  title: string;
  line: string;
  href: string;
  cta: string;
  color: string;
  muted: string;
  button: string;
  side: "left" | "right";
};

export function BannerCopy({ title, line, href, cta, color, muted, button, side }: Props) {
  const sideClass =
    side === "right"
      ? "md:right-[3.5%] md:left-auto lg:right-[5%]"
      : "md:left-[5%] md:right-auto lg:left-[6%]";

  return (
    <div
      className={`absolute inset-x-0 bottom-0 z-10 flex items-end bg-gradient-to-t from-white via-white/90 to-transparent px-3.5 pb-2.5 pt-8 sm:px-5 sm:pb-3.5 sm:pt-10 md:inset-y-0 md:w-[36%] md:min-w-[13rem] md:max-w-[340px] md:items-center md:bg-none md:px-0 md:pb-0 md:pt-0 ${sideClass}`}
    >
      <div className="flex w-full items-center justify-between gap-3 md:flex-col md:items-start md:justify-center md:gap-0">
        <div className="min-w-0">
          <h3
            className="text-[15.5px] font-bold leading-tight tracking-[-0.03em] sm:text-[18px] md:text-balance md:text-[22px] md:leading-[1.18] lg:text-[28px]"
            style={{ color }}
          >
            {title}
          </h3>
          <p
            className="mt-0.5 hidden text-[12px] leading-snug sm:block sm:text-[13.5px] md:mt-1.5 md:max-w-[22ch] md:text-[14.5px] lg:mt-2 lg:text-[15px]"
            style={{ color: muted }}
          >
            {line}
          </p>
        </div>
        <Link
          href={href}
          className="inline-flex h-9 shrink-0 items-center rounded-full px-3.5 text-[13px] font-semibold text-white shadow-[0_10px_22px_-12px_rgba(15,42,69,0.55)] transition duration-200 hover:translate-y-[-1px] hover:brightness-110 hover:shadow-[0_14px_26px_-12px_rgba(15,42,69,0.5)] sm:h-10 sm:px-4 sm:text-[14px] md:mt-3 md:h-11 md:px-5 md:text-[14.5px] lg:mt-4"
          style={{ backgroundColor: button }}
          onClick={(event) => event.stopPropagation()}
        >
          {cta}
          <span aria-hidden className="ml-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
