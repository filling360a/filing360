import "server-only";

function read(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export const env = {
  siteUrl: (read("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000").replace(/\/$/, ""),
  supabaseUrl: read("NEXT_PUBLIC_SUPABASE_URL"),
  supabasePublishableKey:
    read("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ?? read("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseSecretKey: read("SUPABASE_SECRET_KEY") ?? read("SUPABASE_SERVICE_ROLE_KEY"),
  resendApiKey: read("RESEND_API_KEY"),
  emailFrom: read("EMAIL_FROM") ?? "Filingedge360 <noreply@filingedge360.com>",
  emailReplyTo: read("EMAIL_REPLY_TO") ?? "support@filingedge360.com",
  /** Admin inboxes for new-lead alerts. Falls back to support@ so alerts still send. */
  leadNotifyTo: (() => {
    const listed = (read("LEAD_NOTIFY_EMAILS") ?? "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    if (listed.length) return listed;
    const fallback = read("EMAIL_REPLY_TO") ?? "support@filingedge360.com";
    return [fallback];
  })(),
  get ipHashSalt() {
    const salt = read("IP_HASH_SALT");
    if (salt) return salt;
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "IP_HASH_SALT must be set in production. Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"",
      );
    }
    return "filing360-dev-salt";
  },
  /** Where new job applications are announced; falls back to the lead inboxes. */
  careersNotifyTo: (read("CAREERS_NOTIFY_EMAILS") ?? read("LEAD_NOTIFY_EMAILS") ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean),
  /** Shared secret Vercel Cron sends as a Bearer token. */
  cronSecret: read("CRON_SECRET"),
};

export function isSupabaseConfigured(): boolean {
  return Boolean(env.supabaseUrl && env.supabasePublishableKey);
}

export function isSupabaseAdminConfigured(): boolean {
  return Boolean(env.supabaseUrl && env.supabaseSecretKey);
}

export function isEmailConfigured(): boolean {
  return Boolean(env.resendApiKey);
}
