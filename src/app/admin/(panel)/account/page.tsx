import type { Metadata } from "next";
import Link from "next/link";
import { ProfileForm } from "@/components/admin/team/TeamForms";
import { Badge, buttonClass, Card, PageHeader } from "@/components/admin/ui";
import { requireStaff, ROLE_LABELS } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "My account" };

export default async function AccountPage() {
  const me = await requireStaff();
  return (
    <>
      <PageHeader title="My account" description={<>{me.email} · <Badge tone="blue">{ROLE_LABELS[me.role]}</Badge></>} />
      <div className="grid max-w-4xl gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="p-5 sm:p-6">
          <h2 className="mb-1 text-[15px] font-bold text-[#0f2a45]">Profile</h2>
          <p className="mb-4 text-[13px] text-[#5b6e7a]">Your name, title and bio appear as the author on blog posts — this builds trust with readers and Google.</p>
          <ProfileForm profile={me} />
        </Card>
        <Card className="h-fit p-5">
          <h2 className="mb-1 text-[15px] font-bold text-[#0f2a45]">Password</h2>
          <p className="mb-3 text-[13px] text-[#5b6e7a]">Change the password you use to sign in.</p>
          <Link href="/admin/update-password" className={buttonClass("secondary", "sm")}>Change password</Link>
        </Card>
      </div>
    </>
  );
}
