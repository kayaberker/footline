"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/basvurular", label: "📋 Başvurular" },
  { href: "/admin/dekontlar", label: "🧾 Dekontlar" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-56 bg-green-900/60 border-r border-green-800 flex flex-col min-h-screen">
      <div className="p-6 border-b border-green-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold-400 rounded-lg flex items-center justify-center font-black text-green-900 text-sm">
            FL
          </div>
          <span className="font-bold text-white text-sm">Admin</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
              pathname === item.href
                ? "bg-gold-400/20 text-gold-400"
                : "text-green-300 hover:bg-green-800/60 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-green-800">
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 text-sm text-green-400 hover:text-red-400 transition"
        >
          🚪 Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
