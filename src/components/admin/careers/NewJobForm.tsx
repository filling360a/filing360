"use client";

import { useActionState } from "react";
import { createJob } from "@/app/admin/(panel)/careers/actions";
import { Alert, Button, inputClass, labelClass } from "@/components/admin/ui";

export function NewJobForm({ departments }: { departments: string[] }) {
  const [state, action, pending] = useActionState(createJob, undefined);
  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="title" className={labelClass}>Job title</label>
        <input id="title" name="title" required minLength={3} maxLength={140} autoFocus className={inputClass} placeholder="e.g. Company Secretary — Compliance" />
      </div>
      <div>
        <label htmlFor="department" className={labelClass}>Department</label>
        <input id="department" name="department" required minLength={2} maxLength={60} list="departments" className={inputClass} placeholder="e.g. Compliance" />
        <datalist id="departments">
          {departments.map((d) => <option key={d} value={d} />)}
        </datalist>
      </div>
      {state?.error && <Alert>{state.error}</Alert>}
      <Button type="submit" disabled={pending}>{pending ? "Creating…" : "Create draft & open editor"}</Button>
    </form>
  );
}
