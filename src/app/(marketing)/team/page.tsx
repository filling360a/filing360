import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/blog/JsonLd";
import { container, CtaBand, PageHero, SecondaryButton } from "@/components/site/PageShell";
import { company } from "@/content/company";
import { team } from "@/content/team";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Team — Chartered Accountants, Company Secretaries & Tax Experts",
  description:
    "Meet the qualified Chartered Accountants, Company Secretaries and tax professionals who handle your registrations, filings and compliance at Filing360.",
  path: "/team",
  noindex: team.length === 0,
});

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function TeamPage() {
  const people = team.map((m) => ({
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    ...(m.qualifications ? { hasCredential: m.qualifications } : {}),
    ...(m.photo ? { image: absoluteUrl(m.photo) } : {}),
    ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
    worksFor: { "@id": absoluteUrl("/#organization") },
  }));

  return (
    <div className="bg-[#f3f7fa]">
      {people.length > 0 && <JsonLd data={{ "@context": "https://schema.org", "@graph": people }} />}
      <PageHero
        eyebrow="Our team"
        title="The professionals behind your filings"
        crumbs={[{ name: "About", path: "/about" }, { name: "Our team", path: "/team" }]}
        intro={
          <p>
            Every registration and return is prepared or reviewed by a qualified professional — a Chartered Accountant, Company Secretary or
            tax specialist — not a call-centre script.
          </p>
        }
      />

      <section className={`${container} py-12`}>
        {team.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#bfd4cb] bg-white p-8 text-center">
            <p className="text-[18px] font-bold text-[#0f2a45]">Team profiles are being added</p>
            <p className="mx-auto mt-2 max-w-xl text-[15.5px] leading-relaxed text-[#4a5d68]">
              We&apos;re publishing profiles of our professionals with their ICAI / ICSI membership details. Meanwhile, ask us on a call who will
              handle your work — we&apos;re happy to share their credentials.
            </p>
            <div className="mt-5 flex justify-center">
              <SecondaryButton href="/book-consultation">Talk to an expert</SecondaryButton>
            </div>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <li key={m.name} className="flex flex-col rounded-2xl border border-[#d7e4de] bg-white p-5">
                <div className="flex items-center gap-4">
                  {m.photo ? (
                    <Image src={m.photo} alt={m.name} width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e3f2ed] text-[20px] font-bold text-[#0e7b5b]" aria-hidden>
                      {initials(m.name)}
                    </span>
                  )}
                  <div>
                    <h2 className="text-[17px] font-bold text-[#0f2a45]">
                      {m.name}
                      {m.qualifications && <span className="ml-1.5 text-[14px] font-semibold text-[#0e7b5b]">{m.qualifications}</span>}
                    </h2>
                    <p className="text-[14.5px] text-[#4a5d68]">{m.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[#2c3f4e]">{m.bio}</p>
                {m.expertise && m.expertise.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {m.expertise.map((e) => (
                      <li key={e} className="rounded-full bg-[#eef4f1] px-2.5 py-1 text-[13px] text-[#4a5d68]">{e}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-[13.5px] text-[#5b6e7a]">
                  {m.experienceYears ? <span>{m.experienceYears}+ years experience</span> : null}
                  {m.membershipNo && <span>Membership no. {m.membershipNo}</span>}
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0e7b5b] hover:underline">LinkedIn</a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-8 text-[15px] text-[#5b6e7a]">
          Want to join us? See <Link href="/careers" className="font-semibold text-[#0e7b5b] hover:underline">open roles</Link> or write to{" "}
          <a href={`mailto:${company.contact.careersEmail}`} className="font-semibold text-[#0e7b5b] hover:underline">{company.contact.careersEmail}</a>.
        </p>
      </section>
      <CtaBand />
    </div>
  );
}
