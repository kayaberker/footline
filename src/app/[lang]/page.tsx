import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import HeroSection from "@/components/HeroSection";
import CategoryCards from "@/components/CategoryCards";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import { mockCourses, formatPrice } from "@/lib/mockData";
import Link from "next/link";

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isTr = lang === "tr";
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <>
      <HeroSection dict={dict} lang={lang} />
      <CategoryCards dict={dict} lang={lang} />

      {/* Öne Çıkan Kurslar */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-white">
            {isTr ? "Öne Çıkan Kurslar" : "Featured Courses"}
          </h2>
          <Link href={`/${lang}/courses`} className="text-gold-400 hover:underline text-sm font-semibold">
            {isTr ? "Tümünü Gör →" : "View All →"}
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Link
              key={course.id}
              href={`/${lang}/courses/${course.slug}`}
              className="group bg-green-800/40 border border-green-700 rounded-2xl p-6 hover:border-gold-400 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{course.thumbnail}</div>
                <span className="text-gold-400 font-black text-lg">{formatPrice(course.price)}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-gold-400 transition leading-snug">
                {isTr ? course.title_tr : course.title_en}
              </h3>
              <p className="text-green-300 text-sm line-clamp-2">
                {isTr ? course.description_tr : course.description_en}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <HowItWorks dict={dict} />
      <Testimonials lang={lang} />

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-800 to-green-700 border border-green-600 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            {isTr ? "Sahaya Çıkmaya Hazır mısın?" : "Ready to Step onto the Pitch?"}
          </h2>
          <p className="text-green-200 text-lg mb-8">
            {isTr
              ? "Futbol İngilizcesini bugün öğrenmeye başla. İlk dersin ücretsiz."
              : "Start learning Football English today. Your first lesson is free."}
          </p>
          <Link
            href={`/${lang}/courses`}
            className="inline-block bg-gold-400 text-green-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gold-500 transition hover:scale-105"
          >
            {isTr ? "Kurslara Başla →" : "Browse Courses →"}
          </Link>
        </div>
      </section>
    </>
  );
}
