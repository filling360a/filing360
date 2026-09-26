import Image from "next/image";
import Link from "next/link";
import { homePaths } from "@/content/home";
import { HandNote } from "@/components/ui/HandNote";

export function PathPicker() {
  return (
    <section
      className="relative overflow-hidden bg-[#f5f8fc]"
      id="start-here"
      aria-labelledby="paths-heading"
    >
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#bfdbfe]/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-[#dbeafe]/50 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1120px] px-5 py-12 md:px-8 lg:py-14">
        <HandNote
          text={"Your business\njourney,\nsimplified"}
          className="left-4 top-8 xl:left-2"
          rotate={-8}
          arrow="se"
          delayMs={200}
        />
        <HandNote
          text={"Expert support\nfor every step"}
          className="right-4 top-8 text-right xl:right-2"
          rotate={6}
          arrow="sw"
          delayMs={500}
        />

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="paths-heading"
            className="text-[24px] font-bold leading-[1.2] tracking-tight text-[#0b2c5e] md:text-[30px]"
          >
            {homePaths.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[14px] leading-snug text-[#64748b]">
            {homePaths.subtitle}
          </p>
        </div>

        {/* Cards */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homePaths.items.map((path, i) => (
            <li key={path.id} className="flex">
              <article className="group flex h-full w-full flex-col rounded-2xl border border-[#e8eef5] bg-white p-5 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.2)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.28)]">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#eff6ff] text-[11px] font-bold text-[#2563eb]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="mt-3 flex justify-center">
                  <Image
                    src={path.icon}
                    alt=""
                    width={140}
                    height={120}
                    className="h-[100px] w-auto object-contain"
                  />
                </div>

                <h3 className="mt-3 text-center text-[15px] font-bold leading-snug text-[#0b2c5e]">
                  {path.label}
                </h3>
                <p className="mt-1.5 flex-1 text-center text-[12px] leading-snug text-[#64748b]">
                  {path.description}
                </p>

                <div className="mt-4 flex flex-col items-center gap-2">
                  <a
                    href="#hero-lead"
                    className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-[#2563eb] text-[13px] font-semibold text-white transition hover:bg-[#1d4ed8]"
                  >
                    Free consultation
                    <span aria-hidden>→</span>
                  </a>
                  <Link
                    href={path.href}
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#2563eb] transition hover:text-[#0b2c5e]"
                  >
                    Browse services
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
