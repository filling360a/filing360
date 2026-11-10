const GST_REG = "/services/gst/gst-registration";
const GST_RETURNS = "/services/gst/gst-return-filing-regular";
const GST_COMPOSITION = "/services/gst/gst-return-filing-composition";
const GST_ANNUAL = "/services/gst/gst-annual-return-filing";
const GST_LUT = "/services/gst/gst-lut-filing";
const GST_REVOKE = "/services/gst/gst-revocation";
const GST_GSTR10 = "/services/gst/gstr-10-filing";
const GST_FREELANCER = "/services/gst/gst-return-filing-freelancer";
const ITR = "/services/income-tax/income-tax-e-filing";
const PVT = "/services/startup/private-limited-company";
const LLP = "/services/startup/llp";
const PARTNER = "/services/startup/partnership-firm";
const PROP = "/services/startup/proprietorship";
const CONSULT = "/book-consultation";
const PORTAL = "https://www.gst.gov.in/";
const ITR_PORTAL = "https://www.incometax.gov.in/";


const MCA_COMPANY = "/services/mca/company-compliance";
const MCA_DIN = "/services/mca/din-ekyc-filing";
const TAX_PLAN = "/services/income-tax/tax-planning";
const TAX_IND = "/services/income-tax/itr-filing-individual";
const ACC_BOOKS = "/services/accounting/accounting-bookkeeping";
const ACC_MIS = "/services/accounting/mis-dashboard-for-startups";
const ACC_IFRS = "/services/accounting/ifrs";
const FUNDS_CMA = "/services/funds/cma-report";
const SEC8 = "/services/startup/section-8-company";
const TRUST = "/services/startup/trust-registration";

function p(t) {
  return `<p>${t}</p>`;
}
function h2(t) {
  return `<h2>${t}</h2>`;
}
function h3(t) {
  return `<h3>${t}</h3>`;
}
function ul(items) {
  return `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}
function ol(items) {
  return `<ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
}
function table(headers, rows) {
  return `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}
function a(href, text) {
  return `<a href="${href}">${text}</a>`;
}
function img(key, alt) {
  return `<img src="{{${key}}}" alt="${alt}">`;
}
function faqs(pairs) {
  return [h2("Frequently asked questions"), ...pairs.flatMap(([q, ans]) => [h3(q), p(ans)])].join("");
}
function cta(lead, href, label) {
  return p(`<strong>${lead}</strong> ${a(href, label)}.`);
}

export const posts = [
{
    slug: "how-to-get-gst-number-online",
    title: "How to Get GST Number Online in 2026 (Step-by-Step)",
    seoTitle: "How to Get GST Number Online in 2026 (Step-by-Step)",
    seoDescription:
      "Learn how to get GST number online in 2026: eligibility, documents, REG-01 steps, fees and timelines, explained by Chartered Accountants.",
    excerpt:
      "Who needs a GSTIN, which documents to keep ready, and the exact REG-01 steps on gst.gov.in — plus the mistakes that get applications rejected.",
    focusKeyword: "how to get GST number",
    tags: ["gst registration", "gst number", "gstin", "reg-01", "gst certificate", "apply for gst"],
    category: "gst",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "Business owner checking GST registration status on a phone",
    html: [
      p(
        "If you are starting a business, selling online or crossing the GST turnover limit, you need to know how to get GST number (GSTIN) the right way. The whole process is online on the GST portal, the government charges no fee, and most applications are approved within 7 working days. This guide covers eligibility, documents, Form GST REG-01 and the mistakes that cause rejections.",
      ),
      h2("Key takeaways"),
      ul([
        "GST registration is free on the government portal; you only pay a professional fee if you hire help.",
        "You must apply within 30 days of becoming liable.",
        "Aadhaar authentication usually means approval in about 7 working days.",
        "Reply to any REG-03 query within 7 working days or the application can be rejected.",
      ]),
      img("INLINE", "Chartered accountant reviewing GST registration documents on a laptop"),
      h2("Who needs a GST number?"),
      p(
        "You must apply for GST registration within 30 days of becoming liable. You are liable when your aggregate turnover exceeds ₹40 lakh for goods or ₹20 lakh for services in a financial year (₹20 lakh and ₹10 lakh in certain special category states).",
      ),
      ul([
        "You make inter-state supplies of goods, even with low turnover.",
        "You sell goods through e-commerce platforms such as Amazon or Flipkart (subject to limited relaxations for small sellers).",
        "You are liable under reverse charge, act as an agent of a registered supplier, or are a casual or non-resident taxable person.",
      ]),
      p(
        "Businesses below the limit can still register voluntarily to claim input tax credit and work with B2B clients. If you are unsure whether you have crossed the threshold, start with our " +
          a(GST_REG, "GST registration service") +
          " or the " +
          a("/services/gst/gst-applicability-evaluation", "GST applicability check") +
          ".",
      ),
      h2("Documents required to get a GST number"),
      ul([
        "PAN of the business or proprietor",
        "Aadhaar of the proprietor, partners or directors",
        "Passport-size photographs",
        "Proof of business constitution: partnership deed, LLP agreement or Certificate of Incorporation",
        "Address proof of the place of business: electricity bill or property tax receipt, plus a rent agreement or NOC if the premises are rented or shared",
        "Bank proof: cancelled cheque or bank statement",
        "Authorisation letter or board resolution for the authorised signatory",
      ]),
      h2("Step-by-step process to apply for a GST number online"),
      ol([
        "Go to the official " + a(PORTAL, "GST portal") + " and choose Services → Registration → New Registration.",
        "Fill Part A of Form GST REG-01 with your PAN, state, mobile number and email. Verify with OTPs to receive a Temporary Reference Number (TRN).",
        "Fill Part B using the TRN: business details, promoters, authorised signatory, principal place of business, goods and services (HSN/SAC codes) and bank account.",
        "Upload documents in PDF or JPEG format within the size limits shown on the portal.",
        "Opt for Aadhaar authentication. In many states you will be asked to book biometric verification at a GST Suvidha Kendra.",
        "Submit with DSC or EVC. Companies and LLPs must sign with a Digital Signature Certificate.",
        "Track your ARN under “Track Application Status”.",
        "If the officer raises a query in Form REG-03, reply in REG-04 within 7 working days.",
        "After approval in Form REG-06, download the certificate from Services → User Services → View/Download Certificates.",
      ]),
      h2("How long does it take?"),
      p(
        "With Aadhaar authentication, approval usually comes within 7 working days. If physical verification of the premises is ordered, or Aadhaar authentication is not completed, it can take up to 30 days.",
      ),
      h2("Common reasons for rejection"),
      ul([
        "Address proof does not match the address entered, or the NOC is unsigned",
        "Blurred or incomplete documents",
        "Wrong HSN/SAC codes or business description",
        "No reply to the officer’s query within 7 working days",
        "Mismatch in name between PAN and other documents",
      ]),
      h2("What to do after getting your GST number"),
      ul([
        "Display the GST certificate at your place of business and your GSTIN on the signboard.",
        "Issue GST-compliant tax invoices from day one.",
        "File GSTR-1 and GSTR-3B every month or quarter, even if there are no sales — see " +
          a("/blog/gstr-1-vs-gstr-3b", "GSTR-1 vs GSTR-3B") +
          ".",
        "Choose the composition scheme if eligible — read " + a("/services/gst/gst-composition-scheme", "GST composition scheme 2026") + ".",
      ]),
      h2("A simple example"),
      p(
        "A Bengaluru trader of goods hits ₹42 lakh turnover in December. Liability started when the ₹40 lakh threshold was crossed, so the application must go in within 30 days. Waiting until March is how people pick up late fees and a REG-17 show-cause later. A Pune consultant on ₹18 lakh of Indian fees is still optional — unless they also have ₹4 lakh of foreign receipts, which pushes aggregate turnover over ₹20 lakh.",
      ),
      h2("Aadhaar authentication and biometrics"),
      p(
        "Most states now push Aadhaar authentication in Part B. After you authenticate, you may still be asked to visit a GST Suvidha Kendra for biometric capture and photograph. Skip that appointment and the application sits, then gets queried or rejected. Keep the TRN SMS, carry the same Aadhaar used in the form, and go to the centre named in the appointment.",
      ),
      h2("DIY versus a Chartered Accountant"),
      p(
        "The portal is public and free. A CA is worth it when the principal place of business is a shared office, the constitution is an LLP or company that needs DSC, the officer has already raised REG-03, or you cannot spare a week chasing OTPs and document size limits. Filing360 prepares REG-01, uploads documents to spec, and replies to officer queries until REG-06 is issued.",
      ),
      h2("What to do this week"),
      ol([
        "Confirm whether you sell goods, services or both, and add up turnover from 1 April.",
        "Collect PAN, Aadhaar, address proof, bank proof and photographs in the portal’s file-size limits.",
        "Decide the HSN/SAC codes you actually sell — vague descriptions are a common REG-03 trigger.",
        "Apply on gst.gov.in or hand the pack to " + a(GST_REG, "Filing360 GST registration") + ".",
      ]),
      h2("Official source"),
      p("File the application only on " + a(PORTAL, "gst.gov.in") + ". Filing360 is a private facilitation platform — registrations are issued by GSTN / CBIC."),
      faqs([
        ["Is there any fee to get a GST number?", "No. GST registration is free on the government portal. You only pay a professional fee if you hire a consultant."],
        ["Can I apply for a GST number without a shop?", "Yes. You can use your home address with a utility bill and an NOC from the owner."],
        ["Can I have more than one GST number?", "Yes. You need a separate GSTIN in each state where you have a place of business."],
        ["Do freelancers follow the same process?", "Yes, with the services threshold of ₹20 lakh. See " + a("/services/gst/gst-return-filing-freelancer", "GST for freelancers") + "."],
      ]),
      cta(
        "Need a GST number quickly?",
        GST_REG,
        "Get GST registration with Filing360",
      ),
    ].join(""),
  },
{
    slug: "gstr-1-vs-gstr-3b",
    title: "GSTR-1 vs GSTR-3B: Difference, Due Dates & Mistakes",
    seoTitle: "GSTR-1 vs GSTR-3B: Difference, Due Dates & Mistakes",
    seoDescription:
      "Understand the difference between GSTR-1 and GSTR-3B, monthly and QRMP due dates, GSTR-1A, IMS, late fees and the mistakes that trigger GST notices.",
    excerpt:
      "What each return does, how auto-population and IMS now lock them together, and the mismatches that trigger DRC-01B and DRC-01C notices.",
    focusKeyword: "GSTR-1 vs GSTR-3B",
    tags: ["gstr-1", "gstr-3b", "gst returns", "gstr-1a", "ims", "gst due dates"],
    category: "gst",
    cover: "otherpageshero/db8c4e37-e4a2-4c8b-b9f3-8b2c718df8f5.png",
    inline: "banners/tax-summary.png",
    coverAlt: "Accountant reviewing GSTR-1 and GSTR-3B on a laptop",
    html: [
      p(
        "GSTR-1 vs GSTR-3B is the comparison every GST-registered business has to get right. The two returns are linked, and a mismatch between them is one of the most common reasons for GST notices. Here is what each return does and how to file them correctly in 2026.",
      ),
      h2("Key takeaways"),
      ul([
        "GSTR-1 reports invoice-level sales; GSTR-3B is where you pay tax and claim ITC.",
        "GSTR-1 now auto-fills GSTR-3B, so the sales return has to be right first.",
        "Monthly GSTR-1 is due on the 11th; GSTR-3B on the 20th.",
        "Mismatches trigger DRC-01B (liability) and DRC-01C (ITC) notices.",
      ]),
      img("INLINE", "GST tax summary cards showing outward supplies and tax payable"),
      h2("What is GSTR-1?"),
      p(
        "GSTR-1 is a statement of outward supplies. It reports invoice-level details of B2B sales, summary details of B2C sales, credit and debit notes, exports and advances. The data you upload flows into your buyers’ GSTR-2B, which decides how much input tax credit they can claim.",
      ),
      h2("What is GSTR-3B?"),
      p(
        "GSTR-3B is a summary return. It is where you declare total sales, claim input tax credit and pay the net tax. Interest and late fees are computed on it.",
      ),
      h2("Key differences"),
      table(
        ["Point", "GSTR-1", "GSTR-3B"],
        [
          ["Nature", "Invoice-wise statement of sales", "Summary return with tax payment"],
          ["Tax payment", "No", "Yes"],
          ["ITC claim", "No", "Yes"],
          ["Effect on buyers", "Populates buyers’ GSTR-2B", "No direct effect"],
          ["Monthly due date", "11th of next month", "20th of next month"],
          ["QRMP due date", "13th of month after quarter", "22nd or 24th of month after quarter, by state"],
        ],
      ),
      h2("How the two returns now work together"),
      ul([
        "<strong>Auto-population:</strong> sales declared in GSTR-1 are auto-filled into GSTR-3B.",
        "<strong>GSTR-1A:</strong> if you missed or misreported an invoice in GSTR-1, you can correct it in GSTR-1A before filing GSTR-3B for the same period.",
        "<strong>Hard-locking:</strong> the auto-filled liability in GSTR-3B can no longer be edited, so GSTR-1 must be right.",
        "<strong>Invoice Management System (IMS):</strong> buyers accept, reject or keep pending each supplier invoice, and only accepted invoices flow into their GSTR-2B.",
      ]),
      h2("Common mistakes and how to avoid them"),
      ul([
        "Claiming ITC not in GSTR-2B. Excess claims trigger DRC-01C notices — see " + a("/blog/how-to-reply-gst-notice", "how to reply to a GST notice") + ".",
        "Sales in GSTR-1 higher than in GSTR-3B. This triggers DRC-01B notices. Reconcile every month.",
        "Wrong place of supply. Charging CGST + SGST instead of IGST, or the reverse, means paying tax again under the correct head.",
        "Ignoring nil returns. Nil returns must still be filed, or late fees accumulate — " + a("/services/gst/gst-nil-return-filing", "nil GST return filing") + " covers quiet months.",
        "Old pending returns. Returns cannot be filed after three years from the due date, so clear backlogs quickly.",
      ]),
      h2("Late fees and interest"),
      p("Late fee: ₹50 per day (₹20 for nil returns), capped based on turnover. Interest: 18% per annum on tax paid late, calculated on the cash portion."),
      p("Filing360 handles this on " + a(GST_RETURNS, "monthly GST return filing") + " with WhatsApp reminders before each due date."),
      h2("A monthly close that actually works"),
      p(
        "Lock sales invoices by the 8th so GSTR-1 can go on the 11th. Reconcile GSTR-2B by the 16th before you claim ITC in GSTR-3B on the 20th. That calendar leaves room for GSTR-1A corrections and for finance to query a supplier whose invoice is missing from 2B. Filing 3B first and “fixing 1 later” is how DRC-01B lands.",
      ),
      h2("QRMP, in plain language"),
      p(
        "If turnover is up to ₹5 crore you can file GSTR-1 and GSTR-3B quarterly, with monthly tax payment in some months. The due dates shift to the 13th (GSTR-1) and the 22nd or 24th (GSTR-3B) after the quarter, depending on state. QRMP does not mean you can skip invoice hygiene — IMS and 2B still run every month for your buyers.",
      ),
      h2("What to do this week"),
      ol([
        "Download last month’s GSTR-1, GSTR-3B and GSTR-2B and tick every mismatch.",
        "Turn on invoice numbering that never repeats, including credit notes.",
        "Put the 11th and 20th (or your QRMP dates) on a shared calendar with a two-day buffer.",
      ]),
      h2("Worked scenario"),
      p(
        "A trader uploads ₹50 lakh of B2B invoices in GSTR-1 and then types ₹47 lakh into GSTR-3B because a credit note was missed. Auto-population should have prevented the edit; if an older period still shows a gap, DRC-01B follows. The fix is GSTR-1A (current period) or the next return — not a silent journal in the books. The same trader claiming ₹2 lakh extra ITC versus GSTR-2B is a DRC-01C. Both notices are cheaper to prevent with a close than to answer with a " +
          a("/blog/how-to-reply-gst-notice", "GST notice reply") +
          ".",
      ),
      p("Related reading: " + a("/blog/gstr-9-gstr-9c-annual-return", "GSTR-9 due date for FY 2025-26") + " and " + a("/services/gst/gst-composition-scheme", "GST composition scheme") + "."),
      p(
        "If you want the 11th and 20th off your plate, Filing360 reconciles books to GSTR-1 and GSTR-2B, files both returns, and pings you on WhatsApp before each due date. That is the practical way to keep GSTR-1 vs GSTR-3B from becoming a notice. See " +
          a(GST_RETURNS, "GST return filing") +
          ". Keep a one-page monthly recon even if a CA files — you will need it when a notice or the GSTR-9 due date arrives.",
      ),
      faqs([
        ["Can I file GSTR-3B before GSTR-1?", "The portal allows it, but since GSTR-3B now auto-fills from GSTR-1, filing GSTR-1 first is the correct practice."],
        ["Can I revise GSTR-3B?", "No. Corrections are made in the next period’s return or through GSTR-1A for sales."],
        ["Are both returns required for composition dealers?", "No. Composition dealers file CMP-08 quarterly and GSTR-4 annually."],
        ["What is IMS in GST?", "Invoice Management System lets buyers accept, reject or keep pending supplier invoices. Only accepted invoices flow into GSTR-2B, which is why GSTR-1 accuracy now affects your customers’ credit as well as your own 3B."],
      ]),
      cta("Tired of tracking due dates?", GST_RETURNS, "Start GST return filing with Filing360"),
    ].join(""),
  },
{
    slug: "gstr-9-gstr-9c-annual-return",
    title: "GSTR-9 Due Date for FY 2025-26: GSTR-9C, Late Fee",
    seoTitle: "GSTR-9 Due Date for FY 2025-26: GSTR-9C, Late Fee",
    seoDescription:
      "GSTR-9 due date for FY 2025-26 is 31 December 2026. Check who must file GSTR-9 and GSTR-9C, turnover limits, late fees and a reconciliation checklist.",
    excerpt:
      "Who must file GSTR-9 and GSTR-9C for FY 2025-26, the 31 December 2026 due date, late fees, and the reconciliation you should finish first.",
    focusKeyword: "GSTR-9 due date",
    tags: ["gstr-9", "gstr-9c", "gst annual return", "gst reconciliation", "fy 2025-26"],
    category: "gst",
    cover: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    inline: "otherpageshero/67335ffa-063b-4d92-bd37-8f1c6d5f5021.png",
    coverAlt: "Tax professional preparing GSTR-9 annual return documents",
    html: [
      p(
        "The GSTR-9 due date for FY 2025-26 is 31 December 2026. The GST annual return is a once-a-year summary of everything you reported in monthly or quarterly returns. For FY 2025-26, both GSTR-9 and GSTR-9C share that date — and it is the last clean chance to spot errors before the department does.",
      ),
      h2("Key takeaways"),
      ul([
        "GSTR-9 consolidates the year’s sales, tax paid and ITC.",
        "GSTR-9C is a self-certified reconciliation with audited accounts, required above ₹5 crore turnover.",
        "Turnover up to ₹2 crore: GSTR-9 is optional.",
        "Once filed, GSTR-9 cannot be revised.",
      ]),
      img("INLINE", "Calendar and hourglass reminding of the GSTR-9 due date"),
      h2("What is GSTR-9?"),
      p(
        "GSTR-9 is the annual return for regular taxpayers. It consolidates sales, tax paid, input tax credit claimed and reversed, and demands or refunds for the year. Filing360 prepares this on " +
          a(GST_ANNUAL, "GST annual return filing") +
          ".",
      ),
      h2("What is GSTR-9C?"),
      p(
        "GSTR-9C is a self-certified reconciliation statement. It reconciles the turnover and tax shown in your audited financial statements with the figures in GSTR-9.",
      ),
      h2("Who must file?"),
      table(
        ["Taxpayer", "GSTR-9", "GSTR-9C"],
        [
          ["Aggregate turnover up to ₹2 crore", "Optional", "Not required"],
          ["Turnover above ₹2 crore up to ₹5 crore", "Mandatory", "Not required"],
          ["Turnover above ₹5 crore", "Mandatory", "Mandatory"],
          ["Composition dealers", "File GSTR-4 instead", "Not required"],
          ["Casual, non-resident, ISD, TDS/TCS filers", "Not required", "Not required"],
        ],
      ),
      h2("Late fee"),
      p(
        "A late fee applies per day of delay, with lower daily amounts and caps for smaller taxpayers and up to ₹200 per day (capped at 0.5% of turnover in the state) for larger ones. Check the current slab for your turnover before the GSTR-9 due date.",
      ),
      h2("Reconciliation checklist before filing"),
      ol([
        "Match turnover in GSTR-1, GSTR-3B and your books for all 12 months — start from " + a("/blog/gstr-1-vs-gstr-3b", "GSTR-1 vs GSTR-3B") + ".",
        "Compare ITC in GSTR-2B with ITC claimed in GSTR-3B (Table 8 of GSTR-9).",
        "Identify ITC to be reversed for non-payment to suppliers within 180 days, blocked credits and exempt supplies.",
        "Report amendments of FY 2025-26 invoices made in FY 2026-27 returns up to the cut-off.",
        "Pay any short-paid tax through Form DRC-03 before filing, with interest.",
        "Report HSN-wise summaries of outward and inward supplies.",
      ]),
      h2("Common errors"),
      ul([
        "Reporting turnover from books without adjusting for credit notes and advances",
        "Ignoring ITC that appears in GSTR-2B but was never claimed",
        "Missing additional liability discovered during reconciliation",
        "Filing GSTR-9C without reconciling with audited accounts",
      ]),
      h2("How to use the 31 December deadline"),
      p(
        "Treat September–November as the reconciliation window, not 30 December. Pull all 12 months of GSTR-1 and GSTR-3B, the GSTR-2B annual download, and the trial balance. Differences on credit notes, unbilled revenue and advances are normal; leaving them unexplained is what turns a filing into a notice the following year. Pay genuine short tax through DRC-03 before you submit, with interest — do not hide it in a later month.",
      ),
      h2("Books versus GST: the usual gaps"),
      p(
        "Audited turnover includes items GST does not (exempt, non-GST, out-of-scope). GST turnover includes items books may net (credit notes, discounts, debit notes). GSTR-9C is the place you walk those bridges. If turnover is above ₹5 crore, start the walk while the statutory audit is still open so you are not reconciling twice.",
      ),
      h2("What to do this week"),
      ol([
        "Confirm whether your FY 2025-26 turnover is optional, GSTR-9 only, or GSTR-9 plus GSTR-9C.",
        "Export 12 months of returns and 2B into one workbook.",
        "Book the filing slot well before 31 December 2026.",
      ]),
      h2("Worked scenario"),
      p(
        "A company with ₹6.2 crore GST turnover must file both GSTR-9 and GSTR-9C. The statutory audit shows ₹6.4 crore because of exempt rent and a year-end cut-off. Table 5 and GSTR-9C exist to explain that ₹20 lakh, not to hide it. Another dealer at ₹1.8 crore can skip GSTR-9, but many still file so the year’s GSTR-1 versus 3B story is on record before a scrutiny notice. Either way, the GSTR-9 due date of 31 December 2026 is not the day to start Excel.",
      ),
      p("Related reading: " + a("/blog/gstr-1-vs-gstr-3b", "GSTR-1 vs GSTR-3B") + " and " + a(GST_RETURNS, "GST return filing") + "."),
      h2("How Filing360 files the annual return"),
      p(
        "We pull the year’s GSTR-1, GSTR-3B and GSTR-2B, map them to the trial balance, list every difference, get your sign-off, pay DRC-03 if needed, then file GSTR-9 and GSTR-9C. You see the recon before anything goes to the portal. That is the only reliable way to use the GSTR-9 due date instead of being used by it. Start from " +
          a(GST_ANNUAL, "GST annual return filing") +
          ". Bring the trial balance, GSTR-2B dumps and last year’s GSTR-9 if you have one — those three files answer most table questions.",
      ),
      faqs([
        ["Can GSTR-9 be revised?", "No. Once filed, it cannot be revised, so reconcile carefully."],
        ["Is GSTR-9 needed if my registration was cancelled mid-year?", "Yes, if you were registered for any part of the year and your turnover makes it mandatory."],
        ["Is a CA certification needed for GSTR-9C?", "No. GSTR-9C is now self-certified by the taxpayer."],
        ["What if I find extra tax due while reconciling?", "Pay it through Form DRC-03 with interest before you file GSTR-9. Do not wait for an assessment. The annual return cannot be revised, so the payment and the tables have to match on the day you submit."],
        ["Does a nil year still need GSTR-9?", "If you were registered and above the mandatory turnover, yes. If you are in the optional slab (up to ₹2 crore), you can skip it, but many businesses still file a nil annual return for a clean trail before the next GSTR-9 due date."],
      ]),
      cta("Deadline is 31 December 2026.", GST_ANNUAL, "Get GSTR-9 and GSTR-9C filed with Filing360"),
    ].join(""),
  },
{
    slug: "how-to-reply-gst-notice",
    title: "How to Reply to a GST Notice: Types & Time Limits",
    seoTitle: "How to Reply to a GST Notice: Types & Time Limits",
    seoDescription:
      "Received a GST notice? Learn GST notice reply steps for ASMT-10, DRC-01, DRC-01B, DRC-01C, REG-17 and GSTR-3A, including time limits and expert tips.",
    excerpt:
      "Common GST notice types, the form and deadline for each, and a step-by-step GST notice reply so a query does not become a demand.",
    focusKeyword: "GST notice reply",
    tags: ["gst notice", "drc-01", "asmt-10", "drc-01c", "show cause notice"],
    category: "gst",
    cover: "otherpageshero/fffdd1c9-200d-4f62-8b2d-8454f0a4a506.png",
    inline: "otherpageshero/150b9957-9a1d-4b30-925b-e321393e110d.png",
    coverAlt: "Tax expert on a support call helping a client with a GST notice reply",
    html: [
      p(
        "A GST notice reply done correctly and on time is what keeps a system-generated mismatch from turning into a tax demand, penalty or cancellation. Most notices are queries about returns — ignoring them is what makes them expensive.",
      ),
      h2("Key takeaways"),
      ul([
        "Download every notice from the GST portal and diary the exact reply date.",
        "DRC-01B and DRC-01C usually give only 7 days.",
        "If the demand is right, pay through DRC-03 with interest; if not, explain in writing on the portal.",
        "Appeals must be filed within 3 months of the order, with a 10% pre-deposit of disputed tax.",
      ]),
      img("INLINE", "Two professionals reviewing a GST notice and supporting papers"),
      h2("Common types of GST notices"),
      table(
        ["Notice", "Why it is issued", "Reply form and time limit"],
        [
          ["GSTR-3A", "Return not filed", "File the pending return within 15 days"],
          ["REG-03", "Query on a new registration application", "REG-04 within 7 working days"],
          ["REG-17", "Show cause notice for cancelling registration", "REG-18 within 7 working days"],
          ["ASMT-10", "Discrepancies found in scrutiny of returns", "ASMT-11 within 30 days (or as specified)"],
          ["DRC-01B", "Liability in GSTR-1 higher than in GSTR-3B", "Pay or explain in Part B within 7 days"],
          ["DRC-01C", "ITC claimed in GSTR-3B higher than in GSTR-2B", "Pay or explain in Part B within 7 days"],
          ["DRC-01", "Show cause notice demanding tax", "Reply within the period given in the notice (usually 30 days)"],
          ["ADT-01", "Department audit", "Produce records on the date given"],
        ],
      ),
      p("DRC-01B often follows the mismatches explained in " + a("/blog/gstr-1-vs-gstr-3b", "GSTR-1 vs GSTR-3B") + "."),
      h2("Step-by-step: how to file a GST notice reply"),
      ol([
        "Download the notice from Services → User Services → View Notices and Orders on the " + a(PORTAL, "GST portal") + ".",
        "Note the deadline. Mark the exact reply date; extensions are not automatic.",
        "Identify the issue — return mismatch, ITC difference, turnover gap or registration.",
        "Reconcile GSTR-1, GSTR-3B, GSTR-2B, e-way bills and your books for the period.",
        "Decide: pay or contest. If the demand is correct, pay through DRC-03 with interest. If not, prepare a written explanation.",
        "Draft the reply point by point, quoting the relevant sections, and attach invoices, ledgers, reconciliations and earlier correspondence.",
        "File the reply on the portal in the prescribed form and save the acknowledgement.",
        "Request a personal hearing for show cause notices if you need to present your case.",
      ]),
      h2("Penalty relief if you act early"),
      p(
        "For demands not involving fraud, paying the tax and interest within the time allowed after the show cause notice can significantly reduce or remove the penalty. In fraud cases, penalty can go up to 100% of the tax. Acting early is always cheaper.",
      ),
      h2("What if the order goes against you?"),
      p(
        "You can file an appeal before the Appellate Authority within 3 months of the order, with a pre-deposit of 10% of the disputed tax. Further appeals lie with the GST Appellate Tribunal. If registration was cancelled, see " +
          a("/services/gst/gst-revocation", "how to revoke a cancelled GST registration") +
          ".",
      ),
      h2("Tips from our CAs"),
      ul([
        "Never ignore a notice, even if you think it is wrong.",
        "Keep your registered email and mobile number updated.",
        "Reconcile GSTR-2B and books every month to prevent notices.",
        "Reply in writing on the portal; oral explanations are not on record.",
      ]),
      h2("How to write a reply that closes the matter"),
      p(
        "Open with the notice number, date and period. Answer each allegation in the same order as the notice. For a DRC-01C, attach a line-by-line map of 3B ITC to 2B invoices and explain every rupee that is not there (credit note, rejected invoice, IMS pending). For ASMT-10, attach the GSTR-1 versus books recon. End with the prayer: drop the proceedings, or confirm the DRC-03 ARN if you have paid. Vague letters get a demand order.",
      ),
      h2("What not to do"),
      ul([
        "Do not wait for a reminder SMS. The clock started on the date of the notice.",
        "Do not pay under protest without saying so in the reply — you may lose the chance to contest.",
        "Do not file a one-line “we will look into it”. That is not a reply in law.",
        "Do not miss REG-18 if the notice is REG-17; cancellation follows quickly, and then you need " +
          a("/services/gst/gst-revocation", "GST revocation") +
          ".",
      ]),
      h2("What to do today"),
      ol([
        "Download the PDF from View Notices and Orders and note the due date in writing.",
        "Forward it to your CA the same day, with the period’s GSTR-1, 3B and 2B.",
        "If the amount is clearly due, pay DRC-03 and still file the written reply attaching the challan.",
      ]),
      h2("Worked scenario"),
      p(
        "A manufacturer gets DRC-01C because March GSTR-3B claimed a ₹4 lakh invoice the supplier filed only in April’s GSTR-1. The GST notice reply is: here is the invoice, here is April 2B where it appeared, we will not claim it twice. Paying first and explaining later is optional if the credit was simply early; paying is mandatory if the invoice is fake or blocked. A REG-17 for six months of non-filing is a different letter — file the returns, then REG-18, or you will be on the " +
          a("/services/gst/gst-revocation", "GST revocation") +
          " path.",
      ),
      p("Related reading: " + a("/blog/gstr-1-vs-gstr-3b", "GSTR-1 vs GSTR-3B") + "."),
      faqs([
        ["Can I reply to a GST notice myself?", "Yes, but a professionally drafted reply with reconciliations has a much better chance of closing the matter."],
        ["What happens if I don’t reply?", "The officer can pass an order based on available information, raise a demand with interest and penalty, or cancel your registration."],
        ["Where do I upload the GST notice reply?", "On gst.gov.in under Services → User Services → View Notices and Orders, using the form named in the notice (REG-04, REG-18, ASMT-11, DRC-01B Part B, and so on). Save the acknowledgement PDF."],
      ]),
      cta("Received a GST notice?", CONSULT, "Share it with Filing360 — we review it and draft a complete GST notice reply"),
    ].join(""),
  },
{
    slug: "belated-revised-updated-itr",
    title: "Belated ITR for FY 2025-26: Revised & ITR-U Options",
    seoTitle: "Belated ITR for FY 2025-26: Revised & ITR-U Options",
    seoDescription:
      "Missed the ITR due date for FY 2025-26? File a belated ITR or revised return by 31 December 2026. Late fee, interest, losses and ITR-U explained.",
    excerpt:
      "How a belated ITR, revised return and ITR-U differ, the 31 December 2026 deadline, late fees, and which option to pick.",
    focusKeyword: "belated ITR",
    tags: ["belated return", "revised return", "itr-u", "income tax", "ay 2026-27"],
    category: "income-tax",
    cover: "otherpageshero/94491b05-7085-433d-8efb-cb4c309798ae.png",
    inline: "banners/itr-refund.png",
    coverAlt: "Salaried professional checking belated ITR filing and refund estimate",
    html: [
      p(
        "A belated ITR is still available if you missed the original due date for FY 2025-26 (AY 2026-27). If you filed but made a mistake, you can file a revised return. Both have the same last date: 31 December 2026, unless extended by CBDT.",
      ),
      h2("Key takeaways"),
      ul([
        "Belated and revised returns for AY 2026-27 close on 31 December 2026.",
        "Late fee is ₹5,000, or ₹1,000 if income does not exceed ₹5 lakh.",
        "Business and capital losses generally cannot be carried forward on a belated return.",
        "After 31 December, ITR-U is the remaining route — with extra tax of 25% to 70%.",
      ]),
      img("INLINE", "ITR refund estimate on screen while filing a belated return"),
      h2("Belated return: filing after the due date"),
      p(
        "A belated ITR is an income tax return filed after the original due date but before 31 December of the assessment year. File it on the " +
          a(ITR_PORTAL, "Income Tax e-filing portal") +
          " or through " +
          a(ITR, "income tax e-filing with Filing360") +
          ".",
      ),
      p("Consequences of filing late:"),
      ul([
        "Late fee: ₹5,000, reduced to ₹1,000 if total income does not exceed ₹5 lakh. No fee if income is below the basic exemption limit.",
        "Interest: 1% per month on unpaid tax from the due date until filing.",
        "Losses: business losses and capital losses cannot be carried forward (house property loss can still be carried forward).",
        "Tax regime: if you have no business income, you are generally stuck with the new tax regime, because the old regime can be chosen only in a return filed by the original due date.",
      ]),
      h2("Revised return: correcting a mistake"),
      p(
        "If you discover an omission or wrong statement in your original or belated return, you can file a revised return by 31 December 2026 or before the assessment is completed, whichever is earlier. There is no limit on the number of revisions and no fee for revising.",
      ),
      p("Common reasons to revise:"),
      ul([
        "Interest income from savings, FDs or bonds missed",
        "Wrong deduction claimed or a valid deduction missed",
        "Capital gains not reported",
        "Mismatch with AIS or Form 26AS",
      ]),
      h2("Updated return (ITR-U): after 31 December"),
      p(
        "If both deadlines are missed, you can still file an updated return within 48 months from the end of the assessment year, but only to report additional income and pay more tax.",
      ),
      table(
        ["Time of filing (from end of AY)", "Additional tax payable"],
        [
          ["Within 12 months", "25% of additional tax and interest"],
          ["12 to 24 months", "50%"],
          ["24 to 36 months", "60%"],
          ["36 to 48 months", "70%"],
        ],
      ),
      p("An updated return cannot be used to claim a refund, increase a loss or reduce tax."),
      h2("AIS, Form 26AS and why people miss the deadline"),
      p(
        "Most belated ITR filings we see are not wilful. AIS shows interest, TCS, shares and foreign assets the taxpayer never put in a spreadsheet. Download AIS and 26AS first, then pick the ITR form. Filing a 1 instead of a 2, or skipping Schedule FA, is how a belated return becomes a revised return two weeks later. Give yourself a week, not an evening.",
      ),
      h2("Old versus new regime on a late return"),
      p(
        "If you have no business income and you missed the original due date, you generally cannot opt for the old regime in a belated ITR. That single rule can cost more than the ₹1,000 late fee. If you have business income, the regime choice follows the return you actually file — get a CA to model both before you click submit.",
      ),
      h2("What to do this week"),
      ol([
        "Log in to " + a(ITR_PORTAL, "incometax.gov.in") + " and download AIS, TIS and 26AS.",
        "If you have not filed AY 2026-27 yet, treat 31 December 2026 as a hard stop for a belated ITR.",
        "If you already filed and AIS does not match, revise before the same date.",
      ]),
      h2("Which option should you choose?"),
      table(
        ["Situation", "Option"],
        [
          ["Never filed, before 31 Dec 2026", "Belated return"],
          ["Filed but found an error, before 31 Dec 2026", "Revised return"],
          ["Never filed or under-reported, after 31 Dec 2026", "Updated return (ITR-U)"],
        ],
      ),
      h2("Worked scenario"),
      p(
        "A salaried person with ₹9 lakh income and missed FD interest of ₹40,000 files nothing by the original due date. A belated ITR by 31 December 2026 still gets the refund of excess TDS, minus a ₹1,000 late fee. If they wait until February 2027, ITR-U is the path and extra tax applies on any additional income — refunds are not the point of ITR-U. Another person who filed on time but forgot Schedule FA should revise, not file ITR-U.",
      ),
      p("Related reading: " + a(ITR, "income tax e-filing") + " and " + a("/services/income-tax/income-tax-notice", "income tax notice response") + "."),
      p(
        "Filing360 downloads AIS, picks the ITR form, flags old-versus-new regime, and files the belated ITR or the revision before 31 December 2026. If the window has closed, we tell you honestly whether ITR-U is worth the extra tax. Bring Form 16, AIS and bank interest certificates; those three close most salaried files.",
      ),
      faqs([
        ["Will I get a refund in a belated ITR?", "Yes, refunds are allowed in belated returns, though interest on the refund may be reduced."],
        ["Can a belated return be revised?", "Yes, a belated return can be revised within the same deadline."],
        ["What if I received a notice for non-filing?", "Respond on the e-filing portal and file the return immediately; contact a professional if a penalty or prosecution notice is involved."],
        ["Does a belated ITR stop interest under section 234A?", "No. Interest on unpaid tax runs from the original due date until you file and pay. Filing earlier in the belated window costs less interest than waiting for 31 December."],
      ]),
      cta("Don’t wait for 31 December.", ITR, "File your belated ITR with Filing360"),
    ].join(""),
  },
  {
    slug: "advance-tax-due-dates",
    title: "Advance Tax Due Dates, Calculation and Interest (with Example)",
    seoTitle: "Advance Tax Due Dates, Calculation & Interest (with Example)",
    seoDescription: "Advance tax due dates for 15 June, 15 September, 15 December and 15 March, how to calculate instalments, and interest under Sections 234B and 234C.",
    excerpt: "Pay tax as you earn: instalment calendar, calculation steps, exemptions and interest for shortfall — explained by CAs.",
    focusKeyword: "advance tax due dates",
    tags: ["advance tax", "234B", "234C", "tax planning", "instalments"],
    category: "income-tax",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "Advance tax calendar and calculation worksheet",
    html: [
      p("Advance tax means paying income tax during the year as you earn, instead of one lump sum at the end. If you skip instalments, interest under Sections 234B and 234C adds up quickly. Start with Filing360’s " + a(TAX_PLAN, "tax planning service") + " to project income and lock each due date."),
      h2("When advance tax applies"),
      ul(["Tax payable for the year is ₹10,000 or more after TDS and TCS.", "Resident senior citizens without business income are exempt.", "Presumptive taxpayers can pay 100% by 15 March."]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("Instalment calendar"),
      ul(["15 June — 15% of estimated tax", "15 September — 45% cumulative", "15 December — 75% cumulative", "15 March — 100%"]),
      h2("Interest for shortfall"),
      p("Section 234C charges interest for deferment of instalments. Section 234B applies when advance tax paid is less than 90% of assessed tax. Both are avoidable with a mid-year review."),
      h2("Who must pay advance tax?"),
      p("Anyone whose tax liability for the year, after TDS and TCS, is ₹10,000 or more. Common cases: business owners, professionals, freelancers, landlords, investors with capital gains, and salaried people with large other income. Resident senior citizens (60+) without business or professional income are exempt."),
      h2("Worked example"),
      p("Estimated tax for the year after TDS: ₹2,00,000. Pay ₹30,000 by 15 June, ₹90,000 cumulative by 15 September, ₹1,50,000 by 15 December and ₹2,00,000 by 15 March. Capital gains that arise late in the year can be covered in remaining instalments without deferment interest for earlier instalments."),
      h2("How to pay"),
      p("Pay through the e-filing portal’s e-Pay Tax service using Challan No. 280 with “Advance tax” as the type of payment, and keep the challan details for your return."),
      faqs([["Can I revise estimates mid-year?", "Yes. Recalculate before each due date if income changes."], ["Does salary TDS count?", "Yes. Advance tax is only on the balance after TDS/TCS credit."]]),
      cta("Need help with advance tax?", TAX_PLAN, "Plan my taxes with Filing360")
    ].join(""),
  },
  {
    slug: "old-vs-new-tax-regime",
    title: "Old vs New Tax Regime: Which Is Better for You?",
    seoTitle: "Old vs New Tax Regime: Which Is Better for You? (With Examples)",
    seoDescription: "Compare old vs new tax regime for salaried taxpayers: rates, rebate, deductions, and how Filing360 picks the lower tax option every year.",
    excerpt: "Lower slab rates versus deductions like 80C and HRA — a practical CA comparison before you file.",
    focusKeyword: "old vs new tax regime",
    tags: ["old tax regime", "new tax regime", "tax rebate", "80C", "ITR filing"],
    category: "income-tax",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "Old versus new tax regime comparison chart",
    html: [
      p("Choosing the wrong tax regime can cost thousands. Filing360’s " + a(TAX_IND, "ITR filing for individuals") + " compares both regimes on your Form 16, investments and housing numbers before we file."),
      h2("New regime in brief"),
      ul(["Lower slab rates and a higher rebate for resident individuals.", "Most deductions (80C, 80D, HRA, home-loan interest on self-occupied property) are not available.", "Standard deduction continues for salaried taxpayers."]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("Old regime in brief"),
      ul(["Higher rates, but Chapter VI-A deductions and many exemptions remain.", "Often better if you claim large 80C, 80D, HRA and home-loan interest."]),
      h2("How we decide"),
      ol(["Pull AIS, Form 16 and investment proofs.", "Compute tax under both regimes.", "File under the lower option when you are eligible to choose."]),
      faqs([["Can salaried people switch every year?", "Yes, if they have no business income and file on time."], ["Is the new regime always better after the rebate?", "No. High deduction claimants often still win on the old regime — run both numbers."]]),
      cta("Want both regimes calculated?", TAX_IND, "File my ITR with Filing360")
    ].join(""),
  },
  {
    slug: "income-tax-act-2025",
    title: "Income-tax Act, 2025: What Changes for Taxpayers from April 2026",
    seoTitle: "Income-tax Act, 2025: What Changes for Taxpayers from April 2026",
    seoDescription: "The Income-tax Act, 2025 replaces the 1961 Act from tax year 2026-27: tax year concept, renumbered sections, and what stays the same for returns.",
    excerpt: "A plain-English briefing on the new Act — which years still follow 1961 law, and how Filing360 files under both.",
    focusKeyword: "Income-tax Act 2025",
    tags: ["Income-tax Act 2025", "tax year", "ITR", "tax law India"],
    category: "income-tax",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "Income-tax Act 2025 explainer graphic",
    html: [
      p("From 1 April 2026, the Income-tax Act, 2025 applies for tax year 2026-27 onwards. Earlier years — including FY 2025-26 returns filed in 2026 — still follow the Income-tax Act, 1961. Filing360’s " + a(TAX_IND, "income tax team") + " applies the correct law for each year."),
      h2("What changes"),
      ul(["“Tax year” replaces previous year / assessment year language.", "Most sections are reorganised and renumbered.", "Rates and many concepts continue, with updates as notified in the Budget."]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("What you should do"),
      ol(["Keep FY 2025-26 records labelled under the 1961 Act.", "Expect new section references on notices for later years.", "Ask your CA which Act applies before replying to any notice."]),
      faqs([["Do I need a new PAN?", "No. PAN and the e-filing portal continue; forms and section citations update over time."], ["Are old FAQs and articles still valid?", "For FY 2025-26 and earlier, yes. For tax year 2026-27+, check updated references."]]),
      cta("Filing across both Acts?", TAX_IND, "Talk to a Filing360 CA")
    ].join(""),
  },
  {
    slug: "aoc-4-mgt-7-filing",
    title: "AOC-4 and MGT-7 for FY 2025-26: Due Dates, Late Fees and Penalties",
    seoTitle: "AOC-4 & MGT-7 Due Date for FY 2025-26, Late Fee and Penalty",
    seoDescription: "AOC-4 is due within 30 days and MGT-7 within 60 days of the AGM. Due dates, attachments, late fees and penalties for FY 2025-26.",
    excerpt: "The two core ROC annual filings every company must get right — timelines, forms and what Filing360 files for you.",
    focusKeyword: "AOC-4 due date",
    tags: ["AOC-4", "MGT-7", "ROC filing", "annual compliance", "MCA"],
    category: "compliance",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "AOC-4 and MGT-7 ROC filing checklist",
    html: [
      p("AOC-4 and MGT-7 are the two main annual filings every company makes with the ROC. Filing360’s " + a(MCA_COMPANY, "company compliance plan") + " prepares financials, files both forms and tracks additional fees if anything slips."),
      h2("Due dates"),
      ul(["AOC-4 — within 30 days of the AGM", "MGT-7 / MGT-7A — within 60 days of the AGM", "AGM for FY 2025-26 — generally by 30 September 2026"]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("Late fees"),
      p("MCA charges additional fees of ₹100 per day of delay on most e-forms, with no upper cap on many filings. Persistent non-filing risks penalties on officers and even strike-off."),
      faqs([["Who files MGT-7A?", "Small companies and OPCs use MGT-7A; other companies use MGT-7."], ["Do dormant companies file?", "Dormant status has its own forms; ask before skipping AOC-4/MGT-7."]]),
      cta("Need AOC-4 and MGT-7 filed?", MCA_COMPANY, "Get ROC compliance with Filing360")
    ].join(""),
  },
  {
    slug: "post-incorporation-compliance",
    title: "Compliances After Incorporation of a Private Limited Company",
    seoTitle: "Compliances After Incorporation of a Private Limited Company",
    seoDescription: "First filings after incorporating a private limited company: INC-20A, bank account, GST, auditor, share certificates and first-year ROC calendar.",
    excerpt: "What to do in the first 180 days after incorporation so your company stays compliant from day one.",
    focusKeyword: "post incorporation compliance",
    tags: ["post incorporation", "INC-20A", "private limited company", "ROC", "startup compliance"],
    category: "compliance",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "Post-incorporation compliance checklist for private limited companies",
    html: [
      p("Incorporation is step one. Within months you need commencement of business, share certificates, auditor appointment and a filing calendar. Filing360’s " + a(MCA_COMPANY, "MCA compliance service") + " and " + a(PVT, "private limited company registration") + " teams hand you a first-year checklist on day one."),
      h2("First 180 days"),
      ol(["File INC-20A (commencement of business) after depositing share capital.", "Open a current account and issue share certificates.", "Appoint the first auditor and file ADT-1 where required.", "Register for GST, PF/ESI or MSME if applicable.", "Hold board meetings and maintain minutes and registers."]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("First annual cycle"),
      ul(["Board meetings and AGM calendar", "AOC-4 and MGT-7 after the AGM", "DIR-3 KYC for every director", "Income-tax return (ITR-6) and tax audit if applicable"]),
      faqs([["What if INC-20A is late?", "Additional fees apply and the company cannot borrow or commence business properly until filed."], ["Can Filing360 handle GST and ROC together?", "Yes — registration and ongoing compliance can sit with one CA team."]]),
      cta("Just incorporated?", MCA_COMPANY, "Get a first-year compliance plan")
    ].join(""),
  },
  {
    slug: "dir-3-kyc",
    title: "DIR-3 KYC: Who Must File, Late Fee and DIN Deactivation",
    seoTitle: "DIR-3 KYC: Who Must File, Due Date, Late Fee & DIN Deactivation",
    seoDescription: "DIR-3 KYC keeps your DIN active. Who must file, DIR-3 KYC vs KYC-Web, late fees and how to reactivate a deactivated DIN.",
    excerpt: "Miss DIR-3 KYC and your DIN can be deactivated — here’s the filing path Filing360 uses for directors.",
    focusKeyword: "DIR-3 KYC",
    tags: ["DIR-3 KYC", "DIN", "director KYC", "MCA", "DIN deactivated"],
    category: "compliance",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "DIR-3 KYC filing on the MCA portal",
    html: [
      p("Every director with a DIN must complete DIR-3 KYC as per MCA’s KYC cycle and whenever mobile, email or address changes. Filing360 files " + a(MCA_DIN, "DIN eKYC") + " and helps reactivate deactivated DINs."),
      h2("DIR-3 KYC vs DIR-3 KYC-Web"),
      ul(["DIR-3 KYC (e-form) — typically for first-time KYC or when details change.", "DIR-3 KYC-Web — web-based confirmation when personal details are unchanged, as notified by MCA."]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("If DIN is deactivated"),
      p("File the KYC form with the prescribed late fee to reactivate. Until then, the director cannot sign most MCA forms."),
      faqs([["Is KYC needed every year?", "Follow the current MCA KYC cycle and update immediately on any contact-detail change."], ["Do LLP designated partners need it?", "Yes, DIN holders who are designated partners also complete KYC."]]),
      cta("Need DIR-3 KYC filed?", MCA_DIN, "File DIN eKYC with Filing360")
    ].join(""),
  },
  {
    slug: "what-is-a-virtual-cfo",
    title: "What Is a Virtual CFO? Role, Cost and When You Need One",
    seoTitle: "What Is a Virtual CFO? Role, Cost and When You Need One",
    seoDescription: "A Virtual CFO is a part-time finance leader for budgets, cash flow, fundraising and board reporting — without a full-time CFO salary.",
    excerpt: "When bookkeeping is not enough: what a Virtual CFO does, how fees work, and how Filing360 layers it on clean books.",
    focusKeyword: "what is a Virtual CFO",
    tags: ["virtual CFO", "outsourced CFO", "cash flow", "fundraising", "MIS"],
    category: "compliance",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "Virtual CFO reviewing startup financial dashboard",
    html: [
      p("A Virtual CFO is an experienced finance leader who works with your business part-time for a fixed monthly fee. Filing360 pairs " + a(ACC_BOOKS, "bookkeeping") + " and " + a(ACC_MIS, "MIS dashboards") + " with CFO-level planning for growing teams."),
      h2("What a Virtual CFO does"),
      ul(["Budgets, forecasts and cash-flow planning", "Board and investor reporting packs", "Bank loan and fundraising support", "Control reviews and SOP guidance"]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("When you need one"),
      ul(["Revenue is growing but cash surprises keep happening", "You are raising a round or taking a term loan", "Founders spend too much time in spreadsheets"]),
      faqs([["Is a Virtual CFO the same as an accountant?", "No. Accountants keep books accurate. A Virtual CFO uses those numbers to plan and decide."], ["How are fees structured?", "Usually a monthly retainer based on scope — quote after a discovery call."]]),
      cta("Curious about Virtual CFO?", ACC_BOOKS, "Talk to Filing360 about finance leadership")
    ].join(""),
  },
  {
    slug: "what-is-mis-reporting",
    title: "What Is MIS Reporting? Monthly Packs Founders Actually Use",
    seoTitle: "What Is MIS Reporting? Monthly Packs Founders Actually Use",
    seoDescription: "MIS reporting turns books into decisions: P&L vs budget, cash, receivables ageing and KPIs — built monthly by Filing360 CAs.",
    excerpt: "Stop flying blind: what belongs in a monthly MIS pack and how dashboards keep owners aligned.",
    focusKeyword: "what is MIS reporting",
    tags: ["MIS reporting", "management information system", "KPI dashboard", "cash flow"],
    category: "compliance",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "Monthly MIS reporting pack for business owners",
    html: [
      p("MIS reporting turns your books into decisions. Filing360 builds monthly packs and " + a(ACC_MIS, "live dashboards") + " so owners see profit, cash and ageing before problems grow."),
      h2("Typical monthly MIS pack"),
      ul(["Profit and loss with budget vs actual", "Cash flow and bank position", "Receivables and payables ageing", "Product or customer profitability", "Key ratios and KPIs"]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("MIS vs bookkeeping"),
      p("Bookkeeping records transactions. MIS summarises them for action. You need both — messy books make useless dashboards."),
      faqs([["How often should MIS run?", "Monthly for most SMEs; weekly flash metrics for high-growth startups."], ["Which tools do you use?", "Excel, Power BI, Zoho Analytics or Looker Studio — matched to your stack."]]),
      cta("Want a founder-ready MIS?", ACC_MIS, "Build my MIS with Filing360")
    ].join(""),
  },
  {
    slug: "private-limited-company-registration-process",
    title: "Private Limited Company Registration Process in India (2026)",
    seoTitle: "Private Limited Company Registration Process in India (2026)",
    seoDescription: "Step-by-step private limited company registration: DSC, DIN, name approval, SPICe+, MOA/AOA, PAN/TAN and post-incorporation filings.",
    excerpt: "From name reservation to Certificate of Incorporation — the Filing360 checklist founders follow.",
    focusKeyword: "private limited company registration process",
    tags: ["private limited company", "SPICe+", "company registration", "MCA", "startup"],
    category: "company-registration",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "Private limited company registration process in India",
    html: [
      p("A private limited company is the default structure for startups that want limited liability and funding readiness. Filing360’s " + a(PVT, "private limited company registration") + " handles DSC, SPICe+ and the first compliance hand-off."),
      h2("Step-by-step process"),
      ol(["Obtain DSC and DIN for proposed directors.", "Reserve the company name.", "File SPICe+ with MOA, AOA, registered office proof and declarations.", "Receive Certificate of Incorporation with PAN and TAN.", "Open a bank account, issue shares and file INC-20A."]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("Why founders choose Pvt Ltd"),
      ul(["Limited liability and separate legal entity", "Easier to raise equity and ESOP talent", "Clear governance versus proprietorships"]),
      faqs([["How long does registration take?", "Often a few working days after documents are clean; name issues are the usual delay."], ["Is GST included?", "GST is separate — we can register GST right after incorporation if you need it."]]),
      cta("Ready to incorporate?", PVT, "Register a private limited company")
    ].join(""),
  },
  {
    slug: "section-8-vs-trust-vs-society",
    title: "Section 8 Company vs Trust vs Society: Which Structure Fits?",
    seoTitle: "Section 8 Company vs Trust vs Society: Which Structure Fits?",
    seoDescription: "Compare Section 8 company, trust and society for non-profits: registration, governance, funding and compliance — choose with a CA.",
    excerpt: "Three ways to run a non-profit in India, compared on control, funding and filings.",
    focusKeyword: "Section 8 vs trust vs society",
    tags: ["Section 8 company", "trust registration", "society registration", "NGO", "non profit"],
    category: "company-registration",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "Section 8 company versus trust versus society comparison",
    html: [
      p("Non-profits in India usually choose a Section 8 company, a public trust or a society. Filing360 registers " + a(SEC8, "Section 8 companies") + " and " + a(TRUST, "trusts") + " and explains the compliance load before you decide."),
      h2("Quick comparison"),
      ul(["Section 8 company — Companies Act entity, strong governance, preferred by many donors and CSR teams.", "Trust — settlor-driven, common for charitable and religious purposes; state trust laws apply.", "Society — member-based under the Societies Registration Act; democratic but paperwork-heavy in some states."]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("How to choose"),
      ol(["List funding sources (FCRA, CSR, grants, crowdfunding).", "Decide how centralised control should be.", "Check state rules and 12A/80G plans with a CA."]),
      faqs([["Can a Section 8 pay dividends?", "No. Profits must be applied to the charitable objects."], ["Which is fastest to register?", "It depends on the state and documents; Section 8 via MCA is often predictable nationwide."]]),
      cta("Registering a non-profit?", SEC8, "Talk to Filing360 about the right structure")
    ].join(""),
  },
  {
    slug: "what-is-a-cma-report",
    title: "What Is a CMA Report? Bank Format Explained for Borrowers",
    seoTitle: "What Is a CMA Report? Bank Format Explained for Borrowers",
    seoDescription: "A CMA report presents past and projected financials in the format banks use for working capital and term loans — prepared by Filing360 CAs.",
    excerpt: "Why lenders ask for CMA data, what Forms I–VI cover, and how we prepare bank-ready packs.",
    focusKeyword: "what is a CMA report",
    tags: ["CMA report", "bank loan", "working capital", "MPBF", "project finance"],
    category: "startup",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "CMA report for bank loan assessment",
    html: [
      p("Banks assess working capital and term loans using CMA data. Filing360 prepares " + a(FUNDS_CMA, "CMA reports") + " in your bank’s format with projections, ratios and MPBF workings."),
      h2("What CMA includes"),
      ul(["Operating statements and projected P&L", "Balance sheet and ratio analysis", "Current assets / liabilities assessment", "Fund flow and assessed bank finance"]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("CMA vs DPR vs TEV"),
      p("CMA is the financial template. A DPR is the full project story. A TEV is an independent viability opinion. Many proposals need more than one."),
      faqs([["How long does CMA preparation take?", "Typically 7–15 working days after complete data is shared."], ["Do you guarantee sanction?", "No — we make the file bank-ready and support queries until the credit decision."]]),
      cta("Need CMA for a loan?", FUNDS_CMA, "Get my CMA ready")
    ].join(""),
  },
  {
    slug: "ind-as-116-lease-accounting-example",
    title: "Ind AS 116 Lease Accounting with Example & Journal Entries",
    seoTitle: "Ind AS 116 Lease Accounting with Example & Journal Entries",
    seoDescription: "Ind AS 116 brings most leases on balance sheet. Worked example with ROU asset, lease liability and P&L impact — by Filing360 CAs.",
    excerpt: "A practical lease example: initial recognition, monthly entries and how EBITDA changes.",
    focusKeyword: "Ind AS 116 example",
    tags: ["Ind AS 116", "lease accounting", "ROU asset", "lease liability", "IFRS 16"],
    category: "compliance",
    cover: "otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    inline: "otherpageshero/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png",
    coverAlt: "Ind AS 116 lease accounting example illustration",
    html: [
      p("Ind AS 116 requires lessees to recognise a right-of-use asset and lease liability for most leases. Filing360’s " + a(ACC_IFRS, "Ind AS / IFRS advisory") + " builds lease registers and journal entries your auditors accept."),
      h2("Simple example"),
      ul(["3-year office lease, annual rent ₹12 lakh paid in advance, incremental borrowing rate 10%.", "Recognise lease liability at present value of unpaid rentals; ROU asset includes initial liability and prepaid rent.", "Each period: interest on liability + depreciation on ROU (instead of straight rent expense)."]),
      img("INLINE", "Filing360 Chartered Accountant reviewing compliance documents"),
      h2("Why finance teams care"),
      p("EBITDA usually rises (rent removed), while depreciation and interest increase. Debt-like lease liabilities can affect covenants — model this before signing long leases."),
      faqs([["Are short-term leases exempt?", "Short-term and low-value leases may use practical expedients — document the policy."], ["Do we need a lease register?", "Yes. Auditors expect a complete register of contracts, terms, rates and measurements."]]),
      cta("Need Ind AS 116 help?", ACC_IFRS, "Talk to an Ind AS expert")
    ].join(""),
  }
];
