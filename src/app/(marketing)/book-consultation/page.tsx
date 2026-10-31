import { JsonLd } from "@/components/blog/JsonLd";
import { LeadForm } from "@/components/leads/LeadForm";
import { container, FaqList, PageHero, SectionHeading } from "@/components/site/PageShell";
import { company, hasValue } from "@/content/company";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const TITLE = "Book a Free Consultation with a CA / CS Expert";
const DESCRIPTION =
  "Book a free 15-minute call with a Filing360 expert. Get clear advice on company registration, business structure, GST, income tax and compliance — with a written quote and no obligation.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/book-consultation" });

const TOPICS = [
  { title: "Choosing a structure", body: "Private Limited, LLP, OPC, partnership or proprietorship — based on funding plans, liability, tax and compliance cost." },
  { title: "Registrations", body: "Company, LLP, GST, MSME/Udyam, trademark, FSSAI, IEC, startup recognition — what you need now and what can wait." },
  { title: "Tax & GST", body: "Old vs new regime, advance tax, GST composition vs regular, input credit, notices and refunds." },
  { title: "Annual compliance", body: "ROC filings, board meetings, audits, TDS returns and the deadlines that carry penalties." },
];

const HOW = [
  { title: "Pick a slot", body: "Choose a date and time window that suits you. Calls are available Monday to Saturday." },
  { title: "We confirm", body: "We confirm the slot by WhatsApp or call and tell you if any documents will help." },
  { title: "Talk to an expert", body: "A focused 15-minute call. You leave with a clear recommendation and a written quote." },
];

const FAQS = [
  { q: "Is the consultation really free?", a: "Yes. The first 15-minute call is free with no obligation. If you need a detailed advisory session — for example a tax-planning review or shareholder agreement discussion — we'll quote the fee upfront before booking it." },
  { q: "Who will I speak to?", a: "A qualified professional from our team — a Chartered Accountant, Company Secretary or tax specialist, depending on your question." },
  { q: "Can I reschedule?", a: "Of course. Reply to the confirmation message or WhatsApp us and we'll move it." },
  { q: "What should I keep ready?", a: "Nothing is mandatory. If you have them handy, PAN, a rough idea of turnover, the number of partners or directors, and any notices you've received will help us give sharper advice." },
];

function embedUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("cal.com")) u.searchParams.set("embed", "true");
    if (u.hostname.endsWith("calendly.com")) u.searchParams.set("hide_gdpr_banner", "1");
    return u.toString();
  } catch {
    return "";
  }
}

export default function BookConsultationPage() {
  const scheduler = hasValue(company.bookingUrl) ? embedUrl(company.bookingUrl) : "";

  return (
    <div className="bg-[#f3f7fa]">
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/book-consultation" })} />
      <PageHero
        eyebrow="Free consultation"
        title="Talk to an expert before you spend a rupee"
        crumbs={[{ name: "Book a consultation", path: "/book-consultation" }]}
        intro={
          <p>
            A free 15-minute call with a qualified CA / CS professional. Get a clear answer on what you need, what it will cost and how long it
            will take — with a written quote and zero pressure.
          </p>
        }
        aside={
          scheduler ? undefined : (
            <LeadForm
              id="booking-lead"
              source="book-consultation"
              extra="booking"
              title="Book your free call"
              subtitle="Pick a preferred slot — we'll confirm it on WhatsApp."
              submitLabel="Request this slot"
              interestLabel="Topic"
              messagePlaceholder="What would you like to discuss? (optional)"
            />
          )
        }
      >
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium text-[#2c3f4e]">
          <li>✓ Free 15-minute call</li>
          <li>✓ Written quote</li>
          <li>✓ No obligation</li>
        </ul>
      </PageHero>

      {scheduler && (
        <section className={`${container} py-10`}>
          <div className="overflow-hidden rounded-2xl border border-[#d7e4de] bg-white">
            <iframe title="Book a consultation" src={scheduler} className="h-[720px] w-full" loading="lazy" />
          </div>
        </section>
      )}

      <section className={`${container} py-12`}>
        <SectionHeading title="What we can help you with" intro="Bring any question about starting, registering or running a business in India." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {TOPICS.map((t) => (
            <div key={t.title} className="rounded-2xl border border-[#d7e4de] bg-white p-5">
              <h3 className="text-[17px] font-bold text-[#0f2a45]">{t.title}</h3>
              <p className="mt-1.5 text-[15.5px] leading-relaxed text-[#4a5d68]">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="How it works" />
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {HOW.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-[#d7e4de] bg-white p-5">
              <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">Step {i + 1}</span>
              <p className="mt-1 text-[17px] font-bold text-[#0f2a45]">{s.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[#4a5d68]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${container} pb-14`}>
        <SectionHeading title="Consultation FAQs" />
        <div className="mt-5"><FaqList items={FAQS} /></div>
      </section>
    </div>
  );
}
