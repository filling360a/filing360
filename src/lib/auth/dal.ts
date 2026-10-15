import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { AppRole, Tables } from "@/lib/supabase/database.types";

export type StaffProfile = Tables<"profiles"> & { role: AppRole; mustChangePassword: boolean };

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Admin",
  sales: "Sales",
  editor: "Editor",
  hr: "HR",
};

/** Sections of the admin panel and which roles can use them. */
export const ACCESS = {
  dashboard: ["admin", "sales", "editor", "hr"],
  leads: ["admin", "sales"],
  blog: ["admin", "editor"],
  careers: ["admin", "hr"],
  team: ["admin"],
} as const satisfies Record<string, readonly AppRole[]>;

export type Section = keyof typeof ACCESS;

export function canAccess(role: AppRole, section: Section): boolean {
  return (ACCESS[section] as readonly AppRole[]).includes(role);
}

/** Signed-in, active staff member or null. Memoised per request. */
export const getStaff = cache(async (): Promise<StaffProfile | null> => {
  await connection();
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) return null;

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (!profile || !profile.is_active || !profile.role) return null;
  const metadata = claims.claims.user_metadata as { must_change_password?: boolean } | undefined;
  return { ...profile, role: profile.role, mustChangePassword: Boolean(metadata?.must_change_password) };
});

/** For pages: redirects instead of throwing. */
export async function requireStaff(section: Section = "dashboard"): Promise<StaffProfile> {
  const staff = await getStaff();
  if (!staff) redirect("/admin/login?error=no-access");
  if (staff.mustChangePassword) redirect("/admin/update-password");
  if (!canAccess(staff.role, section)) redirect("/admin?denied=1");
  return staff;
}

export class AuthError extends Error {}

/** For server actions and route handlers: throws so callers return an error. */
export async function assertStaff(section: Section): Promise<StaffProfile> {
  const staff = await getStaff();
  if (!staff) throw new AuthError("You are signed out. Please sign in again.");
  if (!canAccess(staff.role, section)) throw new AuthError("You don't have access to this.");
  return staff;
}
