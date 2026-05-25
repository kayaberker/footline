"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { mockCourses, formatPrice } from "@/lib/mockData";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";
import { createClient } from "@/lib/supabase/client";

type AccessEntry = { course_slug: string };
type DekontEntry = { course_slug: string; status: string };

export default function DashboardPage() {
  const { lang } = useParams() as { lang: Locale };
  const isTr = lang === "tr";

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accessList, setAccessList] = useState<AccessEntry[]>([]);
  const [dekontlar, setDekontlar] = useState<DekontEntry[]>([]);
  const [mounted, setMounted] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadMsg, setUploadMsg] = useState<Record<string, string>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    setMounted(true);

    // Demo kullanıcı kontrolü
    const demo = localStorage.getItem("fl_demo_user");
    if (demo) {
      setUserEmail(JSON.parse(demo).email);
      return; // Supabase sorguları atla — purchases localStorage'dan geliyor
    }

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserEmail(user.email ?? null);

      supabase.from("course_access").select("course_slug").eq("user_id", user.id)
        .then(({ data }) => setAccessList(data ?? []));

      supabase.from("dekont_uploads").select("course_slug, status").eq("user_id", user.id)
        .then(({ data }) => setDekontlar(data ?? []));
    });
  }, []);

  async function uploadDekont(courseSlug: string, courseTitle: string, file: File) {
    setUploading(courseSlug);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("course_slug", courseSlug);
    fd.append("course_title", courseTitle);

    const res = await fetch("/api/dekont", { method: "POST", body: fd });

    if (res.ok) {
      setUploadMsg((prev) => ({ ...prev, [courseSlug]: "success" }));
      setDekontlar((prev) => [...prev, { course_slug: courseSlug, status: "pending" }]);
    } else {
      setUploadMsg((prev) => ({ ...prev, [courseSlug]: "error" }));
    }
    setUploading(null);
  }

  if (!mounted) return null;

  const hasAccess = (slug: string) => accessList.some((a) => a.course_slug === slug);
  const getDekontStatus = (slug: string) => dekontlar.find((d) => d.course_slug === slug)?.status;

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white mb-2">
          {isTr ? "Panelim" : "My Dashboard"}
        </h1>
        {userEmail && <p className="text-green-400">{userEmail}</p>}
      </div>

      {/* Ödeme Bilgisi Kutusu */}
      <div className="bg-gold-400/10 border border-gold-400/40 rounded-2xl p-5 mb-10">
        <h2 className="text-gold-400 font-bold mb-3">
          {isTr ? "📋 Nasıl Ödeme Yapılır?" : "📋 How to Pay?"}
        </h2>
        <ol className="text-green-200 text-sm leading-relaxed space-y-1 list-decimal list-inside">
          {isTr ? (
            <>
              <li>Aşağıdan istediğin kursu seç.</li>
              <li>
                Bize WhatsApp veya telefon ile ulaş — sana ödeme linki göndereceğiz.{" "}
                <a
                  href="https://wa.me/905348889800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 font-bold hover:underline"
                >
                  +90 534 888 98 00
                </a>
              </li>
              <li>Ödeme tamamlandıktan sonra dekontu aşağıya yükle — 24 saat içinde erişim açılır.</li>
            </>
          ) : (
            <>
              <li>Choose your course below.</li>
              <li>
                Contact us via WhatsApp or phone — we will send you a payment link.{" "}
                <a
                  href="https://wa.me/905348889800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 font-bold hover:underline"
                >
                  +90 534 888 98 00
                </a>
              </li>
              <li>After payment, upload your receipt below — access opens within 24 hours.</li>
            </>
          )}
        </ol>
      </div>

      <div className="space-y-6">
        {mockCourses.map((course) => {
          const active = hasAccess(course.slug);
          const dekontStatus = getDekontStatus(course.slug);
          const title = isTr ? course.title_tr : course.title_en;

          return (
            <div key={course.id} className="bg-green-800/40 border border-green-700 rounded-2xl overflow-hidden">
              {/* Kurs başlığı */}
              <div className="p-5 border-b border-green-700/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{course.thumbnail}</span>
                  <div>
                    <h3 className="text-white font-bold">{title}</h3>
                    <p className="text-green-400 text-sm">{formatPrice(course.price)}</p>
                  </div>
                </div>
                <div>
                  {active && (
                    <span className="bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full">
                      ✅ {isTr ? "Erişim Açık" : "Access Active"}
                    </span>
                  )}
                  {!active && dekontStatus === "pending" && (
                    <span className="bg-yellow-400/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full">
                      ⏳ {isTr ? "Onay Bekleniyor" : "Pending Approval"}
                    </span>
                  )}
                  {!active && dekontStatus === "rejected" && (
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
                      ❌ {isTr ? "Reddedildi" : "Rejected"}
                    </span>
                  )}
                </div>
              </div>

              {/* İçerik */}
              <div className="p-5">
                {active && course.youtube_id ? (
                  <VideoPlayer youtubeId={course.youtube_id} title={title} />
                ) : active ? (
                  <div className="aspect-video bg-green-900/60 rounded-xl flex items-center justify-center">
                    <p className="text-green-400">{isTr ? "Video yakında" : "Video coming soon"}</p>
                  </div>
                ) : !dekontStatus || dekontStatus === "rejected" ? (
                  /* Dekont yükleme alanı */
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      ref={(el) => { fileRefs.current[course.slug] = el; }}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadDekont(course.slug, title, file);
                      }}
                    />
                    <button
                      onClick={() => fileRefs.current[course.slug]?.click()}
                      disabled={uploading === course.slug}
                      className="px-5 py-2.5 bg-green-700 border border-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-600 transition disabled:opacity-50"
                    >
                      {uploading === course.slug
                        ? (isTr ? "Yükleniyor..." : "Uploading...")
                        : (isTr ? "🧾 Dekont Yükle" : "🧾 Upload Receipt")}
                    </button>
                    {uploadMsg[course.slug] === "success" && (
                      <p className="text-green-400 text-sm">{isTr ? "✅ Yüklendi, onay bekleniyor." : "✅ Uploaded, awaiting approval."}</p>
                    )}
                    {uploadMsg[course.slug] === "error" && (
                      <p className="text-red-400 text-sm">{isTr ? "Hata oluştu." : "Upload failed."}</p>
                    )}
                    <Link
                      href={`/${lang}/courses/${course.slug}`}
                      className="text-green-400 hover:text-gold-400 text-sm transition"
                    >
                      {isTr ? "Kurs detayları →" : "Course details →"}
                    </Link>
                  </div>
                ) : (
                  <p className="text-yellow-300 text-sm">
                    ⏳ {isTr ? "Dekontun inceleniyor, 24 saat içinde erişim açılacak." : "Your receipt is being reviewed, access opens within 24 hours."}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
