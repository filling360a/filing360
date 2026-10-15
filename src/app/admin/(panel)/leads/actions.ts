"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { LeadMessageEmail } from "@/emails/LeadMessageEmail";
import { assertStaff, AuthError } from "@/lib/auth/dal";
import { sendEmail } from "@/lib/email/send";
import { fromIstInputValue } from "@/lib/format";
import { normalizeIndianMobile } from "@/lib/leads/schema";
import { createClient } from "@/lib/supabase/server";
import type { LeadPriority, LeadStatus } from "@/lib/supabase/database.types";

export type ActionState = { ok?: boolean; error?: string; message?: string } | undefined;

const STATUSES = ["new", "contacted", "qualified", "proposal", "won", "lost", "spam"] as const;
const PRIORITIES = ["low", "normal", "high", "urgent"] as const;
const uuid = z.uuid();

function fail(err: unknown): ActionState {
  if (err instanceof AuthError) return { error: err.message };
  console.error("[admin/leads]", err);
  return { error: "Something went wrong. Please try again." };
}

const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v || null)
    .nullable()
    .optional();

const updateSchema = z.object({
  status: z.enum(STATUSES),
  priority: z.enum(PRIORITIES),
  assigned_to: z.union([uuid, z.literal("")]).transform((v) => v || null),
  next_follow_up_at: z.string().optional().transform((v) => fromIstInputValue(v)),
  estimated_value: z
    .string()
    .optional()
    .transform((v, ctx) => {
      if (!v) return null;
      const n = Number(v.replace(/[,₹\s]/g, ""));
      if (!Number.isFinite(n) || n < 0) {
        ctx.addIssue({ code: "custom", message: "Enter a valid amount" });
        return z.NEVER;
      }
      return n;
    }),
  lost_reason: text(300),
  tags: z
    .string()
    .optional()
    .transform((v) =>
      [...new Set((v ?? "").split(",").map((t) => t.trim().toLowerCase()).filter(Boolean))].slice(0, 12),
    ),
});

export async function updateLead(leadId: string, _: ActionState, formData: FormData): Promise<ActionState> {
  try {
    await assertStaff("leads");
    if (!uuid.safeParse(leadId).success) return { error: "Invalid lead" };
    const parsed = updateSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };

    const db = await createClient();
    const { data: current } = await db.from("leads").select("status, last_contacted_at").eq("id", leadId).single();
    const values = parsed.data;
    const touched = current?.status === "new" && values.status !== "new" && !current.last_contacted_at;

    const { error } = await db
      .from("leads")
      .update({
        ...values,
        lost_reason: values.status === "lost" ? values.lost_reason : null,
        ...(touched ? { last_contacted_at: new Date().toISOString() } : {}),
      })
      .eq("id", leadId);
    if (error) return { error: error.message };

    revalidatePath(`/admin/leads/${leadId}`);
    revalidatePath("/admin/leads");
    return { ok: true, message: "Saved" };
  } catch (err) {
    return fail(err);
  }
}

const activitySchema = z.object({
  type: z.enum(["note", "call"]),
  body: z.string().trim().min(1, "Write something first").max(4000),
});

export async function addLeadActivity(leadId: string, _: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const staff = await assertStaff("leads");
    if (!uuid.safeParse(leadId).success) return { error: "Invalid lead" };
    const parsed = activitySchema.safeParse({ type: formData.get("type"), body: formData.get("body") });
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };

    const db = await createClient();
    const { error } = await db
      .from("lead_activities")
      .insert({ lead_id: leadId, actor_id: staff.id, type: parsed.data.type, body: parsed.data.body });
    if (error) return { error: error.message };

    if (parsed.data.type === "call") {
      await db.from("leads").update({ last_contacted_at: new Date().toISOString() }).eq("id", leadId);
    }

    revalidatePath(`/admin/leads/${leadId}`);
    return { ok: true, message: parsed.data.type === "call" ? "Call logged" : "Note added" };
  } catch (err) {
    return fail(err);
  }
}

const emailSchema = z.object({
  subject: z.string().trim().min(3, "Add a subject").max(160),
  body: z.string().trim().min(10, "Write a message").max(5000),
});

export async function emailLead(leadId: string, _: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const staff = await assertStaff("leads");
    if (!uuid.safeParse(leadId).success) return { error: "Invalid lead" };
    const parsed = emailSchema.safeParse({ subject: formData.get("subject"), body: formData.get("body") });
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };

    const db = await createClient();
    const { data: lead } = await db.from("leads").select("id, name, email").eq("id", leadId).single();
    if (!lead?.email) return { error: "This lead has no email address." };

    const result = await sendEmail({
      to: lead.email,
      subject: parsed.data.subject,
      react: LeadMessageEmail({
        name: lead.name,
        body: parsed.data.body,
        senderName: staff.full_name ?? "Team Filing360",
        senderTitle: staff.job_title,
      }),
      template: "lead-message",
      leadId,
      sentBy: staff.id,
      replyTo: staff.email,
    });
    if (!result.ok) return { error: `Email not sent: ${result.error}` };

    await db.from("lead_activities").insert({
      lead_id: leadId,
      actor_id: staff.id,
      type: "email_sent",
      body: `${parsed.data.subject}\n\n${parsed.data.body}`,
    });
    await db.from("leads").update({ last_contacted_at: new Date().toISOString() }).eq("id", leadId);

    revalidatePath(`/admin/leads/${leadId}`);
    return { ok: true, message: "Email sent" };
  } catch (err) {
    return fail(err);
  }
}

const createSchema = z.object({
  name: z.string().trim().min(2, "Enter a name").max(120),
  phone: z
    .string()
    .trim()
    .transform((v, ctx) => {
      const phone = normalizeIndianMobile(v);
      if (!phone) {
        ctx.addIssue({ code: "custom", message: "Enter a valid 10-digit mobile number" });
        return z.NEVER;
      }
      return phone;
    }),
  email: z
    .union([z.literal(""), z.email("Enter a valid email")])
    .optional()
    .transform((v) => (v ? v.toLowerCase() : null)),
  city: text(80),
  interest: text(160),
  message: text(2000),
  source: z.enum(["phone-call", "whatsapp", "walk-in", "referral", "email", "event", "other"]),
  priority: z.enum(PRIORITIES),
  assigned_to: z.union([uuid, z.literal("")]).transform((v) => v || null),
});

export async function createLead(_: ActionState, formData: FormData): Promise<ActionState> {
  let leadId: string;
  try {
    const staff = await assertStaff("leads");
    const parsed = createSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };

    const db = await createClient();
    const { data, error } = await db
      .from("leads")
      .insert({ ...parsed.data, consent: true, created_by: staff.id })
      .select("id")
      .single();
    if (error || !data) return { error: error?.message ?? "Could not create lead" };
    leadId = data.id;
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/leads");
  redirect(`/admin/leads/${leadId}`);
}

const bulkSchema = z.object({
  ids: z.array(uuid).min(1, "Select at least one lead").max(200),
  action: z.enum(["status", "assign", "priority"]),
  value: z.string(),
});

export async function bulkUpdateLeads(input: { ids: string[]; action: string; value: string }): Promise<ActionState> {
  try {
    await assertStaff("leads");
    const parsed = bulkSchema.safeParse(input);
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };
    const { ids, action, value } = parsed.data;

    let patch: { status?: LeadStatus; priority?: LeadPriority; assigned_to?: string | null };
    if (action === "status" && (STATUSES as readonly string[]).includes(value)) patch = { status: value as LeadStatus };
    else if (action === "priority" && (PRIORITIES as readonly string[]).includes(value)) patch = { priority: value as LeadPriority };
    else if (action === "assign" && (value === "" || uuid.safeParse(value).success)) patch = { assigned_to: value || null };
    else return { error: "Invalid bulk action" };

    const db = await createClient();
    const { error } = await db.from("leads").update(patch).in("id", ids);
    if (error) return { error: error.message };

    revalidatePath("/admin/leads");
    return { ok: true, message: `Updated ${ids.length} lead${ids.length === 1 ? "" : "s"}` };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteLead(leadId: string): Promise<ActionState> {
  try {
    await assertStaff("team");
    if (!uuid.safeParse(leadId).success) return { error: "Invalid lead" };
    const db = await createClient();
    const { error } = await db.from("leads").delete().eq("id", leadId);
    if (error) return { error: error.message };
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}
