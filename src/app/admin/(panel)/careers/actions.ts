"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { LeadMessageEmail } from "@/emails/LeadMessageEmail";
import { assertStaff, AuthError } from "@/lib/auth/dal";
import { sanitizePostHtml } from "@/lib/blog/html";
import { APPLICATION_STATUSES } from "@/lib/careers/constants";
import { removeResume } from "@/lib/careers/resumes";
import { sendEmail } from "@/lib/email/send";
import { SLUG_PATTERN, slugify } from "@/lib/slug";
import type { ApplicationStatus, JobStatus } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";

export type CareersActionState =
  | { ok?: boolean; error?: string; message?: string; status?: JobStatus; publishedAt?: string | null }
  | undefined;

const uuid = z.uuid();
const STATUS_VALUES = APPLICATION_STATUSES.map((s) => s.value) as [ApplicationStatus, ...ApplicationStatus[]];

function fail(err: unknown): CareersActionState {
  if (err instanceof AuthError) return { error: err.message };
  console.error("[admin/careers]", err);
  return { error: "Something went wrong. Please try again." };
}

function revalidatePublicCareers(slugs: (string | null | undefined)[] = []) {
  revalidatePath("/careers");
  for (const slug of slugs) if (slug) revalidatePath(`/careers/${slug}`);
  revalidatePath("/sitemap.xml");
}

type Db = Awaited<ReturnType<typeof createClient>>;

async function uniqueSlug(db: Db, base: string, excludeId?: string) {
  const root = base || "job";
  for (let i = 0; i < 50; i++) {
    const candidate = i ? `${root}-${i + 1}` : root;
    let q = db.from("jobs").select("id").eq("slug", candidate).limit(1);
    if (excludeId) q = q.neq("id", excludeId);
    const { data } = await q;
    if (!data?.length) return candidate;
  }
  return `${root}-${Date.now()}`;
}

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------

const createJobSchema = z.object({
  title: z.string().trim().min(3, "Enter a job title").max(140),
  department: z.string().trim().min(2, "Enter a department").max(60),
});

export async function createJob(_: CareersActionState, formData: FormData): Promise<CareersActionState> {
  let jobId: string;
  try {
    const staff = await assertStaff("careers");
    const parsed = createJobSchema.safeParse({ title: formData.get("title"), department: formData.get("department") });
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };

    const db = await createClient();
    const slug = await uniqueSlug(db, slugify(parsed.data.title, 100));
    const { data, error } = await db
      .from("jobs")
      .insert({ ...parsed.data, slug, created_by: staff.id, updated_by: staff.id })
      .select("id")
      .single();
    if (error || !data) return { error: error?.message ?? "Could not create the job" };
    jobId = data.id;
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/careers");
  redirect(`/admin/careers/${jobId}`);
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v || null);

const list = (maxItems: number, maxLength: number, label: string) =>
  z
    .array(z.string().trim().max(maxLength, `${label}: each line must be under ${maxLength} characters`))
    .transform((items) => [...new Set(items.filter(Boolean))])
    .refine((items) => items.length <= maxItems, `${label}: keep it to ${maxItems} lines or fewer`);

/** Lakhs per annum in the form, rupees per year in the database. */
const lakhs = z
  .number()
  .min(0, "Salary can't be negative")
  .max(1000, "Salary looks too high — enter it in lakhs per year")
  .nullable()
  .transform((v) => (v === null ? null : Math.round(v * 100_000)));

const questionSchema = z.object({
  id: z.string().regex(/^[a-z0-9_-]{1,40}$/),
  label: z.string().trim().min(3, "Each screening question needs some text").max(200),
  type: z.enum(["text", "yes_no", "number"]),
  required: z.boolean(),
});

const jobSchema = z
  .object({
    title: z.string().trim().min(3, "Title is too short").max(140),
    slug: z
      .string()
      .trim()
      .toLowerCase()
      .max(120)
      .regex(SLUG_PATTERN, "URL slug can only contain lowercase letters, numbers and hyphens"),
    department: z.string().trim().min(2, "Enter a department").max(60),
    location: z.string().trim().min(2, "Enter a location").max(80),
    workplace_type: z.enum(["onsite", "hybrid", "remote"]),
    employment_type: z.enum(["full_time", "part_time", "contract", "internship"]),
    experience_min: z.number().int().min(0).max(40),
    experience_max: z.number().int().min(0).max(50).nullable(),
    salary_min: lakhs,
    salary_max: lakhs,
    show_salary: z.boolean(),
    openings: z.number().int().min(1, "At least one opening").max(500),
    summary: optionalText(300),
    description_html: z.string().max(100_000, "The description is too long"),
    responsibilities: list(20, 300, "Responsibilities"),
    requirements: list(20, 300, "Requirements"),
    nice_to_have: list(15, 300, "Nice to have"),
    benefits: list(15, 200, "Benefits"),
    skills: list(20, 40, "Skills"),
    screening_questions: z
      .array(questionSchema)
      .max(8, "Keep screening questions to 8 or fewer")
      .refine((qs) => new Set(qs.map((q) => q.id)).size === qs.length, "Duplicate screening question"),
    closes_on: z
      .string()
      .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Invalid closing date")
      .transform((v) => (v ? new Date(`${v}T23:59:59+05:30`).toISOString() : null)),
  })
  .refine((v) => v.experience_max === null || v.experience_max >= v.experience_min, {
    message: "Maximum experience must be at least the minimum",
  })
  .refine((v) => v.salary_min === null || v.salary_max === null || v.salary_max >= v.salary_min, {
    message: "Maximum salary must be at least the minimum",
  })
  .refine((v) => !v.show_salary || v.salary_min !== null || v.salary_max !== null, {
    message: "Add a salary range or untick “Show salary”",
  });

export type JobInput = z.input<typeof jobSchema>;
export type JobIntent = "save" | "publish" | "pause" | "close" | "reopen";

export async function saveJob(jobId: string, input: JobInput, intent: JobIntent): Promise<CareersActionState> {
  try {
    const staff = await assertStaff("careers");
    if (!uuid.safeParse(jobId).success) return { error: "Invalid job" };
    const parsed = jobSchema.safeParse(input);
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };
    const { closes_on, ...values } = parsed.data;

    const db = await createClient();
    const { data: current } = await db.from("jobs").select("slug, status, published_at").eq("id", jobId).single();
    if (!current) return { error: "Job not found" };

    const { data: clash } = await db.from("jobs").select("id").eq("slug", values.slug).neq("id", jobId).limit(1);
    if (clash?.length) return { error: `Another job already uses the URL /careers/${values.slug}` };

    const description_html = sanitizePostHtml(values.description_html);
    const now = new Date();
    let status: JobStatus = current.status;
    let published_at = current.published_at;

    if ((intent === "pause" || intent === "close") && !published_at) {
      return { error: "This job was never published — keep it as a draft or delete it" };
    }

    switch (intent) {
      case "publish":
      case "reopen":
        status = "open";
        published_at ??= now.toISOString();
        break;
      case "pause":
        status = "paused";
        break;
      case "close":
        status = "closed";
        break;
    }

    if (status === "open") {
      if (description_html.replace(/<[^>]+>/g, "").trim().length < 40 && values.requirements.length === 0) {
        return { error: "Add a description or requirements before publishing" };
      }
      if (closes_on && new Date(closes_on) <= now) {
        return { error: "The closing date is in the past — change it or clear it to publish" };
      }
    }

    const { error } = await db
      .from("jobs")
      .update({ ...values, description_html, closes_at: closes_on, status, published_at, updated_by: staff.id })
      .eq("id", jobId);
    if (error) return { error: error.message };

    const visible = (s: JobStatus) => s === "open" || s === "closed";
    if (visible(current.status) || visible(status)) revalidatePublicCareers([current.slug, values.slug]);
    revalidatePath("/admin/careers");
    revalidatePath(`/admin/careers/${jobId}`);

    const messages: Record<JobIntent, string> = {
      save: "Saved",
      publish: "Published — the job is live on /careers",
      reopen: "Reopened for applications",
      pause: "Paused — hidden from the careers page",
      close: "Closed — no longer accepting applications",
    };
    return { ok: true, message: messages[intent], status, publishedAt: published_at };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteJob(jobId: string): Promise<CareersActionState> {
  try {
    await assertStaff("team");
    if (!uuid.safeParse(jobId).success) return { error: "Invalid job" };
    const db = await createClient();
    const { count } = await db.from("job_applications").select("id", { count: "exact", head: true }).eq("job_id", jobId);
    if (count) {
      return { error: `This job has ${count} application${count === 1 ? "" : "s"}. Close it instead so the candidate history is kept.` };
    }
    const { data: job } = await db.from("jobs").select("slug").eq("id", jobId).single();
    const { error } = await db.from("jobs").delete().eq("id", jobId);
    if (error) return { error: error.message };
    revalidatePublicCareers([job?.slug]);
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/careers");
  redirect("/admin/careers");
}

// ---------------------------------------------------------------------------
// Applications
// ---------------------------------------------------------------------------

const updateApplicationSchema = z.object({
  status: z.enum(STATUS_VALUES),
  rating: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : null))
    .pipe(z.number().int().min(1).max(5).nullable()),
  assigned_to: z.union([uuid, z.literal("")]).transform((v) => v || null),
});

export async function updateApplication(applicationId: string, _: CareersActionState, formData: FormData): Promise<CareersActionState> {
  try {
    await assertStaff("careers");
    if (!uuid.safeParse(applicationId).success) return { error: "Invalid application" };
    const parsed = updateApplicationSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };

    const db = await createClient();
    const { error } = await db.from("job_applications").update(parsed.data).eq("id", applicationId);
    if (error) return { error: error.message };

    revalidatePath(`/admin/careers/applications/${applicationId}`);
    revalidatePath("/admin/careers/applications");
    return { ok: true, message: "Saved" };
  } catch (err) {
    return fail(err);
  }
}

export async function addApplicationNote(applicationId: string, _: CareersActionState, formData: FormData): Promise<CareersActionState> {
  try {
    const staff = await assertStaff("careers");
    if (!uuid.safeParse(applicationId).success) return { error: "Invalid application" };
    const body = z.string().trim().min(1, "Write something first").max(4000).safeParse(formData.get("body"));
    if (!body.success) return { error: body.error.issues[0]?.message };

    const db = await createClient();
    const { error } = await db
      .from("application_activities")
      .insert({ application_id: applicationId, actor_id: staff.id, type: "note", body: body.data });
    if (error) return { error: error.message };

    revalidatePath(`/admin/careers/applications/${applicationId}`);
    return { ok: true, message: "Note added" };
  } catch (err) {
    return fail(err);
  }
}

const emailSchema = z.object({
  subject: z.string().trim().min(3, "Add a subject").max(160),
  body: z.string().trim().min(10, "Write a message").max(5000),
  next_status: z.union([z.enum(STATUS_VALUES), z.literal("")]).optional(),
});

export async function emailApplicant(applicationId: string, _: CareersActionState, formData: FormData): Promise<CareersActionState> {
  try {
    const staff = await assertStaff("careers");
    if (!uuid.safeParse(applicationId).success) return { error: "Invalid application" };
    const parsed = emailSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };

    const db = await createClient();
    const { data: app } = await db.from("job_applications").select("id, full_name, email").eq("id", applicationId).single();
    if (!app) return { error: "Application not found" };

    const result = await sendEmail({
      to: app.email,
      subject: parsed.data.subject,
      react: LeadMessageEmail({
        name: app.full_name,
        body: parsed.data.body,
        senderName: staff.full_name ?? "Team Filing360",
        senderTitle: staff.job_title,
      }),
      template: "application-message",
      applicationId,
      sentBy: staff.id,
      replyTo: staff.email,
    });
    if (!result.ok) return { error: `Email not sent: ${result.error}` };

    await db.from("application_activities").insert({
      application_id: applicationId,
      actor_id: staff.id,
      type: "email_sent",
      body: `${parsed.data.subject}\n\n${parsed.data.body}`,
    });
    if (parsed.data.next_status) {
      await db.from("job_applications").update({ status: parsed.data.next_status }).eq("id", applicationId);
    }

    revalidatePath(`/admin/careers/applications/${applicationId}`);
    revalidatePath("/admin/careers/applications");
    return { ok: true, message: "Email sent" };
  } catch (err) {
    return fail(err);
  }
}

const bulkSchema = z.object({
  ids: z.array(uuid).min(1, "Select at least one application").max(200),
  action: z.enum(["status", "assign"]),
  value: z.string(),
});

export async function bulkUpdateApplications(input: { ids: string[]; action: string; value: string }): Promise<CareersActionState> {
  try {
    await assertStaff("careers");
    const parsed = bulkSchema.safeParse(input);
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };
    const { ids, action, value } = parsed.data;

    let patch: { status?: ApplicationStatus; assigned_to?: string | null };
    if (action === "status" && (STATUS_VALUES as string[]).includes(value)) patch = { status: value as ApplicationStatus };
    else if (action === "assign" && (value === "" || uuid.safeParse(value).success)) patch = { assigned_to: value || null };
    else return { error: "Invalid bulk action" };

    const db = await createClient();
    const { error } = await db.from("job_applications").update(patch).in("id", ids);
    if (error) return { error: error.message };

    revalidatePath("/admin/careers/applications");
    revalidatePath("/admin/careers");
    return { ok: true, message: `Updated ${ids.length} application${ids.length === 1 ? "" : "s"}` };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteApplication(applicationId: string): Promise<CareersActionState> {
  try {
    await assertStaff("team");
    if (!uuid.safeParse(applicationId).success) return { error: "Invalid application" };
    const db = await createClient();
    const { data: app } = await db.from("job_applications").select("resume_path").eq("id", applicationId).single();
    if (!app) return { error: "Application not found" };
    const { error } = await db.from("job_applications").delete().eq("id", applicationId);
    if (error) return { error: error.message };
    try {
      await removeResume(app.resume_path);
    } catch (err) {
      console.error("[admin/careers] résumé not removed", app.resume_path, err);
    }
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/careers/applications");
  revalidatePath("/admin/careers");
  redirect("/admin/careers/applications");
}
