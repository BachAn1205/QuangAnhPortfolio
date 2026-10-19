-- QuangAnhPort — chạy 1 lần trong Supabase SQL Editor
-- Tạo bảng reviews + media + storage bucket (ảnh & video)

-- 1. Reviews
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

CREATE INDEX IF NOT EXISTS idx_website_reviews_page_path ON public.website_reviews (page_path);
CREATE INDEX IF NOT EXISTS idx_website_reviews_status ON public.website_reviews (status);

ALTER TABLE public.website_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Reviews" ON public.website_reviews;
CREATE POLICY "Public Read Reviews" ON public.website_reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert Reviews" ON public.website_reviews;
CREATE POLICY "Public Insert Reviews" ON public.website_reviews FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public Update Reviews" ON public.website_reviews;
CREATE POLICY "Public Update Reviews" ON public.website_reviews FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public Delete Reviews" ON public.website_reviews;
CREATE POLICY "Public Delete Reviews" ON public.website_reviews FOR DELETE USING (true);

-- 2. Project media (ảnh + video theo slot)
CREATE TABLE IF NOT EXISTS public.project_media (
  id TEXT PRIMARY KEY,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Backward-compatible alias table name used by some helpers
CREATE TABLE IF NOT EXISTS public.project_images (
  id TEXT PRIMARY KEY,
  image_url TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public All Project Media" ON public.project_media;
CREATE POLICY "Public All Project Media" ON public.project_media FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public All Project Images" ON public.project_images;
CREATE POLICY "Public All Project Images" ON public.project_images FOR ALL USING (true) WITH CHECK (true);

-- 3. Storage bucket (public) for images & videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-media', 'project-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Media Select" ON storage.objects;
CREATE POLICY "Public Media Select" ON storage.objects FOR SELECT USING (bucket_id = 'project-media');

DROP POLICY IF EXISTS "Public Media Insert" ON storage.objects;
CREATE POLICY "Public Media Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-media');

DROP POLICY IF EXISTS "Public Media Update" ON storage.objects;
CREATE POLICY "Public Media Update" ON storage.objects FOR UPDATE USING (bucket_id = 'project-media');

DROP POLICY IF EXISTS "Public Media Delete" ON storage.objects;
CREATE POLICY "Public Media Delete" ON storage.objects FOR DELETE USING (bucket_id = 'project-media');
