import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, LeadPriority, LeadStatus } from "@/lib/supabase/database.types";

export const PAGE_SIZE = 25;

const STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "proposal", "won", "lost", "spam"];
const PRIORITIES: LeadPriority[] = ["low", "normal", "high", "urgent"];

export type LeadFilters = {
  q?: string;
  status?: LeadStatus | "open";
  priority?: LeadPriority;
  assignee?: string;
  source?: string;
  from?: string;
  to?: string;
  followUp?: "due";
  sort: "newest" | "oldest" | "follow_up" | "updated";
  page: number;
};

type RawParams = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined): string | undefined {
  const v = Array.isArray(value) ? value[0] : value;
  return v?.trim() || undefined;
}

export function parseLeadFilters(params: RawParams): LeadFilters {
  const status = one(params.status);
  const priority = one(params.priority);
  const sort = one(params.sort);
  const date = (v?: string) => (v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : undefined);
  return {
    q: one(params.q)?.slice(0, 80),
    status: status === "open" || STATUSES.includes(status as LeadStatus) ? (status as LeadFilters["status"]) : undefined,
    priority: PRIORITIES.includes(priority as LeadPriority) ? (priority as LeadPriority) : undefined,
    assignee: one(params.assignee),
    source: one(params.source)?.slice(0, 60),
    from: date(one(params.from)),
    to: date(one(params.to)),
    followUp: one(params.followUp) === "due" ? "due" : undefined,
    sort: sort === "oldest" || sort === "follow_up" || sort === "updated" ? sort : "newest",
    page: Math.max(1, Number.parseInt(one(params.page) ?? "1", 10) || 1),
  };
}

export function filtersToSearch(filters: Partial<LeadFilters>, overrides: Partial<LeadFilters> = {}): string {
  const merged = { ...filters, ...overrides };
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    if (value === undefined || value === null || value === "") continue;
    if (key === "page" && value === 1) continue;
    if (key === "sort" && value === "newest") continue;
    params.set(key, String(value));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

/** Strips characters that have meaning in PostgREST filter syntax. */
function searchTerm(q: string): string {
  return q.replace(/[,()*%\\:"']/g, " ").replace(/\s+/g, " ").trim();
}

// IST midnight boundaries for date filters.
const istStart = (d: string) => new Date(`${d}T00:00:00+05:30`).toISOString();
const istEnd = (d: string) => new Date(`${d}T23:59:59.999+05:30`).toISOString();

type Client = SupabaseClient<Database>;

const LEAD_LIST_SELECT = "*, assignee:profiles!leads_assigned_to_fkey(id, full_name, email)" as const;

export function buildLeadQuery(db: Client, filters: LeadFilters, staffId: string) {
  let query = db.from("leads").select(LEAD_LIST_SELECT, { count: "exact" });

  if (filters.status === "open") query = query.not("status", "in", "(won,lost,spam)");
  else if (filters.status) query = query.eq("status", filters.status);
  else query = query.neq("status", "spam");

  if (filters.priority) query = query.eq("priority", filters.priority);
  if (filters.source) query = query.eq("source", filters.source);
  if (filters.assignee === "me") query = query.eq("assigned_to", staffId);
  else if (filters.assignee === "unassigned") query = query.is("assigned_to", null);
  else if (filters.assignee && /^[0-9a-f-]{36}$/.test(filters.assignee)) query = query.eq("assigned_to", filters.assignee);
  if (filters.from) query = query.gte("created_at", istStart(filters.from));
  if (filters.to) query = query.lte("created_at", istEnd(filters.to));
  if (filters.followUp === "due") {
    query = query.lte("next_follow_up_at", new Date().toISOString()).not("status", "in", "(won,lost,spam)");
  }

  if (filters.q) {
    const term = searchTerm(filters.q);
    if (term) {
      const digits = term.replace(/\D/g, "");
      const ors = [`name.ilike.*${term}*`, `email.ilike.*${term}*`, `ref.ilike.*${term}*`, `city.ilike.*${term}*`];
      if (digits.length >= 4) ors.push(`phone.ilike.*${digits}*`);
      query = query.or(ors.join(","));
    }
  }

  switch (filters.sort) {
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "follow_up":
      query = query.order("next_follow_up_at", { ascending: true, nullsFirst: false });
      break;
    case "updated":
      query = query.order("updated_at", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  return query;
}

export type TeamMember = { id: string; full_name: string | null; email: string; role: Database["public"]["Enums"]["app_role"] | null };

export async function getAssignableTeam(db: Client): Promise<TeamMember[]> {
  const { data } = await db
    .from("profiles")
    .select("id, full_name, email, role")
    .eq("is_active", true)
    .in("role", ["admin", "sales"])
    .order("full_name");
  return data ?? [];
}

export async function getLeadSources(db: Client): Promise<string[]> {
  const { data } = await db.from("leads").select("source").order("created_at", { ascending: false }).limit(1000);
  return [...new Set((data ?? []).map((r) => r.source))].sort();
}
