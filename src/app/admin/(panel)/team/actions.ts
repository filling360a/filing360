"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { assertStaff, AuthError } from "@/lib/auth/dal";
import { generateTempPassword, sendStaffAccessEmail } from "@/lib/auth/staffAccess";
import { isEmailConfigured } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

/** `credentials` is only returned when email isn't set up, so the admin can share it once. */
export type TeamActionState =
  | { ok?: boolean; error?: string; message?: string; credentials?: { email: string; password: string } }
  | undefined;

const ROLES = ["admin", "sales", "editor", "hr"] as const;

function fail(err: unknown): TeamActionState {
  if (err instanceof AuthError) return { error: err.message };
  console.error("[admin/team]", err);
  return { error: err instanceof Error ? err.message : "Something went wrong." };
}

const inviteSchema = z.object({
  email: z.email("Enter a valid email").transform((v) => v.toLowerCase()),
  full_name: z.string().trim().min(2, "Enter their name").max(120),
  role: z.enum(ROLES),
});

export async function inviteMember(_: TeamActionState, formData: FormData): Promise<TeamActionState> {
  try {
    const me = await assertStaff("team");
    const parsed = inviteSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };
    const { email, full_name, role } = parsed.data;
    const admin = createAdminClient();

    const { data: existing } = await admin.from("profiles").select("id").ilike("email", email).maybeSingle();
    let userId = existing?.id;
    let credentials: { email: string; password: string } | undefined;

    if (!userId && isEmailConfigured()) {
      const sent = await sendStaffAccessEmail({
        kind: "invite",
        email,
        name: full_name,
        invitedBy: me.full_name,
        sentBy: me.id,
      });
      if (!sent.ok) {
        if (sent.userId) await admin.auth.admin.deleteUser(sent.userId);
        return { error: `Couldn't send the invite: ${sent.error}` };
      }
      userId = sent.userId;
    } else if (!userId) {
      const password = generateTempPassword();
      const { data, error } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name, must_change_password: true },
      });
      if (error || !data.user) return { error: error?.message ?? "Could not create the account." };
      userId = data.user.id;
      credentials = { email, password };
    }

    const { error } = await admin.from("profiles").upsert({ id: userId!, email, full_name, role, is_active: true });
    if (error) return { error: error.message };

    revalidatePath("/admin/team");
    if (existing) return { ok: true, message: `${full_name} already had an account — role set to ${role}.` };
    if (credentials) {
      return {
        ok: true,
        credentials,
        message: `Account created for ${full_name}. Share these sign-in details privately — they'll be asked to set their own password on first sign-in.`,
      };
    }
    return { ok: true, message: `Invite sent to ${email}.` };
  } catch (err) {
    return fail(err);
  }
}

export async function resetMemberPassword(userId: string): Promise<TeamActionState> {
  try {
    const me = await assertStaff("team");
    if (!z.uuid().safeParse(userId).success) return { error: "Invalid request" };
    if (userId === me.id) return { error: "Use My account → Change password for your own account." };

    const admin = createAdminClient();
    const { data: target } = await admin.from("profiles").select("email, full_name").eq("id", userId).single();
    if (!target) return { error: "Team member not found" };

    if (isEmailConfigured()) {
      const sent = await sendStaffAccessEmail({ kind: "recovery", email: target.email, name: target.full_name, sentBy: me.id });
      if (!sent.ok) return { error: `Couldn't send the reset email: ${sent.error}` };
      return { ok: true, message: `Reset link sent to ${target.email}.` };
    }

    const { data: authUser } = await admin.auth.admin.getUserById(userId);
    const password = generateTempPassword();
    const { error } = await admin.auth.admin.updateUserById(userId, {
      password,
      user_metadata: { ...authUser.user?.user_metadata, must_change_password: true },
    });
    if (error) return { error: error.message };
    return {
      ok: true,
      credentials: { email: target.email, password },
      message: "New temporary password set. Share it privately — they'll choose their own on next sign-in.",
    };
  } catch (err) {
    return fail(err);
  }
}

const updateSchema = z.object({
  userId: z.uuid(),
  role: z.enum(ROLES).optional(),
  active: z.boolean().optional(),
});

export async function updateMember(input: { userId: string; role?: string; active?: boolean }): Promise<TeamActionState> {
  try {
    const me = await assertStaff("team");
    const parsed = updateSchema.safeParse(input);
    if (!parsed.success) return { error: "Invalid request" };
    const { userId, role, active } = parsed.data;
    if (userId === me.id) return { error: "You can't change your own role or access." };

    const admin = createAdminClient();
    const { data: target } = await admin.from("profiles").select("role, is_active").eq("id", userId).single();
    if (!target) return { error: "Team member not found" };

    const losingAdmin = target.role === "admin" && ((role && role !== "admin") || active === false);
    if (losingAdmin) {
      const { count } = await admin
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("role", "admin")
        .eq("is_active", true);
      if ((count ?? 0) <= 1) return { error: "Keep at least one active admin." };
    }

    const patch: { role?: (typeof ROLES)[number]; is_active?: boolean } = {};
    if (role) patch.role = role;
    if (active !== undefined) patch.is_active = active;
    const { error } = await admin.from("profiles").update(patch).eq("id", userId);
    if (error) return { error: error.message };

    if (active !== undefined) {
      // Blocks sign-in and refresh-token use for deactivated members.
      await admin.auth.admin.updateUserById(userId, { ban_duration: active ? "none" : "876000h" });
    }

    revalidatePath("/admin/team");
    return { ok: true, message: "Updated" };
  } catch (err) {
    return fail(err);
  }
}

const profileSchema = z.object({
  full_name: z.string().trim().min(2, "Enter your name").max(120),
  job_title: z.string().trim().max(120).transform((v) => v || null),
  bio: z.string().trim().max(1000).transform((v) => v || null),
  avatar_url: z
    .union([z.literal(""), z.url("Enter a valid image URL").max(500)])
    .transform((v) => v || null),
});

export async function updateOwnProfile(_: TeamActionState, formData: FormData): Promise<TeamActionState> {
  try {
    const me = await assertStaff("dashboard");
    const parsed = profileSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };
    const { error } = await createAdminClient().from("profiles").update(parsed.data).eq("id", me.id);
    if (error) return { error: error.message };
    revalidatePath("/admin", "layout");
    return { ok: true, message: "Profile saved" };
  } catch (err) {
    return fail(err);
  }
}
