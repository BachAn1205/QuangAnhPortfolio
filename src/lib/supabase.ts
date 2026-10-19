import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
      supabaseUrl.startsWith("http") &&
      supabaseAnonKey &&
      supabaseAnonKey !== "your-anon-key" &&
      supabaseAnonKey !== "your-supabase-anon-key"
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const getServiceSupabase = () => {
  if (!isSupabaseConfigured()) return null;
  return createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

/** Storage bucket for images + videos */
export const BUCKET_NAME = "project-media";
/** Primary media metadata table */
export const MEDIA_TABLE = "project_media";
/** Legacy image table (kept in sync for compatibility) */
export const TABLE_NAME = "project_images";
