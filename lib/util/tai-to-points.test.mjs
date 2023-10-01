import { taiToPointsShooter, taiToPointsZimo } from "./tai-to-points.mjs";

describe("taiToPointsShooter", () => {
  test("returns correct points for tai", () => {
    expect(taiToPointsShooter(1)).toBe(4);
    expect(taiToPointsShooter(5)).toBe(40);
  });
});

describe("taiToPointsZimo", () => {
  test("returns correct points for tai", () => {
    expect(taiToPointsZimo(1)).toBe(2);
    expect(taiToPointsZimo(5)).toBe(20);
  });
});
