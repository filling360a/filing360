import "server-only";
import { z } from "zod";
import { isSupabaseAdminConfigured } from "@/lib/env";
import { enforceRateLimits, hashIp } from "@/lib/rate-limit";
import { normalizeIndianMobile } from "@/lib/leads/schema";
import { createAdminClient } from "@/lib/supabase/admin";

export const trackSchema = z.object({
  ref: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^(F360|APP)-\d{1,10}$/, "Enter a reference like F360-1234 or APP-1234"),
  phone: z
    .string()
    .trim()
    .transform((v, ctx) => {
      const phone = normalizeIndianMobile(v);
      if (!phone) {
        ctx.addIssue({ code: "custom", message: "Enter the 10-digit mobile number you used" });
        return z.NEVER;
      }
      return phone;
    }),
});

type StepState = "done" | "current" | "todo";

export type TrackStatus = {
  kind: "request" | "application";
  ref: string;
  firstName: string;
  subject: string;
  stage: string;
  detail: string;
  tone: "progress" | "success" | "closed";
  steps: { label: string; state: StepState }[];
  submittedAt: string;
  updatedAt: string;
};

export type TrackResult =
  | { ok: true; status: TrackStatus }
  | { ok: false; status: number; error: string; fields?: Record<string, string[]> };

const NOT_FOUND: TrackResult = {
  ok: false,
  status: 404,
  error: "We couldn't find a request with that reference and mobile number. Check both and try again, or contact us.",
};

const LEAD_STEPS = ["Received", "Expert assigned", "Quote shared", "Work in progress"];
const LEAD_STAGES: Record<string, { step: number; stage: string; detail: string; tone: TrackStatus["tone"] }> = {
  new: { step: 0, stage: "Request received", detail: "Your request is in the queue. An expert will call you shortly.", tone: "progress" },
  contacted: { step: 1, stage: "Expert assigned", detail: "An expert has picked up your request and is in touch with you.", tone: "progress" },
  qualified: { step: 1, stage: "Requirement confirmed", detail: "We've confirmed what you need and are preparing your quote.", tone: "progress" },
  proposal: { step: 2, stage: "Quote shared", detail: "We've shared a quote. Reply or call us once you're ready to go ahead.", tone: "progress" },
  won: { step: 3, stage: "Work in progress", detail: "Your engagement has started. Your expert will update you at each milestone.", tone: "success" },
  lost: { step: -1, stage: "Request closed", detail: "This request is closed. If you still need help, contact us and we'll reopen it.", tone: "closed" },
};

const APP_STEPS = ["Received", "Under review", "Shortlisted", "Interview", "Decision"];
const APP_STAGES: Record<string, { step: number; stage: string; detail: string; tone: TrackStatus["tone"] }> = {
  new: { step: 0, stage: "Application received", detail: "Your application has reached our hiring team.", tone: "progress" },
  reviewing: { step: 1, stage: "Under review", detail: "Our hiring team is reviewing your profile.", tone: "progress" },
  shortlisted: { step: 2, stage: "Shortlisted", detail: "You've been shortlisted. We'll contact you about next steps.", tone: "progress" },
  interview: { step: 3, stage: "Interview stage", detail: "You're in the interview process. Check your email for schedules.", tone: "progress" },
  offered: { step: 4, stage: "Offer stage", detail: "We've reached a decision — check your email for details.", tone: "success" },
  hired: { step: 4, stage: "Hired", detail: "Welcome aboard!", tone: "success" },
  rejected: { step: -1, stage: "Not moving forward", detail: "Thank you for your interest. We've decided not to move forward this time.", tone: "closed" },
  withdrawn: { step: -1, stage: "Withdrawn", detail: "This application was withdrawn.", tone: "closed" },
};

function buildSteps(labels: string[], current: number): TrackStatus["steps"] {
  return labels.map((label, i) => ({
    label,
    state: current < 0 ? (i === 0 ? "done" : "todo") : i < current ? "done" : i === current ? "current" : "todo",
  }));
}

const firstNameOf = (name: string | null) => (name ?? "").trim().split(/\s+/)[0] ?? "";

export async function lookupStatus(input: z.output<typeof trackSchema>, ip: string | null): Promise<TrackResult> {
  if (!isSupabaseAdminConfigured()) {
    return { ok: false, status: 503, error: "Tracking is temporarily unavailable. Please contact us for an update." };
  }
  const db = createAdminClient();
  const ipHash = hashIp(ip);
  const limited = await enforceRateLimits(db, [
    ...(ipHash ? [{ key: `track:ip:${ipHash}`, limit: 15, windowSeconds: 600 }] : []),
    { key: `track:ref:${input.ref}`, limit: 6, windowSeconds: 900 },
  ]);
  if (limited) return limited;

  if (input.ref.startsWith("F360-")) {
    const { data } = await db
      .from("leads")
      .select("ref, name, phone, interest, status, created_at, updated_at")
      .eq("ref", input.ref)
      .maybeSingle();
    if (!data || data.phone !== input.phone || data.status === "spam") return NOT_FOUND;
    const s = LEAD_STAGES[data.status] ?? LEAD_STAGES.new;
    return {
      ok: true,
      status: {
        kind: "request",
        ref: data.ref,
        firstName: firstNameOf(data.name),
        subject: data.interest || "Your enquiry",
        stage: s.stage,
        detail: s.detail,
        tone: s.tone,
        steps: buildSteps(LEAD_STEPS, s.step),
        submittedAt: data.created_at,
        updatedAt: data.updated_at,
      },
    };
  }

  const { data } = await db
    .from("job_applications")
    .select("ref, full_name, phone, status, created_at, updated_at, job:jobs(title)")
    .eq("ref", input.ref)
    .maybeSingle();
  if (!data || data.phone !== input.phone) return NOT_FOUND;
  const s = APP_STAGES[data.status] ?? APP_STAGES.new;
  const job = Array.isArray(data.job) ? data.job[0] : data.job;
  return {
    ok: true,
    status: {
      kind: "application",
      ref: data.ref,
      firstName: firstNameOf(data.full_name),
      subject: job?.title ? `Application — ${job.title}` : "Job application",
      stage: s.stage,
      detail: s.detail,
      tone: s.tone,
      steps: buildSteps(APP_STEPS, s.step),
      submittedAt: data.created_at,
      updatedAt: data.updated_at,
    },
  };
}
