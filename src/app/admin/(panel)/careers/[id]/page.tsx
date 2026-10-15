import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobEditor } from "@/components/admin/careers/JobEditor";
import { requireStaff } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Edit job" };

export default async function EditJobPage({ params }: PageProps<"/admin/careers/[id]">) {
  const staff = await requireStaff("careers");
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();

  const db = await createClient();
  const [{ data: job }, { count }, { data: departments }] = await Promise.all([
    db.from("jobs").select("*").eq("id", id).maybeSingle(),
    db.from("job_applications").select("id", { count: "exact", head: true }).eq("job_id", id),
    db.from("jobs").select("department").limit(500),
  ]);
  if (!job) notFound();

  return (
    <JobEditor
      job={job}
      applicationCount={count ?? 0}
      departments={[...new Set((departments ?? []).map((d) => d.department))].sort()}
      canDelete={staff.role === "admin"}
    />
  );
}
