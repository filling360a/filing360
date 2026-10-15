import "server-only";
import { randomInt } from "node:crypto";
import { StaffAccessEmail } from "@/emails/StaffAccessEmail";
import { sendEmail } from "@/lib/email/send";
import { env } from "@/lib/env";
import { siteConfig } from "@/lib/siteConfig";
import { createAdminClient } from "@/lib/supabase/admin";

const LETTERS = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const DIGITS = "23456789";
const SYMBOLS = "!@#$%^&*-_=+";

/** Random password that satisfies the update-password rules (letter + number, ≥10 chars). */
export function generateTempPassword(length = 18): string {
  const all = LETTERS + DIGITS + SYMBOLS;
  const chars = [
    LETTERS[randomInt(LETTERS.length)],
    DIGITS[randomInt(DIGITS.length)],
    SYMBOLS[randomInt(SYMBOLS.length)],
    ...Array.from({ length: length - 3 }, () => all[randomInt(all.length)]),
  ];
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

type AccessEmail = {
  kind: "invite" | "recovery";
  email: string;
  name?: string | null;
  invitedBy?: string | null;
  sentBy?: string;
};

/**
 * Generates a one-time Supabase auth link and emails it through Resend, so invites and resets
 * don't depend on Supabase's built-in mailer or its dashboard templates.
 * For "invite" this also creates the auth user.
 */
export async function sendStaffAccessEmail({ kind, email, name, invitedBy, sentBy }: AccessEmail) {
  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.generateLink(
    kind === "invite"
      ? { type: "invite", email, options: { data: { full_name: name ?? undefined } } }
      : { type: "recovery", email },
  );
  if (error || !data.properties?.hashed_token || !data.user) {
    return { ok: false as const, error: error?.message ?? "Could not create the sign-in link." };
  }

  const link = `${env.siteUrl}/auth/confirm?${new URLSearchParams({
    token_hash: data.properties.hashed_token,
    type: kind,
    next: "/admin/update-password",
  })}`;

  const sent = await sendEmail({
    to: email,
    subject: kind === "invite" ? `You're invited to the ${siteConfig.brandName} admin` : `Reset your ${siteConfig.brandName} admin password`,
    react: StaffAccessEmail({ kind, name, link, invitedBy }),
    template: kind === "invite" ? "staff-invite" : "staff-password-reset",
    sentBy,
  });
  if (!sent.ok) return { ok: false as const, error: sent.error, userId: data.user.id };
  return { ok: true as const, userId: data.user.id };
}
