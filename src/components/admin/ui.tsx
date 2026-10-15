import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { APPLICATION_STATUSES, JOB_STATUSES } from "@/lib/careers/constants";
import type { ApplicationStatus, JobStatus, LeadPriority, LeadStatus, PostStatus } from "@/lib/supabase/database.types";

export const inputClass =
  "block w-full rounded-lg border border-[#d7dee8] bg-white px-3 py-2 text-sm text-[#0f172a] shadow-sm outline-none transition placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 disabled:bg-[#f1f5f9]";

export const labelClass = "mb-1 block text-[12.5px] font-semibold text-[#334155]";

const buttonVariants = {
  primary: "bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-sm",
  secondary: "border border-[#d7dee8] bg-white text-[#0f172a] hover:bg-[#f8fafc]",
  danger: "border border-[#fecaca] bg-white text-[#b91c1c] hover:bg-[#fef2f2]",
  ghost: "text-[#334155] hover:bg-[#eef2f7]",
  dark: "bg-[#0b2c5e] text-white hover:bg-[#123a74]",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export function buttonClass(variant: ButtonVariant = "primary", size: "sm" | "md" = "md") {
  const sizing = size === "sm" ? "h-8 px-3 text-[13px]" : "h-10 px-4 text-sm";
  return `inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${sizing} ${buttonVariants[variant]}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: "sm" | "md" }) {
  return <button className={`${buttonClass(variant, size)} ${className}`} {...props} />;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-[#e3e8ef] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${className}`}>{children}</div>;
}

export function PageHeader({
  title,
  description,
  actions,
  back,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {back && (
          <Link href={back.href} className="mb-1 inline-flex items-center gap-1 text-[13px] font-medium text-[#64748b] hover:text-[#0f172a]">
            ← {back.label}
          </Link>
        )}
        <h1 className="truncate text-[22px] font-bold tracking-tight text-[#0b2c5e] md:text-[26px]">{title}</h1>
        {description && <p className="mt-1 text-sm text-[#64748b]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <p className="text-[15px] font-semibold text-[#0f172a]">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-[#64748b]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

const tones = {
  slate: "bg-[#f1f5f9] text-[#475569] ring-[#e2e8f0]",
  blue: "bg-[#eff6ff] text-[#1d4ed8] ring-[#bfdbfe]",
  indigo: "bg-[#eef2ff] text-[#4338ca] ring-[#c7d2fe]",
  amber: "bg-[#fffbeb] text-[#b45309] ring-[#fde68a]",
  violet: "bg-[#f5f3ff] text-[#6d28d9] ring-[#ddd6fe]",
  green: "bg-[#f0fdf4] text-[#15803d] ring-[#bbf7d0]",
  red: "bg-[#fef2f2] text-[#b91c1c] ring-[#fecaca]",
  zinc: "bg-[#fafafa] text-[#71717a] ring-[#e4e4e7]",
} as const;

export type Tone = keyof typeof tones;

export function Badge({ tone = "slate", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11.5px] font-semibold ring-1 ring-inset ${tones[tone]}`}>
      {children}
    </span>
  );
}

export const LEAD_STATUSES: { value: LeadStatus; label: string; tone: Tone }[] = [
  { value: "new", label: "New", tone: "blue" },
  { value: "contacted", label: "Contacted", tone: "indigo" },
  { value: "qualified", label: "Qualified", tone: "violet" },
  { value: "proposal", label: "Proposal sent", tone: "amber" },
  { value: "won", label: "Won", tone: "green" },
  { value: "lost", label: "Lost", tone: "red" },
  { value: "spam", label: "Spam", tone: "zinc" },
];

export const LEAD_PRIORITIES: { value: LeadPriority; label: string; tone: Tone }[] = [
  { value: "low", label: "Low", tone: "slate" },
  { value: "normal", label: "Normal", tone: "blue" },
  { value: "high", label: "High", tone: "amber" },
  { value: "urgent", label: "Urgent", tone: "red" },
];

export const POST_STATUSES: { value: PostStatus; label: string; tone: Tone }[] = [
  { value: "draft", label: "Draft", tone: "slate" },
  { value: "scheduled", label: "Scheduled", tone: "amber" },
  { value: "published", label: "Published", tone: "green" },
  { value: "archived", label: "Archived", tone: "zinc" },
];

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const s = LEAD_STATUSES.find((x) => x.value === status)!;
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

export function PriorityBadge({ priority }: { priority: LeadPriority }) {
  const p = LEAD_PRIORITIES.find((x) => x.value === priority)!;
  return <Badge tone={p.tone}>{p.label}</Badge>;
}

export function PostStatusBadge({ status, publishedAt }: { status: PostStatus; publishedAt?: string | null }) {
  const s = POST_STATUSES.find((x) => x.value === status)!;
  const live = status === "scheduled" && publishedAt && new Date(publishedAt) <= new Date();
  return <Badge tone={live ? "green" : s.tone}>{live ? "Published" : s.label}</Badge>;
}

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const s = JOB_STATUSES.find((x) => x.value === status)!;
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  const s = APPLICATION_STATUSES.find((x) => x.value === status)!;
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

export function Rating({ value }: { value: number | null }) {
  if (!value) return <span className="text-[#cbd5e1]">—</span>;
  return (
    <span className="whitespace-nowrap text-[#f59e0b]" aria-label={`${value} out of 5`} title={`${value} / 5`}>
      {"★".repeat(value)}
      <span className="text-[#e2e8f0]">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export function Alert({ tone = "red", children }: { tone?: "red" | "green" | "amber" | "blue"; children: ReactNode }) {
  const styles = {
    red: "border-[#fecaca] bg-[#fef2f2] text-[#991b1b]",
    green: "border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]",
    amber: "border-[#fde68a] bg-[#fffbeb] text-[#92400e]",
    blue: "border-[#bfdbfe] bg-[#eff6ff] text-[#1e40af]",
  }[tone];
  return <div role={tone === "red" ? "alert" : "status"} className={`rounded-lg border px-3 py-2 text-[13px] font-medium ${styles}`}>{children}</div>;
}
