import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { UpdatePasswordForm } from "../AuthForms";

export const metadata: Metadata = { title: "Set password" };

export default async function UpdatePasswordPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) redirect("/admin/login?error=link-expired");

  return (
    <>
      <h1 className="text-xl font-bold text-[#0b2c5e]">Set your password</h1>
      <p className="mb-6 mt-1 text-sm text-[#64748b]">Choose a strong password for {String(data.claims.email ?? "your account")}.</p>
      <UpdatePasswordForm />
    </>
  );
}
