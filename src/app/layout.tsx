import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FootLingo — Futbolun Dili İngilizce",
  description: "Futbol bağlamında İngilizce öğren. Futbolcular, antrenörler ve taraftarlar için.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
