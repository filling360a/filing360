"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useId, useRef, useState } from "react";
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
};

type FieldErrors = Partial<Record<"name" | "phone" | "email" | "interest" | "city" | "message", string>>;

const SLOTS = ["Morning (9 am – 12 pm)", "Afternoon (12 – 4 pm)", "Evening (4 – 7 pm)"];
const MODES = ["Phone call", "Google Meet / video", "WhatsApp call"];

function todayIso() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function LeadForm({
  id = "lead-form",
  className = "",
  compact,
  variant = "solid",
  source,
  service,
  title = "Get a Free Quote",
  subtitle = "Tell us your requirement and our experts will get back to you shortly.",
  submitLabel = "Get Free Quote",
  interestOptions: interestOverride,
  interestLabel = "Select Service",
  extra,
  messagePlaceholder = "Anything we should know? (optional)",
  redirect = true,
}: Props) {
  const router = useRouter();
  const [reference, setReference] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const startedAt = useRef<number>(0);
  const uid = useId();

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
        headers: { "Content-Type": "application/json" },
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
      : "border-[#e2e8f0] bg-white shadow-[0_20px_50px_-18px_rgba(15,23,42,0.28)]";

  if (reference !== null) {
    return (
      <div
        id={id}
        role="status"
        className={`rounded-2xl border px-6 py-10 text-center text-ink ${shell} ${className}`}
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
      className={`rounded-2xl border p-5 text-ink md:p-6 ${shell} ${className}`}
    >
      <h2 className="text-xl font-bold tracking-tight text-ink md:text-[1.35rem]">
        {title}
      </h2>
      <p className="mt-1.5 text-[15px] text-ink-muted">
        {subtitle}
      </p>

      <form onSubmit={onSubmit} onFocus={markStarted} className="mt-5 space-y-3">
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor={`${uid}-website`}>Company website</label>
          <input id={`${uid}-website`} name="company_website" tabIndex={-1} autoComplete="off" />
        </div>

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
            id={`${uid}-interest`}
            name="interest"
            required
            defaultValue={service?.name ?? ""}
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

        {!compact && (
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
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="underline">
              Call {siteConfig.contact.phone}
            </a>
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-seal px-4 py-3.5 text-[15px] font-semibold text-white transition hover:bg-seal-deep disabled:opacity-70"
        >
          {submitting ? "Sending…" : submitLabel}
          <span aria-hidden>→</span>
        </button>
      </form>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-[13.5px] text-ink-muted">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 text-trust"
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
      <p className="mt-1.5 text-center text-[13px] leading-snug text-ink-muted">
        By submitting, you agree to be contacted by {siteConfig.brandName} by call, SMS, WhatsApp or email
        about your request, and to our{" "}
        <Link href="/terms" className="underline hover:text-ink">Terms</Link> and{" "}
        <Link href="/privacy" className="underline hover:text-ink">Privacy Policy</Link>.
      </p>
    </div>
  );
}
