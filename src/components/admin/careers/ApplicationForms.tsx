"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import { addApplicationNote, deleteApplication, emailApplicant, updateApplication } from "@/app/admin/(panel)/careers/actions";
import { Alert, Button, inputClass, labelClass } from "@/components/admin/ui";
import { APPLICATION_STATUSES } from "@/lib/careers/constants";
import type { ApplicationStatus } from "@/lib/supabase/database.types";

type Recruiter = { id: string; full_name: string | null; email: string };

export function PipelineControls({
  application,
  recruiters,
}: {
  application: { id: string; status: ApplicationStatus; rating: number | null; assigned_to: string | null };
  recruiters: Recruiter[];
}) {
  const [state, action, pending] = useActionState(updateApplication.bind(null, application.id), undefined);
  const [rating, setRating] = useState(application.rating ?? 0);

  return (
    <form action={action} className="space-y-3">
      <div>
        <label htmlFor="status" className={labelClass}>Stage</label>
        <select id="status" name="status" defaultValue={application.status} className={inputClass}>
          {APPLICATION_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
      <fieldset>
        <legend className={labelClass}>Rating</legend>
        <input type="hidden" name="rating" value={rating || ""} />
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(rating === n ? 0 : n)}
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
              aria-pressed={rating >= n}
              className={`text-[22px] leading-none transition ${rating >= n ? "text-[#f59e0b]" : "text-[#d7e4de] hover:text-[#fcd34d]"}`}
            >
              ★
            </button>
          ))}
          {rating > 0 && <span className="ml-2 text-[12px] text-[#5b6e7a]">{rating}/5</span>}
        </div>
      </fieldset>
      <div>
        <label htmlFor="assigned_to" className={labelClass}>Owner</label>
        <select id="assigned_to" name="assigned_to" defaultValue={application.assigned_to ?? ""} className={inputClass}>
          <option value="">Unassigned</option>
          {recruiters.map((m) => <option key={m.id} value={m.id}>{m.full_name || m.email}</option>)}
        </select>
      </div>
      {state?.error && <Alert>{state.error}</Alert>}
      {state?.ok && <Alert tone="green">{state.message}</Alert>}
      <Button type="submit" disabled={pending} className="w-full">{pending ? "Saving…" : "Save changes"}</Button>
    </form>
  );
}

export function NoteComposer({ applicationId }: { applicationId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(async (prev: Awaited<ReturnType<typeof addApplicationNote>>, data: FormData) => {
    const res = await addApplicationNote(applicationId, prev, data);
    if (res?.ok) formRef.current?.reset();
    return res;
  }, undefined);

  return (
    <form ref={formRef} action={action} className="space-y-2">
      <textarea name="body" rows={3} placeholder="Interview feedback, call notes, next steps…" className={inputClass} required maxLength={4000} />
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" size="sm" disabled={pending}>Add note</Button>
        {state?.error && <span className="text-[12.5px] font-medium text-[#b91c1c]">{state.error}</span>}
        {state?.ok && <span className="text-[12.5px] font-medium text-[#0b6550]">{state.message}</span>}
      </div>
    </form>
  );
}

type Template = { label: string; subject: (role: string) => string; body: (role: string) => string; nextStatus?: ApplicationStatus };

const TEMPLATES: Template[] = [
  {
    label: "Interview invite",
    subject: (role) => `Interview for ${role} at Filing360`,
    body: (role) =>
      `Thank you for applying for the ${role} role. We enjoyed reading your application and would like to invite you to an interview.\n\nPlease reply with two or three time slots that work for you over the next few days, and we'll confirm one.\n\nThe conversation will take about 30–45 minutes.`,
    nextStatus: "interview",
  },
  {
    label: "Request details",
    subject: (role) => `A few more details for your ${role} application`,
    body: () =>
      `Thanks for your application. Before we move forward, could you reply with the following?\n\n- Your current and expected CTC\n- Your notice period\n- A good time for a short call`,
  },
  {
    label: "Regret",
    subject: (role) => `Your application for ${role}`,
    body: (role) =>
      `Thank you for your interest in the ${role} role and for the time you put into your application.\n\nAfter careful review, we've decided to move forward with other candidates whose experience more closely matches what we need right now. We'll keep your details on file and reach out if a suitable opening comes up.\n\nWe wish you all the best.`,
    nextStatus: "rejected",
  },
];

export function ApplicantEmailComposer({ applicationId, name, role }: { applicationId: string; name: string; role: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [nextStatus, setNextStatus] = useState<ApplicationStatus | "">("");
  const [state, action, pending] = useActionState(async (prev: Awaited<ReturnType<typeof emailApplicant>>, data: FormData) => {
    const res = await emailApplicant(applicationId, prev, data);
    if (res?.ok) {
      formRef.current?.reset();
      setNextStatus("");
    }
    return res;
  }, undefined);

  return (
    <form ref={formRef} action={action} className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {TEMPLATES.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={() => {
              if (subjectRef.current) subjectRef.current.value = t.subject(role);
              if (bodyRef.current) bodyRef.current.value = t.body(role);
              setNextStatus(t.nextStatus ?? "");
            }}
            className="rounded-full border border-[#d0dcd6] px-2 py-0.5 text-[11.5px] font-medium text-[#4a5d68] hover:bg-[#f3f7fa]"
          >
            {t.label}
          </button>
        ))}
      </div>
      <input ref={subjectRef} name="subject" placeholder="Subject" className={inputClass} required maxLength={160} />
      <textarea ref={bodyRef} name="body" rows={6} placeholder={`Message to ${name.split(" ")[0]}…`} className={inputClass} required maxLength={5000} />
      <div>
        <label htmlFor="next_status" className={labelClass}>After sending, move to</label>
        <select id="next_status" name="next_status" value={nextStatus} onChange={(e) => setNextStatus(e.target.value as ApplicationStatus | "")} className={inputClass}>
          <option value="">Keep current stage</option>
          {APPLICATION_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
      {state?.error && <Alert>{state.error}</Alert>}
      {state?.ok && <Alert tone="green">{state.message}</Alert>}
      <Button type="submit" disabled={pending} className="w-full">{pending ? "Sending…" : "Send email"}</Button>
      <p className="text-[11.5px] text-[#8a9ba6]">Sent from the company address; replies come to your inbox.</p>
    </form>
  );
}

export function DeleteApplicationButton({ applicationId }: { applicationId: string }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <Button
        type="button"
        variant="danger"
        size="sm"
        disabled={pending}
        onClick={() => {
          if (!window.confirm("Permanently delete this application, its résumé and its history? Use this for data-deletion requests.")) return;
          start(async () => {
            const res = await deleteApplication(applicationId);
            if (res?.error) setError(res.error);
          });
        }}
      >
        {pending ? "Deleting…" : "Delete application"}
      </Button>
      {error && <p className="mt-2 text-[12.5px] text-[#b91c1c]">{error}</p>}
    </>
  );
}
