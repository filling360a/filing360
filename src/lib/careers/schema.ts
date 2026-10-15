import { z } from "zod";
import { normalizeIndianMobile } from "@/lib/leads/schema";
import { RESUME_MAX_BYTES, RESUME_TYPES } from "./constants";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .optional()
  .transform((v, ctx) => {
    if (!v) return undefined;
    const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
    try {
      const url = new URL(withScheme);
      if (!url.hostname.includes(".")) throw new Error("bad host");
      return url.toString();
    } catch {
      ctx.addIssue({ code: "custom", message: "Enter a valid link" });
      return z.NEVER;
    }
  });

const optionalNumber = (max: number, message: string) =>
  z
    .union([z.number(), z.string()])
    .optional()
    .transform((v, ctx) => {
      if (v === undefined || v === "") return undefined;
      const n = typeof v === "number" ? v : Number(String(v).replace(/[,\s]/g, ""));
      if (!Number.isFinite(n) || n < 0 || n > max) {
        ctx.addIssue({ code: "custom", message });
        return z.NEVER;
      }
      return Math.round(n * 10) / 10;
    });

export const uploadRequestSchema = z.object({
  jobId: z.uuid(),
  fileName: z.string().trim().min(1).max(200),
  fileSize: z.number().int().positive().max(RESUME_MAX_BYTES, "Résumé must be 5 MB or smaller"),
  fileType: z.string().refine((t) => t in RESUME_TYPES, "Upload a PDF or Word document"),
});

export const PENDING_RESUME_PATH = /^pending\/[0-9a-f-]{36}\.(pdf|docx?)$/;

export const applicationSchema = z.object({
  jobId: z.uuid(),
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.email("Enter a valid email address").max(254).transform((v) => v.toLowerCase()),
  phone: z
    .string()
    .trim()
    .transform((v, ctx) => {
      const phone = normalizeIndianMobile(v);
      if (!phone) {
        ctx.addIssue({ code: "custom", message: "Enter a valid 10-digit Indian mobile number" });
        return z.NEVER;
      }
      return phone;
    }),
  current_city: optionalText(80),
  linkedin_url: optionalUrl,
  portfolio_url: optionalUrl,
  total_experience: optionalNumber(50, "Enter years of experience (0–50)"),
  current_ctc: optionalNumber(500, "Enter CTC in lakhs per year"),
  expected_ctc: optionalNumber(500, "Enter CTC in lakhs per year"),
  notice_period_days: optionalNumber(180, "Enter notice period in days (0–180)"),
  cover_letter: optionalText(5000),
  answers: z.record(z.string().max(40), z.string().trim().max(1000)).default({}),
  resume: z.object({
    path: z.string().regex(PENDING_RESUME_PATH, "Please upload your résumé again"),
    name: z.string().trim().min(1).max(200),
  }),
  consent: z.literal(true, "Please accept to continue"),
  attribution: z
    .object({
      utm_source: optionalText(120),
      utm_medium: optionalText(120),
      utm_campaign: optionalText(200),
      referrer: optionalText(500),
    })
    .optional(),
  company_website: z.string().max(200).optional(),
  started_at: z.number().int().optional(),
});

export type ApplicationInput = z.output<typeof applicationSchema>;
