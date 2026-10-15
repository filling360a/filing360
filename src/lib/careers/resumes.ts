import "server-only";
import { randomUUID } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { RESUME_MAX_BYTES, RESUME_TYPES } from "./constants";

// All résumé file handling lives here so the storage backend (Supabase Storage
// today) can be swapped for S3 / Cloudflare R2 without touching callers.

const BUCKET = "resumes";
const PENDING_TTL_MS = 24 * 60 * 60 * 1000;

type Ext = "pdf" | "doc" | "docx";

function bucket() {
  return createAdminClient().storage.from(BUCKET);
}

/** One-time upload URL for a new file under `pending/`. */
export async function createResumeUploadUrl(fileType: string) {
  const type = RESUME_TYPES[fileType];
  if (!type) throw new Error("Unsupported file type");
  const path = `pending/${randomUUID()}.${type.ext}`;
  const { data, error } = await bucket().createSignedUploadUrl(path);
  if (error || !data) throw new Error(error?.message ?? "Could not create upload URL");
  return { path, uploadUrl: data.signedUrl };
}

function sniff(bytes: Uint8Array): Ext | null {
  const hex = Array.from(bytes.slice(0, 4), (b) => b.toString(16).padStart(2, "0")).join("");
  if (hex === "25504446") return "pdf"; // %PDF
  if (hex === "504b0304") return "docx"; // ZIP container (OOXML)
  if (hex === "d0cf11e0") return "doc"; // OLE2 compound file
  return null;
}

export type VerifiedResume = { path: string; size: number; type: string };

/**
 * Confirms the uploaded object exists, is within the size limit and really is
 * a PDF / Word file (by magic bytes, not the client-declared type), then moves
 * it out of `pending/` into the application's folder.
 */
export async function finalizeResume(pendingPath: string, applicationId: string): Promise<VerifiedResume> {
  const storage = bucket();
  const { data: signed, error } = await storage.createSignedUrl(pendingPath, 60);
  if (error || !signed) throw new ResumeError("We couldn't find your résumé upload. Please attach it again.");

  const res = await fetch(signed.signedUrl, { headers: { Range: "bytes=0-7" }, cache: "no-store" });
  if (!res.ok) throw new ResumeError("We couldn't read your résumé. Please attach it again.");
  const head = new Uint8Array(await res.arrayBuffer());
  const total = Number(res.headers.get("content-range")?.split("/")[1] ?? res.headers.get("content-length") ?? 0);

  const ext = sniff(head);
  const declared = pendingPath.split(".").pop() as Ext;
  const compatible = ext === declared || (ext === "docx" && declared === "doc") || (ext === "doc" && declared === "docx");
  if (!ext || !compatible) {
    await storage.remove([pendingPath]);
    throw new ResumeError("That file doesn't look like a PDF or Word document.");
  }
  if (!total || total > RESUME_MAX_BYTES) {
    await storage.remove([pendingPath]);
    throw new ResumeError("Résumé must be 5 MB or smaller.");
  }

  const finalPath = `applications/${applicationId}/resume.${ext}`;
  const { error: moveError } = await storage.move(pendingPath, finalPath);
  if (moveError) throw new Error(`Résumé move failed: ${moveError.message}`);

  const type = Object.entries(RESUME_TYPES).find(([, t]) => t.ext === ext)![0];
  return { path: finalPath, size: total, type };
}

export async function removeResume(path: string) {
  await bucket().remove([path]);
}

/** Short-lived link for staff to view or download a résumé. */
export async function resumeDownloadUrl(path: string, downloadName?: string, expiresIn = 300) {
  const { data, error } = await bucket().createSignedUrl(path, expiresIn, downloadName ? { download: downloadName } : undefined);
  if (error || !data) throw new Error(error?.message ?? "Could not create download link");
  return data.signedUrl;
}

/** Deletes uploads that were never attached to an application. */
export async function cleanupPendingResumes(): Promise<number> {
  const storage = bucket();
  const cutoff = Date.now() - PENDING_TTL_MS;
  let removed = 0;
  for (let round = 0; round < 20; round++) {
    const { data, error } = await storage.list("pending", {
      limit: 500,
      sortBy: { column: "created_at", order: "asc" },
    });
    if (error) throw new Error(error.message);
    const stale = (data ?? [])
      .filter((f) => f.id && f.created_at && new Date(f.created_at).getTime() < cutoff)
      .map((f) => `pending/${f.name}`);
    if (stale.length === 0) break;
    const { error: removeError } = await storage.remove(stale);
    if (removeError) throw new Error(removeError.message);
    removed += stale.length;
    if (stale.length < 500) break;
  }
  return removed;
}

export class ResumeError extends Error {}
