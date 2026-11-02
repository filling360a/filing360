/** Full GST hub page — copy from the GST launch brief, branded Filing360. */

export const GST_HUB_PATH = "/services/gst";
export const GST_HUB_ALIAS = "/gst-registration-return-filing";
export const GST_HUB_UPDATED = "2026-11-02";
export const GST_HUB_CITY = "Delhi";
export const GST_HUB_AREAS = ["Noida", "Gurgaon"] as const;

export const gstHubMeta = {
  title: "GST Registration & Return Filing Online | Filing360",
  description:
    "Get GST registration in 3–7 working days, monthly return filing, LUT, amendment, cancellation and revocation by Chartered Accountants. Affordable plans.",
  h1: "GST Registration, Return Filing & Compliance Services",
  keywords: [
    "GST registration online",
    "GST return filing",
    "GST registration fees",
    "composition scheme",
    "GST cancellation",
    "GST revocation",
    "GST amendment",
    "LUT filing",
    "GSTR-1",
    "GSTR-3B",
    "GSTR-9",
    "how to get GST number",
    "apply for GST number online",
    "new GST registration",
    "GST registration charges",
    "GST return filing fees",
    "GST registration status check",
    "GST certificate download",
    "GST registration for freelancers",
    "GST for online sellers",
    "GSTR-2B",
    "e-way bill",
    "GST refund",
    "GST notice reply",
    "GST registration in Delhi",
    "GST registration kaise kare",
  ],
};

export const GST = {
  portal: "https://www.gst.gov.in/",
  eway: "https://ewaybillgst.gov.in/",
  reg: "/services/gst/gst-registration",
  returns: "/services/gst/gst-return-filing-regular",
  composition: "/services/gst/gst-return-filing-composition",
  qrmp: "/services/gst/gst-return-filing-qrmp",
  freelancer: "/services/gst/gst-return-filing-freelancer",
  seller: "/services/gst/gst-return-filing-online-seller",
  annual: "/services/gst/gst-annual-return-filing",
  lut: "/services/gst/gst-lut-filing",
  amend: "/services/gst/gst-amendment",
  cancel: "/services/gst/gst-cancellation",
  notice: "/services/gst/gst-notice-reply",
  refund: "/services/gst/gst-refund",
  compositionOpt: "/services/gst/gst-composition-scheme",
  revoke: "/services/gst/gst-revocation",
  calc: "/tools/gst-calculator",
  guide: "/guides/composition-vs-regular-gst",
  blogReg: "/blog/how-to-get-gst-number-online",
  blogFreelance: "/blog/gst-registration-for-freelancers",
  blogComp: "/blog/gst-composition-scheme",
  blog13: "/blog/gstr-1-vs-gstr-3b",
  blog9: "/blog/gstr-9-gstr-9c-annual-return",
  blogNotice: "/blog/how-to-reply-gst-notice",
  blogRevoke: "/blog/gst-revocation-of-cancelled-registration",
  blogLut: "/blog/lut-under-gst-export-of-services",
} as const;

/** Professional fees from the live catalogue. Null = quoted after review. */
export const gstPrices = {
  from: 999,
  registration: 999,
  monthly: 999,
  compositionYear: 5999,
  annual: 14999,
  lut: 999,
  amendment: 999,
  cancellation: 999,
  revocation: 999,
  refund: null as number | null,
  notice: null as number | null,
};

export type HubTocItem = { id: string; label: string };

export const gstToc: HubTocItem[] = [
  { id: "what-is-gst", label: "What is GST?" },
  { id: "gst-registration-online", label: "GST registration online" },
  { id: "gst-schemes", label: "Schemes for small businesses" },
  { id: "gst-return-filing", label: "GST return filing" },
  { id: "gst-amendment", label: "Amendment" },
  { id: "gst-cancellation", label: "Cancellation" },
  { id: "gst-revocation", label: "Revocation" },
  { id: "lut-filing", label: "LUT for exporters" },
  { id: "gst-refund", label: "Refund" },
  { id: "gst-notice-reply", label: "Notice reply" },
  { id: "gst-penalties", label: "Penalties & late fees" },
  { id: "gst-compliance-tips", label: "Compliance tips" },
  { id: "why-filing360", label: "Why Filing360" },
  { id: "gst-services-in-delhi", label: "GST in Delhi" },
  { id: "gst-packages", label: "Packages" },
  { id: "gst-faqs", label: "FAQs" },
];

export type HubTable = { columns: string[]; rows: string[][]; note?: string };

export const gstTypesTable: HubTable = {
  columns: ["Type", "Levied by", "Applies to"],
  rows: [
    ["CGST (Central GST)", "Central Government", "Supplies within the same state"],
    ["SGST (State GST)", "State Government", "Supplies within the same state, charged with CGST"],
    ["UTGST (Union Territory GST)", "Union Territory", "Supplies within a UT without a legislature, charged with CGST"],
    ["IGST (Integrated GST)", "Central Government", "Inter-state supplies, imports and exports"],
  ],
};

export const gstThresholdTable: HubTable = {
  columns: ["Category", "Normal states", "Special category states*"],
  rows: [
    ["Supplier of goods only", "₹40 lakh", "₹20 lakh"],
    ["Supplier of services (or goods + services)", "₹20 lakh", "₹10 lakh"],
  ],
  note: "The lower limits apply to Manipur, Mizoram, Nagaland and Tripura. Other north-eastern and hill states have notified their own limits.",
};

export const gstDocsTable: HubTable = {
  columns: ["Business type", "Documents"],
  rows: [
    [
      "Proprietorship",
      "PAN and Aadhaar of proprietor, photograph, bank statement or cancelled cheque, address proof of business place",
    ],
    [
      "Partnership / LLP",
      "Firm PAN, partnership deed or LLP agreement, PAN, Aadhaar and photos of partners, authorised signatory letter, bank proof, address proof",
    ],
    [
      "Private / Public Limited Company",
      "Company PAN, Certificate of Incorporation, MOA and AOA, board resolution for authorised signatory, PAN, Aadhaar and photos of directors, bank proof, address proof",
    ],
    [
      "Business premises proof",
      "Electricity bill, property tax receipt or municipal khata; plus rent agreement or NOC from owner if rented or shared",
    ],
  ],
};

export const compositionTable: HubTable = {
  columns: ["Category", "Turnover limit (previous FY)", "Tax rate on turnover"],
  rows: [
    ["Manufacturers", "₹1.5 crore (₹75 lakh in special category states)", "1%"],
    ["Traders (goods)", "₹1.5 crore (₹75 lakh in special category states)", "1% (on taxable supplies)"],
    ["Restaurants (not serving alcohol)", "₹1.5 crore (₹75 lakh in special category states)", "5%"],
    ["Service providers / mixed suppliers (Section 10(2A))", "₹50 lakh", "6%"],
  ],
  note: "Rates shown are total (CGST + SGST combined).",
};

export const returnsTable: HubTable = {
  columns: ["Return", "Who files", "What it contains", "Due date"],
  rows: [
    ["GSTR-1", "Regular taxpayers", "Details of outward supplies (sales)", "11th of next month (monthly); 13th of month after quarter (QRMP)"],
    ["IFF", "QRMP taxpayers (optional)", "B2B invoices for months 1 and 2 of the quarter", "13th of next month"],
    ["GSTR-1A", "Regular taxpayers (optional)", "Amendment of current-period GSTR-1", "Before filing GSTR-3B of that period"],
    ["GSTR-3B", "Regular taxpayers", "Summary return with tax payment and ITC claim", "20th of next month (monthly); 22nd or 24th of month after quarter (QRMP, by state)"],
    ["CMP-08", "Composition taxpayers", "Quarterly statement and tax payment", "18th of month after quarter"],
    ["GSTR-4", "Composition taxpayers", "Annual return", "30th April after the FY"],
    ["GSTR-5", "Non-resident taxable persons", "Outward and inward supplies", "13th of next month"],
    ["GSTR-5A", "OIDAR service providers", "Services supplied to India", "20th of next month"],
    ["GSTR-6", "Input Service Distributors", "Distribution of ITC", "13th of next month"],
    ["GSTR-7", "TDS deductors", "Tax deducted at source", "10th of next month"],
    ["GSTR-8", "E-commerce operators", "Tax collected at source", "10th of next month"],
    ["GSTR-9", "Regular taxpayers (optional if turnover up to ₹2 crore)", "Annual return", "31st December after the FY"],
    ["GSTR-9C", "Taxpayers with turnover above ₹5 crore", "Self-certified reconciliation statement", "31st December after the FY"],
    ["GSTR-10", "Taxpayers whose registration is cancelled", "Final return", "Within 3 months of cancellation order"],
    ["GSTR-11", "UIN holders (embassies, UN bodies)", "Inward supplies for refund", "28th of next month"],
  ],
  note: "Due dates are extended by notification from time to time. Filing360 clients receive every extension and reminder on WhatsApp and email.",
};

export const amendmentTable: HubTable = {
  columns: ["Type of field", "Examples", "Approval"],
  rows: [
    [
      "Core fields",
      "Legal name of business (no PAN change), address of principal or additional place of business, addition or removal of partners, directors or Karta",
      "Officer approval in Form GST REG-15, normally within 15 working days",
    ],
    [
      "Non-core fields",
      "Email, mobile number, bank account, authorised signatory, HSN/SAC codes, business description",
      "Auto-approved on filing",
    ],
    [
      "Not allowed",
      "Change of PAN or constitution (e.g., proprietorship to company)",
      "Fresh registration needed; the old GSTIN is cancelled",
    ],
  ],
};

export const refundTable: HubTable = {
  columns: ["Refund type", "Who claims it"],
  rows: [
    ["Unutilised ITC on exports under LUT", "Exporters of goods and services"],
    ["IGST paid on export of goods", "Exporters; processed through the shipping bill"],
    ["Inverted duty structure", "Businesses whose input tax rate is higher than output tax rate"],
    ["Excess balance in electronic cash ledger", "Any taxpayer"],
    ["Tax paid on a supply later cancelled or excess payment", "Any taxpayer"],
    ["Deemed exports", "Supplier or recipient of deemed exports"],
  ],
};

export const penaltyTable: HubTable = {
  columns: ["Default", "Consequence"],
  rows: [
    ["Late filing of GSTR-1 / GSTR-3B", "₹50 per day (₹25 CGST + ₹25 SGST); ₹20 per day for nil returns; capped by turnover slab"],
    ["Late payment of tax", "Interest at 18% per annum on net cash liability"],
    ["Excess or wrong ITC claimed and utilised", "Interest at 24% per annum, plus penalty"],
    ["Late GSTR-9", "₹200 per day, capped at 0.5% of turnover in the state (lower for smaller taxpayers)"],
    ["Not registering when liable", "Penalty of 10% of tax due or ₹10,000, whichever is higher; 100% of tax in fraud cases"],
    ["Non-filing for 6 months", "Cancellation of GSTIN and blocking of e-way bills"],
  ],
};

export const gstWhy = [
  { title: "CA-led service", body: "Every filing is reviewed by a Chartered Accountant." },
  { title: "Transparent pricing", body: "Fixed fees with no hidden charges." },
  { title: "Dedicated account manager", body: "One point of contact on WhatsApp and phone." },
  { title: "Proactive reminders", body: "Due-date alerts so you never pay a late fee." },
  { title: "Notice support", body: "Help with replies to GST notices and officer queries." },
  { title: "Pan-India service", body: "Fully online, for businesses in any state." },
];

export const gstFaqs: { q: string; a: string }[] = [
  {
    q: "What is the GST registration limit in India?",
    a: "Registration is mandatory when aggregate turnover exceeds ₹40 lakh for suppliers of goods or ₹20 lakh for service providers in most states. Lower limits of ₹20 lakh and ₹10 lakh apply in certain special category states.",
  },
  {
    q: "Is GST registration free?",
    a: "Yes. The government charges no fee for GST registration. You pay only a professional fee if you use a consultant like Filing360.",
  },
  {
    q: "How many days does GST registration take?",
    a: "Usually 3–7 working days with Aadhaar authentication. It can take up to 30 days if physical verification of the business premises is required.",
  },
  {
    q: "Can I get GST registration without a shop or office?",
    a: "Yes. You can register using your residential address as the principal place of business, supported by a utility bill and an NOC from the owner if the property is not in your name.",
  },
  {
    q: "Do I need to file GST returns if there are no sales?",
    a: "Yes. Nil GSTR-1 and GSTR-3B returns must still be filed every period. Nil returns can also be filed through SMS.",
  },
  {
    q: "What is the difference between GSTR-1 and GSTR-3B?",
    a: "GSTR-1 reports invoice-wise details of your sales. GSTR-3B is a summary return through which you pay tax and claim input tax credit.",
  },
  {
    q: "Can a service provider opt for the composition scheme?",
    a: "Yes. Service providers with turnover up to ₹50 lakh can opt for the composition scheme under Section 10(2A) and pay 6% GST on turnover.",
  },
  {
    q: "Can a composition dealer sell outside the state?",
    a: "No. Composition taxpayers cannot make inter-state supplies of goods.",
  },
  {
    q: "How do I cancel my GST registration?",
    a: "File Form GST REG-16 on the GST portal with the reason and stock details. After approval in REG-19, file the final return GSTR-10 within three months.",
  },
  {
    q: "My GST registration was cancelled for non-filing. Can it be restored?",
    a: "Yes. File all pending returns with tax, interest and late fees, then apply for revocation in Form GST REG-21 within 90 days of the cancellation order.",
  },
  {
    q: "Is LUT mandatory for export of services?",
    a: "LUT is not mandatory, but without it you must pay IGST on exports and claim a refund later. Filing an LUT lets you export without paying tax upfront.",
  },
  {
    q: "What happens if I file GST returns late?",
    a: "You pay a late fee of ₹50 per day (₹20 for nil returns) and interest at 18% per annum on unpaid tax. Non-filing for six months can lead to cancellation of your GSTIN.",
  },
  {
    q: "Can I change my business address in GST registration?",
    a: "Yes, through a core-field amendment in Form GST REG-14 within 15 days of the change, with proof of the new address.",
  },
  {
    q: "Can one PAN have more than one GSTIN?",
    a: "Yes. A separate GSTIN is needed for each state where you have a place of business, and you may take separate registrations for different places within one state.",
  },
  {
    q: "Is GST registration required for selling on Amazon or Flipkart?",
    a: "Sellers of goods through e-commerce operators generally need GST registration, although small sellers within the threshold can now sell intra-state without it under specified conditions. Most marketplaces still ask for a GSTIN.",
  },
  {
    q: "GST registration kaise kare?",
    a: "GST registration online hota hai. gst.gov.in par Form REG-01 bharein, PAN, Aadhaar, address proof aur bank details upload karein, Aadhaar authentication karein aur ARN milega. Approval ke baad 3–7 working days mein GSTIN aur certificate mil jata hai.",
  },
  {
    q: "How can I check my GST registration status?",
    a: "Go to Services > Registration > Track Application Status on gst.gov.in and enter your ARN.",
  },
  {
    q: "How much do GST return filing services cost?",
    a: "Government charges no fee for filing returns, apart from late fees for delays. Professional fees depend on the number of invoices and the type of return; see our GST packages above.",
  },
  {
    q: "What is GSTR-2B?",
    a: "GSTR-2B is a monthly auto-generated statement showing the input tax credit available to you from suppliers’ invoices. ITC should be claimed in GSTR-3B only up to the amount in GSTR-2B.",
  },
  {
    q: "When is an e-way bill required?",
    a: "When goods worth more than ₹50,000 are moved in one consignment, subject to state-specific limits for movement within a state.",
  },
];
