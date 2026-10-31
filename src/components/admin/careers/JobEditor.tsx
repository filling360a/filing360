"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import { deleteJob, saveJob, type JobInput, type JobIntent } from "@/app/admin/(panel)/careers/actions";
import { RichTextEditor } from "@/components/admin/blog/RichTextEditor";
import { Alert, Button, buttonClass, Card, inputClass, JobStatusBadge, labelClass } from "@/components/admin/ui";
import { EMPLOYMENT_TYPES, parseQuestions, WORKPLACE_TYPES, type ScreeningQuestion } from "@/lib/careers/constants";
import { slugify } from "@/lib/slug";
import type { EmploymentType, JobStatus, Tables, WorkplaceType } from "@/lib/supabase/database.types";

type Props = {
  job: Tables<"jobs">;
  applicationCount: number;
  departments: string[];
  canDelete: boolean;
};

type FormState = {
  title: string;
  slug: string;
  department: string;
  location: string;
  workplace_type: WorkplaceType;
  employment_type: EmploymentType;
  experience_min: string;
  experience_max: string;
  salary_min: string;
  salary_max: string;
  show_salary: boolean;
  openings: string;
  summary: string;
  description_html: string;
  responsibilities: string;
  requirements: string;
  nice_to_have: string;
  benefits: string;
  skills: string;
  screening_questions: ScreeningQuestion[];
  closes_on: string;
};

const toLakhs = (rupees: number | null) => (rupees === null ? "" : String(Math.round((rupees / 100_000) * 100) / 100));

function istDate(value: string | null): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
}

function initialState(job: Tables<"jobs">): FormState {
  return {
    title: job.title,
    slug: job.slug,
    department: job.department,
    location: job.location,
    workplace_type: job.workplace_type,
    employment_type: job.employment_type,
    experience_min: String(job.experience_min),
    experience_max: job.experience_max === null ? "" : String(job.experience_max),
    salary_min: toLakhs(job.salary_min),
    salary_max: toLakhs(job.salary_max),
    show_salary: job.show_salary,
    openings: String(job.openings),
    summary: job.summary ?? "",
    description_html: job.description_html,
    responsibilities: job.responsibilities.join("\n"),
    requirements: job.requirements.join("\n"),
    nice_to_have: job.nice_to_have.join("\n"),
    benefits: job.benefits.join("\n"),
    skills: job.skills.join(", "),
    screening_questions: parseQuestions(job.screening_questions),
    closes_on: istDate(job.closes_at),
  };
}

const lines = (v: string) => v.split("\n").map((l) => l.replace(/^\s*[-•*]\s*/, "").trim()).filter(Boolean);
const num = (v: string) => (v.trim() === "" ? null : Number(v));

function toInput(form: FormState): JobInput {
  return {
    ...form,
    experience_min: Number(form.experience_min || 0),
    experience_max: num(form.experience_max),
    salary_min: num(form.salary_min),
    salary_max: num(form.salary_max),
    openings: Number(form.openings || 1),
    responsibilities: lines(form.responsibilities),
    requirements: lines(form.requirements),
    nice_to_have: lines(form.nice_to_have),
    benefits: lines(form.benefits),
    skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
  };
}

export function JobEditor({ job, applicationCount, departments, canDelete }: Props) {
  const [form, setForm] = useState<FormState>(() => initialState(job));
  const [saved, setSaved] = useState(() => JSON.stringify(initialState(job)));
  const [status, setStatus] = useState<JobStatus>(job.status);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [slugTouched, setSlugTouched] = useState(job.slug !== slugify(job.title, 100));
  const [pending, startTransition] = useTransition();

  const dirty = JSON.stringify(form) !== saved;
  const isPublic = status === "open" || status === "closed";
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const save = useCallback(
    (intent: JobIntent) => {
      const snapshot = form;
      setFeedback(null);
      startTransition(async () => {
        const res = await saveJob(job.id, toInput(snapshot), intent);
        if (res?.ok) {
          setSaved(JSON.stringify(snapshot));
          if (res.status) setStatus(res.status);
          setFeedback({ ok: true, text: res.message ?? "Saved" });
        } else {
          setFeedback({ ok: false, text: res?.error ?? "Could not save" });
        }
      });
    },
    [form, job.id],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save("save");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  useEffect(() => {
    if (!dirty) return;
    const onUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [dirty]);

  const confirmThen = (message: string, intent: JobIntent) => () => {
    if (window.confirm(message)) save(intent);
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link href="/admin/careers" className="text-[13px] font-medium text-[#5b6e7a] hover:text-[#0f2a45]">← All jobs</Link>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[12.5px] text-[#5b6e7a]">
            <JobStatusBadge status={status} />
            <Link href={`/admin/careers/applications?job=${job.id}`} className="font-medium hover:text-[#0e7b5b]">
              {applicationCount} application{applicationCount === 1 ? "" : "s"} →
            </Link>
            <span>{pending ? "Saving…" : dirty ? "Unsaved changes" : "All changes saved"}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {isPublic && (
            <a href={`/careers/${form.slug}`} target="_blank" rel="noopener" className={buttonClass("secondary")}>View live ↗</a>
          )}
          <Button type="button" variant="secondary" onClick={() => save("save")} disabled={pending || !dirty}>
            {status === "draft" ? "Save draft" : "Save changes"}
          </Button>
          {status === "draft" && <Button type="button" onClick={() => save("publish")} disabled={pending}>Publish</Button>}
          {status === "open" && (
            <>
              <Button type="button" variant="secondary" onClick={confirmThen("Pause this job? It will be hidden from the careers page until you reopen it.", "pause")} disabled={pending}>Pause</Button>
              <Button type="button" variant="danger" onClick={confirmThen("Close this job? Candidates will no longer be able to apply.", "close")} disabled={pending}>Close</Button>
            </>
          )}
          {(status === "paused" || status === "closed") && (
            <Button type="button" onClick={() => save("reopen")} disabled={pending}>Reopen</Button>
          )}
          {status === "paused" && (
            <Button type="button" variant="danger" onClick={confirmThen("Close this job permanently?", "close")} disabled={pending}>Close</Button>
          )}
        </div>
      </div>

      {feedback && (
        <div className="mb-4">
          <Alert tone={feedback.ok ? "green" : "red"}>{feedback.text}</Alert>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-5">
          <Card className="space-y-4 p-5">
            <div>
              <label htmlFor="title" className={labelClass}>Job title</label>
              <input
                id="title"
                value={form.title}
                maxLength={140}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({ ...f, title, slug: slugTouched || status !== "draft" ? f.slug : slugify(title, 100) }));
                }}
                className={`${inputClass} !text-[17px] font-semibold`}
              />
            </div>
            <div>
              <label htmlFor="summary" className={labelClass}>
                Summary <span className="font-normal text-[#8a9ba6]">— one or two lines shown on the jobs list and in search results</span>
              </label>
              <textarea id="summary" rows={2} maxLength={300} value={form.summary} onChange={(e) => set("summary", e.target.value)} className={inputClass} />
              <p className="mt-1 text-right text-[11.5px] text-[#8a9ba6]">{form.summary.length}/300</p>
            </div>
            <div>
              <p className={labelClass}>About the role</p>
              <RichTextEditor
                initialHtml={job.description_html}
                onChange={(html) => set("description_html", html)}
                placeholder="What the team does, what this person will own, and why it matters…"
                minHeight="min-h-[220px]"
                label="Job description"
              />
            </div>
          </Card>

          <Card className="grid gap-4 p-5 md:grid-cols-2">
            <ListField id="responsibilities" label="Responsibilities" hint="What they'll do" value={form.responsibilities} onChange={(v) => set("responsibilities", v)} />
            <ListField id="requirements" label="Requirements" hint="Must-haves" value={form.requirements} onChange={(v) => set("requirements", v)} />
            <ListField id="nice_to_have" label="Nice to have" hint="Optional" value={form.nice_to_have} onChange={(v) => set("nice_to_have", v)} />
            <ListField id="benefits" label="What we offer" hint="Leave empty to use only the general perks" value={form.benefits} onChange={(v) => set("benefits", v)} />
          </Card>

          <Card className="p-5">
            <QuestionsBuilder questions={form.screening_questions} onChange={(qs) => set("screening_questions", qs)} locked={applicationCount > 0} />
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="space-y-3 p-5">
            <h2 className="text-[15px] font-bold text-[#0f2a45]">Details</h2>
            <div>
              <label htmlFor="slug" className={labelClass}>URL</label>
              <div className="flex items-center rounded-lg border border-[#d0dcd6] bg-[#f3f7fa] text-sm">
                <span className="pl-3 text-[#8a9ba6]">/careers/</span>
                <input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value.toLowerCase());
                  }}
                  onBlur={() => set("slug", slugify(form.slug, 100))}
                  className="min-w-0 flex-1 rounded-r-lg bg-white px-2 py-2 outline-none"
                />
              </div>
              {isPublic && job.slug !== form.slug && (
                <p className="mt-1 text-[11.5px] text-[#b45309]">Changing a live URL breaks links already shared.</p>
              )}
            </div>
            <div>
              <label htmlFor="department" className={labelClass}>Department</label>
              <input id="department" list="job-departments" value={form.department} maxLength={60} onChange={(e) => set("department", e.target.value)} className={inputClass} />
              <datalist id="job-departments">{departments.map((d) => <option key={d} value={d} />)}</datalist>
            </div>
            <div>
              <label htmlFor="location" className={labelClass}>Location</label>
              <input id="location" value={form.location} maxLength={80} onChange={(e) => set("location", e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="workplace_type" className={labelClass}>Workplace</label>
                <select id="workplace_type" value={form.workplace_type} onChange={(e) => set("workplace_type", e.target.value as WorkplaceType)} className={inputClass}>
                  {Object.entries(WORKPLACE_TYPES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="employment_type" className={labelClass}>Type</label>
                <select id="employment_type" value={form.employment_type} onChange={(e) => set("employment_type", e.target.value as EmploymentType)} className={inputClass}>
                  {Object.entries(EMPLOYMENT_TYPES).map(([value, t]) => <option key={value} value={value}>{t.label}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <NumberField id="experience_min" label="Exp. min (yrs)" value={form.experience_min} onChange={(v) => set("experience_min", v)} />
              <NumberField id="experience_max" label="Exp. max" value={form.experience_max} onChange={(v) => set("experience_max", v)} placeholder="Any" />
              <NumberField id="openings" label="Openings" value={form.openings} onChange={(v) => set("openings", v)} />
            </div>
            <div>
              <label htmlFor="skills" className={labelClass}>Key skills</label>
              <input id="skills" value={form.skills} onChange={(e) => set("skills", e.target.value)} placeholder="e.g. ROC filings, GST, Tally" className={inputClass} />
              <p className="mt-1 text-[11.5px] text-[#8a9ba6]">Comma separated</p>
            </div>
          </Card>

          <Card className="space-y-3 p-5">
            <h2 className="text-[15px] font-bold text-[#0f2a45]">Compensation</h2>
            <div className="grid grid-cols-2 gap-3">
              <NumberField id="salary_min" label="Min (₹ lakh / yr)" value={form.salary_min} onChange={(v) => set("salary_min", v)} step="0.1" />
              <NumberField id="salary_max" label="Max (₹ lakh / yr)" value={form.salary_max} onChange={(v) => set("salary_max", v)} step="0.1" />
            </div>
            <label className="flex items-start gap-2 text-[13px] text-[#2c3f4e]">
              <input type="checkbox" checked={form.show_salary} onChange={(e) => set("show_salary", e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#0e7b5b]" />
              <span>Show salary on the job page <span className="text-[#8a9ba6]">(listings with pay get more applicants and rank better on Google Jobs)</span></span>
            </label>
          </Card>

          <Card className="space-y-3 p-5">
            <h2 className="text-[15px] font-bold text-[#0f2a45]">Closing date</h2>
            <input type="date" value={form.closes_on} onChange={(e) => set("closes_on", e.target.value)} className={inputClass} aria-label="Closing date" />
            <p className="text-[12px] text-[#5b6e7a]">Applications stop automatically at 11:59 pm IST that day. Leave empty to keep it open until you close it.</p>
          </Card>

          {canDelete && (
            <Card className="p-5">
              <h2 className="mb-1 text-[15px] font-bold text-[#b91c1c]">Danger zone</h2>
              <p className="mb-3 text-[12.5px] text-[#5b6e7a]">
                {applicationCount > 0 ? "Jobs with applications can't be deleted — close the job instead." : "Delete this job permanently."}
              </p>
              <DeleteJobButton jobId={job.id} disabled={applicationCount > 0} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function ListField({ id, label, hint, value, onChange }: { id: string; label: string; hint: string; value: string; onChange: (v: string) => void }) {
  const count = lines(value).length;
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} <span className="font-normal text-[#8a9ba6]">— {hint}</span>
      </label>
      <textarea id={id} rows={6} value={value} onChange={(e) => onChange(e.target.value)} placeholder="One point per line" className={inputClass} />
      <p className="mt-1 text-[11.5px] text-[#8a9ba6]">{count} point{count === 1 ? "" : "s"}</p>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  placeholder,
  step = "1",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  step?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <input id={id} type="number" inputMode="decimal" min={0} step={step} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </div>
  );
}

const QUESTION_TYPES: { value: ScreeningQuestion["type"]; label: string }[] = [
  { value: "text", label: "Short answer" },
  { value: "yes_no", label: "Yes / No" },
  { value: "number", label: "Number" },
];

const SUGGESTED_QUESTIONS: Omit<ScreeningQuestion, "id">[] = [
  { label: "Are you comfortable working from our New Delhi office?", type: "yes_no", required: true },
  { label: "How many company incorporations have you handled end-to-end?", type: "number", required: false },
  { label: "Are you a member of ICSI / ICAI? Share your membership number.", type: "text", required: false },
];

function QuestionsBuilder({ questions, onChange, locked }: { questions: ScreeningQuestion[]; onChange: (qs: ScreeningQuestion[]) => void; locked: boolean }) {
  const add = (q: Omit<ScreeningQuestion, "id"> = { label: "", type: "text", required: false }) =>
    onChange([...questions, { ...q, id: `q_${crypto.randomUUID().slice(0, 8)}` }]);
  const update = (id: string, patch: Partial<ScreeningQuestion>) => onChange(questions.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  const remove = (id: string) => onChange(questions.filter((q) => q.id !== id));
  const move = (index: number, by: -1 | 1) => {
    const next = [...questions];
    const [item] = next.splice(index, 1);
    next.splice(index + by, 0, item);
    onChange(next);
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-[15px] font-bold text-[#0f2a45]">Screening questions</h2>
          <p className="text-[12.5px] text-[#5b6e7a]">Asked on the application form. Keep them few and specific (max 8).</p>
        </div>
        {questions.length < 8 && (
          <Button type="button" variant="secondary" size="sm" onClick={() => add()}>+ Add question</Button>
        )}
      </div>
      {locked && questions.length > 0 && (
        <p className="mb-3 rounded-lg bg-[#fffbeb] px-3 py-2 text-[12px] text-[#92400e]">
          This job already has applications. Earlier answers keep the question wording they were given with.
        </p>
      )}
      {questions.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#d0dcd6] p-4">
          <p className="text-[13px] text-[#5b6e7a]">No screening questions. Suggestions:</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => add(q)}
                className="rounded-full border border-[#d0dcd6] px-2.5 py-1 text-left text-[12px] font-medium text-[#4a5d68] hover:bg-[#f3f7fa]"
              >
                + {q.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <ol className="space-y-2">
          {questions.map((q, i) => (
            <li key={q.id} className="rounded-lg border border-[#d7e4de] p-3">
              <div className="flex gap-2">
                <span className="mt-2 text-[12px] font-bold text-[#8a9ba6]">{i + 1}.</span>
                <div className="min-w-0 flex-1 space-y-2">
                  <input
                    value={q.label}
                    onChange={(e) => update(q.id, { label: e.target.value })}
                    maxLength={200}
                    placeholder="Question"
                    aria-label={`Question ${i + 1}`}
                    className={inputClass}
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={q.type}
                      onChange={(e) => update(q.id, { type: e.target.value as ScreeningQuestion["type"] })}
                      className={`${inputClass} !w-auto !py-1.5`}
                      aria-label="Answer type"
                    >
                      {QUESTION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <label className="flex items-center gap-1.5 text-[13px] text-[#2c3f4e]">
                      <input type="checkbox" checked={q.required} onChange={(e) => update(q.id, { required: e.target.checked })} className="h-4 w-4 accent-[#0e7b5b]" />
                      Required
                    </label>
                    <span className="ml-auto flex gap-1">
                      <Button type="button" variant="ghost" size="sm" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => move(i, 1)} disabled={i === questions.length - 1} aria-label="Move down">↓</Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => remove(q.id)} aria-label="Remove question">✕</Button>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function DeleteJobButton({ jobId, disabled }: { jobId: string; disabled: boolean }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <Button
        type="button"
        variant="danger"
        size="sm"
        disabled={pending || disabled}
        onClick={() => {
          if (!window.confirm("Delete this job permanently?")) return;
          start(async () => {
            const res = await deleteJob(jobId);
            if (res?.error) setError(res.error);
          });
        }}
      >
        {pending ? "Deleting…" : "Delete job"}
      </Button>
      {error && <p className="mt-2 text-[12.5px] text-[#b91c1c]">{error}</p>}
    </>
  );
}
