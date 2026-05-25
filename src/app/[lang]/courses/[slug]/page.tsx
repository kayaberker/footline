import type { Locale } from "@/lib/i18n";
import { mockCourses, levelLabels, formatPrice } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Link from "next/link";
import PurchaseButton from "@/components/PurchaseButton";

const levelColors: Record<string, string> = {
  beginner: "text-green-400",
  intermediate: "text-gold-400",
  advanced: "text-red-400",
};

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const course = mockCourses.find((c) => c.slug === slug);
  if (!course) notFound();

  const isTr = lang === "tr";

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Sol: Detaylar */}
        <div className="lg:col-span-2 space-y-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-green-500">
            <Link href={`/${lang}/courses`} className="hover:text-gold-400 transition">
              {isTr ? "Kurslar" : "Courses"}
            </Link>
            <span>›</span>
            <span className="text-green-300">{isTr ? course.title_tr : course.title_en}</span>
          </div>

          {/* Başlık */}
          <div>
            <div className="text-5xl mb-4">{course.thumbnail}</div>
            {course.badge_tr && (
              <span className="inline-block bg-gold-400/20 text-gold-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                {isTr ? course.badge_tr : course.badge_en}
              </span>
            )}
            <h1 className="text-4xl font-black text-white mb-3 leading-tight">
              {isTr ? course.title_tr : course.title_en}
            </h1>
            <span className={`text-sm font-semibold uppercase tracking-wide ${levelColors[course.level]}`}>
              {levelLabels[lang][course.level as keyof typeof levelLabels.tr]}
            </span>
            <p className="text-green-200 text-lg leading-relaxed mt-4">
              {isTr ? course.description_tr : course.description_en}
            </p>
          </div>

          {/* Kazanımlar */}
          <div className="bg-green-800/40 border border-green-700 rounded-2xl p-6">
            <h2 className="text-white font-bold text-xl mb-4">
              {isTr ? "Bu Kursu Bitirince Neler Yapabileceksin?" : "What Will You Be Able to Do?"}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {(isTr ? course.outcomes_tr : course.outcomes_en).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-green-200 text-sm">
                  <span className="text-gold-400 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Müfredat */}
          <div>
            <h2 className="text-white font-bold text-2xl mb-6">
              {isTr ? "Kurs İçeriği" : "Course Curriculum"}
            </h2>
            <div className="space-y-4">
              {course.curriculum.map((mod, i) => (
                <div key={i} className="bg-green-800/30 border border-green-700/60 rounded-xl overflow-hidden">
                  <div className="bg-green-800/60 px-5 py-3 flex items-center gap-3">
                    <span className="text-gold-400 font-black text-sm">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-white font-semibold">
                      {isTr ? mod.module_tr : mod.module_en}
                    </h3>
                  </div>
                  <ul className="px-5 py-4 space-y-2">
                    {(isTr ? mod.topics_tr : mod.topics_en).map((topic, j) => (
                      <li key={j} className="flex items-start gap-2 text-green-300 text-sm">
                        <span className="text-green-600 mt-1 shrink-0">▸</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ: Satın Alma Kartı */}
        <div className="lg:col-span-1">
          <div className="bg-green-800/50 border border-green-700 rounded-2xl p-6 sticky top-24">
            <div className="text-4xl font-black text-gold-400 mb-1">
              {formatPrice(course.price)}
            </div>
            <p className="text-green-400 text-sm mb-6">
              {isTr ? "Tek seferlik ödeme · Ömür boyu erişim" : "One-time payment · Lifetime access"}
            </p>

            {/* Kurs bilgileri */}
            <div className="space-y-3 mb-6 text-sm border-b border-green-700 pb-6">
              <div className="flex justify-between text-green-300">
                <span>{isTr ? "Ders sayısı" : "Lessons"}</span>
                <span className="text-white font-semibold">{course.lessons}</span>
              </div>
              <div className="flex justify-between text-green-300">
                <span>{isTr ? "Toplam süre" : "Total duration"}</span>
                <span className="text-white font-semibold">{isTr ? course.duration : course.duration_en}</span>
              </div>
              <div className="flex justify-between text-green-300">
                <span>{isTr ? "Seviye" : "Level"}</span>
                <span className={`font-semibold ${levelColors[course.level]}`}>
                  {levelLabels[lang][course.level as keyof typeof levelLabels.tr]}
                </span>
              </div>
              <div className="flex justify-between text-green-300">
                <span>{isTr ? "Format" : "Format"}</span>
                <span className="text-white font-semibold">{isTr ? "Video + Canlı" : "Video + Live"}</span>
              </div>
            </div>

            {/* Paket içeriği */}
            <div className="mb-6">
              <p className="text-white font-semibold text-sm mb-3">
                {isTr ? "Bu paket içerir:" : "This package includes:"}
              </p>
              <ul className="space-y-2">
                {(isTr ? course.includes_tr : course.includes_en).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-green-300 text-xs">
                    <span className="text-gold-400 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <PurchaseButton
              courseId={course.id}
              lang={lang}
              slug={course.slug}
              label={isTr ? `Şimdi Satın Al — ${formatPrice(course.price)}` : `Buy Now — ${formatPrice(course.price)}`}
            />

            <p className="text-green-500 text-xs text-center mt-3">
              {isTr ? "30 gün içinde iade garantisi" : "30-day money-back guarantee"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
