import type { Locale } from "@/lib/i18n";
import { i18n } from "@/lib/i18n";

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
  const { lang } = await params;
  return <div lang={lang}>{children}</div>;
}
