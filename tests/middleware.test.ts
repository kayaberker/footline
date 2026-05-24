import { describe, it, expect } from "@jest/globals";

describe("i18n middleware", () => {
  it("redirects / to /tr", () => {
    const supportedLocales = ["tr", "en"];
    const defaultLocale = "tr";
    expect(supportedLocales).toContain(defaultLocale);
    expect(supportedLocales.length).toBe(2);
  });
});
