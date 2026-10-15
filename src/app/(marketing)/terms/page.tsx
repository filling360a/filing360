import Link from "next/link";
import { LegalDocument } from "@/components/site/LegalDocument";
import { commercialRules, company, hasValue, legalEntity } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms that govern the use of the Filing360 website and its registration, tax and compliance services in India.",
  path: "/terms",
});

export default function TermsPage() {
  const entity = legalEntity();
  return (
    <LegalDocument
      path="/terms"
      intro={`These Terms of Use form a binding agreement between you and ${entity} ("Filing360", "we", "us") for using filing360.in and any service you buy from us. Please read them together with our Privacy Policy, Refund Policy and Payment Terms.`}
      sections={[
        {
          id: "about",
          title: "Who we are",
          body: (
            <>
              <p>
                Filing360 is operated by {entity}
                {hasValue(company.entityDescription) ? `, ${company.entityDescription}` : ""}
                {hasValue(company.cin) ? ` (CIN ${company.cin})` : ""}. We are a <strong>private, technology-enabled facilitation platform</strong> that
                helps individuals and businesses complete registrations, tax filings and regulatory compliance in India.
              </p>
              <p>
                We are <strong>not a government body</strong> and are not affiliated with the Ministry of Corporate Affairs, GSTN, the Income Tax
                Department or any other authority. Registrations, certificates and approvals are issued only by the relevant authority. Work
                that legally requires a Chartered Accountant, Company Secretary or Advocate is performed or certified by independent qualified
                professionals engaged by us.
              </p>
            </>
          ),
        },
        {
          id: "acceptance",
          title: "Accepting these terms",
          body: (
            <>
              <p>
                By using the website, submitting a form, or paying for a service, you confirm that you have read and accept these Terms. If you
                are acting for a company, firm or other organisation, you confirm that you are authorised to bind it.
              </p>
              <p>You must be at least 18 years old and legally able to enter into a contract under the Indian Contract Act, 1872.</p>
            </>
          ),
        },
        {
          id: "services",
          title: "Our services",
          body: (
            <>
              <p>
                The scope of each service is what is listed under &ldquo;inclusions&rdquo; on its page, in your quotation, or in your written
                order confirmation. Anything outside that scope — for example department visits, replies to notices, additional filings or
                revisions requested after approval — is quoted separately before we start.
              </p>
              <p>
                Information on the website (including guides, calculators, compliance calendars and FAQs) is general information, not legal or tax
                advice for your specific situation. Advice specific to you is given only during a paid or free consultation, based on the facts
                you share.
              </p>
            </>
          ),
        },
        {
          id: "your-responsibilities",
          title: "Your responsibilities",
          body: (
            <>
              <ul>
                <li>Give us information and documents that are true, complete, current and belong to you or to people who have authorised you.</li>
                <li>Obtain consent from every director, partner, member, nominee or other person whose personal data you share with us.</li>
                <li>Respond to our requests for documents, OTPs, signatures and clarifications in time — delays on your side extend timelines.</li>
                <li>Review drafts, forms and returns we share before you approve them. Filings are made on your behalf and in your name.</li>
                <li>Keep your login credentials, OTPs and Digital Signature Certificate (DSC) secure and tell us at once if you suspect misuse.</li>
                <li>Pay government fees, taxes, interest and penalties that are legally your liability.</li>
              </ul>
              <p>
                We rely on what you give us. We are not responsible for consequences of false, forged, incomplete or misleading information, and we
                may stop work and report the matter to authorities where the law requires.
              </p>
            </>
          ),
        },
        {
          id: "acceptable-use",
          title: "Acceptable use of the website",
          body: (
            <>
              <p>You agree not to:</p>
              <ul>
                <li>use the website for any unlawful purpose, or to register an entity for money laundering, fraud or any illegal activity;</li>
                <li>impersonate anyone or submit someone else&rsquo;s identity documents without authority;</li>
                <li>attempt to gain unauthorised access to our systems, scrape the website at scale, or interfere with its security or performance;</li>
                <li>upload malware, or use automated tools to submit forms;</li>
                <li>copy, resell or republish our content, pricing or tools without written permission.</li>
              </ul>
              <p>We may suspend access or refuse service where we reasonably believe these rules have been broken.</p>
            </>
          ),
        },
        {
          id: "fees",
          title: "Fees, payments and refunds",
          body: (
            <p>
              Professional fees, GST and government fees are charged as described in our{" "}
              <Link href="/payment-terms">Payment Terms &amp; Pricing Policy</Link>. Cancellations and refunds follow our{" "}
              <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>, and timelines follow our{" "}
              <Link href="/service-delivery-policy">Service Delivery Policy</Link>. These policies form part of these Terms.
            </p>
          ),
        },
        {
          id: "outcomes",
          title: "Government decisions and timelines",
          body: (
            <p>
              Approvals depend on the authority concerned. We do not guarantee that a name, registration, licence, refund or any other application
              will be approved, or approved within a specific time. Portal outages, departmental queries, policy changes and holidays are outside our
              control. We will keep you informed and act promptly on any query raised.
            </p>
          ),
        },
        {
          id: "communications",
          title: "Calls, WhatsApp and email",
          body: (
            <p>
              When you submit a form or buy a service, you authorise us and our professionals to contact you by phone, SMS, WhatsApp and email about
              your request — even if your number is registered on the National Do Not Call registry. Marketing messages are sent only with your
              consent, and you can opt out at any time by replying STOP or writing to {company.contact.supportEmail}.
            </p>
          ),
        },
        {
          id: "confidentiality",
          title: "Confidentiality and data protection",
          body: (
            <p>
              We keep your documents and information confidential and use them only to deliver the service, to meet legal obligations, and as set
              out in our <Link href="/privacy">Privacy Policy</Link>. Our professionals and service providers are bound by confidentiality
              obligations.
            </p>
          ),
        },
        {
          id: "ip",
          title: "Intellectual property",
          body: (
            <p>
              The website, its design, text, graphics, tools and the Filing360 name and logo belong to {entity} or its licensors. You may view and
              print pages for personal, non-commercial use. Government forms, names and logos belong to the respective authorities and are used only
              for identification.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Limitation of liability",
          body: (
            <>
              <p>To the extent permitted by law:</p>
              <ul>
                <li>
                  Our total liability for any claim relating to a service is limited to the <strong>professional fees you paid us for that specific
                  service</strong> in the twelve months before the claim arose.
                </li>
                <li>
                  We are not liable for indirect, incidental or consequential losses, such as loss of profit, business opportunity or goodwill, or for
                  penalties and interest caused by delayed or inaccurate information from you.
                </li>
                <li>We are not liable for delays or failures caused by government portals, authorities, banks, payment gateways or events beyond our control.</li>
              </ul>
              <p>
                Where a delay, penalty or loss is caused by our proven error, we will correct the filing at no extra professional fee and
                reimburse late fees or penalties directly caused by that error, within the limit above.
              </p>
              <p>Nothing in these Terms limits rights you have under the Consumer Protection Act, 2019 that cannot be excluded by contract.</p>
            </>
          ),
        },
        {
          id: "indemnity",
          title: "Indemnity",
          body: (
            <p>
              You agree to indemnify {entity}, its directors, employees and professionals against claims, penalties and costs arising from information
              or documents you supplied that were false or unauthorised, or from your breach of these Terms or of applicable law.
            </p>
          ),
        },
        {
          id: "termination",
          title: "Suspension and termination",
          body: (
            <p>
              You may cancel a service as set out in the Refund Policy. We may stop work on a service if you do not provide required documents or
              payment for {commercialRules.documentWaitDays} days after reminders, if information appears false, or if continuing would breach the law or professional ethics. Fees
              for work already completed remain payable.
            </p>
          ),
        },
        {
          id: "disputes",
          title: "Governing law and disputes",
          body: (
            <>
              <p>These Terms are governed by the laws of India.</p>
              <p>
                If you have a complaint, please first use our <Link href="/grievance-redressal">grievance redressal process</Link> — most issues are
                resolved there. If a dispute is not resolved within 30 days of written notice, either party may refer it to arbitration by a sole
                arbitrator under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration will be {company.jurisdictionCity}, and
                proceedings will be in English.
              </p>
              <p>
                Subject to arbitration, the courts at {company.jurisdictionCity} have exclusive jurisdiction. This does not take away your right to
                approach a consumer commission under the Consumer Protection Act, 2019.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes to these terms",
          body: (
            <p>
              We may update these Terms from time to time. The date at the top shows when they last changed. Changes apply to services bought after
              that date; services already paid for continue under the Terms in force when you paid, unless the law requires otherwise.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about these Terms: <a href={`mailto:${company.contact.supportEmail}`}>{company.contact.supportEmail}</a>. Complaints:{" "}
              <Link href="/grievance-redressal">Grievance Officer</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
