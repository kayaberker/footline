import type { Locale } from "@/lib/i18n";
import { mockBlogPosts } from "@/lib/mockData";
import Link from "next/link";

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isTr = lang === "tr";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="text-5xl font-black text-white mb-4">Blog</h1>
        <p className="text-green-300 text-lg">
          {isTr
            ? "Futbol İngilizcesi hakkında ipuçları, terimler ve rehberler"
            : "Tips, terms and guides about Football English"}
        </p>
      </div>

      <div className="space-y-6">
        {mockBlogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/${lang}/blog/${post.slug}`}
            className="group block bg-green-800/40 border border-green-700 rounded-2xl p-6 hover:border-gold-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-green-500 text-sm">
                {new Date(post.published_at).toLocaleDateString(isTr ? "tr-TR" : "en-GB", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </span>
              <span className="text-green-700">·</span>
              <span className="text-green-500 text-sm">
                {isTr ? post.read_time : post.read_time_en}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-gold-400 transition mb-2">
              {isTr ? post.title_tr : post.title_en}
            </h2>
            <p className="text-green-300 text-sm leading-relaxed">
              {isTr ? post.excerpt_tr : post.excerpt_en}
            </p>
            <span className="inline-block mt-4 text-gold-400 text-sm font-semibold group-hover:underline">
              {isTr ? "Devamını Oku →" : "Read More →"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
