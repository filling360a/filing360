import { JsonLd } from "@/components/blog/JsonLd";
import { LeadForm } from "@/components/leads/LeadForm";
import { CompanyDetails } from "@/components/site/CompanyDetails";
import { container, FaqList, PageHero, SectionHeading } from "@/components/site/PageShell";
import { company, fullAddress, hasValue, whatsappLink } from "@/content/company";
import { localBusinessJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Filing360 — Call, WhatsApp or Visit Us",
  description: `Talk to a Filing360 expert about company registration, GST, income tax or compliance. Call ${company.contact.phoneDisplay}, WhatsApp us, or email ${company.contact.email}. ${company.hours.label}.`,
  path: "/contact",
});

const DESKS = [
  { label: "New enquiries & sales", email: company.contact.email },
  { label: "Existing clients — support", email: company.contact.supportEmail },
  { label: "Billing, invoices & refunds", email: company.contact.billingEmail },
  { label: "Privacy & data requests", email: company.contact.privacyEmail },
  { label: "Complaints (Grievance Officer)", email: company.grievanceOfficer.email },
  { label: "CA / CS partnerships", email: company.contact.partnersEmail },
  { label: "Careers", email: company.contact.careersEmail },
];

const FAQS = [
  { q: "How quickly will someone call me back?", a: `During office hours (${company.hours.label}) we usually call back within 10 minutes of an enquiry. Requests received after hours are answered first thing the next working day.` },
  { q: "Is the first consultation free?", a: "Yes. A short call to understand your requirement, recommend the right registration or filing, and share a written quote is free. Detailed advisory sessions are quoted upfront before booking." },
  { q: "Do I need to visit your office?", a: "No. Everything — documents, signatures and payments — is handled online. You are welcome to visit by appointment if you prefer to meet in person." },
  { q: "Can you help clients outside my city?", a: "Yes. We serve clients across India. Company, LLP and GST registrations are filed online, so your location does not matter." },
];

export default function ContactPage() {
  const address = fullAddress();
  const mapQuery = address || `${company.address.city}, ${company.address.state}`;
  const channels = [
    { title: "Call us", body: company.contact.phoneDisplay, href: `tel:${company.contact.phoneTel}`, cta: "Call now" },
    { title: "WhatsApp", body: company.contact.whatsappDisplay, href: whatsappLink(), cta: "Open WhatsApp" },
    { title: "Email", body: company.contact.email, href: `mailto:${company.contact.email}`, cta: "Send email" },
  ];

  return (
    <div className="bg-[#f3f7fa]">
      <JsonLd data={localBusinessJsonLd()} />
      <PageHero
        eyebrow="Contact"
        title="Talk to a registration & tax expert"
        crumbs={[{ name: "Contact", path: "/contact" }]}
        intro={<p>Call, WhatsApp or write to us — or leave your number and an expert will call you back. {company.hours.label}.</p>}
        aside={
          <LeadForm
            id="contact-lead"
            compact
            source="contact-page"
            title="Get a free quote"
            submitLabel="Get free quote"
            badge="Fast · Easy · No Obligation"
          />
        }
      >
        {channels.map((c) => (
          <a
            key={c.title}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#bfd4cb] bg-white px-4 text-[15px] font-semibold text-[#0f2a45] hover:border-[#0e7b5b] hover:text-[#0e7b5b]"
          >
            {c.cta}
          </a>
        ))}
      </PageHero>

      <section className={`${container} grid gap-4 py-10 md:grid-cols-3 md:py-14`}>
        {channels.map((c) => (
          <a
            key={c.title}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="rounded-2xl border border-[#d7e4de] bg-white p-5 transition hover:border-[#8ecfbc]"
          >
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">{c.title}</p>
            <p className="mt-2 break-words text-[18px] font-bold text-[#0f2a45]">{c.body}</p>
            <p className="mt-1 text-[14.5px] text-[#5b6e7a]">{company.hours.label}</p>
          </a>
        ))}
      </section>

      <section className={`${container} grid gap-8 pb-12 lg:grid-cols-2`}>
        <div>
          <SectionHeading title="Visit our office" intro={address ? undefined : `Our team works from ${company.address.city}. Visits are by appointment.`} />
          {address && <p className="mt-3 text-[16px] leading-relaxed text-[#2c3f4e]">{address}</p>}
          <p className="mt-2 text-[15px] text-[#5b6e7a]">{company.hours.label} · visits by appointment</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#d7e4de] bg-white">
            <iframe
              title={`Map of ${mapQuery}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
              className="h-[300px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {hasValue(company.mapsUrl) && (
            <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[15px] font-semibold text-[#0e7b5b] hover:underline">
              Get directions on Google Maps →
            </a>
          )}
        </div>
        <div>
          <SectionHeading title="Write to the right desk" />
          <ul className="mt-4 divide-y divide-[#d7e4de] rounded-2xl border border-[#d7e4de] bg-white">
            {DESKS.map((d) => (
              <li key={d.label} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5">
                <span className="text-[15px] text-[#2c3f4e]">{d.label}</span>
                <a href={`mailto:${d.email}`} className="text-[15px] font-semibold text-[#0e7b5b] hover:underline">{d.email}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="Company details" />
        <div className="mt-5">
          <CompanyDetails />
        </div>
      </section>

      <section className={`${container} pb-14`}>
        <SectionHeading title="Frequently asked questions" />
        <div className="mt-5">
          <FaqList items={FAQS} />
        </div>
      </section>
    </div>
  );
}
