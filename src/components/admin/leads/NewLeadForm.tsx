"use client";

import { useActionState } from "react";
import { createLead } from "@/app/admin/(panel)/leads/actions";
import { Alert, Button, inputClass, labelClass, LEAD_PRIORITIES } from "@/components/admin/ui";

const SOURCES = [
  ["phone-call", "Phone call"],
  ["whatsapp", "WhatsApp"],
  ["referral", "Referral"],
  ["walk-in", "Walk-in"],
  ["email", "Email"],
  ["event", "Event"],
  ["other", "Other"],
] as const;

type Props = {
  team: { id: string; full_name: string | null; email: string }[];
  currentUserId: string;
  services: string[];
};

export function NewLeadForm({ team, currentUserId, services }: Props) {
  const [state, action, pending] = useActionState(createLead, undefined);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={labelClass}>Name *</label>
        <input id="name" name="name" required maxLength={120} className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>Mobile *</label>
        <input id="phone" name="phone" type="tel" required inputMode="tel" className={inputClass} placeholder="98765 43210" />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" name="email" type="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="city" className={labelClass}>City</label>
        <input id="city" name="city" className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="interest" className={labelClass}>Service</label>
        <input id="interest" name="interest" list="service-options" className={inputClass} placeholder="Start typing or pick a service" />
        <datalist id="service-options">
          {services.map((s) => <option key={s} value={s} />)}
        </datalist>
      </div>
      <div>
        <label htmlFor="source" className={labelClass}>Came from</label>
        <select id="source" name="source" defaultValue="phone-call" className={inputClass}>
          {SOURCES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="priority" className={labelClass}>Priority</label>
        <select id="priority" name="priority" defaultValue="normal" className={inputClass}>
          {LEAD_PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="assigned_to" className={labelClass}>Owner</label>
        <select id="assigned_to" name="assigned_to" defaultValue={currentUserId} className={inputClass}>
          <option value="">Unassigned</option>
          {team.map((m) => <option key={m.id} value={m.id}>{m.full_name || m.email}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelClass}>Notes from the conversation</label>
        <textarea id="message" name="message" rows={4} maxLength={2000} className={inputClass} />
      </div>
      {state?.error && <div className="sm:col-span-2"><Alert>{state.error}</Alert></div>}
      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Create lead"}</Button>
      </div>
    </form>
  );
}
