import type { Locale } from "@/lib/i18n";
import Link from "next/link";

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang } = await params;
  const isTr = lang === "tr";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="text-4xl font-black text-white mb-4">
          {isTr ? "Satın Alma Başarılı!" : "Purchase Successful!"}
        </h1>
        <p className="text-green-300 text-lg mb-8">
          {isTr
            ? "Kursa erişim sağlandı. Panelinden videolara ulaşabilirsin."
            : "You now have access to the course. Watch your videos from the dashboard."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${lang}/dashboard`}
            className="bg-gold-400 text-green-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gold-500 transition"
          >
            {isTr ? "Panelime Git →" : "Go to Dashboard →"}
          </Link>
          <Link
            href={`/${lang}/courses`}
            className="border border-green-600 text-green-300 px-8 py-4 rounded-xl font-bold text-lg hover:border-gold-400 hover:text-gold-400 transition"
          >
            {isTr ? "Kurslara Dön" : "Back to Courses"}
          </Link>
        </div>
      </div>
    </div>
  );
}
