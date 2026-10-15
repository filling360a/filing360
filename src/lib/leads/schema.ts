import { z } from "zod";

/** Normalises Indian mobile numbers to +91XXXXXXXXXX; returns null if invalid. */
export function normalizeIndianMobile(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const attributionSchema = z.object({
  utm_source: optionalText(120),
  utm_medium: optionalText(120),
  utm_campaign: optionalText(200),
  utm_term: optionalText(200),
  utm_content: optionalText(200),
  gclid: optionalText(300),
  landing_page: optionalText(500),
  referrer: optionalText(500),
});

export type Attribution = Partial<z.infer<typeof attributionSchema>>;

export const publicLeadSchema = z.object({
  salutation: z.enum(["Mr", "Ms", "Mrs", "Dr"]).optional(),
  name: z.string().trim().min(2, "Please enter your name").max(120),
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
  email: z
    .union([z.literal(""), z.email("Enter a valid email address").max(254)])
    .optional()
    .transform((v) => (v ? v.toLowerCase() : undefined)),
  city: optionalText(80),
  interest: optionalText(160),
  service_slug: optionalText(160),
  message: optionalText(2000),
  source: z
    .string()
    .trim()
    .max(60)
    .regex(/^[a-z0-9-]+$/)
    .default("website"),
  page_url: optionalText(500),
  attribution: attributionSchema.optional(),
  // Bot traps: real users never fill `company_website`, and take > 2s to submit.
  company_website: z.string().max(200).optional(),
  started_at: z.number().int().optional(),
});

export type PublicLeadInput = z.input<typeof publicLeadSchema>;
export type PublicLead = z.output<typeof publicLeadSchema>;
