import "server-only";
import type { ReactElement } from "react";
import { render, toPlainText } from "@react-email/render";
import { Resend } from "resend";
import { env, isEmailConfigured, isSupabaseAdminConfigured } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

let client: Resend | null = null;

function resend(): Resend | null {
  if (!isEmailConfigured()) return null;
  client ??= new Resend(env.resendApiKey);
  return client;
}

type SendArgs = {
  to: string | string[];
  subject: string;
  react: ReactElement;
  /** Short identifier stored in the email log, e.g. "lead-confirmation". */
  template: string;
  replyTo?: string;
  leadId?: string;
  applicationId?: string;
  sentBy?: string;
  /** Prevents duplicate sends if the same request is retried. */
  idempotencyKey?: string;
};

export type SendResult = { ok: true; id: string | null } | { ok: false; error: string };

/** Sends an email through Resend and records the outcome in `email_logs`. */
export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const to = Array.isArray(args.to) ? args.to : [args.to];
  const api = resend();

  let result: SendResult;
  if (!api) {
    console.warn(`[email] RESEND_API_KEY missing — skipped "${args.template}" to ${to.join(", ")}`);
    result = { ok: false, error: "Email is not configured" };
  } else {
    try {
      const html = await render(args.react);
      const { data, error } = await api.emails.send(
        {
          from: env.emailFrom,
          to,
          subject: args.subject,
          html,
          text: toPlainText(html),
          replyTo: args.replyTo ?? env.emailReplyTo,
          tags: [{ name: "template", value: args.template }],
        },
        args.idempotencyKey ? { idempotencyKey: args.idempotencyKey } : undefined,
      );
      result = error ? { ok: false, error: error.message } : { ok: true, id: data?.id ?? null };
    } catch (err) {
      result = { ok: false, error: err instanceof Error ? err.message : "Unknown email error" };
    }
  }

  if (!result.ok) console.error(`[email] "${args.template}" failed: ${result.error}`);

  if (isSupabaseAdminConfigured()) {
    const db = createAdminClient();
    await db.from("email_logs").insert(
      to.map((address) => ({
        lead_id: args.leadId ?? null,
        application_id: args.applicationId ?? null,
        to_email: address,
        subject: args.subject,
        template: args.template,
        provider_id: result.ok ? result.id : null,
        status: result.ok ? ("sent" as const) : api ? ("failed" as const) : ("skipped" as const),
        error: result.ok ? null : result.error,
        sent_by: args.sentBy ?? null,
      })),
    );
  }

  return result;
}
