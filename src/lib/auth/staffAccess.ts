import "server-only";
import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { StaffAccessEmail } from "@/emails/StaffAccessEmail";
import { sendEmail } from "@/lib/email/send";
import { env } from "@/lib/env";
import { siteConfig } from "@/lib/siteConfig";
import { createAdminClient } from "@/lib/supabase/admin";

/** Invite / access links expire after this many minutes. */
export const STAFF_INVITE_TTL_MINUTES = 15;
const STAFF_INVITE_TTL_MS = STAFF_INVITE_TTL_MINUTES * 60 * 1000;

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

function inviteSig(issuedAtMs: number): string {
  return createHmac("sha256", env.ipHashSalt).update(`staff-invite:${issuedAtMs}`).digest("hex");
}

/** Appends a signed issued-at timestamp so /auth/confirm can enforce the 15-minute window. */
export function withInviteExpiry(link: string): string {
  const issued = Date.now();
  const url = new URL(link);
  url.searchParams.set("issued", String(issued));
  url.searchParams.set("sig", inviteSig(issued));
  return url.toString();
}

/** Returns false when the invite link is missing a valid signature or older than 15 minutes. */
export function isInviteLinkStillValid(issued: string | null, sig: string | null): boolean {
  if (!issued || !sig) return false;
  const issuedAt = Number(issued);
  if (!Number.isFinite(issuedAt) || issuedAt <= 0) return false;
  const expected = inviteSig(issuedAt);
  try {
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  return Date.now() - issuedAt <= STAFF_INVITE_TTL_MS;
}

type AccessEmail = {
  kind: "invite" | "recovery";
  email: string;
  name?: string | null;
  invitedBy?: string | null;
  sentBy?: string;
  /** When resending to an existing auth user, pass their id so we regenerate a link without creating a duplicate. */
  existingUserId?: string;
};

/**
 * Generates a one-time Supabase auth link and emails it through Resend, so invites and resets
 * don't depend on Supabase's built-in mailer or its dashboard templates.
 * For "invite" this also creates the auth user (unless `existingUserId` is set).
 */
export async function sendStaffAccessEmail({ kind, email, name, invitedBy, sentBy, existingUserId }: AccessEmail) {
  const admin = createAdminClient();
  const issuedAt = new Date().toISOString();

  let linkType: "invite" | "recovery" = kind;
  let userId = existingUserId;

  if (kind === "invite" && existingUserId) {
    // Existing member: regenerate a password-set link without creating a second user.
    linkType = "recovery";
  }

  const { data, error } = await admin.auth.admin.generateLink(
    linkType === "invite"
      ? {
          type: "invite",
          email,
          options: {
            data: {
              full_name: name ?? undefined,
              invite_sent_at: issuedAt,
              must_change_password: true,
            },
          },
        }
      : { type: "recovery", email },
  );

  if (error || !data.properties?.hashed_token || !data.user) {
    return { ok: false as const, error: error?.message ?? "Could not create the sign-in link." };
  }

  userId = data.user.id;

  // Keep invite timestamp on the user so admins can see pending state.
  if (kind === "invite") {
    await admin.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...data.user.user_metadata,
        full_name: name ?? data.user.user_metadata?.full_name,
        invite_sent_at: issuedAt,
        must_change_password: true,
      },
    });
  }

  const rawLink = `${env.siteUrl}/auth/confirm?${new URLSearchParams({
    token_hash: data.properties.hashed_token,
    type: linkType,
    next: "/admin/update-password",
  })}`;
  const link = kind === "invite" ? withInviteExpiry(rawLink) : rawLink;

  const sent = await sendEmail({
    to: email,
    subject:
      kind === "invite"
        ? `You're invited to the ${siteConfig.brandName} admin`
        : `Reset your ${siteConfig.brandName} admin password`,
    react: StaffAccessEmail({
      kind,
      name,
      link,
      invitedBy,
      expiresInMinutes: kind === "invite" ? STAFF_INVITE_TTL_MINUTES : 60,
    }),
    template: kind === "invite" ? "staff-invite" : "staff-password-reset",
    sentBy,
    idempotencyKey: kind === "invite" ? `staff-invite/${userId}/${issuedAt}` : undefined,
  });
  if (!sent.ok) return { ok: false as const, error: sent.error, userId };
  return { ok: true as const, userId };
}

/** True when the auth user has never completed first sign-in (invite still pending). */
export function isInvitePending(user: { last_sign_in_at?: string | null; email_confirmed_at?: string | null } | null | undefined) {
  if (!user) return false;
  return !user.last_sign_in_at;
}
