"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  courseId: string;
  lang: string;
  slug: string;
  label: string;
};

function getPurchases(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("fl_purchases") ?? "[]");
  } catch {
    return [];
  }
}

export default function PurchaseButton({ courseId, lang, slug, label }: Props) {
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setPurchased(getPurchases().includes(courseId));
  }, [courseId]);

  function handlePurchase() {
    setLoading(true);
    // Stripe entegrasyonu gelene kadar localStorage simülasyonu
    setTimeout(() => {
      const current = getPurchases();
      if (!current.includes(courseId)) {
        localStorage.setItem("fl_purchases", JSON.stringify([...current, courseId]));
      }
      router.push(`/${lang}/courses/${slug}/success`);
    }, 800);
  }

  if (purchased) {
    return (
      <div className="w-full py-4 bg-green-700 border border-green-600 text-white font-bold rounded-xl text-center">
        ✅ {lang === "tr" ? "Satın Alındı — Panelden İzle" : "Purchased — Watch in Dashboard"}
      </div>
    );
  }

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className="w-full py-4 bg-gold-400 text-green-900 font-bold rounded-xl hover:bg-gold-500 transition text-lg disabled:opacity-60"
    >
      {loading ? "..." : label}
    </button>
  );
}
