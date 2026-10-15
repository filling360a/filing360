import Link from "next/link";
import { LegalDocument } from "@/components/site/LegalDocument";
import { commercialRules as r, company } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Service Delivery Policy (Shipping Policy)",
  description:
    "How Filing360 delivers registration, tax and compliance services: delivery methods, typical timelines for each service, and what happens when government processing is delayed.",
  path: "/service-delivery-policy",
});

const TIMELINES = [
  { service: "GST registration", time: "3–7 working days", note: "Longer if a physical verification or clarification is raised" },
  { service: "Private Limited Company / OPC / LLP incorporation", time: "7–10 working days", note: "Includes DSC, name approval and incorporation" },
  { service: "Section 8 Company", time: "15–25 working days", note: "Licence under Section 8 is processed before incorporation" },
  { service: "Partnership firm registration", time: "5–7 working days", note: "Depends on the state Registrar of Firms" },
  { service: "Trust registration", time: "5–10 working days", note: "Depends on the Sub-Registrar appointment" },
  { service: "MSME (Udyam) registration", time: "1–2 working days" },
  { service: "Startup India (DPIIT) recognition", time: "7–15 working days", note: "Decided by DPIIT" },
  { service: "Income tax return (ITR) filing", time: "1–3 working days", note: "After all documents are received" },
  { service: "GST returns (monthly / quarterly)", time: "Before the statutory due date", note: "If data is shared at least 3 working days before the due date" },
  { service: "Annual ROC compliance (AOC-4, MGT-7)", time: "Before the statutory due date", note: "Requires audited financials and AGM details" },
  { service: "Event-based MCA changes (director, office, name)", time: "3–10 working days", note: "Plus ROC approval time" },
];

export default function ServiceDeliveryPage() {
  return (
    <LegalDocument
      path="/service-delivery-policy"
      intro="We provide professional services, so nothing is physically shipped. This policy explains how work is delivered to you, when the clock starts, typical timelines, and what happens when a government portal or department is slow."
      sections={[
        {
          id: "how",
          title: "How services are delivered",
          body: (
            <ul>
              <li>
                <strong>Digitally</strong> — certificates, registration numbers, acknowledgements, filed returns, drafts and invoices are sent to your
                registered email and, where you prefer, on WhatsApp.
              </li>
              <li>
                <strong>From the government portal</strong> — documents such as the Certificate of Incorporation, GST certificate or Udyam
                certificate are issued by the authority and are also downloadable from the official portal in your name.
              </li>
              <li>
                <strong>Physical documents</strong> — if you need originals (for example a DSC token or a registered deed), we courier them within
                India on request; courier charges are billed at actuals.
              </li>
            </ul>
          ),
        },
        {
          id: "start",
          title: "When the timeline starts",
          body: (
            <p>
              Timelines count in working days (excluding Sundays and public holidays) from the day we have <strong>both</strong> the advance payment
              and a complete, correct set of documents. Your relationship manager confirms this start date in writing.
            </p>
          ),
        },
        {
          id: "timelines",
          title: "Typical timelines",
          body: (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Typical time</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {TIMELINES.map((t) => (
                    <tr key={t.service}>
                      <td>{t.service}</td>
                      <td>{t.time}</td>
                      <td>{t.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Timelines for other services are shown on each service page and in your quotation.</p>
            </>
          ),
        },
        {
          id: "government-delays",
          title: "Government processing and delays",
          body: (
            <>
              <p>
                Approval times are set by authorities such as the MCA, GSTN and the Income Tax Department, and can be affected by portal outages,
                queries, verification visits, rule changes and year-end rush. When that happens:
              </p>
              <ul>
                <li>we track the application every working day and tell you as soon as anything changes;</li>
                <li>we reply to routine department queries within 2 working days of receiving any information needed from you, at no extra professional fee;</li>
                <li>if a resubmission is required, it is handled as set out in our <Link href="/refund-policy">Refund Policy</Link>;</li>
                <li>delays caused by authorities do not make a stage refundable once it has been filed, but we never charge extra for waiting time.</li>
              </ul>
            </>
          ),
        },
        {
          id: "completion",
          title: "When a service is complete",
          body: (
            <p>
              A service is complete when we share the final certificate, registration number, acknowledgement or filed return, as applicable. For
              annual plans, each period&rsquo;s filing is complete when its acknowledgement is shared.
            </p>
          ),
        },
        {
          id: "updates",
          title: "Status updates",
          body: (
            <p>
              You can check progress any time on our <Link href="/track">Track your request</Link> page using your reference number, or by contacting
              your relationship manager on {company.contact.phoneDisplay} / <a href={`mailto:${company.contact.supportEmail}`}>{company.contact.supportEmail}</a>{" "}
              ({company.hours.label}).
            </p>
          ),
        },
        {
          id: "non-delivery",
          title: "If we miss a timeline",
          body: (
            <p>
              If a delay is caused by us rather than by missing documents or the authority, tell us and we will prioritise the work. If we still cannot
              deliver, you may cancel and receive a refund of the professional fee for any stage not completed, in {r.refundProcessingDays} working
              days, as set out in our Refund Policy.
            </p>
          ),
        },
      ]}
    />
  );
}
