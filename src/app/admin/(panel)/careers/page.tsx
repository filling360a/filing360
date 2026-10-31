import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass, Card, EmptyState, JobStatusBadge, PageHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/auth/dal";
import { EMPLOYMENT_TYPES, JOB_STATUSES, WORKPLACE_TYPES } from "@/lib/careers/constants";
import { formatDate } from "@/lib/format";
import type { JobStatus } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Careers" };

const TABS: { value?: JobStatus; label: string }[] = [{ label: "All" }, ...JOB_STATUSES.map((s) => ({ value: s.value, label: s.label }))];

export default async function CareersAdminPage({ searchParams }: PageProps<"/admin/careers">) {
  await requireStaff("careers");
  const sp = await searchParams;
  const raw = typeof sp.status === "string" ? sp.status : undefined;
  const status = JOB_STATUSES.some((s) => s.value === raw) ? (raw as JobStatus) : undefined;

  const db = await createClient();
  let jobsQuery = db
    .from("jobs")
    .select("id, slug, title, department, location, workplace_type, employment_type, status, openings, published_at, closes_at, updated_at, applications:job_applications(count)")
    .order("updated_at", { ascending: false });
  if (status) jobsQuery = jobsQuery.eq("status", status);

  const [{ data: jobs, error }, { data: pending }, { data: allJobs }, interviewing] = await Promise.all([
    jobsQuery,
    db.from("job_applications").select("job_id").eq("status", "new").limit(10_000),
    db.from("jobs").select("status"),
    db
      .from("job_applications")
      .select("id", { count: "exact", head: true })
      .in("status", ["shortlisted", "interview", "offered"])
      .then((r) => r.count ?? 0),
  ]);

  const newByJob = new Map<string, number>();
  for (const row of pending ?? []) newByJob.set(row.job_id, (newByJob.get(row.job_id) ?? 0) + 1);
  const statusCounts = new Map<string, number>();
  for (const j of allJobs ?? []) statusCounts.set(j.status, (statusCounts.get(j.status) ?? 0) + 1);

  const stats = [
    { label: "Open roles", value: statusCounts.get("open") ?? 0, href: "/admin/careers?status=open" },
    { label: "New applications", value: pending?.length ?? 0, href: "/admin/careers/applications?status=new" },
    { label: "In the pipeline", value: interviewing, href: "/admin/careers/applications?status=active" },
  ];

  return (
    <>
      <PageHeader
        title="Careers"
        description="Job openings on /careers and the applications they receive."
        actions={
          <>
            <Link href="/admin/careers/applications" className={buttonClass("secondary")}>
              All applications
            </Link>
            <Link href="/admin/careers/new" className={buttonClass("primary")}>
              + New job
            </Link>
          </>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group">
            <Card className="p-4 transition group-hover:border-[#c5e8dc]">
              <p className="text-[12.5px] font-semibold text-[#5b6e7a]">{s.label}</p>
              <p className="mt-1 text-[26px] font-bold tabular-nums text-[#0f2a45]">{s.value.toLocaleString("en-IN")}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="-mx-4 mb-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        {TABS.map((tab) => {
          const active = status === tab.value;
          const count = tab.value ? (statusCounts.get(tab.value) ?? 0) : (allJobs?.length ?? 0);
          return (
            <Link
              key={tab.label}
              href={tab.value ? `/admin/careers?status=${tab.value}` : "/admin/careers"}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition ${
                active ? "bg-[#0f2a45] text-white" : "text-[#4a5d68] hover:bg-white"
              }`}
            >
              {tab.label}
              <span className={`rounded-full px-1.5 text-[11px] ${active ? "bg-white/20" : "bg-[#d7e4de]"}`}>{count}</span>
            </Link>
          );
        })}
      </div>

      <Card>
        {error ? (
          <EmptyState title="Couldn't load jobs" description={error.message} />
        ) : !jobs?.length ? (
          <EmptyState
            title={status ? "No jobs with this status" : "No jobs yet"}
            description={status ? undefined : "Create your first opening — it stays a draft until you publish it."}
            action={
              !status && (
                <Link href="/admin/careers/new" className={buttonClass("primary")}>
                  + New job
                </Link>
              )
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-[#d7e4de] text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#5b6e7a]">
                  <th className="px-4 py-3">Role</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Applications</th>
                  <th className="px-3 py-3">Published</th>
                  <th className="px-3 py-3">Closes</th>
                  <th className="px-4 py-3 text-right">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => {
                  const total = job.applications[0]?.count ?? 0;
                  const fresh = newByJob.get(job.id) ?? 0;
                  return (
                    <tr key={job.id} className="border-b border-[#e8f0ec] last:border-0 hover:bg-[#f3f7fa]">
                      <td className="px-4 py-3 align-top">
                        <Link href={`/admin/careers/${job.id}`} className="font-semibold text-[#0f2a45] hover:text-[#0e7b5b]">
                          {job.title}
                        </Link>
                        <div className="mt-0.5 text-[12.5px] text-[#5b6e7a]">
                          {job.department} · {job.location} · {WORKPLACE_TYPES[job.workplace_type]} · {EMPLOYMENT_TYPES[job.employment_type].label}
                          {job.openings > 1 ? ` · ${job.openings} openings` : ""}
                        </div>
                      </td>
                      <td className="px-3 py-3 align-top">
                        <JobStatusBadge status={job.status} />
                      </td>
                      <td className="px-3 py-3 align-top">
                        <Link href={`/admin/careers/applications?job=${job.id}`} className="font-semibold text-[#0f2a45] hover:text-[#0e7b5b]">
                          {total}
                        </Link>
                        {fresh > 0 && (
                          <span className="ml-2 rounded-full bg-[#e3f2ed] px-1.5 py-0.5 text-[11px] font-bold text-[#0b6550]">{fresh} new</span>
                        )}
                      </td>
                      <td className="px-3 py-3 align-top text-[12.5px] text-[#5b6e7a]">{job.published_at ? formatDate(job.published_at) : "—"}</td>
                      <td className="px-3 py-3 align-top text-[12.5px] text-[#5b6e7a]">{job.closes_at ? formatDate(job.closes_at) : "—"}</td>
                      <td className="px-4 py-3 text-right align-top">
                        <div className="flex justify-end gap-1">
                          {(job.status === "open" || job.status === "closed") && (
                            <a href={`/careers/${job.slug}`} target="_blank" rel="noopener noreferrer" className={buttonClass("ghost", "sm")}>
                              View ↗
                            </a>
                          )}
                          <Link href={`/admin/careers/${job.id}`} className={buttonClass("secondary", "sm")}>
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
