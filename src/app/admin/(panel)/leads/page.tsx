import type { Metadata } from "next";
import Link from "next/link";
import { LeadsTable } from "@/components/admin/leads/LeadsTable";
import { buttonClass, Card, EmptyState, inputClass, LEAD_PRIORITIES, LEAD_STATUSES, PageHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/auth/dal";
import {
  buildLeadQuery,
  filtersToSearch,
  getAssignableTeam,
  getLeadSources,
  PAGE_SIZE,
  parseLeadFilters,
} from "@/lib/leads/queries";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Leads" };

const TABS = [
  { value: undefined, label: "All" },
  { value: "open", label: "Open" },
  ...LEAD_STATUSES.map((s) => ({ value: s.value, label: s.label })),
] as const;

export default async function LeadsPage({ searchParams }: PageProps<"/admin/leads">) {
  const staff = await requireStaff("leads");
  const filters = parseLeadFilters(await searchParams);
  const db = await createClient();

  const from = (filters.page - 1) * PAGE_SIZE;
  const [{ data: leads, count, error }, team, sources, statusCounts, dueCount] = await Promise.all([
    buildLeadQuery(db, filters, staff.id).range(from, from + PAGE_SIZE - 1),
    getAssignableTeam(db),
    getLeadSources(db),
    Promise.all(
      TABS.map(async (tab) => {
        const { count: c } = await buildLeadQuery(db, { ...filters, status: tab.value, page: 1 }, staff.id).limit(0);
        return [tab.value ?? "all", c ?? 0] as const;
      }),
    ),
    db
      .from("leads")
      .select("id", { count: "exact", head: true })
      .lte("next_follow_up_at", new Date().toISOString())
      .not("status", "in", "(won,lost,spam)")
      .then((r) => r.count ?? 0),
  ]);

  const counts = Object.fromEntries(statusCounts);
  const total = count ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const hasFilters = Boolean(filters.q || filters.priority || filters.assignee || filters.source || filters.from || filters.to || filters.followUp);

  return (
    <>
      <PageHeader
        title="Leads"
        description={`${total.toLocaleString("en-IN")} ${filters.status ? "matching" : "total"} leads`}
        actions={
          <>
            <a href={`/admin/leads/export${filtersToSearch(filters, { page: 1 })}`} className={buttonClass("secondary")}>
              Export CSV
            </a>
            <Link href="/admin/leads/new" className={buttonClass("primary")}>
              + Add lead
            </Link>
          </>
        }
      />

      {dueCount > 0 && !filters.followUp && (
        <Link
          href={`/admin/leads${filtersToSearch({ followUp: "due", sort: "follow_up", page: 1 })}`}
          className="mb-4 flex items-center justify-between rounded-xl border border-[#fde68a] bg-[#fffbeb] px-4 py-3 text-[13.5px] font-semibold text-[#92400e] hover:bg-[#fef3c7]"
        >
          <span>⏰ {dueCount} follow-up{dueCount === 1 ? "" : "s"} due now</span>
          <span>View →</span>
        </Link>
      )}

      <div className="-mx-4 mb-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        {TABS.map((tab) => {
          const active = filters.status === tab.value;
          return (
            <Link
              key={tab.label}
              href={`/admin/leads${filtersToSearch(filters, { status: tab.value, page: 1 })}`}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition ${
                active ? "bg-[#0f2a45] text-white" : "text-[#4a5d68] hover:bg-white"
              }`}
            >
              {tab.label}
              <span className={`rounded-full px-1.5 text-[11px] ${active ? "bg-white/20" : "bg-[#d7e4de]"}`}>
                {counts[tab.value ?? "all"]}
              </span>
            </Link>
          );
        })}
      </div>

      <Card className="mb-4 p-3">
        <form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(4,1fr)_auto_auto]" action="/admin/leads">
          {filters.status && <input type="hidden" name="status" value={filters.status} />}
          <input name="q" defaultValue={filters.q} placeholder="Search name, phone, email, ref, city" className={inputClass} aria-label="Search" />
          <select name="assignee" defaultValue={filters.assignee ?? ""} className={inputClass} aria-label="Assignee">
            <option value="">Anyone</option>
            <option value="me">Assigned to me</option>
            <option value="unassigned">Unassigned</option>
            {team.map((m) => (
              <option key={m.id} value={m.id}>{m.full_name || m.email}</option>
            ))}
          </select>
          <select name="priority" defaultValue={filters.priority ?? ""} className={inputClass} aria-label="Priority">
            <option value="">Any priority</option>
            {LEAD_PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <select name="source" defaultValue={filters.source ?? ""} className={inputClass} aria-label="Source">
            <option value="">Any source</option>
            {sources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select name="sort" defaultValue={filters.sort} className={inputClass} aria-label="Sort">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="updated">Recently updated</option>
            <option value="follow_up">Follow-up date</option>
          </select>
          <div className="flex gap-2 sm:col-span-2 lg:col-span-1">
            <input type="date" name="from" defaultValue={filters.from} className={inputClass} aria-label="From date" />
            <input type="date" name="to" defaultValue={filters.to} className={inputClass} aria-label="To date" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className={buttonClass("dark")}>Filter</button>
            {hasFilters && (
              <Link href={`/admin/leads${filtersToSearch({ status: filters.status, page: 1 })}`} className={buttonClass("ghost")}>
                Clear
              </Link>
            )}
          </div>
        </form>
      </Card>

      <Card>
        {error ? (
          <EmptyState title="Couldn't load leads" description={error.message} />
        ) : !leads?.length ? (
          <EmptyState
            title={hasFilters || filters.status ? "No leads match these filters" : "No leads yet"}
            description={hasFilters ? "Try clearing a filter." : "Leads from the website forms will appear here automatically."}
          />
        ) : (
          <LeadsTable leads={leads} team={team} />
        )}
      </Card>

      {pages > 1 && (
        <nav className="mt-4 flex items-center justify-between text-[13px]" aria-label="Pagination">
          <span className="text-[#5b6e7a]">
            Page {filters.page} of {pages}
          </span>
          <div className="flex gap-2">
            {filters.page > 1 && (
              <Link href={`/admin/leads${filtersToSearch(filters, { page: filters.page - 1 })}`} className={buttonClass("secondary", "sm")}>
                ← Previous
              </Link>
            )}
            {filters.page < pages && (
              <Link href={`/admin/leads${filtersToSearch(filters, { page: filters.page + 1 })}`} className={buttonClass("secondary", "sm")}>
                Next →
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
