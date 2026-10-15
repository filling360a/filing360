export type City = {
  slug: string;
  name: string;
  state: string;
  /** Registrar of Companies with jurisdiction over the registered office */
  roc: string;
  /** Whether the state levies professional tax on employers / employees */
  professionalTax: boolean;
  shopsAct: string;
  intro: string;
  ecosystem: string;
  hubs: string[];
  sectors: string[];
  localNotes: string[];
  faqs: { q: string; a: string }[];
  nearby: string[];
};

export const cities: City[] = [
  {
    slug: "delhi",
    name: "Delhi",
    state: "Delhi",
    roc: "ROC Delhi (NCT of Delhi & Haryana)",
    professionalTax: false,
    shopsAct: "Delhi Shops & Establishments Act, 1954",
    intro:
      "Delhi is one of India's largest markets for trading, professional services and D2C brands — and one of the busiest jurisdictions for new company incorporations.",
    ecosystem:
      "From wholesale trade in Chandni Chowk and Karol Bagh to consultancies in Connaught Place and tech start-ups in Okhla and Saket, Delhi founders often need a company that can raise funds, open a current account quickly and register for GST in the same month.",
    hubs: ["Connaught Place", "Nehru Place", "Okhla", "Saket", "Karol Bagh", "Rajouri Garden", "Dwarka"],
    sectors: ["Trading & distribution", "Professional services", "D2C & e-commerce", "Education & ed-tech", "Real estate"],
    localNotes: [
      "Delhi does not levy professional tax, so there is no state PT registration for employers.",
      "A registered office can be a rented commercial space or a residential address, supported by a utility bill and the owner's NOC.",
      "GST registration in Delhi uses state code 07.",
    ],
    faqs: [
      { q: "Which ROC handles companies registered in Delhi?", a: "Companies with a registered office in Delhi fall under the Registrar of Companies, NCT of Delhi & Haryana. The incorporation itself is processed centrally by the Central Registration Centre (CRC)." },
      { q: "Can I use my home in Delhi as the registered office?", a: "Yes. A residential address is allowed. You need a recent utility bill (not older than two months) and a no-objection certificate from the owner if the property isn't in a director's name." },
    ],
    nearby: ["noida", "gurgaon", "jaipur"],
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    roc: "ROC Mumbai",
    professionalTax: true,
    shopsAct: "Maharashtra Shops & Establishments (Regulation of Employment and Conditions of Service) Act, 2017",
    intro:
      "Mumbai is India's financial capital — home to the stock exchanges, RBI, SEBI and most large banks, funds and media houses.",
    ecosystem:
      "Founders in Mumbai typically set up private limited companies to raise capital, work with institutional clients or operate in fintech, media and financial services, where investors and counterparties expect a corporate structure.",
    hubs: ["Bandra Kurla Complex", "Lower Parel", "Andheri", "Powai", "Nariman Point", "Navi Mumbai", "Thane"],
    sectors: ["Financial services & fintech", "Media & entertainment", "Import–export", "Real estate", "Consulting"],
    localNotes: [
      "Maharashtra levies professional tax. Companies need a PT enrolment certificate (PTEC) and, once they have employees, a PT registration certificate (PTRC).",
      "Establishments with employees register under the Maharashtra Shops & Establishments Act, 2017; very small establishments file an intimation instead.",
      "GST registration in Maharashtra uses state code 27.",
    ],
    faqs: [
      { q: "Do I need professional tax registration for a company in Mumbai?", a: "Yes. In Maharashtra the company itself needs a PT enrolment (PTEC), and once it pays salaries above the threshold it must register (PTRC) and deduct PT from employees." },
      { q: "Which ROC handles companies registered in Mumbai?", a: "The Registrar of Companies, Mumbai. Incorporation is processed by the Central Registration Centre; ROC Mumbai handles later filings and changes." },
    ],
    nearby: ["pune", "ahmedabad"],
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    roc: "ROC Bangalore",
    professionalTax: true,
    shopsAct: "Karnataka Shops & Commercial Establishments Act, 1961",
    intro:
      "Bengaluru is India's start-up capital, with the country's deepest pool of venture capital, engineering talent and SaaS companies.",
    ecosystem:
      "Most Bengaluru founders register a private limited company from day one — it's what VCs, angel networks and ESOP plans require — and apply for DPIIT recognition to unlock Startup India benefits.",
    hubs: ["Koramangala", "HSR Layout", "Indiranagar", "Whitefield", "Electronic City", "Bellandur", "MG Road"],
    sectors: ["SaaS & software", "Deep-tech & AI", "Fintech", "Biotech", "E-commerce"],
    localNotes: [
      "Karnataka levies professional tax. Employers register and deduct PT from eligible employees' salaries.",
      "Many Bengaluru start-ups also apply for DPIIT recognition soon after incorporation for tax and compliance benefits.",
      "GST registration in Karnataka uses state code 29.",
    ],
    faqs: [
      { q: "Should a Bangalore tech start-up register as a Pvt Ltd or LLP?", a: "If you plan to raise venture funding or issue ESOPs, a private limited company is the standard choice. LLPs can't issue equity shares or ESOPs, which most investors require." },
      { q: "Which ROC handles companies registered in Bangalore?", a: "The Registrar of Companies, Bangalore (Karnataka). Incorporation is processed by the Central Registration Centre." },
    ],
    nearby: ["chennai", "hyderabad"],
  },
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    roc: "ROC Pune",
    professionalTax: true,
    shopsAct: "Maharashtra Shops & Establishments (Regulation of Employment and Conditions of Service) Act, 2017",
    intro:
      "Pune combines a large IT and engineering services base with a strong automotive and manufacturing belt — and a fast-growing start-up scene.",
    ecosystem:
      "Founders here range from IT services firms and SaaS products to auto-component suppliers and manufacturing MSMEs, many of whom need Udyam registration and GST alongside incorporation.",
    hubs: ["Hinjewadi", "Kharadi", "Baner", "Magarpatta", "Viman Nagar", "Chakan", "Pimpri-Chinchwad"],
    sectors: ["IT services", "Automotive & engineering", "Manufacturing MSMEs", "Ed-tech", "SaaS"],
    localNotes: [
      "Maharashtra levies professional tax, so companies need PTEC and, with employees, PTRC.",
      "Manufacturing MSMEs often register on Udyam right after incorporation to access priority-sector credit and delayed-payment protection.",
      "GST registration in Maharashtra uses state code 27.",
    ],
    faqs: [
      { q: "Which ROC handles companies registered in Pune?", a: "The Registrar of Companies, Pune, which covers several districts of Maharashtra. Incorporation itself is processed by the Central Registration Centre." },
      { q: "Do manufacturing units in Pune need MSME registration?", a: "It isn't mandatory, but Udyam registration is free and gives access to collateral-free loan schemes, government tender benefits and the 45-day payment rule from buyers." },
    ],
    nearby: ["mumbai", "ahmedabad"],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    roc: "ROC Hyderabad",
    professionalTax: true,
    shopsAct: "Telangana Shops & Establishments Act, 1988",
    intro:
      "Hyderabad is home to global capability centres, a thriving pharma and life-sciences cluster, and a fast-growing start-up community around T-Hub.",
    ecosystem:
      "Founders here often build IT services, pharma and health-tech businesses, and many set up Indian subsidiaries of foreign companies to serve global clients.",
    hubs: ["HITEC City", "Gachibowli", "Madhapur", "Banjara Hills", "Kondapur", "Genome Valley"],
    sectors: ["IT & GCCs", "Pharma & life sciences", "Health-tech", "Real estate", "Food processing"],
    localNotes: [
      "Telangana levies professional tax on employers and employees.",
      "Foreign companies commonly incorporate a wholly owned Indian subsidiary here; FEMA reporting (FC-GPR) follows share allotment.",
      "GST registration in Telangana uses state code 36.",
    ],
    faqs: [
      { q: "Can a foreign company register a subsidiary in Hyderabad?", a: "Yes. A foreign parent can hold up to 100% in most sectors under the automatic route. You need at least one resident Indian director and must report the investment to RBI within 30 days of allotting shares." },
      { q: "Which ROC handles companies registered in Hyderabad?", a: "The Registrar of Companies, Hyderabad (Telangana). Incorporation is processed by the Central Registration Centre." },
    ],
    nearby: ["bangalore", "chennai"],
  },
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    roc: "ROC Chennai",
    professionalTax: true,
    shopsAct: "Tamil Nadu Shops & Establishments Act, 1947",
    intro:
      "Chennai is a major hub for automobile manufacturing, electronics, SaaS and IT services — and a gateway port for exporters.",
    ecosystem:
      "Founders in Chennai build SaaS products for global markets, manufacturing and component units, and export businesses that need an IEC and a GST LUT to export without paying IGST.",
    hubs: ["OMR (IT Corridor)", "Guindy", "T. Nagar", "Anna Nagar", "Ambattur", "Sriperumbudur"],
    sectors: ["SaaS", "Automotive & electronics", "Exports", "Healthcare", "Logistics"],
    localNotes: [
      "Tamil Nadu levies professional tax, collected by local bodies on a half-yearly basis.",
      "Exporters should file a GST LUT each year to export services or goods without paying IGST upfront.",
      "GST registration in Tamil Nadu uses state code 33.",
    ],
    faqs: [
      { q: "Which ROC handles companies registered in Chennai?", a: "The Registrar of Companies, Chennai. Incorporation is processed by the Central Registration Centre." },
      { q: "Do I need a GST LUT if I export software services from Chennai?", a: "Yes, if you want to export without paying IGST and claiming a refund later. The LUT is filed online each financial year and is free." },
    ],
    nearby: ["bangalore", "hyderabad"],
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    roc: "ROC Kolkata",
    professionalTax: true,
    shopsAct: "West Bengal Shops & Establishments Act, 1963",
    intro:
      "Kolkata is eastern India's commercial centre, with a long tradition of trading houses, family businesses and a growing IT and start-up base in Salt Lake and New Town.",
    ecosystem:
      "Many Kolkata businesses are converting proprietorships and partnerships into companies or LLPs as they grow, and new founders are building IT, ed-tech and consumer brands.",
    hubs: ["Salt Lake Sector V", "New Town", "Park Street", "Dalhousie (BBD Bagh)", "Burrabazar", "Howrah"],
    sectors: ["Trading", "IT services", "Tea & agri-commodities", "Ed-tech", "Manufacturing"],
    localNotes: [
      "West Bengal levies professional tax on employers and employees.",
      "Family businesses often move from partnership to LLP or private limited for limited liability and easier succession.",
      "GST registration in West Bengal uses state code 19.",
    ],
    faqs: [
      { q: "Can I convert my partnership firm in Kolkata into an LLP?", a: "Yes. A registered partnership can be converted into an LLP by filing Form 17 with the MCA, carrying over assets, liabilities and contracts. All partners must consent." },
      { q: "Which ROC handles companies registered in Kolkata?", a: "The Registrar of Companies, Kolkata. Incorporation is processed by the Central Registration Centre." },
    ],
    nearby: ["delhi", "hyderabad"],
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    roc: "ROC Ahmedabad",
    professionalTax: true,
    shopsAct: "Gujarat Shops & Establishments (Regulation of Employment and Conditions of Service) Act, 2019",
    intro:
      "Ahmedabad is one of India's most entrepreneurial cities — strong in textiles, chemicals, pharma and trading — with GIFT City nearby for international finance.",
    ecosystem:
      "Founders here include first-generation manufacturers, traders scaling into companies, and fintech and IFSC businesses setting up around GIFT City in Gandhinagar.",
    hubs: ["SG Highway", "Prahlad Nagar", "Navrangpura", "Ashram Road", "GIFT City (Gandhinagar)", "Sanand"],
    sectors: ["Textiles", "Chemicals & pharma", "Trading", "Fintech & IFSC", "Diamonds & jewellery"],
    localNotes: [
      "Gujarat levies professional tax on employers and employees.",
      "Businesses with export plans often take an IEC and Udyam registration alongside incorporation.",
      "GST registration in Gujarat uses state code 24.",
    ],
    faqs: [
      { q: "Which ROC handles companies registered in Ahmedabad?", a: "The Registrar of Companies, Ahmedabad (Gujarat). Incorporation is processed by the Central Registration Centre." },
      { q: "Is a company in GIFT City registered differently?", a: "The company is incorporated through the MCA in the usual way. Units operating in the IFSC then need separate approvals from the IFSC Authority (IFSCA) depending on the activity." },
    ],
    nearby: ["mumbai", "jaipur", "pune"],
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    roc: "ROC Jaipur",
    professionalTax: false,
    shopsAct: "Rajasthan Shops & Commercial Establishments Act, 1958",
    intro:
      "Jaipur's economy blends tourism, gems and jewellery, handicrafts and textiles with a fast-growing IT and start-up community.",
    ecosystem:
      "Founders here run export-oriented craft and jewellery businesses, travel and hospitality brands, and IT services firms — many selling online and needing GST registration in multiple states.",
    hubs: ["Malviya Nagar", "C-Scheme", "Vaishali Nagar", "Sitapura Industrial Area", "Mansarovar", "Johari Bazaar"],
    sectors: ["Gems & jewellery", "Handicrafts & textiles", "Tourism & hospitality", "IT services", "E-commerce"],
    localNotes: [
      "Rajasthan does not levy professional tax on salaried employees.",
      "Exporters of handicrafts and jewellery usually need an IEC and a GST LUT.",
      "GST registration in Rajasthan uses state code 08.",
    ],
    faqs: [
      { q: "Which ROC handles companies registered in Jaipur?", a: "The Registrar of Companies, Jaipur (Rajasthan). Incorporation is processed by the Central Registration Centre." },
      { q: "I sell handicrafts online from Jaipur. Do I need GST?", a: "Sellers on e-commerce marketplaces generally need GST registration from the first sale, regardless of turnover, with limited exceptions for some service providers. We'll confirm your case on a call." },
    ],
    nearby: ["delhi", "ahmedabad", "gurgaon"],
  },
  {
    slug: "noida",
    name: "Noida",
    state: "Uttar Pradesh",
    roc: "ROC Kanpur (Uttar Pradesh)",
    professionalTax: false,
    shopsAct: "Uttar Pradesh Dookan Aur Vanijya Adhishthan Adhiniyam, 1962",
    intro:
      "Noida and Greater Noida host a dense cluster of IT companies, electronics manufacturers, media houses and start-ups along the Noida–Greater Noida Expressway.",
    ecosystem:
      "Founders often choose Noida for lower office costs than Delhi with the same NCR talent pool — from SaaS and IT services to electronics manufacturing and media.",
    hubs: ["Sector 62", "Sector 63", "Sector 18", "Noida–Greater Noida Expressway", "Film City", "Greater Noida"],
    sectors: ["IT & SaaS", "Electronics manufacturing", "Media", "Real estate", "Ed-tech"],
    localNotes: [
      "Noida is in Uttar Pradesh, so companies registered here fall under ROC Kanpur — not ROC Delhi.",
      "Uttar Pradesh does not levy professional tax.",
      "GST registration in Uttar Pradesh uses state code 09.",
    ],
    faqs: [
      { q: "Is a company in Noida registered under ROC Delhi?", a: "No. Noida is in Uttar Pradesh, so companies with a registered office there fall under the Registrar of Companies, Kanpur. Incorporation is still processed centrally by the CRC." },
      { q: "Can I register my company in Noida and operate in Delhi?", a: "Yes. Your registered office decides the ROC and state. If you also have a place of business in Delhi, you may need a separate GST registration there." },
    ],
    nearby: ["delhi", "gurgaon"],
  },
  {
    slug: "gurgaon",
    name: "Gurgaon",
    state: "Haryana",
    roc: "ROC Delhi (NCT of Delhi & Haryana)",
    professionalTax: false,
    shopsAct: "Punjab Shops & Commercial Establishments Act, 1958 (as applicable in Haryana)",
    intro:
      "Gurugram is the NCR's corporate hub — home to multinational headquarters, consulting firms, unicorn start-ups and a large share of India's GCCs.",
    ecosystem:
      "Founders in Gurugram commonly set up private limited companies to work with enterprise clients and investors, and foreign companies often choose it for their Indian subsidiary.",
    hubs: ["Cyber City", "Golf Course Road", "Udyog Vihar", "Sohna Road", "MG Road", "Golf Course Extension Road"],
    sectors: ["Consulting & professional services", "SaaS & IT", "Fintech", "Real estate", "Automotive"],
    localNotes: [
      "Haryana companies fall under the Registrar of Companies, NCT of Delhi & Haryana.",
      "Haryana does not levy professional tax.",
      "GST registration in Haryana uses state code 06.",
    ],
    faqs: [
      { q: "Which ROC handles companies registered in Gurgaon?", a: "The Registrar of Companies, NCT of Delhi & Haryana. Incorporation is processed by the Central Registration Centre." },
      { q: "Can I use a co-working space in Gurgaon as my registered office?", a: "Yes. Most co-working operators provide a rent agreement, utility bill and NOC suitable for MCA and GST registration." },
    ],
    nearby: ["delhi", "noida", "jaipur"],
  },
];

export const cityHref = (c: Pick<City, "slug">) => `/company-registration-in/${c.slug}`;

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
