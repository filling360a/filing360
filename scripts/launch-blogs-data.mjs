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
        "Choose the composition scheme if eligible — read " + a("/blog/gst-composition-scheme", "GST composition scheme 2026") + ".",
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
        ["Do freelancers follow the same process?", "Yes, with the services threshold of ₹20 lakh. See " + a("/blog/gst-registration-for-freelancers", "GST for freelancers") + "."],
      ]),
      cta(
        "Need a GST number quickly?",
        GST_REG,
        "Get GST registration with Filing360",
      ),
    ].join(""),
  },
  {
    slug: "gst-registration-for-freelancers",
    title: "GST for Freelancers in India 2026: Is It Mandatory?",
    seoTitle: "GST for Freelancers in India 2026: Is It Mandatory?",
    seoDescription:
      "Do freelancers need GST registration? Learn the ₹20 lakh limit, GST on foreign clients, LUT, GST rate for freelancers and how to invoice correctly.",
    excerpt:
      "When GST for freelancers becomes mandatory, how export of services and LUT work, and what to put on Indian versus foreign invoices.",
    focusKeyword: "GST for freelancers",
    tags: ["gst for freelancers", "export of services", "lut", "consultants", "freelancer gst limit"],
    category: "gst",
    cover: "otherpageshero/thinking.png",
    inline: "otherpageshero/f477d466-898a-47a9-ad61-3a41c70eddd6.png",
    coverAlt: "Freelancer planning GST registration and invoices at a desk",
    html: [
      p(
        "GST for freelancers is one of the most searched questions among developers, designers, writers and consultants — especially when clients sit abroad. The answer depends on your turnover and the kind of clients you serve, not on whether you call yourself a freelancer or a consultant.",
      ),
      h2("Key takeaways"),
      ul([
        "Service providers register once aggregate turnover crosses ₹20 lakh (₹10 lakh in some states).",
        "Foreign receipts count towards that turnover.",
        "Inter-state services do not force registration below the limit.",
        "Once registered, an LUT lets you export without charging IGST.",
      ]),
      img("INLINE", "Consultant and freelancer reviewing GST invoices together"),
      h2("The GST registration limit for freelancers"),
      p(
        "Freelancers supply services, so registration becomes mandatory once aggregate turnover crosses ₹20 lakh in a financial year (₹10 lakh in certain special category states). Aggregate turnover includes fees from Indian clients, receipts from foreign clients (export of services) and exempt services, if any. It excludes GST itself.",
      ),
      p(
        "So a freelancer earning ₹15 lakh from foreign clients and ₹8 lakh from Indian clients has a turnover of ₹23 lakh and must register. Apply through " +
          a(GST_REG, "GST registration") +
          " before the 30-day clock runs out.",
      ),
      h2("Do inter-state clients force registration?"),
      p(
        "No. Unlike suppliers of goods, service providers making inter-state supplies are exempt from registration until they cross the ₹20 lakh limit. A freelancer in Pune billing a client in Delhi does not need GST below the limit.",
      ),
      h2("When is registration required regardless of turnover?"),
      ul([
        "If you supply services through an e-commerce operator that is required to collect TCS (with exemptions for small service providers under the threshold).",
        "If you supply OIDAR services from outside India to Indian consumers.",
      ]),
      p(
        "Most platforms such as Upwork or Fiverr do not by themselves make registration compulsory for Indian freelancers below the threshold, but they may ask for a GSTIN for their own compliance.",
      ),
      h2("GST rate for freelancers"),
      p(
        "Most professional services, including IT, design, consulting and marketing, attract GST at 18%. On an invoice of ₹1,00,000 to an Indian client, you would charge ₹18,000 GST (CGST + SGST for the same state, IGST for another state).",
      ),
      h2("GST on foreign clients: export of services"),
      p("Services to foreign clients are zero-rated when all of these conditions are met:"),
      ul([
        "You are located in India and the client is outside India.",
        "The place of supply is outside India.",
        "Payment is received in convertible foreign exchange (or in INR where RBI permits).",
        "You and the client are not merely establishments of the same person.",
      ]),
      p(
        "You can export either by paying IGST and claiming a refund, or, more practically, by filing a Letter of Undertaking and exporting without paying GST. Read " +
          a("/blog/lut-under-gst-export-of-services", "LUT under GST for export of services") +
          " and " +
          a(GST_LUT, "LUT filing") +
          ".",
      ),
      h2("Benefits of GST registration for freelancers"),
      ul([
        "Claim input tax credit on laptops, software subscriptions, co-working rent and phone bills.",
        "Work with large Indian companies that prefer GST-registered vendors.",
        "Get refunds of accumulated credit on exports.",
      ]),
      h2("Compliance after registration"),
      ul([
        "Issue a tax invoice for Indian clients and an export invoice (with the LUT declaration) for foreign clients.",
        "File GSTR-1 and GSTR-3B monthly, or quarterly under QRMP if turnover is up to ₹5 crore — " +
          a(GST_FREELANCER, "freelancer GST return filing") +
          " covers this.",
        "Renew your LUT every financial year.",
      ]),
      h2("Invoicing Indian versus foreign clients"),
      p(
        "Indian clients: show GSTIN, place of supply, HSN/SAC and 18% CGST+SGST or IGST. Foreign clients under LUT: no IGST line, the LUT declaration on the invoice, and the foreign currency and equivalent INR. Raise the export invoice when the work is done, not when PayPal settles — the receipt in convertible foreign exchange is a separate condition you track in the bank advice.",
      ),
      h2("Place of supply for consultants"),
      p(
        "For B2B services to a registered Indian client, place of supply is generally the client’s location. That decides CGST+SGST versus IGST. For an unregistered Indian client, it is usually the supplier’s location. Getting this wrong is how freelancers pay the same tax twice under the other head. Keep the client’s GSTIN on file before you invoice.",
      ),
      h2("When optional registration still makes sense"),
      p(
        "Below the threshold, register if you buy laptops and software with GST and want that credit, if enterprise procurement teams refuse unregistered vendors, or if you are two or three invoices away from ₹20 lakh and do not want to scramble mid-month. Voluntary registration means the same GSTR-1 and GSTR-3B discipline as a mandatory one.",
      ),
      h2("What to do this week"),
      ol([
        "Add Indian fees and foreign receipts from 1 April. If you are over ₹20 lakh, apply now.",
        "If you export and are already registered, file this year’s LUT before the next foreign invoice.",
        "Standardise two invoice templates: domestic tax invoice and export invoice.",
      ]),
      h2("Worked scenario"),
      p(
        "A designer in Jaipur invoices Indian startups ₹11 lakh and US clients ₹10 lakh in a year. Aggregate turnover is ₹21 lakh, so GST for freelancers is mandatory even though more than half the work is export. She registers, files an LUT, charges 18% on Indian invoices and nil IGST on US invoices, and claims credit on Adobe and Figma. A writer in Kochi with only ₹9 lakh of foreign fees stays unregistered unless a large Indian client insists on a GSTIN.",
      ),
      p(
        "Related reading: " +
          a("/blog/how-to-get-gst-number-online", "how to get GST number online") +
          " and " +
          a("/blog/lut-under-gst-export-of-services", "LUT for export of services") +
          ".",
      ),
      faqs([
        ["I earn ₹12 lakh only from foreign clients. Do I need GST?", "No. Your turnover is below ₹20 lakh, so registration is optional."],
        ["Can freelancers opt for the composition scheme?", "Service providers with turnover up to ₹50 lakh can pay 6% under Section 10(2A), but exports are not allowed under composition, so most export-focused freelancers avoid it."],
        ["Is GST charged on payments received through PayPal?", "If the conditions for export are met and you have an LUT, you charge no GST on the invoice."],
      ]),
      cta("Freelancer with growing income?", CONSULT, "Talk to a Filing360 CA about GST, LUT and monthly returns"),
    ].join(""),
  },
  {
    slug: "gst-composition-scheme",
    title: "GST Composition Scheme 2026: Eligibility, Rates, Pros & Cons",
    seoTitle: "GST Composition Scheme 2026: Eligibility, Rates, Pros & Cons",
    seoDescription:
      "Complete guide to the GST composition scheme: ₹1.5 crore limit, 1%, 5% and 6% rates, who can opt, CMP-02, CMP-08, GSTR-4, and pros and cons.",
    excerpt:
      "Who can opt for the GST composition scheme, the 1%, 5% and 6% rates, CMP-08 and GSTR-4 due dates, and when the regular scheme is better.",
    focusKeyword: "GST composition scheme",
    tags: ["composition scheme", "cmp-08", "gstr-4", "composition dealer", "gst rates"],
    category: "gst",
    cover: "otherpageshero/45e07ea5-214a-48b7-8cfb-891ea07bd319.png",
    inline: "otherpageshero/bfe4f45b-e65b-41db-a592-8fce7b9ea822.png",
    coverAlt: "Small business owner comparing GST composition scheme tax on a tablet",
    html: [
      p(
        "The GST composition scheme is designed for small businesses that want lower tax and simpler compliance. Instead of charging GST on every invoice and filing monthly returns, a composition dealer pays a small fixed percentage of turnover and files one statement every quarter.",
      ),
      h2("Key takeaways"),
      ul([
        "Manufacturers, traders and restaurants can opt up to ₹1.5 crore turnover; service providers up to ₹50 lakh.",
        "You issue a bill of supply, not a tax invoice, and cannot collect GST from customers.",
        "No input tax credit, and generally no inter-state sale of goods.",
        "CMP-08 is due on the 18th after each quarter; GSTR-4 is due 30 April.",
      ]),
      img("INLINE", "Illustration of GST returns and rupee filings on a laptop"),
      h2("Who can opt for the GST composition scheme?"),
      table(
        ["Category", "Turnover limit (previous FY)", "Tax rate (CGST + SGST)"],
        [
          ["Manufacturers", "₹1.5 crore (₹75 lakh in special category states)", "1%"],
          ["Traders", "₹1.5 crore (₹75 lakh in special category states)", "1% of taxable turnover"],
          ["Restaurants not serving alcohol", "₹1.5 crore (₹75 lakh in special category states)", "5%"],
          ["Service providers and mixed suppliers", "₹50 lakh", "6%"],
        ],
      ),
      h2("Who cannot opt?"),
      ul([
        "Businesses making inter-state supplies of goods",
        "Manufacturers of notified goods such as ice cream, pan masala and tobacco products",
        "Casual taxable persons and non-resident taxable persons",
        "Suppliers of goods through e-commerce operators that collect TCS (limited relaxations exist for small suppliers)",
        "Suppliers of goods not taxable under GST",
      ]),
      h2("Example: how much tax will you save?"),
      p(
        "A kirana store with annual sales of ₹1 crore pays 1% = ₹1,00,000 under composition. Under the regular scheme it would charge 5% or 18% depending on items and pay tax after input credit, plus spend more on monthly compliance. For B2C retailers with thin margins, composition often works out cheaper. B2B sellers usually stay regular so their buyers can claim credit.",
      ),
      h2("Rules every composition dealer must follow"),
      ul([
        "Issue a bill of supply, not a tax invoice, and do not collect GST from customers.",
        "Write “Composition taxable person, not eligible to collect tax on supplies” on bills and the signboard.",
        "No input tax credit on purchases.",
        "Pay tax under reverse charge where applicable, at normal rates.",
      ]),
      h2("Returns under the composition scheme"),
      table(
        ["Return", "Purpose", "Due date"],
        [
          ["CMP-08", "Quarterly statement and tax payment", "18th of the month after the quarter"],
          ["GSTR-4", "Annual return", "30 April after the financial year"],
        ],
      ),
      p("Filing360 files these on " + a(GST_COMPOSITION, "composition GST return filing") + " if you would rather not track the calendar yourself."),
      h2("How to opt in and out"),
      ul([
        "Existing taxpayers: file Form GST CMP-02 before the start of the financial year.",
        "New registrants: select composition in Form GST REG-01 when you " + a(GST_REG, "apply for GST registration") + ".",
        "To leave voluntarily: file Form GST CMP-04. You must leave automatically once turnover crosses the limit, and file CMP-04 within 7 days.",
      ]),
      h2("Pros and cons"),
      table(
        ["Pros", "Cons"],
        [
          ["Low tax rate on turnover", "No input tax credit"],
          ["Quarterly instead of monthly returns", "No inter-state sale of goods"],
          ["Simpler accounts", "B2B buyers cannot claim credit, so you may lose business customers"],
        ],
      ),
      p("Compare this with regular " + a("/blog/gstr-1-vs-gstr-3b", "GSTR-1 and GSTR-3B") + " before you opt in."),
      h2("When composition is a bad fit"),
      p(
        "Skip composition if more than a slice of your sales is B2B — your buyer cannot take credit, so they will ask for a discount equal to the GST they just lost. Skip it if you will sell to another state, list goods on a TCS marketplace, or already hold large GST on purchases (rent, stock, equipment) that you would rather credit. A restaurant at 5% can still be right; a growing D2C brand usually is not.",
      ),
      h2("Bill of supply, in practice"),
      p(
        "The bill of supply shows value but not GST. Print the composition declaration on every copy and on the signboard. If you accidentally issue a tax invoice and collect GST, you still have to deposit that tax and you can create a mismatch for the buyer. Train whoever raises bills before the first sale of the year.",
      ),
      h2("What to do this week"),
      ol([
        "Estimate last year’s turnover and this year’s mix of B2C versus B2B.",
        "If you want composition from 1 April, CMP-02 has to be in before the year starts.",
        "If you are already in and approaching the limit, plan CMP-04 and stock-credit before you cross it.",
      ]),
      h2("Worked scenario"),
      p(
        "Two partners run a neighbourhood bakery at ₹90 lakh turnover, almost all walk-in. Composition at 5% (restaurant) or 1% (if classified as traders of goods) is the conversation to have with a CA using actual HSN and whether they serve from the premises. If they start supplying other cities through a TCS marketplace, composition usually ends. Meanwhile a B2B packaging supplier at the same turnover stays on the regular GST composition scheme alternative — regular GSTR-1 and GSTR-3B — because their buyers need credit.",
      ),
      p("Related reading: " + a("/blog/how-to-get-gst-number-online", "how to get GST number online") + " and " + a("/blog/gstr-1-vs-gstr-3b", "GSTR-1 vs GSTR-3B") + "."),
      faqs([
        ["Can a composition dealer sell on Amazon?", "Generally no, because suppliers of goods through e-commerce operators collecting TCS cannot opt for composition, subject to the limited relaxations notified for small suppliers."],
        ["Can I switch back to the regular scheme mid-year?", "Yes, by filing CMP-04. You can then claim credit on stock held on that date."],
        ["What if I miss the CMP-08 due date?", "Interest at 18% applies on late tax, plus late fee for GSTR-4."],
        ["Can I claim ITC on stock when I leave composition?", "Yes, on stock, semi-finished and finished goods held on the day you switch to the regular scheme, subject to the conditions in the GST rules."],
      ]),
      cta("Not sure composition suits you?", CONSULT, "Book a free consultation and we will compare both schemes"),
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
      p("Related reading: " + a("/blog/gstr-9-gstr-9c-annual-return", "GSTR-9 due date for FY 2025-26") + " and " + a("/blog/gst-composition-scheme", "GST composition scheme") + "."),
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
          a("/blog/gst-revocation-of-cancelled-registration", "how to revoke a cancelled GST registration") +
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
          a("/blog/gst-revocation-of-cancelled-registration", "GST revocation") +
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
          a("/blog/gst-revocation-of-cancelled-registration", "GST revocation") +
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
    slug: "gst-revocation-of-cancelled-registration",
    title: "GST Revocation of Cancelled Registration (REG-21)",
    seoTitle: "GST Revocation of Cancelled Registration (REG-21)",
    seoDescription:
      "If your GST registration was cancelled, learn GST revocation in Form REG-21, the 90-day time limit, documents, pending returns and next steps.",
    excerpt:
      "Why GSTINs get cancelled, how GST revocation in REG-21 restores the same number, and what to do if the 90-day window has closed.",
    focusKeyword: "GST revocation",
    tags: ["gst revocation", "reg-21", "gst cancellation", "restore gstin", "suo motu cancellation"],
    category: "gst",
    cover: "otherpageshero/aac5bb7c-91ab-4304-ac87-9e4596a835c6.png",
    inline: "otherpageshero/67335ffa-063b-4d92-bd37-8f1c6d5f5021.png",
    coverAlt: "Professional holding documents after a successful GST revocation",
    html: [
      p(
        "GST revocation is how you restore a GSTIN the officer cancelled — usually because returns were not filed for a few months. A cancelled registration stops tax invoices, blocks e-way bills and can suspend marketplace listings. A registration cancelled by the officer can usually be restored.",
      ),
      h2("Key takeaways"),
      ul([
        "Revocation keeps the same GSTIN; a fresh registration issues a new one.",
        "Apply in Form GST REG-21 within 90 days of the cancellation order (extendable).",
        "File all pending returns, with tax, interest and late fees, before you apply.",
        "Revocation is not available if you applied for cancellation yourself.",
      ]),
      img("INLINE", "Deadline reminder for GST revocation within 90 days"),
      h2("Why GST registrations get cancelled"),
      ul([
        "Returns not filed for six consecutive months (two quarters for composition dealers)",
        "Business not found at the registered address during verification",
        "Invoices issued without actual supply of goods or services",
        "ITC claimed in excess of GSTR-2B",
        "Registration obtained by fraud or misstatement",
      ]),
      h2("Revocation vs fresh registration"),
      table(
        ["Point", "Revocation", "Fresh registration"],
        [
          ["GSTIN", "Same GSTIN restored", "New GSTIN issued"],
          ["Pending returns", "Must be filed first", "Old liabilities still remain"],
          ["Business continuity", "Customers, marketplaces and ITC chain unaffected", "Contracts and listings need updating"],
        ],
      ),
      p(
        "If you applied for cancellation yourself, you take a fresh registration instead, and may still need " +
          a(GST_GSTR10, "GSTR-10") +
          " for closure. Officer-led cancellation is the case for " +
          a(GST_REVOKE, "GST revocation") +
          ".",
      ),
      h2("Time limit"),
      p(
        "Apply in Form GST REG-21 within 90 days from the date the cancellation order was served. This can be extended by up to 180 more days by senior officers on showing sufficient cause.",
      ),
      h2("Step-by-step GST revocation process"),
      ol([
        "File all pending returns up to the date of cancellation, with tax, interest and late fees.",
        "Log in to the GST portal and go to Services → Registration → Application for Revocation of Cancelled Registration.",
        "Fill Form REG-21 with the reason for revocation and upload supporting documents.",
        "Submit with DSC or EVC.",
        "If satisfied, the officer restores the GSTIN in Form REG-22.",
        "If a notice is issued in REG-23, reply in REG-24 within 7 working days — the same discipline as a " +
          a("/blog/how-to-reply-gst-notice", "GST notice reply") +
          ".",
      ]),
      h2("If revocation is rejected or time has run out"),
      ul([
        "File an appeal before the Appellate Authority within 3 months of the rejection or cancellation order.",
        "If no remedy remains, apply for a fresh registration, but old liabilities still have to be cleared.",
      ]),
      h2("What to attach with REG-21"),
      p(
        "Officers want to see that the defect is cured. Attach challans and filed-return acknowledgements for every pending period, a short letter explaining why returns slipped (illness, accountant change, portal issues — with dates), and proof that the business still exists at the registered address (utility bill, rent agreement, photographs). If cancellation followed a REG-17 you never answered, say so and attach the " +
          a("/blog/how-to-reply-gst-notice", "GST notice reply") +
          " you should have filed.",
      ),
      h2("Marketplace and banking fallout"),
      p(
        "Amazon, Flipkart and many payment aggregators freeze GSTIN-based listings when the portal shows cancelled. Restoration of the same GSTIN is why revocation beats a new number: you are not renegotiating every vendor code. Tell marketplaces the ARN as soon as REG-21 is filed, then send REG-22 when it comes through.",
      ),
      h2("What to do this week"),
      ol([
        "Read the cancellation order: officer-initiated versus your own application.",
        "If it is officer-initiated and you are inside 90 days, file every pending return first, then REG-21.",
        "If the window has closed, speak to a CA the same day about appeal versus a fresh GST registration so you do not lose more trading days.",
      ]),
      h2("Worked scenario"),
      p(
        "A seller misses two quarters of composition returns. The officer cancels the GSTIN. Listings freeze. Because the order is suo motu, GST revocation in REG-21 is available for 90 days. They file the pending CMP-08s with late fee, attach rent proof, and get REG-22. A second seller who themselves filed cancellation cannot revoke — they take a new GSTIN and update every marketplace, which is why you should not cancel in a panic if you still trade.",
      ),
      p("Related reading: " + a("/blog/how-to-reply-gst-notice", "how to reply to a GST notice") + " and " + a(GST_GSTR10, "GSTR-10 filing") + "."),
      h2("How Filing360 handles revocation"),
      p(
        "We list every pending period, compute tax, interest and late fee, file the returns, draft REG-21 with address proof and a dated explanation, submit with DSC/EVC, and watch for REG-23. If the officer asks for more, we reply in REG-24 inside 7 working days. The aim is REG-22 and the same GSTIN, not a scramble for a new number. Start at " +
          a(GST_REVOKE, "GST revocation") +
          ". Do not issue tax invoices on a cancelled GSTIN while you wait — that creates a second problem on top of the first.",
      ),
      faqs([
        ["Can I do business while my GSTIN is cancelled?", "You cannot issue tax invoices or collect GST until the registration is restored."],
        ["Will I lose ITC during cancellation?", "ITC on supplies during the cancellation period can be a problem; restore the registration as early as possible."],
        ["Do I need to file GSTR-10 if I am applying for revocation?", "No. GSTR-10 applies when you are closing the registration, not restoring it."],
        ["Does revocation restore e-way bills and e-invoicing immediately?", "Once REG-22 is issued the GSTIN is active again. Marketplaces and e-invoicing IRPs can take a day to refresh. Keep the REG-22 PDF ready for their support teams."],
        ["What if cancellation was for fraud?", "Revocation is harder. Officers can reject REG-21 if they believe registration was obtained by fraud or used to pass fake credit. Get a CA on the file before you apply, and do not keep trading on the cancelled GSTIN."],
      ]),
      cta("GSTIN cancelled?", GST_REVOKE, "Restore GST registration with Filing360"),
    ].join(""),
  },
  {
    slug: "lut-under-gst-export-of-services",
    title: "LUT for Export of Services under GST: Steps & Validity",
    seoTitle: "LUT for Export of Services under GST: Steps & Validity",
    seoDescription:
      "File a Letter of Undertaking (LUT) for export of services in Form RFD-11 to export without paying IGST. Eligibility, documents, steps and validity.",
    excerpt:
      "Who can file an LUT for export of services, RFD-11 steps on the GST portal, validity for the financial year, and what to print on the invoice.",
    focusKeyword: "LUT for export of services",
    tags: ["lut", "rfd-11", "export of services", "zero rated", "igst refund"],
    category: "gst",
    cover: "otherpageshero/db8c4e37-e4a2-4c8b-b9f3-8b2c718df8f5.png",
    inline: "otherpageshero/aac5bb7c-91ab-4304-ac87-9e4596a835c6.png",
    coverAlt: "Exporter preparing an LUT for export of services on a laptop",
    html: [
      p(
        "An LUT for export of services lets you invoice foreign clients without paying IGST upfront, so working capital is not stuck in refunds. Exports are zero-rated under GST. A Letter of Undertaking is the practical way most IT companies, agencies and freelancers use that benefit.",
      ),
      h2("Key takeaways"),
      ul([
        "File Form GST RFD-11 on the GST portal; it is usually accepted immediately.",
        "An LUT is valid for one financial year — file the next one before the first export of that year.",
        "For services, foreign exchange (or RBI-permitted INR) must arrive within RBI timelines.",
        "Without an LUT you pay IGST first and wait for a refund.",
      ]),
      img("INLINE", "Professional ready to file LUT and export invoices"),
      h2("What is an LUT?"),
      p(
        "An LUT is an undertaking filed in Form GST RFD-11 in which the exporter promises to fulfil export conditions. In return, the exporter can supply goods or services abroad, or to SEZ units, without paying IGST. Filing360 files this as " +
          a(GST_LUT, "GST LUT filing") +
          ".",
      ),
      h2("Who can file an LUT for export of services?"),
      p(
        "Any GST-registered exporter of goods or services can file an LUT, except a person who has been prosecuted for tax evasion of more than ₹2.5 crore. This covers IT companies, freelancers, consultants, digital agencies, manufacturers and traders. Freelancers should also read " +
          a("/blog/gst-registration-for-freelancers", "GST for freelancers") +
          ".",
      ),
      h2("Two ways to export under GST"),
      table(
        ["Option", "How it works", "Cash flow impact"],
        [
          ["With LUT", "No IGST charged on export invoice", "No blocked funds"],
          ["Without LUT", "Pay IGST on export, then claim a refund", "Funds blocked until refund"],
        ],
      ),
      h2("Documents needed"),
      ul([
        "GSTIN and PAN",
        "Authorised signatory details and DSC or EVC",
        "Import Export Code (IEC) for exporters of goods",
        "Name, address and occupation of two independent witnesses",
      ]),
      h2("Step-by-step: how to file an LUT online"),
      ol([
        "Log in to the " + a(PORTAL, "GST portal") + ".",
        "Go to Services → User Services → Furnish Letter of Undertaking (LUT).",
        "Select the financial year for which the LUT is being filed.",
        "Answer the declaration questions and enter witness details.",
        "Sign with DSC or EVC and submit. The LUT is generally accepted immediately and an ARN is generated.",
      ]),
      h2("Validity and conditions"),
      ul([
        "An LUT is valid for one financial year. File the next year’s LUT before the first export of that year, ideally by 31 March.",
        "Goods must be exported within 3 months of the invoice date.",
        "For services, payment must be received in convertible foreign exchange (or INR where RBI permits) within RBI timelines.",
        "If conditions are not met, IGST becomes payable with interest.",
      ]),
      h2("What to write on the export invoice"),
      p(
        "“Supply meant for export / supply to SEZ unit or SEZ developer for authorised operations under Letter of Undertaking without payment of IGST”, along with the LUT ARN.",
      ),
      h2("Refund of unutilised ITC"),
      p("Exporters under LUT can claim a refund of accumulated input tax credit through Form GST RFD-01."),
      h2("LUT versus paying IGST — a cash example"),
      p(
        "An agency invoices a US client ₹10 lakh in a month. With an LUT, the invoice carries nil IGST and the ₹1.8 lakh that would have been tax stays in the current account. Without an LUT, ₹1.8 lakh goes out as IGST and comes back only after an RFD-01 refund — weeks or months later. That is why an LUT for export of services is the default once you are registered and the export tests are met.",
      ),
      h2("Conditions that trip people up"),
      p(
        "Payment must land in convertible foreign exchange (or RBI-permitted INR). A friend’s NRE account, a crypto wallet or an Indian-company group recharge does not magically make it an export. The client must not be merely your own foreign branch. File the next year’s LUT before 1 April if you will invoice in April — an LUT is not automatic.",
      ),
      h2("What to do this week"),
      ol([
        "If you are GST-registered and already exporting, confirm this FY’s LUT ARN exists.",
        "Put the LUT declaration and ARN on every export invoice template.",
        "If you are not registered yet but foreign receipts plus Indian fees will cross ₹20 lakh, register first, then file the LUT — see " +
          a("/blog/gst-registration-for-freelancers", "GST for freelancers") +
          ".",
      ]),
      h2("Worked scenario"),
      p(
        "A Pune SaaS firm invoices Ireland on the 5th of each month. They file the LUT on 28 March so 1 April invoices are covered. The invoice quotes the ARN and the zero-rated declaration. Bank advice in USD hits within RBI time. A freelancer who files the LUT in August cannot cover April–July exports with that LUT — those months need IGST-and-refund or a harder conversation if they already issued nil-tax invoices. That is the operational meaning of LUT for export of services.",
      ),
      p("Related reading: " + a("/blog/gst-registration-for-freelancers", "GST for freelancers") + " and " + a(GST_LUT, "LUT filing") + "."),
      p(
        "Filing360 files Form RFD-11 the same day we have GSTIN, signatory and two witnesses, then puts the ARN on your export invoice template. If you also have unutilised ITC, we line up RFD-01. That is the full LUT for export of services workflow, not just a portal click.",
      ),
      faqs([
        ["Is LUT mandatory for exporters?", "No, but without it you must pay IGST first and wait for a refund."],
        ["Can an LUT be filed after exports have started?", "Yes, it can be filed later in the year, but exports made before filing will not be covered."],
        ["Do freelancers on Upwork need an LUT?", "If you are GST-registered and export services, an LUT lets you invoice foreign clients without GST."],
        ["Do I need IEC to file an LUT for services?", "IEC is essential for goods exporters. Pure service exporters file LUT with GSTIN, signatory and witnesses. Keep bank FIRCs; they prove the foreign-exchange condition."],
      ]),
      cta("Exporting services or goods?", GST_LUT, "File your LUT with Filing360"),
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
    slug: "proprietorship-vs-partnership-vs-llp-vs-private-limited",
    title: "Best Business Structure in India: Pvt Ltd vs LLP vs Others",
    seoTitle: "Best Business Structure in India: Pvt Ltd vs LLP vs Others",
    seoDescription:
      "Compare the best business structure in India — proprietorship, partnership, LLP and private limited company: liability, tax, compliance, cost and funding.",
    excerpt:
      "Side-by-side look at proprietorship, partnership, LLP and private limited company so you pick the best business structure in India before you incorporate.",
    focusKeyword: "best business structure in India",
    tags: ["private limited", "llp", "proprietorship", "partnership", "company registration"],
    category: "company-registration",
    cover: "hero/start.png",
    inline: "otherpageshero/150b9957-9a1d-4b30-925b-e321393e110d.png",
    coverAlt: "Founders choosing the best business structure in India",
    html: [
      p(
        "The best business structure in India at the start decides your liability, tax rate, compliance cost and ability to raise funds. Many founders pick the cheapest option and later spend more converting. This guide compares proprietorship, partnership, LLP and private limited company.",
      ),
      h2("Key takeaways"),
      ul([
        "Proprietorship is cheapest to start but has unlimited personal liability.",
        "LLP gives limited liability with lighter MCA filings than a company.",
        "Private limited is the default if you want investors or ESOPs.",
        "GST registration is separate from company or LLP incorporation.",
      ]),
      img("INLINE", "Founders comparing LLP and private limited company options"),
      h2("Quick comparison"),
      table(
        ["Feature", "Proprietorship", "Partnership", "LLP", "Private Limited Company"],
        [
          ["Governing law", "No specific law", "Indian Partnership Act, 1932", "LLP Act, 2008", "Companies Act, 2013"],
          ["Minimum members", "1", "2", "2 designated partners", "2 directors and 2 shareholders"],
          ["Liability", "Unlimited", "Unlimited", "Limited", "Limited"],
          ["Separate legal entity", "No", "No", "Yes", "Yes"],
          ["Income tax", "Slab rates of owner", "30% flat", "30% flat", "22% or 25% (plus surcharge and cess)"],
          ["Annual compliance", "Low", "Low", "Moderate", "High"],
          ["Fundraising from investors", "Not possible", "Difficult", "Limited", "Easiest"],
          ["Statutory audit", "Only if tax audit limits apply", "Only if tax audit limits apply", "If turnover above ₹40 lakh or contribution above ₹25 lakh", "Mandatory every year"],
        ],
      ),
      h2("Sole proprietorship"),
      p(
        "Best for freelancers, small traders and local service businesses starting out. Registration is done through GST, Udyam (MSME) or a shop and establishment licence. It is cheap and simple, but the owner is personally liable for all business debts. See " +
          a(PROP, "proprietorship registration") +
          ".",
      ),
      h2("Partnership firm"),
      p(
        "Best for small family businesses with two or more owners. A partnership deed is drafted and registered with the Registrar of Firms. It is easy to form, but all partners have unlimited liability and changes in partners can be disruptive. See " +
          a(PARTNER, "partnership registration") +
          ".",
      ),
      h2("Limited Liability Partnership (LLP)"),
      p(
        "Best for professionals, consultancies and small businesses that want limited liability with lighter compliance. An LLP is registered with the Ministry of Corporate Affairs. Annual filings include Form 8 (statement of accounts) and Form 11 (annual return). It cannot issue shares, which limits investor funding. See " +
          a(LLP, "LLP registration") +
          ".",
      ),
      h2("Private limited company"),
      p(
        "Best for startups planning to scale, raise funds or offer ESOPs. A company is incorporated through the SPICe+ form on the MCA portal. It needs a board, a statutory audit and annual filings such as AOC-4 and MGT-7, but offers the strongest credibility with banks, investors and large clients. See " +
          a(PVT, "private limited company registration") +
          ".",
      ),
      h2("How to choose the best business structure in India"),
      table(
        ["If you…", "Choose"],
        [
          ["Are testing an idea alone with low risk", "Proprietorship"],
          ["Run a family or friends business with low risk", "Partnership"],
          ["Want limited liability and low compliance", "LLP"],
          ["Plan to raise funds or grow fast", "Private limited company"],
        ],
      ),
      p(
        "Once the entity exists you still apply separately for GST — start with " +
          a("/blog/how-to-get-gst-number-online", "how to get GST number online") +
          ".",
      ),
      h2("Cost and time, roughly"),
      p(
        "A proprietorship can be trading with GST and Udyam in days. A partnership needs a deed and Registrar of Firms. An LLP or private limited company goes through SPICe+/FiLLiP on MCA, DSCs, name approval and PAN/TAN — typically a couple of weeks when documents are clean, longer if the name is rejected. Professional fees and government fees are separate; Filing360 shows both before you pay.",
      ),
      h2("Funding, ESOPs and banks"),
      p(
        "Angel and VC term sheets almost always require a private limited company. ESOPs need company shares. Current-account and merchant underwriting is smoother with a CIN than with a proprietorship PAN. An LLP is a strong middle path for a profitable services firm that will not raise institutional capital. Do not incorporate a company “just in case” if you will not run board minutes and annual ROC filings — that is how strike-off starts.",
      ),
      h2("What to do this week"),
      ol([
        "Write down: solo or partners, funding in 24 months, and expected profit this year.",
        "If funding or ESOPs are on the table, shortlist a private limited company.",
        "If not, compare proprietorship versus LLP on liability and tax with a CA, then register GST.",
      ]),
      h2("Worked scenario"),
      p(
        "Two classmates build a SaaS tool. They start as a proprietorship in one person’s PAN to “move fast”. Six months later an angel wants a cap table. They now convert: new private limited company, asset transfer, GST amendment or fresh GSTIN, customer contract assignment. Starting with the best business structure in India — here, a private limited company — would have cost more in year one and saved the conversion. A husband-wife tuition practice with no investors is the opposite case: proprietorship or partnership is enough, with GST if they cross the limit.",
      ),
      p(
        "Related reading: " +
          a(PVT, "private limited company") +
          ", " +
          a(LLP, "LLP registration") +
          " and " +
          a("/blog/how-to-get-gst-number-online", "how to get GST number") +
          ".",
      ),
      faqs([
        ["Can I convert a proprietorship into a company later?", "Yes, but it involves transferring assets, contracts and registrations, so it is easier to start with the right structure."],
        ["Which structure pays the least tax?", "It depends on profit levels. Low profits often favour a proprietorship taxed at slab rates; higher profits often favour a company at 22% or 25%. A CA can model both."],
        ["Is GST registration separate from company registration?", "Yes. You need to apply for GST separately once the business is set up and becomes liable."],
        ["How many directors does a private limited company need?", "At least two directors and two shareholders. One person can be both a director and a shareholder. A single founder who wants limited liability without a second person should look at OPC instead of stretching a fake co-founder."],
      ]),
      cta("Starting a business?", CONSULT, "Talk to a Filing360 CA about the right structure, GST and filings"),
    ].join(""),
  },
];
