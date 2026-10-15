"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import { deleteCategory, saveCategory } from "@/app/admin/(panel)/blog/actions";
import { Alert, Button, inputClass, labelClass } from "@/components/admin/ui";
import type { Tables } from "@/lib/supabase/database.types";

export function CategoryForm({ category }: { category?: Tables<"blog_categories"> }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(async (prev: Awaited<ReturnType<typeof saveCategory>>, data: FormData) => {
    const res = await saveCategory(category?.id ?? null, prev, data);
    if (res?.ok && !category) formRef.current?.reset();
    return res;
  }, undefined);
  const prefix = category?.id ?? "new";

  return (
    <form ref={formRef} action={action} className="space-y-3">
      <div>
        <label htmlFor={`${prefix}-name`} className={labelClass}>Name</label>
        <input id={`${prefix}-name`} name="name" defaultValue={category?.name} required maxLength={60} className={inputClass} />
      </div>
      <div className="grid grid-cols-[1fr_88px] gap-2">
        <div>
          <label htmlFor={`${prefix}-slug`} className={labelClass}>URL slug</label>
          <input id={`${prefix}-slug`} name="slug" defaultValue={category?.slug} placeholder="auto from name" maxLength={60} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${prefix}-order`} className={labelClass}>Order</label>
          <input id={`${prefix}-order`} name="sort_order" type="number" min={0} defaultValue={category?.sort_order ?? 100} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor={`${prefix}-desc`} className={labelClass}>Description (used for SEO)</label>
        <textarea id={`${prefix}-desc`} name="description" rows={2} maxLength={300} defaultValue={category?.description ?? ""} className={inputClass} />
      </div>
      {state?.error && <Alert>{state.error}</Alert>}
      {state?.ok && <Alert tone="green">{state.message}</Alert>}
      <Button type="submit" size="sm" disabled={pending}>{pending ? "Saving…" : category ? "Save" : "Add category"}</Button>
    </form>
  );
}

export function DeleteCategoryButton({ categoryId, postCount }: { categoryId: string; postCount: number }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="danger"
        disabled={pending}
        onClick={() => {
          const warning = postCount ? `${postCount} post(s) will become uncategorised. ` : "";
          if (!window.confirm(`${warning}Delete this category?`)) return;
          start(async () => {
            const res = await deleteCategory(categoryId);
            if (res?.error) setError(res.error);
          });
        }}
      >
        Delete category
      </Button>
      {error && <p className="mt-1 text-[12px] text-[#b91c1c]">{error}</p>}
    </>
  );
}
