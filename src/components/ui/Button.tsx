import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "on-dark" | "on-dark-ghost";

const variants: Record<Variant, string> = {
  primary: "bg-seal text-paper hover:bg-seal-deep focus-visible:outline-seal",
  secondary:
    "bg-transparent text-ink border border-line-strong hover:border-ink",
  ghost: "bg-transparent text-ink-muted hover:text-ink",
  "on-dark":
    "bg-white text-ink hover:bg-paper-deep focus-visible:outline-white",
  "on-dark-ghost":
    "bg-transparent text-paper border border-white/30 hover:border-white/55",
};

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
} & Omit<ComponentProps<"button">, "className" | "children" | "onClick">;

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  onClick,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[15px] font-semibold tracking-tight transition-colors duration-200 disabled:opacity-50";
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
