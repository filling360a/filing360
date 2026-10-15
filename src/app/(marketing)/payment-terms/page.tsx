import Link from "next/link";
import { LegalDocument } from "@/components/site/LegalDocument";
import { commercialRules as r, company, hasValue, legalEntity } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Payment Terms & Pricing Policy",
  description:
    "Payment methods, GST invoicing, the difference between Filing360 professional fees and government fees, and when each is charged.",
  path: "/payment-terms",
});

export default function PaymentTermsPage() {
  return (
    <LegalDocument
      path="/payment-terms"
      intro="Every price on Filing360 is split into what we charge for our work and what the government charges. This page explains how each is billed, how to pay, and how GST invoices work."
      sections={[
        {
          id: "two-parts",
          title: "Professional fees vs government fees",
          body: (
            <>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Professional fee</th>
                    <th>Government &amp; third-party fees</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>What it is</td>
                    <td>Our charge for advice, drafting, filing and follow-up</td>
                    <td>Fees, stamp duty and charges levied by authorities and providers (MCA, state stamp duty, DSC, notary)</td>
                  </tr>
                  <tr>
                    <td>Shown as</td>
                    <td>The package price on each service page</td>
                    <td>Listed separately as &ldquo;government fees&rdquo; or quoted in writing before payment</td>
                  </tr>
                  <tr>
                    <td>GST</td>
                    <td>18% GST applies. Each price states whether it is inclusive or exclusive of GST</td>
                    <td>No GST is charged by us — passed on at actuals with the official receipt</td>
                  </tr>
                  <tr>
                    <td>When charged</td>
                    <td>{r.advancePercent}% advance to start; balance in milestones as shown on the service page</td>
                    <td>Only when the filing stage that needs it is reached</td>
                  </tr>
                  <tr>
                    <td>Refundable?</td>
                    <td>As per the <Link href="/refund-policy">Refund Policy</Link></td>
                    <td>Not once paid to the authority</td>
                  </tr>
                </tbody>
              </table>
              <p>
                See typical government fees on our <Link href="/government-fees">government fees page</Link>. Exact amounts depend on your state,
                authorised capital and entity type, so we confirm them in writing before collecting.
              </p>
            </>
          ),
        },
        {
          id: "methods",
          title: "Payment methods",
          body: (
            <>
              <ul>
                {r.paymentMethods.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p>
                Online payments are processed by an RBI-authorised, PCI-DSS compliant payment gateway. We never ask for card numbers, CVV, UPI PIN or
                OTPs over phone, email or WhatsApp — please report any such request to{" "}
                <a href={`mailto:${company.grievanceOfficer.email}`}>{company.grievanceOfficer.email}</a>.
              </p>
              <p>
                Pay only through our website, a payment link sent from an official Filing360 address, or to a bank account in the name of{" "}
                {legalEntity()} printed on our invoice.
              </p>
            </>
          ),
        },
        {
          id: "milestones",
          title: "Advance and milestone payments",
          body: (
            <ul>
              <li>Work starts after the advance ({r.advancePercent}% of the professional fee unless the service page says otherwise) and complete documents are received.</li>
              <li>The balance is due in milestones linked to progress, for example before the main government filing and after the certificate is issued.</li>
              <li>Annual and subscription plans are payable upfront for the period, or monthly where offered.</li>
              <li>If a milestone payment is pending, we may pause the next filing until it is cleared. We will remind you before any statutory due date.</li>
            </ul>
          ),
        },
        {
          id: "invoices",
          title: "GST invoices",
          body: (
            <ul>
              <li>
                A tax invoice is emailed within {r.invoiceWithinDays} working days of each payment
                {hasValue(company.gstin) ? `, issued under our GSTIN ${company.gstin}` : ""}.
              </li>
              <li>
                To claim input tax credit, share your GSTIN and legal name <strong>before</strong> paying. After an invoice is reported in our GST
                return it can be changed only through a credit note.
              </li>
              <li>Government fees are reimbursements paid on your behalf; their official receipts are shared with the invoice.</li>
            </ul>
          ),
        },
        {
          id: "pricing",
          title: "Prices and changes",
          body: (
            <ul>
              <li>All prices are in Indian Rupees.</li>
              <li>The price confirmed at the time of payment applies to that order, even if the listed price changes later.</li>
              <li>Work outside the listed inclusions is quoted separately and started only after you approve the quote.</li>
              <li>Discounts and offers cannot be combined unless stated, and apply only for their stated period.</li>
            </ul>
          ),
        },
        {
          id: "failed",
          title: "Failed, duplicate and disputed payments",
          body: (
            <p>
              If money is debited but the order is not confirmed, the gateway normally reverses it automatically within 5–7 working days. Duplicate
              payments are refunded in full. Write to <a href={`mailto:${company.contact.billingEmail}`}>{company.contact.billingEmail}</a> with the
              transaction reference and we will trace it for you.
            </p>
          ),
        },
      ]}
    />
  );
}
