import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

const icons: Record<string, string> = {
  player: "⚽",
  coach: "🧑‍💼",
  journalist: "🎙️",
  fan: "📺",
};

type Props = { dict: Dictionary; lang: Locale };

export default function CategoryCards({ dict, lang }: Props) {
  const categories = ["player", "coach", "journalist", "fan"] as const;

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-black text-white text-center mb-12">
        {lang === "tr" ? "Kime Göre Öğreniyorsun?" : "Who Are You Learning For?"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/${lang}/courses?category=${cat}`}
            className="bg-green-800/50 border border-green-700 rounded-2xl p-6 text-center hover:border-gold-400 hover:bg-green-800 transition-all group"
          >
            <div className="text-4xl mb-3">{icons[cat]}</div>
            <h3 className="font-bold text-white group-hover:text-gold-400 transition">
              {dict.categories[cat]}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
