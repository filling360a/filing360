import { NextResponse, type NextRequest } from "next/server";
import { assertStaff, AuthError } from "@/lib/auth/dal";
import { buildApplicationQuery, parseApplicationFilters } from "@/lib/careers/admin-queries";
import { createClient } from "@/lib/supabase/server";

const MAX_ROWS = 10_000;
const BATCH = 1000;

/** Quotes a CSV cell and neutralises spreadsheet formula injection. */
function cell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let s = String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const COLUMNS = [
  ["Reference", "ref"],
  ["Applied at", "created_at"],
  ["Job", "job_title"],
  ["Department", "department"],
  ["Name", "full_name"],
  ["Email", "email"],
  ["Phone", "phone"],
  ["City", "current_city"],
  ["Experience (yrs)", "total_experience"],
  ["Current CTC (L)", "current_ctc"],
  ["Expected CTC (L)", "expected_ctc"],
  ["Notice (days)", "notice_period_days"],
  ["Stage", "status"],
  ["Rating", "rating"],
  ["Owner", "owner"],
  ["Source", "source"],
  ["UTM source", "utm_source"],
] as const;

export async function GET(request: NextRequest) {
  let staffId: string;
  try {
    staffId = (await assertStaff("careers")).id;
  } catch (err) {
    const status = err instanceof AuthError ? 403 : 500;
    return NextResponse.json({ error: "Not allowed" }, { status });
  }

  const filters = parseApplicationFilters(Object.fromEntries(request.nextUrl.searchParams));
  const db = await createClient();
  const lines = [COLUMNS.map(([label]) => cell(label)).join(",")];

  for (let offset = 0; offset < MAX_ROWS; offset += BATCH) {
    const { data, error } = await buildApplicationQuery(db, filters, staffId).range(offset, offset + BATCH - 1);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    for (const app of data ?? []) {
      const row: Record<string, unknown> = {
        ...app,
        job_title: app.job?.title,
        department: app.job?.department,
        owner: app.assignee?.full_name ?? app.assignee?.email ?? "",
      };
      lines.push(COLUMNS.map(([, key]) => cell(row[key])).join(","));
    }
    if (!data || data.length < BATCH) break;
  }

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(`\uFEFF${lines.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="filing360-applications-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
