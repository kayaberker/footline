import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { mockCourses, levelLabels, formatPrice } from "@/lib/mockData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";
  return {
    title: isTr ? "Kurslar — Futbol İngilizcesi Eğitimleri" : "Courses — Football English Training",
    description: isTr
      ? "Futbolcular, antrenörler, yorumcular ve taraftarlar için tasarlanmış 6 farklı Futbol İngilizcesi kursu."
      : "6 Football English courses designed for footballers, coaches, commentators and fans.",
    alternates: { canonical: `/${lang}/courses` },
    openGraph: {
      title: isTr ? "Kurslar | FootLingo" : "Courses | FootLingo",
      description: isTr
        ? "Futbol İngilizcesi kurslarını keşfet. Her seviye ve profil için özel içerikler."
        : "Explore Football English courses. Tailored content for every level and profile.",
      url: `/${lang}/courses`,
    },
  };
}
import Link from "next/link";

const categoryIcons: Record<string, string> = {
  player: "⚽",
  coach: "🧑‍💼",
  journalist: "🎙️",
  fan: "📺",
};

const categoryLabels = {
  tr: { player: "Futbolcular", coach: "Antrenörler", journalist: "Yorumcular", fan: "Taraftarlar", all: "Tümü" },
  en: { player: "Players", coach: "Coaches", journalist: "Commentators", fan: "Fans", all: "All" },
};

const levelColors: Record<string, string> = {
  beginner: "text-green-400",
  intermediate: "text-gold-400",
  advanced: "text-red-400",
};

export default async function CoursesPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang } = await params;
  const { category } = await searchParams;
  const isTr = lang === "tr";

  const filtered = category
    ? mockCourses.filter((c) => c.category === category)
    : mockCourses;

  const labels = categoryLabels[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Başlık */}
      <div className="mb-12">
        <h1 className="text-5xl font-black text-white mb-4">
          {isTr ? "Kurslar" : "Courses"}
        </h1>
        <p className="text-green-300 text-lg">
          {isTr
            ? "Futbol İngilizcesi için tasarlanmış profesyonel eğitimler"
            : "Professional training designed for Football English"}
        </p>
      </div>

      {/* Kategori Filtreleri */}
      <div className="flex flex-wrap gap-3 mb-10">
        {(["all", "player", "coach", "journalist", "fan"] as const).map((cat) => (
          <Link
            key={cat}
            href={cat === "all" ? `/${lang}/courses` : `/${lang}/courses?category=${cat}`}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${
              (cat === "all" && !category) || category === cat
                ? "bg-gold-400 text-green-900 border-gold-400"
                : "border-green-700 text-green-300 hover:border-gold-400 hover:text-gold-400"
            }`}
          >
            {cat !== "all" && categoryIcons[cat]} {labels[cat]}
          </Link>
        ))}
      </div>

      {/* Kurs Kartları */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <Link
            key={course.id}
            href={`/${lang}/courses/${course.slug}`}
            className="group bg-green-800/40 border border-green-700 rounded-2xl p-6 hover:border-gold-400 hover:bg-green-800/60 transition-all"
          >
            {/* İkon + Fiyat */}
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl">{course.thumbnail}</div>
              <span className="text-gold-400 font-black text-xl">{formatPrice(course.price)}</span>
            </div>

            {/* Başlık */}
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-gold-400 transition leading-snug">
              {isTr ? course.title_tr : course.title_en}
            </h3>

            {/* Açıklama */}
            <p className="text-green-300 text-sm mb-5 line-clamp-2">
              {isTr ? course.description_tr : course.description_en}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs">
              <span className={`font-semibold uppercase tracking-wide ${levelColors[course.level]}`}>
                {levelLabels[lang][course.level as keyof typeof levelLabels.tr]}
              </span>
              <span className="text-green-500">
                {course.lessons} {isTr ? "ders" : "lessons"} · {isTr ? course.duration : course.duration_en}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
