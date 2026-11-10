import { IT, IT_HUB_PATH } from "./incomeTaxHub";
import type { SeoServicePage } from "./seoTypes";
import { formatInr } from "./services";

const rupee = (n: number) => formatInr(n);

export const incomeTaxServicePages: Record<string, SeoServicePage> = {
  "itr-filing-individual": {
    slug: "itr-filing-individual",
    metaTitle: "ITR Filing Online for Salaried, Investors & NRIs by CA | Filing360",
    metaDescription:
      "CA-assisted ITR filing for salaried employees, investors and NRIs: regime comparison, AIS check, deductions, capital gains and maximum refund.",
    keywords: [
      "ITR filing online",
      "income tax return filing for salaried",
      "ITR filing by CA",
      "ITR for capital gains",
      "NRI ITR filing",
      "ITR filing fees",
    ],
    h1: "ITR Filing for Salaried Individuals, Investors and NRIs",
    lead: "Don’t leave money on the table, or invite a notice with a wrong return. Our Chartered Accountants check your AIS and Form 26AS, compare the old and new regimes, claim every eligible deduction and file the right ITR form.",
    highlights: [`From ${rupee(999)}`, "CA-reviewed", "Refund tracking included"],
    cta: "File My ITR",
    imageAlt: "ITR filing for individuals by Filing360",
    related: [
      { href: IT_HUB_PATH, label: "Income tax hub" },
      { href: IT.planning, label: "Tax planning" },
      { href: IT.notice, label: "Notice reply" },
      { href: IT.blogBelated, label: "Belated & revised ITR" },
    ],
    sections: [
      {
        type: "table",
        title: "Who we file for",
        columns: ["You have…", "We file"],
        rows: [
          ["Salary or pension, one house property, interest", "ITR-1 or ITR-2"],
          ["Capital gains from shares, mutual funds, property or crypto", "ITR-2"],
          ["Income from abroad, foreign assets or ESOPs of a foreign company", "ITR-2 with Schedule FA"],
          ["NRI with Indian rent, interest or capital gains", "ITR-2 with DTAA relief"],
          ["Freelance or consulting income", "ITR-3 or ITR-4"],
        ],
      },
      {
        type: "list",
        title: "What’s included",
        items: [
          "Review of Form 16, AIS, TIS and Form 26AS",
          "Old vs new tax regime comparison",
          "Deductions and exemptions: HRA, home loan interest, 80C, 80D and others (where the old regime applies)",
          "Capital gains computation with grandfathering and exemptions",
          "Filing and e-verification",
          "Refund tracking and response to any processing intimation",
        ],
      },
      {
        type: "p",
        title: "Documents needed",
        body: "PAN, Aadhaar, Form 16, bank interest certificates, capital gains statements from brokers and mutual funds, home loan certificate, rent receipts, investment proofs and details of foreign assets, if any.",
      },
    ],
    faqs: [
      {
        q: "Can I switch between old and new regime every year?",
        a: "Salaried individuals without business income can choose each year when filing on time.",
      },
      {
        q: "Do I need to file if my employer deducted TDS?",
        a: "Yes, if your income is above the basic exemption limit or you meet other filing conditions; filing also lets you claim refunds.",
      },
    ],
  },

  "itr-filing-sole-proprietorship": {
    slug: "itr-filing-sole-proprietorship",
    metaTitle: "ITR Filing for Business, Professionals, Firms & Companies | Filing360",
    metaDescription:
      "ITR-3, ITR-4, ITR-5 and ITR-6 filing by CAs: presumptive taxation, computation of income, GST and TDS reconciliation and timely filing.",
    keywords: [
      "ITR filing for business",
      "ITR-3 filing",
      "ITR-4 presumptive",
      "partnership firm ITR",
      "company ITR filing",
      "professional ITR filing",
    ],
    h1: "ITR Filing for Businesses, Professionals, Firms and Companies",
    lead: "Business returns need more than a form: books, computation of income, presumptive options, depreciation, GST and TDS reconciliation and, for many, a tax audit. We handle it all, end to end.",
    highlights: [`From ${rupee(2499)}`, "Computation + filing", "CA-reviewed"],
    cta: "File My Business ITR",
    imageAlt: "Business ITR filing by Filing360",
    related: [
      { href: IT_HUB_PATH, label: "Income tax hub" },
      { href: IT.audit, label: "Tax audit" },
      { href: IT.company, label: "Company ITR" },
      { href: IT.tds, label: "TDS returns" },
    ],
    sections: [
      {
        type: "table",
        title: "Forms we file",
        columns: ["Taxpayer", "Form"],
        rows: [
          ["Proprietor or professional with regular books", "ITR-3"],
          ["Proprietor or professional under presumptive taxation", "ITR-4"],
          ["Partnership firm, LLP, AOP, BOI", "ITR-5"],
          ["Company", "ITR-6"],
          ["Trust, NGO, institution", "ITR-7"],
        ],
      },
      {
        type: "table",
        title: "Presumptive taxation (FY 2025-26)",
        columns: ["Scheme (1961 Act)", "Who", "Limit", "Deemed profit"],
        rows: [
          ["Section 44AD", "Small businesses", "Turnover up to ₹2 crore (₹3 crore if cash receipts within 5%)", "6% of digital receipts, 8% of others"],
          ["Section 44ADA", "Specified professionals", "Gross receipts up to ₹50 lakh (₹75 lakh if cash receipts within 5%)", "50%"],
          ["Section 44AE", "Goods carriage owners (up to 10 vehicles)", "—", "Fixed amount per vehicle per month"],
        ],
        note: "Equivalent provisions continue under the Income-tax Act, 2025 with new section numbers.",
      },
      {
        type: "list",
        title: "What’s included",
        items: [
          "Computation of business income, depreciation and allowable expenses",
          "Choice between presumptive and regular taxation",
          "Reconciliation with GST turnover, TDS (26AS) and AIS",
          "Advance tax review and interest calculation",
          "Filing, e-verification and follow-up",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a tax audit?",
        a: "If turnover or receipts cross the audit limits, or you opt out of presumptive taxation below certain levels, yes. See our Tax Audit service.",
      },
      {
        q: "Can a firm or company use presumptive taxation?",
        a: "Section 44AD covers resident individuals, HUFs and partnership firms (not LLPs or companies).",
      },
    ],
  },

  "tax-audit": {
    slug: "tax-audit",
    metaTitle: "Tax Audit Services (Form 3CA/3CB-3CD) by CAs | Filing360",
    metaDescription:
      "Tax audit for businesses and professionals: applicability check, Form 3CD reporting, audit report filing by 30 September and ITR filing.",
    keywords: ["tax audit services", "tax audit applicability", "Form 3CD", "tax audit due date", "tax audit limit", "Section 44AB"],
    h1: "Tax Audit Services",
    lead: "A tax audit is mandatory once your turnover or receipts cross the limits. The audit report must be filed before the return, with detailed disclosures in Form 3CD. Our Chartered Accountants plan the audit early, so it is not a last-week rush.",
    highlights: [`From ${rupee(7499)}`, "Audit + Form 3CD + ITR"],
    cta: "Book My Tax Audit",
    imageAlt: "Tax audit services by Filing360",
    related: [
      { href: IT_HUB_PATH, label: "Income tax hub" },
      { href: IT.proprietorship, label: "Business ITR" },
      { href: IT.tds, label: "TDS returns" },
    ],
    sections: [
      {
        type: "table",
        title: "Who needs a tax audit (FY 2025-26)",
        columns: ["Taxpayer", "Audit required if"],
        rows: [
          ["Business", "Turnover above ₹1 crore; above ₹10 crore if cash receipts and cash payments are each within 5%"],
          ["Profession", "Gross receipts above ₹50 lakh"],
          ["Presumptive business (44AD)", "Declares profit below the deemed rate and income above the basic exemption limit, as per the conditions"],
          ["Presumptive profession (44ADA)", "Declares profit below 50% and income above the basic exemption limit"],
        ],
      },
      {
        type: "list",
        title: "Forms",
        items: [
          "Form 3CA: when accounts are already audited under another law (e.g., companies)",
          "Form 3CB: when accounts are not audited under any other law",
          "Form 3CD: statement of particulars with over 40 clauses, filed with either",
        ],
      },
      {
        type: "table",
        title: "Due dates",
        columns: ["Item", "Due date for FY 2025-26"],
        rows: [
          ["Tax audit report", "30 September 2026"],
          ["ITR", "31 October 2026"],
        ],
        note: "Late filing of the audit report can attract a penalty.",
      },
      {
        type: "p",
        title: "What we check in Form 3CD",
        body: "Payments to related parties, cash payments and receipts limits, TDS compliance, MSME payment timelines, deemed income, depreciation, GST turnover reconciliation, loans and deposits in cash, and other disclosures.",
      },
    ],
    faqs: [
      {
        q: "Is tax audit required if there is a loss?",
        a: "It depends on turnover limits and presumptive conditions; we check your case.",
      },
      {
        q: "Can the same CA do the statutory audit and tax audit?",
        a: "Yes, for companies and other entities, subject to professional rules.",
      },
    ],
  },

  "tds-return-filing": {
    slug: "tds-return-filing",
    metaTitle: "TDS Return Filing Online – 24Q, 26Q, 27Q, 27EQ | Filing360",
    metaDescription:
      "Quarterly TDS and TCS return filing, challan reconciliation, Form 16/16A, correction returns and default resolution by Chartered Accountants.",
    keywords: ["TDS return filing", "TDS return due date", "24Q 26Q filing", "TDS correction return", "Form 16 generation", "TDS default notice"],
    h1: "TDS Return Filing Services",
    lead: "TDS mistakes are expensive: late fees of ₹200 per day, interest, penalties and unhappy employees and vendors whose credit does not show up. We handle deduction, deposit checks, quarterly returns and certificates every quarter.",
    highlights: ["Per quarter", "Returns + certificates"],
    cta: "File My TDS Returns",
    imageAlt: "TDS return filing by Filing360",
    related: [
      { href: IT_HUB_PATH, label: "Income tax hub" },
      { href: IT.audit, label: "Tax audit" },
      { href: IT.notice, label: "Notice reply" },
    ],
    sections: [
      {
        type: "table",
        title: "Returns and due dates",
        columns: ["Form", "Covers", "Due date"],
        rows: [
          ["24Q", "TDS on salary", "31 July, 31 Oct, 31 Jan, 31 May"],
          ["26Q", "TDS on other payments to residents", "Same as above"],
          ["27Q", "TDS on payments to non-residents", "Same as above"],
          ["27EQ", "TCS", "15 July, 15 Oct, 15 Jan, 15 May"],
        ],
        note: "TDS must be deposited by the 7th of the following month (30 April for March).",
      },
      {
        type: "list",
        title: "What’s included",
        items: [
          "Monthly TDS computation and challan review",
          "Quarterly return preparation and filing",
          "Form 16 (salary) and Form 16A (non-salary) generation",
          "Correction returns and resolution of TRACES defaults",
          "Lower deduction certificate applications",
        ],
      },
      {
        type: "table",
        title: "Consequences of default",
        columns: ["Default", "Consequence"],
        rows: [
          ["Late return", "₹200 per day, up to the TDS amount"],
          ["Not deducting", "Interest at 1% per month"],
          ["Deducting but not depositing", "Interest at 1.5% per month"],
          ["Incorrect or missing return", "Penalty, and expenses may be disallowed"],
        ],
      },
    ],
    faqs: [
      { q: "Do I need a TAN?", a: "Yes, every deductor needs a TAN before deducting tax." },
      { q: "Can a TDS return be revised?", a: "Yes, through a correction return." },
    ],
  },

  "updated-return": {
    slug: "updated-return",
    metaTitle: "Updated Return (ITR-U) Filing by CAs | Filing360",
    metaDescription:
      "File an updated income tax return (ITR-U) under Section 139(8A) up to 48 months after the assessment year. Eligibility, additional tax and CA-assisted filing.",
    keywords: [
      "updated return ITR-U",
      "Section 139(8A)",
      "file updated income tax return",
      "ITR-U additional tax",
      "updated return deadline",
      "correct past ITR",
    ],
    h1: "Updated Return (ITR-U): A Second Chance to Set Your Tax Records Right",
    lead: "An updated return lets you correct or complete your income tax return up to 48 months after the end of the relevant assessment year, by paying the tax due plus an additional tax. Filing360’s Chartered Accountants check eligibility, compute tax and interest precisely, and file ITR-U for you — once, and carefully.",
    highlights: ["Window up to 48 months", "CA eligibility check", "AIS & 26AS reconciliation"],
    cta: "File Updated Return",
    imageAlt: "Updated return ITR-U filing by Filing360",
    related: [
      { href: IT_HUB_PATH, label: "Income tax hub" },
      { href: IT.revised, label: "Revised return" },
      { href: IT.notice, label: "Notice reply" },
      { href: IT.individual, label: "ITR filing" },
    ],
    sections: [
      {
        type: "p",
        id: "what-is-updated-return",
        title: "What is an updated return?",
        body: "An updated return (ITR-U) lets you correct or complete your income tax return up to 48 months after the end of the relevant assessment year, by paying the tax due plus an additional tax. It was introduced through Section 139(8A) of the Income-tax Act, 1961 by the Finance Act, 2022, and the window was extended from 24 to 48 months by the Finance Act, 2025. Mistakes happen — missed FD interest, capital gains under the wrong head, or a return never filed. Before ITR-U, once revised or belated deadlines passed, the only route was to wait for a notice. The updated return gives taxpayers a voluntary way to come clean before that happens.",
      },
      {
        type: "p",
        title: "Who can file, and by when",
        body: "Any person can file an updated return, whether or not they filed an original, revised or belated return for that year. Individuals, HUFs, firms, LLPs and companies are all covered. The time limit is 48 months from the end of the relevant assessment year. Only one updated return can be filed for an assessment year, so it should be prepared carefully the first time.",
      },
      {
        type: "table",
        title: "ITR-U last dates (illustrative)",
        columns: ["Financial year", "Assessment year", "Last date for ITR-U"],
        rows: [
          ["FY 2021-22", "AY 2022-23", "31 March 2027"],
          ["FY 2022-23", "AY 2023-24", "31 March 2028"],
          ["FY 2023-24", "AY 2024-25", "31 March 2029"],
          ["FY 2024-25", "AY 2025-26", "31 March 2030"],
        ],
        note: "The Income-tax Act, 2025 replaces the 1961 Act from 1 April 2026 and carries forward the updated return mechanism. Section numbers and forms may differ for later years — confirm the current provision before filing.",
      },
      {
        type: "list",
        title: "Common reasons to file",
        items: [
          "Income not reported earlier, such as interest, rent, freelance receipts or capital gains",
          "Income reported under the wrong head",
          "Wrong rate of tax applied",
          "Return not filed at all",
          "Carried-forward loss or unabsorbed depreciation to be reduced",
        ],
      },
      {
        type: "list",
        id: "when-you-cannot",
        title: "When you cannot file an updated return",
        items: [
          "ITR-U exists to increase reported income, never to reduce it — you cannot use it to show a lower tax liability, create a refund or increase a refund already claimed",
          "A search has been initiated, or books, documents or assets have been requisitioned",
          "A survey has been conducted",
          "Assessment, reassessment or recomputation is pending or completed for that year",
          "The Assessing Officer holds information under laws such as PMLA, the Black Money Act or the Benami Act, and this has been communicated to you",
          "Prosecution proceedings have been initiated",
        ],
      },
      {
        type: "p",
        body: "One relief from the Finance Act, 2025: if a show-cause notice for reassessment is issued but the officer later decides it is not a fit case, you can still file an updated return for that year. In short, ITR-U works best before the department reaches you.",
      },
      {
        type: "table",
        id: "additional-tax",
        title: "Additional tax under Section 140B",
        columns: ["Filed within (from end of AY)", "Additional tax"],
        rows: [
          ["12 months", "25% of tax + interest"],
          ["24 months", "50% of tax + interest"],
          ["36 months", "60% of tax + interest"],
          ["48 months", "70% of tax + interest"],
        ],
        note: "Before filing ITR-U you must pay the tax, interest, late fee and an additional tax calculated on the aggregate of tax and interest. Interest under Sections 234A, 234B and 234C applies, and so does the late fee under Section 234F where no return was filed earlier.",
      },
      {
        type: "list",
        title: "How Filing360 can help",
        items: [
          "Reconcile your AIS, TIS and Form 26AS to find what was missed",
          "Confirm eligibility and compute tax, interest and additional tax precisely",
          "Prepare, file and verify the ITR-U on your behalf",
          "Advise whether ITR-U, a revised return or another remedy suits your case",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I file more than one updated return for the same year?",
        a: "No. Only one updated return can be filed for an assessment year, so it must be prepared carefully the first time.",
      },
      {
        q: "Can ITR-U reduce my tax or increase my refund?",
        a: "No. An updated return cannot reduce the tax liability shown earlier, create a refund, or increase a refund already claimed.",
      },
      {
        q: "Is ITR-U better than waiting for a notice?",
        a: "Usually yes. Filing voluntarily before the department acts helps you avoid heavier penalties and litigation, though you pay additional tax of 25% to 70%.",
      },
    ],
  },

  "revised-return": {
    slug: "revised-return",
    metaTitle: "Revised Income Tax Return Filing under Section 139(5) | Filing360",
    metaDescription:
      "Correct mistakes in your ITR with a revised return under Section 139(5). Who can file, last date, common errors and CA-assisted revised return filing.",
    keywords: [
      "revised income tax return",
      "Section 139(5)",
      "how to revise ITR",
      "revised return last date",
      "correct mistakes in ITR",
      "file revised return online",
    ],
    h1: "Revised Income Tax Return: How to Correct Mistakes in Your ITR",
    lead: "Filed your Income Tax Return and then noticed a mistake? A missed deduction, unreported interest or a wrong bank account is common — and the law gives you a simple fix: the revised return under Section 139(5). Filing360’s tax experts review your original return against Form 26AS and AIS, correct every error and file before the deadline.",
    highlights: ["No penalty for revising", "Deadline usually 31 Dec", "AIS & 26AS matched"],
    cta: "Revise My Return",
    imageAlt: "Revised income tax return filing by Filing360",
    related: [
      { href: IT_HUB_PATH, label: "Income tax hub" },
      { href: IT.updated, label: "Updated return (ITR-U)" },
      { href: IT.notice, label: "Notice reply" },
      { href: IT.individual, label: "ITR filing" },
    ],
    sections: [
      {
        type: "p",
        id: "what-is-revised-return",
        title: "What is a revised return?",
        body: "A revised return replaces your original return in full under Section 139(5) of the Income-tax Act, 1961. There is no penalty for revising. You only pay any extra tax and interest that the correction brings out, and if the correction lowers your tax, you can claim the refund.",
      },
      {
        type: "p",
        title: "Who can file a revised return?",
        body: "Any taxpayer who has filed an original return on time under Section 139(1), or a belated return under Section 139(4), can revise it. This includes salaried individuals, professionals, HUFs, firms, LLPs, companies and trusts. The only return that cannot be revised is an updated return (ITR-U) filed under Section 139(8A).",
      },
      {
        type: "p",
        id: "last-date",
        title: "Last date to file a revised return",
        body: "A revised return must be filed by 31 December of the relevant assessment year, or before the assessment is completed, whichever is earlier. For example, for income earned in FY 2025-26 (AY 2026-27), the last date to revise is 31 December 2026. Once this date passes, the only way to declare missed income is an updated return, which carries an additional tax of 25% to 70%. That is why it pays to review your return early.",
      },
      {
        type: "list",
        title: "When should you revise your return?",
        items: [
          "Forgot to claim a deduction such as Section 80C, 80D, HRA or home loan interest",
          "Missed reporting income from savings or FD interest, capital gains, rent or freelance work",
          "Did not claim TDS or advance tax already paid",
          "Entered wrong bank account details, so your refund failed",
          "Chose the wrong ITR form or wrong residential status",
          "Found a mismatch with Form 26AS or the Annual Information Statement (AIS) after filing",
        ],
      },
      {
        type: "list",
        title: "Important points to remember",
        items: [
          "You can revise your return more than once within the deadline — the latest valid return is the one that counts",
          "The revised return is treated as filed on the date of the original return",
          "Carry-forward of losses is allowed only if the original return was filed by the due date",
          "Revising after the department has already found the income does not protect you from penalty for concealment",
        ],
      },
      {
        type: "list",
        title: "Common mistakes taxpayers make",
        items: [
          "Forgetting to e-verify the revised return",
          "Quoting the wrong acknowledgement number of the original return",
          "Waiting too long and missing the 31 December deadline",
          "Correcting one error but not checking the full return against Form 26AS and AIS",
        ],
      },
      {
        type: "list",
        title: "Get your revised return filed by experts",
        items: [
          "Line-by-line review of your original return",
          "Match with Form 26AS and AIS",
          "Correction of every error before filing",
          "Filing and e-verification well before the deadline",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there a penalty for filing a revised return?",
        a: "No. There is no penalty for revising. You only pay any extra tax and interest arising from the correction.",
      },
      {
        q: "Can I revise an updated return (ITR-U)?",
        a: "No. An updated return filed under Section 139(8A) cannot be revised.",
      },
      {
        q: "What if I miss the revised-return deadline?",
        a: "After 31 December of the assessment year (or earlier if assessment is completed), declaring missed income usually requires an updated return (ITR-U), which carries additional tax of 25% to 70%.",
      },
    ],
  },

  "income-tax-notice": {
    slug: "income-tax-notice",
    metaTitle: "Income Tax Notice Reply by Chartered Accountants | Filing360",
    metaDescription:
      "Received an income tax notice? Understand 143(1), 139(9), 142(1), scrutiny, reassessment and demand notices — and get a CA-drafted reply on time.",
    keywords: [
      "income tax notice reply",
      "income tax notice",
      "143(1) intimation",
      "139(9) defective return",
      "scrutiny notice",
      "reassessment notice reply",
      "how to respond to income tax notice",
    ],
    h1: "Received an Income Tax Notice? What It Means and How to Respond",
    lead: "An income tax notice is not an accusation. Most notices ask you to correct a mismatch, file a missing return, or explain a transaction the department has spotted. What matters is how quickly and carefully you respond — Filing360 verifies the notice, explains the issue and files a complete reply.",
    highlights: ["Review within 24 hours", "Verify DIN & portal", "Representation available"],
    cta: "Upload My Notice",
    imageAlt: "Income tax notice reply by Filing360",
    related: [
      { href: IT_HUB_PATH, label: "Income tax hub" },
      { href: IT.revised, label: "Revised return" },
      { href: IT.updated, label: "Updated return" },
      { href: IT.individual, label: "ITR filing" },
    ],
    sections: [
      {
        type: "p",
        id: "why-notices",
        title: "Why the Income Tax Department sends notices",
        body: "The department matches your return against Form 26AS, AIS, TDS returns, GST filings, and bank and mutual fund reports. Any gap can trigger a notice. A notice answered on time with the right documents usually closes without penalty. A notice ignored can turn into a best-judgment assessment, a tax demand with interest, and penalties of up to 200% of the tax involved.",
      },
      {
        type: "list",
        title: "Most common reasons",
        items: [
          "Income mismatch — salary, interest, rent or capital gains in AIS missing or lower in your return",
          "TDS or TCS mismatch — tax credit claimed that does not appear in Form 26AS",
          "Non-filing — high-value transactions on record but no return filed",
          "High-value transactions — large cash deposits, property purchases, share or crypto trades, foreign remittances, or heavy credit card spends",
          "Defective return — wrong ITR form, missing schedules, or audit report not filed",
          "Excessive deductions or refunds that look out of line",
          "Random or risk-based selection for scrutiny",
        ],
      },
      {
        type: "p",
        body: "A note on the law: the Income-tax Act, 2025 replaced the Income-tax Act, 1961 from 1 April 2026 and renumbers most sections. Notices for earlier years continue to refer to the 1961 Act, so this guide uses those familiar section numbers. Check which Act your notice cites.",
      },
      {
        type: "table",
        id: "common-notices",
        title: "Common types of income tax notices",
        columns: ["Section", "What it is", "What it usually means", "Typical time to respond"],
        rows: [
          ["143(1)", "Intimation after processing", "Refund, demand, or no change; proposed adjustment under 143(1)(a) asks you to agree or disagree first", "30 days for a proposed adjustment"],
          ["139(9)", "Defective return", "Error such as wrong ITR form or missing details; treated as not filed until corrected", "15 days"],
          ["142(1)", "Inquiry before assessment", "Officer wants your return (if not filed) or specific documents and explanations", "As stated in the notice"],
          ["143(2)", "Scrutiny assessment", "Return selected for detailed examination, usually in faceless mode", "As stated in the notice"],
          ["148A / 148", "Reassessment", "Department believes income of an earlier year was not taxed; 148A show-cause comes first", "Often 7–30 days"],
          ["156", "Notice of demand", "Tax, interest or penalty payable after an assessment", "30 days; 1% a month interest thereafter"],
          ["245", "Refund adjustment", "Proposed set-off of your refund against an older outstanding demand", "30 days"],
          ["133(6)", "Call for information", "Details of a specific transaction, often from third parties too", "As stated in the notice"],
          ["131", "Summons", "Appear or produce documents; officer has civil-court powers", "Date fixed in the summons"],
        ],
        note: "Notices under 143(2), 148 and 131 are serious and should go to a professional straight away. A 143(1) intimation or 139(9) notice can often be handled by correcting and refiling, but the short deadline still applies.",
      },
      {
        type: "steps",
        id: "verify-genuine",
        title: "First, check that the notice is genuine",
        items: [
          {
            title: "Look for a DIN",
            body: "Every genuine notice carries a Document Identification Number. A communication without a DIN is treated as invalid under CBDT rules.",
          },
          {
            title: "Authenticate on the portal",
            body: "Use “Authenticate notice/order issued by ITD” on incometax.gov.in. Enter the DIN or your PAN and the notice details.",
          },
          {
            title: "Check your e-filing account",
            body: "Log in and open Pending Actions → e-Proceedings. A real notice will be listed there. The department never asks for card details, OTPs or payment through a link in an SMS or email.",
          },
        ],
      },
      {
        type: "list",
        title: "Common mistakes to avoid",
        items: [
          "Ignoring the notice — non-compliance with a 142(1) notice can attract a ₹10,000 penalty and a best-judgment assessment under Section 144",
          "Missing the deadline — late replies are often not considered at all",
          "Giving vague or incomplete replies — each unanswered point can be added to your income",
          "Contradicting your own return without a revised return to support the change",
          "Not checking your registered email and mobile linked to your PAN",
          "Under-reporting to settle quickly — under-reported income can attract 50% penalty, and misreported income up to 200%, under Section 270A",
        ],
      },
      {
        type: "steps",
        title: "How Filing360 helps",
        items: [
          { title: "Verify", body: "Confirm the notice is genuine on the e-filing portal." },
          { title: "Explain", body: "Explain the issue, deadline and risk in plain language." },
          { title: "Reconcile", body: "Match ITR, AIS, 26AS, books and bank statements." },
          { title: "Reply", body: "Draft and file a point-by-point reply with supporting documents." },
          { title: "Represent", body: "Attend virtual hearings and follow up till closure; file appeals if needed." },
        ],
      },
    ],
    faqs: [
      {
        q: "Is every notice genuine?",
        a: "Check for a DIN and authenticate the notice on the e-filing portal. Fake emails and messages are common.",
      },
      {
        q: "What if I miss the deadline?",
        a: "Respond as soon as possible; some notices allow an adjournment request, but late replies are often ignored.",
      },
      {
        q: "Should I reply myself or use a CA?",
        a: "Simple 143(1) or 139(9) issues can sometimes be fixed quickly, but scrutiny, reassessment and summons notices should go to a professional immediately.",
      },
    ],
  },

  "advance-tax-calculation": {
    slug: "advance-tax-calculation",
    metaTitle: "Advance Tax Calculation & Planning by CAs | Filing360",
    metaDescription:
      "Advance tax calculation, due dates, instalments and planning tips. Avoid interest under Sections 234B and 234C with CA-reviewed estimates from Filing360.",
    keywords: [
      "advance tax calculation",
      "advance tax due dates",
      "advance tax planning",
      "Section 234B",
      "Section 234C",
      "who must pay advance tax",
    ],
    h1: "Advance Tax: Calculation and Planning Guide",
    lead: "Advance tax means paying your income tax in four instalments during the year, instead of in one lump sum when you file. Missing an instalment triggers interest under Sections 234B and 234C. Filing360 estimates your liability, compares regimes and tracks payments through the year.",
    highlights: [`From ${rupee(899)}`, "Quarterly reviews", "Interest-free compliance"],
    cta: "Plan My Advance Tax",
    imageAlt: "Advance tax calculation and planning by Filing360",
    related: [
      { href: IT_HUB_PATH, label: "Income tax hub" },
      { href: IT.planning, label: "Tax planning" },
      { href: IT.individual, label: "ITR filing" },
      { href: IT.blogAdvance, label: "Advance tax due dates" },
    ],
    sections: [
      {
        type: "p",
        id: "why-advance-tax",
        title: "Why advance tax matters",
        body: "Advance tax is often called “pay as you earn” tax. Missing an instalment or paying too little does not just create a bill in July — it triggers interest under Sections 234B and 234C that keeps running every month until the shortfall is cleared. With a little planning, that interest is completely avoidable.",
      },
      {
        type: "list",
        title: "Who must pay advance tax",
        items: [
          "Anyone whose estimated tax liability for the year, after TDS and TCS, is ₹10,000 or more",
          "Business owners, traders and professionals (doctors, lawyers, consultants, freelancers)",
          "Salaried employees with significant other income — rent, interest, dividends or capital gains — not fully covered by TDS",
          "Investors who book capital gains on shares, mutual funds or property during the year",
          "Companies and firms once the ₹10,000 threshold is crossed",
          "Exemption: a resident individual aged 60+ with no business or professional income need not pay advance tax",
        ],
      },
      {
        type: "table",
        id: "due-dates",
        title: "Due dates and instalments",
        columns: ["Due date", "Cumulative tax (normal)", "Presumptive (44AD / 44ADA)"],
        rows: [
          ["On or before 15 June", "At least 15%", "Nil"],
          ["On or before 15 September", "At least 45%", "Nil"],
          ["On or before 15 December", "At least 75%", "Nil"],
          ["On or before 15 March", "100%", "100%"],
        ],
        note: "If a due date falls on a holiday, payment can be made on the next working day. Payments made by 31 March are still treated as advance tax for that year, though interest for the 15 March shortfall may apply.",
      },
      {
        type: "table",
        title: "Interest if you pay late or too little",
        columns: ["Section", "When it applies", "How it is calculated"],
        rows: [
          [
            "234C (deferment)",
            "An instalment is short of the required cumulative percentage",
            "1% per month for 3 months on shortfall at 15 June, 15 September and 15 December; 1% for 1 month on shortfall at 15 March",
          ],
          [
            "234B (default)",
            "Total advance tax paid by 31 March is less than 90% of assessed tax",
            "1% per month on the unpaid amount from 1 April of the next year until tax is paid",
          ],
        ],
        note: "Relief under 234C: no interest for June and September instalments if you have paid at least 12% and 36% respectively. Capital gains and dividends arising after an instalment date get relief if tax on them is paid in remaining instalments (or by 31 March if after 15 March).",
      },
      {
        type: "list",
        title: "Smart advance tax planning tips",
        items: [
          "Review your estimate every quarter just before each due date",
          "Track TDS through AIS and Form 26AS — pay based on what is actually credited",
          "Compare the old and new regimes early; the choice affects every instalment",
          "Account for capital gains promptly in the next instalment after the sale",
          "Eligible presumptive taxpayers (44AD / 44ADA) can pay all advance tax by 15 March",
          "Pay slightly more when unsure — excess is refunded with interest after filing",
          "Keep challan records and verify them in Form 26AS before filing",
          "Plan cash flows so instalments do not strain working capital",
        ],
      },
      {
        type: "list",
        title: "Why choose Filing360",
        items: [
          "Qualified professionals: tax computed and reviewed by Chartered Accountants",
          "Accurate estimates from income, TDS, AIS and Form 26AS",
          "Old vs new regime comparison to show which saves more",
          "Quarterly reminders and reviews before every due date",
          "Interest-free compliance through timely, correct instalments",
          "End-to-end support from advance tax to ITR filing, notices and GST",
          "Transparent, affordable fees with no hidden charges",
        ],
      },
    ],
    faqs: [
      {
        q: "I am salaried. Do I need to pay advance tax?",
        a: "Only if tax on other income (rent, interest, capital gains) is not covered by TDS and the balance is ₹10,000 or more. You can also declare other income to your employer so it is included in salary TDS.",
      },
      {
        q: "What if I paid more advance tax than required?",
        a: "The excess is refunded after your return is processed, along with interest under Section 244A.",
      },
      {
        q: "I missed the 15 June instalment. What now?",
        a: "Pay as soon as possible. Interest under 234C is fixed for that instalment, but paying the shortfall early prevents a larger shortfall at later due dates.",
      },
      {
        q: "Is advance tax applicable to NRIs?",
        a: "Yes, if their tax liability on Indian income, after TDS, is ₹10,000 or more. In most cases, TDS on NRI income is high enough to cover the liability.",
      },
      {
        q: "Can I pay all my advance tax in one go?",
        a: "Yes. Paying the whole amount by 15 June satisfies all later instalments. What you cannot do is pay late without interest.",
      },
    ],
  },

  "tax-planning": {
    slug: "tax-planning",
    metaTitle: "Tax Planning & Advance Tax Services by CAs | Filing360",
    metaDescription:
      "Year-round tax planning for individuals and businesses: regime choice, salary structuring, capital gains, investments and advance tax instalments.",
    keywords: [
      "tax planning services",
      "tax saving for salaried",
      "advance tax calculation",
      "capital gains tax planning",
      "tax planning for business owners",
      "old vs new regime",
    ],
    h1: "Tax Planning and Advance Tax",
    lead: "Tax planning in March means rushed investments. Tax planning in April means real savings. We review your income, investments and goals, recommend legal ways to reduce tax, and calculate advance tax so you avoid interest.",
    highlights: [`From ${rupee(99)}`, "Quarterly review"],
    cta: "Plan My Taxes",
    imageAlt: "Tax planning by Filing360",
    related: [
      { href: IT_HUB_PATH, label: "Income tax hub" },
      { href: IT.advanceTax, label: "Advance tax calculation" },
      { href: IT.individual, label: "ITR filing" },
      { href: IT.blogRegime, label: "Old vs new regime" },
    ],
    sections: [
      {
        type: "list",
        title: "What we plan",
        items: [
          "Old vs new tax regime for your income profile",
          "Salary structure with your employer (allowances, NPS, perquisites)",
          "Timing of capital gains and use of exemptions",
          "Business structure and owner remuneration",
          "Deductions for health insurance, loans and investments (old regime)",
          "Advance tax computation for each instalment",
        ],
      },
      {
        type: "table",
        title: "Advance tax instalments",
        columns: ["Due date", "Cumulative tax to be paid"],
        rows: [
          ["15 June", "15%"],
          ["15 September", "45%"],
          ["15 December", "75%"],
          ["15 March", "100%"],
        ],
        note: "Advance tax applies when tax payable for the year is ₹10,000 or more after TDS. Resident senior citizens without business income are exempt, and presumptive taxpayers can pay the full amount by 15 March.",
      },
    ],
    faqs: [
      {
        q: "Is tax planning legal?",
        a: "Yes. Planning within the law is legitimate; we do not recommend artificial or aggressive schemes.",
      },
      {
        q: "When should I start?",
        a: "At the beginning of the financial year, with a review each quarter.",
      },
    ],
  },
};

export function getIncomeTaxServicePage(slug: string) {
  return incomeTaxServicePages[slug];
}
