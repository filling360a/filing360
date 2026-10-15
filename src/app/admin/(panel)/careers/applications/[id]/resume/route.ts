import { NextResponse, type NextRequest } from "next/server";
import { assertStaff, AuthError } from "@/lib/auth/dal";
import { resumeDownloadUrl } from "@/lib/careers/resumes";
import { createClient } from "@/lib/supabase/server";

/** Checks access, records the view, then redirects to a 5-minute signed link. */
export async function GET(request: NextRequest, { params }: RouteContext<"/admin/careers/applications/[id]/resume">) {
  let staffId: string;
  try {
    staffId = (await assertStaff("careers")).id;
  } catch (err) {
    const status = err instanceof AuthError ? 403 : 500;
    return NextResponse.json({ error: "Not allowed" }, { status });
  }

  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const db = await createClient();
  const { data: app } = await db.from("job_applications").select("id, full_name, resume_path, resume_name").eq("id", id).maybeSingle();
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const download = request.nextUrl.searchParams.get("download") === "1";
  const ext = app.resume_path.split(".").pop() ?? "pdf";
  const fileName = `${app.full_name.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-") || "candidate"}-resume.${ext}`;

  let url: string;
  try {
    url = await resumeDownloadUrl(app.resume_path, download ? fileName : undefined, 300);
  } catch (err) {
    console.error("[careers/resume]", err);
    return NextResponse.json({ error: "Résumé unavailable" }, { status: 502 });
  }

  await db.from("application_activities").insert({
    application_id: app.id,
    actor_id: staffId,
    type: "resume_viewed",
    meta: { download },
  });

  return NextResponse.redirect(url, { status: 303, headers: { "Cache-Control": "no-store" } });
}
