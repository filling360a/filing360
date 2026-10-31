"use client";

import Link from "next/link";
import { type ChangeEvent, type FormEvent, useId, useRef, useState } from "react";
import { publicJsonHeaders } from "@/lib/api-headers";
import {
  RESUME_ACCEPT,
  RESUME_MAX_BYTES,
  RESUME_TYPES,
  type ScreeningQuestion,
} from "@/lib/careers/constants";
import { getAttribution } from "@/lib/leads/attribution-client";

type Props = { jobId: string; jobTitle: string; questions: ScreeningQuestion[] };

type Upload =
  | { state: "idle" }
  | { state: "uploading"; name: string; progress: number }
  | { state: "done"; name: string; size: number; path: string }
  | { state: "error"; message: string };

type Fields = Record<string, string | undefined>;

const field = "field-lux";
const label = "mb-1.5 block text-[14.5px] font-semibold text-[#0f2a45]";

function extensionType(file: File): string {
  if (file.type && RESUME_TYPES[file.type]) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase();
  return Object.entries(RESUME_TYPES).find(([, t]) => t.ext === ext)?.[0] ?? file.type;
}

function putFile(url: string, file: File, type: string, onProgress: (pct: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("content-type", type);
    xhr.setRequestHeader("x-upsert", "false");
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Upload failed (${xhr.status})`)));
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(file);
  });
}

export function ApplyForm({ jobId, jobTitle, questions }: Props) {
  const uid = useId();
  const startedAt = useRef(0);
  const fileInput = useRef<HTMLInputElement>(null);
  const [upload, setUpload] = useState<Upload>({ state: "idle" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Fields>({});
  const [reference, setReference] = useState<string | null>(null);

  const markStarted = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) void handleFile(file);
  }

  async function handleFile(file: File) {
    markStarted();
    setFields((f) => ({ ...f, resume: undefined }));

    const type = extensionType(file);
    if (!RESUME_TYPES[type]) return setUpload({ state: "error", message: "Upload a PDF or Word document (.pdf, .doc, .docx)." });
    if (file.size > RESUME_MAX_BYTES) return setUpload({ state: "error", message: "Résumé must be 5 MB or smaller." });
    if (file.size === 0) return setUpload({ state: "error", message: "That file is empty." });

    setUpload({ state: "uploading", name: file.name, progress: 0 });
    try {
      const res = await fetch("/api/careers/upload-url", {
        method: "POST",
        headers: publicJsonHeaders,
        body: JSON.stringify({ jobId, fileName: file.name, fileSize: file.size, fileType: type }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; path?: string; uploadUrl?: string; error?: string };
      if (!res.ok || !body.path || !body.uploadUrl) throw new Error(body.error ?? "Could not start the upload.");
      await putFile(body.uploadUrl, file, type, (progress) => setUpload({ state: "uploading", name: file.name, progress }));
      setUpload({ state: "done", name: file.name, size: file.size, path: body.path });
    } catch (err) {
      setUpload({ state: "error", message: err instanceof Error ? err.message : "Upload failed. Please try again." });
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (upload.state === "uploading") return setError("Please wait for your résumé to finish uploading.");
    if (upload.state !== "done") {
      setFields((f) => ({ ...f, resume: "Please attach your résumé" }));
      return setError("Please attach your résumé.");
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const answers = Object.fromEntries(questions.map((q) => [q.id, value(`q_${q.id}`)]));
    const attribution = getAttribution();

    setSubmitting(true);
    setError(null);
    setFields({});
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: publicJsonHeaders,
        body: JSON.stringify({
          jobId,
          full_name: value("full_name"),
          email: value("email"),
          phone: value("phone"),
          current_city: value("current_city"),
          linkedin_url: value("linkedin_url"),
          portfolio_url: value("portfolio_url"),
          total_experience: value("total_experience"),
          current_ctc: value("current_ctc"),
          expected_ctc: value("expected_ctc"),
          notice_period_days: value("notice_period_days"),
          cover_letter: value("cover_letter"),
          answers,
          resume: { path: upload.path, name: upload.name },
          consent: data.get("consent") === "on",
          attribution: attribution && {
            utm_source: attribution.utm_source,
            utm_medium: attribution.utm_medium,
            utm_campaign: attribution.utm_campaign,
            referrer: attribution.referrer,
          },
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
        setReference(body.reference ?? "");
        window.scrollTo({ top: (document.getElementById("apply")?.offsetTop ?? 0) - 90, behavior: "smooth" });
        return;
      }
      if (body.fields) {
        setFields(Object.fromEntries(Object.entries(body.fields).map(([k, v]) => [k, v?.[0]])));
        if (body.fields.resume) setUpload({ state: "idle" });
      }
      setError(body.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (reference !== null) {
    return (
      <div role="status" className="rounded-2xl border border-[#c5e8dc] bg-[#e8f6f1] px-6 py-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0e7b5b] text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-4 text-[22px] font-bold tracking-tight text-[#0f3f32]">Application submitted</p>
        <p className="mx-auto mt-2 max-w-md text-[15.5px] leading-relaxed text-[#145a45]">
          Thanks for applying for <strong>{jobTitle}</strong>. We&apos;ve emailed you a confirmation — our hiring team will be in
          touch if your profile is a match.
        </p>
        {reference && (
          <p className="mt-3 text-[14.5px] text-[#145a45]">
            Your reference: <span className="font-bold">{reference}</span>
          </p>
        )}
        <Link href="/careers" className="mt-6 inline-flex h-11 items-center rounded-xl bg-white px-5 text-[15px] font-semibold text-[#0b6550] ring-1 ring-[#c5e8dc] hover:bg-[#e3f2ed]">
          See other open roles
        </Link>
      </div>
    );
  }

  const err = (key: string) =>
    fields[key] ? (
      <p id={`${uid}-${key}-err`} className="mt-1 text-[13.5px] font-medium text-[#dc2626]">
        {fields[key]}
      </p>
    ) : null;
  const a11y = (key: string) => ({
    "aria-invalid": Boolean(fields[key]) || undefined,
    "aria-describedby": fields[key] ? `${uid}-${key}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} onFocus={markStarted} className="space-y-7">
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={`${uid}-website`}>Company website</label>
        <input id={`${uid}-website`} name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-[17px] font-bold text-[#0f2a45]">Your details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-name`} className={label}>Full name *</label>
            <input id={`${uid}-name`} name="full_name" required minLength={2} maxLength={120} autoComplete="name" className={field} {...a11y("full_name")} />
            {err("full_name")}
          </div>
          <div>
            <label htmlFor={`${uid}-email`} className={label}>Email *</label>
            <input id={`${uid}-email`} name="email" type="email" required maxLength={254} autoComplete="email" className={field} {...a11y("email")} />
            {err("email")}
          </div>
          <div>
            <label htmlFor={`${uid}-phone`} className={label}>Mobile number *</label>
            <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" required pattern="[0-9+\s-]{10,15}" autoComplete="tel" placeholder="10-digit mobile" className={field} {...a11y("phone")} />
            {err("phone")}
          </div>
          <div>
            <label htmlFor={`${uid}-city`} className={label}>Current city</label>
            <input id={`${uid}-city`} name="current_city" maxLength={80} autoComplete="address-level2" className={field} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-[17px] font-bold text-[#0f2a45]">Experience</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-exp`} className={label}>Total experience (years)</label>
            <input id={`${uid}-exp`} name="total_experience" type="number" min={0} max={50} step={0.5} inputMode="decimal" className={field} {...a11y("total_experience")} />
            {err("total_experience")}
          </div>
          <div>
            <label htmlFor={`${uid}-notice`} className={label}>Notice period</label>
            <select id={`${uid}-notice`} name="notice_period_days" defaultValue="" className={field}>
              <option value="">Select</option>
              <option value="0">Immediate joiner</option>
              <option value="15">15 days</option>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
            </select>
          </div>
          <div>
            <label htmlFor={`${uid}-cctc`} className={label}>Current CTC (₹ lakhs / year)</label>
            <input id={`${uid}-cctc`} name="current_ctc" type="number" min={0} max={500} step={0.1} inputMode="decimal" placeholder="e.g. 4.5" className={field} {...a11y("current_ctc")} />
            {err("current_ctc")}
          </div>
          <div>
            <label htmlFor={`${uid}-ectc`} className={label}>Expected CTC (₹ lakhs / year)</label>
            <input id={`${uid}-ectc`} name="expected_ctc" type="number" min={0} max={500} step={0.1} inputMode="decimal" placeholder="e.g. 6" className={field} {...a11y("expected_ctc")} />
            {err("expected_ctc")}
          </div>
          <div>
            <label htmlFor={`${uid}-li`} className={label}>LinkedIn profile</label>
            <input id={`${uid}-li`} name="linkedin_url" type="url" inputMode="url" maxLength={300} placeholder="linkedin.com/in/…" className={field} {...a11y("linkedin_url")} />
            {err("linkedin_url")}
          </div>
          <div>
            <label htmlFor={`${uid}-pf`} className={label}>Portfolio / website</label>
            <input id={`${uid}-pf`} name="portfolio_url" type="url" inputMode="url" maxLength={300} className={field} {...a11y("portfolio_url")} />
            {err("portfolio_url")}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-[17px] font-bold text-[#0f2a45]">Résumé *</legend>
        <input ref={fileInput} type="file" accept={RESUME_ACCEPT} onChange={onFile} className="sr-only" id={`${uid}-resume`} aria-describedby={`${uid}-resume-help`} />
        <div
          className={`rounded-2xl border-2 border-dashed p-5 transition ${
            fields.resume || upload.state === "error" ? "border-[#fca5a5] bg-[#fef2f2]" : upload.state === "done" ? "border-[#8ecfbc] bg-[#e8f6f1]" : "border-[#bfd4cb] bg-[#f3f7fa]"
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file && upload.state !== "uploading") void handleFile(file);
          }}
        >
          {upload.state === "uploading" ? (
            <div>
              <p className="truncate text-[15px] font-semibold text-[#0f2a45]">Uploading {upload.name}…</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#d7e4de]" role="progressbar" aria-valuenow={upload.progress} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-[#0e7b5b] transition-[width]" style={{ width: `${upload.progress}%` }} />
              </div>
            </div>
          ) : upload.state === "done" ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-[#0f3f32]">✓ {upload.name}</p>
                <p className="text-[13.5px] text-[#145a45]">{(upload.size / 1024 / 1024).toFixed(2)} MB · uploaded securely</p>
              </div>
              <button type="button" onClick={() => fileInput.current?.click()} className="text-[14.5px] font-semibold text-[#0b6550] hover:underline">
                Replace
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                className="inline-flex h-11 items-center rounded-xl bg-white px-5 text-[15px] font-semibold text-[#0b6550] shadow-sm ring-1 ring-[#c5e8dc] hover:bg-[#e3f2ed]"
              >
                Choose file
              </button>
              <p id={`${uid}-resume-help`} className="text-[13.5px] text-[#5b6e7a]">or drag it here · PDF, DOC or DOCX · max 5 MB</p>
            </div>
          )}
          {upload.state === "error" && <p className="mt-3 text-[13.5px] font-medium text-[#dc2626]">{upload.message}</p>}
          {fields.resume && upload.state !== "error" && <p className="mt-3 text-[13.5px] font-medium text-[#dc2626]">{fields.resume}</p>}
        </div>
      </fieldset>

      {questions.length > 0 && (
        <fieldset className="space-y-4">
          <legend className="mb-3 text-[17px] font-bold text-[#0f2a45]">A few questions</legend>
          {questions.map((q) => {
            const key = `answers.${q.id}`;
            const id = `${uid}-q-${q.id}`;
            return (
              <div key={q.id}>
                <label htmlFor={id} className={label}>
                  {q.label} {q.required && "*"}
                </label>
                {q.type === "yes_no" ? (
                  <select id={id} name={`q_${q.id}`} required={q.required} defaultValue="" className={field} {...a11y(key)}>
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                ) : q.type === "number" ? (
                  <input id={id} name={`q_${q.id}`} type="number" inputMode="decimal" required={q.required} className={field} {...a11y(key)} />
                ) : (
                  <textarea id={id} name={`q_${q.id}`} rows={3} maxLength={1000} required={q.required} className={`${field} resize-y`} {...a11y(key)} />
                )}
                {err(key)}
              </div>
            );
          })}
        </fieldset>
      )}

      <div>
        <label htmlFor={`${uid}-cover`} className={label}>Why are you a good fit? <span className="font-normal text-[#5b6e7a]">(optional)</span></label>
        <textarea id={`${uid}-cover`} name="cover_letter" rows={5} maxLength={5000} className={`${field} resize-y`} placeholder="A few lines about your experience and why this role interests you." />
      </div>

      <label className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[#4a5d68]">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-[#0e7b5b]" />
        <span>
          I consent to Filing360 storing and processing my application details and résumé for recruitment purposes, for up to
          12 months. I can ask for them to be deleted at any time.
        </span>
      </label>
      {err("consent")}

      {error && (
        <p role="alert" className="rounded-xl bg-[#fef2f2] px-4 py-3 text-[14.5px] font-medium text-[#b91c1c]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || upload.state === "uploading"}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0f2a45] px-6 text-[16px] font-semibold text-white transition hover:bg-[#173a58] disabled:opacity-70 sm:w-auto"
      >
        {submitting ? "Submitting…" : "Submit application"} <span aria-hidden>→</span>
      </button>
    </form>
  );
}
