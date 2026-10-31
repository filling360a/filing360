import type { Metadata } from "next";
import { ForgotPasswordForm } from "../AuthForms";

export const metadata: Metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-xl font-bold text-[#0f2a45]">Reset your password</h1>
      <p className="mb-6 mt-1 text-sm text-[#5b6e7a]">We&apos;ll email you a secure link to set a new password.</p>
      <ForgotPasswordForm />
    </>
  );
}
