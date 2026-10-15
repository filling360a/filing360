import type { Metadata } from "next";
import { NewJobForm } from "@/components/admin/careers/NewJobForm";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "New job" };

const DEFAULT_DEPARTMENTS = ["Compliance", "Accounts & Tax", "Legal", "Sales", "Customer Success", "Operations", "Marketing", "Technology"];

export default async function NewJobPage() {
  await requireStaff("careers");
  const db = await createClient();
  const { data } = await db.from("jobs").select("department").limit(500);
  const departments = [...new Set([...(data ?? []).map((r) => r.department), ...DEFAULT_DEPARTMENTS])].sort();
  return (
    <>
      <PageHeader back={{ href: "/admin/careers", label: "All jobs" }} title="New job" description="Start with the title — you'll add requirements, salary and screening questions next." />
      <Card className="max-w-xl p-5 sm:p-6">
        <NewJobForm departments={departments} />
      </Card>
    </>
  );
}
