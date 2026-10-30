"use client";

import { useState } from "react";
import { FrameCorners } from "@phosphor-icons/react";
import { MediaLightbox } from "@/components/shared/MediaLightbox";

type YouTubeEmbedProps = {
  youtubeId: string;
  title: string;
  start?: number;
  className?: string;
};

export function YouTubeEmbed({
  youtubeId,
  title,
  start = 0,
  className = "",
}: YouTubeEmbedProps) {
  const [zoomed, setZoomed] = useState(false);
  const src = `https://www.youtube.com/embed/${youtubeId}${start ? `?start=${start}` : ""}`;
  const zoomSrc = `https://www.youtube.com/embed/${youtubeId}?autoplay=1${start ? `&start=${start}` : ""}`;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full" style={{ height: 0, paddingTop: "56.25%" }}>
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 rounded-full bg-zinc-950/75 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-zinc-950"
        >
          <FrameCorners size={14} weight="bold" />
          Phóng to
        </button>
      </div>

      {zoomed ? (
        <MediaLightbox label={title} onClose={() => setZoomed(false)}>
          <div className="w-[min(86vw,1040px)]" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              src={zoomSrc}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </MediaLightbox>
      ) : null}
    </div>
  );
}
