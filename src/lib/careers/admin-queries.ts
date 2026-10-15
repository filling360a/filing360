import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { APPLICATION_STATUSES } from "@/lib/careers/constants";
import type { ApplicationStatus, Database } from "@/lib/supabase/database.types";

export const APPLICATIONS_PAGE_SIZE = 25;

const STATUS_VALUES = APPLICATION_STATUSES.map((s) => s.value);

export type ApplicationFilters = {
  q?: string;
  job?: string;
  status?: ApplicationStatus | "active";
  assignee?: string;
  rating?: number;
  sort: "newest" | "oldest" | "rating" | "updated";
  page: number;
};

type RawParams = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined): string | undefined {
  const v = Array.isArray(value) ? value[0] : value;
  return v?.trim() || undefined;
}

const isUuid = (v?: string) => Boolean(v && /^[0-9a-f-]{36}$/.test(v));

export function parseApplicationFilters(params: RawParams): ApplicationFilters {
  const status = one(params.status);
  const sort = one(params.sort);
  const rating = Number.parseInt(one(params.rating) ?? "", 10);
  const job = one(params.job);
  return {
    q: one(params.q)?.slice(0, 80),
    job: isUuid(job) ? job : undefined,
    status: status === "active" || STATUS_VALUES.includes(status as ApplicationStatus) ? (status as ApplicationFilters["status"]) : undefined,
    assignee: one(params.assignee),
    rating: rating >= 1 && rating <= 5 ? rating : undefined,
    sort: sort === "oldest" || sort === "rating" || sort === "updated" ? sort : "newest",
    page: Math.max(1, Number.parseInt(one(params.page) ?? "1", 10) || 1),
  };
}

export function applicationFiltersToSearch(filters: Partial<ApplicationFilters>, overrides: Partial<ApplicationFilters> = {}): string {
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

type Client = SupabaseClient<Database>;

const APPLICATION_LIST_SELECT =
  "id, ref, full_name, email, phone, current_city, total_experience, current_ctc, expected_ctc, notice_period_days, status, rating, source, utm_source, created_at, updated_at, job:jobs!job_applications_job_id_fkey(id, title, department), assignee:profiles!job_applications_assigned_to_fkey(id, full_name, email)" as const;

export function buildApplicationQuery(db: Client, filters: ApplicationFilters, staffId: string) {
  let query = db.from("job_applications").select(APPLICATION_LIST_SELECT, { count: "exact" });

  if (filters.status === "active") query = query.not("status", "in", "(hired,rejected,withdrawn)");
  else if (filters.status) query = query.eq("status", filters.status);

  if (filters.job) query = query.eq("job_id", filters.job);
  if (filters.rating) query = query.gte("rating", filters.rating);
  if (filters.assignee === "me") query = query.eq("assigned_to", staffId);
  else if (filters.assignee === "unassigned") query = query.is("assigned_to", null);
  else if (isUuid(filters.assignee)) query = query.eq("assigned_to", filters.assignee!);

  if (filters.q) {
    const term = searchTerm(filters.q);
    if (term) {
      const digits = term.replace(/\D/g, "");
      const ors = [`full_name.ilike.*${term}*`, `email.ilike.*${term}*`, `ref.ilike.*${term}*`, `current_city.ilike.*${term}*`];
      if (digits.length >= 4) ors.push(`phone.ilike.*${digits}*`);
      query = query.or(ors.join(","));
    }
  }

  switch (filters.sort) {
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "rating":
      query = query.order("rating", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false });
      break;
    case "updated":
      query = query.order("updated_at", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  return query;
}

export type Recruiter = { id: string; full_name: string | null; email: string };

export async function getRecruiters(db: Client): Promise<Recruiter[]> {
  const { data } = await db
    .from("profiles")
    .select("id, full_name, email")
    .eq("is_active", true)
    .in("role", ["admin", "hr"])
    .order("full_name");
  return data ?? [];
}

export async function getJobOptions(db: Client) {
  const { data } = await db.from("jobs").select("id, title, status").order("created_at", { ascending: false }).limit(200);
  return data ?? [];
}
