"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/i18n";

const DEMO_USER = { email: "ogrenci@footlingo.com", password: "Futbol2024" };

type Props = {
  mode: "login" | "register";
  dict: Dictionary;
  lang: string;
};

export default function AuthForm({ mode, dict, lang }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Demo mod — Supabase bağlantısı olmadan test
    if (
      mode === "login" &&
      email === DEMO_USER.email &&
      password === DEMO_USER.password
    ) {
      localStorage.setItem("fl_demo_user", JSON.stringify({ email: DEMO_USER.email }));
      // Demo'da 3 kursu satın alınmış göster
      localStorage.setItem("fl_purchases", JSON.stringify(["1", "2", "3"]));
      router.push(`/${lang}/dashboard`);
      return;
    }

    const supabase = createClient();

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push(`/${lang}/dashboard`);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push(`/${lang}/dashboard`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div>
        <label className="block text-sm font-medium text-green-100 mb-1">
          {dict.auth.email}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg bg-green-900 border border-green-700 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-green-100 mb-1">
          {dict.auth.password}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-2 rounded-lg bg-green-900 border border-green-700 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gold-400 text-green-900 font-bold rounded-lg hover:bg-gold-500 transition disabled:opacity-50"
      >
        {loading ? "..." : mode === "login" ? dict.auth.login : dict.auth.register}
      </button>
    </form>
  );
}
