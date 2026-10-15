import "server-only";
import { randomUUID } from "node:crypto";
import { ApplicationReceivedEmail } from "@/emails/ApplicationReceivedEmail";
import { NewApplicationAlertEmail } from "@/emails/NewApplicationAlertEmail";
import { sendEmail } from "@/lib/email/send";
import { env, isSupabaseAdminConfigured } from "@/lib/env";
import { hashIp } from "@/lib/leads/capture";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAcceptingApplications, parseQuestions, type ScreeningAnswer } from "./constants";
import { finalizeResume, removeResume, ResumeError } from "./resumes";
import type { ApplicationInput } from "./schema";

const MIN_FILL_MS = 4000;

type Meta = { ip: string | null; userAgent: string | null };
type Failure = { ok: false; status: number; error: string; fields?: Record<string, string[]> };

export type ApplyResult =
  | { ok: true; reference: string; applicationId: string | null; jobTitle: string }
  | Failure;

type Db = ReturnType<typeof createAdminClient>;

/** Returns a failure if any limit is exceeded; fails open if the limiter itself errors. */
export async function enforceRateLimits(
  db: Db,
  limits: { key: string; limit: number; windowSeconds: number }[],
): Promise<Failure | null> {
  for (const { key, limit, windowSeconds } of limits) {
    const { data: allowed, error } = await db.rpc("check_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });
    if (error) console.error("[careers] rate limit check failed:", error.message);
    else if (!allowed) return { ok: false, status: 429, error: "Too many attempts. Please wait a few minutes and try again." };
  }
  return null;
}

export async function submitApplication(input: ApplicationInput, meta: Meta): Promise<ApplyResult> {
  if (input.company_website || (input.started_at && Date.now() - input.started_at < MIN_FILL_MS)) {
    return { ok: true, reference: "APP-0000", applicationId: null, jobTitle: "" };
  }
  if (!isSupabaseAdminConfigured()) {
    return { ok: false, status: 503, error: "Applications are temporarily unavailable. Please email us your résumé." };
  }

  const db = createAdminClient();
  const ipHash = hashIp(meta.ip);
  const limited = await enforceRateLimits(db, [
    ...(ipHash ? [{ key: `apply:ip:${ipHash}`, limit: 8, windowSeconds: 600 }] : []),
    { key: `apply:email:${input.email}`, limit: 10, windowSeconds: 86_400 },
  ]);
  if (limited) return limited;

  const { data: job } = await db
    .from("jobs")
    .select("id, title, status, closes_at, screening_questions")
    .eq("id", input.jobId)
    .maybeSingle();
  if (!job) return { ok: false, status: 404, error: "This job no longer exists." };
  if (!isAcceptingApplications(job)) {
    return { ok: false, status: 410, error: "This position is no longer accepting applications." };
  }

  const answers: ScreeningAnswer[] = [];
  const answerErrors: Record<string, string[]> = {};
  for (const q of parseQuestions(job.screening_questions)) {
    const answer = (input.answers[q.id] ?? "").trim();
    if (!answer) {
      if (q.required) answerErrors[`answers.${q.id}`] = ["This question is required"];
      continue;
    }
    if (q.type === "yes_no" && !["Yes", "No"].includes(answer)) answerErrors[`answers.${q.id}`] = ["Choose Yes or No"];
    else if (q.type === "number" && !Number.isFinite(Number(answer))) answerErrors[`answers.${q.id}`] = ["Enter a number"];
    else answers.push({ id: q.id, label: q.label, answer });
  }
  if (Object.keys(answerErrors).length) {
    return { ok: false, status: 422, error: "Please answer the required questions.", fields: answerErrors };
  }

  const { data: existing } = await db
    .from("job_applications")
    .select("ref")
    .eq("job_id", job.id)
    .ilike("email", input.email.replace(/[%_\\]/g, "\\$&"))
    .maybeSingle();
  if (existing) {
    return {
      ok: false,
      status: 409,
      error: `You've already applied for this role (reference ${existing.ref}). We'll be in touch.`,
    };
  }

  const applicationId = randomUUID();
  let resume;
  try {
    resume = await finalizeResume(input.resume.path, applicationId);
  } catch (err) {
    if (err instanceof ResumeError) return { ok: false, status: 422, error: err.message, fields: { resume: [err.message] } };
    console.error("[careers] résumé finalize failed:", err);
    return { ok: false, status: 500, error: "We couldn't process your résumé. Please try again." };
  }

  const { data: created, error } = await db
    .from("job_applications")
    .insert({
      id: applicationId,
      job_id: job.id,
      full_name: input.full_name,
      email: input.email,
      phone: input.phone,
      current_city: input.current_city ?? null,
      linkedin_url: input.linkedin_url ?? null,
      portfolio_url: input.portfolio_url ?? null,
      total_experience: input.total_experience ?? null,
      current_ctc: input.current_ctc ?? null,
      expected_ctc: input.expected_ctc ?? null,
      notice_period_days: input.notice_period_days != null ? Math.round(input.notice_period_days) : null,
      cover_letter: input.cover_letter ?? null,
      answers,
      resume_path: resume.path,
      resume_name: input.resume.name.slice(0, 200),
      resume_size: resume.size,
      resume_type: resume.type,
      referrer: input.attribution?.referrer ?? null,
      utm_source: input.attribution?.utm_source ?? null,
      utm_medium: input.attribution?.utm_medium ?? null,
      utm_campaign: input.attribution?.utm_campaign ?? null,
      consent: true,
      ip_hash: ipHash,
      user_agent: meta.userAgent?.slice(0, 400) ?? null,
    })
    .select("id, ref")
    .single();

  if (error || !created) {
    await removeResume(resume.path).catch(() => undefined);
    if (error?.code === "23505") {
      return { ok: false, status: 409, error: "You've already applied for this role. We'll be in touch." };
    }
    console.error("[careers] insert failed:", error?.message);
    return { ok: false, status: 500, error: "Something went wrong. Please try again." };
  }

  return { ok: true, reference: created.ref, applicationId: created.id, jobTitle: job.title };
}

export async function sendApplicationEmails(input: ApplicationInput, result: Extract<ApplyResult, { ok: true }>) {
  if (!result.applicationId) return;
  const jobs: Promise<unknown>[] = [
    sendEmail({
      to: input.email,
      subject: `Application received — ${result.jobTitle} (${result.reference})`,
      react: ApplicationReceivedEmail({ name: input.full_name, reference: result.reference, jobTitle: result.jobTitle }),
      template: "application-received",
      applicationId: result.applicationId,
      idempotencyKey: `application-received/${result.applicationId}`,
    }),
  ];
  if (env.careersNotifyTo.length > 0) {
    jobs.push(
      sendEmail({
        to: env.careersNotifyTo,
        subject: `New application: ${input.full_name} — ${result.jobTitle}`,
        react: NewApplicationAlertEmail({
          reference: result.reference,
          jobTitle: result.jobTitle,
          name: input.full_name,
          email: input.email,
          phone: input.phone,
          city: input.current_city,
          experience: input.total_experience,
          expectedCtc: input.expected_ctc,
          noticeDays: input.notice_period_days,
          adminUrl: `${env.siteUrl}/admin/careers/applications/${result.applicationId}`,
        }),
        template: "application-alert",
        applicationId: result.applicationId,
        replyTo: input.email,
      }),
    );
  }
  await Promise.allSettled(jobs);
}
