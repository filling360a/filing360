import { NextResponse, type NextRequest } from "next/server";
import { assertStaff, AuthError } from "@/lib/auth/dal";
import { buildLeadQuery, parseLeadFilters } from "@/lib/leads/queries";
import { createClient } from "@/lib/supabase/server";

const MAX_ROWS = 10_000;
const BATCH = 1000;

/** Quotes a CSV cell and neutralises spreadsheet formula injection. */
function cell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let s = Array.isArray(value) ? value.join("; ") : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const COLUMNS = [
  ["Reference", "ref"],
  ["Created at", "created_at"],
  ["Name", "name"],
  ["Phone", "phone"],
  ["Email", "email"],
  ["City", "city"],
  ["Service", "interest"],
  ["Status", "status"],
  ["Priority", "priority"],
  ["Owner", "owner"],
  ["Next follow-up", "next_follow_up_at"],
  ["Estimated value", "estimated_value"],
  ["Source", "source"],
  ["UTM source", "utm_source"],
  ["UTM medium", "utm_medium"],
  ["UTM campaign", "utm_campaign"],
  ["Page", "page_url"],
  ["Message", "message"],
  ["Tags", "tags"],
] as const;

export async function GET(request: NextRequest) {
  let staffId: string;
  try {
    staffId = (await assertStaff("leads")).id;
  } catch (err) {
    const status = err instanceof AuthError ? 403 : 500;
    return NextResponse.json({ error: "Not allowed" }, { status });
  }

  const filters = parseLeadFilters(Object.fromEntries(request.nextUrl.searchParams));
  const db = await createClient();
  const lines = [COLUMNS.map(([label]) => cell(label)).join(",")];

  for (let offset = 0; offset < MAX_ROWS; offset += BATCH) {
    const { data, error } = await buildLeadQuery(db, filters, staffId).range(offset, offset + BATCH - 1);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    for (const lead of data ?? []) {
      const row: Record<string, unknown> = { ...lead, owner: lead.assignee?.full_name ?? lead.assignee?.email ?? "" };
      lines.push(COLUMNS.map(([, key]) => cell(row[key])).join(","));
    }
    if (!data || data.length < BATCH) break;
  }

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(`\uFEFF${lines.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="filing360-leads-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
