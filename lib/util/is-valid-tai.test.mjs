import { isValidTai } from "./is-valid-tai";

describe("isValidTai", () => {
  test("returns true for valid tai", () => {
    expect(isValidTai(1)).toBe(true);
    expect(isValidTai(5)).toBe(true);
  });

  test("returns false for invalid tai", () => {
    expect(isValidTai(0)).toBe(false);
    expect(isValidTai(6)).toBe(false);
  });
});
