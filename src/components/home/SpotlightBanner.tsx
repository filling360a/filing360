import Image from "next/image";
import Link from "next/link";
import { homeSpotlightBanner as banner } from "@/content/home";

export function SpotlightBanner() {
  return (
    <section
      className="relative pb-10 pt-1 md:pb-14"
      aria-label={banner.title}
    >
      <div className="relative mx-auto h-[138px] w-full max-w-[1180px] px-5 sm:h-[196px] md:h-[280px] md:px-8 lg:h-[348px]">
        <article className="relative h-full overflow-hidden rounded-[22px] shadow-[0_22px_50px_-24px_rgba(15,42,69,0.45)] md:rounded-[28px]">
          <Image
            src={banner.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1180px"
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-[5%] z-10 hidden w-[32%] min-w-[13rem] max-w-[320px] flex-col justify-center md:flex lg:left-[6%]">
            <h3
              className="text-balance text-[22px] font-bold leading-[1.18] tracking-[-0.03em] lg:text-[28px]"
              style={{ color: banner.color }}
            >
              {banner.title}
            </h3>
            <p
              className="mt-1.5 max-w-[22ch] text-[13.5px] leading-snug lg:mt-2 lg:text-[15px]"
              style={{ color: banner.muted }}
            >
              {banner.line}
            </p>
            <Link
              href={banner.href}
              className="mt-3 inline-flex h-10 w-fit items-center rounded-full px-4 text-[13.5px] font-semibold text-white shadow-[0_10px_22px_-12px_rgba(15,42,69,0.55)] transition duration-200 hover:translate-y-[-1px] hover:brightness-110 hover:shadow-[0_14px_26px_-12px_rgba(15,42,69,0.5)] lg:mt-4 lg:h-11 lg:px-5 lg:text-[14.5px]"
              style={{ backgroundColor: banner.button }}
            >
              {banner.cta}
              <span aria-hidden className="ml-1.5">
                →
              </span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
