import type { Metadata } from "next";
import Link from "next/link";
import { Alert, ApplicationStatusBadge, buttonClass, Card, EmptyState, LEAD_STATUSES, LeadStatusBadge, PageHeader, PostStatusBadge } from "@/components/admin/ui";
import { canAccess, requireStaff } from "@/lib/auth/dal";
import { APPLICATION_STATUSES } from "@/lib/careers/constants";
import { formatDateTime, formatInrAmount, timeAgo } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard" };

const DAY = 86_400_000;

function istMidnight(offsetDays = 0): Date {
  const now = new Date(Date.now() + 330 * 60_000);
  now.setUTCHours(0, 0, 0, 0);
  return new Date(now.getTime() - 330 * 60_000 + offsetDays * DAY);
}

export default async function DashboardPage({ searchParams }: PageProps<"/admin">) {
  const staff = await requireStaff();
  const { denied } = await searchParams;
  const showLeads = canAccess(staff.role, "leads");
  const showBlog = canAccess(staff.role, "blog");
  const showCareers = canAccess(staff.role, "careers");
  const greeting = staff.full_name?.split(" ")[0] ?? "there";

  return (
    <>
      <PageHeader
        title={`Hello, ${greeting}`}
        description={new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full" }).format(new Date())}
        actions={
          <>
            {showLeads && <Link href="/admin/leads/new" className={buttonClass("secondary")}>+ Add lead</Link>}
            {showBlog && <Link href="/admin/blog/new" className={buttonClass("primary")}>+ New post</Link>}
            {showCareers && !showLeads && <Link href="/admin/careers/new" className={buttonClass("primary")}>+ New job</Link>}
          </>
        }
      />
      {denied && (
        <div className="mb-5">
          <Alert tone="amber">You don&apos;t have access to that section.</Alert>
        </div>
      )}
      <div className="space-y-6">
        {showLeads && <LeadsOverview staffId={staff.id} />}
        {showCareers && <CareersOverview staffId={staff.id} />}
        {showBlog && <BlogOverview />}
      </div>
    </>
  );
}

async function LeadsOverview({ staffId }: { staffId: string }) {
  const db = await createClient();
  const today = istMidnight();
  const weekAgo = new Date(today.getTime() - 6 * DAY);
  const prevWeek = new Date(weekAgo.getTime() - 7 * DAY);
  const monthStart = new Date(today.getTime() - 29 * DAY);
  const nowIso = new Date().toISOString();

  const count = (q: PromiseLike<{ count: number | null }>) => Promise.resolve(q).then((r) => r.count ?? 0);
  const base = () => db.from("leads").select("id", { count: "exact", head: true }).neq("status", "spam");

  const [todayCount, weekCount, prevWeekCount, openCount, mineOpen, dueCount, recentRows, dueRows, recentLeads] = await Promise.all([
    count(base().gte("created_at", today.toISOString())),
    count(base().gte("created_at", weekAgo.toISOString())),
    count(base().gte("created_at", prevWeek.toISOString()).lt("created_at", weekAgo.toISOString())),
    count(base().not("status", "in", "(won,lost,spam)")),
    count(base().not("status", "in", "(won,lost,spam)").eq("assigned_to", staffId)),
    count(base().not("status", "in", "(won,lost,spam)").lte("next_follow_up_at", nowIso)),
    db
      .from("leads")
      .select("status, source, interest, estimated_value, created_at")
      .gte("created_at", monthStart.toISOString())
      .limit(5000)
      .then((r) => r.data ?? []),
    db
      .from("leads")
      .select("id, name, phone, interest, next_follow_up_at, status")
      .not("status", "in", "(won,lost,spam)")
      .not("next_follow_up_at", "is", null)
      .lte("next_follow_up_at", new Date(today.getTime() + DAY).toISOString())
      .order("next_follow_up_at")
      .limit(8)
      .then((r) => r.data ?? []),
    db
      .from("leads")
      .select("id, name, interest, status, created_at, source")
      .neq("status", "spam")
      .order("created_at", { ascending: false })
      .limit(8)
      .then((r) => r.data ?? []),
  ]);

  const real = recentRows.filter((r) => r.status !== "spam");
  const won = real.filter((r) => r.status === "won");
  const closed = real.filter((r) => r.status === "won" || r.status === "lost").length;
  const winRate = closed ? Math.round((won.length / closed) * 100) : null;
  const wonValue = won.reduce((sum, r) => sum + (r.estimated_value ?? 0), 0);
  const trend = prevWeekCount ? Math.round(((weekCount - prevWeekCount) / prevWeekCount) * 100) : null;

  const tally = (key: "source" | "interest") => {
    const map = new Map<string, number>();
    for (const r of real) {
      const k = (r[key] as string | null) ?? "Not specified";
      map.set(k, (map.get(k) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  };
  const bySource = tally("source");
  const byService = tally("interest");
  const funnel = LEAD_STATUSES.filter((s) => s.value !== "spam").map((s) => ({
    ...s,
    count: real.filter((r) => r.status === s.value).length,
  }));
  const funnelMax = Math.max(1, ...funnel.map((f) => f.count));

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Kpi label="New today" value={todayCount} href="/admin/leads" />
        <Kpi
          label="Last 7 days"
          value={weekCount}
          hint={trend === null ? undefined : `${trend >= 0 ? "▲" : "▼"} ${Math.abs(trend)}% vs prior week`}
          hintTone={trend !== null && trend < 0 ? "down" : "up"}
        />
        <Kpi label="Open pipeline" value={openCount} href="/admin/leads?status=open" />
        <Kpi label="Assigned to me" value={mineOpen} href="/admin/leads?status=open&assignee=me" />
        <Kpi label="Follow-ups due" value={dueCount} href="/admin/leads?followUp=due&sort=follow_up" alert={dueCount > 0} />
        <Kpi label="Win rate (30d)" value={winRate === null ? "—" : `${winRate}%`} hint={wonValue ? `${formatInrAmount(wonValue)} won` : undefined} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardTitle title="Follow-ups due today" href="/admin/leads?followUp=due&sort=follow_up" />
          {dueRows.length === 0 ? (
            <EmptyState title="You're all caught up" description="No follow-ups due today." />
          ) : (
            <ul className="divide-y divide-[#eef2f7]">
              {dueRows.map((l) => {
                const overdue = l.next_follow_up_at && new Date(l.next_follow_up_at) < new Date();
                return (
                  <li key={l.id}>
                    <Link href={`/admin/leads/${l.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-[#f8fafc]">
                      <span className="min-w-0">
                        <span className="block truncate text-[13.5px] font-semibold text-[#0f172a]">{l.name}</span>
                        <span className="block truncate text-[12.5px] text-[#64748b]">{l.interest ?? l.phone}</span>
                      </span>
                      <span className={`shrink-0 text-[12.5px] font-semibold ${overdue ? "text-[#b91c1c]" : "text-[#b45309]"}`}>
                        {formatDateTime(l.next_follow_up_at)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card>
          <CardTitle title="Latest leads" href="/admin/leads" />
          {recentLeads.length === 0 ? (
            <EmptyState title="No leads yet" description="Website enquiries will show up here in real time." />
          ) : (
            <ul className="divide-y divide-[#eef2f7]">
              {recentLeads.map((l) => (
                <li key={l.id}>
                  <Link href={`/admin/leads/${l.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-[#f8fafc]">
                    <span className="min-w-0">
                      <span className="block truncate text-[13.5px] font-semibold text-[#0f172a]">{l.name}</span>
                      <span className="block truncate text-[12.5px] text-[#64748b]">
                        {l.interest ?? "General enquiry"} · {l.source}
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1">
                      <LeadStatusBadge status={l.status} />
                      <span className="text-[11.5px] text-[#94a3b8]">{timeAgo(l.created_at)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="p-5">
          <h2 className="mb-4 text-[14px] font-bold text-[#0b2c5e]">Pipeline (last 30 days)</h2>
          <ul className="space-y-2.5">
            {funnel.map((f) => (
              <li key={f.value} className="grid grid-cols-[96px_1fr_32px] items-center gap-2 text-[12.5px]">
                <span className="text-[#475569]">{f.label}</span>
                <span className="h-2 overflow-hidden rounded-full bg-[#eef2f7]">
                  <span className="block h-full rounded-full bg-[#2563eb]" style={{ width: `${(f.count / funnelMax) * 100}%` }} />
                </span>
                <span className="text-right font-semibold text-[#0f172a]">{f.count}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Breakdown title="Top sources (30 days)" rows={bySource} total={real.length} />
        <Breakdown title="Top services (30 days)" rows={byService} total={real.length} />
      </div>
    </section>
  );
}

async function CareersOverview({ staffId }: { staffId: string }) {
  const db = await createClient();
  const weekAgo = new Date(istMidnight().getTime() - 6 * DAY).toISOString();
  const apps = () => db.from("job_applications").select("id", { count: "exact", head: true });
  const count = (q: PromiseLike<{ count: number | null }>) => Promise.resolve(q).then((r) => r.count ?? 0);

  const [openJobs, newCount, weekCount, mine, stageRows, recent] = await Promise.all([
    count(db.from("jobs").select("id", { count: "exact", head: true }).eq("status", "open")),
    count(apps().eq("status", "new")),
    count(apps().gte("created_at", weekAgo)),
    count(apps().eq("assigned_to", staffId).not("status", "in", "(hired,rejected,withdrawn)")),
    db
      .from("job_applications")
      .select("status")
      .not("status", "in", "(hired,rejected,withdrawn)")
      .limit(10_000)
      .then((r) => r.data ?? []),
    db
      .from("job_applications")
      .select("id, full_name, status, created_at, job:jobs!job_applications_job_id_fkey(title)")
      .order("created_at", { ascending: false })
      .limit(6)
      .then((r) => r.data ?? []),
  ]);

  const stages = APPLICATION_STATUSES.filter((s) => !s.closed).map((s) => ({
    ...s,
    count: stageRows.filter((r) => r.status === s.value).length,
  }));
  const stageMax = Math.max(1, ...stages.map((s) => s.count));

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi label="Open roles" value={openJobs} href="/admin/careers?status=open" />
        <Kpi label="New applications" value={newCount} href="/admin/careers/applications?status=new" alert={newCount > 0} />
        <Kpi label="Applications (7 days)" value={weekCount} href="/admin/careers/applications" />
        <Kpi label="My candidates" value={mine} href="/admin/careers/applications?status=active&assignee=me" />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
        <Card className="p-5">
          <h2 className="mb-4 text-[14px] font-bold text-[#0b2c5e]">Hiring pipeline</h2>
          <ul className="space-y-2.5">
            {stages.map((s) => (
              <li key={s.value}>
                <Link href={`/admin/careers/applications?status=${s.value}`} className="grid grid-cols-[88px_1fr_32px] items-center gap-2 text-[12.5px] hover:opacity-80">
                  <span className="text-[#475569]">{s.label}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-[#eef2f7]">
                    <span className="block h-full rounded-full bg-[#2563eb]" style={{ width: `${(s.count / stageMax) * 100}%` }} />
                  </span>
                  <span className="text-right font-semibold text-[#0f172a]">{s.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle title="Latest applications" href="/admin/careers/applications" />
          {recent.length === 0 ? (
            <EmptyState
              title="No applications yet"
              description="Publish a job and applications will appear here."
              action={<Link href="/admin/careers" className={buttonClass("primary", "sm")}>Manage jobs</Link>}
            />
          ) : (
            <ul className="divide-y divide-[#eef2f7]">
              {recent.map((a) => (
                <li key={a.id}>
                  <Link href={`/admin/careers/applications/${a.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-[#f8fafc]">
                    <span className="min-w-0">
                      <span className="block truncate text-[13.5px] font-semibold text-[#0f172a]">{a.full_name}</span>
                      <span className="block truncate text-[12.5px] text-[#64748b]">{a.job?.title ?? "—"}</span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1">
                      <ApplicationStatusBadge status={a.status} />
                      <span className="text-[11.5px] text-[#94a3b8]">{timeAgo(a.created_at)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </section>
  );
}

async function BlogOverview() {
  const db = await createClient();
  const monthStart = istMidnight(-29).toISOString();
  const nowIso = new Date().toISOString();
  const head = () => db.from("blog_posts").select("id", { count: "exact", head: true });

  const [published30, drafts, scheduled, recent] = await Promise.all([
    head().in("status", ["published", "scheduled"]).gte("published_at", monthStart).lte("published_at", nowIso).then((r) => r.count ?? 0),
    head().eq("status", "draft").then((r) => r.count ?? 0),
    head().eq("status", "scheduled").gt("published_at", nowIso).then((r) => r.count ?? 0),
    db
      .from("blog_posts")
      .select("id, title, status, published_at, updated_at")
      .order("updated_at", { ascending: false })
      .limit(6)
      .then((r) => r.data ?? []),
  ]);

  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_2fr]">
      <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
        <Kpi label="Posts published (30d)" value={published30} hint={`${(published30 / 30).toFixed(1)} per day`} href="/admin/blog?status=published" />
        <Kpi label="Scheduled" value={scheduled} href="/admin/blog?status=scheduled" />
        <Kpi label="Drafts" value={drafts} href="/admin/blog?status=draft" />
      </div>
      <Card>
        <CardTitle title="Recently edited posts" href="/admin/blog" />
        {recent.length === 0 ? (
          <EmptyState title="No posts yet" action={<Link href="/admin/blog/new" className={buttonClass("primary", "sm")}>Write the first post</Link>} />
        ) : (
          <ul className="divide-y divide-[#eef2f7]">
            {recent.map((p) => (
              <li key={p.id}>
                <Link href={`/admin/blog/${p.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-[#f8fafc]">
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-semibold text-[#0f172a]">{p.title}</span>
                    <span className="text-[12px] text-[#94a3b8]">Edited {timeAgo(p.updated_at)}</span>
                  </span>
                  <PostStatusBadge status={p.status} publishedAt={p.published_at} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
}

function Kpi({
  label,
  value,
  hint,
  hintTone = "up",
  href,
  alert,
}: {
  label: string;
  value: number | string;
  hint?: string;
  hintTone?: "up" | "down";
  href?: string;
  alert?: boolean;
}) {
  const body = (
    <Card className={`h-full p-4 transition ${href ? "hover:border-[#bfdbfe]" : ""} ${alert ? "!border-[#fde68a] !bg-[#fffbeb]" : ""}`}>
      <p className="text-[12px] font-semibold text-[#64748b]">{label}</p>
      <p className={`mt-1 text-[26px] font-bold leading-none tracking-tight ${alert ? "text-[#b45309]" : "text-[#0b2c5e]"}`}>
        {typeof value === "number" ? value.toLocaleString("en-IN") : value}
      </p>
      {hint && <p className={`mt-1.5 text-[11.5px] font-medium ${hintTone === "down" ? "text-[#b91c1c]" : "text-[#15803d]"}`}>{hint}</p>}
    </Card>
  );
  return href ? <Link href={href} className="block">{body}</Link> : body;
}

function CardTitle({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#eef2f7] px-5 py-3.5">
      <h2 className="text-[14px] font-bold text-[#0b2c5e]">{title}</h2>
      <Link href={href} className="text-[12.5px] font-semibold text-[#2563eb] hover:underline">View all</Link>
    </div>
  );
}

function Breakdown({ title, rows, total }: { title: string; rows: [string, number][]; total: number }) {
  return (
    <Card className="p-5">
      <h2 className="mb-4 text-[14px] font-bold text-[#0b2c5e]">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-[13px] text-[#94a3b8]">No data yet.</p>
      ) : (
        <ul className="space-y-2.5">
          {rows.map(([label, n]) => (
            <li key={label} className="text-[12.5px]">
              <div className="mb-1 flex justify-between gap-2">
                <span className="truncate text-[#475569]">{label}</span>
                <span className="shrink-0 font-semibold text-[#0f172a]">{n}</span>
              </div>
              <span className="block h-1.5 overflow-hidden rounded-full bg-[#eef2f7]">
                <span className="block h-full rounded-full bg-[#0b2c5e]" style={{ width: `${(n / Math.max(total, 1)) * 100}%` }} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
