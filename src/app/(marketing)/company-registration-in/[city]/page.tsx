import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/blog/JsonLd";
import { LeadForm } from "@/components/leads/LeadForm";
import { container, CtaBand, FaqList, PageHero, SectionHeading } from "@/components/site/PageShell";
import { cities, cityHref, getCity } from "@/content/cities";
import { KEY, serviceLink, serviceLinks } from "@/content/links";
import { formatInr, getService } from "@/content/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/company-registration-in/[city]">) {
  const city = getCity((await params).city);
  if (!city) return {};
  const pvt = serviceLink(KEY.pvtLtd);
  return pageMetadata({
    title: `Company Registration in ${city.name} — Pvt Ltd, LLP & OPC`,
    description: `Register a private limited company, LLP or OPC in ${city.name}${pvt?.priceFrom ? ` from ${formatInr(pvt.priceFrom)}` : ""}. Expert CA/CS help with name approval, DSC, SPICe+ filing, PAN, TAN, GST and ${city.roc} compliance.`,
    path: cityHref(city),
    keywords: [
      `company registration in ${city.name}`,
      `private limited company registration ${city.name}`,
      `LLP registration ${city.name}`,
      `OPC registration ${city.name}`,
      `GST registration ${city.name}`,
    ],
  });
}

const STEPS = [
  { title: "Name check & structure", body: "We help you pick the right entity and check your proposed name against existing companies and trademarks." },
  { title: "DSC for directors", body: "Digital signature certificates are issued online for every director and subscriber after video verification." },
  { title: "SPICe+ filing", body: "We draft the MoA and AoA and file SPICe+ Part A (name) and Part B (incorporation), with AGILE-PRO-S for GST, EPFO, ESIC and a bank account." },
  { title: "Certificate & PAN/TAN", body: "The Central Registration Centre issues the Certificate of Incorporation with CIN, PAN and TAN." },
  { title: "Post-incorporation", body: "Bank account, INC-20A commencement of business within 180 days, auditor appointment within 30 days and first board meeting." },
];

const DOCUMENTS = [
  "PAN card of every director and shareholder (passport for foreign nationals)",
  "Aadhaar, voter ID, passport or driving licence as address proof",
  "Recent bank statement or utility bill of each director (not older than two months)",
  "Passport-size photograph of each director",
  "Registered office proof: utility bill not older than two months, plus rent agreement and owner's NOC if rented",
];

export default async function CityPage({ params }: PageProps<"/company-registration-in/[city]">) {
  const city = getCity((await params).city);
  if (!city) notFound();

  const pvt = getService("startup", "private-limited-company");
  const entities = serviceLinks([KEY.pvtLtd, KEY.llp, KEY.opc, KEY.proprietorship, KEY.partnership, KEY.section8]);
  const related = serviceLinks([KEY.gstReg, KEY.msme, KEY.dpiit, KEY.companyCompliance, KEY.accounting, KEY.inc20a]);
  const nearby = city.nearby.map(getCity).filter((c) => c !== undefined);

  const offers = (pvt?.service.packages ?? [])
    .filter((p) => typeof p.price === "number")
    .map((p) => ({ name: p.name, price: p.price as number, description: p.description }));

  const faqs = [
    ...city.faqs,
    {
      q: `How long does company registration in ${city.name} take?`,
      a: `Typically 7–12 working days after we receive complete documents — about 1–2 days for DSCs, and the rest for name approval and SPICe+ processing at the Central Registration Centre. Government processing times can vary.`,
    },
    {
      q: "What is the minimum capital needed?",
      a: "There is no minimum paid-up capital for a private limited company. Most founders start with ₹1 lakh or ₹10 lakh authorised capital, which affects only the government fee and stamp duty.",
    },
    {
      q: `Do I need an office in ${city.name}?`,
      a: `You need a registered office address in ${city.state} to register there. It can be residential, commercial or a co-working space, as long as you have a utility bill and the owner's NOC.`,
    },
    {
      q: "How many people do I need to start a private limited company?",
      a: "At least two directors and two shareholders (they can be the same people). At least one director must be resident in India. For a single founder, a One Person Company (OPC) is an option.",
    },
  ];

  return (
    <div className="bg-[#f3f7fa]">
      {pvt && (
        <JsonLd
          data={serviceJsonLd({
            name: `Company Registration in ${city.name}`,
            description: `Private limited company, LLP and OPC registration in ${city.name}, ${city.state}.`,
            path: cityHref(city),
            category: "Company registration",
            offers,
            areaServed: city.name,
          })}
        />
      )}
      <PageHero
        eyebrow={`${city.name}, ${city.state}`}
        title={`Company Registration in ${city.name}`}
        crumbs={[
          { name: "Company registration", path: "/company-registration-in" },
          { name: city.name, path: cityHref(city) },
        ]}
        intro={
          <>
            <p>{city.intro}</p>
            <p className="mt-3">
              Register a Private Limited Company, LLP or OPC in {city.name} with qualified CA / CS professionals — name approval, DSCs, SPICe+
              filing, PAN, TAN and bank account support, fully online.
            </p>
          </>
        }
        aside={
          <LeadForm
            id="city-lead"
            compact
            source={`city-${city.slug}`}
            service={{ slug: "private-limited-company", name: "Private Limited Company" }}
            title="Get a free quote"
            submitLabel="Get free quote"
            badge="Fast · Easy · No Obligation"
          />
        }
      >
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium text-[#2c3f4e]">
          <li>✓ 100% online</li>
          <li>✓ Govt. fees shown separately</li>
          <li>✓ Milestone payments</li>
        </ul>
      </PageHero>

      <section className={`${container} py-12`}>
        <SectionHeading title={`Business structures you can register in ${city.name}`} intro={city.ecosystem} />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entities.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="group flex h-full flex-col rounded-2xl border border-[#d7e4de] bg-white p-5 transition hover:border-[#8ecfbc]">
                <span className="text-[17px] font-bold text-[#0f2a45] group-hover:text-[#0e7b5b]">{e.name}</span>
                <span className="mt-1.5 text-[15px] leading-relaxed text-[#4a5d68]">{e.tagline}</span>
                <span className="mt-auto pt-3 text-[14.5px] font-semibold text-[#0e7b5b]">{e.priceLabel} →</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[15px] text-[#5b6e7a]">
          Not sure which one fits? Compare them in our <Link href="/guides/llp-vs-private-limited" className="font-semibold text-[#0e7b5b] hover:underline">LLP vs Pvt Ltd</Link> and{" "}
          <Link href="/guides/opc-vs-private-limited" className="font-semibold text-[#0e7b5b] hover:underline">OPC vs Pvt Ltd</Link> guides, or try the{" "}
          <Link href="/tools/business-structure-chooser" className="font-semibold text-[#0e7b5b] hover:underline">structure chooser</Link>.
        </p>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title={`How company registration in ${city.name} works`} />
        <ol className="mt-6 grid gap-4 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-[#d7e4de] bg-white p-5">
              <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">Step {i + 1}</span>
              <p className="mt-1 text-[16px] font-bold text-[#0f2a45]">{s.title}</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#4a5d68]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${container} grid gap-8 pb-12 lg:grid-cols-2`}>
        <div>
          <SectionHeading title="Documents required" />
          <ul className="mt-5 space-y-2.5">
            {DOCUMENTS.map((d) => (
              <li key={d} className="flex gap-2.5 text-[15.5px] text-[#2c3f4e]">
                <span className="text-[#0e7b5b]" aria-hidden>✓</span>
                {d}
              </li>
            ))}
          </ul>
          <Link href="/documents/private-limited-company" className="mt-4 inline-block text-[15px] font-semibold text-[#0e7b5b] hover:underline">
            Full document checklist →
          </Link>
        </div>
        <div>
          <SectionHeading title="Fees" />
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#d7e4de] bg-white">
            <table className="w-full text-left text-[15px]">
              <tbody className="divide-y divide-[#d7e4de]">
                {offers.map((o) => (
                  <tr key={o.name}>
                    <th scope="row" className="px-4 py-3 font-semibold text-[#0f2a45]">{o.name} package</th>
                    <td className="px-4 py-3 text-right font-semibold text-[#0f2a45]">{formatInr(o.price)}</td>
                  </tr>
                ))}
                {(pvt?.service.govtFees ?? []).map((f) => (
                  <tr key={f.label}>
                    <th scope="row" className="px-4 py-3 font-normal text-[#4a5d68]">{f.label}</th>
                    <td className="px-4 py-3 text-right text-[#4a5d68]">{f.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[14px] text-[#5b6e7a]">
            Professional fees exclude GST. Government fees and stamp duty for {city.state} are paid at actuals and depend on authorised capital. See{" "}
            <Link href="/government-fees" className="font-semibold text-[#0e7b5b] hover:underline">government fees</Link>.
          </p>
        </div>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title={`Local compliance in ${city.name}`} />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#d7e4de] bg-white p-5">
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">Registrar of Companies</p>
            <p className="mt-1.5 text-[16px] font-semibold text-[#0f2a45]">{city.roc}</p>
            <p className="mt-1 text-[14.5px] text-[#4a5d68]">Handles annual filings, changes and compliance after incorporation.</p>
          </div>
          <div className="rounded-2xl border border-[#d7e4de] bg-white p-5">
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">Professional tax</p>
            <p className="mt-1.5 text-[16px] font-semibold text-[#0f2a45]">{city.professionalTax ? `Applies in ${city.state}` : `Not levied in ${city.state}`}</p>
            <p className="mt-1 text-[14.5px] text-[#4a5d68]">
              {city.professionalTax ? "Employers register and deduct PT from eligible salaries." : "No state PT registration is needed for employers."}
            </p>
          </div>
          <div className="rounded-2xl border border-[#d7e4de] bg-white p-5">
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">Shops & establishments</p>
            <p className="mt-1.5 text-[16px] font-semibold text-[#0f2a45]">{city.shopsAct}</p>
            <p className="mt-1 text-[14.5px] text-[#4a5d68]">Registration or intimation for your office or shop, depending on size.</p>
          </div>
        </div>
        <ul className="mt-5 space-y-2">
          {city.localNotes.map((n) => (
            <li key={n} className="flex gap-2.5 text-[15.5px] text-[#2c3f4e]">
              <span className="text-[#0e7b5b]" aria-hidden>•</span>
              {n}
            </li>
          ))}
        </ul>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title={`Who we work with in ${city.name}`} />
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-[15px] font-semibold text-[#0f2a45]">Popular business areas</p>
            <p className="mt-1.5 text-[15.5px] leading-relaxed text-[#4a5d68]">{city.hubs.join(" · ")}</p>
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#0f2a45]">Common sectors</p>
            <p className="mt-1.5 text-[15.5px] leading-relaxed text-[#4a5d68]">{city.sectors.join(" · ")}</p>
          </div>
        </div>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="After registration" intro="Services most founders need in the first year." />
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="inline-flex rounded-full border border-[#bfd4cb] bg-white px-4 py-2 text-[15px] font-medium text-[#0f2a45] hover:border-[#0e7b5b] hover:text-[#0e7b5b]">
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title={`Company registration in ${city.name}: FAQs`} />
        <div className="mt-5"><FaqList items={faqs} /></div>
      </section>

      {nearby.length > 0 && (
        <section className={`${container} pb-14`}>
          <p className="text-[15px] font-semibold text-[#0f2a45]">Company registration in nearby cities</p>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {nearby.map((c) => (
              <li key={c.slug}>
                <Link href={cityHref(c)} className="text-[15px] font-semibold text-[#0e7b5b] hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <CtaBand />
    </div>
  );
}
