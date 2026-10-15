import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { cleanupPendingResumes } from "@/lib/careers/resumes";
import { env, isSupabaseAdminConfigured } from "@/lib/env";

// Daily Vercel Cron (see vercel.json): removes résumé uploads that were never
// attached to a submitted application.
export async function GET(request: NextRequest) {
  const expected = env.cronSecret ? `Bearer ${env.cronSecret}` : null;
  const given = request.headers.get("authorization") ?? "";
  if (!expected || given.length !== expected.length || !timingSafeEqual(Buffer.from(given), Buffer.from(expected))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isSupabaseAdminConfigured()) return NextResponse.json({ ok: true, removed: 0 });

  try {
    const removed = await cleanupPendingResumes();
    return NextResponse.json({ ok: true, removed });
  } catch (err) {
    console.error("[cron] résumé cleanup failed:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
