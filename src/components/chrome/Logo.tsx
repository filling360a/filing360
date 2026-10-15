import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

export function Logo({ className = "h-10 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={siteConfig.logo.src}
      alt={siteConfig.brandName}
      width={siteConfig.logo.width}
      height={siteConfig.logo.height}
      priority={priority}
      className={className}
    />
  );
}
