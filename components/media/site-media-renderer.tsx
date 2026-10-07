import Image from "next/image";
import type { ResolvedSiteMedia } from "@/lib/site-media";

type Props = {
  media: ResolvedSiteMedia;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function SiteMediaRenderer({ media, className, sizes = "100vw", priority = false }: Props) {
  if (media.type === "video") {
    return (
      <video
        src={media.url}
        poster={media.posterUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.altText || undefined}
        className={className}
      />
    );
  }

  return (
    <Image
      src={media.url}
      alt={media.altText}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
