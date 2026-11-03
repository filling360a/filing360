/**
 * Smoke-test Resend using .env.local.
 * Usage: node scripts/test-email.mjs [to@email.com]
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Resend } from "resend";

function loadEnv(path) {
  const out = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const env = loadEnv(resolve(process.cwd(), ".env.local"));
const apiKey = env.RESEND_API_KEY;
const from = env.EMAIL_FROM || "Filingedge360 <noreply@filingedge360.com>";
const to = process.argv[2] || env.LEAD_NOTIFY_EMAILS?.split(",")[0]?.trim() || env.EMAIL_REPLY_TO;

if (!apiKey) {
  console.error("RESEND_API_KEY missing in .env.local");
  process.exit(1);
}
if (!to) {
  console.error("Pass a recipient: node scripts/test-email.mjs you@example.com");
  process.exit(1);
}

const resend = new Resend(apiKey);
const { data, error } = await resend.emails.send({
  from,
  to: [to],
  subject: "Filing360 email smoke test",
  html: "<p>Resend is configured. Lead confirmations, admin alerts and team invites can send.</p>",
  text: "Resend is configured. Lead confirmations, admin alerts and team invites can send.",
});

if (error) {
  console.error("FAILED:", error.message);
  process.exit(1);
}
console.log("OK — sent test email to", to, "| id:", data?.id ?? "(none)");
