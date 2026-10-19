/**
 * Drop-in template — copy vào: app/api/reviews/route.ts
 *
 * 1. Cài: @supabase/supabase-js
 * 2. Env: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 * 3. Chạy sql/schema.sql trên Supabase
 */
import { createClient } from "@supabase/supabase-js";
import { createReviewsHandlers } from "../../src/createReviewsHandler";

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function getServiceSupabase() {
  if (!isSupabaseConfigured()) return null;
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

const handlers = createReviewsHandlers({
  getClient: () => getServiceSupabase(),
  isConfigured: isSupabaseConfigured,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
