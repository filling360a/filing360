// Creates (or resets) an admin account without needing email.
// Usage: npm run admin:create -- --email you@example.com --name "Your Name"
// Prints a temporary password once; the admin must choose a new one on first sign-in.
import { randomInt } from "node:crypto";
import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";

nextEnv.loadEnvConfig(process.cwd());

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, arg, i, all) => {
    if (arg.startsWith("--")) pairs.push([arg.slice(2), all[i + 1]]);
    return pairs;
  }, []),
);

const email = args.email?.trim().toLowerCase();
const fullName = args.name?.trim() || "Admin";
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('Usage: npm run admin:create -- --email you@example.com --name "Your Name"');
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set in .env.local");
  process.exit(1);
}

function tempPassword(length = 18) {
  const letters = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "23456789";
  const symbols = "!@#$%^&*-_=+";
  const all = letters + digits + symbols;
  const chars = [
    letters[randomInt(letters.length)],
    digits[randomInt(digits.length)],
    symbols[randomInt(symbols.length)],
    ...Array.from({ length: length - 3 }, () => all[randomInt(all.length)]),
  ];
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

const db = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false } });
const password = tempPassword();
const metadata = { full_name: fullName, must_change_password: true };

const { data: existing } = await db.from("profiles").select("id").ilike("email", email).maybeSingle();
let userId = existing?.id;

if (userId) {
  const { error } = await db.auth.admin.updateUserById(userId, { password, user_metadata: metadata, ban_duration: "none" });
  if (error) throw error;
} else {
  const { data, error } = await db.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: metadata });
  if (error) throw error;
  userId = data.user.id;
}

const { error: profileError } = await db
  .from("profiles")
  .upsert({ id: userId, email, full_name: fullName, role: "admin", is_active: true });
if (profileError) throw profileError;

const site = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
console.log(`\n${existing ? "Reset" : "Created"} admin account\n`);
console.log(`  Sign in:   ${site}/admin/login`);
console.log(`  Email:     ${email}`);
console.log(`  Password:  ${password}`);
console.log("\nYou'll be asked to choose your own password on first sign-in.\n");
