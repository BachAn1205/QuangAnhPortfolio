-- Web Text Review Kit — Supabase schema
-- Chạy trong Supabase SQL Editor (một lần cho mỗi project)

CREATE TABLE IF NOT EXISTS public.website_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  selected_text TEXT,
  element_context TEXT,
  comment TEXT NOT NULL,
  reviewer_name TEXT DEFAULT 'Reviewer',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_website_reviews_page_path
  ON public.website_reviews (page_path);

CREATE INDEX IF NOT EXISTS idx_website_reviews_status
  ON public.website_reviews (status);

ALTER TABLE public.website_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Reviews" ON public.website_reviews;
CREATE POLICY "Public Read Reviews"
ON public.website_reviews FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public Insert Reviews" ON public.website_reviews;
CREATE POLICY "Public Insert Reviews"
ON public.website_reviews FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Reviews" ON public.website_reviews;
CREATE POLICY "Public Update Reviews"
ON public.website_reviews FOR UPDATE
USING (true);

DROP POLICY IF EXISTS "Public Delete Reviews" ON public.website_reviews;
CREATE POLICY "Public Delete Reviews"
ON public.website_reviews FOR DELETE
USING (true);
