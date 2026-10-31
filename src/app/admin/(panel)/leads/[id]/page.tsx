import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivityComposer, DeleteLeadButton, EmailComposer, LeadControls } from "@/components/admin/leads/LeadDetailForms";
import { Badge, buttonClass, Card, LEAD_PRIORITIES, LEAD_STATUSES, LeadStatusBadge, PageHeader, PriorityBadge } from "@/components/admin/ui";
import { requireStaff } from "@/lib/auth/dal";
import { formatDateTime, formatInrAmount, timeAgo } from "@/lib/format";
import { getAssignableTeam } from "@/lib/leads/queries";
import type { Json, LeadActivityType } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Lead" };

const ACTIVITY_LABEL: Record<LeadActivityType, string> = {
  created: "Lead created",
  resubmitted: "Submitted the form again",
  status_changed: "Status changed",
  assigned: "Owner changed",
  priority_changed: "Priority changed",
  follow_up_set: "Follow-up updated",
  note: "Note",
  call: "Call logged",
  email_sent: "Email sent",
  updated: "Updated",
};

function describe(type: LeadActivityType, meta: Json, people: Map<string, string>): string | null {
  const m = (meta && typeof meta === "object" && !Array.isArray(meta) ? meta : {}) as Record<string, Json | undefined>;
  const label = (list: { value: string; label: string }[], v: Json | undefined) =>
    list.find((x) => x.value === v)?.label ?? String(v ?? "—");
  switch (type) {
    case "status_changed":
      return `${label(LEAD_STATUSES, m.from)} → ${label(LEAD_STATUSES, m.to)}`;
    case "priority_changed":
      return `${label(LEAD_PRIORITIES, m.from)} → ${label(LEAD_PRIORITIES, m.to)}`;
    case "assigned":
      return m.to ? `Assigned to ${people.get(String(m.to)) ?? "a team member"}` : "Unassigned";
    case "follow_up_set":
      return m.at ? `Follow up on ${formatDateTime(String(m.at))}` : "Follow-up cleared";
    case "created":
    case "resubmitted":
      return m.source ? `via ${String(m.source)}${m.interest ? ` · ${String(m.interest)}` : ""}` : null;
    default:
      return null;
  }
}

export default async function LeadDetailPage({ params }: PageProps<"/admin/leads/[id]">) {
  const staff = await requireStaff("leads");
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();

  const db = await createClient();
  const [{ data: lead }, { data: activities }, { data: emails }, team] = await Promise.all([
    db.from("leads").select("*").eq("id", id).maybeSingle(),
    db
      .from("lead_activities")
      .select("*, actor:profiles!lead_activities_actor_id_fkey(full_name, email)")
      .eq("lead_id", id)
      .order("created_at", { ascending: false })
      .limit(200),
    db.from("email_logs").select("*").eq("lead_id", id).order("created_at", { ascending: false }).limit(20),
    getAssignableTeam(db),
  ]);
  if (!lead) notFound();

  const people = new Map(team.map((m) => [m.id, m.full_name || m.email]));
  const whatsapp = `https://wa.me/${lead.phone.replace(/\D/g, "")}`;
  const utm = [
    ["Source", lead.utm_source],
    ["Medium", lead.utm_medium],
    ["Campaign", lead.utm_campaign],
    ["Term", lead.utm_term],
    ["Content", lead.utm_content],
    ["Google click ID", lead.gclid ? "Yes" : null],
  ].filter(([, v]) => v);

  return (
    <>
      <PageHeader
        back={{ href: "/admin/leads", label: "All leads" }}
        title={
          <span className="flex flex-wrap items-center gap-2">
            {lead.salutation ? `${lead.salutation} ` : ""}
            {lead.name}
            <LeadStatusBadge status={lead.status} />
            {lead.priority !== "normal" && <PriorityBadge priority={lead.priority} />}
          </span>
        }
        description={`${lead.ref} · created ${formatDateTime(lead.created_at)}${lead.submission_count > 1 ? ` · submitted ${lead.submission_count} times` : ""}`}
        actions={
          <>
            <a href={`tel:${lead.phone}`} className={buttonClass("primary")}>Call</a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>WhatsApp</a>
            {lead.email && <a href={`mailto:${lead.email}`} className={buttonClass("secondary")}>Email app</a>}
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-5">
          <Card className="p-5">
            <dl className="grid gap-x-6 gap-y-4 text-[13.5px] sm:grid-cols-2">
              <Field label="Phone"><a href={`tel:${lead.phone}`} className="text-[#0e7b5b] hover:underline">{lead.phone}</a></Field>
              <Field label="Email">
                {lead.email ? <a href={`mailto:${lead.email}`} className="break-all text-[#0e7b5b] hover:underline">{lead.email}</a> : "—"}
              </Field>
              <Field label="Service">{lead.interest ?? "—"}</Field>
              <Field label="City">{lead.city ?? "—"}</Field>
              <Field label="Form">{lead.source}</Field>
              <Field label="Page">{lead.page_url ?? "—"}</Field>
              <Field label="Estimated value">{formatInrAmount(lead.estimated_value)}</Field>
              <Field label="Last contacted">{lead.last_contacted_at ? timeAgo(lead.last_contacted_at) : "Not yet"}</Field>
              {lead.referrer && <Field label="Referrer"><span className="break-all">{lead.referrer}</span></Field>}
              {lead.tags.length > 0 && (
                <Field label="Tags">
                  <span className="flex flex-wrap gap-1">{lead.tags.map((t) => <Badge key={t}>{t}</Badge>)}</span>
                </Field>
              )}
            </dl>
            {lead.message && (
              <div className="mt-4 rounded-lg bg-[#f3f7fa] p-3 text-[13.5px] leading-relaxed text-[#2c3f4e] whitespace-pre-line">
                {lead.message}
              </div>
            )}
            {utm.length > 0 && (
              <div className="mt-4 border-t border-[#e8f0ec] pt-3">
                <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#5b6e7a]">Campaign</p>
                <div className="flex flex-wrap gap-1.5">
                  {utm.map(([k, v]) => <Badge key={k} tone="indigo">{k}: {v}</Badge>)}
                </div>
              </div>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 text-[15px] font-bold text-[#0f2a45]">Activity</h2>
            <ActivityComposer leadId={lead.id} />
            <ol className="mt-5 space-y-4 border-l-2 border-[#e8f0ec] pl-4">
              {(activities ?? []).map((a) => {
                const detail = describe(a.type, a.meta, people);
                const actor = a.actor ? a.actor.full_name || a.actor.email : a.type === "created" || a.type === "resubmitted" ? "Website" : "System";
                return (
                  <li key={a.id} className="relative">
                    <span className="absolute -left-[23px] top-1 h-3 w-3 rounded-full border-2 border-white bg-[#bfd4cb]" aria-hidden />
                    <p className="text-[13px]">
                      <span className="font-semibold text-[#0f2a45]">{ACTIVITY_LABEL[a.type]}</span>
                      {detail && <span className="text-[#4a5d68]"> · {detail}</span>}
                    </p>
                    <p className="text-[12px] text-[#8a9ba6]" title={formatDateTime(a.created_at)}>
                      {actor} · {timeAgo(a.created_at)}
                    </p>
                    {a.body && (
                      <p className="mt-1.5 rounded-lg bg-[#f3f7fa] px-3 py-2 text-[13px] leading-relaxed text-[#2c3f4e] whitespace-pre-line">{a.body}</p>
                    )}
                  </li>
                );
              })}
            </ol>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <h2 className="mb-3 text-[15px] font-bold text-[#0f2a45]">Pipeline</h2>
            <LeadControls lead={lead} team={team} />
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 text-[15px] font-bold text-[#0f2a45]">Send email</h2>
            {lead.email ? (
              <EmailComposer leadId={lead.id} name={lead.name} interest={lead.interest} />
            ) : (
              <p className="text-[13px] text-[#5b6e7a]">No email address on this lead.</p>
            )}
            {emails && emails.length > 0 && (
              <ul className="mt-4 space-y-2 border-t border-[#e8f0ec] pt-3">
                {emails.map((e) => (
                  <li key={e.id} className="flex items-start justify-between gap-2 text-[12.5px]">
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-[#2c3f4e]">{e.subject}</span>
                      <span className="text-[#8a9ba6]">{e.template} · {timeAgo(e.created_at)}</span>
                    </span>
                    <Badge tone={e.status === "sent" ? "green" : e.status === "failed" ? "red" : "zinc"}>{e.status}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {staff.role === "admin" && (
            <Card className="p-5">
              <h2 className="mb-1 text-[15px] font-bold text-[#b91c1c]">Danger zone</h2>
              <p className="mb-3 text-[12.5px] text-[#5b6e7a]">Prefer marking as Spam or Lost — deleting removes the history.</p>
              <DeleteLeadButton leadId={lead.id} />
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#5b6e7a]">{label}</dt>
      <dd className="mt-0.5 text-[#0f2a45]">{children}</dd>
    </div>
  );
}
