"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { deletePost, restoreRevision, savePost, type PostInput, type SaveIntent } from "@/app/admin/(panel)/blog/actions";
import { Alert, Button, buttonClass, Card, inputClass, labelClass, PostStatusBadge } from "@/components/admin/ui";
import { uploadBlogImage } from "@/lib/blog/upload-client";
import { runSeoChecks } from "@/lib/blog/seo-checks";
import { fromIstInputValue, timeAgo, toIstInputValue } from "@/lib/format";
import { slugify } from "@/lib/slug";
import type { PostStatus, Tables } from "@/lib/supabase/database.types";
import { RichTextEditor } from "./RichTextEditor";

type Props = {
  post: Tables<"blog_posts">;
  categories: { id: string; name: string }[];
  authors: { id: string; full_name: string | null; email: string }[];
  revisions: { id: string; title: string; created_at: string; editor: string | null }[];
  siteUrl: string;
  canDelete: boolean;
};

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  cover_image_url: string;
  cover_image_alt: string;
  category_id: string;
  author_id: string;
  tags: string;
  seo_title: string;
  seo_description: string;
  focus_keyword: string;
  canonical_url: string;
  noindex: boolean;
  scheduled_for: string;
};

function initialState(post: Tables<"blog_posts">): FormState {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    content_html: post.content_html,
    cover_image_url: post.cover_image_url ?? "",
    cover_image_alt: post.cover_image_alt ?? "",
    category_id: post.category_id ?? "",
    author_id: post.author_id ?? "",
    tags: post.tags.join(", "),
    seo_title: post.seo_title ?? "",
    seo_description: post.seo_description ?? "",
    focus_keyword: post.focus_keyword ?? "",
    canonical_url: post.canonical_url ?? "",
    noindex: post.noindex,
    scheduled_for: post.status === "scheduled" ? toIstInputValue(post.published_at) : "",
  };
}

function toInput(form: FormState): PostInput {
  return {
    ...form,
    tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    scheduled_for: fromIstInputValue(form.scheduled_for),
  };
}

const AUTOSAVE_MS = 45_000;

export function PostEditor({ post, categories, authors, revisions, siteUrl, canDelete }: Props) {
  const [form, setForm] = useState<FormState>(() => initialState(post));
  const [saved, setSaved] = useState<string>(() => JSON.stringify(initialState(post)));
  const [status, setStatus] = useState<PostStatus>(post.status);
  const [publishedAt, setPublishedAt] = useState(post.published_at);
  const [plainText, setPlainText] = useState(() => post.content_html.replace(/<[^>]+>/g, " "));
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(post.slug !== slugify(post.title));
  const [coverUploading, setCoverUploading] = useState(false);
  const [pending, startTransition] = useTransition();
  const coverInput = useRef<HTMLInputElement>(null);

  const [now, setNow] = useState(() => Date.now());

  const dirty = JSON.stringify(form) !== saved;
  const isLive = (status === "published" || status === "scheduled") && !!publishedAt && new Date(publishedAt).getTime() <= now;
  const isScheduled = status === "scheduled" && !!publishedAt && new Date(publishedAt).getTime() > now;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const save = useCallback(
    (intent: SaveIntent, opts: { silent?: boolean } = {}) =>
      new Promise<boolean>((resolve) => {
        const snapshot = form;
        startTransition(async () => {
          const res = await savePost(post.id, toInput(snapshot), intent);
          if (res?.ok) {
            setSaved(JSON.stringify(snapshot));
            if (res.status) setStatus(res.status);
            setPublishedAt(res.publishedAt ?? null);
            setLastSavedAt(new Date().toISOString());
            setNow(Date.now());
            if (!opts.silent) setFeedback({ ok: true, text: res.message ?? "Saved" });
            resolve(true);
          } else {
            setFeedback({ ok: false, text: res?.error ?? "Could not save" });
            resolve(false);
          }
        });
      }),
    [form, post.id],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void save("save");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  useEffect(() => {
    if (!dirty) return;
    const onUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [dirty]);

  useEffect(() => {
    if (!dirty || status !== "draft" || pending) return;
    const t = window.setTimeout(() => void save("save", { silent: true }), AUTOSAVE_MS);
    return () => window.clearTimeout(t);
  }, [dirty, status, pending, save]);

  const seo = useMemo(
    () =>
      runSeoChecks({
        title: form.title,
        seoTitle: form.seo_title,
        seoDescription: form.seo_description,
        excerpt: form.excerpt,
        slug: form.slug,
        focusKeyword: form.focus_keyword,
        html: form.content_html,
        text: plainText,
        coverUrl: form.cover_image_url,
        coverAlt: form.cover_image_alt,
      }),
    [form, plainText],
  );

  async function onCover(file: File | undefined) {
    if (!file) return;
    setCoverUploading(true);
    try {
      const url = await uploadBlogImage(file, post.id);
      setForm((f) => ({ ...f, cover_image_url: url, cover_image_alt: f.cover_image_alt || f.title }));
    } catch (err) {
      setFeedback({ ok: false, text: err instanceof Error ? err.message : "Upload failed" });
    } finally {
      setCoverUploading(false);
      if (coverInput.current) coverInput.current.value = "";
    }
  }

  async function openPreview() {
    if (dirty && !(await save("save", { silent: true }))) return;
    window.open(`/admin/blog/${post.id}/preview`, "_blank", "noopener");
  }

  const serpTitle = (form.seo_title || form.title || "Untitled").slice(0, 65);
  const serpDescription = (form.seo_description || form.excerpt || plainText).trim().slice(0, 160);
  const scoreTone = seo.score >= 80 ? "text-[#15803d]" : seo.score >= 55 ? "text-[#b45309]" : "text-[#b91c1c]";

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link href="/admin/blog" className="text-[13px] font-medium text-[#64748b] hover:text-[#0f172a]">← All posts</Link>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[12.5px] text-[#64748b]">
            <PostStatusBadge status={status} publishedAt={publishedAt} />
            <span>{seo.words.toLocaleString("en-IN")} words · {Math.max(1, Math.round(seo.words / 220))} min read</span>
            <span suppressHydrationWarning>
              {pending ? "Saving…" : dirty ? "Unsaved changes" : lastSavedAt ? `Saved ${timeAgo(lastSavedAt)}` : "All changes saved"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={openPreview} disabled={pending}>Preview</Button>
          {isLive && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noopener" className={buttonClass("secondary")}>View live ↗</a>
          )}
          {status === "draft" || status === "archived" ? (
            <>
              <Button type="button" variant="secondary" onClick={() => save("save")} disabled={pending || !dirty}>Save draft</Button>
              <Button type="button" onClick={() => save("publish")} disabled={pending}>Publish now</Button>
            </>
          ) : (
            <Button type="button" onClick={() => save("save")} disabled={pending || !dirty}>Update</Button>
          )}
        </div>
      </div>

      {feedback && (
        <div className="mb-4">
          <Alert tone={feedback.ok ? "green" : "red"}>{feedback.text}</Alert>
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-4">
          <textarea
            value={form.title}
            onChange={(e) => {
              const title = e.target.value.replace(/\n/g, " ");
              setForm((f) => ({ ...f, title, slug: slugTouched || isLive ? f.slug : slugify(title) }));
            }}
            rows={2}
            maxLength={200}
            placeholder="Post title"
            aria-label="Title"
            className="w-full resize-none bg-transparent text-[26px] font-bold leading-tight tracking-tight text-[#0b2c5e] outline-none placeholder:text-[#cbd5e1] md:text-[32px]"
          />
          <RichTextEditor
            postId={post.id}
            initialHtml={post.content_html}
            onChange={(html, text) => {
              set("content_html", html);
              setPlainText(text);
            }}
          />
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="mb-3 text-[14px] font-bold text-[#0b2c5e]">Publishing</h2>
            {isScheduled && (
              <p className="mb-3 rounded-lg bg-[#fffbeb] px-3 py-2 text-[12.5px] font-medium text-[#92400e]">
                Goes live automatically at the scheduled time.
              </p>
            )}
            <label htmlFor="scheduled_for" className={labelClass}>Schedule for (IST)</label>
            <div className="flex gap-2">
              <input
                id="scheduled_for"
                type="datetime-local"
                value={form.scheduled_for}
                onChange={(e) => set("scheduled_for", e.target.value)}
                className={inputClass}
              />
              <Button type="button" variant="dark" onClick={() => save("schedule")} disabled={pending || !form.scheduled_for}>
                {isScheduled ? "Reschedule" : "Schedule"}
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-[#eef2f7] pt-3">
              {(status === "published" || status === "scheduled") && (
                <>
                  {isScheduled && <Button type="button" size="sm" onClick={() => save("publish")} disabled={pending}>Publish now</Button>}
                  <Button type="button" size="sm" variant="secondary" onClick={() => save("unpublish")} disabled={pending}>
                    {isScheduled ? "Unschedule" : "Unpublish"}
                  </Button>
                </>
              )}
              {status !== "archived" && (
                <Button type="button" size="sm" variant="ghost" onClick={() => save("archive")} disabled={pending}>Archive</Button>
              )}
              {canDelete && (
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  disabled={pending}
                  onClick={() => {
                    if (!window.confirm("Delete this post permanently? This cannot be undone.")) return;
                    startTransition(async () => {
                      const res = await deletePost(post.id);
                      if (res?.error) setFeedback({ ok: false, text: res.error });
                    });
                  }}
                >
                  Delete
                </Button>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="mb-3 text-[14px] font-bold text-[#0b2c5e]">Post settings</h2>
            <div className="space-y-3">
              <div>
                <label htmlFor="slug" className={labelClass}>URL</label>
                <div className="flex items-center rounded-lg border border-[#d7dee8] bg-[#f8fafc] pl-3 text-[13px] text-[#64748b] focus-within:border-[#2563eb]">
                  /blog/
                  <input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                    }}
                    className="min-w-0 flex-1 rounded-r-lg bg-white px-2 py-2 text-[#0f172a] outline-none"
                  />
                </div>
                {isLive && form.slug !== post.slug && (
                  <p className="mt-1 text-[12px] font-medium text-[#b45309]">Changing a live URL breaks existing links and loses search ranking.</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="category" className={labelClass}>Category</label>
                  <select id="category" value={form.category_id} onChange={(e) => set("category_id", e.target.value)} className={inputClass}>
                    <option value="">None</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="author" className={labelClass}>Author</label>
                  <select id="author" value={form.author_id} onChange={(e) => set("author_id", e.target.value)} className={inputClass}>
                    <option value="">None</option>
                    {authors.map((a) => <option key={a.id} value={a.id}>{a.full_name || a.email}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="tags" className={labelClass}>Tags</label>
                <input id="tags" value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="gst, startup, compliance" className={inputClass} />
              </div>
              <div>
                <label htmlFor="excerpt" className={labelClass}>Excerpt <span className="font-normal text-[#94a3b8]">({form.excerpt.length}/300)</span></label>
                <textarea id="excerpt" rows={3} maxLength={300} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short summary shown on the blog listing" className={inputClass} />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="mb-3 text-[14px] font-bold text-[#0b2c5e]">Cover image</h2>
            {form.cover_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.cover_image_url} alt={form.cover_image_alt} className="mb-3 aspect-[1.91/1] w-full rounded-lg border border-[#e3e8ef] object-cover" />
            ) : (
              <button
                type="button"
                onClick={() => coverInput.current?.click()}
                className="mb-3 flex aspect-[1.91/1] w-full items-center justify-center rounded-lg border-2 border-dashed border-[#d7dee8] text-[13px] font-semibold text-[#64748b] hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                {coverUploading ? "Uploading…" : "Upload cover (1200×630 recommended)"}
              </button>
            )}
            <input ref={coverInput} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" onChange={(e) => onCover(e.target.files?.[0])} />
            {form.cover_image_url && (
              <div className="mb-3 flex gap-2">
                <Button type="button" size="sm" variant="secondary" onClick={() => coverInput.current?.click()} disabled={coverUploading}>
                  {coverUploading ? "Uploading…" : "Replace"}
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => set("cover_image_url", "")}>Remove</Button>
              </div>
            )}
            <label htmlFor="cover_alt" className={labelClass}>Alt text</label>
            <input id="cover_alt" value={form.cover_image_alt} onChange={(e) => set("cover_image_alt", e.target.value)} placeholder="Describe the image" className={inputClass} />
          </Card>

          <Card className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-[#0b2c5e]">SEO</h2>
              <span className={`text-[13px] font-bold ${scoreTone}`}>{seo.score}/100</span>
            </div>
            <div className="mb-3 rounded-lg border border-[#e3e8ef] p-3">
              <p className="truncate text-[12px] text-[#202124]">{siteUrl.replace(/^https?:\/\//, "")} › blog › {form.slug}</p>
              <p className="mt-0.5 line-clamp-1 text-[16px] leading-snug text-[#1a0dab]">{serpTitle} | Filing360</p>
              <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-[#4d5156]">{serpDescription || "Add a meta description…"}</p>
            </div>
            <div className="space-y-3">
              <div>
                <label htmlFor="focus_keyword" className={labelClass}>Focus keyword</label>
                <input id="focus_keyword" value={form.focus_keyword} onChange={(e) => set("focus_keyword", e.target.value)} placeholder="e.g. private limited company registration" className={inputClass} />
              </div>
              <div>
                <label htmlFor="seo_title" className={labelClass}>SEO title <span className="font-normal text-[#94a3b8]">({(form.seo_title || form.title).length}/60)</span></label>
                <input id="seo_title" value={form.seo_title} onChange={(e) => set("seo_title", e.target.value)} placeholder="Defaults to the post title" maxLength={120} className={inputClass} />
              </div>
              <div>
                <label htmlFor="seo_description" className={labelClass}>Meta description <span className="font-normal text-[#94a3b8]">({(form.seo_description || form.excerpt).length}/160)</span></label>
                <textarea id="seo_description" rows={3} value={form.seo_description} onChange={(e) => set("seo_description", e.target.value)} placeholder="Defaults to the excerpt" maxLength={320} className={inputClass} />
              </div>
              <details className="text-[13px]">
                <summary className="cursor-pointer font-semibold text-[#334155]">Advanced</summary>
                <div className="mt-3 space-y-3">
                  <div>
                    <label htmlFor="canonical_url" className={labelClass}>Canonical URL</label>
                    <input id="canonical_url" type="url" value={form.canonical_url} onChange={(e) => set("canonical_url", e.target.value)} placeholder="Only if this was first published elsewhere" className={inputClass} />
                  </div>
                  <label className="flex items-center gap-2 text-[13px] text-[#334155]">
                    <input type="checkbox" checked={form.noindex} onChange={(e) => set("noindex", e.target.checked)} className="h-4 w-4 accent-[#2563eb]" />
                    Hide from search engines (noindex)
                  </label>
                </div>
              </details>
            </div>
            <ul className="mt-4 space-y-1.5 border-t border-[#eef2f7] pt-3">
              {seo.checks.map((c) => (
                <li key={c.label} className="flex gap-2 text-[12.5px]" title={c.tip}>
                  <span
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${c.status === "good" ? "bg-[#22c55e]" : c.status === "warn" ? "bg-[#f59e0b]" : "bg-[#ef4444]"}`}
                    aria-hidden
                  />
                  <span>
                    <span className="text-[#334155]">{c.label}</span>
                    {c.tip && c.status !== "good" && <span className="block text-[11.5px] text-[#94a3b8]">{c.tip}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {revisions.length > 0 && (
            <Card className="p-4">
              <h2 className="mb-2 text-[14px] font-bold text-[#0b2c5e]">Revision history</h2>
              <ul className="max-h-64 space-y-2 overflow-y-auto">
                {revisions.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-2 text-[12.5px]">
                    <span className="min-w-0">
                      <span className="block truncate text-[#334155]">{r.title}</span>
                      <span className="text-[#94a3b8]">{timeAgo(r.created_at)}{r.editor ? ` · ${r.editor}` : ""}</span>
                    </span>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => {
                        if (!window.confirm("Restore this version? Your current content is saved as a revision first.")) return;
                        startTransition(async () => {
                          const res = await restoreRevision(post.id, r.id);
                          if (res?.ok) window.location.reload();
                          else setFeedback({ ok: false, text: res?.error ?? "Could not restore" });
                        });
                      }}
                      className="shrink-0 font-semibold text-[#2563eb] hover:underline"
                    >
                      Restore
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
