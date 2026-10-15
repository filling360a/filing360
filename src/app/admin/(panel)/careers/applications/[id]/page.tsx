import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplicantEmailComposer, DeleteApplicationButton, NoteComposer, PipelineControls } from "@/components/admin/careers/ApplicationForms";
import { ApplicationStatusBadge, Badge, buttonClass, Card, PageHeader, Rating } from "@/components/admin/ui";
import { requireStaff } from "@/lib/auth/dal";
import { getRecruiters } from "@/lib/careers/admin-queries";
import { APPLICATION_STATUSES, parseAnswers, RESUME_TYPES } from "@/lib/careers/constants";
import { formatDateTime, timeAgo } from "@/lib/format";
import type { ApplicationActivityType, Json } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Application" };

const ACTIVITY_LABEL: Record<ApplicationActivityType, string> = {
  created: "Applied",
  status_changed: "Stage changed",
  assigned: "Owner changed",
  rating_changed: "Rated",
  note: "Note",
  email_sent: "Email sent",
  resume_viewed: "Résumé opened",
};

function describe(type: ApplicationActivityType, meta: Json, people: Map<string, string>): string | null {
  const m = (meta && typeof meta === "object" && !Array.isArray(meta) ? meta : {}) as Record<string, Json | undefined>;
  const stage = (v: Json | undefined) => APPLICATION_STATUSES.find((s) => s.value === v)?.label ?? String(v ?? "—");
  switch (type) {
    case "status_changed":
      return `${stage(m.from)} → ${stage(m.to)}`;
    case "assigned":
      return m.to ? `Assigned to ${people.get(String(m.to)) ?? "a team member"}` : "Unassigned";
    case "rating_changed":
      return m.to ? `${String(m.to)}/5` : "Rating cleared";
    case "created":
      return m.source ? `via ${String(m.source)}` : null;
    case "resume_viewed":
      return m.download ? "downloaded" : null;
    default:
      return null;
  }
}

const lpa = (v: number | null) => (v === null ? "—" : `₹${Number(v).toLocaleString("en-IN", { maximumFractionDigits: 2 })} L / yr`);
const kb = (bytes: number) => (bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`);

export default async function ApplicationDetailPage({ params }: PageProps<"/admin/careers/applications/[id]">) {
  const staff = await requireStaff("careers");
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();

  const db = await createClient();
  const [{ data: app }, { data: activities }, { data: emails }, recruiters] = await Promise.all([
    db.from("job_applications").select("*, job:jobs!job_applications_job_id_fkey(id, title, department, slug, status)").eq("id", id).maybeSingle(),
    db
      .from("application_activities")
      .select("*, actor:profiles!application_activities_actor_id_fkey(full_name, email)")
      .eq("application_id", id)
      .order("created_at", { ascending: false })
      .limit(200),
    db.from("email_logs").select("*").eq("application_id", id).order("created_at", { ascending: false }).limit(20),
    getRecruiters(db),
  ]);
  if (!app) notFound();

  const { data: others } = await db
    .from("job_applications")
    .select("id, ref, status, created_at, job:jobs!job_applications_job_id_fkey(title)")
    .eq("email", app.email.toLowerCase())
    .neq("id", app.id)
    .order("created_at", { ascending: false })
    .limit(10);

  const people = new Map(recruiters.map((m) => [m.id, m.full_name || m.email]));
  const answers = parseAnswers(app.answers);
  const role = app.job?.title ?? "the role";
  const fileLabel = RESUME_TYPES[app.resume_type]?.label ?? "File";
  const whatsapp = `https://wa.me/${app.phone.replace(/\D/g, "")}`;
  const campaign = [
    ["Source", app.utm_source],
    ["Medium", app.utm_medium],
    ["Campaign", app.utm_campaign],
  ].filter(([, v]) => v);

  return (
    <>
      <PageHeader
        back={{ href: app.job ? `/admin/careers/applications?job=${app.job.id}` : "/admin/careers/applications", label: app.job ? `${app.job.title} applications` : "All applications" }}
        title={
          <span className="flex flex-wrap items-center gap-2">
            {app.full_name}
            <ApplicationStatusBadge status={app.status} />
            {app.rating && <Rating value={app.rating} />}
          </span>
        }
        description={`${app.ref} · applied ${formatDateTime(app.created_at)} for ${role}`}
        actions={
          <>
            <a href={`/admin/careers/applications/${app.id}/resume`} target="_blank" rel="noopener" className={buttonClass("primary")}>
              View résumé
            </a>
            <a href={`tel:${app.phone}`} className={buttonClass("secondary")}>Call</a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>WhatsApp</a>
          </>
        }
      />

      {others && others.length > 0 && (
        <div className="mb-4 rounded-xl border border-[#c7d2fe] bg-[#eef2ff] px-4 py-3 text-[13px] text-[#3730a3]">
          <span className="font-semibold">Also applied for: </span>
          {others.map((o, i) => (
            <span key={o.id}>
              {i > 0 && ", "}
              <Link href={`/admin/careers/applications/${o.id}`} className="underline underline-offset-2 hover:text-[#1e1b4b]">
                {o.job?.title ?? o.ref}
              </Link>{" "}
              ({APPLICATION_STATUSES.find((s) => s.value === o.status)?.label})
            </span>
          ))}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-5">
          <Card className="p-5">
            <dl className="grid gap-x-6 gap-y-4 text-[13.5px] sm:grid-cols-2">
              <Field label="Email"><a href={`mailto:${app.email}`} className="break-all text-[#2563eb] hover:underline">{app.email}</a></Field>
              <Field label="Phone"><a href={`tel:${app.phone}`} className="text-[#2563eb] hover:underline">{app.phone}</a></Field>
              <Field label="Current city">{app.current_city ?? "—"}</Field>
              <Field label="Total experience">{app.total_experience !== null ? `${Number(app.total_experience)} years` : "—"}</Field>
              <Field label="Current CTC">{lpa(app.current_ctc)}</Field>
              <Field label="Expected CTC">{lpa(app.expected_ctc)}</Field>
              <Field label="Notice period">
                {app.notice_period_days === null ? "—" : app.notice_period_days === 0 ? "Immediate joiner" : `${app.notice_period_days} days`}
              </Field>
              <Field label="Role">
                {app.job ? (
                  <Link href={`/admin/careers/${app.job.id}`} className="text-[#2563eb] hover:underline">{app.job.title}</Link>
                ) : (
                  "—"
                )}
              </Field>
              {app.linkedin_url && (
                <Field label="LinkedIn">
                  <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-[#2563eb] hover:underline">{app.linkedin_url.replace(/^https?:\/\/(www\.)?/, "")}</a>
                </Field>
              )}
              {app.portfolio_url && (
                <Field label="Portfolio / website">
                  <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-[#2563eb] hover:underline">{app.portfolio_url.replace(/^https?:\/\/(www\.)?/, "")}</a>
                </Field>
              )}
            </dl>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#e3e8ef] bg-[#f8fafc] px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-semibold text-[#0f172a]">{app.resume_name}</p>
                <p className="text-[12px] text-[#64748b]">{fileLabel} · {kb(app.resume_size)}</p>
              </div>
              <div className="flex gap-2">
                <a href={`/admin/careers/applications/${app.id}/resume`} target="_blank" rel="noopener" className={buttonClass("secondary", "sm")}>Open</a>
                <a href={`/admin/careers/applications/${app.id}/resume?download=1`} className={buttonClass("secondary", "sm")}>Download</a>
              </div>
            </div>

            {campaign.length > 0 && (
              <div className="mt-4 border-t border-[#eef2f7] pt-3">
                <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#64748b]">Campaign</p>
                <div className="flex flex-wrap gap-1.5">
                  {campaign.map(([k, v]) => <Badge key={k} tone="indigo">{k}: {v}</Badge>)}
                </div>
              </div>
            )}
          </Card>

          {answers.length > 0 && (
            <Card className="p-5">
              <h2 className="mb-3 text-[15px] font-bold text-[#0b2c5e]">Screening answers</h2>
              <dl className="space-y-3">
                {answers.map((a) => (
                  <div key={a.id}>
                    <dt className="text-[13px] font-semibold text-[#334155]">{a.label}</dt>
                    <dd className="mt-0.5 whitespace-pre-line text-[13.5px] text-[#0f172a]">{a.answer || <span className="text-[#94a3b8]">No answer</span>}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          )}

          {app.cover_letter && (
            <Card className="p-5">
              <h2 className="mb-3 text-[15px] font-bold text-[#0b2c5e]">Cover letter</h2>
              <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-[#334155]">{app.cover_letter}</p>
            </Card>
          )}

          <Card className="p-5">
            <h2 className="mb-3 text-[15px] font-bold text-[#0b2c5e]">Activity</h2>
            <NoteComposer applicationId={app.id} />
            <ol className="mt-5 space-y-4 border-l-2 border-[#eef2f7] pl-4">
              {(activities ?? []).map((a) => {
                const detail = describe(a.type, a.meta, people);
                const actor = a.actor ? a.actor.full_name || a.actor.email : a.type === "created" ? "Candidate" : "System";
                return (
                  <li key={a.id} className="relative">
                    <span className="absolute -left-[23px] top-1 h-3 w-3 rounded-full border-2 border-white bg-[#cbd5e1]" aria-hidden />
                    <p className="text-[13px]">
                      <span className="font-semibold text-[#0f172a]">{ACTIVITY_LABEL[a.type]}</span>
                      {detail && <span className="text-[#475569]"> · {detail}</span>}
                    </p>
                    <p className="text-[12px] text-[#94a3b8]" title={formatDateTime(a.created_at)}>
                      {actor} · {timeAgo(a.created_at)}
                    </p>
                    {a.body && (
                      <p className="mt-1.5 whitespace-pre-line rounded-lg bg-[#f8fafc] px-3 py-2 text-[13px] leading-relaxed text-[#334155]">{a.body}</p>
                    )}
                  </li>
                );
              })}
            </ol>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <h2 className="mb-3 text-[15px] font-bold text-[#0b2c5e]">Pipeline</h2>
            <PipelineControls
              key={`${app.status}-${app.rating}-${app.assigned_to}`}
              application={{ id: app.id, status: app.status, rating: app.rating, assigned_to: app.assigned_to }}
              recruiters={recruiters}
            />
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 text-[15px] font-bold text-[#0b2c5e]">Email candidate</h2>
            <ApplicantEmailComposer applicationId={app.id} name={app.full_name} role={role} />
            {emails && emails.length > 0 && (
              <ul className="mt-4 space-y-2 border-t border-[#eef2f7] pt-3">
                {emails.map((e) => (
                  <li key={e.id} className="flex items-start justify-between gap-2 text-[12.5px]">
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-[#334155]">{e.subject}</span>
                      <span className="text-[#94a3b8]">{e.template} · {timeAgo(e.created_at)}</span>
                    </span>
                    <Badge tone={e.status === "sent" ? "green" : e.status === "failed" ? "red" : "zinc"}>{e.status}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-5 text-[12.5px] text-[#64748b]">
            <p>
              Consent to process data: <span className="font-semibold text-[#0f172a]">{app.consent ? "Given" : "Not recorded"}</span>
            </p>
            {app.referrer && <p className="mt-1 break-all">Referrer: {app.referrer}</p>}
          </Card>

          {staff.role === "admin" && (
            <Card className="p-5">
              <h2 className="mb-1 text-[15px] font-bold text-[#b91c1c]">Danger zone</h2>
              <p className="mb-3 text-[12.5px] text-[#64748b]">Prefer moving to Rejected. Delete only for a candidate&apos;s data-deletion request — this also removes the résumé file.</p>
              <DeleteApplicationButton applicationId={app.id} />
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
      <dt className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#64748b]">{label}</dt>
      <dd className="mt-0.5 text-[#0f172a]">{children}</dd>
    </div>
  );
}
