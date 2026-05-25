"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";

const WHATSAPP_NUMBER = "905348889800";

export default function ContactPage() {
  const { lang } = useParams() as { lang: Locale };
  const isTr = lang === "tr";

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // Supabase bağlantısı kurulunca buraya kayıt eklenecek
    // Şimdilik WhatsApp'a yönlendir
    const msg = encodeURIComponent(
      `Ad: ${form.name}\nE-posta: ${form.email}\n\n${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setStatus("success");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black text-white mb-4">
          {isTr ? "İletişim" : "Contact"}
        </h1>
        <p className="text-green-300 text-lg max-w-xl mx-auto">
          {isTr
            ? "Sorularınız için bize ulaşın. Genellikle 24 saat içinde yanıt veriyoruz."
            : "Reach out to us with your questions. We usually respond within 24 hours."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Sol: İletişim formu */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">
            {isTr ? "Mesaj Gönder" : "Send a Message"}
          </h2>

          {status === "success" ? (
            <div className="bg-green-800/40 border border-green-600 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-green-200 font-semibold">
                {isTr
                  ? "WhatsApp açıldı. Mesajınızı gönderin!"
                  : "WhatsApp opened. Send your message!"}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-gold-400 hover:underline text-sm"
              >
                {isTr ? "Yeni Mesaj" : "New Message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-green-200 mb-1.5">
                  {isTr ? "Ad Soyad *" : "Full Name *"}
                </label>
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl bg-green-900/60 border border-green-700 text-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  placeholder={isTr ? "Adınız Soyadınız" : "Your full name"}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-green-200 mb-1.5">
                  {isTr ? "E-posta *" : "Email *"}
                </label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl bg-green-900/60 border border-green-700 text-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-green-200 mb-1.5">
                  {isTr ? "Mesaj *" : "Message *"}
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-green-900/60 border border-green-700 text-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                  placeholder={isTr ? "Mesajınızı yazın..." : "Type your message..."}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-gold-400 text-green-900 font-bold rounded-xl hover:bg-gold-500 transition text-lg disabled:opacity-60"
              >
                {status === "loading"
                  ? (isTr ? "Gönderiliyor..." : "Sending...")
                  : (isTr ? "WhatsApp ile Gönder →" : "Send via WhatsApp →")}
              </button>
            </form>
          )}
        </div>

        {/* Sağ: Bilgi kutuları */}
        <div className="space-y-5">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-green-800/40 border border-green-700 rounded-2xl p-5 hover:border-gold-400 transition group"
          >
            <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center text-2xl shrink-0">
              💬
            </div>
            <div>
              <p className="text-white font-bold group-hover:text-gold-400 transition">WhatsApp</p>
              <p className="text-green-400 text-sm">
                {isTr ? "Hızlı yanıt için doğrudan yazın" : "Write directly for a fast response"}
              </p>
            </div>
          </a>

          {/* Kurumsal */}
          <div className="bg-gold-400/10 border border-gold-400/30 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🏟️</span>
              <h3 className="text-gold-400 font-bold">
                {isTr ? "Kurumsal & Grup" : "Corporate & Group"}
              </h3>
            </div>
            <p className="text-green-200 text-sm mb-4">
              {isTr
                ? "Kulüp, federasyon veya medya kuruluşu olarak grup indirimi ve özel paket için iletişime geçin."
                : "Contact us for group discounts and custom packages for clubs, federations and media organisations."}
            </p>
            <Link
              href={`/${lang}/basvuru`}
              className="inline-block bg-gold-400 text-green-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gold-500 transition"
            >
              {isTr ? "Kurumsal Başvur →" : "Corporate Apply →"}
            </Link>
          </div>

          {/* SSS */}
          <div className="bg-green-800/40 border border-green-700 rounded-2xl p-5">
            <h3 className="text-white font-bold mb-3">
              {isTr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
            </h3>
            <div className="space-y-3 text-sm text-green-300">
              <div>
                <p className="text-white font-semibold">
                  {isTr ? "Ödeme nasıl yapılıyor?" : "How does payment work?"}
                </p>
                <p>{isTr ? "Başvurun onaylandıktan sonra IBAN bilgimizi paylaşıyoruz." : "After your application is approved we share our bank details."}</p>
              </div>
              <div>
                <p className="text-white font-semibold">
                  {isTr ? "İade politikası nedir?" : "What is the refund policy?"}
                </p>
                <p>{isTr ? "30 gün içinde koşulsuz iade garantisi sunuyoruz." : "We offer an unconditional 30-day money-back guarantee."}</p>
              </div>
              <div>
                <p className="text-white font-semibold">
                  {isTr ? "Sertifika var mı?" : "Is there a certificate?"}
                </p>
                <p>{isTr ? "Evet, tüm kurslar tamamlanma sertifikası içeriyor." : "Yes, all courses include a completion certificate."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
