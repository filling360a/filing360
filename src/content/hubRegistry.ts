import {
  ACCOUNTING_HUB_PATH,
  ACCOUNTING_HUB_UPDATED,
  ACC,
  accountingArticle,
  accountingFaqs,
  accountingHubMeta,
  accountingPackages,
  accountingToc,
} from "./accountingHub";
import {
  FUNDS,
  FUNDS_HUB_PATH,
  FUNDS_HUB_UPDATED,
  fundsArticle,
  fundsFaqs,
  fundsHubMeta,
  fundsPackages,
  fundsToc,
} from "./fundsHub";
import {
  IT,
  IT_HUB_PATH,
  IT_HUB_UPDATED,
  incomeTaxArticle,
  incomeTaxFaqs,
  incomeTaxHubMeta,
  incomeTaxPackages,
  incomeTaxToc,
} from "./incomeTaxHub";
import {
  MCA,
  MCA_HUB_PATH,
  MCA_HUB_UPDATED,
  mcaArticle,
  mcaFaqs,
  mcaHubMeta,
  mcaPackages,
  mcaToc,
} from "./mcaHub";
import {
  OTHER,
  OTHER_HUB_PATH,
  OTHER_HUB_UPDATED,
  otherServicesArticle,
  otherServicesFaqs,
  otherServicesHubMeta,
  otherServicesPackages,
  otherServicesToc,
} from "./otherServicesHub";
import {
  STARTUP,
  STARTUP_HUB_PATH,
  STARTUP_HUB_UPDATED,
  startupArticle,
  startupFaqs,
  startupHubMeta,
  startupPackages,
  startupToc,
} from "./startupHub";
import type { HubMeta, HubPackageRow, HubTocItem, SeoBlock } from "./seoTypes";

export type PillarHubConfig = {
  path: string;
  updated: string;
  meta: HubMeta;
  toc: HubTocItem[];
  packages: HubPackageRow[];
  packageTitle: string;
  article: SeoBlock[];
  faqs: { q: string; a: string }[];
  heroLead: string;
  primaryHref: string;
  primaryLabel: string;
  whatsappMessage: string;
  ctaTitle: string;
  ctaBody: string;
  imageAlt: string;
  priceFromLabel?: string;
};

const hubs: Record<string, PillarHubConfig> = {
  "income-tax": {
    path: IT_HUB_PATH,
    updated: IT_HUB_UPDATED,
    meta: incomeTaxHubMeta,
    toc: incomeTaxToc,
    packages: incomeTaxPackages,
    packageTitle: "Our income tax packages",
    article: incomeTaxArticle,
    faqs: incomeTaxFaqs,
    heroLead:
      "From a salaried employee’s ITR to a company’s tax audit, Filing360’s Chartered Accountants file returns accurately, choose the right tax regime, handle TDS compliance, reply to notices and plan taxes legally.",
    primaryHref: IT.individual,
    primaryLabel: "File My ITR",
    whatsappMessage: "Hi Filing360, I need help with income tax.",
    ctaTitle: "File your ITR with a Chartered Accountant",
    ctaBody: "Talk to a CA free for 15 minutes. We’ll tell you the right form, regime and fee before you pay.",
    imageAlt: "Income tax filing by Filing360",
    priceFromLabel: "Plans from ₹999",
  },
  mca: {
    path: MCA_HUB_PATH,
    updated: MCA_HUB_UPDATED,
    meta: mcaHubMeta,
    toc: mcaToc,
    packages: mcaPackages,
    packageTitle: "Our MCA packages",
    article: mcaArticle,
    faqs: mcaFaqs,
    heroLead:
      "Annual ROC compliance and event-based MCA filings for companies and LLPs — handled by Chartered Accountants and Company Secretaries at transparent prices.",
    primaryHref: MCA.company,
    primaryLabel: "Get ROC Compliance Done",
    whatsappMessage: "Hi Filing360, I need help with MCA / ROC compliance.",
    ctaTitle: "Stay ROC compliant without the chase",
    ctaBody: "Get a free checklist of filings due for your company or LLP this year.",
    imageAlt: "MCA and ROC compliance by Filing360",
    priceFromLabel: "Compliance from ₹19,899/year",
  },
  accounting: {
    path: ACCOUNTING_HUB_PATH,
    updated: ACCOUNTING_HUB_UPDATED,
    meta: accountingHubMeta,
    toc: accountingToc,
    packages: accountingPackages,
    packageTitle: "Our accounting & Ind AS packages",
    article: accountingArticle,
    faqs: accountingFaqs,
    heroLead:
      "Bookkeeping, MIS, Virtual CFO support and Ind AS advisory — so your numbers stay clean and decision-ready as you grow.",
    primaryHref: ACC.books,
    primaryLabel: "Get a Free Consultation",
    whatsappMessage: "Hi Filing360, I need help with accounting / MIS.",
    ctaTitle: "Get clean books and clearer decisions",
    ctaBody: "Talk to a Chartered Accountant about bookkeeping, MIS or Ind AS — no obligation.",
    imageAlt: "Accounting and MIS services by Filing360",
    priceFromLabel: "Bookkeeping from ₹3,000/month",
  },
  funds: {
    path: FUNDS_HUB_PATH,
    updated: FUNDS_HUB_UPDATED,
    meta: fundsHubMeta,
    toc: fundsToc,
    packages: fundsPackages,
    packageTitle: "Our project finance packages",
    article: fundsArticle,
    faqs: fundsFaqs,
    heroLead:
      "Bank-ready CMA data, detailed project reports and TEV studies by Chartered Accountants — from proposal to sanction support.",
    primaryHref: FUNDS.cma,
    primaryLabel: "Get My Loan Proposal Ready",
    whatsappMessage: "Hi Filing360, I need help with CMA / project finance.",
    ctaTitle: "Make your loan proposal bank-ready",
    ctaBody: "Share your project outline and we’ll recommend CMA, DPR or TEV — with a clear fee.",
    imageAlt: "Project finance and CMA services by Filing360",
  },
  startup: {
    path: STARTUP_HUB_PATH,
    updated: STARTUP_HUB_UPDATED,
    meta: startupHubMeta,
    toc: startupToc,
    packages: startupPackages,
    packageTitle: "Our startup packages",
    article: startupArticle,
    faqs: startupFaqs,
    heroLead:
      "Every successful business starts with the right foundation: structure, registrations and recognitions. Filing360 helps founders choose, register and set up compliance from day one.",
    primaryHref: STARTUP.pvt,
    primaryLabel: "Start My Business",
    whatsappMessage: "Hi Filing360, I need help registering my startup.",
    ctaTitle: "Launch with the right structure",
    ctaBody: "Talk to an expert free — we’ll recommend company, LLP or proprietorship before you pay.",
    imageAlt: "Startup registration services by Filing360",
    priceFromLabel: `Plans from ₹3,000`,
  },
  "other-services": {
    path: OTHER_HUB_PATH,
    updated: OTHER_HUB_UPDATED,
    meta: otherServicesHubMeta,
    toc: otherServicesToc,
    packages: otherServicesPackages,
    packageTitle: "Our digital packages",
    article: otherServicesArticle,
    faqs: otherServicesFaqs,
    heroLead:
      "Be found, trusted and chosen online. Filing360 builds websites that convert, ranks you on Google, and runs ads you can measure — alongside your compliance work.",
    primaryHref: OTHER.website,
    primaryLabel: "Get a Free Digital Audit",
    whatsappMessage: "Hi Filing360, I need help with website / SEO / ads.",
    ctaTitle: "Get a free digital audit",
    ctaBody: "Share your site or goals and we’ll outline website, SEO or ads next steps — with clear fees.",
    imageAlt: "Website SEO and digital marketing by Filing360",
    priceFromLabel: "Plans from ₹2,499",
  },
};

export function getPillarHub(slug: string): PillarHubConfig | undefined {
  return hubs[slug];
}
