export type CalendarTag = "GST" | "TDS / TCS" | "Income tax" | "ROC / MCA" | "Payroll";

export type CalendarEvent = { date: string; title: string; who: string; tag: CalendarTag; href?: string };

export const calendarYear = { label: "FY 2026-27", start: "2026-04-01", end: "2027-03-31", reviewed: "2026-10-15" };

/** Deadlines that repeat every month. */
export const monthlyDeadlines: { day: string; title: string; who: string; tag: CalendarTag }[] = [
  { day: "7th", title: "Deposit TDS / TCS deducted in the previous month (March: by 30 April)", who: "All deductors", tag: "TDS / TCS" },
  { day: "10th", title: "GSTR-7 (TDS under GST) and GSTR-8 (TCS by e-commerce operators)", who: "Notified deductors, e-commerce operators", tag: "GST" },
  { day: "11th", title: "GSTR-1 — outward supplies (monthly filers)", who: "Regular taxpayers not in QRMP", tag: "GST" },
  { day: "13th", title: "IFF (optional) for QRMP filers; GSTR-6 for input service distributors", who: "QRMP taxpayers, ISDs", tag: "GST" },
  { day: "15th", title: "PF and ESI contributions for the previous month", who: "Employers registered with EPFO / ESIC", tag: "Payroll" },
  { day: "20th", title: "GSTR-3B — summary return and tax payment (monthly filers)", who: "Regular taxpayers not in QRMP", tag: "GST" },
  { day: "25th", title: "PMT-06 — GST payment for the first two months of a quarter", who: "QRMP taxpayers", tag: "GST" },
];

export const calendarEvents: CalendarEvent[] = [
  { date: "2026-04-18", title: "CMP-08 for January–March 2026", who: "Composition taxpayers", tag: "GST", href: "/services/gst/gst-return-filing-composition" },
  { date: "2026-04-30", title: "Deposit TDS / TCS for March 2026", who: "All deductors", tag: "TDS / TCS" },
  { date: "2026-04-30", title: "GSTR-4 annual return for FY 2025-26", who: "Composition taxpayers", tag: "GST", href: "/services/gst/gst-return-filing-composition" },
  { date: "2026-04-30", title: "MSME-1 for October 2025 – March 2026", who: "Companies with dues to MSMEs over 45 days", tag: "ROC / MCA" },
  { date: "2026-05-15", title: "TCS return (27EQ) for January–March 2026", who: "Collectors of TCS", tag: "TDS / TCS" },
  { date: "2026-05-30", title: "LLP Form 11 — annual return", who: "All LLPs", tag: "ROC / MCA", href: "/services/mca/llp-compliance" },
  { date: "2026-05-31", title: "TDS returns (24Q, 26Q) for January–March 2026", who: "All deductors", tag: "TDS / TCS", href: "/services/income-tax/tds-return-filing" },
  { date: "2026-05-31", title: "Statement of Financial Transactions (SFT)", who: "Specified reporting entities", tag: "Income tax" },
  { date: "2026-06-15", title: "Advance tax — 1st instalment (15%)", who: "Taxpayers with liability above ₹10,000", tag: "Income tax" },
  { date: "2026-06-15", title: "Issue Form 16 to employees and Form 16A for Q4", who: "Employers and deductors", tag: "TDS / TCS" },
  { date: "2026-06-30", title: "DPT-3 — return of deposits", who: "Companies (other than government companies)", tag: "ROC / MCA", href: "/services/mca/dpt-3-filing" },
  { date: "2026-07-15", title: "TCS return (27EQ) for April–June 2026", who: "Collectors of TCS", tag: "TDS / TCS" },
  { date: "2026-07-18", title: "CMP-08 for April–June 2026", who: "Composition taxpayers", tag: "GST" },
  { date: "2026-07-31", title: "Income tax return for FY 2025-26 (non-audit cases)", who: "Individuals, HUFs, firms not requiring audit", tag: "Income tax", href: "/services/income-tax/itr-filing-individual" },
  { date: "2026-07-31", title: "TDS returns (24Q, 26Q) for April–June 2026", who: "All deductors", tag: "TDS / TCS" },
  { date: "2026-08-15", title: "Form 16A for April–June 2026", who: "Deductors", tag: "TDS / TCS" },
  { date: "2026-09-15", title: "Advance tax — 2nd instalment (45%)", who: "Taxpayers with liability above ₹10,000", tag: "Income tax" },
  { date: "2026-09-30", title: "Tax audit report for FY 2025-26", who: "Businesses and professionals above audit limits", tag: "Income tax", href: "/services/income-tax/tax-audit" },
  { date: "2026-09-30", title: "Annual general meeting (last date)", who: "Companies (other than OPCs)", tag: "ROC / MCA" },
  { date: "2026-09-30", title: "DIR-3 KYC (where due)", who: "Directors and designated partners holding a DIN", tag: "ROC / MCA", href: "/services/mca/din-ekyc-filing" },
  { date: "2026-10-14", title: "ADT-1 — auditor appointment (within 15 days of AGM)", who: "Companies", tag: "ROC / MCA", href: "/services/mca/adt-1-filing" },
  { date: "2026-10-15", title: "TCS return (27EQ) for July–September 2026", who: "Collectors of TCS", tag: "TDS / TCS" },
  { date: "2026-10-18", title: "CMP-08 for July–September 2026", who: "Composition taxpayers", tag: "GST" },
  { date: "2026-10-30", title: "AOC-4 — financial statements (within 30 days of AGM)", who: "Companies", tag: "ROC / MCA", href: "/services/mca/company-compliance" },
  { date: "2026-10-30", title: "LLP Form 8 — statement of accounts & solvency", who: "All LLPs", tag: "ROC / MCA", href: "/services/mca/llp-compliance" },
  { date: "2026-10-31", title: "Income tax return for FY 2025-26 (audit cases)", who: "Companies and taxpayers requiring audit", tag: "Income tax", href: "/services/income-tax/itr-filing-company" },
  { date: "2026-10-31", title: "TDS returns (24Q, 26Q) for July–September 2026", who: "All deductors", tag: "TDS / TCS" },
  { date: "2026-10-31", title: "MSME-1 for April–September 2026", who: "Companies with dues to MSMEs over 45 days", tag: "ROC / MCA" },
  { date: "2026-11-15", title: "Form 16A for July–September 2026", who: "Deductors", tag: "TDS / TCS" },
  { date: "2026-11-29", title: "MGT-7 / MGT-7A — annual return (within 60 days of AGM)", who: "Companies", tag: "ROC / MCA", href: "/services/mca/company-compliance" },
  { date: "2026-11-30", title: "Income tax return (transfer pricing cases)", who: "Taxpayers with international or specified domestic transactions", tag: "Income tax" },
  { date: "2026-12-15", title: "Advance tax — 3rd instalment (75%)", who: "Taxpayers with liability above ₹10,000", tag: "Income tax" },
  { date: "2026-12-31", title: "GSTR-9 / GSTR-9C annual return for FY 2025-26", who: "Regular taxpayers above the notified turnover", tag: "GST", href: "/services/gst/gst-annual-return-filing" },
  { date: "2026-12-31", title: "Belated or revised income tax return for FY 2025-26", who: "Taxpayers who missed the deadline or need to correct a return", tag: "Income tax" },
  { date: "2027-01-15", title: "TCS return (27EQ) for October–December 2026", who: "Collectors of TCS", tag: "TDS / TCS" },
  { date: "2027-01-18", title: "CMP-08 for October–December 2026", who: "Composition taxpayers", tag: "GST" },
  { date: "2027-01-31", title: "TDS returns (24Q, 26Q) for October–December 2026", who: "All deductors", tag: "TDS / TCS" },
  { date: "2027-02-15", title: "Form 16A for October–December 2026", who: "Deductors", tag: "TDS / TCS" },
  { date: "2027-03-15", title: "Advance tax — 4th instalment (100%); presumptive taxpayers pay in full", who: "Taxpayers with liability above ₹10,000", tag: "Income tax" },
  { date: "2027-03-31", title: "Opt into GST composition for FY 2027-28 (CMP-02) and file GST LUT for exports", who: "Eligible taxpayers, exporters", tag: "GST", href: "/services/gst/gst-lut-filing" },
  { date: "2027-03-31", title: "Last date for tax-saving investments for FY 2026-27 (old regime)", who: "Individuals opting for the old regime", tag: "Income tax", href: "/guides/old-vs-new-tax-regime" },
];

export const QRMP_NOTE =
  "QRMP taxpayers file GSTR-1 by the 13th and GSTR-3B by the 22nd or 24th (depending on the state) of the month after each quarter.";
