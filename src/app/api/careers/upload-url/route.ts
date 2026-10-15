import { NextResponse, type NextRequest } from "next/server";
import { enforceRateLimits } from "@/lib/careers/apply";
import { isAcceptingApplications } from "@/lib/careers/constants";
import { createResumeUploadUrl } from "@/lib/careers/resumes";
import { uploadRequestSchema } from "@/lib/careers/schema";
import { isSupabaseAdminConfigured } from "@/lib/env";
import { clientIp, readJsonBody } from "@/lib/http";
import { hashIp } from "@/lib/leads/capture";
import { createAdminClient } from "@/lib/supabase/admin";

// Issues a one-time signed URL so the browser uploads the résumé straight to
// private storage. File bytes never pass through this server, which keeps
// requests small and lets many candidates upload at once.
export async function POST(request: NextRequest) {
  const body = await readJsonBody(request, 2048);
  if (!body.ok) return body.response;

  const parsed = uploadRequestSchema.safeParse(body.json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid file" }, { status: 422 });
  }
  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ ok: false, error: "Uploads are temporarily unavailable." }, { status: 503 });
  }

  const db = createAdminClient();
  const ipHash = hashIp(clientIp(request));
  if (ipHash) {
    const limited = await enforceRateLimits(db, [{ key: `resume-upload:ip:${ipHash}`, limit: 20, windowSeconds: 3600 }]);
    if (limited) return NextResponse.json(limited, { status: limited.status });
  }

  const { data: job } = await db.from("jobs").select("status, closes_at").eq("id", parsed.data.jobId).maybeSingle();
  if (!job || !isAcceptingApplications(job)) {
    return NextResponse.json({ ok: false, error: "This position is no longer accepting applications." }, { status: 410 });
  }

  try {
    const { path, uploadUrl } = await createResumeUploadUrl(parsed.data.fileType);
    return NextResponse.json({ ok: true, path, uploadUrl });
  } catch (err) {
    console.error("[careers] upload url failed:", err);
    return NextResponse.json({ ok: false, error: "Could not start the upload. Please try again." }, { status: 500 });
  }
}
