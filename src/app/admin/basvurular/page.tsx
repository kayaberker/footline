"use client";

import { useEffect, useState } from "react";

type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  club_name: string | null;
  role: string;
  message: string | null;
  status: "pending" | "accepted" | "rejected";
  admin_notes: string | null;
  created_at: string;
};

const roleLabels: Record<string, string> = {
  player: "⚽ Futbolcu",
  coach: "🧑‍💼 Antrenör",
  journalist: "🎙️ Yorumcu",
  fan: "📺 Taraftar",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-400/20 text-yellow-300",
  accepted: "bg-green-500/20 text-green-300",
  rejected: "bg-red-500/20 text-red-400",
};

const statusLabels: Record<string, string> = {
  pending: "Bekliyor",
  accepted: "Kabul Edildi",
  rejected: "Reddedildi",
};

export default function BasvurularPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [selected, setSelected] = useState<Application | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/basvurular")
      .then((r) => r.json())
      .then((data) => { setApplications(data); setLoading(false); });
  }, []);

  const filtered = filter === "all" ? applications : applications.filter((a) => a.status === filter);

  async function updateStatus(id: string, status: string) {
    setSaving(true);
    await fetch("/api/admin/basvurular", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, admin_notes: notes }),
    });
    setApplications((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: status as Application["status"], admin_notes: notes } : a)
    );
    setSelected(null);
    setSaving(false);
  }

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-white">Başvurular</h1>
        <div className="flex gap-2">
          {(["all", "pending", "accepted", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === f ? "bg-gold-400 text-green-900" : "bg-green-800/60 text-green-300 hover:text-white"
              }`}
            >
              {f === "all" ? "Tümü" : statusLabels[f]} ({counts[f]})
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-green-400">Yükleniyor...</p>
      ) : filtered.length === 0 ? (
        <p className="text-green-500">Başvuru bulunamadı.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="bg-green-900/40 border border-green-800 rounded-xl p-5 hover:border-green-600 transition cursor-pointer"
              onClick={() => { setSelected(app); setNotes(app.admin_notes ?? ""); }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white font-bold">{app.name}</span>
                    <span className="text-green-500 text-xs">{roleLabels[app.role]}</span>
                    {app.club_name && (
                      <span className="text-green-400 text-xs bg-green-800/60 px-2 py-0.5 rounded-full">
                        {app.club_name}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-green-400">
                    <span>{app.email}</span>
                    <span>{app.phone}</span>
                  </div>
                  {app.message && (
                    <p className="text-green-300 text-sm mt-2 line-clamp-2">{app.message}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[app.status]}`}>
                    {statusLabels[app.status]}
                  </span>
                  <span className="text-green-600 text-xs">
                    {new Date(app.created_at).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detay Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={() => setSelected(null)}>
          <div className="bg-green-900 border border-green-700 rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-black text-white mb-4">{selected.name}</h2>
            <div className="space-y-2 text-sm text-green-300 mb-5">
              <p>📧 {selected.email}</p>
              <p>📱 {selected.phone}</p>
              {selected.club_name && <p>🏟️ {selected.club_name}</p>}
              <p>{roleLabels[selected.role]}</p>
              {selected.message && <p className="text-green-200 mt-3 p-3 bg-green-950/50 rounded-lg">{selected.message}</p>}
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-green-400 mb-1.5">Admin Notu</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-green-950 border border-green-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                placeholder="İç not (kullanıcı göremez)"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => updateStatus(selected.id, "accepted")}
                disabled={saving}
                className="flex-1 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition text-sm disabled:opacity-50"
              >
                ✅ Kabul Et
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
