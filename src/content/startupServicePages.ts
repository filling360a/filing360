import { STARTUP, STARTUP_HUB_PATH } from "./startupHub";
import type { SeoServicePage } from "./seoTypes";
import { formatInr } from "./services";

const rupee = (n: number) => formatInr(n);

export const startupServicePages: Record<string, SeoServicePage> = {
  "startup-india-dpiit": {
    slug: "startup-india-dpiit",
    metaTitle: "Startup India Registration – DPIIT Recognition | Filing360",
    metaDescription:
      "Get DPIIT startup recognition: eligibility, documents, application, and benefits including tax holiday, IPR fee rebates and procurement relaxations.",
    keywords: [
      "Startup India registration",
      "DPIIT recognition",
      "DPIIT startup certificate",
      "Startup India benefits",
      "startup recognition eligibility",
      "80-IAC tax exemption",
    ],
    h1: "Startup India Registration (DPIIT Recognition)",
    lead: "DPIIT recognition opens the door to Startup India benefits: tax holidays, cheaper patents and trademarks, easier government tenders and more. We check eligibility, prepare a strong application and follow up until you get your certificate.",
    highlights: [`From ${rupee(5500)}`, "Application + innovation write-up"],
    cta: "Get DPIIT Recognition",
    imageAlt: "Startup India DPIIT recognition by Filing360",
    related: [
      { href: STARTUP_HUB_PATH, label: "Startup hub" },
      { href: STARTUP.pvt, label: "Private limited company" },
      { href: STARTUP.msme, label: "Udyam registration" },
    ],
    sections: [
      {
        type: "table",
        title: "Eligibility",
        columns: ["Condition", "Requirement"],
        rows: [
          ["Entity type", "Private limited company, registered partnership firm or LLP"],
          ["Age", "Up to 10 years from incorporation or registration"],
          ["Turnover", "Not more than ₹100 crore in any financial year since incorporation"],
          [
            "Nature of business",
            "Working towards innovation, development or improvement of products, processes or services, or a scalable business model with high potential for jobs or wealth creation",
          ],
          ["Origin", "Not formed by splitting up or reconstructing an existing business"],
        ],
      },
      {
        type: "table",
        title: "Key benefits",
        columns: ["Benefit", "What you get"],
        rows: [
          [
            "Income tax holiday",
            "100% deduction of profits for 3 consecutive years out of the first 10, for eligible startups certified by the Inter-Ministerial Board",
          ],
          ["Intellectual property", "Fast-tracked patent examination, and reduced patent and trademark fees"],
          ["Government procurement", "Relaxation of prior turnover and experience requirements in many tenders"],
          ["Self-certification", "Under specified labour and environmental laws"],
          ["Funding", "Access to the Fund of Funds and the Startup India Seed Fund Scheme"],
          ["Easier exit", "Faster insolvency resolution process for eligible startups"],
          ["ESOP tax deferral", "For employees of eligible startups (with Inter-Ministerial Board certification)"],
        ],
      },
      {
        type: "steps",
        title: "Process",
        items: [
          { title: "Register", body: "register on the Startup India portal." },
          { title: "Prepare", body: "prepare business, innovation and scalability details, with a pitch deck or website." },
          { title: "Apply", body: "submit the DPIIT recognition application with the incorporation certificate." },
          { title: "Clarify", body: "respond to any clarifications." },
          { title: "Certificate", body: "receive the recognition certificate with a DPIIT number. Tax holiday needs a separate Inter-Ministerial Board application after recognition." },
        ],
      },
    ],
    faqs: [
      {
        q: "How long does recognition take?",
        a: "Often a few days to a few weeks, depending on the quality of the application.",
      },
      {
        q: "Does recognition expire?",
        a: "Yes, after 10 years from incorporation, or earlier if turnover crosses ₹100 crore.",
      },
    ],
  },

  proprietorship: {
    slug: "proprietorship",
    metaTitle: "Sole Proprietorship Registration Online | Filing360",
    metaDescription:
      "Start a sole proprietorship with GST, Udyam and shop licence, open a current account, and set up books and tax. Quick and affordable.",
    keywords: [
      "proprietorship registration",
      "sole proprietorship registration",
      "how to register proprietorship",
      "proprietorship firm registration",
      "current account for proprietorship",
    ],
    h1: "Sole Proprietorship Registration",
    lead: "The fastest and cheapest way to start a business on your own. A proprietorship is not a separate legal entity, so there is no single “registration”; instead it is established through business registrations that also let you open a current account.",
    highlights: [`From ${rupee(999)}`, "Registrations + bank documents"],
    cta: "Start My Proprietorship",
    imageAlt: "Sole proprietorship registration by Filing360",
    related: [
      { href: STARTUP_HUB_PATH, label: "Startup hub" },
      { href: STARTUP.opc, label: "One Person Company" },
      { href: STARTUP.msme, label: "Udyam registration" },
    ],
    sections: [
      {
        type: "table",
        title: "What we register",
        columns: ["Registration", "Purpose"],
        rows: [
          ["GST", "Mandatory above turnover limits or for inter-state sale of goods; voluntary otherwise"],
          ["Udyam (MSME)", "Free; proof of business and access to MSME benefits"],
          ["Shop and Establishment licence", "Required under state law for shops and offices"],
          ["Trade licence", "From the local municipal body, where applicable"],
          ["Professional tax", "Where the state levies it"],
        ],
        note: "Banks usually ask for two business proofs, such as GST and Udyam certificates, to open a current account.",
      },
      {
        type: "table",
        title: "Pros and cons",
        columns: ["Pros", "Cons"],
        rows: [
          ["Quick and inexpensive to start", "Unlimited personal liability"],
          ["Minimal compliance", "Not a separate legal entity"],
          ["Taxed at the owner’s slab rates", "Hard to raise investment"],
          ["Full control", "Business ends with the owner"],
        ],
      },
    ],
    faqs: [
      {
        q: "Can a proprietorship get Startup India recognition?",
        a: "No. Consider an LLP or private limited company.",
      },
      {
        q: "Can a proprietorship convert into a company later?",
        a: "Yes, by incorporating a company and transferring the business, with tax conditions to be checked.",
      },
    ],
  },

  "producer-company": {
    slug: "producer-company",
    metaTitle: "Producer Company / FPO Registration Online | Filing360",
    metaDescription:
      "Register a farmer producer company (FPO) under the Companies Act: 10+ producer members, 5+ directors, objects, documents and compliance.",
    keywords: [
      "producer company registration",
      "FPO registration",
      "farmer producer company",
      "farmer producer organisation registration",
      "producer company rules",
    ],
    h1: "Producer Company (FPO) Registration",
    lead: "A producer company lets farmers, dairy producers, fishers, artisans and other primary producers come together as a company: buying inputs and selling produce collectively, accessing credit and government support, while keeping control with the members.",
    highlights: ["SPICe+ filing", "Government fees extra"],
    cta: "Register My Producer Company",
    imageAlt: "Producer company FPO registration by Filing360",
    related: [
      { href: STARTUP_HUB_PATH, label: "Startup hub" },
      { href: STARTUP.pvt, label: "Private limited company" },
      { href: STARTUP.msme, label: "Udyam registration" },
    ],
    sections: [
      {
        type: "table",
        title: "Requirements",
        columns: ["Item", "Requirement"],
        rows: [
          ["Members", "At least 10 individual producers, or 2 producer institutions, or a combination"],
          ["Directors", "Minimum 5, maximum 15"],
          ["Name", "Ends with “Producer Company Limited”"],
          [
            "Objects",
            "Production, harvesting, procurement, grading, processing, marketing and export of primary produce, and related services to members",
          ],
          ["Law", "Chapter XXIA of the Companies Act, 2013"],
        ],
      },
      {
        type: "list",
        title: "Key features",
        items: [
          "Members must be primary producers or producer institutions",
          "Control by members, often on a one-member-one-vote basis",
          "Limited return on shares; surplus can be shared as patronage bonus based on members’ business with the company",
          "Shares are transferable only to active members, with board approval",
        ],
      },
      {
        type: "steps",
        title: "Process",
        items: [
          { title: "Mobilise", body: "mobilise members and identify directors." },
          { title: "DSC & name", body: "obtain DSCs and reserve the name." },
          { title: "Incorporate", body: "file SPICe+ with MOA and AOA in the producer company format." },
          { title: "Bank & licences", body: "open the bank account and add GST, mandi or FSSAI registrations as needed." },
        ],
      },
    ],
    faqs: [
      {
        q: "Can non-farmers be members?",
        a: "Membership is for primary producers and producer institutions.",
      },
      {
        q: "Does a producer company need an audit?",
        a: "Yes, like other companies, with additional internal audit requirements.",
      },
    ],
  },

  "indian-subsidiary": {
    slug: "indian-subsidiary",
    metaTitle: "Indian Subsidiary Registration for Foreign Companies | Filing360",
    metaDescription:
      "Set up a wholly owned subsidiary in India: FDI route, incorporation, resident director, document legalisation, bank account and FC-GPR reporting.",
    keywords: [
      "Indian subsidiary registration",
      "wholly owned subsidiary in India",
      "foreign company in India",
      "FDI company registration",
      "FC-GPR filing",
      "set up company in India",
    ],
    h1: "Indian Subsidiary Registration for Foreign Companies",
    lead: "Foreign companies most commonly enter India through a wholly owned subsidiary — a private limited company owned by the foreign parent. We handle incorporation, foreign investment reporting and ongoing compliance.",
    highlights: ["On quote", "Incorporation + FEMA reporting"],
    cta: "Set Up My Indian Subsidiary",
    imageAlt: "Indian subsidiary registration by Filing360",
    related: [
      { href: STARTUP_HUB_PATH, label: "Startup hub" },
      { href: STARTUP.pvt, label: "Private limited company" },
      { href: STARTUP.dpiit, label: "DPIIT recognition" },
    ],
    sections: [
      {
        type: "table",
        title: "Requirements",
        columns: ["Item", "Requirement"],
        rows: [
          ["Shareholders", "Minimum 2: usually the foreign parent and a nominee"],
          ["Directors", "Minimum 2, at least one who stayed in India for 182 days or more in the previous calendar year"],
          ["Foreign directors", "DIN with passport and address proof"],
          ["Foreign documents", "Notarised and apostilled (or consularised)"],
          [
            "Sector",
            "Automatic route for most sectors; government approval for some sectors and for investors from countries sharing a land border with India",
          ],
        ],
      },
      {
        type: "steps",
        title: "Process",
        items: [
          { title: "FDI check", body: "check the sector’s FDI route and caps." },
          { title: "Parent resolution", body: "board resolution of the parent authorising investment and nominee." },
          { title: "Legalise docs", body: "notarised/apostilled parent and foreign director documents." },
          { title: "Incorporate", body: "DSCs, name reservation and SPICe+ incorporation." },
          { title: "Capital & FC-GPR", body: "receive share capital and file FC-GPR on RBI FIRMS within 30 days of allotment." },
        ],
      },
      {
        type: "table",
        title: "Alternatives",
        columns: ["Option", "Suits"],
        rows: [
          ["Wholly owned subsidiary", "Full business operations, the most flexible"],
          ["Liaison office", "Only representative and marketing activities, no revenue"],
          ["Branch office", "Specified activities, with RBI/AD bank approval"],
          ["Project office", "A specific project in India"],
        ],
      },
    ],
    faqs: [
      {
        q: "Can the foreign parent own 100%?",
        a: "Yes in most sectors; a second shareholder (often a nominee) is needed for a private company.",
      },
      {
        q: "How is the subsidiary taxed?",
        a: "As a domestic company, with the option of concessional corporate tax rates subject to conditions.",
      },
    ],
  },

  "msme-registration": {
    slug: "msme-registration",
    metaTitle: "MSME Udyam Registration Online – Free Guidance | Filing360",
    metaDescription:
      "Udyam registration for micro, small and medium enterprises: new classification limits, documents, benefits like CGTMSE loans and 45-day payment protection.",
    keywords: [
      "Udyam registration",
      "MSME registration",
      "Udyam certificate",
      "MSME classification 2025",
      "MSME benefits",
      "Udyam registration for traders",
    ],
    h1: "MSME / Udyam Registration",
    lead: "Udyam registration gives your business official MSME status. It is free on the government portal, and it unlocks loans, payment protection and government benefits. We register you correctly, with the right classification and NIC codes.",
    highlights: ["Govt registration free", "Correct NIC codes"],
    cta: "Get Udyam Registration",
    imageAlt: "MSME Udyam registration by Filing360",
    related: [
      { href: STARTUP_HUB_PATH, label: "Startup hub" },
      { href: STARTUP.dpiit, label: "DPIIT recognition" },
      { href: STARTUP.prop, label: "Proprietorship" },
    ],
    sections: [
      {
        type: "table",
        title: "MSME classification (from 1 April 2025)",
        columns: ["Category", "Investment in plant, machinery or equipment", "Turnover"],
        rows: [
          ["Micro", "Up to ₹2.5 crore", "Up to ₹10 crore"],
          ["Small", "Up to ₹25 crore", "Up to ₹100 crore"],
          ["Medium", "Up to ₹125 crore", "Up to ₹500 crore"],
        ],
        note: "Both limits must be met. Check the latest notification, as limits are revised from time to time.",
      },
      {
        type: "list",
        title: "Benefits",
        items: [
          "Collateral-free loans through CGTMSE and priority sector lending",
          "Protection against delayed payments: buyers must pay micro and small suppliers within the agreed period (maximum 45 days), or pay compound interest; buyers may also lose the income tax deduction for late payments",
          "Exemption from earnest money deposits and preference in many government tenders",
          "Lower fees for trademarks and patents, and access to state subsidies",
          "Online grievance filing on the MSME Samadhaan portal",
        ],
      },
      {
        type: "p",
        title: "Documents",
        body: "Aadhaar of the proprietor, partner or authorised signatory, PAN of the business, GSTIN (where applicable), bank details, NIC activity codes, investment and turnover (auto-filled from PAN and GST data for existing businesses).",
      },
    ],
    faqs: [
      {
        q: "Can traders register on Udyam?",
        a: "Yes, retail and wholesale traders can register, mainly for priority sector lending benefits.",
      },
      {
        q: "Does Udyam need renewal?",
        a: "No, but details are updated, and classification is revised annually based on ITR and GST data.",
      },
    ],
  },
};

export function getStartupServicePage(slug: string) {
  return startupServicePages[slug];
}
