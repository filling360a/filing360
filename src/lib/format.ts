const TZ = "Asia/Kolkata";

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: TZ,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", { timeZone: TZ, day: "numeric", month: "short", year: "numeric" }).format(
    new Date(value),
  );
}

export function timeAgo(value: string | null | undefined): string {
  if (!value) return "—";
  const diff = Date.now() - new Date(value).getTime();
  const abs = Math.abs(diff);
  const units: [number, string][] = [
    [60_000, "second"],
    [3_600_000, "minute"],
    [86_400_000, "hour"],
    [604_800_000, "day"],
    [2_629_800_000, "week"],
    [31_557_600_000, "month"],
    [Infinity, "year"],
  ];
  const divisors: Record<string, number> = {
    second: 1000,
    minute: 60_000,
    hour: 3_600_000,
    day: 86_400_000,
    week: 604_800_000,
    month: 2_629_800_000,
    year: 31_557_600_000,
  };
  const [, unit] = units.find(([limit]) => abs < limit)!;
  const amount = Math.round(diff / divisors[unit]);
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-amount, unit as Intl.RelativeTimeFormatUnit);
}

export function formatInrAmount(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

/** Value for <input type="datetime-local"> in IST. */
export function toIstInputValue(value: string | null | undefined): string {
  if (!value) return "";
  const d = new Date(new Date(value).getTime() + 330 * 60_000);
  return d.toISOString().slice(0, 16);
}

/** Parses a datetime-local value entered in IST into an ISO string. */
export function fromIstInputValue(value: string | null | undefined): string | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d, h, min] = match.map(Number);
  return new Date(Date.UTC(y, m - 1, d, h, min) - 330 * 60_000).toISOString();
}
