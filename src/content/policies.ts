export const policies = [
  { path: "/terms", title: "Terms of Use", summary: "The agreement that governs your use of the website and our services." },
  { path: "/privacy", title: "Privacy Policy", summary: "What personal data we collect, why, how long we keep it and your rights under the DPDP Act." },
  { path: "/refund-policy", title: "Refund & Cancellation Policy", summary: "When advances are refundable, what happens if an application is rejected, and timelines." },
  { path: "/service-delivery-policy", title: "Service Delivery Policy", summary: "How and when work is delivered, typical timelines and what happens with government delays." },
  { path: "/payment-terms", title: "Payment Terms & Pricing Policy", summary: "Payment methods, GST invoices, and how professional and government fees are charged." },
  { path: "/disclaimer", title: "Disclaimer", summary: "We are a private facilitation platform — not a government website or law firm." },
  { path: "/cookie-policy", title: "Cookie Policy", summary: "The cookies we use, why, and how to change your choice." },
  { path: "/grievance-redressal", title: "Grievance Redressal", summary: "How to raise a complaint and reach our Grievance Officer, with response times." },
] as const;

export type PolicyPath = (typeof policies)[number]["path"];

export function policyByPath(path: PolicyPath) {
  return policies.find((p) => p.path === path)!;
}
