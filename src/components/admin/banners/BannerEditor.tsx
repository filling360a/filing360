"use client";

import Link from "next/link";
import { useActionState, useRef, useState, useTransition } from "react";
import { saveBannerSlot } from "@/app/admin/(panel)/banners/actions";
import { Alert, Button, Card, inputClass, labelClass } from "@/components/admin/ui";
import { BANNER_SPECS, type BannerAlign } from "@/lib/banners/defaults";
import type { ResolvedBanner } from "@/lib/banners/defaults";
import { uploadBannerImage } from "@/lib/banners/upload-client";

export function BannerEditor({ banner }: { banner: ResolvedBanner }) {
  const [imageUrl, setImageUrl] = useState(banner.isCustomImage ? banner.src : "");
  const [align, setAlign] = useState<BannerAlign>(banner.align);
  const [title, setTitle] = useState(banner.title ?? "");
  const [accent, setAccent] = useState(banner.accent ?? "");
  const [body, setBody] = useState(banner.body ?? "");
  const [lightNav, setLightNav] = useState(Boolean(banner.lightNav));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pendingReset, startReset] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);
  const specs = BANNER_SPECS[banner.group];
  const previewSrc = imageUrl || banner.defaultSrc;

  const [state, action, pending] = useActionState(saveBannerSlot, undefined);

  return (
    <Card className="overflow-hidden p-0">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="border-b border-[#e8f0ec] bg-[#f3f7fa] p-4 lg:border-b-0 lg:border-r">
          <div
            className={`relative overflow-hidden rounded-xl border border-[#d7e4de] bg-white ${
              banner.layout === "campaign" ? "aspect-[3/1]" : "aspect-[16/9]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewSrc} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 rounded-lg border border-[#d4ede4] bg-white px-3 py-2.5 text-[12.5px] leading-relaxed text-[#4a5d68]">
            <p className="font-semibold text-[#0f2a45]">Upload size</p>
            <p>
              Recommended: <span className="font-semibold text-[#0f2a45]">{specs.sizeHint}</span>
            </p>
            <p>
              Aspect ratio: <span className="font-semibold text-[#0f2a45]">{specs.ratioHint}</span>
            </p>
            <p>Max file size: {specs.maxMb} MB · JPG, PNG, WebP or AVIF</p>
            <p className="mt-1.5 text-[#5b6e7a]">{specs.note}</p>
          </div>
        </div>

        <form action={action} className="space-y-3 p-4 md:p-5">
          <input type="hidden" name="key" value={banner.key} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <input type="hidden" name="object" value={banner.object} />

          <div>
            <h3 className="text-[16px] font-bold text-[#0f2a45]">{banner.label}</h3>
            <Link href={banner.pagePath} target="_blank" className="text-[12.5px] font-semibold text-[#0e7b5b] hover:underline">
              View page ↗ {banner.pagePath}
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="secondary" disabled={uploading} onClick={() => fileRef.current?.click()}>
              {uploading ? "Uploading…" : imageUrl ? "Replace image" : "Upload image"}
            </Button>
            {imageUrl ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={pendingReset}
                onClick={() => {
                  startReset(async () => {
                    setImageUrl("");
                    const fd = new FormData();
                    fd.set("key", banner.key);
                    fd.set("imageUrl", "");
                    fd.set("align", align);
                    fd.set("object", banner.object);
                    fd.set("title", title);
                    fd.set("accent", accent);
                    fd.set("body", body);
                    if (lightNav) fd.set("lightNav", "true");
                    fd.set("resetImage", "1");
                    await saveBannerSlot(undefined, fd);
                  });
                }}
              >
                Reset to default
              </Button>
            ) : null}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                setUploading(true);
                setUploadError(null);
                try {
                  const url = await uploadBannerImage(file, banner.key);
                  setImageUrl(url);
                } catch (err) {
                  setUploadError(err instanceof Error ? err.message : "Upload failed");
                } finally {
                  setUploading(false);
                }
              }}
            />
          </div>
          {uploadError ? <Alert>{uploadError}</Alert> : null}

          {banner.layout === "split" ? (
            <>
              <div>
                <label htmlFor={`${banner.key}-align`} className={labelClass}>
                  Image / form side
                </label>
                <select
                  id={`${banner.key}-align`}
                  name="align"
                  value={align}
                  onChange={(e) => setAlign(e.target.value as BannerAlign)}
                  className={inputClass}
                >
                  <option value="left">Form on left · subject on right</option>
                  <option value="right">Form on right · subject on left</option>
                </select>
                <p className="mt-1 text-[12px] text-[#5b6e7a]">
                  The lead form stays in this position — only the background image and copy change.
                </p>
              </div>
              <div>
                <label htmlFor={`${banner.key}-title`} className={labelClass}>
                  Title
                </label>
                <input
                  id={`${banner.key}-title`}
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={120}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`${banner.key}-accent`} className={labelClass}>
                  Accent line
                </label>
                <input
                  id={`${banner.key}-accent`}
                  name="accent"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  maxLength={120}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`${banner.key}-body`} className={labelClass}>
                  Supporting text
                </label>
                <textarea
                  id={`${banner.key}-body`}
                  name="body"
                  rows={3}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  maxLength={400}
                  className={inputClass}
                />
              </div>
              <label className="flex items-center gap-2 text-[13.5px] text-[#2c3f4e]">
                <input
                  type="checkbox"
                  name="lightNav"
                  checked={lightNav}
                  onChange={(e) => setLightNav(e.target.checked)}
                  className="h-4 w-4 rounded border-[#d0dcd6]"
                />
                Light top navigation on this slide
              </label>
            </>
          ) : (
            <>
              <input type="hidden" name="align" value={align} />
              <p className="rounded-lg border border-[#d7e4de] bg-[#f3f7fa] px-3 py-2 text-[13px] leading-relaxed text-[#5b6e7a]">
                Campaign banner — put the headline and CTA in the image. The quote form stays below the banner in the same place.
              </p>
            </>
          )}

          {state?.error ? <Alert>{state.error}</Alert> : null}
          {state?.ok ? <Alert tone="green">{state.message}</Alert> : null}

          <Button type="submit" disabled={pending || uploading}>
            {pending ? "Saving…" : "Save banner"}
          </Button>
        </form>
      </div>
    </Card>
  );
}
