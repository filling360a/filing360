import { MCA, MCA_HUB_PATH, MCA_HUB_UPDATED } from "./mcaHub";
import type { SeoServicePage } from "@/content/seoTypes";
import { formatInr } from "./services";

const rupee = (n: number) => formatInr(n);
const fee = "Professional fees start at the listed package price. Government filing fees and stamp duty, where they apply, are charged at actuals. Final amount may be finalised after discussion based on nature and size of business.";

export const mcaServicePages: Record<string, SeoServicePage> = {
  "company-name-change": {
    slug: "company-name-change",
    metaTitle: "Company Name Change Online (INC-24) | Filing360",
    metaDescription:
      "Change your company name with ROC approval: RUN name reservation, special resolution, MGT-14 and INC-24 filing, new incorporation certificate.",
    keywords: [
      "company name change",
      "change of name of company",
      "INC-24",
      "name change of private limited company",
      "RUN name reservation",
      "Section 13 name change",
    ],
    h1: "Company Name Change Online",
    lead: "Rebranding? Filing360 reserves your new name, prepares the resolutions and files MGT-14 and INC-24, so you receive a fresh Certificate of Incorporation in the new name.",
    highlights: ["₹2,999", "2–4 weeks", "Resolutions drafted for you"],
    cta: "Change My Company Name",
    imageAlt: "Company name change filing by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.moa, label: "MOA amendment" },
      { href: MCA.aoa, label: "AOA amendment" },
    ],
    sections: [
      {
        type: "p",
        title: "When can a company change its name?",
        body: "Any company can change its name under Section 13 of the Companies Act, 2013, provided it has filed its annual returns and financial statements and is not in default in repaying deposits or interest. The new name must not be identical or too similar to an existing company or trademark.",
      },
      {
        type: "steps",
        title: "Process",
        items: [
          { title: "Board meeting", body: "Approve the proposed name and call a general meeting." },
          { title: "Name reservation", body: "Reserve the name through RUN on the MCA portal, with up to two proposed names." },
          { title: "Special resolution", body: "Shareholders approve the change and the altered MOA and AOA." },
          { title: "MGT-14", body: "File within 30 days of the special resolution." },
          { title: "INC-24", body: "Apply for approval of the name change." },
          { title: "New certificate", body: "The ROC issues a fresh Certificate of Incorporation in the new name." },
        ],
      },
      {
        type: "list",
        title: "Documents required",
        items: [
          "Board resolution and notice of the general meeting",
          "Certified copy of the special resolution and minutes",
          "Altered MOA and AOA with the new name",
          "Trademark NOC, if the name includes a registered trademark",
        ],
      },
      {
        type: "p",
        title: "After the name change",
        body: "Update the name on PAN, TAN, GST, bank accounts, licences, letterheads, signboards, the website and contracts. The CIN changes only if the company type changes. Rights and obligations continue in the new name.",
      },
      { type: "p", title: "Fees", body: fee },
    ],
    faqs: [
      { q: "Does a name change affect existing contracts?", a: "No. Rights, liabilities and legal proceedings continue in the new name." },
      { q: "How long is a reserved name valid?", a: "For a name change of an existing company, the name is reserved for 60 days from approval." },
      { q: "Can I change the name if past ROC returns are pending?", a: "No. Pending annual filings must be completed first." },
    ],
  },

  "registered-office-change": {
    slug: "registered-office-change",
    metaTitle: "Change Registered Office of Company (INC-22) | Filing360",
    metaDescription:
      "Shift your company’s registered office within a city, within a state or to another state. INC-22, MGT-14 and INC-23 filings by experts.",
    keywords: [
      "change of registered office",
      "registered office change of company",
      "INC-22 filing",
      "INC-23",
      "shift registered office to another state",
      "address change in MCA",
    ],
    h1: "Registered Office Change",
    lead: "Moving your company’s office? The process depends on how far you move. Filing360 identifies the right route, prepares every resolution and files INC-22, MGT-14 or INC-23 as needed.",
    highlights: ["₹2,999", "All three routes covered", "Government fees extra"],
    cta: "Shift My Registered Office",
    imageAlt: "Registered office change filing by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.name, label: "Company name change" },
      { href: "/services/gst/gst-amendment", label: "GST amendment" },
    ],
    sections: [
      {
        type: "table",
        title: "Three routes depending on the move",
        columns: ["Type of shift", "Approval needed", "Forms"],
        rows: [
          ["Within the same city, town or village", "Board resolution", "INC-22 within 30 days"],
          ["To another city in the same state (same or different ROC)", "Special resolution; Regional Director approval if the ROC changes", "MGT-14, INC-23 if the ROC changes, INC-22"],
          ["To another state", "Special resolution, Regional Director approval and MOA alteration", "MGT-14, INC-23, INC-28, INC-22"],
        ],
      },
      {
        type: "list",
        title: "Documents required",
        items: [
          "Proof of the new address: electricity, water or gas bill not older than 2 months",
          "Rent agreement or sale deed, and an NOC from the owner",
          "Board resolution, and a special resolution where required",
          "For a change of state: creditor and employee lists, newspaper advertisement, affidavits and notice to the Registrar and the Chief Secretary",
        ],
      },
      {
        type: "steps",
        title: "Our process",
        items: [
          { title: "Route", body: "Confirm the route and the timeline." },
          { title: "Drafts", body: "Draft resolutions, notices and the NOC format." },
          { title: "Filing", body: "File the forms on the MCA portal." },
          { title: "Regional Director", body: "Where RD approval is required, prepare the petition and attend to objections." },
          { title: "Other records", body: "Update GST, PAN, bank accounts and licences afterwards." },
        ],
      },
      {
        type: "p",
        title: "Timeline",
        body: "A same-city shift is usually done in 3–5 working days. A shift to another state takes 2–3 months because of the advertisement and Regional Director approval.",
      },
      { type: "p", title: "Fees", body: fee },
    ],
    faqs: [
      { q: "Can a company’s registered office be at a residential address?", a: "Yes, with valid address proof and the owner’s NOC." },
      { q: "Do we need to change the address in GST too?", a: "Yes, through a core-field amendment in GST REG-14 within 15 days." },
      { q: "What if we moved without filing INC-22?", a: "File it immediately. Delay attracts additional fees and penalties." },
    ],
  },

  "din-ekyc-filing": {
    slug: "din-ekyc-filing",
    metaTitle: "DIR-3 KYC Filing Online for Directors | Filing360",
    metaDescription:
      "File DIR-3 KYC or DIR-3 KYC-Web for your DIN on time and avoid the ₹5,000 late fee and DIN deactivation. Quick, fully online service.",
    keywords: ["DIR-3 KYC filing", "DIN eKYC", "DIR-3 KYC web", "DIN KYC due date", "director KYC", "DIR-3 KYC late fee"],
    h1: "DIN eKYC Filing (DIR-3 KYC)",
    lead: `Every director and designated partner holding a DIN must keep their KYC current with MCA. Filing360 files DIR-3 KYC or DIR-3 KYC-Web so your DIN stays active and you avoid the ${rupee(5000)} late fee.`,
    highlights: ["₹1,499", "Filed in 1 working day", "Web or e-form KYC"],
    cta: "File My DIN KYC",
    imageAlt: "DIR-3 KYC filing by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.dinReactivate, label: "DIN reactivation" },
      { href: MCA.director, label: "Director change" },
    ],
    sections: [
      {
        type: "p",
        title: "Who must file",
        body: "Every individual holding a DIN must file, whether or not they are currently a director of any company. Filing follows MCA’s KYC cycle, and is also required whenever the mobile number, email or residential address changes.",
      },
      {
        type: "table",
        title: "Which form?",
        columns: ["Situation", "Form"],
        rows: [
          ["First KYC, or a change in mobile, email or address", "DIR-3 KYC (e-form, with DSC and professional certification)"],
          ["Details unchanged since the last KYC", "DIR-3 KYC-Web (OTP-based)"],
        ],
      },
      {
        type: "list",
        title: "Documents required",
        items: [
          "PAN, Aadhaar and passport (passport is mandatory for foreign nationals)",
          "The director’s own mobile number and email for OTP verification",
          "Address proof",
          "Digital Signature Certificate of the director",
        ],
      },
      {
        type: "p",
        title: "What happens if you don’t file?",
        body: `The DIN is marked Deactivated due to non-filing of DIR-3 KYC. The director cannot sign forms or be appointed to new companies, and companies cannot file forms carrying that DIN until it is reactivated with a ${rupee(5000)} fee.`,
      },
      { type: "p", title: "Fees", body: fee },
    ],
    faqs: [
      { q: "Is KYC required if I am not currently a director?", a: "Yes, as long as you hold a DIN." },
      { q: "What is the KYC due date?", a: "It follows MCA’s notified KYC cycle. Filing360 confirms the current due date and reminds you in advance." },
      { q: "Can I use a shared or company email?", a: "No. The mobile number and email must be the director’s own." },
    ],
  },

  "din-reactivation": {
    slug: "din-reactivation",
    metaTitle: "DIN Reactivation Online – Deactivated DIN | Filing360",
    metaDescription:
      "Reactivate a DIN deactivated for non-filing of DIR-3 KYC. DIR-3 KYC filing with ₹5,000 fee, plus help with disqualified DINs.",
    keywords: [
      "DIN reactivation",
      "deactivated DIN",
      "reactivate DIN",
      "DIN deactivated due to non-filing of DIR-3 KYC",
      "disqualified director DIN",
      "DIN status",
    ],
    h1: "DIN Reactivation",
    lead: `If your DIN shows Deactivated due to non-filing of DIR-3 KYC, Filing360 reactivates it by filing the pending KYC with the late fee, usually within 1–2 working days.`,
    highlights: ["₹1,499", `${rupee(5000)} MCA fee extra`, "1–2 working days"],
    cta: "Reactivate My DIN",
    imageAlt: "DIN reactivation by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.dinKyc, label: "DIR-3 KYC filing" },
      { href: MCA.company, label: "Company annual compliance" },
    ],
    sections: [
      {
        type: "table",
        title: "Why DINs get deactivated",
        columns: ["Reason", "Fix"],
        rows: [
          ["DIR-3 KYC not filed by the due date", `File DIR-3 KYC with the ${rupee(5000)} fee`],
          ["Director disqualified under Section 164(2) because the company did not file returns for 3 years", "This is not a KYC issue. The company’s defaults must be cured, or a legal remedy is needed."],
          ["DIN surrendered or cancelled", "Apply afresh, or follow the cancellation route"],
        ],
      },
      {
        type: "steps",
        title: "Process",
        items: [
          { title: "Status", body: "Check DIN status on the MCA portal and confirm the reason." },
          { title: "Documents", body: "Collect PAN, Aadhaar, address proof, mobile number and email." },
          { title: "Filing", body: "File DIR-3 KYC with the director’s DSC and professional certification." },
          { title: "Fee", body: `Pay the ${rupee(5000)} MCA fee.` },
          { title: "Approval", body: "DIN status updates to Approved." },
        ],
      },
      {
        type: "p",
        title: "Fees",
        body: `The professional fee is on request. The ${rupee(5000)} MCA late fee is extra and is paid on the portal.`,
      },
    ],
    faqs: [
      { q: "Can a director with a deactivated DIN sign company forms?", a: "No. Forms carrying that DIN are rejected until the DIN is reactivated." },
      { q: "Is the ₹5,000 fee refundable or waivable?", a: `No. The ${rupee(5000)} charge is a fixed fee for late KYC.` },
      { q: "My DIN shows Disqualified. Will KYC fix it?", a: "No. Disqualification arises from the company’s non-filing. Talk to Filing360 about the remedy." },
    ],
  },

  "director-change": {
    slug: "director-change",
    metaTitle: "Add or Change Director in Company (DIR-12) | Filing360",
    metaDescription:
      "Appoint a new director or record a director’s resignation with DIR-12 filing. DIN, DIR-2 consent, DIR-8 and board resolutions by experts.",
    keywords: [
      "change of director in company",
      "appointment of director",
      "DIR-12 filing",
      "director resignation",
      "add director in private limited company",
      "additional director",
    ],
    h1: "Add Director to Company",
    lead: "Bringing a new director on board, or recording a resignation? Filing360 handles the DIN, consent, declarations, resolutions and DIR-12 filing within the 30-day deadline.",
    highlights: ["₹1,499", "Documents drafted for you", "DIR-12 within 30 days"],
    cta: "Change My Director",
    imageAlt: "Director appointment and resignation filing by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.remove, label: "Removal of director" },
      { href: MCA.dinKyc, label: "DIR-3 KYC" },
    ],
    sections: [
      {
        type: "steps",
        title: "Appointing a director",
        items: [
          { title: "DIN", body: "If the person has no DIN, apply through DIR-3 with a DSC." },
          { title: "Consent", body: "Take DIR-2 consent and a DIR-8 declaration of non-disqualification." },
          { title: "Resolution", body: "The board appoints the person as an additional director, or as a director if shareholders approve." },
          { title: "DIR-12", body: "File within 30 days of the appointment." },
          { title: "Regularisation", body: "An additional director holds office until the next AGM, where shareholders approve the appointment." },
        ],
      },
      {
        type: "list",
        title: "Recording a resignation",
        items: [
          "The director submits a resignation letter",
          "The board notes the resignation",
          "The company files DIR-12 within 30 days",
          "The director may also file DIR-11 with the ROC",
        ],
      },
      {
        type: "p",
        title: "Minimum directors",
        body: "A company must always keep the minimum number of directors: 2 for a private company, 3 for a public company and 1 for an OPC, including at least one director resident in India. A removal before the end of the term, where the director will not resign, follows Section 169.",
      },
      {
        type: "p",
        title: "Documents required",
        body: "PAN, Aadhaar, photograph and address proof of the new director, DIR-2 and DIR-8, the board resolution, and the resignation letter where a director is stepping down.",
      },
      { type: "p", title: "Fees", body: fee },
    ],
    faqs: [
      { q: "Can a foreign national be a director?", a: "Yes, with a DIN and a passport, as long as one director is resident in India." },
      { q: "What if DIR-12 is filed late?", a: "An additional fee of ₹100 per day applies." },
      { q: "Can the last remaining directors resign together?", a: "Not until replacements are appointed. The company would otherwise fall below the minimum number of directors." },
    ],
  },

  "remove-director": {
    slug: "remove-director",
    metaTitle: "Removal of Director under Section 169 | Filing360",
    metaDescription:
      "Remove a director from your company under Section 169: special notice, hearing, ordinary resolution and DIR-12 filing, handled end to end.",
    keywords: [
      "removal of director",
      "remove director from private limited company",
      "Section 169",
      "special notice for removal of director",
      "DIR-12 removal",
      "vacation of office of director",
    ],
    h1: "Remove a Director from Your Company",
    lead: "When a director must leave before their term ends and will not resign, Section 169 is the formal route. Filing360 manages the notices, the hearing and the filings so the removal is legally sound.",
    highlights: ["₹1,999", "Section 169 procedure", "DIR-12 included"],
    cta: "Remove a Director",
    imageAlt: "Removal of a company director by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.director, label: "Director appointment" },
      { href: MCA.aoa, label: "AOA amendment" },
    ],
    sections: [
      {
        type: "steps",
        title: "Removal under Section 169",
        items: [
          { title: "Special notice", body: "Shareholders holding at least 1% of voting power, or shares worth ₹5 lakh, give special notice at least 14 days before the meeting." },
          { title: "Board meeting", body: "Call a general meeting and send the special notice to the director." },
          { title: "Right to be heard", body: "The director may make a written representation, which is circulated to members, and may speak at the meeting." },
          { title: "Resolution", body: "Shareholders pass an ordinary resolution." },
          { title: "DIR-12", body: "File within 30 days of the removal." },
        ],
      },
      {
        type: "list",
        title: "When this route is not available",
        items: [
          "Directors appointed by the Tribunal under Section 242",
          "Companies that have adopted proportional representation for appointing directors",
        ],
      },
      {
        type: "p",
        title: "Other ways a director’s office ends",
        body: "Office also ends automatically under Section 167, for example on disqualification, absence from all board meetings for 12 months, or failure to disclose interest. Those events are also recorded through DIR-12.",
      },
      { type: "p", title: "Fees", body: fee },
    ],
    faqs: [
      { q: "Can the board alone remove a director?", a: "No. Removal under Section 169 needs a shareholders’ resolution." },
      { q: "Does the removed director get compensation?", a: "They may claim compensation or damages under their contract, if the contract provides for it." },
      { q: "Can a removed director be reappointed by the board?", a: "Not by the board itself. Reappointment needs shareholder approval." },
    ],
  },

  "adt-1-filing": {
    slug: "adt-1-filing",
    metaTitle: "ADT-1 Filing Online – Auditor Appointment | Filing360",
    metaDescription:
      "File Form ADT-1 to intimate the ROC of your statutory auditor’s appointment within 15 days of the AGM. Resolutions and consent letters included.",
    keywords: ["ADT-1 filing", "auditor appointment", "ADT-1 due date", "appointment of statutory auditor", "first auditor appointment", "change of auditor"],
    h1: "ADT-1 Filing (Auditor Appointment)",
    lead: "Every company must appoint a statutory auditor and inform the ROC. Filing360 prepares the consent, the eligibility certificate, the resolutions and Form ADT-1 within the 15-day deadline.",
    highlights: ["₹1,499", "Within 15 days of the meeting", "Consent letter included"],
    cta: "File ADT-1",
    imageAlt: "ADT-1 auditor appointment filing by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.company, label: "Company annual filing" },
      { href: MCA.dpt3, label: "DPT-3 filing" },
    ],
    sections: [
      {
        type: "table",
        title: "When is ADT-1 filed?",
        columns: ["Event", "Who appoints", "Timeline"],
        rows: [
          ["First auditor of a new company", "Board, within 30 days of incorporation", "Holds office until the first AGM"],
          ["Auditor for a 5-year term", "Shareholders at the AGM", "ADT-1 within 15 days of the AGM"],
          ["Casual vacancy other than resignation", "Board, within 30 days", "ADT-1 after appointment"],
          ["Casual vacancy caused by resignation", "Board, approved by shareholders within 3 months", "ADT-1 after shareholder approval"],
        ],
      },
      {
        type: "list",
        title: "Documents required",
        items: [
          "Auditor’s written consent and eligibility certificate under Section 141",
          "Board resolution and AGM resolution",
          "Appointment letter and the auditor’s acceptance",
        ],
      },
      {
        type: "p",
        title: "Related forms",
        body: "ADT-3 is filed by an auditor who resigns, within 30 days. ADT-2 is used to remove an auditor before the end of the term, which needs Central Government approval.",
      },
      { type: "p", title: "Fees", body: fee },
    ],
    faqs: [
      { q: "Is ADT-1 filed every year?", a: "No. It is filed on appointment for the five-year term, and again when the auditor changes." },
      { q: "Can the same auditor continue after 5 years?", a: "Yes for most private companies. Rotation limits apply to listed companies and certain other classes of companies." },
      { q: "What if ADT-1 was not filed?", a: "File it now with additional fees so the default does not continue." },
    ],
  },

  "dpt-3-filing": {
    slug: "dpt-3-filing",
    metaTitle: "DPT-3 Filing Online – Return of Deposits | Filing360",
    metaDescription:
      "File DPT-3 by 30 June to report deposits and exempted loans. Director loans, advances and auditor certificate handled by experts.",
    keywords: ["DPT-3 filing", "return of deposits", "DPT-3 due date", "DPT-3 applicability", "loan from director DPT-3", "exempted deposits"],
    h1: "DPT-3 Filing (Return of Deposits)",
    lead: "Every company must report deposits, and money received that is not treated as a deposit, in Form DPT-3 by 30 June. That includes loans from directors and advances from customers.",
    highlights: ["₹1,999", "Due 30 June", "Director loans covered"],
    cta: "File DPT-3",
    imageAlt: "DPT-3 return of deposits filing by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.company, label: "Company annual filing" },
      { href: MCA.adt1, label: "ADT-1 filing" },
    ],
    sections: [
      {
        type: "p",
        title: "Who must file",
        body: "Every company, including private companies and OPCs, except government companies, banking companies, NBFCs and housing finance companies registered with the RBI or NHB. Filing is required even when the only receipts are exempted amounts, such as loans from directors.",
      },
      {
        type: "table",
        title: "What is reported",
        columns: ["Category", "Examples"],
        rows: [
          ["Deposits accepted, where permitted", "Deposits from members or the public under Chapter V"],
          ["Receipts not considered deposits", "Loans from directors with a declaration, bank loans, inter-corporate loans, trade advances, share application money pending allotment, and security deposits from employees"],
        ],
        note: "Figures are reported as at 31 March of the financial year.",
      },
      {
        type: "p",
        title: "Documents required",
        body: "Audited or provisional balance sheet, a list of loans and advances with the lenders’ details, director declarations that loans are from their own funds, and an auditor’s certificate where the company has accepted deposits.",
      },
      { type: "p", title: "Fees", body: fee },
    ],
    faqs: [
      { q: "Is DPT-3 required if the company has no loans?", a: "If there are no deposits and no outstanding receipts of the kinds the form reports, filing is generally not needed. Filing360 confirms this against your balance sheet." },
      { q: "What if DPT-3 is late?", a: "Additional fees apply, and penalties can be levied on the company and its officers." },
      { q: "Are unsecured loans from relatives of directors exempt?", a: "Only loans from directors, and for private companies from their relatives, qualify when the required declaration is in place. Check with Filing360 before accepting such money." },
    ],
  },

  "llp-form-11-filing": {
    slug: "llp-form-11-filing",
    metaTitle: "LLP Form 11 Filing Online – Annual Return | Filing360",
    metaDescription:
      "File LLP Form 11 (annual return) by 30 May and Form 8 by 30 October. Avoid ₹100 per day late fees with expert LLP annual filing.",
    keywords: ["LLP Form 11 filing", "LLP annual return", "Form 11 due date", "LLP annual filing", "LLP Form 8", "LLP compliance"],
    h1: "LLP Form 11 Filing (Annual Return)",
    lead: "Every LLP must file its annual return in Form 11 within 60 days of the financial year-end, that is by 30 May, even if the LLP had no business. Filing360 prepares and files it with the designated partners’ DSCs.",
    highlights: ["₹1,999", "Due 30 May", "Form 8 package available"],
    cta: "File Form 11",
    imageAlt: "LLP Form 11 annual return filing by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.llp, label: "LLP annual compliance" },
      { href: MCA.windLlp, label: "Close an LLP" },
    ],
    sections: [
      {
        type: "list",
        title: "What Form 11 contains",
        items: [
          "Details of partners and designated partners",
          "Total contribution received from partners",
          "Changes in partners during the year",
          "A summary of penalties or compounding, if any",
        ],
      },
      {
        type: "table",
        title: "LLP annual compliance at a glance",
        columns: ["Form", "Purpose", "Due date"],
        rows: [
          ["Form 11", "Annual return", "30 May"],
          ["Form 8", "Statement of Account and Solvency", "30 October"],
          ["ITR-5", "Income tax return", "31 July, or 31 October if audited"],
        ],
        note: "Accounts must be audited if turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh.",
      },
      {
        type: "p",
        title: "Late fee",
        body: "The additional fee is ₹100 per day of delay for each form, with no upper limit. An LLP that misses filings for a few years can owe a large amount.",
      },
      { type: "p", title: "Fees", body: fee },
    ],
    faqs: [
      { q: "My LLP did no business. Is Form 11 still needed?", a: "Yes. If the LLP will stay inactive, consider strike-off." },
      { q: "Can Form 11 be filed without the LLP agreement?", a: "The LLP agreement should already be on record in Form 3. If it is not, Form 3 must be filed." },
      { q: "Who signs Form 11?", a: "A designated partner with a DSC, certified by a practising professional where required." },
    ],
  },

  "dormant-status-filing": {
    slug: "dormant-status-filing",
    metaTitle: "Dormant Company Status (MSC-1) Online | Filing360",
    metaDescription:
      "Apply for dormant company status under Section 455 with Form MSC-1. Keep your company name alive with minimal compliance.",
    keywords: ["dormant company status", "MSC-1", "Section 455", "inactive company", "dormant company compliance", "MSC-3"],
    h1: "Dormant Status Filing (Section 455)",
    lead: "Have a company that is not doing business now, but you want to keep it? Dormant status keeps the company and its name alive with a lighter compliance load than an active company.",
    highlights: ["₹1,999", "Section 455", "MSC-1 to MSC-3"],
    cta: "Apply for Dormant Status",
    imageAlt: "Dormant company status application by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.company, label: "Company annual filing" },
      { href: "/services/mca/winding-up-company", label: "Company strike-off" },
    ],
    sections: [
      {
        type: "p",
        title: "Who can apply",
        body: "A company formed for a future project, or to hold an asset or intellectual property, with no significant accounting transaction, can apply. An inactive company that has not carried on business, or has not filed financial statements and annual returns for the last two financial years, can also apply.",
      },
      {
        type: "list",
        title: "Who cannot apply",
        items: [
          "Companies with outstanding public deposits or unpaid interest on deposits",
          "Companies with outstanding loans, pending tax demands, or prosecution or inspection proceedings",
          "Companies with listed securities",
        ],
      },
      {
        type: "steps",
        title: "Process",
        items: [
          { title: "Approval", body: "Hold a board meeting and pass a special resolution, or obtain consent of shareholders holding three-fourths in value." },
          { title: "MSC-1", body: "File Form MSC-1 with a statement of assets and liabilities certified by an auditor." },
          { title: "MSC-2", body: "The ROC issues a certificate of dormant status." },
          { title: "MSC-3", body: "File the annual return of a dormant company within 30 days of each year-end." },
          { title: "Back to active", body: "File MSC-4 when the company is ready to carry on business again." },
        ],
      },
      {
        type: "list",
        title: "Benefits",
        items: [
          "The company name and incorporation stay in place",
          "Fewer board meetings: one in each half of the year",
          "AOC-4 and MGT-7 are not filed the way an active company files them",
        ],
      },
      { type: "p", title: "Fees", body: fee },
    ],
    faqs: [
      { q: "What is a significant accounting transaction?", a: "Anything other than paying ROC fees, fees required under law, paying for office maintenance, and allotting shares to meet a legal requirement." },
      { q: "Can the ROC strike off a dormant company?", a: "Yes, if it stops meeting the conditions for dormant status or fails to file MSC-3. The annual filing has to be kept up." },
      { q: "Is dormant status better than closing the company?", a: "If you plan to revive the business, yes. If you do not, voluntary strike-off is usually cheaper over time." },
    ],
  },

  "moa-amendment": {
    slug: "moa-amendment",
    metaTitle: "MOA Amendment Online – Change Object Clause | Filing360",
    metaDescription:
      "Amend your Memorandum of Association to change business objects or other clauses. Special resolution and MGT-14 filing by experts.",
    keywords: ["MOA amendment", "change object clause of company", "alteration of memorandum", "Section 13", "MGT-14 filing", "change business activity of company"],
    h1: "MOA Amendment (Alteration of Memorandum)",
    lead: "Starting a new line of business? A company can only do what its Memorandum allows. Filing360 redrafts the object clause and files the special resolution with the ROC.",
    highlights: ["₹3,999", "MGT-14 within 30 days", "Objects redrafted"],
    cta: "Amend My MOA",
    imageAlt: "MOA amendment filing by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.aoa, label: "AOA amendment" },
      { href: MCA.name, label: "Company name change" },
    ],
    sections: [
      {
        type: "table",
        title: "Which MOA changes need which route",
        columns: ["Clause changed", "Approval", "Form"],
        rows: [
          ["Object clause", "Special resolution", "MGT-14 within 30 days"],
          ["Name clause", "Special resolution and ROC approval", "MGT-14 and INC-24"],
          ["Registered office clause (change of state)", "Special resolution and Regional Director approval", "MGT-14 and INC-23"],
          ["Capital clause", "Ordinary resolution, if the AOA permits", "SH-7"],
          ["Liability clause", "Special resolution", "MGT-14"],
        ],
      },
      {
        type: "steps",
        title: "Process for changing objects",
        items: [
          { title: "Board", body: "Approve the draft altered MOA and call a general meeting." },
          { title: "Shareholders", body: "Pass a special resolution. A postal ballot is required if the company has raised money from the public by prospectus." },
          { title: "MGT-14", body: "File within 30 days with the altered MOA." },
          { title: "Registration", body: "The change takes effect once the ROC registers it." },
        ],
      },
      { type: "p", title: "Fees", body: fee },
    ],
    faqs: [
      { q: "Do we need to update GST after changing objects?", a: "Yes. Update the nature of business and HSN or SAC codes through a non-core GST amendment." },
      { q: "Can we add unrelated businesses?", a: "Yes, but keep the objects focused. Very broad objects can raise questions from banks and the ROC." },
      { q: "Is the MOA change effective immediately?", a: "It takes effect once the ROC registers the change." },
    ],
  },

  "aoa-amendment": {
    slug: "aoa-amendment",
    metaTitle: "AOA Amendment Online – Alter Articles of Association | Filing360",
    metaDescription:
      "Alter your Articles of Association for investors, share transfer rules or governance changes. Special resolution and MGT-14 under Section 14.",
    keywords: ["AOA amendment", "alteration of articles of association", "Section 14", "MGT-14", "AOA change for investors", "entrenchment provisions"],
    h1: "AOA Amendment (Alteration of Articles)",
    lead: "The Articles set the rules for running the company: share transfers, board powers, meetings and investor rights. Filing360 redrafts them and files the change with the ROC.",
    highlights: ["₹3,999", "Section 14", "Investor rights covered"],
    cta: "Amend My AOA",
    imageAlt: "Articles of Association amendment by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.moa, label: "MOA amendment" },
      { href: MCA.transfer, label: "Share transfer" },
    ],
    sections: [
      {
        type: "list",
        title: "Common reasons to amend the AOA",
        items: [
          "Bringing in investors with rights such as board seats, pre-emption, tag-along and drag-along",
          "Changing share-transfer restrictions or adding ESOP provisions",
          "Increasing borrowing powers or changing quorum rules",
          "Converting between a private and a public company",
          "Adopting a fresh set of articles under the Companies Act, 2013",
        ],
      },
      {
        type: "steps",
        title: "Process",
        items: [
          { title: "Board", body: "Approve the draft and call a general meeting." },
          { title: "Special resolution", body: "Shareholders pass a special resolution." },
          { title: "MGT-14", body: "File within 30 days with the altered AOA." },
          { title: "Public to private", body: "Conversion of a public company into a private company also needs Regional Director approval in INC-27." },
        ],
      },
      {
        type: "p",
        title: "Entrenchment",
        body: "Articles can contain entrenched clauses that need more than a special resolution to change. They must be included at incorporation, or adopted later by special resolution in a private company or by unanimous consent in a public company, and notified to the ROC.",
      },
      { type: "p", title: "Fees", body: fee },
    ],
    faqs: [
      { q: "Can the AOA override the Companies Act?", a: "No. Any clause contrary to the Act is void." },
      { q: "Is a shareholders’ agreement enough without amending the AOA?", a: "Investor rights should be written into the AOA so they bind the company." },
    ],
  },

  "authorized-capital-increase": {
    slug: "authorized-capital-increase",
    metaTitle: "Increase Authorised Capital of Company (SH-7) | Filing360",
    metaDescription:
      "Increase your company’s authorised share capital before issuing new shares. Resolution, MOA alteration and SH-7 filing with fees and stamp duty.",
    keywords: ["increase authorised capital", "SH-7 filing", "increase in authorised share capital", "Section 61", "alteration of capital clause", "authorised capital private limited"],
    h1: "Increase Authorised Capital",
    lead: "A company cannot issue shares beyond its authorised capital. Before a funding round, a bonus issue or conversion of a loan into equity, increase the capital. Filing360 handles the resolution, the MOA alteration and SH-7.",
    highlights: ["₹4,999", "SH-7 within 30 days", "Stamp duty at actuals"],
    cta: "Increase My Capital",
    imageAlt: "Authorised capital increase filing by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.moa, label: "MOA amendment" },
      { href: MCA.transfer, label: "Share transfer" },
    ],
    sections: [
      {
        type: "steps",
        title: "Process",
        items: [
          { title: "Articles", body: "Check that the AOA permits an increase. Amend the AOA first if it does not." },
          { title: "Board", body: "Approve the proposal and call a general meeting." },
          { title: "Shareholders", body: "Pass an ordinary resolution, or a special resolution if the AOA requires one." },
          { title: "MOA", body: "Alter the capital clause of the Memorandum." },
          { title: "SH-7", body: "File within 30 days, with MCA fees on the increase and state stamp duty." },
          { title: "MGT-14", body: "File MGT-14 as well if a special resolution was passed." },
        ],
      },
      {
        type: "p",
        title: "Costs",
        body: "The MCA fee and stamp duty depend on the amount of the increase and the state of the registered office. Filing360 shares the government cost before filing. The professional fee is on request.",
      },
    ],
    faqs: [
      { q: "Is authorised capital the same as paid-up capital?", a: "No. Authorised capital is the maximum the company can issue. Paid-up capital is what shareholders have actually paid." },
      { q: "Can authorised capital be reduced later?", a: "Unissued capital can be cancelled. Fees already paid on the increase are not refunded." },
      { q: "Do we need to increase capital before a funding round?", a: "Yes, if the new shares would take paid-up capital above the current authorised capital." },
    ],
  },

  "share-transfer": {
    slug: "share-transfer",
    metaTitle: "Share Transfer in Private Limited Company | Filing360",
    metaDescription:
      "Transfer shares in a private limited company: SH-4 transfer deed, stamp duty, valuation, board approval and register updates, physical or demat.",
    keywords: ["share transfer in private limited company", "SH-4 transfer deed", "stamp duty on share transfer", "transfer of shares procedure", "share transfer valuation", "demat share transfer"],
    h1: "Share Transfer",
    lead: "Selling or gifting shares in a private company involves the transfer restrictions in the AOA, stamp duty, valuation for income tax and FEMA, and a correct update of the registers. Filing360 handles the transfer.",
    highlights: ["₹4,999", "Stamp duty extra", "Physical or demat"],
    cta: "Transfer Shares",
    imageAlt: "Private company share transfer by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.demat, label: "Demat of shares" },
      { href: MCA.aoa, label: "AOA amendment" },
    ],
    sections: [
      {
        type: "table",
        title: "Physical vs demat transfer",
        columns: ["Point", "Physical shares", "Demat shares"],
        rows: [
          ["Instrument", "Form SH-4 transfer deed", "Delivery instruction through depository participants"],
          ["Stamp duty", "0.015% of consideration", "0.015%, collected through the depository"],
          ["Applies to", "Small private companies still holding physical shares", "Unlisted public companies and private companies required to dematerialise"],
        ],
      },
      {
        type: "steps",
        title: "Process for physical shares",
        items: [
          { title: "Articles", body: "Check pre-emption rights and whether the board must approve the transfer." },
          { title: "Valuation", body: "Obtain a valuation where income tax requires it, and under FEMA if a non-resident is involved." },
          { title: "Deed", body: "Execute SH-4, pay stamp duty and attach the share certificate." },
          { title: "Lodgement", body: "Lodge the deed with the company within 60 days of execution." },
          { title: "Approval", body: "The board approves the transfer." },
          { title: "Register", body: "The company endorses or issues the certificate within one month and updates the register of members." },
        ],
      },
      {
        type: "p",
        title: "Tax and FEMA",
        body: "Shares transferred below fair market value can be taxed in the buyer’s hands, and the seller pays capital gains tax. Transfers between residents and non-residents must follow FEMA pricing guidelines and be reported in Form FC-TRS. The professional fee is on request. Stamp duty is extra.",
      },
    ],
    faqs: [
      { q: "Can a private company refuse a share transfer?", a: "Yes, if the AOA allows it and the refusal follows the procedure. The transferor can appeal to the Tribunal." },
      { q: "Is an ROC form required for a share transfer?", a: "There is no separate transfer form. The change appears in the annual return, MGT-7." },
    ],
  },

  "demat-of-shares": {
    slug: "demat-of-shares",
    metaTitle: "Demat of Shares for Private & Unlisted Companies | Filing360",
    metaDescription:
      "Mandatory dematerialisation of shares for private companies and unlisted public companies: ISIN, RTA, NSDL/CDSL agreements and PAS-6.",
    keywords: ["demat of shares private company", "dematerialisation of shares", "ISIN for private company", "Rule 9B", "PAS-6 filing", "RTA appointment"],
    h1: "Demat of Shares for Private and Unlisted Companies",
    lead: "Unlisted public companies, and private companies other than small companies, must hold their securities in demat form. Without it, the company cannot issue, bonus, rights or buy back shares, and shareholders cannot transfer them. Filing360 manages the conversion.",
    highlights: ["₹1,999", "Depository and RTA charges extra", "PAS-6 included"],
    cta: "Demat My Company’s Shares",
    imageAlt: "Dematerialisation of company shares by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.transfer, label: "Share transfer" },
      { href: MCA.capital, label: "Increase authorised capital" },
    ],
    sections: [
      {
        type: "table",
        title: "Who must dematerialise",
        columns: ["Company", "Requirement"],
        rows: [
          ["Unlisted public company", "Mandatory under Rule 9A"],
          ["Private company other than a small company", "Mandatory under Rule 9B"],
          ["Small company and government company", "Currently exempt"],
        ],
      },
      {
        type: "steps",
        title: "Process",
        items: [
          { title: "RTA", body: "Appoint a SEBI-registered Registrar and Share Transfer Agent." },
          { title: "Agreements", body: "Sign tripartite agreements with NSDL and CDSL through the RTA." },
          { title: "ISIN", body: "Obtain an ISIN for each class of security." },
          { title: "Accounts", body: "Promoters, directors and shareholders open demat accounts." },
          { title: "Conversion", body: "Shareholders submit dematerialisation requests through their depository participants." },
          { title: "PAS-6", body: "File the reconciliation of share capital within 60 days of each half-year end." },
        ],
      },
      {
        type: "p",
        title: "Ongoing costs",
        body: "ISIN creation, annual issuer fees to the depositories and RTA fees apply every year. Filing360 shares a cost estimate up front. The professional fee is on request.",
      },
    ],
    faqs: [
      { q: "What if shareholders do not open demat accounts?", a: "Their shares stay in physical form, but they cannot transfer them or subscribe to a new issue until they convert." },
      { q: "Do new allotments need to be in demat?", a: "Yes. Where demat is mandatory, securities must be issued only in demat form." },
      { q: "What is PAS-6?", a: "A half-yearly reconciliation of share capital, filed within 60 days of each half-year end." },
    ],
  },

  "winding-up-llp": {
    slug: "winding-up-llp",
    metaTitle: "Close LLP Online – Strike Off (Form 24) | Filing360",
    metaDescription:
      "Close an inactive LLP through Form 24 strike-off, or a solvent LLP through voluntary liquidation. Pending filings, NOCs and closure handled.",
    keywords: ["close LLP", "LLP strike off", "Form 24 LLP", "winding up of LLP", "LLP closure process", "voluntary liquidation of LLP"],
    h1: "Winding Up an LLP",
    lead: "An inactive LLP still has to file Form 8 and Form 11 every year, and late fees keep adding at ₹100 per day per form. If you no longer need the LLP, close it properly. Filing360 chooses the route and handles the filings.",
    highlights: ["₹6,999", "Form 24 or IBC route", "Usually 3–6 months"],
    cta: "Close My LLP",
    imageAlt: "LLP strike-off and winding up by Filing360",
    updated: MCA_HUB_UPDATED,
    related: [
      { href: MCA_HUB_PATH, label: "MCA services hub" },
      { href: MCA.form11, label: "LLP Form 11" },
      { href: MCA.llp, label: "LLP annual compliance" },
    ],
    sections: [
      {
        type: "table",
        title: "Two ways to close an LLP",
        columns: ["Route", "Suits", "Key form"],
        rows: [
          ["Strike-off under Rule 37", "LLP not carrying on business for one year or more, with no assets and no liabilities", "Form 24"],
          ["Voluntary liquidation under the Insolvency and Bankruptcy Code", "A solvent LLP that still has assets or liabilities to settle", "Liquidation through an insolvency professional"],
        ],
      },
      {
        type: "steps",
        title: "Strike-off process",
        items: [
          { title: "Close operations", body: "Close bank accounts, cancel GST and settle every liability." },
          { title: "Pending returns", body: "File pending Form 8 and Form 11." },
          { title: "Statement", body: "Prepare a statement of accounts showing nil assets and liabilities, certified by a professional." },
          { title: "Consent", body: "Obtain the consent of all partners and an indemnity." },
          { title: "Form 24", body: "File with the supporting documents." },
          { title: "Dissolution", body: "The ROC publishes a notice. If there are no objections, the LLP is struck off and dissolved." },
        ],
      },
      {
        type: "p",
        title: "Documents required",
        body: "Statement of accounts, partners’ consent and affidavits, an indemnity bond, proof that the bank account is closed, the latest ITR, and NOCs from regulators where they apply. The professional fee is on request. Government fees are extra.",
      },
    ],
    faqs: [
      { q: "How long does LLP strike-off take?", a: "Usually 3–6 months after Form 24 is filed." },
      { q: "Can pending returns be skipped?", a: "No. Form 8 and Form 11 for the years the LLP operated must be filed first." },
      { q: "Can a struck-off LLP be revived?", a: "Yes, by an application to the Tribunal within the permitted period." },
    ],
  },
};

export function getMcaServicePage(slug: string): SeoServicePage | undefined {
  return mcaServicePages[slug];
}
