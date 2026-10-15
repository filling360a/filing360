"use client";

import { useActionState } from "react";
import { createPost } from "@/app/admin/(panel)/blog/actions";
import { Alert, Button, inputClass, labelClass } from "@/components/admin/ui";

export function NewPostForm({ categories }: { categories: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(createPost, undefined);
  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="title" className={labelClass}>Title</label>
        <input id="title" name="title" required minLength={3} maxLength={200} autoFocus className={inputClass} placeholder="e.g. How to register a Private Limited Company in 2026" />
      </div>
      <div>
        <label htmlFor="category_id" className={labelClass}>Category</label>
        <select id="category_id" name="category_id" defaultValue="" className={inputClass}>
          <option value="">Choose later</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      {state?.error && <Alert>{state.error}</Alert>}
      <Button type="submit" disabled={pending}>{pending ? "Creating…" : "Create draft & open editor"}</Button>
    </form>
  );
}
