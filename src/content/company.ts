/**
 * Legal and business facts used across the site (legal pages, footer, contact,
 * structured data). Fill in every empty string before launch — empty values are
 * hidden on the site rather than shown as placeholders.
 */
export const company = {
  brand: "Filing360",
  /** Registered legal entity, e.g. "Filing360 Private Limited". */
  legalName: "",
  /** e.g. "Private Limited Company incorporated under the Companies Act, 2013" */
  entityDescription: "",
  cin: "",
  gstin: "",
  /** Courts of this city have exclusive jurisdiction in the Terms of Use. */
  jurisdictionCity: "New Delhi",
  foundingYear: "",

  address: {
    street: "",
    locality: "",
    city: "New Delhi",
    state: "Delhi",
    postalCode: "",
    country: "IN",
  },
  /** Google Maps "Share → Copy link" URL of the office. */
  mapsUrl: "",
  /** Optional coordinates for LocalBusiness schema. */
  geo: null as { lat: number; lng: number } | null,

  contact: {
    /** Primary call number (shown on site, tel: links, SEO). */
    phone: "+91 73032 57128",
    phoneDisplay: "+91 73032 57128",
    /** Digits-only for tel: hrefs. */
    phoneTel: "+917303257128",
    /** WhatsApp Business number — digits only for wa.me (country code + number). */
    whatsapp: "919205707889",
    whatsappDisplay: "+91 92057 07889",
    email: "support@filingedge360.com",
    supportEmail: "support@filingedge360.com",
    billingEmail: "accounts@filingedge360.com",
    privacyEmail: "privacy@filingedge360.com",
    careersEmail: "careers@filingedge360.com",
    partnersEmail: "partners@filingedge360.com",
  },
  hours: {
    label: "Monday to Saturday, 9:00 am – 7:00 pm IST",
    schema: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "19:00" }],
  },

  /** Required under the IT Rules 2021 and the DPDP Act 2023. */
  grievanceOfficer: {
    name: "",
    designation: "Grievance Officer",
    email: "grievance@filingedge360.com",
    phone: "",
    acknowledgeWithinHours: 24,
    resolveWithinDays: 15,
  },

  /** Public profiles — only filled ones are shown and added to schema `sameAs`. */
  socials: {
    linkedin: "",
    instagram: "",
    x: "",
    youtube: "",
    facebook: "",
  },
  googleBusinessProfileUrl: "",
  /** Google "write a review" link from Business Profile → Ask for reviews. */
  googleReviewUrl: "",
  /** Cal.com / Calendly booking link; the consultation page embeds it when set. */
  bookingUrl: "",

  policiesUpdated: "2026-10-15",
} as const;

export const hasValue = (v: string | null | undefined): v is string => Boolean(v && v.trim());

export function legalEntity(): string {
  return hasValue(company.legalName) ? company.legalName : company.brand;
}

export function fullAddress(): string {
  const a = company.address;
  return [a.street, a.locality, a.city, a.state, a.postalCode].filter(hasValue).join(", ");
}

export function socialLinks(): { key: keyof typeof company.socials; label: string; url: string }[] {
  const labels: Record<keyof typeof company.socials, string> = {
    linkedin: "LinkedIn",
    instagram: "Instagram",
    x: "X (Twitter)",
    youtube: "YouTube",
    facebook: "Facebook",
  };
  return (Object.keys(labels) as (keyof typeof company.socials)[])
    .filter((k) => hasValue(company.socials[k]))
    .map((k) => ({ key: k, label: labels[k], url: company.socials[k] }));
}

export function whatsappLink(text = "Hi Filing360, I need help with "): string {
  return `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function formatPolicyDate(iso: string = company.policiesUpdated): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T00:00:00+05:30`));
}

/**
 * Commercial rules referenced by the refund, payment and delivery policies.
 * Change them here and every policy page stays consistent.
 */
export const commercialRules = {
  advancePercent: 50,
  /** Full refund window after payment if no work has started. */
  coolingOffHours: 24,
  /** Share of the professional fee kept once drafting/document work has begun but nothing is filed. */
  workStartedRetentionPercent: 25,
  refundProcessingDays: 7,
  refundCreditDays: "5–10",
  gatewayChargesNonRefundable: true,
  freeResubmissions: 1,
  freeNameProposals: 2,
  /** Days a client has to send pending documents before the engagement can be closed. */
  documentWaitDays: 60,
  paymentMethods: ["UPI", "Debit and credit cards", "Net banking", "Wallets", "Bank transfer (NEFT / RTGS / IMPS) against an invoice"],
  invoiceWithinDays: 2,
};

/**
 * Refer & Earn amounts. Leave blank until finance approves them — the page
 * then speaks of "a thank-you reward" without quoting a number.
 */
export const referralProgram = {
  /** e.g. "₹500" or "10% of the professional fee" */
  referrerReward: "",
  /** e.g. "₹250 off" */
  friendDiscount: "",
  /** Days after the referred client's full payment before the reward is paid. */
  payoutAfterDays: 30,
  validityDays: 90,
};
