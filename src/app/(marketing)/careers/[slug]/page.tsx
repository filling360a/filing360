import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/blog/JsonLd";
import { ApplyForm } from "@/components/careers/ApplyForm";
import {
  EMPLOYMENT_TYPES,
  formatExperience,
  formatSalary,
  isAcceptingApplications,
  parseQuestions,
  WORKPLACE_TYPES,
} from "@/lib/careers/constants";
import { getJobBySlug, listOpenJobs } from "@/lib/careers/queries";
import { env } from "@/lib/env";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/siteConfig";

export const revalidate = 300;

export async function generateStaticParams() {
  const jobs = await listOpenJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const job = await getJobBySlug((await params).slug);
  if (!job) return {};
  const open = isAcceptingApplications(job);
  const title = `${job.title} — ${job.location} | Careers`;
  const description =
    job.summary ?? `${job.title} (${EMPLOYMENT_TYPES[job.employment_type].label}, ${WORKPLACE_TYPES[job.workplace_type]}) at ${siteConfig.brandName}.`;
  return {
    title,
    description,
    alternates: { canonical: `/careers/${job.slug}` },
    robots: open ? undefined : { index: false, follow: true },
    openGraph: { title, description, url: `/careers/${job.slug}`, type: "website" },
  };
}

function List({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-8">
      <h2 className="text-[20px] font-bold tracking-tight text-[#0f2a45]">{title}</h2>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-[#2c3f4e]">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0e7b5b]" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function JobPage({ params }: PageProps<"/careers/[slug]">) {
  const job = await getJobBySlug((await params).slug);
  if (!job) notFound();

  const open = isAcceptingApplications(job);
  const salary = job.show_salary ? formatSalary(job.salary_min, job.salary_max) : null;
  const url = `${env.siteUrl}/careers/${job.slug}`;
  const facts: [string, string][] = [
    ["Location", job.location],
    ["Workplace", WORKPLACE_TYPES[job.workplace_type]],
    ["Job type", EMPLOYMENT_TYPES[job.employment_type].label],
    ["Experience", formatExperience(job.experience_min, job.experience_max)],
    ...(salary ? ([["Salary", salary]] as [string, string][]) : []),
    ...(job.openings > 1 ? ([["Openings", String(job.openings)]] as [string, string][]) : []),
    ...(job.closes_at ? ([["Apply by", formatDate(job.closes_at)]] as [string, string][]) : []),
  ];

  const descriptionHtml = [
    job.summary ? `<p>${job.summary.replace(/</g, "&lt;")}</p>` : "",
    job.description_html,
    ...(
      [
        ["Responsibilities", job.responsibilities],
        ["Requirements", job.requirements],
        ["Nice to have", job.nice_to_have],
        ["Benefits", job.benefits],
      ] as const
    )
      .filter(([, items]) => items.length)
      .map(([h, items]) => `<h3>${h}</h3><ul>${items.map((i) => `<li>${i.replace(/</g, "&lt;")}</li>`).join("")}</ul>`),
  ].join("");

  const structuredData = open
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: descriptionHtml,
        datePosted: job.published_at,
        validThrough: job.closes_at ?? undefined,
        employmentType: EMPLOYMENT_TYPES[job.employment_type].schema,
        hiringOrganization: { "@type": "Organization", name: siteConfig.brandName, sameAs: env.siteUrl },
        identifier: { "@type": "PropertyValue", name: siteConfig.brandName, value: job.id },
        directApply: true,
        url,
        ...(job.workplace_type === "remote"
          ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "India" } }
          : {
              jobLocation: {
                "@type": "Place",
                address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "IN" },
              },
            }),
        ...(job.experience_min > 0
          ? { experienceRequirements: { "@type": "OccupationalExperienceRequirements", monthsOfExperience: job.experience_min * 12 } }
          : {}),
        ...(job.show_salary && (job.salary_min || job.salary_max)
          ? {
              baseSalary: {
                "@type": "MonetaryAmount",
                currency: "INR",
                value: {
                  "@type": "QuantitativeValue",
                  minValue: job.salary_min ?? undefined,
                  maxValue: job.salary_max ?? undefined,
                  unitText: "YEAR",
                },
              },
            }
          : {}),
        ...(job.skills.length ? { skills: job.skills.join(", ") } : {}),
      }
    : null;

  return (
    <div className="bg-white">
      {structuredData && <JsonLd data={structuredData} />}
      <header className="border-b border-[#d7e4de] bg-gradient-to-br from-[#e3f2ed] via-white to-[#f3f7fa]">
        <div className="mx-auto max-w-[1100px] px-5 py-8 md:px-8 md:py-12">
          <nav className="text-[14.5px] text-[#5b6e7a]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0e7b5b]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/careers" className="hover:text-[#0e7b5b]">Careers</Link>
          </nav>
          <p className="mt-4 text-[13.5px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">{job.department}</p>
          <h1 className="mt-1.5 text-[28px] font-bold leading-tight tracking-tight text-[#0f2a45] md:text-[40px]">{job.title}</h1>
          <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[15.5px] text-[#4a5d68]">
            {[job.location, WORKPLACE_TYPES[job.workplace_type], EMPLOYMENT_TYPES[job.employment_type].label].map((m, i) => (
              <span key={m} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-[#bfd4cb]">•</span>}
                {m}
              </span>
            ))}
          </p>
          {open ? (
            <a href="#apply" className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[#0f2a45] px-5 text-[15px] font-semibold text-white hover:bg-[#173a58]">
              Apply now <span aria-hidden>↓</span>
            </a>
          ) : (
            <p className="mt-6 inline-flex rounded-xl bg-[#fef3c7] px-4 py-2.5 text-[15px] font-semibold text-[#92400e]">
              This position is no longer accepting applications.
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-5 py-8 md:px-8 md:py-12 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <div className="min-w-0">
          {job.summary && <p className="text-[17px] leading-relaxed text-[#2c3f4e]">{job.summary}</p>}
          {job.description_html && (
            <div className="article-body mt-6" dangerouslySetInnerHTML={{ __html: job.description_html }} />
          )}
          <List title="What you'll do" items={job.responsibilities} />
          <List title="What we're looking for" items={job.requirements} />
          <List title="Nice to have" items={job.nice_to_have} />
          <List title="What you'll get" items={job.benefits} />
          {job.skills.length > 0 && (
            <section className="mt-8">
              <h2 className="text-[20px] font-bold tracking-tight text-[#0f2a45]">Skills</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <li key={s} className="rounded-full bg-[#e3f2ed] px-3 py-1 text-[14px] font-semibold text-[#0b6550]">{s}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="mt-10 lg:mt-0">
          <div className="rounded-2xl border border-[#d7e4de] bg-[#f3f7fa] p-5 lg:sticky lg:top-24">
            <h2 className="text-[16.5px] font-bold text-[#0f2a45]">Role overview</h2>
            <dl className="mt-3 divide-y divide-[#d7e4de]">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2.5 text-[15px]">
                  <dt className="text-[#5b6e7a]">{k}</dt>
                  <dd className="text-right font-semibold text-[#0f2a45]">{v}</dd>
                </div>
              ))}
            </dl>
            {open && (
              <a href="#apply" className="mt-4 flex h-11 items-center justify-center rounded-xl bg-[#0e7b5b] text-[15px] font-semibold text-white hover:bg-[#0b6550]">
                Apply for this role
              </a>
            )}
          </div>
        </aside>
      </div>

      <section id="apply" className="scroll-mt-24 border-t border-[#d7e4de] bg-[#f3f7fa]">
        <div className="mx-auto max-w-[820px] px-5 py-10 md:px-8 md:py-14">
          {open ? (
            <>
              <h2 className="text-[24px] font-bold tracking-tight text-[#0f2a45] md:text-[30px]">Apply for {job.title}</h2>
              <p className="mt-2 text-[15.5px] text-[#4a5d68]">Takes about 5 minutes. Fields marked * are required.</p>
              <div className="mt-7 rounded-2xl border border-[#d7e4de] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:p-8">
                <ApplyForm jobId={job.id} jobTitle={job.title} questions={parseQuestions(job.screening_questions)} />
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-[18px] font-semibold text-[#0f2a45]">Applications for this role have closed.</p>
              <Link href="/careers" className="mt-4 inline-flex h-11 items-center rounded-xl bg-[#0f2a45] px-5 text-[15px] font-semibold text-white hover:bg-[#173a58]">
                See open roles
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
