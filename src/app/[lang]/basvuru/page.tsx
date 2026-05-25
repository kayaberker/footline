"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

const roleOptions = {
  tr: [
    { value: "player", label: "⚽ Futbolcu" },
    { value: "coach", label: "🧑‍💼 Antrenör" },
    { value: "journalist", label: "🎙️ Yorumcu / Gazeteci" },
    { value: "fan", label: "📺 Taraftar" },
  ],
  en: [
    { value: "player", label: "⚽ Player" },
    { value: "coach", label: "🧑‍💼 Coach" },
    { value: "journalist", label: "🎙️ Commentator / Journalist" },
    { value: "fan", label: "📺 Fan" },
  ],
};

type Status = "idle" | "loading" | "success" | "error";

export default function BasvuruPage() {
  const { lang } = useParams() as { lang: Locale };
  const isTr = lang === "tr";

  const [form, setForm] = useState({
    name: "", email: "", phone: "", club_name: "", role: "", message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/basvuru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6">✅</div>
          <h1 className="text-3xl font-black text-white mb-4">
            {isTr ? "Başvurun Alındı!" : "Application Received!"}
          </h1>
          <p className="text-green-300 text-lg mb-6">
            {isTr
              ? "Başvurunu inceleyip sana telefon veya WhatsApp üzerinden ulaşacağız."
              : "We will review your application and contact you via phone or WhatsApp."}
          </p>
          <Link href={`/${lang}`} className="text-gold-400 hover:underline font-semibold">
            {isTr ? "← Ana Sayfaya Dön" : "← Back to Home"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-3">
          {isTr ? "Ön Başvuru" : "Pre-Application"}
        </h1>
        <p className="text-green-300 text-lg">
          {isTr
            ? "Başvurunu değerlendirip sana özel ödeme bilgilerini ileteceğiz. Kabul edildikten sonra kayıt olabilirsin."
            : "We will evaluate your application and send you personalised payment details. You can register after being accepted."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Ad Soyad */}
        <div>
          <label className="block text-sm font-semibold text-green-200 mb-1.5">
            {isTr ? "Ad Soyad *" : "Full Name *"}
          </label>
          <input
            name="name" value={form.name} onChange={handleChange} required
            className="w-full px-4 py-3 rounded-xl bg-green-900/60 border border-green-700 text-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            placeholder={isTr ? "Adınız Soyadınız" : "Your full name"}
          />
        </div>

        {/* E-posta */}
        <div>
          <label className="block text-sm font-semibold text-green-200 mb-1.5">
            {isTr ? "E-posta *" : "Email *"}
          </label>
          <input
            name="email" type="email" value={form.email} onChange={handleChange} required
            className="w-full px-4 py-3 rounded-xl bg-green-900/60 border border-green-700 text-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            placeholder="ornek@email.com"
          />
        </div>

        {/* Telefon */}
        <div>
          <label className="block text-sm font-semibold text-green-200 mb-1.5">
            {isTr ? "Telefon / WhatsApp *" : "Phone / WhatsApp *"}
          </label>
          <input
            name="phone" type="tel" value={form.phone} onChange={handleChange} required
            className="w-full px-4 py-3 rounded-xl bg-green-900/60 border border-green-700 text-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            placeholder="+90 5XX XXX XX XX"
          />
        </div>

        {/* Kulüp / Kurum */}
        <div>
          <label className="block text-sm font-semibold text-green-200 mb-1.5">
            {isTr ? "Kulüp / Kurum" : "Club / Organisation"}
            <span className="text-green-500 font-normal ml-1">({isTr ? "varsa" : "if applicable"})</span>
          </label>
          <input
            name="club_name" value={form.club_name} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-green-900/60 border border-green-700 text-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            placeholder={isTr ? "Fenerbahçe SK, TFF, TRT Spor..." : "Club name, federation, broadcaster..."}
          />
        </div>

        {/* Rol */}
        <div>
          <label className="block text-sm font-semibold text-green-200 mb-1.5">
            {isTr ? "Profil *" : "Profile *"}
          </label>
          <select
            name="role" value={form.role} onChange={handleChange} required
            className="w-full px-4 py-3 rounded-xl bg-green-900/60 border border-green-700 text-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent appearance-none"
          >
            <option value="">{isTr ? "Seçiniz..." : "Select..."}</option>
            {roleOptions[lang].map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Mesaj */}
        <div>
          <label className="block text-sm font-semibold text-green-200 mb-1.5">
            {isTr ? "Mesaj" : "Message"}
            <span className="text-green-500 font-normal ml-1">({isTr ? "isteğe bağlı" : "optional"})</span>
          </label>
          <textarea
            name="message" value={form.message} onChange={handleChange} rows={4}
            className="w-full px-4 py-3 rounded-xl bg-green-900/60 border border-green-700 text-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none"
            placeholder={isTr
              ? "Neden FootLingo'ya katılmak istiyorsunuz? Hedefleriniz neler?"
              : "Why do you want to join FootLingo? What are your goals?"}
          />
        </div>

        {status === "error" && (
          <p className="text-red-400 text-sm">
            {isTr ? "Bir hata oluştu. Lütfen tekrar deneyin." : "An error occurred. Please try again."}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-4 bg-gold-400 text-green-900 font-bold rounded-xl hover:bg-gold-500 transition text-lg disabled:opacity-60"
        >
          {status === "loading"
            ? (isTr ? "Gönderiliyor..." : "Sending...")
            : (isTr ? "Başvuruyu Gönder →" : "Submit Application →")}
        </button>

        <p className="text-green-500 text-sm text-center">
          {isTr
            ? "Başvurular genellikle 24 saat içinde değerlendirilir."
            : "Applications are usually reviewed within 24 hours."}
        </p>
      </form>
    </div>
  );
}
