describe("auth validation", () => {
  it("rejects empty email", () => {
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("test@example.com")).toBe(true);
  });

  it("rejects short password", () => {
    const isValidPassword = (password: string) => password.length >= 6;
    expect(isValidPassword("12345")).toBe(false);
    expect(isValidPassword("123456")).toBe(true);
  });
});
