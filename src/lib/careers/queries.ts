import "server-only";
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import type { Tables } from "@/lib/supabase/database.types";

const CARD_SELECT =
  "id, slug, title, department, location, workplace_type, employment_type, experience_min, experience_max, salary_min, salary_max, show_salary, summary, published_at, closes_at" as const;

export type JobCard = Pick<
  Tables<"jobs">,
  | "id"
  | "slug"
  | "title"
  | "department"
  | "location"
  | "workplace_type"
  | "employment_type"
  | "experience_min"
  | "experience_max"
  | "salary_min"
  | "salary_max"
  | "show_salary"
  | "summary"
  | "published_at"
  | "closes_at"
>;

export type PublicJob = Omit<Tables<"jobs">, "created_by" | "updated_by">;

/** Open roles whose deadline hasn't passed, newest first. */
export async function listOpenJobs(): Promise<JobCard[]> {
  const db = createPublicClient();
  if (!db) return [];
  const now = new Date().toISOString();
  const { data, error } = await db
    .from("jobs")
    .select(CARD_SELECT)
    .eq("status", "open")
    .or(`closes_at.is.null,closes_at.gt.${now}`)
    .order("published_at", { ascending: false })
    .limit(200);
  if (error) console.error("[careers] listOpenJobs:", error.message);
  return data ?? [];
}

/** Open or closed job (closed pages stay reachable for old links but can't be applied to). */
export const getJobBySlug = cache(async (slug: string): Promise<PublicJob | null> => {
  const db = createPublicClient();
  if (!db) return null;
  const { data } = await db
    .from("jobs")
    .select(
      "id, slug, title, department, location, workplace_type, employment_type, experience_min, experience_max, salary_min, salary_max, show_salary, openings, summary, description_html, responsibilities, requirements, nice_to_have, benefits, skills, screening_questions, status, published_at, closes_at, created_at, updated_at",
    )
    .eq("slug", slug)
    .maybeSingle();
  return data;
});
