import type { MetadataRoute } from "next";
import { mockCourses, mockBlogPosts } from "@/lib/mockData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://footlingo.com.tr";
const locales = ["tr", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/courses", "/blog", "/paketler", "/basvuru", "/contact"];

  const staticEntries = locales.flatMap((lang) =>
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    }))
  );

  const courseEntries = locales.flatMap((lang) =>
    mockCourses.map((course) => ({
      url: `${siteUrl}/${lang}/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const blogEntries = locales.flatMap((lang) =>
    mockBlogPosts.map((post) => ({
      url: `${siteUrl}/${lang}/blog/${post.slug}`,
      lastModified: new Date(post.published_at),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...courseEntries, ...blogEntries];
}
