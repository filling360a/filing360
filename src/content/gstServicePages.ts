import { GST, GST_HUB_PATH } from "./gstHub";
import { formatInr } from "./services";

export type GstBlock =
  | { type: "p"; title?: string; body: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "steps"; title: string; items: { title: string; body: string }[] }
  | { type: "table"; title: string; columns: string[]; rows: string[][]; note?: string };

export type GstServicePage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  lead: string;
  highlights: string[];
  cta: string;
  imageAlt: string;
  related: { href: string; label: string }[];
  sections: GstBlock[];
  faqs: { q: string; a: string }[];
};

const rupee = (n: number) => formatInr(n);

export const gstServicePages: Record<string, GstServicePage> = {
  "gst-registration": {
    slug: "gst-registration",
    metaTitle: "GST Registration Online in 3–7 Days | Filing360",
    metaDescription:
      "Apply for GST registration online with CA support. Documents, process, fees and GST certificate in 3–7 working days. Get your GST number today.",
    keywords: [
      "GST registration online",
      "apply for GST number",
      "new GST registration",
      "GST registration documents",
      "GST registration fees",
      "GST certificate",
    ],
    h1: "GST Registration Online",
    lead: "Get your GST number without visiting any office. Our Chartered Accountants check your eligibility, prepare your Form REG-01, handle Aadhaar authentication and officer queries, and deliver your GST certificate, usually within 3–7 working days.",
    highlights: [`Starting at ${rupee(999)}`, "No government fee", "100% online"],
    cta: "Apply Now",
    imageAlt: "GST registration process by Filing360",
    related: [
      { href: GST_HUB_PATH, label: "GST services hub" },
      { href: GST.returns, label: "GST return filing" },
      { href: "/services/gst/gst-composition-scheme", label: "Composition scheme" },
      { href: GST.blogReg, label: "How to get a GST number" },
    ],
    sections: [
      {
        type: "p",
        title: "What is GST registration?",
        body: "GST registration is the process of enrolling your business under the Goods and Services Tax law. On approval, you receive a 15-digit GSTIN and a registration certificate in Form REG-06. Only a registered business can charge GST on invoices, claim input tax credit and file GST returns.",
      },
      {
        type: "table",
        title: "Who needs GST registration?",
        columns: ["Situation", "Registration required?"],
        rows: [
          ["Goods turnover above ₹40 lakh (₹20 lakh in some special category states)", "Yes"],
          ["Services turnover above ₹20 lakh (₹10 lakh in some special category states)", "Yes"],
          ["Inter-state sale of goods", "Yes, from the first sale"],
          ["Selling goods on Amazon, Flipkart or other marketplaces", "Generally yes, subject to limited relaxations"],
          ["Liable to pay tax under reverse charge", "Yes"],
          ["Casual or non-resident taxable person", "Yes"],
          ["Turnover below the limit, want ITC or B2B clients", "Optional (voluntary registration)"],
        ],
      },
      {
        type: "list",
        title: "Benefits of registering",
        items: [
          "Legally collect GST and issue tax invoices",
          "Claim input tax credit on purchases, rent and services",
          "Sell across India and on online marketplaces",
          "Win corporate and government contracts that require a GSTIN",
          "Build credibility for bank loans and tenders",
        ],
      },
      {
        type: "table",
        title: "Documents required",
        columns: ["Applicant", "Documents"],
        rows: [
          ["Proprietor", "PAN, Aadhaar, photo, bank proof, business address proof"],
          ["Partnership / LLP", "Firm PAN, deed or LLP agreement, partners’ PAN, Aadhaar and photos, authority letter, bank proof, address proof"],
          ["Company", "Company PAN, incorporation certificate, MOA/AOA, board resolution, directors’ PAN, Aadhaar and photos, bank proof, address proof"],
          ["Address proof", "Electricity bill or property tax receipt, plus rent agreement or owner’s NOC if rented"],
        ],
      },
      {
        type: "steps",
        title: "Our process",
        items: [
          { title: "Consultation", body: "Free consultation to confirm the right registration type and whether composition suits you." },
          { title: "Documents", body: "Upload documents on WhatsApp or our secure link." },
          { title: "File REG-01", body: "We prepare and file Form REG-01 with correct HSN/SAC codes and business details." },
          { title: "Authentication", body: "Aadhaar authentication or biometric appointment, guided by us." },
          { title: "Queries", body: "We reply to any officer query in Form REG-04." },
          { title: "Certificate", body: "GSTIN and certificate shared with you, along with a compliance calendar." },
        ],
      },
      {
        type: "table",
        title: "Timeline",
        columns: ["Stage", "Time"],
        rows: [
          ["Document check and filing", "Same or next working day"],
          ["Officer approval with Aadhaar authentication", "Within 7 working days"],
          ["With physical verification", "Up to 30 days"],
        ],
      },
      {
        type: "p",
        title: "Fees",
        body: `The government charges nothing for GST registration. Our professional fee is ${rupee(999)}, exclusive of GST, covering preparation, filing, query replies and certificate delivery.`,
      },
      {
        type: "list",
        title: "Why Filing360",
        items: [
          "Applications prepared and reviewed by Chartered Accountants",
          "Correct HSN/SAC selection to avoid rejections and wrong tax rates",
          "Free first-month guidance on invoicing and returns",
          "One dedicated contact on WhatsApp",
        ],
      },
    ],
    faqs: [
      { q: "Can I register using my home address?", a: "Yes, with a utility bill and an NOC from the owner if the property is not in your name." },
      { q: "Can my GST application be rejected?", a: "Yes, usually for mismatched address proof, unclear documents or unanswered queries. Our CAs check every document before filing to avoid this." },
      { q: "Do I need a separate GST number for each state?", a: "Yes, one GSTIN per state where you have a place of business." },
      { q: "When must I file my first return?", a: "For the month or quarter in which registration takes effect, even if there are no sales." },
      { q: "Can I opt for composition at the time of registration?", a: "Yes, by choosing it in Form REG-01 if you are eligible." },
    ],
  },

  "gst-return-filing-regular": {
    slug: "gst-return-filing-regular",
    metaTitle: "GST Return Filing Online – GSTR-1, GSTR-3B | Filing360",
    metaDescription:
      "CA-led GST return filing: GSTR-1, GSTR-3B, CMP-08 and GSTR-2B reconciliation every month. Never miss a due date or lose input tax credit.",
    keywords: ["GST return filing", "GSTR-1 filing", "GSTR-3B filing", "GST return filing fees", "GST return due date", "GSTR-2B reconciliation"],
    h1: "GST Return Filing Online",
    lead: "Monthly GST compliance, fully handled. We reconcile your purchases with GSTR-2B, prepare GSTR-1 and GSTR-3B, share the challan amount and file on time, every time, so you keep your input tax credit and avoid late fees and notices.",
    highlights: [`Plans from ${rupee(999)} per month`, "Due-date reminders", "Dedicated CA"],
    cta: "Start Filing",
    imageAlt: "GST return filing calendar",
    related: [
      { href: GST_HUB_PATH, label: "GST services hub" },
      { href: GST.annual, label: "GSTR-9 annual return" },
      { href: "/services/gst/gst-notice-reply", label: "GST notice reply" },
      { href: GST.blog13, label: "GSTR-1 vs GSTR-3B" },
    ],
    sections: [
      {
        type: "table",
        title: "Which GST returns do you need to file?",
        columns: ["Taxpayer", "Returns", "Frequency"],
        rows: [
          ["Regular taxpayer (turnover above ₹5 crore)", "GSTR-1, GSTR-3B", "Monthly"],
          ["Regular taxpayer up to ₹5 crore under QRMP", "GSTR-1 (with optional IFF), GSTR-3B, PMT-06 payment", "Quarterly returns, monthly payment"],
          ["Composition dealer", "CMP-08 / GSTR-4", "Quarterly / annual"],
          ["All regular taxpayers", "GSTR-9 (and GSTR-9C above ₹5 crore)", "Annual"],
        ],
      },
      {
        type: "table",
        title: "Monthly due dates",
        columns: ["Return", "Monthly filers", "QRMP filers"],
        rows: [
          ["GSTR-1", "11th of next month", "13th of month after quarter"],
          ["GSTR-3B", "20th of next month", "22nd or 24th of month after quarter"],
          ["Tax payment (QRMP, months 1–2)", "—", "25th of next month"],
        ],
      },
      {
        type: "list",
        title: "What’s included in our GST return filing service",
        items: [
          "Collection of sales and purchase data in any format: Excel, Tally, Zoho, photos of bills",
          "GSTR-2B and Invoice Management System reconciliation, with a list of suppliers who have not uploaded invoices",
          "Preparation and filing of GSTR-1, IFF and GSTR-1A where needed",
          "Tax computation, ITC set-off and challan preparation",
          "Filing of GSTR-3B and sharing of acknowledgements",
          "Monthly summary of tax paid, ITC claimed and mismatches",
          "Reminders on WhatsApp and email before each due date",
        ],
      },
      {
        type: "p",
        title: "Why monthly reconciliation matters",
        body: "Since GSTR-3B is now auto-filled from GSTR-1 and ITC is limited to GSTR-2B, small errors carry forward and trigger DRC-01B or DRC-01C notices. Returns also cannot be filed after three years from their due date. Regular reconciliation is the cheapest way to stay notice-free.",
      },
      {
        type: "table",
        title: "Late fee and interest",
        columns: ["Default", "Cost"],
        rows: [
          ["Late GSTR-1 or GSTR-3B", "₹50 per day (₹20 for nil returns), capped by turnover"],
          ["Late tax payment", "18% per annum interest"],
          ["Non-filing for 6 months", "Cancellation of GST registration"],
        ],
      },
      {
        type: "table",
        title: "Fees",
        columns: ["Plan", "Suits", "Price"],
        rows: [
          ["Nil return filing", "No business activity", `${rupee(999)} / 3 months`],
          ["Standard", "Up to 250 invoices a month", `${rupee(999)} / month`],
          ["Business", "Higher volumes, multiple GSTINs", "On request"],
          ["Composition", "CMP-08 + GSTR-4", `${rupee(5999)} / year`],
        ],
        note: "Professional fees exclusive of GST. Return plans cover turnover up to ₹20 lakh unless a higher plan is quoted.",
      },
    ],
    faqs: [
      { q: "Do I need to file returns if there was no sale?", a: "Yes, a nil return is still required for every period." },
      { q: "Can I switch to quarterly filing?", a: "Yes, if your turnover is up to ₹5 crore, by opting into the QRMP scheme in the allowed window." },
      { q: "Can you file my pending returns from earlier months?", a: "Yes. We compute late fees and interest and clear the backlog in order, within the three-year time limit." },
      { q: "What do I need to send each month?", a: "Your sales invoices, purchase bills and any credit or debit notes, by the 5th of the next month." },
    ],
  },

  "gst-annual-return-filing": {
    slug: "gst-annual-return-filing",
    metaTitle: "GSTR-9 & GSTR-9C Filing Online by CAs | Filing360",
    metaDescription:
      "File your GST annual return GSTR-9 and reconciliation statement GSTR-9C with full-year reconciliation by Chartered Accountants. Due 31 December.",
    keywords: ["GSTR-9 filing", "GST annual return", "GSTR-9C filing", "GSTR-9 due date", "GST reconciliation", "GSTR-9 late fee"],
    h1: "GST Annual Return Filing (GSTR-9 and GSTR-9C)",
    lead: "Your annual return is the department’s summary of your whole year, and it cannot be revised once filed. Our CAs reconcile all 12 months of returns with your books before filing GSTR-9 and GSTR-9C, so errors are fixed by you, not found by the department.",
    highlights: [`From ${rupee(14999)}`, "Full-year reconciliation", "Filed before the deadline"],
    cta: "File My Annual Return",
    imageAlt: "GST return filing calendar",
    related: [
      { href: GST_HUB_PATH, label: "GST services hub" },
      { href: GST.returns, label: "Monthly GST return filing" },
      { href: GST.blog9, label: "GSTR-9 and GSTR-9C for FY 2025-26" },
    ],
    sections: [
      {
        type: "table",
        title: "Who must file",
        columns: ["Aggregate turnover", "GSTR-9", "GSTR-9C"],
        rows: [
          ["Up to ₹2 crore", "Optional", "Not required"],
          ["Above ₹2 crore up to ₹5 crore", "Mandatory", "Not required"],
          ["Above ₹5 crore", "Mandatory", "Mandatory (self-certified)"],
        ],
        note: "Composition dealers file GSTR-4 instead. The due date is 31 December following the financial year.",
      },
      {
        type: "list",
        title: "What we reconcile",
        items: [
          "Turnover in GSTR-1, GSTR-3B and your books, month by month",
          "ITC claimed in GSTR-3B vs ITC available in GSTR-2B (Table 8)",
          "ITC reversals: blocked credits, unpaid suppliers beyond 180 days, exempt supplies",
          "Amendments and credit notes reported in the following year’s returns",
          "HSN-wise summaries of outward and inward supplies",
          "Turnover and tax in audited financial statements vs GSTR-9 (for GSTR-9C)",
          "Any short payment found is paid through Form DRC-03 with interest before filing.",
        ],
      },
      {
        type: "list",
        title: "Deliverables",
        items: [
          "Reconciliation workbook with differences explained",
          "Filed GSTR-9 and GSTR-9C with acknowledgements",
          "A note on risk areas likely to attract scrutiny",
        ],
      },
      {
        type: "p",
        title: "Late fee",
        body: "A daily late fee applies after 31 December, with caps linked to turnover. Delays also invite scrutiny of the year’s returns.",
      },
      {
        type: "table",
        title: "Fees",
        columns: ["Turnover", "GSTR-9", "GSTR-9 + 9C"],
        rows: [
          ["Up to ₹5 crore", rupee(14999), "Included if GSTR-9C is required"],
          ["₹5–20 crore", "—", rupee(14999)],
          ["Above ₹20 crore", "—", "On quote"],
        ],
      },
    ],
    faqs: [
      { q: "Can GSTR-9 be revised after filing?", a: "No, which is why reconciliation before filing is essential." },
      { q: "Is a CA certificate needed for GSTR-9C?", a: "No, it is now self-certified by the taxpayer, but professional reconciliation is strongly advisable." },
      { q: "I was registered only for part of the year. Do I file?", a: "Yes, if your turnover makes GSTR-9 mandatory, for the period you were registered." },
    ],
  },

  "gst-composition-scheme": {
    slug: "gst-composition-scheme",
    metaTitle: "GST Composition Scheme Registration & Filing | Filing360",
    metaDescription:
      "Opt for the GST composition scheme and pay just 1%, 5% or 6% on turnover. Eligibility check, CMP-02 filing, CMP-08 and GSTR-4 by CAs.",
    keywords: [
      "GST composition scheme registration",
      "composition scheme eligibility",
      "CMP-02",
      "CMP-08 filing",
      "GSTR-4 filing",
      "composition dealer",
    ],
    h1: "GST Composition Scheme Registration",
    lead: "Pay a low, fixed tax on turnover and file returns only four times a year plus one annual return. We check whether composition actually saves you money, file your option, and handle your CMP-08 and GSTR-4.",
    highlights: [`From ${rupee(999)}`, "Eligibility check included", "Quarterly filing handled"],
    cta: "Check My Eligibility",
    imageAlt: "GST registration process by Filing360",
    related: [
      { href: GST_HUB_PATH, label: "GST services hub" },
      { href: GST.reg, label: "GST registration" },
      { href: GST.composition, label: "Composition return filing" },
      { href: GST.blogComp, label: "GST composition scheme 2026" },
    ],
    sections: [
      {
        type: "table",
        title: "Composition rates and limits",
        columns: ["Business", "Turnover limit (previous FY)", "Tax on turnover"],
        rows: [
          ["Manufacturer", "₹1.5 crore (₹75 lakh in special category states)", "1%"],
          ["Trader", "₹1.5 crore (₹75 lakh in special category states)", "1% of taxable turnover"],
          ["Restaurant without alcohol", "₹1.5 crore (₹75 lakh in special category states)", "5%"],
          ["Service provider / mixed supplier", "₹50 lakh", "6%"],
        ],
      },
      {
        type: "table",
        title: "Is composition right for you?",
        columns: ["Composition suits you if…", "Regular scheme suits you if…"],
        rows: [
          ["You sell mainly to consumers (B2C)", "Your buyers are businesses that want ITC"],
          ["Your margins are thin and purchases have low GST", "You have high GST on purchases and want ITC"],
          ["You sell only within your state", "You sell goods to other states or online through marketplaces"],
          ["You want minimal paperwork", "You export goods or services"],
        ],
        note: "Our CAs compute your tax under both options before you decide.",
      },
      {
        type: "p",
        title: "Who cannot opt",
        body: "Inter-state suppliers of goods, manufacturers of notified goods (ice cream, pan masala, tobacco), suppliers of goods through e-commerce operators collecting TCS (subject to limited relaxations), and casual or non-resident taxable persons.",
      },
      {
        type: "list",
        title: "Our service",
        items: [
          "Eligibility and tax comparison",
          "Filing CMP-02 (existing taxpayers, before the financial year starts) or opting in REG-01 (new registrants)",
          "Bill of supply format and signboard wording",
          "Quarterly CMP-08 with tax payment by the 18th after each quarter",
          "Annual GSTR-4 by 30 April",
          "Exit through CMP-04 if your turnover crosses the limit or the scheme stops suiting you",
        ],
      },
      {
        type: "table",
        title: "Fees",
        columns: ["Service", "Price"],
        rows: [
          ["Composition registration or opt-in", rupee(999)],
          ["Annual compliance (4 × CMP-08 + GSTR-4)", `${rupee(5999)} / year`],
        ],
      },
    ],
    faqs: [
      { q: "Can I collect GST from customers under composition?", a: "No. You issue a bill of supply and pay tax from your own margin." },
      { q: "What happens if my turnover crosses ₹1.5 crore?", a: "You move to the regular scheme from that day and file CMP-04 within 7 days." },
      { q: "Can I claim ITC on stock when I leave composition?", a: "Yes, on stock held on the date of leaving, subject to conditions." },
    ],
  },

  "gst-amendment": {
    slug: "gst-amendment",
    metaTitle: "GST Registration Amendment Online (REG-14) | Filing360",
    metaDescription:
      "Change your GST address, business name, partners, directors, mobile, email or bank details online. Core and non-core GST amendments by CAs.",
    keywords: [
      "GST amendment online",
      "change address in GST",
      "GST core field amendment",
      "GST non-core amendment",
      "REG-14",
      "update mobile number in GST",
    ],
    h1: "GST Registration Amendment",
    lead: "Moved office, added a partner or changed your bank? GST law requires the change to be updated within 15 days. We file your amendment in Form REG-14 with the right proofs and follow up until it is approved.",
    highlights: [`From ${rupee(999)}`, "Core and non-core changes", "Officer follow-up included"],
    cta: "Update My GST",
    imageAlt: "GST registration process by Filing360",
    related: [
      { href: GST_HUB_PATH, label: "GST services hub" },
      { href: GST.reg, label: "GST registration" },
      { href: "/services/gst/gst-cancellation", label: "GST cancellation" },
    ],
    sections: [
      {
        type: "table",
        title: "What can be changed",
        columns: ["Type", "Examples", "How it is approved"],
        rows: [
          ["Core fields", "Legal name of business (same PAN), principal or additional place of business, partners, directors, Karta, managing committee", "By the GST officer in Form REG-15, normally within 15 working days"],
          ["Non-core fields", "Email, mobile, bank account, authorised signatory, HSN/SAC codes, nature of business", "Automatically on filing"],
          ["Cannot be amended", "PAN, constitution of business (e.g., proprietorship to company), state", "Needs a fresh registration"],
        ],
      },
      {
        type: "table",
        title: "Documents for common changes",
        columns: ["Change", "Proof"],
        rows: [
          ["New business address", "Utility bill or property tax receipt + rent agreement or NOC"],
          ["Add or remove partner", "Revised partnership deed, new partner’s PAN, Aadhaar and photo"],
          ["Add or remove director", "MCA records (DIR-12), director’s PAN, Aadhaar and photo"],
          ["New bank account", "Cancelled cheque or bank statement"],
          ["Name change (company)", "Fresh certificate of incorporation"],
        ],
      },
      {
        type: "steps",
        title: "Our process",
        items: [
          { title: "Classify", body: "Confirm whether the change is core, non-core or needs fresh registration." },
          { title: "Proofs", body: "Collect and check proofs." },
          { title: "File", body: "File REG-14 with DSC or EVC." },
          { title: "Queries", body: "Reply to any officer query." },
          { title: "Certificate", body: "Share the approved updated certificate." },
        ],
      },
    ],
    faqs: [
      { q: "What if I don’t update my address?", a: "If the officer visits the old address and finds no business, your registration can be cancelled." },
      { q: "Can I change my mobile number if I no longer have the old one?", a: "Yes, but it requires a request through the jurisdictional officer; we guide you through it." },
      { q: "Is there a government fee for amendments?", a: "No." },
    ],
  },

  "gst-cancellation": {
    slug: "gst-cancellation",
    metaTitle: "GST Cancellation Online – Surrender GST Number | Filing360",
    metaDescription:
      "Close your GST registration correctly: REG-16 filing, stock reversal, cancellation order and final return GSTR-10. Avoid future notices and late fees.",
    keywords: [
      "GST cancellation online",
      "surrender GST number",
      "GST registration cancellation",
      "REG-16",
      "GSTR-10 final return",
      "close GST registration",
    ],
    h1: "GST Cancellation Online",
    lead: "Closing your business or no longer need GST? Simply stopping returns leads to late fees, notices and a suo motu cancellation on your record. We close your GSTIN the right way, from Form REG-16 to the final return GSTR-10.",
    highlights: [`From ${rupee(999)}`, "Stock reversal computed", "Final return included"],
    cta: "Cancel My GST",
    imageAlt: "GST registration process by Filing360",
    related: [
      { href: GST_HUB_PATH, label: "GST services hub" },
      { href: GST.revoke, label: "GST revocation" },
      { href: GST.amend, label: "GST amendment" },
    ],
    sections: [
      {
        type: "list",
        title: "Valid reasons to cancel",
        items: [
          "Business discontinued, sold, merged or transferred",
          "Change in constitution resulting in a new PAN",
          "Turnover below the threshold and registration no longer required",
          "Death of the proprietor (by the legal heir)",
        ],
      },
      {
        type: "list",
        title: "What must be settled before cancellation",
        items: [
          "All returns up to the date of application",
          "Tax payable on stock, semi-finished goods and capital goods held on the cancellation date (reversal of ITC taken on them)",
          "Any pending demands",
        ],
      },
      {
        type: "steps",
        title: "Our process",
        items: [
          { title: "Pending returns", body: "Review pending returns and file them." },
          { title: "Stock reversal", body: "Compute ITC reversal on closing stock and capital goods." },
          { title: "REG-16", body: "File Form REG-16 with reason and closure date." },
          { title: "Queries", body: "Reply to officer queries." },
          { title: "REG-19", body: "Receive the cancellation order in REG-19." },
          { title: "GSTR-10", body: "File GSTR-10 within 3 months of the order." },
        ],
      },
      {
        type: "p",
        title: "Cancellation by the officer",
        body: "If the department proposes to cancel your registration, it issues a show cause notice in REG-17, which must be answered in REG-18 within 7 working days. If your GSTIN has already been cancelled and you want to continue business, see our GST revocation service.",
      },
    ],
    faqs: [
      { q: "How long does GST cancellation take?", a: "Usually within 30 days of a complete application." },
      { q: "Is GSTR-10 required even if I had no stock?", a: "Yes, the final return is mandatory for every cancelled registration." },
      { q: "Can I cancel voluntary registration anytime?", a: "Yes, there is no longer a minimum period." },
    ],
  },

  "gst-revocation": {
    slug: "gst-revocation",
    metaTitle: "GST Revocation of Cancelled Registration (REG-21) | Filing360",
    metaDescription:
      "GSTIN cancelled for non-filing? Restore it through revocation in REG-21 within 90 days. Pending returns, application and follow-up by CAs.",
    keywords: [
      "GST revocation",
      "revocation of cancelled GST registration",
      "restore GST number",
      "REG-21",
      "GST cancelled for non-filing",
      "GST revocation time limit",
    ],
    h1: "Restore Your Cancelled GST Registration",
    lead: "If the GST department cancelled your registration, you can usually get the same GSTIN back. We file your pending returns, prepare the revocation application in Form REG-21 and follow up until your registration is active again.",
    highlights: [`From ${rupee(999)}`, "Pending returns cleared", "Strong written reasons"],
    cta: "Restore My GSTIN",
    imageAlt: "GST registration process by Filing360",
    related: [
      { href: GST_HUB_PATH, label: "GST services hub" },
      { href: "/services/gst/gst-cancellation", label: "GST cancellation" },
      { href: GST.returns, label: "GST return filing" },
      { href: GST.blogRevoke, label: "GST registration cancelled?" },
    ],
    sections: [
      {
        type: "table",
        title: "Why act quickly",
        columns: ["Time since cancellation order", "What you can do"],
        rows: [
          ["Within 90 days", "Apply for revocation in REG-21"],
          ["90 days up to a further 180 days", "Revocation with an extension, on sufficient cause"],
          ["Beyond that", "Appeal, or take a fresh registration"],
        ],
        note: "While your GSTIN is cancelled, you cannot issue tax invoices or generate e-way bills, and marketplaces may suspend your listings.",
      },
      {
        type: "list",
        title: "Common reasons for suo motu cancellation",
        items: [
          "Returns not filed for 6 months (2 quarters for composition)",
          "Business not found at the registered address",
          "ITC claimed beyond GSTR-2B or invoices without supply",
        ],
      },
      {
        type: "steps",
        title: "Our process",
        items: [
          { title: "Review", body: "Check the cancellation order and the reason given." },
          { title: "Returns", body: "File all pending returns with tax, interest and late fees." },
          { title: "Explanation", body: "Draft a clear explanation with supporting documents." },
          { title: "REG-21", body: "File Form REG-21 on the portal." },
          { title: "Notice", body: "Answer any notice in REG-23 through REG-24 within 7 working days." },
          { title: "Outcome", body: "Registration restored in REG-22, or an appeal filed within 3 months if rejected." },
        ],
      },
    ],
    faqs: [
      { q: "Can I apply for revocation if I cancelled the registration myself?", a: "No. Revocation only applies to cancellation by the officer." },
      { q: "Do I get the same GSTIN back?", a: "Yes, revocation restores the original GSTIN." },
      { q: "Can I apply without filing pending returns?", a: "No. All returns up to the cancellation date must be filed first." },
    ],
  },

  "gst-lut-filing": {
    slug: "gst-lut-filing",
    metaTitle: "LUT Filing Online for Exporters (RFD-11) | Filing360",
    metaDescription:
      "File your GST LUT in Form RFD-11 and export goods or services without paying IGST. Same-day filing for exporters, freelancers and IT companies.",
    keywords: ["LUT filing online", "LUT in GST", "RFD-11", "export without IGST", "LUT for export of services", "LUT renewal"],
    h1: "LUT Filing Online for Exporters",
    lead: "Export without paying IGST upfront. We file your Letter of Undertaking in Form RFD-11, usually on the same day, and set up your export invoice format so your foreign billing is compliant from the first invoice.",
    highlights: [`From ${rupee(999)}`, "Same-day filing", "Export invoice format included"],
    cta: "File My LUT",
    imageAlt: "GST registration process by Filing360",
    related: [
      { href: GST_HUB_PATH, label: "GST services hub" },
      { href: "/services/gst/gst-refund", label: "GST refund" },
      { href: GST.blogLut, label: "LUT under GST for export of services" },
    ],
    sections: [
      {
        type: "list",
        title: "Who should file an LUT",
        items: [
          "IT, SaaS and software development companies with foreign clients",
          "Freelancers on Upwork, Fiverr, Toptal and direct foreign contracts",
          "Consultants, designers and digital agencies serving overseas clients",
          "Exporters of goods and suppliers to SEZ units",
          "Anyone prosecuted for tax evasion above ₹2.5 crore is not eligible.",
        ],
      },
      {
        type: "table",
        title: "With LUT vs without LUT",
        columns: ["Point", "With LUT", "Without LUT"],
        rows: [
          ["IGST on export invoice", "Nil", "Charged and paid upfront"],
          ["Cash flow", "No funds blocked", "Funds blocked until refund"],
          ["Refund available", "Unused ITC through RFD-01", "IGST paid, through refund process"],
        ],
      },
      {
        type: "p",
        title: "What we need",
        body: "GSTIN login access, IEC (for goods exporters), authorised signatory details, and names, addresses and occupations of two witnesses.",
      },
      {
        type: "list",
        title: "Our service",
        items: [
          "Eligibility check",
          "RFD-11 filed on the GST portal with DSC or EVC",
          "LUT acknowledgement (ARN) shared with you",
          "Export invoice template with the correct LUT declaration",
          "Renewal reminder before every new financial year",
        ],
      },
    ],
    faqs: [
      { q: "How long is an LUT valid?", a: "For one financial year. Renew it before the first export of the next year." },
      { q: "Is there a government fee?", a: "No." },
      { q: "Do I need an LUT for each client?", a: "No, one LUT covers all exports for the year." },
    ],
  },

  "gst-notice-reply": {
    slug: "gst-notice-reply",
    metaTitle: "GST Notice Reply by Chartered Accountants | Filing360",
    metaDescription:
      "Received a GST notice? ASMT-10, DRC-01, DRC-01B, DRC-01C, REG-17 or GSTR-3A. Our CAs review it in 24 hours and draft a complete reply.",
    keywords: [
      "GST notice reply",
      "GST notice reply format",
      "DRC-01 reply",
      "ASMT-10 reply",
      "DRC-01C notice",
      "GST show cause notice",
    ],
    h1: "GST Notice Reply Service",
    lead: "A GST notice has a deadline, and a missed reply can turn a simple mismatch into a demand with interest and penalty. Share your notice with us: a CA reviews it within 24 hours, reconciles your data and drafts a point-by-point reply.",
    highlights: ["From a fixed quote", "Review within 24 hours", "Hearing support available"],
    cta: "Upload My Notice",
    imageAlt: "GST registration process by Filing360",
    related: [
      { href: GST_HUB_PATH, label: "GST services hub" },
      { href: GST.returns, label: "GST return filing" },
      { href: GST.revoke, label: "GST revocation" },
      { href: GST.blogNotice, label: "How to reply to a GST notice" },
    ],
    sections: [
      {
        type: "table",
        title: "Notices we handle",
        columns: ["Notice", "What it means", "Reply window"],
        rows: [
          ["GSTR-3A", "Return not filed", "15 days"],
          ["REG-03", "Query on registration application", "7 working days"],
          ["REG-17", "Proposed cancellation of registration", "7 working days"],
          ["ASMT-10", "Discrepancies in returns found on scrutiny", "30 days or as stated"],
          ["DRC-01B", "GSTR-1 liability higher than GSTR-3B", "7 days"],
          ["DRC-01C", "ITC in GSTR-3B higher than GSTR-2B", "7 days"],
          ["DRC-01", "Show cause notice demanding tax", "As stated, usually 30 days"],
          ["ADT-01", "Audit by the department", "On the date given"],
        ],
      },
      {
        type: "steps",
        title: "Our process",
        items: [
          { title: "Review", body: "We read the notice and tell you the risk and the deadline within 24 hours." },
          { title: "Reconcile", body: "GSTR-1, GSTR-3B, GSTR-2B, e-way bills and books for the period." },
          { title: "Decide", body: "Pay where the demand is correct (through DRC-03, reducing penalty) or contest where it is not." },
          { title: "Draft", body: "A written reply citing the law, with reconciliations and documents attached." },
          { title: "File", body: "Reply filed on the portal; personal hearing attended where needed." },
          { title: "Appeal", body: "If an adverse order is passed, appeal within 3 months." },
        ],
      },
      {
        type: "table",
        title: "Fees",
        columns: ["Notice type", "Price"],
        rows: [
          ["Mismatch notices (DRC-01B, DRC-01C, GSTR-3A)", "On request"],
          ["Scrutiny (ASMT-10), REG-17", "On request"],
          ["Show cause notices (DRC-01) and appeals", "On quote after review"],
        ],
      },
    ],
    faqs: [
      { q: "What if the deadline has already passed?", a: "Contact us immediately. Late replies are still often accepted before an order is passed." },
      { q: "Do I have to pay the demanded amount?", a: "Only if it is correct. Many demands are reduced or dropped after a proper reconciliation." },
    ],
  },

  "gst-refund": {
    slug: "gst-refund",
    metaTitle: "GST Refund Application Online (RFD-01) | Filing360",
    metaDescription:
      "Claim GST refunds for exports, inverted duty structure and excess cash balance. RFD-01 filing, statements and follow-up by Chartered Accountants.",
    keywords: [
      "GST refund application",
      "GST refund for exporters",
      "RFD-01",
      "inverted duty structure refund",
      "refund of excess cash ledger",
      "GST refund status",
    ],
    h1: "GST Refund Application Online",
    lead: "Working capital stuck in the GST portal? We identify every refund you are eligible for, prepare the statements and file Form RFD-01, then follow up with the department until the refund reaches your bank.",
    highlights: ["From a fixed quote", "Eligibility review", "Follow-up till credit"],
    cta: "Claim My Refund",
    imageAlt: "GST registration process by Filing360",
    related: [
      { href: GST_HUB_PATH, label: "GST services hub" },
      { href: GST.lut, label: "LUT filing" },
      { href: "/services/gst/gst-notice-reply", label: "GST notice reply" },
    ],
    sections: [
      {
        type: "table",
        title: "Refunds we handle",
        columns: ["Refund", "Typical claimant"],
        rows: [
          ["Unused ITC on exports under LUT", "Exporters of goods and services, freelancers, IT companies"],
          ["IGST paid on exports", "Exporters who did not use an LUT"],
          ["Inverted duty structure", "Manufacturers and traders whose input GST rate is higher than output rate"],
          ["Excess balance in electronic cash ledger", "Any taxpayer"],
          ["Excess or wrongly paid tax", "Any taxpayer"],
          ["Deemed exports", "Suppliers to EOUs and notified projects"],
        ],
      },
      {
        type: "table",
        title: "Time limits",
        columns: ["Stage", "Time"],
        rows: [
          ["Filing the claim", "Within 2 years from the relevant date"],
          ["Provisional refund (zero-rated supplies)", "90% within 7 days of acknowledgement"],
          ["Final order", "Within 60 days of a complete application"],
        ],
      },
      {
        type: "list",
        title: "Documents usually needed",
        items: [
          "Statement of invoices (export or inverted duty statement in the prescribed format)",
          "Shipping bills or FIRCs / bank realisation proof for exports",
          "Undertakings and declarations",
          "Reconciliation of ITC with GSTR-2B",
        ],
      },
      {
        type: "steps",
        title: "Our process",
        items: [
          { title: "Review", body: "Review refund eligibility and amount." },
          { title: "Prepare", body: "Prepare statements and supporting documents." },
          { title: "File", body: "File RFD-01 and share the ARN." },
          { title: "Replies", body: "Reply to deficiency memos (RFD-03) or notices (RFD-08)." },
          { title: "Credit", body: "Track until the refund order and bank credit." },
        ],
      },
    ],
    faqs: [
      { q: "How do I check my GST refund status?", a: "On the GST portal under Services > Refunds > Track Application Status, using the ARN." },
      { q: "What if my refund is delayed beyond 60 days?", a: "Interest is payable to you for the delay." },
      { q: "Can a freelancer claim a GST refund?", a: "Yes, if registered and exporting under LUT with accumulated ITC." },
    ],
  },
};

export function getGstServicePage(slug: string) {
  return gstServicePages[slug];
}
