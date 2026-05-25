"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = { dict: Dictionary; lang: Locale };

export default function HeroSection({ dict, lang }: Props) {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className="absolute top-20 left-10 text-[200px] font-black text-gold-400">⚽</div>
        <div className="absolute bottom-10 right-10 text-[150px] font-black text-gold-400">⚽</div>
      </div>
      <div className="text-center relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold-400 font-semibold tracking-widest uppercase text-sm mb-4">FootLingo</p>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-2">
            {dict.hero.title}
          </h1>
          <h2 className="text-6xl md:text-8xl font-black text-gold-400 leading-none mb-8">
            {dict.hero.subtitle}
          </h2>
          <p className="text-green-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {dict.hero.description}
          </p>
          <Link
            href={`/${lang}/courses`}
            className="inline-block bg-gold-400 text-green-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gold-500 transition-all hover:scale-105 shadow-lg"
          >
            {dict.hero.cta} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
