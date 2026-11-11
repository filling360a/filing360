"use client";

import { useActionState, useState, useTransition } from "react";
import { createCategoryQuick, createPost } from "@/app/admin/(panel)/blog/actions";
import { Alert, Button, inputClass, labelClass } from "@/components/admin/ui";

export function NewPostForm({ categories }: { categories: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(createPost, undefined);
  const [categoryOptions, setCategoryOptions] = useState(categories);
  const [categoryId, setCategoryId] = useState("");
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryBusy, startCategory] = useTransition();
  const [categoryError, setCategoryError] = useState<string | null>(null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="title" className={labelClass}>Title</label>
        <input id="title" name="title" required minLength={3} maxLength={200} autoFocus className={inputClass} placeholder="e.g. How to register a Private Limited Company in 2026" />
      </div>
      <div>
        <label htmlFor="category_id" className={labelClass}>Category</label>
        <select
          id="category_id"
          name="category_id"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className={inputClass}
        >
          <option value="">Choose later</option>
          {categoryOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {!newCategoryOpen ? (
          <button
            type="button"
            className="mt-1.5 text-[12.5px] font-semibold text-[#0e7b5b] hover:underline"
            onClick={() => {
              setCategoryError(null);
              setNewCategoryOpen(true);
            }}
          >
            + Create new category
          </button>
        ) : (
          <div className="mt-2 space-y-1.5 rounded-lg border border-[#d7e4de] bg-[#f3f7fa] p-2.5">
            <label htmlFor="new-category" className={labelClass}>New category name</label>
            <input
              id="new-category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Accounting"
              maxLength={60}
              className={inputClass}
              autoFocus
            />
            {categoryError ? <p className="text-[12px] text-[#b91c1c]">{categoryError}</p> : null}
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                disabled={categoryBusy || newCategoryName.trim().length < 2}
                onClick={() => {
                  setCategoryError(null);
                  startCategory(async () => {
                    const res = await createCategoryQuick(newCategoryName.trim());
                    if (res?.error || !res?.category) {
                      setCategoryError(res?.error ?? "Could not create category");
                      return;
                    }
                    setCategoryOptions((prev) =>
                      prev.some((c) => c.id === res.category!.id) ? prev : [...prev, { id: res.category!.id, name: res.category!.name }],
                    );
                    setCategoryId(res.category.id);
                    setNewCategoryName("");
                    setNewCategoryOpen(false);
                  });
                }}
              >
                {categoryBusy ? "Creating…" : "Add category"}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setNewCategoryOpen(false);
                  setNewCategoryName("");
                  setCategoryError(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {state?.error && <Alert>{state.error}</Alert>}
      <Button type="submit" disabled={pending}>{pending ? "Creating…" : "Create draft & open editor"}</Button>
    </form>
  );
}
