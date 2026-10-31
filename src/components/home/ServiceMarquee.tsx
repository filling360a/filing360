import { pillars } from "@/content/services";

export function ServiceMarquee() {
  const items = pillars.flatMap((p) =>
    p.services.filter((s) => s.featured).map((s) => s.shortName ?? s.name),
  );
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[#d7e4de] bg-white py-3.5">
      <div className="marquee">
        <div className="marquee-track">
          {loop.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="flex items-center gap-4 whitespace-nowrap text-[15px] font-medium text-[#5b6e7a]"
            >
              <span className="text-[#0f2a45]">{label}</span>
              <span className="text-[#0e7b5b]" aria-hidden>
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
