import Image from "next/image";

const OPTIMISABLE = /^https:\/\/[a-z0-9-]+\.supabase\.co\/storage\/v1\/object\/public\//;

export function CoverImage({
  src,
  alt,
  priority,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      unoptimized={!OPTIMISABLE.test(src)}
      className={`object-cover ${className}`}
    />
  );
}
