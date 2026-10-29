"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "@supabase/supabase-js";
import { compressImage } from "@/lib/image-compress";
import {
  friendlyUploadError,
  isVideoFile,
  MAX_VIDEO_BYTES,
} from "@/lib/media-files";

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
const MEDIA_BUCKET = "project-media";

async function readUploadError(res: Response) {
  const errText = await res.text().catch(() => "");
  try {
    const parsed = JSON.parse(errText) as { error?: string };
    if (parsed.error) return friendlyUploadError(parsed.error);
  } catch {
    // response was plain text
  }
  return friendlyUploadError(errText || `Upload failed: ${res.status}`);
}

async function uploadVideoDirect(slotId: string, file: File): Promise<string> {
  if (file.size > MAX_VIDEO_BYTES) {
    throw new Error(friendlyUploadError("exceeded the maximum allowed size"));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!supabaseUrl.startsWith("http") || !anonKey) {
    throw new Error("SKIP_DIRECT");
  }

  const supabase = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
  const ext = extMatch ? extMatch[1].toLowerCase() : "mp4";
  const cleanSlot = slotId.replace(/[^a-zA-Z0-9_-]/g, "_");
  const fileName = `${cleanSlot}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(fileName, file, {
    contentType: file.type || "video/mp4",
    upsert: false,
  });
  if (error) {
    throw new Error(friendlyUploadError(error.message));
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(fileName);
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slotId, url: data.publicUrl, mediaType: "video" }),
  });
  if (!res.ok) {
    throw new Error(await readUploadError(res));
  }
  return data.publicUrl;
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
      if (isVideoFile(file)) {
        try {
          const newUrl = await uploadVideoDirect(slotId, file);
          setMedia((prev) => {
            const next = { ...prev, [slotId]: newUrl };
            persist(next);
            return next;
          });
          return newUrl;
        } catch (directErr) {
          if (!(directErr instanceof Error) || directErr.message !== "SKIP_DIRECT") {
            throw directErr;
          }
        }
      }

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
          throw new Error(await readUploadError(res));
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
        if (isVideoFile(file)) {
          throw err instanceof Error ? err : new Error("Không tải được video.");
        }
        // Offline / local fallback as data URL for images only
        if (typeof window !== "undefined") {
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
