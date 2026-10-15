import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { clientIp, readJsonBody } from "@/lib/http";
import { lookupStatus, trackSchema } from "@/lib/track";

const MAX_BODY_BYTES = 2 * 1024;

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request, MAX_BODY_BYTES);
  if (!body.ok) return body.response;

  const parsed = trackSchema.safeParse(body.json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  const result = await lookupStatus(parsed.data, clientIp(request));
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error, fields: result.fields }, { status: result.status });
  }
  return NextResponse.json({ ok: true, status: result.status }, { headers: { "Cache-Control": "no-store" } });
}
