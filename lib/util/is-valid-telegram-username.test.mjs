import { isValidTelegramUsername } from "./is-valid-telegram-username.mjs";

describe("isValidTelegramUsername", () => {
  test("returns true for valid telegram username", () => {
    expect(isValidTelegramUsername("@telegram_handle")).toBe(true);
  });

  test("returns false for invalid telegram username", () => {
    expect(isValidTelegramUsername("@telegram handle with spaces")).toBe(false);
    expect(isValidTelegramUsername("telegram_handle_without_at")).toBe(false);
  });
});
