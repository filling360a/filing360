import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[22px] w-[22px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const personDoc = (
  <Icon>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5" />
    <path d="M15 8h5l2 2v9H15V8Z" />
    <path d="M17 12h3M17 15h2" />
  </Icon>
);

const personCheck = (
  <Icon>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5" />
    <path d="m15 12 2.2 2.2L21 10.5" />
  </Icon>
);

const personCalendar = (
  <Icon>
    <circle cx="8.5" cy="8" r="3" />
    <path d="M3 19c.8-3.2 2.8-5 5.5-5s4.7 1.8 5.5 5" />
    <rect x="13" y="8" width="8" height="8" rx="1.2" />
    <path d="M15 8V6.5M19 8V6.5M13 11h8" />
  </Icon>
);

const people = (
  <Icon>
    <circle cx="9" cy="8" r="3" />
    <circle cx="16" cy="9" r="2.4" />
    <path d="M3.5 19c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5M14 14.2c2 .3 3.6 1.6 4.5 4.8" />
  </Icon>
);

const building = (
  <Icon>
    <path d="M4 20h16M6 20V8l6-4 6 4v12M10 12h4M10 16h4" />
  </Icon>
);

const docCheck = (
  <Icon>
    <path d="M8 3h7l4 4v14H8V3Z" />
    <path d="M15 3v4h4M10 12h6M10 16h4" />
    <path d="m9.5 11.5 1.6 1.6 3-3.2" />
  </Icon>
);

const file = (
  <Icon>
    <path d="M8 3h7l4 4v14H8V3Z" />
    <path d="M15 3v4h4M10 12h6M10 16h4" />
  </Icon>
);

const percent = (
  <Icon>
    <path d="M19 5 5 19" />
    <circle cx="7" cy="7" r="2.5" />
    <circle cx="17" cy="17" r="2.5" />
  </Icon>
);

const chart = (
  <Icon>
    <path d="M4 19V5M4 19h16" />
    <path d="M8 15v-4M12 15V8M16 15v-6" />
  </Icon>
);

const trend = (
  <Icon>
    <path d="M4 16 10 10l4 4 7-7" />
    <path d="M16 7h5v5" />
  </Icon>
);

const calculator = (
  <Icon>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M8 7h8M8 12h2M12 12h2M16 12h1M8 16h2M12 16h2M16 16h1" />
  </Icon>
);

const search = (
  <Icon>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </Icon>
);

const idCard = (
  <Icon>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="9" cy="12" r="2" />
    <path d="M13 10.5h5M13 13.5h4" />
  </Icon>
);

const alert = (
  <Icon>
    <path d="M12 4 3.8 19h16.4L12 4Z" />
    <path d="M12 10v4M12 16.5v.5" />
  </Icon>
);

const home = (
  <Icon>
    <path d="M4 11 12 4l8 7v9H4v-9Z" />
    <path d="M10 20v-6h4v6" />
  </Icon>
);

const swap = (
  <Icon>
    <path d="M7 8h12l-3-3M17 16H5l3 3" />
  </Icon>
);

const bank = (
  <Icon>
    <path d="M4 10h16M6 10v8M10 10v8M14 10v8M18 10v8M4 18h16M12 4 4 10h16L12 4Z" />
  </Icon>
);

const closeCircle = (
  <Icon>
    <circle cx="12" cy="12" r="8" />
    <path d="m9 9 6 6M15 9l-6 6" />
  </Icon>
);

const palette = (
  <Icon>
    <circle cx="12" cy="12" r="8" />
    <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="14" r="1" fill="currentColor" stroke="none" />
    <path d="M14.5 15.5c.8 0 1.5-.7 1.5-1.8 0-1.4-1.2-2.2-2.4-2.2" />
  </Icon>
);

const clipboard = (
  <Icon>
    <rect x="6" y="5" width="12" height="15" rx="2" />
    <path d="M9 5V4h6v1M9 11h6M9 15h4" />
  </Icon>
);

const layers = (
  <Icon>
    <path d="m4 8 8-4 8 4-8 4-8-4Z" />
    <path d="m4 12 8 4 8-4M4 16l8 4 8-4" />
  </Icon>
);

const rocket = (
  <Icon>
    <path d="M12 3c3 2.5 5 6.5 5 11l-5 3-5-3c0-4.5 2-8.5 5-11Z" />
    <circle cx="12" cy="10" r="1.6" />
    <path d="M8 17c0 2 .8 4 2 4M16 17c0 2-.8 4-2 4" />
  </Icon>
);

const store = (
  <Icon>
    <path d="M4 10h16v10H4V10Z" />
    <path d="M4 10 6 5h12l2 5M9 20v-5h6v5" />
  </Icon>
);

const globe = (
  <Icon>
    <circle cx="12" cy="12" r="8" />
    <path d="M4 12h16M12 4c2.5 2.8 3.8 6 3.8 8s-1.3 5.2-3.8 8c-2.5-2.8-3.8-6-3.8-8s1.3-5.2 3.8-8Z" />
  </Icon>
);

const stamp = (
  <Icon>
    <circle cx="12" cy="12" r="8" />
    <path d="M9 11.5 11 13.5 15.5 9" />
  </Icon>
);

const shield = (
  <Icon>
    <path d="M12 3 5 6v6c0 4.2 3 7.2 7 8.2 4-1 7-4 7-8.2V6l-7-3Z" />
  </Icon>
);

const BY_SLUG: Record<string, ReactNode> = {
  "tax-planning": personCalendar,
  "income-tax-e-filing": personDoc,
  "itr-filing-individual": personDoc,
  "itr-filing-sole-proprietorship": personCheck,
  "itr-filing-company": building,
  "itr-filing-trust-ngo": people,
  "itr-filing-partnership-firm": people,
  "tds-return-filing": calculator,
  "income-tax-notice": alert,
  "pan-tan-registration": idCard,
  "tax-audit": search,
  "gst-applicability-evaluation": search,
  "gst-registration": percent,
  "gst-nil-return-filing": file,
  "gst-return-filing-regular": docCheck,
  "gst-return-filing-composition": clipboard,
  "gst-return-filing-qrmp": chart,
  "gst-return-filing-freelancer": personDoc,
  "gst-return-filing-online-seller": store,
  "gst-annual-return-filing": docCheck,
  "gst-lut-filing": globe,
  "gstr-10-filing": closeCircle,
  "gst-revocation": stamp,
  "gst-amendment": swap,
  "gst-composition-scheme": clipboard,
  "gst-cancellation": closeCircle,
  "gst-notice-reply": alert,
  "gst-refund": trend,
  "virtual-office-gstin": home,
  "startup-india-dpiit": rocket,
  proprietorship: store,
  "partnership-firm": people,
  opc: personCheck,
  llp: people,
  "private-limited-company": building,
  "section-8-company": people,
  "trust-registration": shield,
  "public-limited-company": bank,
  "producer-company": store,
  "indian-subsidiary": globe,
  "msme-registration": stamp,
  "company-compliance": docCheck,
  "llp-compliance": docCheck,
  "opc-compliance": docCheck,
  "company-name-change": swap,
  "registered-office-change": home,
  "din-ekyc-filing": idCard,
  "din-reactivation": idCard,
  "director-change": people,
  "remove-director": closeCircle,
  "adt-1-filing": file,
  "dpt-3-filing": bank,
  "llp-form-11-filing": file,
  "dormant-status-filing": file,
  "moa-amendment": clipboard,
  "aoa-amendment": clipboard,
  "authorized-capital-increase": trend,
  "share-transfer": swap,
  "demat-of-shares": layers,
  "winding-up-llp": closeCircle,
  "winding-up-company": closeCircle,
  "commencement-inc-20a": rocket,
  "accounting-bookkeeping": clipboard,
  "cma-report": bank,
  "tev-report": layers,
  "pitch-deck-for-startup": rocket,
  "website-designing": globe,
  "logo-designing": palette,
  seo: trend,
  "performance-marketing": chart,
  ads: trend,
  "rcm-preparation": percent,
  "sop-designing": clipboard,
  "ind-as-conversion": layers,
  ifrs: globe,
  consolidation: layers,
  "mis-dashboard-for-startups": chart,
};

export function ServiceIcon({ slug, name }: { slug: string; name: string }) {
  const mapped = BY_SLUG[slug];
  if (mapped) return mapped;
  const hay = `${slug} ${name}`.toLowerCase();
  if (hay.includes("gst")) return percent;
  if (hay.includes("itr") || hay.includes("tax")) return personDoc;
  if (hay.includes("compan") || hay.includes("mca")) return building;
  return file;
}
