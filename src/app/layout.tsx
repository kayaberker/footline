import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://footlingo.com.tr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FootLingo — Futbolun Dili İngilizce",
    template: "%s | FootLingo",
  },
  description: "Futbol bağlamında İngilizce öğren. Futbolcular, antrenörler ve taraftarlar için tasarlanmış profesyonel kurslar.",
  keywords: ["futbol ingilizcesi", "football english", "futbolcu ingilizcesi", "antrenör ingilizcesi", "UEFA lisans", "spor ingilizcesi"],
  authors: [{ name: "FootLingo" }],
  openGraph: {
    type: "website",
    siteName: "FootLingo",
    title: "FootLingo — Futbolun Dili İngilizce",
    description: "Futbol bağlamında İngilizce öğren. Futbolcular, antrenörler ve taraftarlar için.",
    url: siteUrl,
    locale: "tr_TR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FootLingo — Futbolun Dili İngilizce",
    description: "Futbol bağlamında İngilizce öğren.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
