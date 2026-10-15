import type {
  ApplicationStatus,
  EmploymentType,
  JobStatus,
  WorkplaceType,
} from "@/lib/supabase/database.types";

export const EMPLOYMENT_TYPES: Record<EmploymentType, { label: string; schema: string }> = {
  full_time: { label: "Full-time", schema: "FULL_TIME" },
  part_time: { label: "Part-time", schema: "PART_TIME" },
  contract: { label: "Contract", schema: "CONTRACTOR" },
  internship: { label: "Internship", schema: "INTERN" },
};

export const WORKPLACE_TYPES: Record<WorkplaceType, string> = {
  onsite: "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

export const JOB_STATUSES: { value: JobStatus; label: string; tone: "slate" | "green" | "amber" | "zinc" }[] = [
  { value: "draft", label: "Draft", tone: "slate" },
  { value: "open", label: "Open", tone: "green" },
  { value: "paused", label: "Paused", tone: "amber" },
  { value: "closed", label: "Closed", tone: "zinc" },
];

/** Pipeline order matters: it drives the stage tabs and the funnel. */
export const APPLICATION_STATUSES: {
  value: ApplicationStatus;
  label: string;
  tone: "blue" | "indigo" | "violet" | "amber" | "green" | "red" | "zinc" | "slate";
  closed?: boolean;
}[] = [
  { value: "new", label: "New", tone: "blue" },
  { value: "reviewing", label: "Reviewing", tone: "indigo" },
  { value: "shortlisted", label: "Shortlisted", tone: "violet" },
  { value: "interview", label: "Interview", tone: "amber" },
  { value: "offered", label: "Offered", tone: "green" },
  { value: "hired", label: "Hired", tone: "green", closed: true },
  { value: "rejected", label: "Rejected", tone: "red", closed: true },
  { value: "withdrawn", label: "Withdrawn", tone: "zinc", closed: true },
];

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

export const RESUME_TYPES: Record<string, { ext: "pdf" | "doc" | "docx"; label: string }> = {
  "application/pdf": { ext: "pdf", label: "PDF" },
  "application/msword": { ext: "doc", label: "DOC" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { ext: "docx", label: "DOCX" },
};

export const RESUME_ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export type ScreeningQuestion = {
  id: string;
  label: string;
  type: "text" | "yes_no" | "number";
  required: boolean;
};

export type ScreeningAnswer = { id: string; label: string; answer: string };

export function parseQuestions(value: unknown): ScreeningQuestion[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((q) => {
    if (!q || typeof q !== "object") return [];
    const { id, label, type, required } = q as Record<string, unknown>;
    if (typeof id !== "string" || typeof label !== "string") return [];
    const kind = type === "yes_no" || type === "number" ? type : "text";
    return [{ id, label, type: kind, required: Boolean(required) } satisfies ScreeningQuestion];
  });
}

export function parseAnswers(value: unknown): ScreeningAnswer[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((a) =>
    a && typeof a === "object" && typeof (a as ScreeningAnswer).label === "string"
      ? [{ id: String((a as ScreeningAnswer).id), label: (a as ScreeningAnswer).label, answer: String((a as ScreeningAnswer).answer ?? "") }]
      : [],
  );
}

export function formatExperience(min: number, max: number | null): string {
  if (min === 0 && (max === null || max === 0)) return "Freshers welcome";
  if (max === null) return `${min}+ years`;
  if (min === max) return `${min} year${min === 1 ? "" : "s"}`;
  return `${min}–${max} years`;
}

/** Salary stored as rupees per year; shown in lakhs. */
export function formatSalary(min: number | null, max: number | null): string | null {
  const lakh = (n: number) => `₹${(n / 100000).toLocaleString("en-IN", { maximumFractionDigits: 1 })}L`;
  if (min && max) return `${lakh(min)} – ${lakh(max)} per year`;
  if (min) return `From ${lakh(min)} per year`;
  if (max) return `Up to ${lakh(max)} per year`;
  return null;
}

export function isAcceptingApplications(job: { status: JobStatus; closes_at: string | null }, now = Date.now()) {
  return job.status === "open" && (!job.closes_at || new Date(job.closes_at).getTime() > now);
}
