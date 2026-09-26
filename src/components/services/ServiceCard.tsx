import Link from "next/link";
import { formatInr, type Pillar, type Service } from "@/content/services";

type Props = {
  pillar: Pillar;
  service: Service;
};

export function ServiceCard({ pillar, service }: Props) {
  return (
    <Link
      href={`/services/${pillar.slug}/${service.slug}`}
      className="lift flex h-full flex-col border border-line bg-paper p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-seal">
        {pillar.name}
      </p>
      <h3 className="mt-2 font-display text-2xl tracking-tight text-ink">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {service.description}
      </p>
      <div className="mt-6 border-t border-line pt-4">
        <p className="text-sm text-ink">
          <span className="font-display text-2xl tabular tracking-tight">
            {formatInr(service.professionalFeeFrom)}
          </span>
          <span className="ml-2 text-ink-muted">professional fee from</span>
        </p>
        <p className="mt-1 text-xs font-medium text-seal">+ Government fees</p>
        <p className="mt-2 text-xs text-ink-muted">{service.timeline}</p>
      </div>
    </Link>
  );
}

export function PriceHonesty({
  amount,
  className = "",
}: {
  amount: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-display text-4xl tabular tracking-tight text-ink md:text-5xl">
        {formatInr(amount)}
      </p>
      <p className="mt-1 text-sm text-ink-muted">Professional fee from</p>
      <p className="mt-2 inline-flex items-center rounded-sm bg-seal/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-seal-deep">
        + Government fees
      </p>
    </div>
  );
}

export function Inclusions({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm text-ink">
          <span
            className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-seal"
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
