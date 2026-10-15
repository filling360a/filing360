import Link from "next/link";
import { LegalDocument } from "@/components/site/LegalDocument";
import { company, hasValue, legalEntity } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy (DPDP Act compliant)",
  description:
    "How Filing360 collects, uses, shares, protects and retains personal data such as PAN, Aadhaar and business documents, and your rights under the Digital Personal Data Protection Act, 2023.",
  path: "/privacy",
});

const DATA = [
  {
    what: "Identity details — name, date of birth, father's name, photograph, signature, PAN, Aadhaar (masked where the authority accepts it), passport / voter ID, DIN",
    why: "Required by government forms for incorporation, GST, tax, DSC and other registrations you ask us to file",
  },
  {
    what: "Contact details — mobile number, email, residential and business address",
    why: "To respond to your enquiry, deliver the service, send OTP-linked filings and share updates",
  },
  {
    what: "Business documents — rent agreements, utility bills, NOCs, MoA / AoA, partnership deeds, board resolutions, licences",
    why: "Proof of registered office and constitution documents required by MCA, GSTN and other authorities",
  },
  {
    what: "Financial information — Form 16, bank statements, invoices, books of account, capital gains statements, tax credit statements",
    why: "To prepare returns, compute tax, reconcile GST and complete accounting or compliance work",
  },
  {
    what: "Payment information — transaction ID, amount, payment status",
    why: "To confirm payment, issue GST invoices and handle refunds. Card and bank credentials are collected directly by the payment gateway; we never see or store them",
  },
  {
    what: "Technical data — pages visited, device and browser type, approximate location, a one-way hash of your IP address, cookies (see Cookie Policy)",
    why: "Security, fraud and spam prevention, and — only with your consent — analytics and advertising measurement",
  },
  {
    what: "Communications — call notes, emails, WhatsApp messages and feedback",
    why: "Service quality, record of instructions, and resolving disputes",
  },
  {
    what: "Job applicant data — résumé, experience, salary details and answers to screening questions",
    why: "To assess applications for roles you apply for",
  },
];

const RETENTION = [
  { what: "Client engagement records, filings and supporting documents", period: "For the engagement and 8 years after the end of the financial year in which it ends, to meet record-keeping and limitation periods under tax and company law" },
  { what: "Enquiries that did not become clients", period: "24 months from our last interaction, then deleted" },
  { what: "Job applications", period: "12 months from the application date, then deleted" },
  { what: "Payment and invoice records", period: "8 years, as required by GST and income-tax law" },
  { what: "Security logs and hashed IP addresses", period: "Up to 12 months" },
  { what: "Analytics and advertising cookies", period: "As set by each provider, generally 13 months or less — see the Cookie Policy" },
];

export default function PrivacyPage() {
  const entity = legalEntity();
  return (
    <LegalDocument
      path="/privacy"
      intro={`${entity} is the Data Fiduciary for personal data processed through filing360.in and our services. This policy explains, in plain language, what we collect, why, who we share it with, how long we keep it and how you can exercise your rights under the Digital Personal Data Protection Act, 2023 ("DPDP Act").`}
      sections={[
        {
          id: "scope",
          title: "Scope",
          body: (
            <p>
              This policy applies to visitors of our website, people who enquire or book a consultation, clients and the directors, partners and
              other persons whose data clients share with us, and job applicants. It does not cover government portals or third-party websites we
              link to — their own policies apply.
            </p>
          ),
        },
        {
          id: "what-we-collect",
          title: "What we collect and why",
          body: (
            <>
              <p>We collect only what is needed for the purpose described. You can choose not to share data, but some services cannot be delivered without it.</p>
              <table>
                <thead>
                  <tr>
                    <th>Personal data</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {DATA.map((d) => (
                    <tr key={d.what}>
                      <td>{d.what}</td>
                      <td>{d.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>
                <strong>Aadhaar:</strong> we ask for Aadhaar only where a government form requires it, request a masked copy wherever the authority
                accepts one, and never use it for any other purpose. We do not perform Aadhaar authentication ourselves.
              </p>
            </>
          ),
        },
        {
          id: "legal-basis",
          title: "Legal basis for processing",
          body: (
            <ul>
              <li><strong>Consent</strong> (Section 6 of the DPDP Act) — given when you submit a form, accept our terms or opt in to cookies. You can withdraw it at any time.</li>
              <li>
                <strong>Legitimate uses</strong> (Section 7) — where you voluntarily give data for a specific service, to comply with law or court
                orders, and to respond to emergencies.
              </li>
            </ul>
          ),
        },
        {
          id: "sharing",
          title: "Who we share data with",
          body: (
            <>
              <p>We never sell personal data. We share it only as needed to deliver the service, with:</p>
              <ul>
                <li>
                  <strong>Qualified professionals</strong> — Chartered Accountants, Company Secretaries, Cost Accountants and Advocates who work on
                  your matter, bound by confidentiality and professional codes of conduct.
                </li>
                <li>
                  <strong>Government portals and authorities</strong> — MCA, GSTN, Income Tax Department, TRACES, Udyam, DPIIT, EPFO/ESIC and others
                  where your filing is made.
                </li>
                <li><strong>Certifying Authorities</strong> — for issuing Digital Signature Certificates, including the video and identity verification they require.</li>
                <li><strong>Payment gateway and banks</strong> — to process payments and refunds.</li>
                <li>
                  <strong>Technology providers (Data Processors)</strong> — cloud hosting and database (Vercel, Supabase), email delivery (Resend),
                  communication tools, and — only with your consent — analytics and advertising tools (Google Analytics / Ads, Meta, Microsoft
                  Clarity).
                </li>
                <li><strong>Authorities and courts</strong> — when required by law, or to protect our rights or prevent fraud.</li>
              </ul>
              <p>
                Data Processors act on our instructions under written contracts. Some providers may store data outside India; we transfer data only
                to countries not restricted by the Government of India under Section 16 of the DPDP Act.
              </p>
            </>
          ),
        },
        {
          id: "retention",
          title: "How long we keep data",
          body: (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Retention</th>
                  </tr>
                </thead>
                <tbody>
                  {RETENTION.map((r) => (
                    <tr key={r.what}>
                      <td>{r.what}</td>
                      <td>{r.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>When the period ends, or once you withdraw consent and no law requires us to keep it, we delete or anonymise the data.</p>
            </>
          ),
        },
        {
          id: "security",
          title: "How we protect data",
          body: (
            <ul>
              <li>Encryption in transit (HTTPS/TLS) and encryption at rest by our hosting providers.</li>
              <li>Documents and résumés are stored in private storage; staff open them through short-lived links and access is logged.</li>
              <li>Role-based access — team members see only the data their role needs, enforced at the database level.</li>
              <li>IP addresses are stored only as one-way hashes. Card and bank credentials never reach our servers.</li>
              <li>Confidentiality obligations for employees, professionals and processors, and regular access reviews.</li>
            </ul>
          ),
        },
        {
          id: "rights",
          title: "Your rights",
          body: (
            <>
              <p>Under the DPDP Act you can:</p>
              <ul>
                <li><strong>Access</strong> a summary of the personal data we process about you and the processing activities;</li>
                <li><strong>Correct, complete or update</strong> inaccurate or incomplete data;</li>
                <li><strong>Erase</strong> data that is no longer needed, unless the law requires us to keep it;</li>
                <li><strong>Withdraw consent</strong> at any time — this does not affect processing already done, and some services may stop;</li>
                <li><strong>Nominate</strong> another person to exercise your rights in case of death or incapacity;</li>
                <li><strong>Raise a grievance</strong> with us, and if unresolved, complain to the Data Protection Board of India.</li>
              </ul>
              <p>
                Email <a href={`mailto:${company.contact.privacyEmail}`}>{company.contact.privacyEmail}</a> from your registered email address. We may
                verify your identity before acting, and we respond within the time set out in our{" "}
                <Link href="/grievance-redressal">grievance redressal policy</Link>.
              </p>
            </>
          ),
        },
        {
          id: "children",
          title: "Children",
          body: (
            <p>
              Our services are meant for adults. Where a minor&rsquo;s data is needed (for example, a minor shareholder or a family member&rsquo;s tax
              return), we process it only with verifiable consent of the parent or lawful guardian, and we do not track or target minors with
              advertising.
            </p>
          ),
        },
        {
          id: "cookies",
          title: "Cookies and similar technologies",
          body: (
            <p>
              Essential cookies keep the website working. Analytics and advertising cookies are used only if you accept them in the cookie banner.
              Details and how to change your choice are in our <Link href="/cookie-policy">Cookie Policy</Link>.
            </p>
          ),
        },
        {
          id: "breach",
          title: "Data breaches",
          body: (
            <p>
              If a personal data breach occurs, we will contain it, inform the Data Protection Board of India and affected individuals as required by
              the DPDP Act and its rules, and tell you what we are doing and what you can do to protect yourself.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: <p>We will post any changes here and update the date at the top. For significant changes, we will also notify active clients by email.</p>,
        },
        {
          id: "contact",
          title: "Contact and Grievance Officer",
          body: (
            <p>
              Privacy questions and requests: <a href={`mailto:${company.contact.privacyEmail}`}>{company.contact.privacyEmail}</a>.
              <br />
              Grievance Officer{hasValue(company.grievanceOfficer.name) ? `: ${company.grievanceOfficer.name}` : ""} —{" "}
              <a href={`mailto:${company.grievanceOfficer.email}`}>{company.grievanceOfficer.email}</a>
              {hasValue(company.grievanceOfficer.phone) ? `, ${company.grievanceOfficer.phone}` : ""}. See{" "}
              <Link href="/grievance-redressal">Grievance Redressal</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
