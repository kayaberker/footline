import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default async function RegisterPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 to-green-800 flex items-center justify-center px-4">
      <div className="bg-green-800/50 p-8 rounded-2xl w-full max-w-sm border border-green-700">
        <h1 className="text-2xl font-bold text-white mb-6">{dict.auth.register}</h1>
        <AuthForm mode="register" dict={dict} lang={lang} />
        <p className="mt-4 text-green-300 text-sm text-center">
          {dict.auth.hasAccount}{" "}
          <Link href={`/${lang}/auth/login`} className="text-gold-400 hover:underline">
            {dict.auth.login}
          </Link>
        </p>
      </div>
    </main>
  );
}
