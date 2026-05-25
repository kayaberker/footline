-- Ön başvurular tablosu
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  club_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('player', 'coach', 'journalist', 'fan')),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dekont yüklemeleri tablosu
CREATE TABLE IF NOT EXISTS public.dekont_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT,
  course_slug TEXT NOT NULL,
  course_title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kurs erişimi tablosu
CREATE TABLE IF NOT EXISTS public.course_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_slug)
);

-- RLS politikaları
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dekont_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_access ENABLE ROW LEVEL SECURITY;

-- Applications: herkes ekleyebilir, sadece service role okuyabilir
CREATE POLICY "anyone_insert_application"
  ON public.applications FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Dekont: giriş yapmış kullanıcı kendi dekontunu ekleyebilir ve görebilir
CREATE POLICY "user_insert_own_dekont"
  ON public.dekont_uploads FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_select_own_dekont"
  ON public.dekont_uploads FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Course access: kullanıcı kendi erişimini görebilir
CREATE POLICY "user_select_own_access"
  ON public.course_access FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Storage bucket for dekontlar
INSERT INTO storage.buckets (id, name, public) VALUES ('dekontlar', 'dekontlar', false)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "user_upload_dekont"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'dekontlar' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "user_read_own_dekont"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'dekontlar' AND auth.uid()::text = (storage.foldername(name))[1]);
