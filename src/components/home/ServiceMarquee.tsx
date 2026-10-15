import { pillars } from "@/content/services";

export function ServiceMarquee() {
  const items = pillars.flatMap((p) =>
    p.services.filter((s) => s.featured).map((s) => s.shortName ?? s.name),
  );
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[#e2e8f0] bg-white py-3.5">
      <div className="marquee">
        <div className="marquee-track">
          {loop.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="flex items-center gap-4 whitespace-nowrap text-[15px] font-medium text-[#64748b]"
            >
              <span className="text-[#0b1f3a]">{label}</span>
              <span className="text-[#2563eb]" aria-hidden>
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
