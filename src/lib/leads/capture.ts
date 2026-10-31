import "server-only";
import { env, isSupabaseAdminConfigured } from "@/lib/env";
import { sendEmail } from "@/lib/email/send";
import { enforceRateLimits, hashIp } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import { LeadConfirmationEmail } from "@/emails/LeadConfirmationEmail";
import { NewLeadAlertEmail } from "@/emails/NewLeadAlertEmail";
import type { Attribution, PublicLead } from "./schema";

export { hashIp } from "@/lib/rate-limit";

const DEDUPE_WINDOW_DAYS = 30;
const MIN_FILL_MS = 2000;

export type CaptureMeta = { ip: string | null; userAgent: string | null };

export type CaptureResult =
  | { ok: true; reference: string; leadId: string | null; repeat: boolean; notify: boolean }
  | { ok: false; status: number; error: string };

function looksLikeBot(lead: PublicLead): boolean {
  if (lead.company_website) return true;
  if (lead.started_at && Date.now() - lead.started_at < MIN_FILL_MS) return true;
  return false;
}

export async function captureLead(lead: PublicLead, meta: CaptureMeta): Promise<CaptureResult> {
  if (looksLikeBot(lead)) {
    return { ok: true, reference: "F360-0000", leadId: null, repeat: false, notify: false };
  }

  if (!isSupabaseAdminConfigured()) {
    console.error("[leads] Supabase is not configured; lead not stored");
    return { ok: false, status: 503, error: "We couldn't save your request right now. Please call us instead." };
  }

  const db = createAdminClient();
  const ipHash = hashIp(meta.ip);
  const limited = await enforceRateLimits(db, [
    ...(ipHash ? [{ key: `lead:ip:${ipHash}`, limit: 6, windowSeconds: 600 }] : []),
    { key: `lead:phone:${lead.phone}`, limit: 4, windowSeconds: 3600 },
  ]);
  if (limited) return limited;

  const attribution: Attribution = lead.attribution ?? {};
  const since = new Date(Date.now() - DEDUPE_WINDOW_DAYS * 86_400_000).toISOString();

  const { data: existing } = await db
    .from("leads")
    .select("id, ref, message, submission_count, interest, email, city")
    .eq("phone", lead.phone)
    .not("status", "in", "(won,lost,spam)")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing) {
    const message = [existing.message, lead.message].filter(Boolean).join("\n\n---\n\n") || null;
    const { error } = await db
      .from("leads")
      .update({
        submission_count: existing.submission_count + 1,
        interest: lead.interest ?? existing.interest,
        service_slug: lead.service_slug ?? undefined,
        email: existing.email ?? lead.email ?? null,
        city: existing.city ?? lead.city ?? null,
        message,
        source: lead.source,
      })
      .eq("id", existing.id);
    if (error) {
      console.error("[leads] update failed:", error.message);
      return { ok: false, status: 500, error: "Something went wrong. Please try again or call us." };
    }
    return { ok: true, reference: existing.ref, leadId: existing.id, repeat: true, notify: true };
  }

  const { data: created, error } = await db
    .from("leads")
    .insert({
      salutation: lead.salutation ?? null,
      name: lead.name,
      phone: lead.phone,
      email: lead.email ?? null,
      city: lead.city ?? null,
      interest: lead.interest ?? null,
      service_slug: lead.service_slug ?? null,
      message: lead.message ?? null,
      source: lead.source,
      page_url: lead.page_url ?? attribution.landing_page ?? null,
      referrer: attribution.referrer ?? null,
      utm_source: attribution.utm_source ?? null,
      utm_medium: attribution.utm_medium ?? null,
      utm_campaign: attribution.utm_campaign ?? null,
      utm_term: attribution.utm_term ?? null,
      utm_content: attribution.utm_content ?? null,
      gclid: attribution.gclid ?? null,
      consent: true,
      ip_hash: ipHash,
      user_agent: meta.userAgent?.slice(0, 400) ?? null,
    })
    .select("id, ref")
    .single();

  if (error || !created) {
    console.error("[leads] insert failed:", error?.message);
    return { ok: false, status: 500, error: "Something went wrong. Please try again or call us." };
  }

  return { ok: true, reference: created.ref, leadId: created.id, repeat: false, notify: true };
}

/** Customer confirmation + team alert. Run after the response is sent. */
export async function sendLeadEmails(lead: PublicLead, result: Extract<CaptureResult, { ok: true }>) {
  if (!result.notify || !result.leadId) return;
  const jobs: Promise<unknown>[] = [];

  if (lead.email && !result.repeat) {
    jobs.push(
      sendEmail({
        to: lead.email,
        subject: `We've received your request — ${result.reference}`,
        react: LeadConfirmationEmail({ name: lead.name, reference: result.reference, interest: lead.interest }),
        template: "lead-confirmation",
        leadId: result.leadId,
        idempotencyKey: `lead-confirmation/${result.leadId}`,
      }),
    );
  }

  if (env.leadNotifyTo.length > 0) {
    jobs.push(
      sendEmail({
        to: env.leadNotifyTo,
        subject: `${result.repeat ? "Returning" : "New"} lead: ${lead.name} — ${lead.interest ?? "General enquiry"}`,
        react: NewLeadAlertEmail({
          reference: result.reference,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          city: lead.city,
          interest: lead.interest,
          message: lead.message,
          source: lead.source,
          campaign: lead.attribution?.utm_campaign,
          repeat: result.repeat,
          adminUrl: `${env.siteUrl}/admin/leads/${result.leadId}`,
        }),
        template: "lead-alert",
        leadId: result.leadId,
        replyTo: lead.email,
      }),
    );
  }

  await Promise.allSettled(jobs);
}
