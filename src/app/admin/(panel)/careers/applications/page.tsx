import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationsTable } from "@/components/admin/careers/ApplicationsTable";
import { buttonClass, Card, EmptyState, inputClass, PageHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/auth/dal";
import {
  APPLICATIONS_PAGE_SIZE,
  applicationFiltersToSearch,
  buildApplicationQuery,
  getJobOptions,
  getRecruiters,
  parseApplicationFilters,
  type ApplicationFilters,
} from "@/lib/careers/admin-queries";
import { APPLICATION_STATUSES } from "@/lib/careers/constants";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Applications" };

const TABS: { value?: ApplicationFilters["status"]; label: string }[] = [
  { label: "All" },
  { value: "active", label: "Active" },
  ...APPLICATION_STATUSES.map((s) => ({ value: s.value, label: s.label })),
];

export default async function ApplicationsPage({ searchParams }: PageProps<"/admin/careers/applications">) {
  const staff = await requireStaff("careers");
  const filters = parseApplicationFilters(await searchParams);
  const db = await createClient();

  const from = (filters.page - 1) * APPLICATIONS_PAGE_SIZE;
  const [{ data: applications, count, error }, recruiters, jobs, tabCounts] = await Promise.all([
    buildApplicationQuery(db, filters, staff.id).range(from, from + APPLICATIONS_PAGE_SIZE - 1),
    getRecruiters(db),
    getJobOptions(db),
    Promise.all(
      TABS.map(async (tab) => {
        const { count: c } = await buildApplicationQuery(db, { ...filters, status: tab.value, page: 1 }, staff.id).limit(0);
        return [tab.value ?? "all", c ?? 0] as const;
      }),
    ),
  ]);

  const counts = Object.fromEntries(tabCounts);
  const total = count ?? 0;
  const pages = Math.max(1, Math.ceil(total / APPLICATIONS_PAGE_SIZE));
  const hasFilters = Boolean(filters.q || filters.job || filters.assignee || filters.rating);
  const job = filters.job ? jobs.find((j) => j.id === filters.job) : undefined;

  return (
    <>
      <PageHeader
        back={{ href: "/admin/careers", label: "Careers" }}
        title={job ? `Applications · ${job.title}` : "Applications"}
        description={`${total.toLocaleString("en-IN")} ${filters.status || hasFilters ? "matching" : "total"} applications`}
        actions={
          <>
            {job && (
              <Link href={`/admin/careers/${job.id}`} className={buttonClass("secondary")}>
                Edit job
              </Link>
            )}
            <a href={`/admin/careers/applications/export${applicationFiltersToSearch(filters, { page: 1 })}`} className={buttonClass("secondary")}>
              Export CSV
            </a>
          </>
        }
      />

      <div className="-mx-4 mb-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        {TABS.map((tab) => {
          const active = filters.status === tab.value;
          return (
            <Link
              key={tab.label}
              href={`/admin/careers/applications${applicationFiltersToSearch(filters, { status: tab.value, page: 1 })}`}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition ${
                active ? "bg-[#0b2c5e] text-white" : "text-[#475569] hover:bg-white"
              }`}
            >
              {tab.label}
              <span className={`rounded-full px-1.5 text-[11px] ${active ? "bg-white/20" : "bg-[#e2e8f0]"}`}>{counts[tab.value ?? "all"]}</span>
            </Link>
          );
        })}
      </div>

      <Card className="mb-4 p-3">
        <form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto]" action="/admin/careers/applications">
          {filters.status && <input type="hidden" name="status" value={filters.status} />}
          <input name="q" defaultValue={filters.q} placeholder="Search name, email, phone, ref, city" className={inputClass} aria-label="Search" />
          <select name="job" defaultValue={filters.job ?? ""} className={inputClass} aria-label="Job">
            <option value="">All jobs</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
                {j.status !== "open" ? ` (${j.status})` : ""}
              </option>
            ))}
          </select>
          <select name="assignee" defaultValue={filters.assignee ?? ""} className={inputClass} aria-label="Owner">
            <option value="">Anyone</option>
            <option value="me">Assigned to me</option>
            <option value="unassigned">Unassigned</option>
            {recruiters.map((m) => (
              <option key={m.id} value={m.id}>{m.full_name || m.email}</option>
            ))}
          </select>
          <select name="rating" defaultValue={filters.rating ?? ""} className={inputClass} aria-label="Minimum rating">
            <option value="">Any rating</option>
            {[5, 4, 3, 2].map((r) => (
              <option key={r} value={r}>{r}★ & up</option>
            ))}
          </select>
          <select name="sort" defaultValue={filters.sort} className={inputClass} aria-label="Sort">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="rating">Highest rated</option>
            <option value="updated">Recently updated</option>
          </select>
          <div className="flex gap-2">
            <button type="submit" className={buttonClass("dark")}>Filter</button>
            {hasFilters && (
              <Link href={`/admin/careers/applications${applicationFiltersToSearch({ status: filters.status, page: 1 })}`} className={buttonClass("ghost")}>
                Clear
              </Link>
            )}
          </div>
        </form>
      </Card>

      <Card>
        {error ? (
          <EmptyState title="Couldn't load applications" description={error.message} />
        ) : !applications?.length ? (
          <EmptyState
            title={hasFilters || filters.status ? "No applications match these filters" : "No applications yet"}
            description={hasFilters ? "Try clearing a filter." : "Applications from the careers page will appear here."}
          />
        ) : (
          <ApplicationsTable applications={applications} recruiters={recruiters} showJob={!filters.job} />
        )}
      </Card>

      {pages > 1 && (
        <nav className="mt-4 flex items-center justify-between text-[13px]" aria-label="Pagination">
          <span className="text-[#64748b]">
            Page {filters.page} of {pages}
          </span>
          <div className="flex gap-2">
            {filters.page > 1 && (
              <Link href={`/admin/careers/applications${applicationFiltersToSearch(filters, { page: filters.page - 1 })}`} className={buttonClass("secondary", "sm")}>
                ← Previous
              </Link>
            )}
            {filters.page < pages && (
              <Link href={`/admin/careers/applications${applicationFiltersToSearch(filters, { page: filters.page + 1 })}`} className={buttonClass("secondary", "sm")}>
                Next →
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
