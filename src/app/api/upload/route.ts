import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  getServiceSupabase,
  isSupabaseConfigured,
  BUCKET_NAME,
  MEDIA_TABLE,
  TABLE_NAME,
} from "@/lib/supabase";
import { fetchDatabaseMedia } from "@/lib/get-db-media";

const DB_PATH = path.join(process.cwd(), "src", "data", "project-media.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function getLocalDb(): Promise<Record<string, string>> {
  try {
    return JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
  } catch {
    return {};
  }
}

async function saveLocalDb(data: Record<string, string>) {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not save local media db:", err);
  }
}

function detectMediaType(file: File, ext: string): "image" | "video" {
  if (file.type.startsWith("video/") || /^(mp4|webm|mov|m4v)$/i.test(ext)) {
    return "video";
  }
  return "image";
}

export async function GET() {
  try {
    const media = await fetchDatabaseMedia();
    return NextResponse.json(media, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    });
  } catch (error) {
    console.error("GET media error:", error);
    return NextResponse.json({});
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const slotId = formData.get("slotId") as string;
    const file = formData.get("file") as File | null;

    if (!slotId || !file) {
      return NextResponse.json(
        { error: "Missing slotId or file" },
        { status: 400 }
      );
    }

    const originalName = file.name || "image.png";
    const extMatch = originalName.match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";
    const cleanSlot = slotId.replace(/[^a-zA-Z0-9_-]/g, "_");
    const fileName = `${cleanSlot}-${Date.now()}.${ext}`;
    const mediaType = detectMediaType(file, ext);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (isSupabaseConfigured()) {
      const supabase = getServiceSupabase();
      if (supabase) {
        try {
          await supabase.storage.createBucket(BUCKET_NAME, { public: true });
        } catch {
          // bucket may already exist
        }

        const mimeType = file.type || (mediaType === "video" ? "video/mp4" : "image/jpeg");
        const { error: storageError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(fileName, buffer, { contentType: mimeType, upsert: true });

        if (storageError) {
          console.error("Supabase Storage upload error:", storageError);
          throw storageError;
        }

        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(fileName);
        const publicUrl = urlData.publicUrl;

        await supabase.from(MEDIA_TABLE).upsert({
          id: slotId,
          media_url: publicUrl,
          media_type: mediaType,
          updated_at: new Date().toISOString(),
        });

        // Keep legacy table in sync for image slots
        if (mediaType === "image") {
          await supabase.from(TABLE_NAME).upsert({
            id: slotId,
            image_url: publicUrl,
            updated_at: new Date().toISOString(),
          });
        }

        const local = await getLocalDb();
        local[slotId] = publicUrl;
        await saveLocalDb(local);

        return NextResponse.json({
          success: true,
          url: publicUrl,
          mediaType,
          cloud: "supabase",
        });
      }
    }

    // Local filesystem fallback (dev)
    try {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      await fs.writeFile(path.join(UPLOAD_DIR, fileName), buffer);
      const publicUrl = `/uploads/${fileName}`;
      const local = await getLocalDb();
      local[slotId] = publicUrl;
      await saveLocalDb(local);
      return NextResponse.json({
        success: true,
        url: publicUrl,
        mediaType,
        cloud: "local",
      });
    } catch (fsErr) {
      console.warn("Local upload failed, using inline base64:", fsErr);
    }

    // Serverless fallback (images only)
    if (mediaType === "image") {
      const b64 = buffer.toString("base64");
      const dataUrl = `data:${file.type || "image/jpeg"};base64,${b64}`;
      return NextResponse.json({
        success: true,
        url: dataUrl,
        mediaType,
        cloud: "inline-base64",
        warning: "Supabase chưa cấu hình — dùng base64 tạm thời.",
      });
    }

    return NextResponse.json(
      {
        error:
          "Video upload cần Supabase Storage. Hãy thêm NEXT_PUBLIC_SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("POST upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const slotId = new URL(req.url).searchParams.get("slotId");
    if (!slotId) {
      return NextResponse.json({ error: "Missing slotId" }, { status: 400 });
    }

    const local = await getLocalDb();
    const existingUrl = local[slotId];

    if (isSupabaseConfigured()) {
      const supabase = getServiceSupabase();
      if (supabase) {
        if (existingUrl && existingUrl.includes("/storage/")) {
          const fileName = existingUrl.split("/").pop();
          if (fileName) {
            await supabase.storage.from(BUCKET_NAME).remove([fileName]);
          }
        }
        await supabase.from(MEDIA_TABLE).delete().eq("id", slotId);
        await supabase.from(TABLE_NAME).delete().eq("id", slotId);
      }
    }

    if (existingUrl?.startsWith("/uploads/")) {
      const fileName = existingUrl.replace("/uploads/", "");
      try {
        await fs.unlink(path.join(UPLOAD_DIR, fileName));
      } catch {
        // ignore
      }
    }

    delete local[slotId];
    await saveLocalDb(local);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE upload error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
