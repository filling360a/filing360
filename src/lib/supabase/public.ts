import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "./database.types";

/**
 * Cookie-less anon client for public, cacheable reads (published blog posts).
 * Returns null when Supabase isn't configured so public pages still render.
 */
export function createPublicClient() {
  if (!env.supabaseUrl || !env.supabasePublishableKey) return null;
  return createClient<Database>(env.supabaseUrl, env.supabasePublishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
