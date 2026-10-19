"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { compressImage } from "@/lib/image-compress";

interface MediaContextType {
  media: Record<string, string>;
  isLoading: boolean;
  getMedia: (slotId: string) => string | undefined;
  uploadMedia: (slotId: string, file: File) => Promise<string | null>;
  deleteMedia: (slotId: string) => Promise<boolean>;
}

const MediaContext = createContext<MediaContextType>({
  media: {},
  isLoading: true,
  getMedia: () => undefined,
  uploadMedia: async () => null,
  deleteMedia: async () => false,
});

const STORAGE_KEY = "quanganh_portfolio_project_media";

function isVideoFile(file: File) {
  return file.type.startsWith("video/") || /\.(mp4|webm|mov|m4v)$/i.test(file.name);
}

export function MediaProvider({
  children,
  initialMedia,
}: {
  children: React.ReactNode;
  initialMedia?: Record<string, string>;
}) {
  const [media, setMedia] = useState<Record<string, string>>(initialMedia || {});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as Record<string, string>;
        setMedia((prev) => ({ ...parsed, ...prev }));
      }
    } catch {
      // ignore
    }
  }, []);

  const persist = (next: Record<string, string>) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn("LocalStorage save warning:", e);
    }
  };

  const fetchMedia = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/upload", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as Record<string, string>;
        setMedia((prev) => {
          const merged = { ...prev, ...data };
          persist(merged);
          return merged;
        });
      }
    } catch (err) {
      console.warn("Media sync error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const getMedia = useCallback(
    (slotId: string) => media[slotId] || undefined,
    [media]
  );

  const uploadMedia = useCallback(
    async (slotId: string, file: File): Promise<string | null> => {
      let fileToUpload = file;
      if (!isVideoFile(file)) {
        try {
          fileToUpload = await compressImage(file);
        } catch (compressErr) {
          console.warn("Compression fallback:", compressErr);
        }
      }

      try {
        const formData = new FormData();
        formData.append("slotId", slotId);
        formData.append("file", fileToUpload);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          throw new Error(`Upload failed: ${res.status} ${errText}`);
        }

        const data = await res.json();
        const newUrl = data.url as string;

        setMedia((prev) => {
          const next = { ...prev, [slotId]: newUrl };
          persist(next);
          return next;
        });

        return newUrl;
      } catch (err) {
        console.error(err);
        // Offline / local fallback as data URL for images only
        if (!isVideoFile(file) && typeof window !== "undefined") {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const url = String(reader.result || "");
              setMedia((prev) => {
                const next = { ...prev, [slotId]: url };
                persist(next);
                return next;
              });
              resolve(url || null);
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
          });
        }
        return null;
      }
    },
    []
  );

  const deleteMedia = useCallback(async (slotId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/upload?slotId=${encodeURIComponent(slotId)}`, {
        method: "DELETE",
      });
      if (!res.ok) return false;
      setMedia((prev) => {
        const next = { ...prev };
        delete next[slotId];
        persist(next);
        return next;
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <MediaContext.Provider
      value={{ media, isLoading, getMedia, uploadMedia, deleteMedia }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export function useProjectMedia() {
  return useContext(MediaContext);
}

/** Alias for antony-portfolio naming familiarity */
export const useProjectImages = useProjectMedia;
