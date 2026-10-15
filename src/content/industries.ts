import { KEY } from "./links";

export type Industry = {
  slug: string;
  name: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  structure: { heading: string; body: string };
  compliance: { title: string; body: string }[];
  services: string[];
  guides: string[];
  faqs: { q: string; a: string }[];
};

export const industries: Industry[] = [
  {
    slug: "startups",
    name: "Start-ups",
    title: "Registration, tax & compliance for start-ups",
    metaTitle: "Start-up Registration & Compliance in India — Pvt Ltd, DPIIT, ESOPs",
    description:
      "Everything an Indian start-up needs: private limited registration, DPIIT recognition, GST, ESOP-ready documents, annual ROC compliance and founder tax planning.",
    intro:
      "From incorporation to your first funding round, we handle the paperwork so founders can focus on product and customers.",
    structure: {
      heading: "Start as a private limited company",
      body: "Investors buy shares and expect a private limited company with clean cap tables and board processes. It's also the only common structure that can issue ESOPs. Solo founders can begin as an OPC and convert when a co-founder or investor joins.",
    },
    compliance: [
      { title: "DPIIT recognition", body: "Recognised start-ups get self-certification under several labour and environment laws, faster patent examination, and may apply for a three-year income tax holiday if eligible." },
      { title: "Post-incorporation", body: "Commencement of business (INC-20A) within 180 days, auditor appointment within 30 days, statutory registers and share certificates." },
      { title: "Fundraising", body: "Board and shareholder resolutions, valuation reports, PAS-3 filings for allotments, and FC-GPR reporting to RBI for foreign investment." },
      { title: "Annual compliance", body: "Board meetings, AGM, AOC-4, MGT-7/7A, DIR-3 KYC, income tax return, TDS returns and GST returns." },
    ],
    services: [KEY.pvtLtd, KEY.opc, KEY.dpiit, KEY.gstReg, KEY.companyCompliance, KEY.accounting],
    guides: ["llp-vs-private-limited", "opc-vs-private-limited"],
    faqs: [
      { q: "Do start-ups still pay angel tax?", a: "No. The angel tax provision that taxed share premium above fair value was abolished for all classes of investors from FY 2024-25." },
      { q: "When should we apply for DPIIT recognition?", a: "Right after incorporation. You'll need a short write-up on your innovation and a pitch deck or website. Recognition is free." },
      { q: "Can a foreign co-founder hold shares?", a: "Yes, under the automatic route in most sectors. The allotment must be reported to RBI and pricing must follow FEMA valuation rules." },
    ],
  },
  {
    slug: "ecommerce-sellers",
    name: "E-commerce sellers",
    title: "GST & tax compliance for e-commerce sellers",
    metaTitle: "GST Registration & Returns for Amazon, Flipkart & Meesho Sellers",
    description:
      "GST registration, marketplace TCS reconciliation, GST returns and income tax for sellers on Amazon, Flipkart, Meesho and other marketplaces.",
    intro:
      "Selling online means GST from the first sale, TCS credits to reconcile every month and, often, registrations in more than one state. We keep it clean.",
    structure: {
      heading: "Proprietorship to start, company to scale",
      body: "Most sellers begin as proprietorships with a GSTIN in their own name. As turnover and inventory grow, an LLP or private limited company limits personal liability and makes it easier to raise working capital.",
    },
    compliance: [
      { title: "GST registration", body: "Sellers of goods on marketplaces generally need GST registration regardless of turnover. Limited exemptions apply only for small intra-state sellers, subject to conditions." },
      { title: "Additional places of business", body: "If a marketplace stores your stock in warehouses in other states, you need a GST registration in each of those states." },
      { title: "TCS and TDS by marketplaces", body: "Marketplaces collect GST TCS and deduct income tax TDS on your payouts. Both must be reconciled and claimed in your returns, or you lose the money." },
      { title: "Returns and reconciliation", body: "GSTR-1 and GSTR-3B monthly or quarterly, matching marketplace sales reports, returns and cancellations." },
    ],
    services: [KEY.gstReg, KEY.gstSeller, KEY.proprietorship, KEY.itrProprietor, KEY.accounting],
    guides: ["composition-vs-regular-gst", "proprietorship-vs-partnership"],
    faqs: [
      { q: "Can I sell on Amazon without GST?", a: "Only in narrow cases — mainly certain intra-state sellers below the threshold under specific conditions. For most sellers, especially anyone selling across states, GST registration is required." },
      { q: "How do I claim TCS collected by the marketplace?", a: "It appears in your electronic cash ledger after you accept it on the GST portal. We reconcile it monthly against marketplace reports." },
      { q: "Can I use the composition scheme as an online seller?", a: "Yes, for supplies of goods within your own state, subject to conditions. Inter-state sales aren't allowed under composition." },
    ],
  },
  {
    slug: "freelancers",
    name: "Freelancers",
    title: "Tax & GST for freelancers and consultants",
    metaTitle: "Freelancer Tax Filing & GST in India — Presumptive Tax, LUT, ITR",
    description:
      "Income tax filing, presumptive taxation, advance tax, GST registration and LUT for freelancers, consultants and creators working with Indian and foreign clients.",
    intro:
      "Designers, developers, writers, consultants and creators — we help you pay the right tax, claim TDS, handle foreign income and stay GST-compliant.",
    structure: {
      heading: "Most freelancers don't need a company",
      body: "You can work in your own name as a proprietor. Consider an LLP or company once income is high enough that a flat corporate rate beats your slab rate, or when clients prefer contracting with an entity.",
    },
    compliance: [
      { title: "Presumptive taxation", body: "Eligible professionals with receipts up to ₹75 lakh (when cash receipts are within 5%) can declare 50% of receipts as profit and skip detailed books." },
      { title: "Advance tax", body: "If your tax for the year exceeds ₹10,000, pay advance tax in instalments — or a single instalment by 15 March under presumptive taxation." },
      { title: "GST threshold", body: "GST registration is required once service turnover crosses ₹20 lakh in a year (₹10 lakh in some special-category states), including export income." },
      { title: "Foreign clients", body: "Export of services is zero-rated under GST. File an LUT each year to invoice without IGST, and keep bank remittance advices for each foreign payment." },
    ],
    services: [KEY.itrProprietor, KEY.gstFreelancer, KEY.gstReg, KEY.gstLut, KEY.taxPlanning],
    guides: ["old-vs-new-tax-regime", "proprietorship-vs-partnership"],
    faqs: [
      { q: "Do I need GST if all my clients are abroad?", a: "Export income counts towards the ₹20 lakh threshold. Once you cross it you must register, but exports are zero-rated — with an LUT you charge no GST." },
      { q: "Which ITR form do freelancers file?", a: "ITR-4 if you opt for presumptive taxation (and meet the conditions), otherwise ITR-3." },
      { q: "Clients deducted TDS from my payments. How do I get it back?", a: "TDS shows up in your Form 26AS and AIS. It's credited against your tax when you file your return, and any excess is refunded." },
    ],
  },
  {
    slug: "ngos",
    name: "NGOs & non-profits",
    title: "NGO registration and compliance",
    metaTitle: "NGO Registration in India — Section 8, Trust, Society, 12A & 80G",
    description:
      "Register an NGO as a Section 8 company, trust or society, get 12A and 80G tax exemptions, CSR-1 registration and handle annual compliance.",
    intro:
      "Whether you're starting a foundation, a school or a community project, the right structure and tax registrations make it easier to raise funds and stay compliant.",
    structure: {
      heading: "Section 8 company, trust or society",
      body: "A Section 8 company is the most credible structure for CSR funding and institutional donors, with clear governance under the Companies Act. Trusts are simpler and suit family or small charitable activities; societies suit member-based organisations.",
    },
    compliance: [
      { title: "12A and 80G", body: "12A registration exempts the NGO's surplus from income tax; 80G lets donors claim a deduction. New NGOs get provisional registration, converted to regular after starting activities." },
      { title: "CSR-1 registration", body: "Needed to receive CSR funds from companies. Filed with the MCA after 12A and 80G are in place." },
      { title: "Foreign contributions", body: "Receiving any foreign donation requires FCRA registration or prior permission from the Ministry of Home Affairs." },
      { title: "Annual compliance", body: "Audited accounts, income tax return, Form 10B/10BB audit reports, donation statements (Form 10BD) and MCA filings for Section 8 companies." },
    ],
    services: [KEY.section8, KEY.trust, KEY.itrTrust, KEY.accounting],
    guides: [],
    faqs: [
      { q: "Which is better: Section 8 company or trust?", a: "For CSR funding, foreign grants and larger operations, a Section 8 company is usually preferred for its governance and credibility. A trust is quicker and cheaper for smaller, closely managed charities." },
      { q: "Can an NGO pay salaries to its founders?", a: "Reasonable remuneration for work actually done is allowed, but profits can't be distributed to members, and payments to related persons are scrutinised for tax exemption." },
      { q: "How long are 12A and 80G registrations valid?", a: "Provisional registration is valid for three years; regular registration is valid for five years and must then be renewed." },
    ],
  },
  {
    slug: "doctors",
    name: "Doctors & clinics",
    title: "Tax & compliance for doctors and clinics",
    metaTitle: "Income Tax & Compliance for Doctors and Clinics in India",
    description:
      "Income tax filing, presumptive taxation, GST position, practice structure (proprietorship, partnership, LLP) and accounting for doctors, clinics and diagnostic centres.",
    intro:
      "Consultation fees, hospital retainers, clinic income and pharmacy sales are taxed differently. We help doctors claim every legitimate deduction and stay compliant.",
    structure: {
      heading: "Choosing a practice structure",
      body: "Most doctors practise as proprietors. Group practices often use a partnership or LLP. Larger hospitals, diagnostic chains and day-care centres typically use a private limited company to bring in investors and manage liability.",
    },
    compliance: [
      { title: "Professional income", body: "Eligible professionals with receipts up to ₹75 lakh (when cash receipts are within 5%) can use presumptive taxation. Otherwise, books must be maintained and audited above the threshold." },
      { title: "GST position", body: "Healthcare services by clinical establishments and registered medical practitioners are exempt from GST. Medicines sold through an in-house pharmacy, cosmetic procedures and rent can be taxable." },
      { title: "TDS", body: "Hospitals deduct TDS on retainer and visiting fees. It must match your Form 26AS when you file." },
      { title: "Local registrations", body: "Clinical establishment registration and bio-medical waste authorisation depend on your state's rules." },
    ],
    services: [KEY.itrProprietor, KEY.taxPlanning, KEY.accounting, KEY.llp, KEY.taxAudit],
    guides: ["old-vs-new-tax-regime", "llp-vs-private-limited"],
    faqs: [
      { q: "Do doctors need GST registration?", a: "Not for exempt healthcare services. If you also make taxable supplies — like pharmacy sales or cosmetic treatments — above the threshold, registration may be required." },
      { q: "Can a salaried doctor with private practice choose the old regime?", a: "Yes, but people with business or professional income can switch back from the new regime to the old only once, so plan the choice carefully." },
      { q: "Is a tax audit required for my clinic?", a: "A tax audit applies when professional receipts exceed the audit threshold, or when you declare profits below the presumptive rate while income exceeds the basic exemption." },
    ],
  },
];

export const industryHref = (i: Pick<Industry, "slug">) => `/for/${i.slug}`;
export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
