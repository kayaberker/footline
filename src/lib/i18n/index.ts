export type Locale = "tr" | "en";

export const i18n = {
  defaultLocale: "tr" as Locale,
  locales: ["tr", "en"] as Locale[],
};

const dictionaries = {
  tr: () => import("./tr.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.tr>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
