import { JsonLd } from "@/components/blog/JsonLd";
import { CompanyDetails } from "@/components/site/CompanyDetails";
import { container, CtaBand, LinkCards, PageHero, PrimaryButton, SecondaryButton, SectionHeading } from "@/components/site/PageShell";
import { company, legalEntity } from "@/content/company";
import { pillars, pillarHref } from "@/content/services";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const TITLE = "About Filing360 — Company Registration, GST & Tax Experts";
const DESCRIPTION =
  "Filing360 helps founders, freelancers and small businesses in India register, file and stay compliant — with qualified CA / CS professionals, transparent fees and real-time updates.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/about" });

const PRINCIPLES = [
  { title: "Qualified people, not scripts", body: "Every filing is prepared or reviewed by a Chartered Accountant, Company Secretary or tax professional." },
  { title: "Transparent pricing", body: "Professional fee and government fee shown separately before you pay. No hidden add-ons." },
  { title: "Milestone payments", body: "Pay in stages as work progresses, with a clear refund policy if plans change." },
  { title: "Honest about approvals", body: "Approvals come from MCA, GSTN, the Trademark Registry and other authorities — we never promise what only they can grant." },
  { title: "Your data, protected", body: "Documents are stored securely, shared only as needed for your work, and handled under India's DPDP Act." },
  { title: "Updates without chasing", body: "Status updates at every milestone on email and WhatsApp, plus online tracking with your reference number." },
];

const HOW = [
  { title: "Free consultation", body: "Tell us what you're trying to do. We recommend the right structure or filing and send a written quote." },
  { title: "Share documents", body: "Upload online or send on WhatsApp. We check them before anything is filed." },
  { title: "We prepare & file", body: "Your assigned expert drafts, files and follows up with the department." },
  { title: "Delivered & reminded", body: "You receive certificates and acknowledgements — and reminders before your next deadline." },
];

export default function AboutPage() {
  return (
    <div className="bg-[#f3f7fa]">
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/about", type: "AboutPage" })} />
      <PageHero
        eyebrow="About us"
        title="Making business compliance in India simple, transparent and on time"
        crumbs={[{ name: "About", path: "/about" }]}
        intro={
          <p>
            {company.brand} helps founders, freelancers and growing businesses register, file and stay compliant — from the first incorporation
            to every annual return. We combine qualified professionals with a clear online process, so you always know what&apos;s happening,
            what it costs and what comes next.
          </p>
        }
      >
        <PrimaryButton href="/book-consultation">Book a free consultation</PrimaryButton>
        <SecondaryButton href="/team">Meet the team</SecondaryButton>
      </PageHero>

      <section className={`${container} py-12`}>
        <SectionHeading title="What we stand for" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[#d7e4de] bg-white p-5">
              <h3 className="text-[17px] font-bold text-[#0f2a45]">{p.title}</h3>
              <p className="mt-1.5 text-[15.5px] leading-relaxed text-[#4a5d68]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="How we work" />
        <ol className="mt-6 grid gap-4 md:grid-cols-4">
          {HOW.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-[#d7e4de] bg-white p-5">
              <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">Step {i + 1}</span>
              <p className="mt-1 text-[17px] font-bold text-[#0f2a45]">{s.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[#4a5d68]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="What we do" />
        <div className="mt-6">
          <LinkCards
            items={pillars.map((p) => ({
              href: pillarHref(p),
              title: p.name,
              body: p.services
                .slice(0, 4)
                .map((s) => s.shortName ?? s.name)
                .join(" · "),
            }))}
          />
        </div>
      </section>

      <section className={`${container} pb-14`}>
        <SectionHeading
          title="Company information"
          intro={`${legalEntity()} provides professional facilitation services. We are a private firm and are not affiliated with any government department.`}
        />
        <div className="mt-5">
          <CompanyDetails />
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
