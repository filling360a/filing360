import { company, fullAddress, hasValue, legalEntity } from "@/content/company";

function rows() {
  const address = fullAddress();
  return [
    { label: "Legal name", value: legalEntity() },
    { label: "CIN", value: company.cin },
    { label: "GSTIN", value: company.gstin },
    { label: "Registered office", value: address },
    { label: "Email", value: company.contact.email, href: `mailto:${company.contact.email}` },
    { label: "Phone", value: company.contact.phoneDisplay, href: `tel:${company.contact.phone.replace(/\s/g, "")}` },
    { label: "Grievance Officer", value: company.grievanceOfficer.email, href: `mailto:${company.grievanceOfficer.email}` },
  ].filter((r) => hasValue(r.value));
}

export function CompanyDetails() {
  return (
    <dl className="grid gap-x-8 gap-y-4 rounded-2xl border border-[#d7e4de] bg-white p-5 text-[15px] sm:grid-cols-2 md:p-6 lg:grid-cols-3">
      {rows().map((r) => (
        <div key={r.label} className="min-w-0">
          <dt className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[#5b6e7a]">{r.label}</dt>
          <dd className="mt-1 break-words text-[#0f2a45]">
            {r.href ? (
              <a href={r.href} className="hover:text-[#0e7b5b]">{r.value}</a>
            ) : (
              r.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** One-line legal identity for the footer. */
export function CompanyStrip() {
  const parts = [legalEntity(), hasValue(company.cin) ? `CIN ${company.cin}` : "", hasValue(company.gstin) ? `GSTIN ${company.gstin}` : "", fullAddress()].filter(
    hasValue,
  );
  return <p className="text-[13px] leading-relaxed text-white/45">{parts.join(" · ")}</p>;
}
