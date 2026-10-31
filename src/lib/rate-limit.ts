import "server-only";
import { createHash } from "node:crypto";
import { env } from "@/lib/env";
import type { createAdminClient } from "@/lib/supabase/admin";

type Db = ReturnType<typeof createAdminClient>;

export type RateLimitFailure = { ok: false; status: number; error: string };

export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHash("sha256").update(`${env.ipHashSalt}:${ip}`).digest("hex").slice(0, 32);
}

/** Returns a failure if any limit is exceeded or the limiter itself errors (fail closed). */
export async function enforceRateLimits(
  db: Db,
  limits: { key: string; limit: number; windowSeconds: number }[],
): Promise<RateLimitFailure | null> {
  for (const { key, limit, windowSeconds } of limits) {
    const { data: allowed, error } = await db.rpc("check_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });
    if (error) {
      console.error("[rate-limit] check failed:", error.message);
      return {
        ok: false,
        status: 503,
        error: "Service is busy. Please wait a moment and try again.",
      };
    }
    if (!allowed) {
      return {
        ok: false,
        status: 429,
        error: "Too many requests. Please wait a few minutes and try again.",
      };
    }
  }
  return null;
}
