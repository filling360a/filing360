import type { Metadata } from "next";
import { Alert } from "@/components/admin/ui";
import { isSupabaseConfigured } from "@/lib/env";
import { LoginForm } from "../AuthForms";

export const metadata: Metadata = { title: "Sign in" };

const NOTICES: Record<string, string> = {
  "no-access": "Your account doesn't have admin access. Ask an admin to assign you a role.",
  "link-expired": "That link has expired or was already used. Request a new one.",
};

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const { next, error } = await searchParams;
  return (
    <>
      <h1 className="text-xl font-bold text-[#0f2a45]">Sign in</h1>
      <p className="mb-6 mt-1 text-sm text-[#5b6e7a]">Leads, blog and team management.</p>
      {!isSupabaseConfigured() && (
        <div className="mb-4">
          <Alert tone="amber">Supabase keys are missing. Copy .env.example to .env.local and fill them in.</Alert>
        </div>
      )}
      <LoginForm
        next={typeof next === "string" ? next : undefined}
        notice={typeof error === "string" ? NOTICES[error] : undefined}
      />
    </>
  );
}
