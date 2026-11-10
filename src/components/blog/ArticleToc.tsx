"use client";

import { useEffect, useState } from "react";

export type ArticleTocItem = { id: string; text: string; level: 2 | 3 };

type Props = {
  toc: ArticleTocItem[];
  /** `top` = On this page jump list in the article. `aside` = sticky sidebar. */
  placement: "top" | "aside";
};

/** Article index with scroll-spy active section highlighting. */
export function ArticleToc({ toc, placement }: Props) {
  const activeId = useActiveHeading(toc.map((item) => item.id));

  if (toc.length < 2) return null;

  if (placement === "top") {
    return (
      <nav
        className="mb-8 rounded-xl border border-[#d7e4de] bg-[#f3f7fa] p-4 sm:p-5 lg:hidden"
        aria-label="On this page"
      >
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#0e7b5b]">On this page</p>
        <ol className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-[14.5px] font-semibold leading-snug text-[#0f2a45]">
          {toc.map((item, i) => (
            <li key={item.id} className="inline">
              <a
                href={`#${item.id}`}
                className={`hover:text-[#0e7b5b] ${activeId === item.id ? "text-[#0e7b5b]" : ""}`}
              >
                <span className="text-[#8a9ba6]">{i + 1}.</span> {item.text}
              </a>
              {i < toc.length - 1 ? <span className="ml-3 text-[#c5d4cc]" aria-hidden>·</span> : null}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <nav
      className="max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl border border-[#d7e4de] bg-[#f7faf8] p-4"
      aria-label="In this article"
    >
      <p className="text-[15px] font-bold text-[#0f2a45]">In this article</p>
      <ol className="mt-3 space-y-1">
        {toc.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`block rounded-md px-2 py-1.5 text-[14.5px] leading-snug transition ${
                  active
                    ? "bg-[#e3f2ed] font-semibold text-[#0e7b5b]"
                    : "text-[#5b6e7a] hover:bg-white hover:text-[#0f2a45]"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (!ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const visible = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry);
        }

        const intersecting = [...visible.values()]
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting[0]) {
          setActiveId(intersecting[0].target.id);
          return;
        }

        const above = elements
          .filter((el) => el.getBoundingClientRect().top < 120)
          .at(-1);
        if (above) setActiveId(above.id);
      },
      {
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0, 0.25, 1],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids.join("|")]);

  return activeId;
}
