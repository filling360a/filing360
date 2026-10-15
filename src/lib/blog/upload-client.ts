"use client";

import { createBrowserSupabase } from "@/lib/supabase/client";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

/** Uploads an image to the public `blog-media` bucket and returns its URL. */
export async function uploadBlogImage(file: File, postId: string): Promise<string> {
  if (!TYPES.includes(file.type)) throw new Error("Use a JPG, PNG, WebP, GIF or AVIF image.");
  if (file.size > MAX_BYTES) throw new Error("Images must be 5 MB or smaller. Compress it and try again.");

  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50) || "image";
  const path = `posts/${postId}/${Date.now()}-${base}.${ext}`;

  const supabase = createBrowserSupabase();
  const { error } = await supabase.storage.from("blog-media").upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return supabase.storage.from("blog-media").getPublicUrl(path).data.publicUrl;
}
