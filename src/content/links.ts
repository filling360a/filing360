import { formatInr, getService, serviceHref, servicePriceFrom } from "./services";

export type ServiceLink = { href: string; name: string; priceFrom: number | null; priceLabel: string; tagline: string };

/** Resolves "pillar/service" to a link with its starting price; null if the service was removed. */
export function serviceLink(key: string): ServiceLink | null {
  const [pillarSlug, serviceSlug] = key.split("/");
  const found = getService(pillarSlug, serviceSlug);
  if (!found) return null;
  const price = servicePriceFrom(found.service);
  return {
    href: serviceHref(found.pillar, found.service),
    name: found.service.shortName ?? found.service.name,
    priceFrom: price,
    priceLabel: price !== null ? `From ${formatInr(price)}` : "Price on request",
    tagline: found.service.tagline,
  };
}

export function serviceLinks(keys: string[]): ServiceLink[] {
  return keys.map(serviceLink).filter((l): l is ServiceLink => l !== null);
}

type Resource = { label: string; href: string };

const R = {
  docsPvt: { label: "Documents for Pvt Ltd registration", href: "/documents/private-limited-company" },
  docsLlp: { label: "Documents for LLP registration", href: "/documents/llp" },
  docsOpc: { label: "Documents for OPC registration", href: "/documents/opc" },
  docsProp: { label: "Documents for a proprietorship", href: "/documents/proprietorship" },
  docsFirm: { label: "Documents for a partnership firm", href: "/documents/partnership-firm" },
  docsGst: { label: "Documents for GST registration", href: "/documents/gst-registration" },
  docsItr: { label: "Documents for salaried ITR", href: "/documents/itr-salaried" },
  docsItrBiz: { label: "Documents for business ITR", href: "/documents/itr-business" },
  docsMsme: { label: "Documents for Udyam registration", href: "/documents/msme-registration" },
  docsSec8: { label: "Documents for a Section 8 company", href: "/documents/section-8-company" },
  llpVsPvt: { label: "LLP vs Private Limited", href: "/guides/llp-vs-private-limited" },
  opcVsPvt: { label: "OPC vs Private Limited", href: "/guides/opc-vs-private-limited" },
  propVsFirm: { label: "Proprietorship vs Partnership", href: "/guides/proprietorship-vs-partnership" },
  regimes: { label: "Old vs new tax regime", href: "/guides/old-vs-new-tax-regime" },
  composition: { label: "Composition vs regular GST", href: "/guides/composition-vs-regular-gst" },
  chooser: { label: "Business structure chooser", href: "/tools/business-structure-chooser" },
  nameCheck: { label: "Company name checker", href: "/tools/company-name-checker" },
  taxCalc: { label: "Income tax calculator", href: "/tools/income-tax-calculator" },
  hraCalc: { label: "HRA exemption calculator", href: "/tools/hra-calculator" },
  gstCalc: { label: "GST calculator", href: "/tools/gst-calculator" },
  tdsChart: { label: "TDS rate chart", href: "/tools/tds-rate-chart" },
  calendar: { label: "Compliance calendar", href: "/compliance-calendar" },
  govtFees: { label: "Government fees explained", href: "/government-fees" },
  cities: { label: "Company registration by city", href: "/company-registration-in" },
  startups: { label: "Compliance for start-ups", href: "/for/startups" },
  sellers: { label: "GST for e-commerce sellers", href: "/for/ecommerce-sellers" },
  freelancers: { label: "Tax for freelancers", href: "/for/freelancers" },
  ngos: { label: "NGO registration & compliance", href: "/for/ngos" },
} satisfies Record<string, Resource>;

const RESOURCES: Record<string, Resource[]> = {
  "private-limited-company": [R.docsPvt, R.llpVsPvt, R.opcVsPvt, R.nameCheck, R.govtFees, R.cities, R.startups],
  llp: [R.docsLlp, R.llpVsPvt, R.chooser, R.nameCheck, R.govtFees, R.cities],
  opc: [R.docsOpc, R.opcVsPvt, R.chooser, R.nameCheck, R.govtFees],
  proprietorship: [R.docsProp, R.propVsFirm, R.chooser],
  "partnership-firm": [R.docsFirm, R.propVsFirm, R.llpVsPvt, R.chooser],
  "section-8-company": [R.docsSec8, R.ngos, R.nameCheck],
  "trust-registration": [R.ngos, R.docsSec8],
  "msme-registration": [R.docsMsme, R.startups],
  "startup-india-dpiit": [R.startups, R.docsPvt],
  "gst-registration": [R.docsGst, R.composition, R.gstCalc, R.sellers, R.calendar],
  "gst-composition-scheme": [R.composition, R.docsGst, R.calendar],
  "gst-return-filing-regular": [R.calendar, R.gstCalc, R.composition],
  "gst-return-filing-composition": [R.composition, R.calendar],
  "gst-return-filing-freelancer": [R.freelancers, R.calendar],
  "gst-return-filing-online-seller": [R.sellers, R.calendar],
  "gst-lut-filing": [R.freelancers, R.calendar],
  "gst-annual-return-filing": [R.calendar],
  "gst-amendment": [R.docsGst, R.calendar],
  "gst-cancellation": [R.calendar],
  "gst-revocation": [R.calendar],
  "gst-notice-reply": [R.calendar],
  "gst-refund": [R.freelancers, R.calendar],
  "itr-filing-individual": [R.docsItr, R.taxCalc, R.regimes, R.hraCalc, R.calendar],
  "itr-filing-sole-proprietorship": [R.docsItrBiz, R.freelancers, R.taxCalc, R.calendar],
  "itr-filing-company": [R.calendar, R.tdsChart],
  "tax-planning": [R.regimes, R.taxCalc, R.hraCalc],
  "tds-return-filing": [R.tdsChart, R.calendar],
  "tax-audit": [R.calendar, R.docsItrBiz],
  "company-compliance": [R.calendar, R.govtFees],
  "llp-compliance": [R.calendar, R.govtFees],
  "opc-compliance": [R.calendar, R.govtFees],
};

export function serviceResources(pillarSlug: string, serviceSlug: string): Resource[] {
  return RESOURCES[serviceSlug] ?? (pillarSlug === "mca" ? [R.calendar, R.govtFees] : []);
}

export const KEY = {
  pvtLtd: "startup/private-limited-company",
  llp: "startup/llp",
  opc: "startup/opc",
  proprietorship: "startup/proprietorship",
  partnership: "startup/partnership-firm",
  section8: "startup/section-8-company",
  trust: "startup/trust-registration",
  msme: "startup/msme-registration",
  dpiit: "startup/startup-india-dpiit",
  subsidiary: "startup/indian-subsidiary",
  gstReg: "gst/gst-registration",
  gstReturns: "gst/gst-return-filing-regular",
  gstComposition: "gst/gst-return-filing-composition",
  gstFreelancer: "gst/gst-return-filing-freelancer",
  gstSeller: "gst/gst-return-filing-online-seller",
  gstLut: "gst/gst-lut-filing",
  gstApplicability: "gst/gst-applicability-evaluation",
  gstCompositionOpt: "gst/gst-composition-scheme",
  gstCancel: "gst/gst-cancellation",
  gstNotice: "gst/gst-notice-reply",
  gstRefund: "gst/gst-refund",
  itrIndividual: "income-tax/itr-filing-individual",
  itrProprietor: "income-tax/itr-filing-sole-proprietorship",
  itrCompany: "income-tax/itr-filing-company",
  itrTrust: "income-tax/itr-filing-trust-ngo",
  tds: "income-tax/tds-return-filing",
  taxPlanning: "income-tax/tax-planning",
  taxNotice: "income-tax/income-tax-notice",
  taxAudit: "income-tax/tax-audit",
  panTan: "income-tax/pan-tan-registration",
  companyCompliance: "mca/company-compliance",
  llpCompliance: "mca/llp-compliance",
  opcCompliance: "mca/opc-compliance",
  inc20a: "mca/commencement-inc-20a",
  accounting: "accounting/accounting-bookkeeping",
  consultation: "consultation/expert-consultation",
} as const;
