"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { bulkUpdateLeads } from "@/app/admin/(panel)/leads/actions";
import { Alert, buttonClass, inputClass, LEAD_PRIORITIES, LEAD_STATUSES, LeadStatusBadge, PriorityBadge } from "@/components/admin/ui";
import { formatDateTime, timeAgo } from "@/lib/format";
import type { LeadPriority, LeadStatus } from "@/lib/supabase/database.types";

type Row = {
  id: string;
  ref: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  interest: string | null;
  source: string;
  status: LeadStatus;
  priority: LeadPriority;
  next_follow_up_at: string | null;
  created_at: string;
  submission_count: number;
  assignee: { id: string; full_name: string | null; email: string } | null;
};

type Props = {
  leads: Row[];
  team: { id: string; full_name: string | null; email: string }[];
};

export function LeadsTable({ leads, team }: Props) {
  const [now] = useState(() => Date.now());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [action, setAction] = useState("status:contacted");
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const allSelected = selected.size === leads.length;
  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  function applyBulk() {
    const [kind, value = ""] = action.split(":");
    startTransition(async () => {
      const res = await bulkUpdateLeads({ ids: [...selected], action: kind, value });
      setFeedback(res?.error ? { ok: false, text: res.error } : { ok: true, text: res?.message ?? "Updated" });
      if (!res?.error) setSelected(new Set());
    });
  }

  return (
    <div>
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-[#e3e8ef] bg-[#f8fafc] px-4 py-2.5">
          <span className="text-[13px] font-semibold text-[#0f172a]">{selected.size} selected</span>
          <select value={action} onChange={(e) => setAction(e.target.value)} className={`${inputClass} !w-auto !py-1.5`} aria-label="Bulk action">
            <optgroup label="Set status">
              {LEAD_STATUSES.map((s) => (
                <option key={s.value} value={`status:${s.value}`}>Status → {s.label}</option>
              ))}
            </optgroup>
            <optgroup label="Set priority">
              {LEAD_PRIORITIES.map((p) => (
                <option key={p.value} value={`priority:${p.value}`}>Priority → {p.label}</option>
              ))}
            </optgroup>
            <optgroup label="Assign">
              <option value="assign:">Unassign</option>
              {team.map((m) => (
                <option key={m.id} value={`assign:${m.id}`}>Assign → {m.full_name || m.email}</option>
              ))}
            </optgroup>
          </select>
          <button type="button" onClick={applyBulk} disabled={pending} className={buttonClass("dark", "sm")}>
            {pending ? "Applying…" : "Apply"}
          </button>
          <button type="button" onClick={() => setSelected(new Set())} className={buttonClass("ghost", "sm")}>
            Clear
          </button>
        </div>
      )}
      {feedback && (
        <div className="px-4 pt-3">
          <Alert tone={feedback.ok ? "green" : "red"}>{feedback.text}</Alert>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-[#e3e8ef] text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#64748b]">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={() => setSelected(allSelected ? new Set() : new Set(leads.map((l) => l.id)))}
                  aria-label="Select all"
                  className="h-4 w-4 accent-[#2563eb]"
                />
              </th>
              <th className="px-3 py-3">Lead</th>
              <th className="px-3 py-3">Service</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Owner</th>
              <th className="px-3 py-3">Follow-up</th>
              <th className="px-3 py-3">Source</th>
              <th className="px-3 py-3 text-right">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const overdue =
                lead.next_follow_up_at && new Date(lead.next_follow_up_at).getTime() < now && !["won", "lost", "spam"].includes(lead.status);
              return (
                <tr key={lead.id} className={`border-b border-[#eef2f7] last:border-0 hover:bg-[#f8fafc] ${selected.has(lead.id) ? "bg-[#eff6ff]" : ""}`}>
                  <td className="px-4 py-3 align-top">
                    <input
                      type="checkbox"
                      checked={selected.has(lead.id)}
                      onChange={() => toggle(lead.id)}
                      aria-label={`Select ${lead.name}`}
                      className="h-4 w-4 accent-[#2563eb]"
                    />
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Link href={`/admin/leads/${lead.id}`} className="font-semibold text-[#0b2c5e] hover:text-[#2563eb]">
                      {lead.name}
                    </Link>
                    {lead.submission_count > 1 && (
                      <span className="ml-1.5 rounded bg-[#eef2ff] px-1 text-[10.5px] font-bold text-[#4338ca]" title="Submitted more than once">
                        ×{lead.submission_count}
                      </span>
                    )}
                    <div className="mt-0.5 text-[12.5px] text-[#64748b]">
                      <a href={`tel:${lead.phone}`} className="hover:text-[#0f172a]">{lead.phone}</a>
                      {lead.city ? ` · ${lead.city}` : ""}
                    </div>
                    <div className="text-[11.5px] text-[#94a3b8]">{lead.ref}</div>
                  </td>
                  <td className="max-w-[220px] px-3 py-3 align-top text-[#334155]">
                    <span className="line-clamp-2">{lead.interest ?? "—"}</span>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <div className="flex flex-col items-start gap-1">
                      <LeadStatusBadge status={lead.status} />
                      {lead.priority !== "normal" && <PriorityBadge priority={lead.priority} />}
                    </div>
                  </td>
                  <td className="px-3 py-3 align-top text-[#334155]">
                    {lead.assignee ? lead.assignee.full_name || lead.assignee.email : <span className="text-[#94a3b8]">Unassigned</span>}
                  </td>
                  <td className={`px-3 py-3 align-top ${overdue ? "font-semibold text-[#b91c1c]" : "text-[#334155]"}`}>
                    {lead.next_follow_up_at ? formatDateTime(lead.next_follow_up_at) : <span className="text-[#94a3b8]">—</span>}
                  </td>
                  <td className="px-3 py-3 align-top text-[12.5px] text-[#64748b]">{lead.source}</td>
                  <td className="px-3 py-3 text-right align-top text-[12.5px] text-[#64748b]" title={formatDateTime(lead.created_at)} suppressHydrationWarning>
                    {timeAgo(lead.created_at)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
