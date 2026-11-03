"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import {
  inviteMember,
  resendInvite,
  resetMemberPassword,
  updateMember,
  updateOwnProfile,
} from "@/app/admin/(panel)/team/actions";
import { Alert, Button, inputClass, labelClass } from "@/components/admin/ui";
import type { AppRole, Tables } from "@/lib/supabase/database.types";

function CredentialsBox({ email, password }: { email: string; password: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(`Admin panel: ${window.location.origin}/admin/login\nEmail: ${email}\nTemporary password: ${password}`);
    setCopied(true);
  };
  return (
    <div className="rounded-lg border border-[#fde68a] bg-[#fffbeb] p-3 text-left text-[12.5px] text-[#78350f]">
      <p className="font-semibold">Shown only once — copy it now.</p>
      <dl className="mt-2 space-y-1 font-mono text-[12.5px] text-[#0f2a45]">
        <div className="flex gap-2"><dt className="w-[70px] shrink-0 text-[#92400e]">Email</dt><dd className="break-all">{email}</dd></div>
        <div className="flex gap-2"><dt className="w-[70px] shrink-0 text-[#92400e]">Password</dt><dd className="break-all">{password}</dd></div>
      </dl>
      <Button type="button" size="sm" variant="secondary" className="mt-2.5" onClick={copy}>
        {copied ? "Copied" : "Copy sign-in details"}
      </Button>
    </div>
  );
}

export function InviteMemberForm({ emailEnabled }: { emailEnabled: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(async (prev: Awaited<ReturnType<typeof inviteMember>>, data: FormData) => {
    const res = await inviteMember(prev, data);
    if (res?.ok) formRef.current?.reset();
    return res;
  }, undefined);

  return (
    <form ref={formRef} action={action} className="space-y-3">
      <div>
        <label htmlFor="invite-name" className={labelClass}>Full name</label>
        <input id="invite-name" name="full_name" required maxLength={120} className={inputClass} />
      </div>
      <div>
        <label htmlFor="invite-email" className={labelClass}>Work email</label>
        <input id="invite-email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="invite-role" className={labelClass}>Role</label>
        <select id="invite-role" name="role" defaultValue="sales" className={inputClass}>
          <option value="sales">Sales — leads</option>
          <option value="editor">Editor — blog</option>
          <option value="hr">HR — careers &amp; applicants</option>
          <option value="admin">Admin — everything</option>
        </select>
      </div>
      {state?.error && <Alert>{state.error}</Alert>}
      {state?.ok && <Alert tone="green">{state.message}</Alert>}
      {state?.credentials && <CredentialsBox {...state.credentials} />}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? (emailEnabled ? "Sending…" : "Creating…") : emailEnabled ? "Send invite" : "Create account"}
      </Button>
      <p className="text-[11.5px] text-[#8a9ba6]">
        {emailEnabled
          ? "They'll get an email to set their password. The invite link expires in 15 minutes — use Resend invite if it lapses."
          : "Email isn't set up yet, so you'll get a temporary password to share. They'll set their own on first sign-in."}
      </p>
    </form>
  );
}

export function MemberControls({
  userId,
  role,
  active,
  emailEnabled,
  invitePending = false,
}: {
  userId: string;
  role: AppRole | null;
  active: boolean;
  emailEnabled: boolean;
  /** True when the member was invited but has never signed in. */
  invitePending?: boolean;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<Awaited<ReturnType<typeof resetMemberPassword>>>(undefined);

  const run = (input: { role?: string; active?: boolean }) =>
    start(async () => {
      setError(null);
      const res = await updateMember({ userId, ...input });
      if (res?.error) setError(res.error);
    });

  const resetPassword = () => {
    const prompt = emailEnabled
      ? "Email this member a link to choose a new password?"
      : "Replace this member's password with a new temporary one? Their current password will stop working.";
    if (!window.confirm(prompt)) return;
    start(async () => {
      setError(null);
      const res = await resetMemberPassword(userId);
      if (res?.error) setError(res.error);
      setNotice(res?.ok ? res : undefined);
    });
  };

  const resend = () => {
    if (!window.confirm("Send a fresh invite email? The new link expires in 15 minutes.")) return;
    start(async () => {
      setError(null);
      const res = await resendInvite(userId);
      if (res?.error) setError(res.error);
      setNotice(res?.ok ? res : undefined);
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <select
          aria-label="Role"
          defaultValue={role ?? ""}
          disabled={pending}
          onChange={(e) => e.target.value && run({ role: e.target.value })}
          className={`${inputClass} !w-auto !py-1.5 !text-[12.5px]`}
        >
          {!role && <option value="">No access</option>}
          <option value="admin">Admin</option>
          <option value="sales">Sales</option>
          <option value="editor">Editor</option>
          <option value="hr">HR</option>
        </select>
        <Button
          type="button"
          size="sm"
          variant={active ? "danger" : "secondary"}
          disabled={pending}
          onClick={() => {
            if (active && !window.confirm("Deactivate this member? They'll be signed out and can't log in.")) return;
            run({ active: !active });
          }}
        >
          {active ? "Deactivate" : "Reactivate"}
        </Button>
        {invitePending && emailEnabled ? (
          <Button type="button" size="sm" variant="secondary" disabled={pending || !active} onClick={resend}>
            Resend invite
          </Button>
        ) : (
          <Button type="button" size="sm" variant="secondary" disabled={pending || !active} onClick={resetPassword}>
            Reset password
          </Button>
        )}
      </div>
      {error && <span className="text-[12px] text-[#b91c1c]">{error}</span>}
      {notice?.credentials ? (
        <div className="mt-1 w-[300px]">
          <CredentialsBox {...notice.credentials} />
        </div>
      ) : (
        notice?.message && <span className="text-[12px] text-[#0b6550]">{notice.message}</span>
      )}
    </div>
  );
}

export function ProfileForm({ profile }: { profile: Tables<"profiles"> }) {
  const [state, action, pending] = useActionState(updateOwnProfile, undefined);
  return (
    <form action={action} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="full_name" className={labelClass}>Full name</label>
          <input id="full_name" name="full_name" defaultValue={profile.full_name ?? ""} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="job_title" className={labelClass}>Title / qualification</label>
          <input id="job_title" name="job_title" defaultValue={profile.job_title ?? ""} placeholder="e.g. Chartered Accountant" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="avatar_url" className={labelClass}>Photo URL</label>
        <input id="avatar_url" name="avatar_url" type="url" defaultValue={profile.avatar_url ?? ""} placeholder="https://…" className={inputClass} />
      </div>
      <div>
        <label htmlFor="bio" className={labelClass}>Author bio</label>
        <textarea id="bio" name="bio" rows={4} maxLength={1000} defaultValue={profile.bio ?? ""} className={inputClass} placeholder="Shown under blog posts you write. Mention qualifications and experience." />
      </div>
      {state?.error && <Alert>{state.error}</Alert>}
      {state?.ok && <Alert tone="green">{state.message}</Alert>}
      <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save profile"}</Button>
    </form>
  );
}
