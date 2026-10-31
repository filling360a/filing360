"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { bulkUpdateApplications } from "@/app/admin/(panel)/careers/actions";
import { Alert, ApplicationStatusBadge, buttonClass, inputClass, Rating } from "@/components/admin/ui";
import { APPLICATION_STATUSES } from "@/lib/careers/constants";
import { formatDateTime, timeAgo } from "@/lib/format";
import type { ApplicationStatus } from "@/lib/supabase/database.types";

type Row = {
  id: string;
  ref: string;
  full_name: string;
  email: string;
  phone: string;
  current_city: string | null;
  total_experience: number | null;
  current_ctc: number | null;
  expected_ctc: number | null;
  notice_period_days: number | null;
  status: ApplicationStatus;
  rating: number | null;
  created_at: string;
  job: { id: string; title: string; department: string } | null;
  assignee: { id: string; full_name: string | null; email: string } | null;
};

type Props = {
  applications: Row[];
  recruiters: { id: string; full_name: string | null; email: string }[];
  showJob: boolean;
};

const lpa = (v: number | null) => (v === null ? null : `${Number(v).toLocaleString("en-IN", { maximumFractionDigits: 2 })} L`);

function notice(days: number | null) {
  if (days === null) return null;
  if (days === 0) return "Immediate";
  return `${days}d notice`;
}

export function ApplicationsTable({ applications, recruiters, showJob }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [action, setAction] = useState("status:reviewing");
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const allSelected = selected.size === applications.length;
  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  function applyBulk() {
    const [kind, value = ""] = action.split(":");
    if (kind === "status" && value === "rejected" && !window.confirm(`Mark ${selected.size} application(s) as rejected? No email is sent.`)) return;
    startTransition(async () => {
      const res = await bulkUpdateApplications({ ids: [...selected], action: kind, value });
      setFeedback(res?.error ? { ok: false, text: res.error } : { ok: true, text: res?.message ?? "Updated" });
      if (!res?.error) setSelected(new Set());
    });
  }

  return (
    <div>
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-[#d7e4de] bg-[#f3f7fa] px-4 py-2.5">
          <span className="text-[13px] font-semibold text-[#0f2a45]">{selected.size} selected</span>
          <select value={action} onChange={(e) => setAction(e.target.value)} className={`${inputClass} !w-auto !py-1.5`} aria-label="Bulk action">
            <optgroup label="Move to stage">
              {APPLICATION_STATUSES.map((s) => (
                <option key={s.value} value={`status:${s.value}`}>Stage → {s.label}</option>
              ))}
            </optgroup>
            <optgroup label="Assign">
              <option value="assign:">Unassign</option>
              {recruiters.map((m) => (
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
        <table className="w-full min-w-[960px] text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-[#d7e4de] text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#5b6e7a]">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={() => setSelected(allSelected ? new Set() : new Set(applications.map((a) => a.id)))}
                  aria-label="Select all"
                  className="h-4 w-4 accent-[#0e7b5b]"
                />
              </th>
              <th className="px-3 py-3">Candidate</th>
              {showJob && <th className="px-3 py-3">Role</th>}
              <th className="px-3 py-3">Experience</th>
              <th className="px-3 py-3">CTC (cur → exp)</th>
              <th className="px-3 py-3">Stage</th>
              <th className="px-3 py-3">Rating</th>
              <th className="px-3 py-3">Owner</th>
              <th className="px-3 py-3 text-right">Applied</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a.id} className={`border-b border-[#e8f0ec] last:border-0 hover:bg-[#f3f7fa] ${selected.has(a.id) ? "bg-[#e3f2ed]" : ""}`}>
                <td className="px-4 py-3 align-top">
                  <input
                    type="checkbox"
                    checked={selected.has(a.id)}
                    onChange={() => toggle(a.id)}
                    aria-label={`Select ${a.full_name}`}
                    className="h-4 w-4 accent-[#0e7b5b]"
                  />
                </td>
                <td className="px-3 py-3 align-top">
                  <Link href={`/admin/careers/applications/${a.id}`} className="font-semibold text-[#0f2a45] hover:text-[#0e7b5b]">
                    {a.full_name}
                  </Link>
                  <div className="mt-0.5 text-[12.5px] text-[#5b6e7a]">
                    <span className="break-all">{a.email}</span>
                    {a.current_city ? ` · ${a.current_city}` : ""}
                  </div>
                  <div className="text-[11.5px] text-[#8a9ba6]">{a.ref}</div>
                </td>
                {showJob && (
                  <td className="max-w-[220px] px-3 py-3 align-top text-[#2c3f4e]">
                    {a.job ? (
                      <>
                        <span className="line-clamp-2">{a.job.title}</span>
                        <span className="text-[12px] text-[#8a9ba6]">{a.job.department}</span>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                )}
                <td className="px-3 py-3 align-top text-[#2c3f4e]">
                  {a.total_experience !== null ? `${Number(a.total_experience)} yrs` : "—"}
                  {notice(a.notice_period_days) && <div className="text-[12px] text-[#8a9ba6]">{notice(a.notice_period_days)}</div>}
                </td>
                <td className="px-3 py-3 align-top text-[#2c3f4e]">
                  {lpa(a.current_ctc) || lpa(a.expected_ctc) ? `${lpa(a.current_ctc) ?? "—"} → ${lpa(a.expected_ctc) ?? "—"}` : "—"}
                </td>
                <td className="px-3 py-3 align-top">
                  <ApplicationStatusBadge status={a.status} />
                </td>
                <td className="px-3 py-3 align-top">
                  <Rating value={a.rating} />
                </td>
                <td className="px-3 py-3 align-top text-[#2c3f4e]">
                  {a.assignee ? a.assignee.full_name || a.assignee.email : <span className="text-[#8a9ba6]">Unassigned</span>}
                </td>
                <td className="px-3 py-3 text-right align-top text-[12.5px] text-[#5b6e7a]" title={formatDateTime(a.created_at)} suppressHydrationWarning>
                  {timeAgo(a.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
