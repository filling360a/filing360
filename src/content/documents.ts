import { KEY } from "./links";

export type Checklist = {
  slug: string;
  name: string;
  service: string;
  intro: string;
  groups: { title: string; items: { name: string; note?: string }[] }[];
  tips: string[];
};

const DIRECTOR_KYC = {
  title: "For each director / partner",
  items: [
    { name: "PAN card", note: "Mandatory for Indian nationals. Name must match other documents." },
    { name: "Aadhaar card", note: "Used for DSC verification and as identity proof." },
    { name: "Address proof", note: "Bank statement, electricity, phone or mobile bill — not older than two months." },
    { name: "Passport-size photograph", note: "Recent, plain background." },
    { name: "Email ID and mobile number", note: "Unique to each person — used for OTPs and DIN." },
    { name: "Passport (foreign nationals / NRIs)", note: "Notarised and apostilled or consularised, with overseas address proof." },
  ],
};

const OFFICE_PROOF = {
  title: "Registered office",
  items: [
    { name: "Utility bill", note: "Electricity, water, gas or telephone bill not older than two months, in the owner's name." },
    { name: "Rent or lease agreement", note: "If the premises are rented." },
    { name: "No-objection certificate (NOC)", note: "From the property owner, allowing use as the registered office." },
  ],
};

export const checklists: Checklist[] = [
  {
    slug: "private-limited-company",
    name: "Private Limited Company Registration",
    service: KEY.pvtLtd,
    intro: "Everything you need to incorporate a private limited company through SPICe+. Keep scans in PDF or JPG, clear and in colour.",
    groups: [
      DIRECTOR_KYC,
      OFFICE_PROOF,
      {
        title: "Company details",
        items: [
          { name: "Two or more proposed names", note: "In order of preference, with the meaning of any coined word." },
          { name: "Main business activity", note: "A short description — we draft the MoA objects from it." },
          { name: "Authorised and paid-up capital", note: "Plus the shareholding of each subscriber." },
          { name: "Corporate shareholder documents (if any)", note: "Board resolution, certificate of incorporation and authorised signatory details." },
        ],
      },
    ],
    tips: [
      "Names on PAN, Aadhaar and bank proofs must match exactly — mismatches are the most common reason for resubmission.",
      "If the registered office is a director's own home, an NOC from that director is still required.",
      "Keep one director available for a short DSC video verification.",
    ],
  },
  {
    slug: "llp",
    name: "LLP Registration",
    service: KEY.llp,
    intro: "Documents needed to register a Limited Liability Partnership using FiLLiP and to file the LLP agreement.",
    groups: [
      DIRECTOR_KYC,
      OFFICE_PROOF,
      {
        title: "LLP details",
        items: [
          { name: "Proposed names", note: "Up to two names in order of preference." },
          { name: "Capital contribution of each partner", note: "Can be cash or other assets." },
          { name: "Profit-sharing ratio", note: "Goes into the LLP agreement." },
          { name: "Business activity", note: "A short description of what the LLP will do." },
        ],
      },
    ],
    tips: [
      "The LLP agreement must be filed (Form 3) within 30 days of incorporation — we draft it alongside registration.",
      "At least one designated partner must be resident in India.",
    ],
  },
  {
    slug: "opc",
    name: "One Person Company (OPC) Registration",
    service: KEY.opc,
    intro: "Documents for registering an OPC — the same as a private limited company, plus nominee details.",
    groups: [
      { ...DIRECTOR_KYC, title: "For the member / director" },
      {
        title: "For the nominee",
        items: [
          { name: "PAN and Aadhaar", note: "The nominee must be an Indian citizen." },
          { name: "Consent in Form INC-3", note: "We prepare it for the nominee's signature." },
        ],
      },
      OFFICE_PROOF,
    ],
    tips: ["A person can be a member or nominee of only one OPC at a time."],
  },
  {
    slug: "proprietorship",
    name: "Sole Proprietorship Setup",
    service: KEY.proprietorship,
    intro: "A proprietorship is set up through registrations in the owner's name — usually GST and/or Udyam, and a current account.",
    groups: [
      {
        title: "Owner",
        items: [
          { name: "PAN card" },
          { name: "Aadhaar card", note: "Linked to a mobile number for OTPs." },
          { name: "Photograph" },
          { name: "Bank account details", note: "Cancelled cheque or bank statement." },
        ],
      },
      {
        title: "Business premises",
        items: [
          { name: "Utility bill of the premises", note: "Not older than two months." },
          { name: "Rent agreement and owner's NOC", note: "If rented." },
        ],
      },
    ],
    tips: ["Open a current account in the business name once you have GST or Udyam — most banks accept either as proof."],
  },
  {
    slug: "partnership-firm",
    name: "Partnership Firm Registration",
    service: KEY.partnership,
    intro: "Documents for drafting the partnership deed, getting the firm's PAN and registering with the Registrar of Firms.",
    groups: [
      { ...DIRECTOR_KYC, title: "For each partner" },
      {
        title: "Firm details",
        items: [
          { name: "Firm name and business activity" },
          { name: "Capital contribution and profit-sharing ratio" },
          { name: "Partnership deed on stamp paper", note: "We draft it; stamp duty varies by state." },
          { name: "Office address proof", note: "Utility bill plus rent agreement / NOC." },
        ],
      },
    ],
    tips: ["Registration with the Registrar of Firms is optional but protects your right to sue third parties."],
  },
  {
    slug: "gst-registration",
    name: "GST Registration",
    service: KEY.gstReg,
    intro: "Documents needed for a new GSTIN. Requirements differ slightly by business type.",
    groups: [
      {
        title: "Business identity",
        items: [
          { name: "PAN of the business", note: "Owner's PAN for a proprietorship." },
          { name: "Certificate of incorporation / partnership deed", note: "For companies, LLPs and firms." },
          { name: "Authorisation letter or board resolution", note: "For the authorised signatory." },
        ],
      },
      {
        title: "Promoters / partners / directors",
        items: [{ name: "PAN, Aadhaar and photograph of each" }],
      },
      {
        title: "Place of business",
        items: [
          { name: "Electricity bill or property tax receipt", note: "Recent." },
          { name: "Rent agreement and NOC", note: "If rented or shared." },
        ],
      },
      { title: "Bank", items: [{ name: "Cancelled cheque or bank statement", note: "Showing the account holder's name and IFSC." }] },
    ],
    tips: [
      "Opting for Aadhaar authentication avoids a physical verification in most cases and speeds up approval.",
      "Photographs of the premises showing the business name board help if the officer asks for clarification.",
    ],
  },
  {
    slug: "itr-salaried",
    name: "Income Tax Return — Salaried",
    service: KEY.itrIndividual,
    intro: "What to keep ready for filing your ITR if your income is mainly from salary.",
    groups: [
      {
        title: "Income",
        items: [
          { name: "Form 16 from each employer" },
          { name: "Salary slips", note: "Helpful if you changed jobs." },
          { name: "Interest certificates", note: "Savings, FDs, post office." },
          { name: "Capital gains statements", note: "From your broker and mutual fund registrars." },
          { name: "Rental income details", note: "If you own a let-out property." },
        ],
      },
      {
        title: "Deductions (old regime)",
        items: [
          { name: "80C proofs", note: "PPF, ELSS, LIC, tuition fees, home-loan principal." },
          { name: "80D health insurance premium receipts" },
          { name: "Home-loan interest certificate" },
          { name: "Rent receipts and landlord PAN", note: "For HRA above ₹1 lakh a year." },
        ],
      },
      {
        title: "Tax credits",
        items: [
          { name: "Form 26AS and AIS", note: "We download these with your login." },
          { name: "Advance / self-assessment tax challans" },
        ],
      },
    ],
    tips: ["Check your AIS before filing — mismatches with it are the most common trigger for notices."],
  },
  {
    slug: "itr-business",
    name: "Income Tax Return — Business & Professionals",
    service: KEY.itrProprietor,
    intro: "Documents for ITR-3 or ITR-4 if you have business or professional income.",
    groups: [
      {
        title: "Books and statements",
        items: [
          { name: "Bank statements of all accounts", note: "For the full financial year." },
          { name: "Sales and purchase registers or GST returns" },
          { name: "Expense bills", note: "Rent, salaries, utilities, travel and others." },
          { name: "Fixed-asset purchase invoices", note: "For depreciation." },
          { name: "Loan statements", note: "Business loans and interest certificates." },
        ],
      },
      {
        title: "Tax records",
        items: [
          { name: "Form 26AS, AIS and TIS" },
          { name: "TDS certificates (Form 16A)" },
          { name: "Advance tax challans" },
          { name: "Previous year's ITR", note: "For brought-forward losses." },
        ],
      },
    ],
    tips: ["If turnover is within presumptive limits, ITR-4 may let you skip detailed books — ask us whether it suits you."],
  },
  {
    slug: "msme-registration",
    name: "MSME / Udyam Registration",
    service: KEY.msme,
    intro: "Udyam registration is free and online. Most details are pulled from PAN and GST records.",
    groups: [
      {
        title: "Required",
        items: [
          { name: "Aadhaar of the proprietor / managing partner / director", note: "With linked mobile for OTP." },
          { name: "PAN of the enterprise" },
          { name: "GSTIN", note: "If the business is registered under GST." },
          { name: "Bank account number and IFSC" },
          { name: "Investment in plant & machinery and turnover", note: "Auto-filled from ITR and GST where available." },
          { name: "NIC code of the main activity", note: "We help you pick the right one." },
        ],
      },
    ],
    tips: ["Classification (micro, small, medium) is based on investment and turnover and is updated automatically from ITR and GST data."],
  },
  {
    slug: "section-8-company",
    name: "Section 8 (Non-profit) Company Registration",
    service: KEY.section8,
    intro: "Documents for registering a not-for-profit company with a licence under Section 8 of the Companies Act, 2013.",
    groups: [
      DIRECTOR_KYC,
      OFFICE_PROOF,
      {
        title: "Organisation details",
        items: [
          { name: "Objects of the organisation", note: "Charitable purposes such as education, health, environment or social welfare." },
          { name: "Projected income and expenditure for 3 years", note: "Required for the licence application." },
          { name: "Proposed names", note: "Usually ending in Foundation, Association, Council or similar." },
        ],
      },
    ],
    tips: ["Plan 12A and 80G registration right after incorporation so donors get tax benefits."],
  },
];

export const checklistHref = (c: Pick<Checklist, "slug">) => `/documents/${c.slug}`;
export const getChecklist = (slug: string) => checklists.find((c) => c.slug === slug);
