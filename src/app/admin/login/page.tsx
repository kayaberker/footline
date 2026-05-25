"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/basvurular");
    } else {
      setError("Şifre hatalı.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-green-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gold-400 rounded-xl flex items-center justify-center font-black text-green-900 text-lg mx-auto mb-3">
            FL
          </div>
          <h1 className="text-2xl font-black text-white">Admin Paneli</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-green-900/50 border border-green-700 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-green-200 mb-1.5">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-green-950 border border-green-700 text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-400 text-green-900 font-bold rounded-xl hover:bg-gold-500 transition disabled:opacity-60"
          >
            {loading ? "..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
