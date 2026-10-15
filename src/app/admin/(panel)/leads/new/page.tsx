import type { Metadata } from "next";
import { NewLeadForm } from "@/components/admin/leads/NewLeadForm";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/auth/dal";
import { getAssignableTeam } from "@/lib/leads/queries";
import { leadInterestOptions } from "@/lib/siteConfig";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Add lead" };

export default async function NewLeadPage() {
  const staff = await requireStaff("leads");
  const team = await getAssignableTeam(await createClient());
  return (
    <>
      <PageHeader back={{ href: "/admin/leads", label: "All leads" }} title="Add lead" description="For enquiries that came in by phone, WhatsApp, referral or walk-in." />
      <Card className="max-w-2xl p-5 sm:p-6">
        <NewLeadForm team={team} currentUserId={staff.id} services={[...leadInterestOptions]} />
      </Card>
    </>
  );
}
