import type { Metadata } from "next";
import { InviteMemberForm, MemberControls } from "@/components/admin/team/TeamForms";
import { Badge, Card, PageHeader } from "@/components/admin/ui";
import { requireStaff, ROLE_LABELS } from "@/lib/auth/dal";
import { isEmailConfigured } from "@/lib/env";
import { timeAgo } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Team" };

const ROLE_HELP = [
  ["Admin", "Everything, including team management and deleting records."],
  ["Sales", "Leads: view, update, assign, add notes, email leads, export."],
  ["Editor", "Blog: write, edit, schedule and publish posts; manage categories and images."],
  ["HR", "Careers: post and close jobs, review applicants and résumés, move candidates through the pipeline."],
] as const;

export default async function TeamPage() {
  const me = await requireStaff("team");
  const db = await createClient();
  const { data: members } = await db.from("profiles").select("*").order("created_at");
  const emailEnabled = isEmailConfigured();

  return (
    <>
      <PageHeader title="Team" description="Invite people and control what they can access." />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-[#e3e8ef] text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#64748b]">
                  <th className="px-5 py-3">Member</th>
                  <th className="px-3 py-3">Role</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Joined</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(members ?? []).map((m) => (
                  <tr key={m.id} className="border-b border-[#eef2f7] last:border-0">
                    <td className="px-5 py-3">
                      <p className="font-semibold text-[#0f172a]">
                        {m.full_name || "—"} {m.id === me.id && <span className="text-[12px] font-medium text-[#94a3b8]">(you)</span>}
                      </p>
                      <p className="text-[12.5px] text-[#64748b]">{m.email}</p>
                    </td>
                    <td className="px-3 py-3">{m.role ? <Badge tone="blue">{ROLE_LABELS[m.role]}</Badge> : <Badge tone="amber">No access</Badge>}</td>
                    <td className="px-3 py-3">{m.is_active ? <Badge tone="green">Active</Badge> : <Badge tone="zinc">Deactivated</Badge>}</td>
                    <td className="px-3 py-3 text-[12.5px] text-[#64748b]">{timeAgo(m.created_at)}</td>
                    <td className="px-5 py-3 text-right">
                      {m.id !== me.id && (
                        <MemberControls userId={m.id} role={m.role} active={m.is_active} emailEnabled={emailEnabled} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <h2 className="mb-3 text-[15px] font-bold text-[#0b2c5e]">{emailEnabled ? "Invite a team member" : "Add a team member"}</h2>
            <InviteMemberForm emailEnabled={emailEnabled} />
          </Card>
          <Card className="p-5">
            <h2 className="mb-3 text-[14px] font-bold text-[#0b2c5e]">Roles</h2>
            <dl className="space-y-2.5 text-[12.5px]">
              {ROLE_HELP.map(([role, help]) => (
                <div key={role}>
                  <dt className="font-semibold text-[#0f172a]">{role}</dt>
                  <dd className="text-[#64748b]">{help}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>
    </>
  );
}
