"use client";

import { useEffect, useState } from "react";

type Dekont = {
  id: string;
  user_id: string;
  user_email: string;
  course_slug: string;
  course_title: string;
  file_url: string;
  status: "pending" | "approved" | "rejected";
  admin_notes: string | null;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-400/20 text-yellow-300",
  approved: "bg-green-500/20 text-green-300",
  rejected: "bg-red-500/20 text-red-400",
};

const statusLabels: Record<string, string> = {
  pending: "Bekliyor",
  approved: "Onaylandı",
  rejected: "Reddedildi",
};

export default function DekontlarPage() {
  const [dekontlar, setDekontlar] = useState<Dekont[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Dekont | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/dekontlar")
      .then((r) => r.json())
      .then((data) => { setDekontlar(data); setLoading(false); });
  }, []);

  async function updateStatus(id: string, status: string) {
    setSaving(true);
    const dekont = dekontlar.find((d) => d.id === id);
    await fetch("/api/admin/dekontlar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id, status, admin_notes: notes,
        user_id: dekont?.user_id,
        course_slug: dekont?.course_slug,
      }),
    });
    setDekontlar((prev) =>
      prev.map((d) => d.id === id ? { ...d, status: status as Dekont["status"], admin_notes: notes } : d)
    );
    setSelected(null);
    setSaving(false);
  }

  const pendingCount = dekontlar.filter((d) => d.status === "pending").length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-black text-white">Dekontlar</h1>
        {pendingCount > 0 && (
          <span className="bg-yellow-400/20 text-yellow-300 text-xs font-bold px-2.5 py-1 rounded-full">
            {pendingCount} bekliyor
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-green-400">Yükleniyor...</p>
      ) : dekontlar.length === 0 ? (
        <p className="text-green-500">Henüz dekont yüklenmemiş.</p>
      ) : (
        <div className="space-y-3">
          {dekontlar.map((d) => (
            <div
              key={d.id}
              className="bg-green-900/40 border border-green-800 rounded-xl p-5 hover:border-green-600 transition cursor-pointer"
              onClick={() => { setSelected(d); setNotes(d.admin_notes ?? ""); }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-white font-semibold">{d.user_email}</p>
                  <p className="text-green-400 text-sm">{d.course_title}</p>
                  <p className="text-green-600 text-xs mt-1">
                    {new Date(d.created_at).toLocaleDateString("tr-TR", {
                      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusColors[d.status]}`}>
                  {statusLabels[d.status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detay Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={() => setSelected(null)}>
          <div className="bg-green-900 border border-green-700 rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-black text-white mb-1">{selected.user_email}</h2>
            <p className="text-green-400 text-sm mb-4">{selected.course_title}</p>

            {/* Dekont görüntüle */}
            <div className="mb-5">
              <a
                href={selected.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-800/60 border border-green-700 rounded-xl px-4 py-3 text-green-300 hover:text-gold-400 hover:border-gold-400 transition text-sm font-semibold"
              >
                🧾 Dekontu Görüntüle / İndir
              </a>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-green-400 mb-1.5">Admin Notu</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-green-950 border border-green-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                placeholder="Ret nedeni veya iç not..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => updateStatus(selected.id, "approved")}
                disabled={saving || selected.status === "approved"}
                className="flex-1 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition text-sm disabled:opacity-50"
              >
                ✅ Onayla — Erişim Aç
              </button>
              <button
                onClick={() => updateStatus(selected.id, "rejected")}
                disabled={saving}
                className="flex-1 py-2.5 bg-red-700/60 text-red-300 font-bold rounded-xl hover:bg-red-700 transition text-sm disabled:opacity-50"
              >
                ❌ Reddet
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2.5 text-green-400 hover:text-white transition text-sm"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
