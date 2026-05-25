"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";

type Props = { dict: Dictionary; lang: Locale };

export default function Navbar({ dict, lang }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const otherLang = lang === "tr" ? "en" : "tr";
  const otherPath = pathname.replace(`/${lang}`, `/${otherLang}`);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Demo kullanıcı kontrolü
    const demo = localStorage.getItem("fl_demo_user");
    if (demo) { setUserEmail(JSON.parse(demo).email); return; }

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    localStorage.removeItem("fl_demo_user");
    localStorage.removeItem("fl_purchases");
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    router.push(`/${lang}`);
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-green-900/95 backdrop-blur border-b border-green-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold-400 rounded-lg flex items-center justify-center font-black text-green-900 text-sm">
            FL
          </div>
          <span className="font-bold text-white text-lg tracking-wide">FootLingo</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href={`/${lang}/courses`} className="text-green-200 hover:text-gold-400 transition text-sm font-medium">
            {dict.nav.courses}
          </Link>
          <Link href={`/${lang}/blog`} className="text-green-200 hover:text-gold-400 transition text-sm font-medium">
            {dict.nav.blog}
          </Link>
          <Link href={`/${lang}/paketler`} className="text-green-200 hover:text-gold-400 transition text-sm font-medium">
            {dict.nav.packages}
          </Link>
          <Link href={`/${lang}/basvuru`} className="text-gold-400 hover:text-gold-500 transition text-sm font-bold">
            {dict.nav.apply}
          </Link>
          <Link href={otherPath} className="text-green-400 hover:text-white transition text-sm font-medium uppercase">
            {otherLang}
          </Link>

          {userEmail ? (
            <>
              <Link href={`/${lang}/dashboard`} className="text-green-200 hover:text-gold-400 transition text-sm font-medium">
                {dict.nav.dashboard}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-green-800 border border-green-600 text-green-200 px-4 py-2 rounded-lg text-sm font-semibold hover:border-red-500 hover:text-red-400 transition"
              >
                {lang === "tr" ? "Çıkış" : "Log out"}
              </button>
            </>
          ) : (
            <Link
              href={`/${lang}/auth/login`}
              className="bg-gold-400 text-green-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gold-500 transition"
            >
              {dict.nav.login}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
