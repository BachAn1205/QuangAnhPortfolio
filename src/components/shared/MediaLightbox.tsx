"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";

export function MediaLightbox({
  label,
  onClose,
  children,
}: {
  label: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return createPortal(
    <div
      className="qa-lightbox-backdrop fixed inset-0 z-[80] flex items-center justify-center bg-zinc-950/75 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={() => onCloseRef.current()}
    >
      <div
        className="qa-lightbox-frame relative max-h-[calc(100vh-2rem)] max-w-[min(94vw,1180px)] rounded-2xl bg-[#0f766e] p-1.5 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.65)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onCloseRef.current()}
          aria-label="Đóng"
          className="absolute -top-3 -right-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0f766e] text-white shadow-md hover:bg-teal-800"
        >
          <X size={14} weight="bold" />
        </button>
        <div className="overflow-hidden rounded-[0.85rem] bg-zinc-950">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
