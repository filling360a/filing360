"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  EMPLOYMENT_TYPES,
  formatExperience,
  formatSalary,
  WORKPLACE_TYPES,
} from "@/lib/careers/constants";
import type { JobCard } from "@/lib/careers/queries";
import { siteConfig } from "@/lib/siteConfig";

const selectClass =
  "h-11 rounded-xl border border-[#dbe3ee] bg-white px-3 text-[15px] text-[#0f2a45] outline-none focus:border-[#0e7b5b] focus:ring-2 focus:ring-[#0e7b5b]/15";

export function JobBoard({ jobs }: { jobs: JobCard[] }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [type, setType] = useState("");

  const departments = useMemo(() => [...new Set(jobs.map((j) => j.department))].sort(), [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (!department || j.department === department) &&
        (!workplace || j.workplace_type === workplace) &&
        (!type || j.employment_type === type) &&
        (!q || `${j.title} ${j.department} ${j.location} ${j.summary ?? ""}`.toLowerCase().includes(q)),
    );
  }, [jobs, query, department, workplace, type]);

  const grouped = useMemo(() => {
    const map = new Map<string, JobCard[]>();
    for (const job of filtered) map.set(job.department, [...(map.get(job.department) ?? []), job]);
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#bfd4cb] bg-white px-6 py-14 text-center">
        <p className="text-[18px] font-semibold text-[#0f2a45]">No open roles right now</p>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-[#5b6e7a]">
          We&apos;re always happy to meet great people. Send your résumé to{" "}
          <a href={`mailto:${siteConfig.contact.email}?subject=Career%20enquiry`} className="font-semibold text-[#0e7b5b] hover:underline">
            {siteConfig.contact.email}
          </a>{" "}
          and we&apos;ll reach out when something fits.
        </p>
      </div>
    );
  }

  const filtersActive = Boolean(query || department || workplace || type);

  return (
    <div>
      <div className="grid gap-2.5 rounded-2xl border border-[#d7e4de] bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_200px_170px_170px]">
        <label className="sr-only" htmlFor="job-search">Search roles</label>
        <input
          id="job-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search roles, skills or locations"
          className={`${selectClass} sm:col-span-2 lg:col-span-1`}
        />
        <select aria-label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} className={selectClass}>
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select aria-label="Workplace" value={workplace} onChange={(e) => setWorkplace(e.target.value)} className={selectClass}>
          <option value="">Any workplace</option>
          {Object.entries(WORKPLACE_TYPES).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select aria-label="Job type" value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
          <option value="">Any job type</option>
          {Object.entries(EMPLOYMENT_TYPES).map(([value, t]) => (
            <option key={value} value={value}>{t.label}</option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-[14.5px] text-[#5b6e7a]" aria-live="polite">
        {filtered.length} open {filtered.length === 1 ? "role" : "roles"}
        {filtersActive && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setDepartment("");
              setWorkplace("");
              setType("");
            }}
            className="ml-3 font-semibold text-[#0e7b5b] hover:underline"
          >
            Clear filters
          </button>
        )}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-[#bfd4cb] bg-white px-6 py-10 text-center text-[15px] text-[#5b6e7a]">
          No roles match these filters.
        </p>
      ) : (
        <div className="mt-4 space-y-8">
          {grouped.map(([dept, list]) => (
            <section key={dept} aria-labelledby={`dept-${dept}`}>
              <h3 id={`dept-${dept}`} className="mb-3 text-[13.5px] font-bold uppercase tracking-[0.08em] text-[#5b6e7a]">
                {dept} <span className="font-semibold text-[#8a9ba6]">· {list.length}</span>
              </h3>
              <ul className="space-y-3">
                {list.map((job) => (
                  <li key={job.id}>
                    <JobRow job={job} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function JobRow({ job }: { job: JobCard }) {
  const salary = job.show_salary ? formatSalary(job.salary_min, job.salary_max) : null;
  const meta = [
    job.location,
    WORKPLACE_TYPES[job.workplace_type],
    EMPLOYMENT_TYPES[job.employment_type].label,
    formatExperience(job.experience_min, job.experience_max),
  ];
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-[#d7e4de] bg-white p-5 transition hover:border-[#8ecfbc] hover:shadow-[0_10px_30px_-18px_rgba(14,123,91,0.45)] sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <p className="text-[18px] font-bold tracking-tight text-[#0f2a45] group-hover:text-[#0b6550]">{job.title}</p>
        <p className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-[14.5px] text-[#5b6e7a]">
          {meta.map((m, i) => (
            <span key={m} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-[#bfd4cb]">•</span>}
              {m}
            </span>
          ))}
        </p>
        {job.summary && <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[#4a5d68]">{job.summary}</p>}
        {salary && <p className="mt-2 text-[14.5px] font-semibold text-[#0b6550]">{salary}</p>}
      </div>
      <span className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 self-start rounded-xl bg-[#e3f2ed] px-4 text-[15px] font-semibold text-[#0b6550] transition group-hover:bg-[#0e7b5b] group-hover:text-white sm:self-center">
        View role <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
