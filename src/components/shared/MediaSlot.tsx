"use client";

import { useRef, useState } from "react";
import {
  Image as ImageIcon,
  UploadSimple,
  ArrowsClockwise,
  Trash,
  SpinnerGap,
  VideoCamera,
} from "@phosphor-icons/react";
import { useProjectMedia } from "@/lib/media-context";
import { isVideoUrl } from "@/lib/media-files";

export function MediaSlot({
  slotId,
  alt,
  guideline,
  className = "",
  frameClassName = "",
  fitContent = false,
}: {
  slotId: string;
  alt: string;
  /** Mô tả ảnh/video nên upload — hiển thị dưới khung */
  guideline: string;
  className?: string;
  /** Class cho khung media (chiều cao, bo góc…) */
  frameClassName?: string;
  /** Khi đã có media, khung cao theo ảnh để không cắt nội dung */
  fitContent?: boolean;
}) {
  const { getMedia, uploadMedia, deleteMedia } = useProjectMedia();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = getMedia(slotId);
  const hasMedia = Boolean(current);
  const video = current ? isVideoUrl(current) : false;
  const hugMedia = fitContent && hasMedia;

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadMedia(slotId, file);
      if (!url) {
        setError("Không tải được file. Hãy thử lại.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không tải được file.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const onDelete = async () => {
    if (!hasMedia) return;
    setDeleting(true);
    try {
      await deleteMedia(slotId);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={`flex h-full min-h-0 flex-col gap-2 ${className}`}>
      <div
        className={`w-full overflow-hidden ${
          hugMedia
            ? "rounded-xl"
            : `relative min-h-[8rem] bg-zinc-100 dark:bg-zinc-900/80 ${frameClassName}`
        }`}
      >
        {hasMedia && current ? (
          video ? (
            <video
              src={current}
              className={
                hugMedia
                  ? "block h-auto w-full"
                  : "absolute inset-0 h-full w-full object-contain"
              }
              controls
              playsInline
              preload="metadata"
              onError={() =>
                setError(
                  "Đã tải lên nhưng trình duyệt không phát được video này. Hãy dùng file mp4."
                )
              }
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current}
              alt={alt}
              className={
                hugMedia
                  ? "block h-auto w-full"
                  : "absolute inset-0 h-full w-full object-contain"
              }
              loading="lazy"
            />
          )
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center transition hover:border-teal-600 hover:bg-teal-50/40 dark:border-zinc-600 dark:bg-zinc-900/40 dark:hover:border-teal-400 dark:hover:bg-teal-950/20"
          >
            {uploading ? (
              <SpinnerGap
                size={28}
                className="animate-spin text-teal-700 dark:text-teal-300"
              />
            ) : (
              <UploadSimple
                size={28}
                weight="bold"
                className="text-zinc-400 dark:text-zinc-500"
              />
            )}
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
              {uploading ? "Đang tải lên..." : "Chưa có ảnh — bấm để upload"}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-zinc-400">
              <ImageIcon size={12} /> ảnh
              <span className="mx-0.5">·</span>
              <VideoCamera size={12} /> video
            </span>
          </button>
        )}
      </div>

      {/* Guideline mô tả ảnh nên upload */}
      <p className="rounded-lg border border-teal-700/15 bg-teal-700/5 px-2.5 py-2 text-[11px] leading-relaxed text-zinc-600 dark:border-teal-400/20 dark:bg-teal-400/5 dark:text-zinc-300">
        <span className="font-semibold text-teal-800 dark:text-teal-300">
          Ảnh nên upload:{" "}
        </span>
        {guideline}
      </p>

      {/* Nút Thay ảnh / Xóa ảnh */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-full bg-teal-800 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:opacity-60 dark:bg-teal-700 dark:hover:bg-teal-600"
        >
          {uploading ? (
            <SpinnerGap size={14} className="animate-spin" />
          ) : hasMedia ? (
            <ArrowsClockwise size={14} weight="bold" />
          ) : (
            <UploadSimple size={14} weight="bold" />
          )}
          <span>
            {uploading ? "Đang tải..." : hasMedia ? "Thay ảnh" : "Tải ảnh lên"}
          </span>
        </button>

        {hasMedia ? (
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
          >
            {deleting ? (
              <SpinnerGap size={14} className="animate-spin" />
            ) : (
              <Trash size={14} weight="bold" />
            )}
            <span>{deleting ? "Đang xóa..." : "Xóa ảnh"}</span>
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="text-[11px] leading-relaxed text-red-700 dark:text-red-300">{error}</p>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/mp4,video/webm,video/quicktime"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
    </div>
  );
}
