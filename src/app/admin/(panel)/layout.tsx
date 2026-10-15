import { AdminShell } from "@/components/admin/AdminShell";
import { ACCESS, ROLE_LABELS, requireStaff, type Section } from "@/lib/auth/dal";

const NAV: { href: string; label: string; section: Section; icon: "home" | "leads" | "blog" | "careers" | "team" }[] = [
  { href: "/admin", label: "Dashboard", section: "dashboard", icon: "home" },
  { href: "/admin/leads", label: "Leads", section: "leads", icon: "leads" },
  { href: "/admin/blog", label: "Blog", section: "blog", icon: "blog" },
  { href: "/admin/careers", label: "Careers", section: "careers", icon: "careers" },
  { href: "/admin/team", label: "Team", section: "team", icon: "team" },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff();
  const nav = NAV.filter((item) => (ACCESS[item.section] as readonly string[]).includes(staff.role));

  return (
    <AdminShell
      nav={nav}
      user={{
        name: staff.full_name || staff.email,
        email: staff.email,
        role: ROLE_LABELS[staff.role],
      }}
    >
      {children}
    </AdminShell>
  );
}
