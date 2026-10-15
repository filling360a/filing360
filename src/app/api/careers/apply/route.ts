import { after, NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { sendApplicationEmails, submitApplication } from "@/lib/careers/apply";
import { applicationSchema } from "@/lib/careers/schema";
import { clientIp, readJsonBody } from "@/lib/http";

const MAX_BODY_BYTES = 32 * 1024;

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request, MAX_BODY_BYTES);
  if (!body.ok) return body.response;

  const parsed = applicationSchema.safeParse(body.json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  const result = await submitApplication(parsed.data, {
    ip: clientIp(request),
    userAgent: request.headers.get("user-agent"),
  });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error, fields: result.fields }, { status: result.status });
  }

  after(() => sendApplicationEmails(parsed.data, result));

  return NextResponse.json({ ok: true, reference: result.reference }, { status: 201 });
}
