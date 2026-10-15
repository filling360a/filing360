import { KEY } from "./links";

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  published: string;
  updated: string;
  intro: string;
  verdict: string;
  table: { columns: [string, string]; rows: { label: string; values: [string, string] }[] };
  chooseFirst: { title: string; points: string[] };
  chooseSecond: { title: string; points: string[] };
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
  services: string[];
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: "llp-vs-private-limited",
    title: "LLP vs Private Limited Company: Which Should You Register?",
    metaTitle: "LLP vs Private Limited Company — Differences, Tax & Compliance (2026)",
    description:
      "Compare LLP and Private Limited Company on liability, taxation, funding, compliance cost and audit. Find out which structure suits your business in India.",
    published: "2026-10-15",
    updated: "2026-10-15",
    intro:
      "Both an LLP and a private limited company give you limited liability and a separate legal identity. The difference is in how they're owned, taxed, funded and regulated — and that decides which one fits your plans.",
    verdict:
      "Choose a private limited company if you plan to raise equity funding, issue ESOPs or build a business you may sell. Choose an LLP if you're a services or professional firm that values lower compliance costs and doesn't need outside investors.",
    table: {
      columns: ["LLP", "Private Limited Company"],
      rows: [
        { label: "Governing law", values: ["Limited Liability Partnership Act, 2008", "Companies Act, 2013"] },
        { label: "Minimum people", values: ["2 partners (2 designated partners)", "2 directors and 2 shareholders"] },
        { label: "Maximum owners", values: ["No limit", "200 shareholders"] },
        { label: "Liability", values: ["Limited to agreed contribution", "Limited to unpaid share capital"] },
        { label: "Equity funding & ESOPs", values: ["Not possible — no shares", "Yes — preferred by VCs and angels"] },
        { label: "Income tax rate", values: ["30% + surcharge & cess", "22% concessional regime + surcharge & cess (or 25%/30%)"] },
        { label: "Profit distribution", values: ["Share of profit tax-free for partners", "Dividends taxed in shareholders' hands"] },
        { label: "Statutory audit", values: ["Only if turnover > ₹40 lakh or contribution > ₹25 lakh", "Mandatory every year"] },
        { label: "Annual MCA filings", values: ["Form 8 and Form 11", "AOC-4, MGT-7/7A, ADT-1, DIR-3 KYC"] },
        { label: "Board meetings / AGM", values: ["Not required", "Board meetings every quarter (relaxed for small companies) and an AGM"] },
        { label: "Ownership transfer", values: ["Needs partners' consent and LLP agreement change", "Share transfer, subject to Articles"] },
        { label: "Typical compliance cost", values: ["Lower", "Higher"] },
      ],
    },
    chooseFirst: {
      title: "An LLP suits you if…",
      points: [
        "You run a consultancy, agency or professional practice",
        "You don't plan to raise equity from investors",
        "You want lower annual compliance and audit costs (below the audit thresholds)",
        "Partners want to take profits out without dividend tax",
      ],
    },
    chooseSecond: {
      title: "A private limited company suits you if…",
      points: [
        "You plan to raise angel or VC funding",
        "You want to offer ESOPs to attract talent",
        "Enterprise customers, banks or marketplaces expect a company",
        "You may sell the business or bring in strategic partners later",
      ],
    },
    sections: [
      {
        heading: "Taxation compared",
        paragraphs: [
          "An LLP is taxed at a flat 30% on profits, plus a 12% surcharge if income exceeds ₹1 crore and 4% health and education cess. Once tax is paid at the LLP level, the share of profit partners receive is not taxed again in their hands. Partner salaries and interest on capital are deductible within the limits set by the Income-tax law.",
          "A domestic company can opt for the concessional 22% regime (about 25.17% including surcharge and cess) if it gives up certain deductions. Dividends are then taxed in the shareholders' hands at their slab rates. For founders who want to keep profits in the business to grow it, the company rate is lower; for those who distribute most profits, an LLP can work out cheaper.",
        ],
      },
      {
        heading: "Funding and growth",
        paragraphs: [
          "Investors buy shares. An LLP has no shares, so it can't issue equity, convertible notes, CCPS or ESOPs — which is why almost every venture-backed start-up in India is a private limited company. An LLP can still borrow from banks and partners, and can bring in new partners by amending the LLP agreement.",
          "If you start as an LLP and later want funding, you can convert to a company, but it takes time and fees. If funding is even a possibility, starting as a private limited company is usually simpler.",
        ],
      },
      {
        heading: "Compliance and running cost",
        paragraphs: [
          "A private limited company must have its accounts audited every year, hold board meetings and an AGM, maintain statutory registers and file several forms with the MCA. An LLP files a statement of accounts and solvency (Form 8) and an annual return (Form 11), and needs an audit only above the turnover or contribution thresholds.",
          "Late filing is expensive for both: the MCA charges an additional fee of ₹100 per day of delay per form, so a reliable compliance calendar matters either way.",
        ],
      },
    ],
    faqs: [
      { q: "Can an LLP be converted into a private limited company later?", a: "Yes. An LLP can be converted into a company under the Companies Act, 2013. The process involves approvals from all partners, fresh MoA and AoA, and filings with the MCA." },
      { q: "Is an LLP cheaper to register than a private limited company?", a: "Registration costs are similar. The real difference is in annual compliance — an LLP below the audit thresholds is cheaper to maintain each year." },
      { q: "Can a foreign national be a partner in an LLP?", a: "Yes, foreign nationals can be partners, but at least one designated partner must be resident in India. FDI in LLPs is allowed under the automatic route only in sectors where 100% FDI is permitted without conditions." },
      { q: "Which is better for a small consulting business?", a: "Usually an LLP, unless you expect to raise investment or your clients insist on a company. It gives limited liability with lighter compliance." },
    ],
    services: [KEY.llp, KEY.pvtLtd, KEY.llpCompliance, KEY.companyCompliance],
    related: ["opc-vs-private-limited", "proprietorship-vs-partnership"],
  },
  {
    slug: "opc-vs-private-limited",
    title: "OPC vs Private Limited Company: Which Is Right for a Solo Founder?",
    metaTitle: "OPC vs Private Limited Company — Rules, Tax & Conversion (2026)",
    description:
      "One Person Company or Private Limited? Compare ownership, nominee rules, compliance, taxation and fundraising to pick the right structure as a solo founder.",
    published: "2026-10-15",
    updated: "2026-10-15",
    intro:
      "A One Person Company (OPC) lets a single founder get limited liability and a company structure without a co-founder. A private limited company needs at least two shareholders but is far more flexible for growth.",
    verdict:
      "Choose an OPC if you're a solo founder who wants a company today and isn't raising money yet. Choose a private limited company if you have a co-founder, plan to raise funds or want to give equity to employees.",
    table: {
      columns: ["One Person Company", "Private Limited Company"],
      rows: [
        { label: "Owners", values: ["Exactly 1 member (a natural person, Indian citizen)", "2 to 200 shareholders"] },
        { label: "Directors", values: ["Minimum 1, maximum 15", "Minimum 2, maximum 15"] },
        { label: "Nominee", values: ["Mandatory — takes over if the member dies or is incapacitated", "Not required"] },
        { label: "Raising equity", values: ["Not possible without converting", "Yes — can issue shares to investors"] },
        { label: "ESOPs", values: ["No", "Yes"] },
        { label: "Income tax", values: ["Same as a company", "Same as a company"] },
        { label: "AGM", values: ["Not required", "Required"] },
        { label: "Board meetings", values: ["At least one in each half of the calendar year (if more than one director)", "Every quarter (relaxed for small companies)"] },
        { label: "Annual return", values: ["MGT-7A (simplified)", "MGT-7 or MGT-7A"] },
        { label: "Statutory audit", values: ["Mandatory", "Mandatory"] },
        { label: "Conversion", values: ["Can convert to Pvt Ltd any time", "Can convert to OPC if it meets the conditions"] },
        { label: "Limit on number", values: ["A person can form only one OPC", "No limit"] },
      ],
    },
    chooseFirst: {
      title: "An OPC suits you if…",
      points: [
        "You're the only founder and want full control",
        "You want limited liability and a company name on invoices",
        "You don't plan to raise equity in the near future",
        "You prefer fewer meetings and a simpler annual return",
      ],
    },
    chooseSecond: {
      title: "A private limited company suits you if…",
      points: [
        "You have a co-founder or plan to add one",
        "You're planning to raise funds from angels or VCs",
        "You want to offer ESOPs",
        "You want maximum credibility with banks and large customers",
      ],
    },
    sections: [
      {
        heading: "What changed for OPCs in 2021",
        paragraphs: [
          "OPC rules were relaxed from 1 April 2021. There is no longer a paid-up capital or turnover limit that forces an OPC to convert, an OPC can convert into a private or public company whenever it wants, and Indian citizens living abroad can now form an OPC.",
          "Some restrictions remain: an OPC can't carry out non-banking financial investment activities, can't be registered as a Section 8 (non-profit) company, and a person can be a member of only one OPC.",
        ],
      },
      {
        heading: "Tax is the same — compliance is lighter",
        paragraphs: [
          "An OPC is taxed exactly like any other domestic company, including the option of the concessional 22% regime. The savings come from compliance: no AGM, fewer board meetings and a simplified annual return.",
          "An OPC still needs a statutory audit every year and files its financial statements (AOC-4) and annual return (MGT-7A) with the MCA.",
        ],
      },
      {
        heading: "When to convert",
        paragraphs: [
          "Convert your OPC to a private limited company when you bring in a co-founder, take investment or want to issue ESOPs. Conversion needs a special resolution, altered MoA and AoA, and a filing with the ROC — usually a matter of weeks.",
        ],
      },
    ],
    faqs: [
      { q: "Can an NRI register a One Person Company?", a: "Yes. Since April 2021, any Indian citizen — resident or not — can form an OPC. The nominee must also be an Indian citizen." },
      { q: "Can an OPC have more than one director?", a: "Yes. An OPC has one member (owner) but can appoint up to 15 directors." },
      { q: "What happens to an OPC if the owner dies?", a: "The nominee named at incorporation becomes the member, so the company continues. The nominee can be changed later by filing a form with the ROC." },
      { q: "Can I convert my proprietorship into an OPC?", a: "Not directly by law, but you can register an OPC and transfer the business, assets and contracts of the proprietorship to it through a business transfer agreement." },
    ],
    services: [KEY.opc, KEY.pvtLtd, KEY.opcCompliance, KEY.companyCompliance],
    related: ["llp-vs-private-limited", "proprietorship-vs-partnership"],
  },
  {
    slug: "proprietorship-vs-partnership",
    title: "Sole Proprietorship vs Partnership Firm: Pros, Cons & Tax",
    metaTitle: "Proprietorship vs Partnership Firm — Liability, Tax & Registration",
    description:
      "Compare sole proprietorship and partnership firm on registration, liability, taxation and compliance. Understand when to move to an LLP or company.",
    published: "2026-10-15",
    updated: "2026-10-15",
    intro:
      "Proprietorships and partnership firms are the simplest ways to start a business in India. Neither gives you limited liability, but they're quick to set up and cheap to run.",
    verdict:
      "Choose a proprietorship if you're starting alone and want the least paperwork. Choose a partnership if you're starting with others and want a written agreement on money and roles. If liability protection matters, look at an LLP instead.",
    table: {
      columns: ["Sole proprietorship", "Partnership firm"],
      rows: [
        { label: "Governing law", values: ["No specific law", "Indian Partnership Act, 1932"] },
        { label: "Owners", values: ["1 person", "2 to 50 partners"] },
        { label: "Separate legal entity", values: ["No", "No"] },
        { label: "Liability", values: ["Unlimited — personal assets at risk", "Unlimited, joint and several"] },
        { label: "How it's set up", values: ["Business proofs: GST, Udyam, Shops Act registration", "Partnership deed; registration with the Registrar of Firms is optional but recommended"] },
        { label: "PAN", values: ["Owner's personal PAN", "Separate PAN for the firm"] },
        { label: "Income tax", values: ["Owner's slab rates", "Flat 30% + surcharge & cess"] },
        { label: "Profit in owner's hands", values: ["Taxed as owner's income", "Partners' share of profit is tax-free"] },
        { label: "Statutory audit", values: ["No (tax audit only above thresholds)", "No (tax audit only above thresholds)"] },
        { label: "Continuity", values: ["Ends with the owner", "Depends on the deed; may dissolve on a partner leaving"] },
        { label: "Funding", values: ["Owner's funds and loans", "Partners' capital and loans"] },
      ],
    },
    chooseFirst: {
      title: "A proprietorship suits you if…",
      points: [
        "You're a solo trader, freelancer or small shop",
        "Your income is modest and slab rates keep tax low",
        "You want to start in days with minimal cost",
        "You can live with unlimited personal liability",
      ],
    },
    chooseSecond: {
      title: "A partnership suits you if…",
      points: [
        "You're starting with family or friends",
        "You want roles, capital and profit-sharing in writing",
        "Profits are high enough that a flat 30% beats top slab rates",
        "You don't need limited liability yet",
      ],
    },
    sections: [
      {
        heading: "Why register a partnership",
        paragraphs: [
          "A partnership exists once partners sign a deed, but an unregistered firm can't file a lawsuit against third parties to enforce its contracts, and partners can't sue the firm or each other over rights under the deed. Registering with the state Registrar of Firms avoids this and is usually inexpensive.",
        ],
      },
      {
        heading: "How tax compares",
        paragraphs: [
          "A proprietor pays tax on business profit at personal slab rates — under the new regime there's no tax on income up to ₹12 lakh after the rebate. A partnership firm pays a flat 30% (plus surcharge above ₹1 crore and cess), but salaries and interest paid to working partners are deductible within limits, and partners' share of profit is exempt in their hands.",
          "Small businesses with turnover within the limits can use presumptive taxation — declaring a fixed percentage of turnover as profit — to avoid maintaining detailed books. Proprietorships and partnership firms can both use it; LLPs cannot.",
        ],
      },
      {
        heading: "When to upgrade",
        paragraphs: [
          "Once you have meaningful assets, employees, large contracts or plans for investment, unlimited liability becomes a real risk. Converting a partnership into an LLP, or moving a proprietorship's business into a company, protects personal assets.",
        ],
      },
    ],
    faqs: [
      { q: "Do I need to register a sole proprietorship?", a: "There's no single registration. You establish it through registrations like GST, Udyam (MSME) or a Shops & Establishments licence, plus a current account in the business name." },
      { q: "Is a partnership deed mandatory?", a: "A written deed isn't strictly required by law, but you need one to get a PAN, open a bank account and register the firm — and to avoid disputes." },
      { q: "Can a partnership firm be converted into an LLP?", a: "Yes. A registered partnership can convert into an LLP by filing Form 17 with the MCA, with all partners becoming partners of the LLP." },
      { q: "How many partners can a firm have?", a: "Up to 50 partners under the Companies (Miscellaneous) Rules, 2014." },
    ],
    services: [KEY.proprietorship, KEY.partnership, KEY.llp, KEY.itrProprietor],
    related: ["llp-vs-private-limited", "opc-vs-private-limited"],
  },
  {
    slug: "old-vs-new-tax-regime",
    title: "Old vs New Tax Regime: Which Saves You More?",
    metaTitle: "Old vs New Tax Regime — Slabs, Deductions & Break-even (FY 2025-26)",
    description:
      "Compare old and new income tax regimes: slab rates, standard deduction, 87A rebate, deductions allowed and who saves more. Includes a free calculator.",
    published: "2026-10-15",
    updated: "2026-10-15",
    intro:
      "The new tax regime is the default and has lower rates with very few deductions. The old regime has higher rates but lets you claim HRA, 80C, 80D, home-loan interest and more. Which one wins depends on how much you can claim.",
    verdict:
      "With income up to ₹12 lakh (₹12.75 lakh for salaried people), the new regime means zero tax. Above that, the old regime only wins if your deductions are large — typically HRA plus full 80C, 80D and home-loan interest. Run both in our calculator before you decide.",
    table: {
      columns: ["Old regime", "New regime (default)"],
      rows: [
        { label: "Tax-free income (slab)", values: ["₹2.5 lakh (₹3 lakh for 60+, ₹5 lakh for 80+)", "₹4 lakh"] },
        { label: "Slab rates", values: ["5%, 20%, 30%", "5%, 10%, 15%, 20%, 25%, 30%"] },
        { label: "Rebate", values: ["Up to ₹12,500 if income ≤ ₹5 lakh", "Up to ₹60,000 if income ≤ ₹12 lakh"] },
        { label: "Standard deduction (salaried)", values: ["₹50,000", "₹75,000"] },
        { label: "HRA, LTA", values: ["Allowed", "Not allowed"] },
        { label: "80C (PPF, ELSS, LIC, EPF…)", values: ["Up to ₹1.5 lakh", "Not allowed"] },
        { label: "80D health insurance", values: ["Allowed", "Not allowed"] },
        { label: "Home-loan interest (self-occupied)", values: ["Up to ₹2 lakh", "Not allowed"] },
        { label: "Employer NPS contribution", values: ["Allowed (up to 10% of salary)", "Allowed (up to 14% of salary)"] },
        { label: "Highest surcharge", values: ["37% (income > ₹5 crore)", "25%"] },
        { label: "Switching", values: ["Salaried: choose every year", "Business income: switch back only once"] },
      ],
    },
    chooseFirst: {
      title: "The old regime may suit you if…",
      points: [
        "You pay high rent in a metro and claim HRA",
        "You have a home loan on a self-occupied house",
        "You fully use 80C, 80D and 80CCD(1B) NPS",
        "Your total deductions are well above ₹4–5 lakh",
      ],
    },
    chooseSecond: {
      title: "The new regime may suit you if…",
      points: [
        "Your taxable income is up to about ₹12–13 lakh",
        "You don't have a home loan or pay rent",
        "You prefer flexible investments over tax-locked ones",
        "You want simpler filing with fewer proofs",
      ],
    },
    sections: [
      {
        heading: "New regime slabs (FY 2025-26)",
        paragraphs: [
          "Up to ₹4 lakh: nil · ₹4–8 lakh: 5% · ₹8–12 lakh: 10% · ₹12–16 lakh: 15% · ₹16–20 lakh: 20% · ₹20–24 lakh: 25% · above ₹24 lakh: 30%. A 4% health and education cess applies on the tax.",
          "The rebate makes tax nil for resident individuals with taxable income up to ₹12 lakh. Marginal relief applies just above ₹12 lakh, so your tax can't exceed the income above ₹12 lakh. The rebate doesn't cover income taxed at special rates, such as capital gains on shares.",
        ],
      },
      {
        heading: "Old regime slabs (FY 2025-26)",
        paragraphs: [
          "For individuals below 60: up to ₹2.5 lakh nil · ₹2.5–5 lakh 5% · ₹5–10 lakh 20% · above ₹10 lakh 30%, plus 4% cess. Senior citizens (60–79) get a ₹3 lakh basic exemption and super seniors (80+) ₹5 lakh.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "Add up every deduction you can genuinely claim under the old regime. If the total is small, the new regime almost always wins. As a rough guide, at ₹15–20 lakh income the old regime starts to win only when deductions exceed about ₹4–5 lakh — so use the calculator with your own numbers.",
          "Salaried people can pick a regime every year when filing their return. People with business or professional income can move from the new regime to the old only once in their lifetime, so choose carefully.",
          "From 1 April 2026 the Income-tax Act, 2025 replaces the 1961 Act. Section numbers change, but rates and the broad choice between regimes continue. We'll update this guide whenever slabs change.",
        ],
      },
    ],
    faqs: [
      { q: "Which regime applies if I don't choose?", a: "The new regime is the default. You must opt for the old regime when filing your return (or, for business income, by filing the prescribed form before the due date)." },
      { q: "Can I claim HRA in the new regime?", a: "No. HRA, LTA, 80C, 80D and home-loan interest on a self-occupied property are not allowed in the new regime." },
      { q: "Is income of ₹12.75 lakh tax-free for salaried employees?", a: "Yes, under the new regime. The ₹75,000 standard deduction brings taxable income to ₹12 lakh, and the rebate makes the tax nil (for resident individuals, excluding special-rate income)." },
      { q: "Can I tell my employer one regime and file in the other?", a: "Yes. If you're salaried, the choice you make at filing time is final for that year, even if your employer deducted TDS under the other regime." },
    ],
    services: [KEY.itrIndividual, KEY.taxPlanning, KEY.taxNotice],
    related: ["composition-vs-regular-gst"],
  },
  {
    slug: "composition-vs-regular-gst",
    title: "GST Composition Scheme vs Regular Scheme: Which Should You Choose?",
    metaTitle: "GST Composition vs Regular Scheme — Limits, Rates & Returns",
    description:
      "Compare GST composition and regular schemes: turnover limits, tax rates, input tax credit, inter-state sales, e-commerce and return filing.",
    published: "2026-10-15",
    updated: "2026-10-15",
    intro:
      "The GST composition scheme lets small businesses pay a low flat tax on turnover with quarterly payments and minimal paperwork. The trade-off: no input tax credit, no inter-state sales and you can't charge GST to customers.",
    verdict:
      "Composition suits small local traders, manufacturers and restaurants selling to consumers within the state. Choose regular GST if you sell to businesses who want input credit, sell across states, export, or have high input costs.",
    table: {
      columns: ["Composition scheme", "Regular scheme"],
      rows: [
        { label: "Turnover limit", values: ["₹1.5 crore (₹75 lakh in certain special-category states); ₹50 lakh for service providers", "No limit"] },
        { label: "Tax rate", values: ["1% traders & manufacturers, 5% restaurants, 6% services (on turnover)", "Normal GST rate on each supply"] },
        { label: "Input tax credit", values: ["Not available", "Available"] },
        { label: "Charge GST to customers", values: ["No — issue a bill of supply", "Yes — issue a tax invoice"] },
        { label: "Inter-state outward supply", values: ["Not allowed", "Allowed"] },
        { label: "Exports", values: ["Not allowed", "Allowed (with LUT, without IGST)"] },
        { label: "Returns", values: ["CMP-08 quarterly + GSTR-4 annually", "GSTR-1 and GSTR-3B monthly or quarterly (QRMP) + GSTR-9 annually"] },
        { label: "Compliance effort", values: ["Low", "Higher"] },
        { label: "Who prefers it", values: ["Local B2C sellers", "B2B suppliers, inter-state sellers, exporters"] },
      ],
    },
    chooseFirst: {
      title: "Composition may suit you if…",
      points: [
        "You sell mainly to consumers in your own state",
        "Your turnover is below the limit",
        "Your purchases carry little GST you could claim back",
        "You want quarterly payments and simple records",
      ],
    },
    chooseSecond: {
      title: "Regular GST may suit you if…",
      points: [
        "Your customers are GST-registered businesses",
        "You sell to other states or export",
        "You buy a lot of taxable inputs and want credit",
        "You plan to grow beyond the composition limit soon",
      ],
    },
    sections: [
      {
        heading: "Who can't opt for composition",
        paragraphs: [
          "Composition isn't available to businesses making inter-state outward supplies, non-resident taxable persons, casual taxable persons, and manufacturers of certain notified goods such as ice cream, pan masala and tobacco products. Service providers can use the separate composition option for services only within the ₹50 lakh limit.",
          "Composition dealers may supply goods through e-commerce marketplaces within their own state, subject to conditions; inter-state sales remain barred.",
        ],
      },
      {
        heading: "How to opt in or out",
        paragraphs: [
          "Existing taxpayers opt in by filing Form CMP-02 before the start of the financial year. New applicants can choose composition while registering. You can withdraw at any time by filing CMP-04, and you must move to the regular scheme once turnover crosses the limit.",
        ],
      },
      {
        heading: "The hidden cost: input tax credit",
        paragraphs: [
          "Under composition, the GST you pay on purchases becomes a cost. If your inputs carry 18% GST and your margins are thin, regular registration with full input credit can be cheaper overall — even though the headline rate is higher.",
        ],
      },
    ],
    faqs: [
      { q: "Can a composition dealer sell on Amazon or Flipkart?", a: "Yes, for supplies of goods within the same state, subject to conditions. Inter-state supplies through marketplaces are not allowed under composition." },
      { q: "What is the due date for CMP-08?", a: "CMP-08 is filed quarterly by the 18th of the month after the quarter ends. GSTR-4 is the annual return, due by 30 April after the financial year." },
      { q: "Can my customers claim input credit on my bill?", a: "No. A composition dealer issues a bill of supply without GST, so buyers can't claim credit — which is why B2B customers often prefer regular suppliers." },
      { q: "What happens if I cross ₹1.5 crore turnover?", a: "You must move to the regular scheme by filing the withdrawal form within 7 days of crossing the limit, and start issuing tax invoices." },
    ],
    services: [KEY.gstReg, KEY.gstComposition, KEY.gstReturns, KEY.gstApplicability],
    related: ["old-vs-new-tax-regime"],
  },
];

export const guideHref = (g: Pick<Guide, "slug">) => `/guides/${g.slug}`;
export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
