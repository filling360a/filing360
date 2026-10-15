import { after, NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { clientIp, readJsonBody } from "@/lib/http";
import { captureLead, sendLeadEmails } from "@/lib/leads/capture";
import { publicLeadSchema } from "@/lib/leads/schema";

const MAX_BODY_BYTES = 16 * 1024;

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request, MAX_BODY_BYTES);
  if (!body.ok) return body.response;

  const parsed = publicLeadSchema.safeParse(body.json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  const result = await captureLead(parsed.data, {
    ip: clientIp(request),
    userAgent: request.headers.get("user-agent"),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }

  after(() => sendLeadEmails(parsed.data, result));

  return NextResponse.json({ ok: true, reference: result.reference }, { status: 201 });
}
