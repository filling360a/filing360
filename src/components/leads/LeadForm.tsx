"use client";

import { FormEvent, useId, useState } from "react";
import { leadInterestOptions, siteConfig } from "@/lib/siteConfig";

type Props = {
  id?: string;
  className?: string;
  compact?: boolean;
  variant?: "solid" | "glass";
};

export function LeadForm({
  id = "lead-form",
  className = "",
  compact,
  variant = "solid",
}: Props) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const uid = useId();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  }

  const shell =
    variant === "glass"
      ? "border-white/35 bg-white/20 shadow-[0_16px_40px_-18px_rgba(15,23,42,0.3)] backdrop-blur-md [&_.field-lux]:border-white/50 [&_.field-lux]:bg-white/45 [&_.field-lux]:backdrop-blur-sm"
      : "border-[#e2e8f0] bg-white shadow-[0_20px_50px_-18px_rgba(15,23,42,0.28)]";

  if (sent) {
    return (
      <div
        id={id}
        role="status"
        className={`rounded-2xl border px-6 py-10 text-center text-ink ${shell} ${className}`}
      >
        <p className="text-2xl font-bold tracking-tight text-ink">
          Request received
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          An expert will call within {siteConfig.socialProof.callbackMins}{" "}
          minutes.
        </p>
        <button
          type="button"
          className="mt-5 text-sm font-semibold text-accent hover:text-seal"
          onClick={() => setSent(false)}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={`rounded-2xl border p-5 text-ink md:p-6 ${shell} ${className}`}
    >
      <h2 className="text-xl font-bold tracking-tight text-ink md:text-[1.35rem]">
        Get a Free Quote
      </h2>
      <p className="mt-1.5 text-sm text-ink-muted">
        Tell us your requirement and our experts will get back to you shortly.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
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
              placeholder="Full Name"
              autoComplete="name"
              className="field-lux"
            />
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
              className="field-lux"
            />
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
            placeholder="E-mail Address"
            autoComplete="email"
            className="field-lux"
          />
        </div>

        <div>
          <label htmlFor={`${uid}-interest`} className="sr-only">
            Select service
          </label>
          <select
            id={`${uid}-interest`}
            name="interest"
            required
            defaultValue=""
            className="field-lux"
          >
            <option value="" disabled>
              Select Service
            </option>
            {leadInterestOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
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
              placeholder="City"
              autoComplete="address-level2"
              className="field-lux"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-seal px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-seal-deep disabled:opacity-70"
        >
          {submitting ? "Sending…" : "Get Free Quote"}
          <span aria-hidden>→</span>
        </button>
      </form>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
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
    </div>
  );
}
