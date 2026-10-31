import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getStaff } from "@/lib/auth/dal";
import { isSupabaseConfigured } from "@/lib/env";
import { UpdatePasswordForm } from "../AuthForms";

export const metadata: Metadata = { title: "Set password" };

export default async function UpdatePasswordPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const staff = await getStaff();
  if (!staff) redirect("/admin/login?error=link-expired");

  return (
    <>
      <h1 className="text-xl font-bold text-[#0f2a45]">Set your password</h1>
      <p className="mb-6 mt-1 text-sm text-[#5b6e7a]">Choose a strong password for {staff.email}.</p>
      <UpdatePasswordForm />
    </>
  );
}
