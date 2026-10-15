import { LeadForm } from "@/components/leads/LeadForm";
import { container, FaqList, PageHero, SectionHeading } from "@/components/site/PageShell";
import { company } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partner Program for CAs, CSs & Tax Professionals",
  description:
    "Join the Filing360 professional network. Chartered Accountants, Company Secretaries and tax practitioners get steady, pre-qualified work, fast payouts and zero sales effort.",
  path: "/partners",
});

const BENEFITS = [
  { title: "Steady, qualified work", body: "We handle marketing and sales. You receive clients who have already agreed scope and paid an advance." },
  { title: "Predictable payouts", body: "Fixed professional fee per assignment, agreed upfront and paid on milestone completion." },
  { title: "Choose your specialisation", body: "Incorporations, GST, income tax, ROC compliance, trademarks, audits — take only the work you're best at." },
  { title: "Tools and templates", body: "Checklists, document collection, client communication and status updates handled on our side." },
];

const WHO = [
  "Chartered Accountants (practising certificate holders)",
  "Company Secretaries in practice",
  "Cost & Management Accountants",
  "Advocates and registered trademark agents",
  "GST practitioners and tax return preparers",
];

const STEPS = [
  { title: "Apply", body: "Share your details and areas of practice using the form." },
  { title: "Verification", body: "We verify your membership number and certificate of practice, and run a short onboarding call." },
  { title: "Agreement", body: "Sign a partner agreement covering fees, timelines, confidentiality and data protection." },
  { title: "Start receiving work", body: "Assignments are matched to your expertise and location. Accept the ones that fit." },
];

const FAQS = [
  { q: "Is there a joining fee?", a: "No. Joining the network is free." },
  { q: "Will clients be shared with me directly?", a: "Clients engage Filing360. You work as our empanelled professional and sign returns, certificates or filings in your professional capacity where the law requires it." },
  { q: "How is client data protected?", a: "Partners sign a data-processing and confidentiality agreement aligned with the Digital Personal Data Protection Act, 2023 and their professional code of ethics. Access is limited to the assignment." },
  { q: "Can I work from any city?", a: "Yes. Most work is online. For tasks needing physical presence, we match partners by city." },
];

export default function PartnersPage() {
  return (
    <div className="bg-[#f8fafc]">
      <PageHero
        eyebrow="Partner program"
        title="Grow your practice with Filing360"
        crumbs={[{ name: "Partner program", path: "/partners" }]}
        intro={
          <p>
            Join our network of Chartered Accountants, Company Secretaries and tax professionals. Get pre-qualified assignments from founders and
            businesses across India — without spending on marketing.
          </p>
        }
        aside={
          <LeadForm
            id="partner-lead"
            source="partner-program"
            extra="message"
            title="Apply to join"
            subtitle="We'll call you within two working days."
            submitLabel="Submit application"
            interestLabel="I am a"
            interestOptions={["Chartered Accountant", "Company Secretary", "Cost Accountant", "Advocate / Trademark agent", "GST / Tax practitioner", "Other"]}
            messagePlaceholder="Membership number, years in practice, areas of work"
          />
        }
      />

      <section className={`${container} py-12`}>
        <SectionHeading title="Why professionals partner with us" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
              <h3 className="text-[17px] font-bold text-[#0b2c5e]">{b.title}</h3>
              <p className="mt-1.5 text-[15.5px] leading-relaxed text-[#475569]">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${container} grid gap-8 pb-12 lg:grid-cols-2`}>
        <div>
          <SectionHeading title="Who can apply" />
          <ul className="mt-5 space-y-2.5">
            {WHO.map((w) => (
              <li key={w} className="flex gap-2.5 text-[16px] text-[#334155]">
                <span className="text-[#16a34a]" aria-hidden>✓</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading title="How it works" />
          <ol className="mt-5 space-y-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-[#e2e8f0] bg-white p-4">
                <p className="text-[15.5px] font-bold text-[#0b2c5e]">{i + 1}. {s.title}</p>
                <p className="mt-1 text-[15px] text-[#475569]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${container} pb-14`}>
        <SectionHeading title="Partner FAQs" />
        <div className="mt-5"><FaqList items={FAQS} /></div>
        <p className="mt-6 text-[15px] text-[#64748b]">
          Questions? Write to <a href={`mailto:${company.contact.partnersEmail}`} className="font-semibold text-[#2563eb] hover:underline">{company.contact.partnersEmail}</a>.
        </p>
      </section>
    </div>
  );
}
