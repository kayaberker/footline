import type { Locale } from "@/lib/i18n";
import { mockCourses, formatPrice, levelLabels } from "@/lib/mockData";
import Link from "next/link";

const levelColors: Record<string, string> = {
  beginner: "text-green-400 bg-green-400/10",
  intermediate: "text-gold-400 bg-gold-400/10",
  advanced: "text-red-400 bg-red-400/10",
};

export default async function PaketlerPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isTr = lang === "tr";

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Başlık */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-white mb-4">
          {isTr ? "Paketler & Fiyatlar" : "Packages & Pricing"}
        </h1>
        <p className="text-green-300 text-lg max-w-2xl mx-auto">
          {isTr
            ? "Kariyerine en uygun paketi seç. Tüm paketlerde tek seferlik ödeme ve ömür boyu erişim."
            : "Choose the package that fits your career. One-time payment and lifetime access with every package."}
        </p>
      </div>

      {/* Paket Kartları */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockCourses.map((course) => {
          const isFeatured = course.badge_tr === "En İyi Değer" || course.badge_en === "Best Value";
          const isPopular = course.badge_tr === "En Popüler" || course.badge_en === "Most Popular";

          return (
            <div
              key={course.id}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                isFeatured
                  ? "border-gold-400 bg-gradient-to-b from-green-800/60 to-green-900/60 shadow-[0_0_40px_rgba(251,191,36,0.12)]"
                  : "border-green-700 bg-green-800/30 hover:border-green-500"
              }`}
            >
              {/* Rozet */}
              {(course.badge_tr || course.badge_en) && (
                <div
                  className={`absolute -top-3 left-6 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isFeatured
                      ? "bg-gold-400 text-green-900"
                      : isPopular
                      ? "bg-green-500 text-white"
                      : "bg-green-700 text-green-200"
                  }`}
                >
                  {isTr ? course.badge_tr : course.badge_en}
                </div>
              )}

              {/* Kurs Başlığı */}
              <div className="mb-5 mt-2">
                <div className="text-3xl mb-3">{course.thumbnail}</div>
                <h2 className="text-white font-bold text-lg leading-snug mb-2">
                  {isTr ? course.title_tr : course.title_en}
                </h2>
                <span
                  className={`inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                    levelColors[course.level]
                  }`}
                >
                  {levelLabels[lang][course.level as keyof typeof levelLabels.tr]}
                </span>
              </div>

              {/* Fiyat */}
              <div className="mb-5 pb-5 border-b border-green-700">
                <div className={`text-3xl font-black ${isFeatured ? "text-gold-400" : "text-white"}`}>
                  {formatPrice(course.price)}
                </div>
                <p className="text-green-400 text-xs mt-1">
                  {isTr ? "Tek seferlik · Ömür boyu erişim" : "One-time · Lifetime access"}
                </p>
              </div>

              {/* Kurs Bilgileri */}
              <div className="flex gap-4 mb-5 text-xs text-green-400">
                <span>📚 {course.lessons} {isTr ? "ders" : "lessons"}</span>
                <span>⏱ {isTr ? course.duration : course.duration_en}</span>
              </div>

              {/* Paket İçeriği */}
              <div className="flex-1 mb-6">
                <p className="text-green-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  {isTr ? "Pakete Dahil" : "What's Included"}
                </p>
                <ul className="space-y-2.5">
                  {(isTr ? course.includes_tr : course.includes_en).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-green-200 text-sm">
                      <span
                        className={`shrink-0 mt-0.5 font-bold ${
                          isFeatured ? "text-gold-400" : "text-green-400"
                        }`}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link
                href={`/${lang}/courses/${course.slug}`}
                className={`block w-full py-3.5 rounded-xl font-bold text-center transition ${
                  isFeatured
                    ? "bg-gold-400 text-green-900 hover:bg-gold-500"
                    : "bg-green-700 text-white hover:bg-green-600 border border-green-600"
                }`}
              >
                {isTr ? "Paketi İncele →" : "View Package →"}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Alt Bilgi */}
      <div className="mt-16 text-center space-y-3">
        <p className="text-green-400 text-sm">
          {isTr
            ? "Tüm paketlerde 30 gün iade garantisi. Sorun yaşarsan iade ediyoruz."
            : "30-day money-back guarantee with every package. If it's not for you, we'll refund you."}
        </p>
        <p className="text-green-500 text-sm">
          {isTr
            ? "Kurumsal satın alım veya grup indirimi için "
            : "For corporate purchases or group discounts, "}
          <Link href={`/${lang}/contact`} className="text-gold-400 hover:underline">
            {isTr ? "bizimle iletişime geç" : "contact us"}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
