"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getStaff } from "@/lib/auth/dal";
import { sendStaffAccessEmail } from "@/lib/auth/staffAccess";
import { isEmailConfigured, isSupabaseAdminConfigured, isSupabaseConfigured } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = { error?: string; message?: string } | undefined;

const NOT_CONFIGURED = "Supabase is not configured yet. Add the keys from .env.example to .env.local.";

function safeNext(value: FormDataEntryValue | null): string {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
}

const signInSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export async function signIn(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return { error: NOT_CONFIGURED };
  const parsed = signInSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { error: "Incorrect email or password." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, is_active")
    .eq("id", data.user.id)
    .maybeSingle();
  if (!profile?.role || !profile.is_active) {
    await supabase.auth.signOut();
    return { error: "Your account doesn't have admin access yet. Ask an admin to assign you a role." };
  }

  if (data.user.user_metadata?.must_change_password) redirect("/admin/update-password");
  redirect(safeNext(formData.get("next")));
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function requestPasswordReset(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return { error: NOT_CONFIGURED };
  const email = z.email().safeParse(formData.get("email"));
  if (!email.success) return { error: "Enter a valid email" };

  if (!isEmailConfigured() || !isSupabaseAdminConfigured()) {
    return { error: "Password reset by email isn't switched on yet. Ask an admin to reset your password from Admin → Team." };
  }

  const { data: member } = await createAdminClient()
    .from("profiles")
    .select("email, full_name")
    .ilike("email", email.data)
    .eq("is_active", true)
    .not("role", "is", null)
    .maybeSingle();
  if (member) await sendStaffAccessEmail({ kind: "recovery", email: member.email, name: member.full_name });

  // Same response whether or not the account exists, to avoid leaking emails.
  return { message: "If that email belongs to a team member, a reset link is on its way." };
}

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(10, "Use at least 10 characters")
      .regex(/[a-z]/i, "Include a letter")
      .regex(/\d/, "Include a number"),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, { message: "Passwords don't match", path: ["confirm"] });

export async function updatePassword(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return { error: NOT_CONFIGURED };
  const staff = await getStaff();
  if (!staff) return { error: "You are signed out. Please sign in again." };
  const parsed = passwordSchema.safeParse({ password: formData.get("password"), confirm: formData.get("confirm") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
    data: { must_change_password: false },
  });
  if (error) return { error: error.message };
  // The session token still carries the old metadata; refresh so the panel stops asking.
  await supabase.auth.refreshSession();
  redirect("/admin");
}
