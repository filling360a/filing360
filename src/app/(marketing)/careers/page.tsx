import type { Metadata } from "next";
import { JobBoard } from "@/components/careers/JobBoard";
import { careersContent } from "@/content/careers";
import { listOpenJobs } from "@/lib/careers/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Careers — Jobs at Filing360",
  description: careersContent.intro,
  alternates: { canonical: "/careers" },
  openGraph: { title: careersContent.title, description: careersContent.intro, url: "/careers" },
};

export default async function CareersPage() {
  const jobs = await listOpenJobs();

  return (
    <div className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-gradient-to-br from-[#eff6ff] via-white to-[#f0f9ff]">
        <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-16">
          <p className="text-[13.5px] font-bold uppercase tracking-[0.12em] text-[#2563eb]">Careers</p>
          <h1 className="mt-2 max-w-3xl text-[30px] font-bold leading-tight tracking-tight text-[#0b2c5e] md:text-[44px]">
            {careersContent.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#475569] md:text-[17px]">{careersContent.intro}</p>
          <a
            href="#open-roles"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[#0b2c5e] px-5 text-[15px] font-semibold text-white hover:bg-[#123a74]"
          >
            {jobs.length > 0 ? `See ${jobs.length} open role${jobs.length === 1 ? "" : "s"}` : "Open roles"} <span aria-hidden>↓</span>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">
        <h2 className="text-[22px] font-bold tracking-tight text-[#0b2c5e] md:text-[28px]">Why work with us</h2>
        <div className="rail rail-bleed mt-5 lg:grid lg:grid-cols-4 lg:gap-4">
          {careersContent.perks.map((perk) => (
            <div key={perk.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
              <p className="text-[16.5px] font-bold text-[#0b2c5e]">{perk.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-[#475569]">{perk.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="open-roles" className="scroll-mt-24 mx-auto max-w-[1100px] px-5 pb-12 md:px-8 md:pb-16">
        <h2 className="mb-5 text-[22px] font-bold tracking-tight text-[#0b2c5e] md:text-[28px]">Open roles</h2>
        <JobBoard jobs={jobs} />
      </section>

      <section className="border-t border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">
          <h2 className="text-[22px] font-bold tracking-tight text-[#0b2c5e] md:text-[28px]">How hiring works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {careersContent.process.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-[14.5px] font-bold text-white">{i + 1}</span>
                <p className="mt-3 text-[16.5px] font-bold text-[#0b2c5e]">{step.title}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[#475569]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
