-- Kullanıcı profilleri
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  language TEXT DEFAULT 'tr' CHECK (language IN ('tr', 'en')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kurslar
CREATE TABLE public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_tr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_tr TEXT,
  description_en TEXT,
  price INTEGER NOT NULL,
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  category TEXT CHECK (category IN ('player', 'coach', 'journalist', 'fan')),
  vimeo_id TEXT,
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Satın almalar
CREATE TABLE public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  amount_paid INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Canlı dersler
CREATE TABLE public.live_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id),
  title_tr TEXT,
  title_en TEXT,
  zoom_url TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60
);

-- Blog yazıları
CREATE TABLE public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_tr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_tr TEXT,
  content_en TEXT,
  published_at TIMESTAMPTZ,
  is_published BOOLEAN DEFAULT FALSE
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Herkes yayınlanmış kursları görebilir" ON public.courses
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Kullanıcılar kendi satın almalarını görebilir" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi profilini görebilir" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Herkes yayınlanmış blog yazılarını görebilir" ON public.blog_posts
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Kullanıcılar satın aldığı kursların canlı derslerini görebilir" ON public.live_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.purchases
      WHERE purchases.course_id = live_sessions.course_id
      AND purchases.user_id = auth.uid()
    )
  );

-- Yeni kullanıcı oluşturulduğunda profil otomatik oluştur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
