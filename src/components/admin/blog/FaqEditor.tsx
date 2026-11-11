"use client";

import { Button, Card, inputClass, labelClass } from "@/components/admin/ui";
import { emptyFaq, type BlogFaq } from "@/lib/blog/faqs";

type Props = {
  faqs: BlogFaq[];
  onChange: (faqs: BlogFaq[]) => void;
};

export function FaqEditor({ faqs, onChange }: Props) {
  const rows = faqs.length ? faqs : [emptyFaq()];

  const setRow = (index: number, patch: Partial<BlogFaq>) => {
    const next = rows.map((row, i) => (i === index ? { ...row, ...patch } : row));
    onChange(next);
  };

  const addRow = () => onChange([...rows, emptyFaq()]);

  const removeRow = (index: number) => {
    const next = rows.filter((_, i) => i !== index);
    onChange(next.length ? next : [emptyFaq()]);
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <Card className="p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-bold text-[#0f2a45]">FAQs</h2>
          <p className="mt-0.5 text-[13px] leading-relaxed text-[#5b6e7a]">
            Write questions and answers here — separate from the article body. They appear below the post and power FAQ schema for search.
          </p>
        </div>
        <Button type="button" size="sm" variant="secondary" onClick={addRow}>
          + Add question
        </Button>
      </div>

      <div className="space-y-3">
        {rows.map((faq, index) => (
          <div key={index} className="rounded-xl border border-[#d7e4de] bg-[#f3f7fa] p-3 md:p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.04em] text-[#5b6e7a]">
                Question {index + 1}
              </p>
              <div className="flex flex-wrap gap-1">
                <Button type="button" size="sm" variant="ghost" disabled={index === 0} onClick={() => move(index, -1)}>
                  ↑
                </Button>
                <Button type="button" size="sm" variant="ghost" disabled={index === rows.length - 1} onClick={() => move(index, 1)}>
                  ↓
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => removeRow(index)}>
                  Remove
                </Button>
              </div>
            </div>
            <div className="space-y-2.5">
              <div>
                <label htmlFor={`faq-q-${index}`} className={labelClass}>
                  Question
                </label>
                <input
                  id={`faq-q-${index}`}
                  value={faq.q}
                  onChange={(e) => setRow(index, { q: e.target.value })}
                  maxLength={300}
                  placeholder="e.g. When is the advance tax due date?"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`faq-a-${index}`} className={labelClass}>
                  Answer
                </label>
                <textarea
                  id={`faq-a-${index}`}
                  rows={3}
                  value={faq.a}
                  onChange={(e) => setRow(index, { a: e.target.value })}
                  maxLength={2000}
                  placeholder="Clear, direct answer in plain language"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
