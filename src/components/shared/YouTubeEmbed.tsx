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
  const src = `https://www.youtube.com/embed/${youtubeId}${start ? `?start=${start}` : ""}`;

  return (
    <div className={`w-full ${className}`}>
      <div
        className="relative w-full"
        style={{ height: 0, paddingTop: "56.25%" }}
      >
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
