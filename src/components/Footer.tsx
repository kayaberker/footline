import type { Dictionary, Locale } from "@/lib/i18n";
import Link from "next/link";

type Props = { dict: Dictionary; lang: Locale };

export default function Footer({ dict, lang }: Props) {
  return (
    <footer className="bg-green-900 border-t border-green-700 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gold-400 rounded-md flex items-center justify-center font-black text-green-900 text-xs">FL</div>
          <span className="font-bold text-white">FootLingo</span>
        </div>
        <div className="flex gap-6 text-sm text-green-400">
          <Link href={`/${lang}/courses`} className="hover:text-gold-400 transition">{dict.nav.courses}</Link>
          <Link href={`/${lang}/blog`} className="hover:text-gold-400 transition">{dict.nav.blog}</Link>
          <Link href={`/${lang}/basvuru`} className="hover:text-gold-400 transition">{dict.nav.apply}</Link>
          <Link href={`/${lang}/contact`} className="hover:text-gold-400 transition">{dict.footer.contact}</Link>
        </div>
        <p className="text-green-600 text-sm">© 2026 FootLingo. {dict.footer.rights}</p>
      </div>
    </footer>
  );
}
