import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { isInviteLinkStillValid } from "@/lib/auth/staffAccess";
import { createClient } from "@/lib/supabase/server";

const OTP_TYPES: EmailOtpType[] = ["invite", "recovery", "signup", "magiclink", "email", "email_change"];

/** Landing point for Supabase invite / password-reset links. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/admin";
  const next = nextParam.startsWith("/admin") && !nextParam.startsWith("//") ? nextParam : "/admin";

  // Enforce 15-minute window on staff invites before consuming the one-time token.
  if (type === "invite") {
    const issued = searchParams.get("issued");
    const sig = searchParams.get("sig");
    if (!isInviteLinkStillValid(issued, sig)) {
      return NextResponse.redirect(new URL("/admin/login?error=invite-expired", origin));
    }
  }

  // Resent invites use a recovery token but still carry the signed 15-minute window.
  if (type === "recovery" && searchParams.has("issued")) {
    const issued = searchParams.get("issued");
    const sig = searchParams.get("sig");
    if (!isInviteLinkStillValid(issued, sig)) {
      return NextResponse.redirect(new URL("/admin/login?error=invite-expired", origin));
    }
  }

  const supabase = await createClient();

  if (tokenHash && type && OTP_TYPES.includes(type)) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      const destination = type === "invite" || type === "recovery" ? "/admin/update-password" : next;
      return NextResponse.redirect(new URL(destination, origin));
    }
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, origin));
  }

  return NextResponse.redirect(new URL("/admin/login?error=link-expired", origin));
}
