import { contentReviewer } from "@/content/reviewer";

type Props = {
  className?: string;
  /** Extra suffix after the name, e.g. "· Updated 2 November 2026". */
  suffix?: string;
};

/** Reviewer credit — links to LinkedIn only when a real profile URL is set. */
export function ReviewedBy({ className = "mt-4 text-[13.5px] text-[#5b6e7a]", suffix }: Props) {
  const linkedin = contentReviewer.linkedin.trim();
  const name = linkedin ? (
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer me"
      className="font-semibold text-[#0e7b5b] underline-offset-2 hover:underline"
    >
      {contentReviewer.name}
    </a>
  ) : (
    <span className="font-semibold text-[#0f2a45]">{contentReviewer.name}</span>
  );

  return (
    <p className={className}>
      {contentReviewer.label} {name}
      {suffix ? ` ${suffix}` : null}
    </p>
  );
}
