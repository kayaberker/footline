import type { Locale } from "@/lib/i18n";
import { getDictionary, i18n } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);

  return (
    <div lang={lang} className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900">
      <Navbar dict={dict} lang={lang} />
      <main className="pt-16">{children}</main>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
