import type { Locale } from "@/lib/i18n";
import { mockBlogPosts } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const isTr = lang === "tr";

  return (
    <article className="max-w-3xl mx-auto px-4 py-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-green-500 mb-8">
        <Link href={`/${lang}/blog`} className="hover:text-gold-400 transition">Blog</Link>
        <span>›</span>
        <span className="text-green-300">{isTr ? post.title_tr : post.title_en}</span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-4 text-sm text-green-500">
        <span>
          {new Date(post.published_at).toLocaleDateString(isTr ? "tr-TR" : "en-GB", {
            day: "numeric", month: "long", year: "numeric",
          })}
        </span>
        <span>·</span>
        <span>{isTr ? post.read_time : post.read_time_en}</span>
      </div>

      <h1 className="text-4xl font-black text-white mb-10 leading-tight">
        {isTr ? post.title_tr : post.title_en}
      </h1>

      {/* İçerik */}
      <div
        className="text-green-100 leading-relaxed prose-headings:text-white prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-3 prose-p:mb-4 prose-em:text-gold-400 prose-em:not-italic prose-em:font-semibold"
        style={{ fontSize: "1.05rem", lineHeight: "1.8" }}
        dangerouslySetInnerHTML={{ __html: isTr ? post.content_tr : post.content_en }}
      />

      {/* Geri Dön */}
      <div className="mt-16 pt-8 border-t border-green-700">
        <Link
          href={`/${lang}/blog`}
          className="text-gold-400 hover:underline font-semibold text-sm"
        >
          ← {isTr ? "Tüm Yazılar" : "All Posts"}
        </Link>
      </div>
    </article>
  );
}
