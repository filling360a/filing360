import Link from "next/link";
import { LegalDocument } from "@/components/site/LegalDocument";
import { company, hasValue, legalEntity } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Grievance Redressal & Grievance Officer",
  description:
    "How to raise a complaint with Filing360, contact details of our Grievance Officer, and response times under the IT Rules, 2021 and the DPDP Act, 2023.",
  path: "/grievance-redressal",
});

export default function GrievancePage() {
  const g = company.grievanceOfficer;
  return (
    <LegalDocument
      path="/grievance-redressal"
      intro="If something has gone wrong, we want to fix it quickly. This page explains how to reach us and how complaints are handled, in line with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the Digital Personal Data Protection Act, 2023 and the Consumer Protection (E-Commerce) Rules, 2020."
      sections={[
        {
          id: "officer",
          title: "Grievance Officer",
          body: (
            <table>
              <tbody>
                {hasValue(g.name) && (
                  <tr>
                    <th>Name</th>
                    <td>{g.name}</td>
                  </tr>
                )}
                <tr>
                  <th>Designation</th>
                  <td>{g.designation}, {legalEntity()}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td><a href={`mailto:${g.email}`}>{g.email}</a></td>
                </tr>
                {hasValue(g.phone) && (
                  <tr>
                    <th>Phone</th>
                    <td><a href={`tel:${g.phone.replace(/\s/g, "")}`}>{g.phone}</a></td>
                  </tr>
                )}
                <tr>
                  <th>Hours</th>
                  <td>{company.hours.label}</td>
                </tr>
              </tbody>
            </table>
          ),
        },
        {
          id: "how",
          title: "How to raise a complaint",
          body: (
            <>
              <p>Email the Grievance Officer with:</p>
              <ul>
                <li>your name, registered mobile number and email;</li>
                <li>your order or reference number (for example F360-1234), if any;</li>
                <li>what happened, when, and what outcome you are looking for;</li>
                <li>copies of any relevant messages or documents.</li>
              </ul>
              <p>
                For a quicker resolution of routine service questions, you can first contact support at{" "}
                <a href={`mailto:${company.contact.supportEmail}`}>{company.contact.supportEmail}</a> or {company.contact.phoneDisplay}.
              </p>
            </>
          ),
        },
        {
          id: "timelines",
          title: "Response times",
          body: (
            <ul>
              <li>We acknowledge every complaint within <strong>{g.acknowledgeWithinHours} hours</strong> and give you a complaint number.</li>
              <li>We aim to resolve it within <strong>{g.resolveWithinDays} days</strong> of receipt, and keep you updated if more time is genuinely needed.</li>
              <li>Requests about your personal data (access, correction, erasure, withdrawal of consent) are handled within the same time frame.</li>
            </ul>
          ),
        },
        {
          id: "escalation",
          title: "If you are not satisfied",
          body: (
            <ul>
              <li>
                <strong>Personal data complaints</strong> — after using our process, you may approach the Data Protection Board of India under the DPDP
                Act, 2023.
              </li>
              <li>
                <strong>Consumer complaints</strong> — you may contact the National Consumer Helpline (1915 or{" "}
                <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer">consumerhelpline.gov.in</a>) or file a complaint
                with the appropriate consumer commission through{" "}
                <a href="https://edaakhil.nic.in" target="_blank" rel="noopener noreferrer">e-Daakhil</a>.
              </li>
              <li>Contract disputes are handled as described in our <Link href="/terms">Terms of Use</Link>.</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
