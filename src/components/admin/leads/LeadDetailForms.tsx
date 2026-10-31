"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import { addLeadActivity, deleteLead, emailLead, updateLead } from "@/app/admin/(panel)/leads/actions";
import { Alert, Button, inputClass, labelClass, LEAD_PRIORITIES, LEAD_STATUSES } from "@/components/admin/ui";
import { toIstInputValue } from "@/lib/format";
import type { Tables } from "@/lib/supabase/database.types";
import { siteConfig } from "@/lib/siteConfig";

type Team = { id: string; full_name: string | null; email: string }[];

export function LeadControls({ lead, team }: { lead: Tables<"leads">; team: Team }) {
  const [state, action, pending] = useActionState(updateLead.bind(null, lead.id), undefined);
  const [status, setStatus] = useState(lead.status);

  return (
    <form action={action} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="status" className={labelClass}>Status</label>
          <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className={inputClass}>
            {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="priority" className={labelClass}>Priority</label>
          <select id="priority" name="priority" defaultValue={lead.priority} className={inputClass}>
            {LEAD_PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
      </div>
      {status === "lost" && (
        <div>
          <label htmlFor="lost_reason" className={labelClass}>Reason lost</label>
          <input id="lost_reason" name="lost_reason" defaultValue={lead.lost_reason ?? ""} placeholder="e.g. Price, went with CA, not reachable" className={inputClass} />
        </div>
      )}
      <div>
        <label htmlFor="assigned_to" className={labelClass}>Owner</label>
        <select id="assigned_to" name="assigned_to" defaultValue={lead.assigned_to ?? ""} className={inputClass}>
          <option value="">Unassigned</option>
          {team.map((m) => <option key={m.id} value={m.id}>{m.full_name || m.email}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="next_follow_up_at" className={labelClass}>Next follow-up (IST)</label>
        <input id="next_follow_up_at" name="next_follow_up_at" type="datetime-local" defaultValue={toIstInputValue(lead.next_follow_up_at)} className={inputClass} />
      </div>
      <div>
        <label htmlFor="estimated_value" className={labelClass}>Estimated value (₹)</label>
        <input id="estimated_value" name="estimated_value" inputMode="numeric" defaultValue={lead.estimated_value ?? ""} placeholder="e.g. 9999" className={inputClass} />
      </div>
      <div>
        <label htmlFor="tags" className={labelClass}>Tags</label>
        <input id="tags" name="tags" defaultValue={lead.tags.join(", ")} placeholder="comma, separated" className={inputClass} />
      </div>
      {state?.error && <Alert>{state.error}</Alert>}
      {state?.ok && <Alert tone="green">{state.message}</Alert>}
      <Button type="submit" disabled={pending} className="w-full">{pending ? "Saving…" : "Save changes"}</Button>
    </form>
  );
}

export function ActivityComposer({ leadId }: { leadId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(async (prev: Awaited<ReturnType<typeof addLeadActivity>>, data: FormData) => {
    const res = await addLeadActivity(leadId, prev, data);
    if (res?.ok) formRef.current?.reset();
    return res;
  }, undefined);

  return (
    <form ref={formRef} action={action} className="space-y-2">
      <textarea name="body" rows={3} placeholder="Add a note or summarise a call…" className={inputClass} required maxLength={4000} />
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" name="type" value="note" size="sm" disabled={pending}>Add note</Button>
        <Button type="submit" name="type" value="call" size="sm" variant="secondary" disabled={pending}>Log call</Button>
        {state?.error && <span className="text-[12.5px] font-medium text-[#b91c1c]">{state.error}</span>}
        {state?.ok && <span className="text-[12.5px] font-medium text-[#0b6550]">{state.message}</span>}
      </div>
    </form>
  );
}

const TEMPLATES = [
  {
    label: "Couldn't reach you",
    subject: "Tried calling you about your request",
    body: (interest: string) =>
      `We tried calling you regarding your enquiry${interest}. Please let us know a convenient time to call, or reach us directly at ${siteConfig.contact.phone}.`,
  },
  {
    label: "Documents needed",
    subject: "Documents needed to get started",
    body: (interest: string) =>
      `Thanks for speaking with us${interest}. To get started, please reply to this email with the following documents:\n\n- PAN card\n- Aadhaar card\n- Address proof\n- Passport-size photograph\n\nOnce we receive these, we'll begin right away.`,
  },
  {
    label: "Quote follow-up",
    subject: "Following up on your quote",
    body: (interest: string) =>
      `Just following up on the estimate we shared${interest}. Do you have any questions? We'd be happy to walk you through the process on a quick call.`,
  },
];

export function EmailComposer({ leadId, name, interest }: { leadId: string; name: string; interest: string | null }) {
  const formRef = useRef<HTMLFormElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [state, action, pending] = useActionState(async (prev: Awaited<ReturnType<typeof emailLead>>, data: FormData) => {
    const res = await emailLead(leadId, prev, data);
    if (res?.ok) formRef.current?.reset();
    return res;
  }, undefined);
  const forService = interest ? ` for ${interest}` : "";

  return (
    <form ref={formRef} action={action} className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {TEMPLATES.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={() => {
              if (subjectRef.current) subjectRef.current.value = t.subject;
              if (bodyRef.current) bodyRef.current.value = t.body(forService);
            }}
            className="rounded-full border border-[#d0dcd6] px-2 py-0.5 text-[11.5px] font-medium text-[#4a5d68] hover:bg-[#f3f7fa]"
          >
            {t.label}
          </button>
        ))}
      </div>
      <input ref={subjectRef} name="subject" placeholder="Subject" className={inputClass} required maxLength={160} />
      <textarea ref={bodyRef} name="body" rows={5} placeholder={`Message to ${name.split(" ")[0]}…`} className={inputClass} required maxLength={5000} />
      {state?.error && <Alert>{state.error}</Alert>}
      {state?.ok && <Alert tone="green">{state.message}</Alert>}
      <Button type="submit" disabled={pending} className="w-full">{pending ? "Sending…" : "Send email"}</Button>
      <p className="text-[11.5px] text-[#8a9ba6]">Sent from the company address; replies come to your inbox.</p>
    </form>
  );
}

export function DeleteLeadButton({ leadId }: { leadId: string }) {
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
          if (!window.confirm("Delete this lead and its history permanently?")) return;
          start(async () => {
            const res = await deleteLead(leadId);
            if (res?.error) setError(res.error);
          });
        }}
      >
        {pending ? "Deleting…" : "Delete lead"}
      </Button>
      {error && <p className="mt-2 text-[12.5px] text-[#b91c1c]">{error}</p>}
    </>
  );
}
