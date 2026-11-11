import { JsonLd } from "@/components/blog/JsonLd";
import { CompanyDetails } from "@/components/site/CompanyDetails";
import { container, CtaBand, PageHero, PrimaryButton, SecondaryButton, SectionHeading } from "@/components/site/PageShell";
import { company, legalEntity, whatsappLink } from "@/content/company";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const TITLE = "About Filingedge360 — Senior Professionals. Personal Attention. Fair Prices.";
const DESCRIPTION =
  "Filingedge360 pairs clients with experienced CAs, CSs, MBAs, lawyers and technologists — quality work under one brand, at fair transparent prices.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/about" });

const STAND_FOR = [
  {
    title: "Experience on every engagement",
    body: "Your work is handled by qualified professionals, not passed down to interns.",
  },
  {
    title: "Transparent pricing",
    body: "Fixed, upfront fees, with government charges shown separately.",
  },
  {
    title: "Ownership",
    body: "One brand, one point of contact, full accountability.",
  },
  {
    title: "Respect for timelines",
    body: "We work to deadlines the way leading organisations do.",
  },
  {
    title: "Confidentiality",
    body: "Your data is handled securely and only by those who need it.",
  },
];

const WIN_FOR = [
  { for: "Clients", means: "Senior-level expertise at fair, transparent prices" },
  { for: "Professionals", means: "Meaningful independent work alongside their careers" },
  { for: "The ecosystem", means: "More businesses compliant, better advised and able to grow" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#f3f7fa]">
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/about", type: "AboutPage" })} />
      <PageHero
        eyebrow="About Filingedge360"
        title="Senior professionals. Personal attention. Fair prices."
        crumbs={[{ name: "About", path: "/about" }]}
        intro={
          <p>
            Most people and businesses want the same thing from their CA, CS or lawyer: an experienced professional who
            understands their situation and takes ownership of the work. {company.brand} was built so that is what you
            actually get.
          </p>
        }
      >
        <PrimaryButton href="/book-consultation">Get a Free Consultation</PrimaryButton>
        <SecondaryButton href={whatsappLink("Hi Filingedge360, I have a question.")}>WhatsApp Us</SecondaryButton>
      </PageHero>

      <section className={`${container} py-12`}>
        <SectionHeading title="Why we started" />
        <div className="mt-5 max-w-3xl space-y-4 text-[16px] leading-relaxed text-[#2c3f4e]">
          <p>
            What people often get is different. Established firms charge premium fees, but the work is frequently handled
            by junior staff or interns, with the senior professional appearing only at the start or when something goes
            wrong. Small businesses, startups and individuals end up paying a lot without getting the experience they were
            paying for.
          </p>
          <p className="font-semibold text-[#0f2a45]">We believed there was a better way.</p>
        </div>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="Our model" />
        <div className="mt-5 max-w-3xl space-y-4 text-[16px] leading-relaxed text-[#2c3f4e]">
          <p>
            India has a large pool of highly qualified professionals working in leading organisations: Chartered
            Accountants, Company Secretaries, MBAs, lawyers, software engineers and AI specialists. They are used to tight
            deadlines, high standards and serious accountability. Many have time beyond their regular roles and want to use
            their expertise independently.
          </p>
          <p>
            Filingedge360 brings these professionals together and pairs them with clients who need quality work at a fair
            price. Clients get experienced hands on their work. Professionals get a structured, trusted platform for their
            skills.
          </p>
        </div>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="A platform, not an aggregator" />
        <div className="mt-5 max-w-3xl space-y-4 text-[16px] leading-relaxed text-[#2c3f4e]">
          <p>
            We don&apos;t simply list professionals and leave you to deal with them. Every engagement is delivered under
            the Filingedge360 name, and we take full responsibility for it: quality, timelines, confidentiality and
            follow-up. If something isn&apos;t right, you come to us, and we fix it.
          </p>
          <p>
            Every engagement follows defined processes, checklists and review steps, so the standard you get doesn&apos;t
            depend on any one individual.
          </p>
        </div>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="Who we are" />
        <div className="mt-5 max-w-3xl space-y-4 text-[16px] leading-relaxed text-[#2c3f4e]">
          <p>
            We are a team of Chartered Accountants, Company Secretaries, MBAs, software engineers and AI developers,
            working towards a common goal: making expert financial, legal and business services accessible to everyone.
          </p>
          <p>
            Our technology team builds tools that make our work faster and more accurate, from compliance trackers to
            automated reconciliations. That lets our professionals spend their time on judgement and advice, not paperwork.
          </p>
        </div>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="What we stand for" />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAND_FOR.map((item) => (
            <li key={item.title} className="rounded-2xl border border-[#d7e4de] bg-white p-5">
              <h3 className="text-[17px] font-bold text-[#0f2a45]">{item.title}</h3>
              <p className="mt-1.5 text-[15.5px] leading-relaxed text-[#4a5d68]">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="A win for everyone" />
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#d7e4de] bg-white">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-[#e8f2ee] text-[#0f2a45]">
              <tr>
                <th className="px-5 py-3 font-semibold">For</th>
                <th className="px-5 py-3 font-semibold">What it means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d7e4de] text-[#2c3f4e]">
              {WIN_FOR.map((row) => (
                <tr key={row.for}>
                  <td className="px-5 py-3.5 font-semibold text-[#0f2a45]">{row.for}</td>
                  <td className="px-5 py-3.5">{row.means}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={`${container} pb-14`}>
        <SectionHeading
          title="The company behind the brand"
          intro={`Filingedge360 is a brand of ${legalEntity()}, registered in India.`}
        />
        <div className="mt-5">
          <CompanyDetails />
        </div>
      </section>

      <CtaBand
        title="Have a question or a requirement? Talk to us."
        body="Get a free consultation or message us on WhatsApp — we'll tell you what you need, what it costs and how long it takes."
      />
    </div>
  );
}
