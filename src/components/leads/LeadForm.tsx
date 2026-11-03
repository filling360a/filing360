"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { getPillar, getService } from "@/content/services";
import { publicJsonHeaders } from "@/lib/api-headers";
import { trackEvent } from "@/lib/consent";
import { getAttribution } from "@/lib/leads/attribution-client";
import { leadInterestOptions, siteConfig } from "@/lib/siteConfig";

type Props = {
  id?: string;
  className?: string;
  compact?: boolean;
  variant?: "solid" | "glass";
  /** Form identifier stored on the lead, e.g. "hero" or "service-page". */
  source?: string;
  /** Preselects the service on service detail pages. */
  service?: { slug: string; name: string };
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  /** Overrides the service dropdown, e.g. for partner or referral forms. */
  interestOptions?: readonly string[];
  interestLabel?: string;
  /** "message" adds a free-text box; "booking" adds preferred date, time and mode. */
  extra?: "message" | "booking";
  messagePlaceholder?: string;
  /** Sends the visitor to /thank-you after a successful submission. */
  redirect?: boolean;
  /** Compact header pill, e.g. hero quote card. */
  badge?: string;
};

type FieldErrors = Partial<Record<"name" | "phone" | "email" | "interest" | "city" | "message", string>>;

const SLOTS = ["Morning (9 am – 12 pm)", "Afternoon (12 – 4 pm)", "Evening (4 – 7 pm)"];
const MODES = ["Phone call", "Google Meet / video", "WhatsApp call"];

/** Default interest shown on pillar landing pages (`/services/[pillar]`). */
const PILLAR_DEFAULT_INTEREST: Record<string, string> = {
  "income-tax": "Income Tax Return (ITR) Filing",
  gst: "GST Registration",
  startup: "Private Limited Company Registration",
  mca: "Annual MCA Compliance",
  accounting: "Accounting & Bookkeeping",
  funds: "CMA Report",
  "other-services": "Website Designing",
};

function todayIso() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/** Infer the service to preselect from the current URL when the parent doesn't pass one. */
function serviceFromPath(pathname: string | null): { slug: string; name: string } | undefined {
  if (!pathname) return undefined;
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "services" || !parts[1]) return undefined;

  const pillarSlug = parts[1];
  const serviceSlug = parts[2];

  if (serviceSlug) {
    const hit = getService(pillarSlug, serviceSlug);
    if (hit) {
      return { slug: `${hit.pillar.slug}/${hit.service.slug}`, name: hit.service.name };
    }
  }

  const pillar = getPillar(pillarSlug);
  if (!pillar) return undefined;
  const name = PILLAR_DEFAULT_INTEREST[pillar.slug];
  if (!name) return undefined;
  return { slug: pillar.slug, name };
}

export function LeadForm({
  id = "lead-form",
  className = "",
  compact,
  variant = "solid",
  source,
  service: serviceProp,
  title = "Get a Free Quote",
  subtitle,
  submitLabel = "Get Free Quote",
  interestOptions: interestOverride,
  interestLabel = "Select Service",
  extra,
  messagePlaceholder = "Anything we should know? (optional)",
  redirect = true,
  badge,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [reference, setReference] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const startedAt = useRef<number>(0);
  const uid = useId();

  const service = useMemo(
    () => serviceProp ?? (interestOverride ? undefined : serviceFromPath(pathname)),
    [serviceProp, interestOverride, pathname],
  );
  const selectedInterest = service?.name ?? "";
  const formKey = `${id}:${service?.slug ?? "general"}`;

  const interestOptions: readonly string[] =
    interestOverride ??
    (service ? [service.name, ...leadInterestOptions.filter((o) => o !== service.name)] : leadInterestOptions);

  function markStarted() {
    if (!startedAt.current) startedAt.current = Date.now();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    const formSource = source ?? id.replace(/-lead$/, "");
    let message = value("message");
    if (extra === "booking") {
      const parts = [
        value("slot_date") && `Preferred date: ${value("slot_date")}`,
        value("slot_time") && `Preferred time: ${value("slot_time")}`,
        value("slot_mode") && `Mode: ${value("slot_mode")}`,
      ].filter(Boolean);
      message = [parts.join(" · "), message].filter(Boolean).join("\n\n");
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: publicJsonHeaders,
        body: JSON.stringify({
          salutation: value("title") || undefined,
          name: value("name"),
          phone: value("mobile"),
          email: value("email"),
          interest: value("interest") || undefined,
          city: value("city") || undefined,
          service_slug: service?.slug,
          source: formSource,
          message: message || undefined,
          page_url: window.location.pathname,
          attribution: getAttribution(),
          company_website: value("company_website") || undefined,
          started_at: startedAt.current || undefined,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reference?: string;
        error?: string;
        fields?: Record<string, string[] | undefined>;
      };

      if (res.ok && body.ok) {
        const interest = value("interest");
        trackEvent(extra === "booking" ? "book_consultation" : "generate_lead", {
          form_source: formSource,
          service: interest || undefined,
        });
        form.reset();
        if (redirect) {
          const qs = new URLSearchParams({ ref: body.reference ?? "", type: extra === "booking" ? "booking" : "lead" });
          router.push(`/thank-you?${qs}`);
          return;
        }
        setReference(body.reference ?? "");
        return;
      }

      if (body.fields) {
        setFieldErrors({
          name: body.fields.name?.[0],
          phone: body.fields.phone?.[0],
          email: body.fields.email?.[0],
          interest: body.fields.interest?.[0],
          city: body.fields.city?.[0],
          message: body.fields.message?.[0],
        });
      }
      setError(body.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const shell =
    variant === "glass"
      ? "border-white/35 bg-white/20 shadow-[0_16px_40px_-18px_rgba(15,23,42,0.3)] backdrop-blur-md [&_.field-lux]:border-white/50 [&_.field-lux]:bg-white/45 [&_.field-lux]:backdrop-blur-sm"
      : "border-[#d7e4de] bg-white shadow-[0_20px_50px_-18px_rgba(15,23,42,0.28)]";

  const resolvedSubtitle =
    subtitle === undefined
      ? compact
        ? ""
        : "Tell us your requirement and our experts will get back to you shortly."
      : subtitle;

  if (reference !== null) {
    return (
      <div
        id={id}
        role="status"
        className={`rounded-2xl border text-center text-ink ${compact ? "px-4 py-6" : "px-6 py-10"} ${shell} ${className}`}
      >
        <p className="text-2xl font-bold tracking-tight text-ink">
          Request received
        </p>
        <p className="mt-2 text-[15px] text-ink-muted">
          An expert will call within {siteConfig.socialProof.callbackMins}{" "}
          minutes.
        </p>
        {reference && (
          <p className="mt-3 text-[13.5px] text-ink-muted">
            Your reference: <span className="font-semibold text-ink">{reference}</span>
          </p>
        )}
        <button
          type="button"
          className="mt-5 text-[15px] font-semibold text-accent hover:text-seal"
          onClick={() => setReference(null)}
        >
          Submit another request
        </button>
      </div>
    );
  }

  const errorText = (key: keyof FieldErrors) =>
    fieldErrors[key] ? (
      <p id={`${uid}-${key}-error`} className="mt-1 text-[13.5px] font-medium text-[#dc2626]">
        {fieldErrors[key]}
      </p>
    ) : null;

  return (
    <div
      id={id}
      className={`rounded-2xl border text-ink ${compact ? "flex flex-col px-4 py-4 md:px-5 md:py-5" : "p-5 md:p-6"} ${shell} ${className}`}
    >
      <div className={compact ? "flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3" : undefined}>
        <p className={`font-bold tracking-tight text-ink ${compact ? "flex items-center gap-2 text-[17px] leading-tight md:text-[18px]" : "text-xl md:text-[1.35rem]"}`}>
          {compact ? <SparkMark /> : null}
          {title}
        </p>
        {compact && badge ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#e8f6f1] px-2.5 py-1 text-[11.5px] font-semibold text-[#0e7b5b]">
            <BoltMark />
            {badge}
          </span>
        ) : null}
      </div>
      {resolvedSubtitle ? (
        <p className={`text-ink-muted ${compact ? "mt-1 text-[13px] leading-snug" : "mt-1.5 text-[15px]"}`}>
          {resolvedSubtitle}
        </p>
      ) : null}

      <form
        key={formKey}
        onSubmit={onSubmit}
        onFocus={markStarted}
        className={compact ? "mt-2.5 flex flex-col gap-2" : "mt-5 space-y-3"}
      >
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor={`${uid}-website`}>Company website</label>
          <input id={`${uid}-website`} name="company_website" tabIndex={-1} autoComplete="off" />
        </div>

        {compact ? (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
            <div>
              <label htmlFor={`${uid}-name`} className="sr-only">
                Full name
              </label>
              <span className="relative block">
                <FieldIcon>
                  <PersonIcon />
                </FieldIcon>
                <input
                  id={`${uid}-name`}
                  name="name"
                  required
                  minLength={2}
                  maxLength={120}
                  placeholder="Full name"
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? `${uid}-name-error` : undefined}
                  className="field-lux has-lead-icon"
                />
              </span>
              {errorText("name")}
            </div>
            <div>
              <label htmlFor={`${uid}-mobile`} className="sr-only">
                Mobile number
              </label>
              <input type="hidden" name="countryCode" value="+91" />
              <span className="relative block">
                <FieldIcon>
                  <PhoneIcon />
                </FieldIcon>
                <input
                  id={`${uid}-mobile`}
                  name="mobile"
                  type="tel"
                  required
                  inputMode="tel"
                  pattern="[0-9+\s-]{10,15}"
                  placeholder="Mobile number"
                  autoComplete="tel"
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? `${uid}-phone-error` : undefined}
                  className="field-lux has-lead-icon"
                />
              </span>
              {errorText("phone")}
            </div>
            <div>
              <label htmlFor={`${uid}-email`} className="sr-only">
                Email
              </label>
              <span className="relative block">
                <FieldIcon>
                  <MailIcon />
                </FieldIcon>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  placeholder="Email"
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? `${uid}-email-error` : undefined}
                  className="field-lux has-lead-icon"
                />
              </span>
              {errorText("email")}
            </div>
            <div>
              <label htmlFor={`${uid}-interest`} className="sr-only">
                {interestLabel}
              </label>
              <span className="relative block">
                <FieldIcon>
                  <DocIcon />
                </FieldIcon>
                <select
                  key={formKey}
                  id={`${uid}-interest`}
                  name="interest"
                  required
                  defaultValue={selectedInterest}
                  className="field-lux has-lead-icon"
                >
                  <option value="" disabled>
                    {interestLabel}
                  </option>
                  {interestOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </span>
              {errorText("interest")}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[4.75rem_1fr] gap-2">
              <div>
                <label htmlFor={`${uid}-title`} className="sr-only">
                  Title
                </label>
                <select
                  id={`${uid}-title`}
                  name="title"
                  defaultValue="Mr"
                  className="field-lux"
                >
                  <option>Mr</option>
                  <option>Ms</option>
                  <option>Mrs</option>
                  <option>Dr</option>
                </select>
              </div>
              <div>
                <label htmlFor={`${uid}-name`} className="sr-only">
                  Full name
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  required
                  minLength={2}
                  maxLength={120}
                  placeholder="Full Name"
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? `${uid}-name-error` : undefined}
                  className="field-lux"
                />
                {errorText("name")}
              </div>
            </div>

            <div className="grid grid-cols-[4.75rem_1fr] gap-2">
              <div>
                <label htmlFor={`${uid}-cc`} className="sr-only">
                  Country code
                </label>
                <select
                  id={`${uid}-cc`}
                  name="countryCode"
                  defaultValue="+91"
                  className="field-lux"
                >
                  <option>+91</option>
                </select>
              </div>
              <div>
                <label htmlFor={`${uid}-mobile`} className="sr-only">
                  Mobile number
                </label>
                <input
                  id={`${uid}-mobile`}
                  name="mobile"
                  type="tel"
                  required
                  inputMode="tel"
                  pattern="[0-9+\s-]{10,15}"
                  placeholder="Mobile Number"
                  autoComplete="tel"
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? `${uid}-phone-error` : undefined}
                  className="field-lux"
                />
                {errorText("phone")}
              </div>
            </div>

            <div>
              <label htmlFor={`${uid}-email`} className="sr-only">
                Email
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                required
                maxLength={254}
                placeholder="E-mail Address"
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? `${uid}-email-error` : undefined}
                className="field-lux"
              />
              {errorText("email")}
            </div>

            <div>
              <label htmlFor={`${uid}-interest`} className="sr-only">
                {interestLabel}
              </label>
              <select
                key={formKey}
                id={`${uid}-interest`}
                name="interest"
                required
                defaultValue={selectedInterest}
                className="field-lux"
              >
                <option value="" disabled>
                  {interestLabel}
                </option>
                {interestOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errorText("interest")}
            </div>

            <div>
              <label htmlFor={`${uid}-city`} className="sr-only">
                City
              </label>
              <input
                id={`${uid}-city`}
                name="city"
                required
                maxLength={80}
                placeholder="City"
                autoComplete="address-level2"
                className="field-lux"
              />
              {errorText("city")}
            </div>
          </>
        )}

        {extra === "booking" && (
          <fieldset className="space-y-2">
            <legend className="mb-1 text-[13.5px] font-semibold text-ink">Preferred slot</legend>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor={`${uid}-date`} className="sr-only">Preferred date</label>
                <input id={`${uid}-date`} name="slot_date" type="date" required min={todayIso()} className="field-lux" />
              </div>
              <div>
                <label htmlFor={`${uid}-time`} className="sr-only">Preferred time</label>
                <select id={`${uid}-time`} name="slot_time" required defaultValue="" className="field-lux">
                  <option value="" disabled>Time</option>
                  {SLOTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor={`${uid}-mode`} className="sr-only">Consultation mode</label>
              <select id={`${uid}-mode`} name="slot_mode" defaultValue={MODES[0]} className="field-lux">
                {MODES.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </fieldset>
        )}

        {extra && (
          <div>
            <label htmlFor={`${uid}-message`} className="sr-only">Message</label>
            <textarea
              id={`${uid}-message`}
              name="message"
              rows={3}
              maxLength={1500}
              placeholder={messagePlaceholder}
              className="field-lux min-h-[88px] resize-y py-2.5"
            />
            {errorText("message")}
          </div>
        )}

        {error && (
          <p role="alert" className="rounded-lg bg-[#fef2f2] px-3 py-2 text-[13.5px] font-medium text-[#b91c1c]">
            {error}{" "}
            <a href={`tel:${siteConfig.contact.phoneTel}`} className="underline">
              Call {siteConfig.contact.phone}
            </a>
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`flex w-full items-center justify-center gap-2 rounded-xl bg-seal px-4 font-semibold text-white transition hover:bg-seal-deep disabled:opacity-70 ${compact ? "min-h-12 py-3 text-[15px]" : "mt-1 py-3.5 text-[15px]"}`}
        >
          {submitting ? "Sending…" : submitLabel}
          <svg viewBox="0 0 24 24" className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <path d="M5 12h12M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>

      <div className={compact ? "mt-2.5" : undefined}>
      <p className={`flex items-center justify-center gap-1.5 text-ink-muted ${compact ? "text-[12px]" : "mt-3 text-[13.5px]"}`}>
        <svg
          viewBox="0 0 24 24"
          className={compact ? "h-3 w-3 text-trust" : "h-3.5 w-3.5 text-trust"}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        100% Secure &amp; No Spam
      </p>
      {compact ? (
        <p className="mt-1 text-center text-[11.5px] leading-snug text-ink-muted">
          You agree to our{" "}
          <Link href="/terms" className="underline hover:text-ink">Terms</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-ink">Privacy Policy</Link>.
        </p>
      ) : (
        <p className="mt-1.5 text-center text-[13px] leading-snug text-ink-muted">
          By submitting, you agree to be contacted by {siteConfig.brandName} by call, SMS, WhatsApp or email
          about your request, and to our{" "}
          <Link href="/terms" className="underline hover:text-ink">Terms</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-ink">Privacy Policy</Link>.
        </p>
      )}
      </div>
    </div>
  );
}

function FieldIcon({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-3.5 top-1/2 z-[1] -translate-y-1/2 text-[#5b6e7a]" aria-hidden>
      {children}
    </span>
  );
}

function SparkMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0e7b5b]" fill="currentColor" aria-hidden>
      <path d="M12 2.5 13.6 9l6.4.2-5.1 4 1.8 6.3L12 16.2 7.3 19.5 9.1 13.2 4 9.2 10.4 9 12 2.5Z" />
    </svg>
  );
}

function BoltMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 10-14h-7l1-6Z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19c1.2-3.2 3.6-5 6.5-5s5.3 1.8 6.5 5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path
        d="M7.2 3.8h2.4l1.2 3-1.6 1.2a12 12 0 0 0 5.6 5.6l1.2-1.6 3 1.2v2.4c0 .7-.6 1.4-1.3 1.5-7 .9-13.5-5.6-12.6-12.6.1-.7.8-1.3 1.5-1.3Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7.5 7.5 6 7.5-6" strokeLinejoin="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M7 3.5h7l4.5 4.5V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.5V9h5.5M8.5 13h7M8.5 16.5h5" strokeLinecap="round" />
    </svg>
  );
}
