import Link from "next/link";
import { LegalDocument } from "@/components/site/LegalDocument";
import { commercialRules as r, company } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Refund & Cancellation Policy",
  description: `When Filing360 refunds the ${r.advancePercent}% advance, what happens if a government application is rejected, when work becomes non-refundable, and refund timelines.`,
  path: "/refund-policy",
});

const STAGES = [
  {
    stage: `Within ${r.coolingOffHours} hours of payment, before any work starts`,
    refund: "100% of the professional fee",
  },
  {
    stage: "Work started (document review, drafting, name search) but nothing filed with any authority",
    refund: `Professional fee paid, minus ${r.workStartedRetentionPercent}% of the plan's professional fee for work already done`,
  },
  {
    stage: "After the first application is filed with an authority (for example RUN / SPICe+ name reservation, GST REG-01, DSC application, ITR upload)",
    refund: "The fee for the stage already filed is non-refundable. Fees paid in advance for later stages that have not started are refunded",
  },
  {
    stage: "After the certificate, registration or acknowledgement is issued, or the return is filed",
    refund: "Non-refundable — the service is complete",
  },
  {
    stage: "Annual and subscription plans (for example monthly GST filing, accounting)",
    refund: "Cancel any time; we refund the unused months that have not started, less any discount that applied only to the full term",
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalDocument
      path="/refund-policy"
      intro={`We want you to pay only for work actually done. Most of our services start with a ${r.advancePercent}% advance and the balance is paid in milestones as work progresses. This policy explains what is refundable at each stage.`}
      sections={[
        {
          id: "summary",
          title: "Refunds at each stage",
          body: (
            <>
              <table>
                <thead>
                  <tr>
                    <th>When you cancel</th>
                    <th>What you get back</th>
                  </tr>
                </thead>
                <tbody>
                  {STAGES.map((s) => (
                    <tr key={s.stage}>
                      <td>{s.stage}</td>
                      <td>{s.refund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>
                <strong>Work becomes non-refundable</strong> for a stage the moment an application or return for that stage is submitted to a
                government portal, because the effort has been spent and the government fee has been paid in your name.
              </p>
            </>
          ),
        },
        {
          id: "government-fees",
          title: "Government fees, stamp duty and third-party charges",
          body: (
            <>
              <p>
                Government fees, stamp duty, DSC charges, notary charges and similar amounts are paid to the authority or provider on your behalf.
                Once paid, they are <strong>not refundable by us</strong>, because the authority does not return them. If you paid us for a
                government fee that has not yet been paid out, we refund it in full.
              </p>
              <p>
                Where a government fee is refundable by the authority under its own rules (for example, an unused name-reservation fee in limited
                cases), we will help you apply for it, but the refund is decided and paid by the authority.
              </p>
            </>
          ),
        },
        {
          id: "rejection",
          title: "If a government application is rejected",
          body: (
            <ul>
              <li>
                <strong>Rejected because of our error</strong> (wrong form, wrong data entry, missed attachment): we re-file at no extra professional
                fee and pay any additional government fee caused by our mistake. If re-filing is not possible, we refund the professional fee for
                that service in full.
              </li>
              <li>
                <strong>Name not approved:</strong> up to {r.freeNameProposals} additional name applications are included at no extra professional
                fee. Government re-filing fees, if any, are payable at actuals.
              </li>
              <li>
                <strong>Rejected because of the client&rsquo;s documents, eligibility or information</strong> (for example an invalid address proof,
                mismatched PAN details, or a business that does not qualify): we include {r.freeResubmissions} resubmission once you provide the
                corrected documents. If the application cannot succeed, the professional fee for work already done is non-refundable; advance paid
                for stages not started is refunded.
              </li>
              <li>
                <strong>Rejected for reasons outside anyone&rsquo;s control</strong> (a change in law or policy): we refund the professional fee for
                stages not completed.
              </li>
            </ul>
          ),
        },
        {
          id: "client-delay",
          title: "If documents are not received",
          body: (
            <p>
              If we do not receive the documents or approvals needed to proceed within {r.documentWaitDays} days of our first request, after at least
              two reminders, we may close the engagement. The advance for work already done is then non-refundable; any amount paid for stages not
              started is refunded on request.
            </p>
          ),
        },
        {
          id: "how-to-request",
          title: "How to request a cancellation or refund",
          body: (
            <ol>
              <li>
                Email <a href={`mailto:${company.contact.billingEmail}`}>{company.contact.billingEmail}</a> from your registered email address with
                your order or reference number and the reason.
              </li>
              <li>We confirm receipt within one working day and share the refundable amount with a short breakdown.</li>
              <li>Once you confirm, we stop work and process the refund.</li>
            </ol>
          ),
        },
        {
          id: "timelines",
          title: "Refund timelines",
          body: (
            <ul>
              <li>Approved refunds are initiated within {r.refundProcessingDays} working days of approval.</li>
              <li>
                They are credited to the original payment method. Depending on your bank, the money usually reaches you within {r.refundCreditDays}{" "}
                working days after we initiate it.
              </li>
              {r.gatewayChargesNonRefundable && (
                <li>Payment gateway charges levied on the original transaction are deducted only where the refund is for a reason other than our error.</li>
              )}
              <li>Duplicate or failed payments are refunded in full, without deductions.</li>
              <li>The GST portion of a refund is adjusted through a credit note as required by GST law.</li>
            </ul>
          ),
        },
        {
          id: "disputes",
          title: "Disagreements",
          body: (
            <p>
              If you disagree with a refund decision, write to our <Link href="/grievance-redressal">Grievance Officer</Link>. Please contact us before
              raising a chargeback with your bank — chargebacks freeze the transaction and usually slow down the refund.
            </p>
          ),
        },
      ]}
    />
  );
}
