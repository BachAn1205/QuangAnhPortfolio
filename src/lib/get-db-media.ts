import { promises as fs } from "fs";
import path from "path";
import {
  getServiceSupabase,
  isSupabaseConfigured,
  MEDIA_TABLE,
  TABLE_NAME,
} from "@/lib/supabase";

const LOCAL_PATH = path.join(process.cwd(), "src", "data", "project-media.json");

async function readLocal(): Promise<Record<string, string>> {
  try {
    const raw = await fs.readFile(LOCAL_PATH, "utf-8");
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

/** Map slotId → public URL (image or video) */
export async function fetchDatabaseMedia(): Promise<Record<string, string>> {
  const local = await readLocal();

  if (
    process.env.NEXT_PUBLIC_USE_STATIC_MEDIA === "true" ||
    process.env.USE_STATIC_MEDIA === "true"
  ) {
    return local;
  }

  if (!isSupabaseConfigured()) return local;

  const supabase = getServiceSupabase();
  if (!supabase) return local;

  const map: Record<string, string> = { ...local };

  try {
    const { data: mediaRows } = await supabase
      .from(MEDIA_TABLE)
      .select("id, media_url");
    if (mediaRows) {
      for (const row of mediaRows) {
        if (row?.id && row?.media_url) map[row.id] = row.media_url;
      }
    }
  } catch (err) {
    console.warn("project_media fetch warning:", err);
  }

  try {
    const { data: imageRows } = await supabase
      .from(TABLE_NAME)
      .select("id, image_url");
    if (imageRows) {
      for (const row of imageRows) {
        if (row?.id && row?.image_url && !map[row.id]) {
          map[row.id] = row.image_url;
        }
      }
    }
  } catch (err) {
    console.warn("project_images fetch warning:", err);
  }

  return map;
}
