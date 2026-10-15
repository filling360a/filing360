import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";

export function clientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip");
}

export function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    return host === request.headers.get("host") || host === new URL(env.siteUrl).host;
  } catch {
    return false;
  }
}

/** Same-origin check, body size cap and JSON parse shared by public POST endpoints. */
export async function readJsonBody(
  request: NextRequest,
  maxBytes: number,
): Promise<{ ok: true; json: unknown } | { ok: false; response: NextResponse }> {
  if (!sameOrigin(request)) {
    return { ok: false, response: NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 }) };
  }
  const raw = await request.text();
  if (raw.length > maxBytes) {
    return { ok: false, response: NextResponse.json({ ok: false, error: "Request too large" }, { status: 413 }) };
  }
  try {
    return { ok: true, json: JSON.parse(raw) };
  } catch {
    return { ok: false, response: NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 }) };
  }
}
