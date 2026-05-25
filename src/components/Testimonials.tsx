import { mockTestimonials } from "@/lib/mockData";
import type { Locale } from "@/lib/i18n";

type Props = { lang: Locale };

export default function Testimonials({ lang }: Props) {
  const isTr = lang === "tr";

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-black text-white text-center mb-4">
        {isTr ? "Öğrencilerimiz Ne Diyor?" : "What Our Students Say"}
      </h2>
      <p className="text-green-400 text-center mb-12">
        {isTr ? "Gerçek hikayeler, gerçek sonuçlar" : "Real stories, real results"}
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {mockTestimonials.map((t, i) => (
          <div
            key={i}
            className="bg-green-800/40 border border-green-700 rounded-2xl p-6 hover:border-gold-400/50 transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center font-black text-green-900 text-sm">
                {t.avatar}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-green-400 text-xs">{isTr ? t.role_tr : t.role_en}</p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              "{isTr ? t.text_tr : t.text_en}"
            </p>
            <div className="mt-4 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gold-400 text-sm">★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
