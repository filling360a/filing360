import Image from "next/image";
import { homeSpotlightBanner as banner } from "@/content/home";
import { BannerCopy } from "./BannerCopy";

export function SpotlightBanner() {
  return (
    <section className="relative pb-7 pt-1 md:pb-10" aria-label={banner.title}>
      <div className="relative mx-auto h-[200px] w-full max-w-[1180px] px-5 sm:h-[230px] md:h-[260px] md:px-8 lg:h-[320px] xl:h-[348px]">
        <article className="relative h-full overflow-hidden rounded-[18px] shadow-[0_22px_50px_-24px_rgba(15,42,69,0.45)] md:rounded-[28px]">
          <Image
            src={banner.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1180px"
            className="object-cover object-center"
          />
          <BannerCopy
            title={banner.title}
            line={banner.line}
            href={banner.href}
            cta={banner.cta}
            color={banner.color}
            muted={banner.muted}
            button={banner.button}
            side="left"
          />
        </article>
      </div>
    </section>
  );
}
