import { describe, expect, it } from "vitest";
import { percentToHours, hoursToPercent, TOTAL_HOURS } from "./hours";

describe("hours helpers", () => {
  it("uses a 168-hour week as the base", () => {
    expect(TOTAL_HOURS).toBe(168);
  });

  it("converts percent to hours", () => {
    expect(percentToHours(25)).toBe(42);
    expect(percentToHours(15)).toBe(25);
    expect(percentToHours(100)).toBe(168);
    expect(percentToHours(0)).toBe(0);
  });

  it("converts hours back to percent", () => {
    expect(hoursToPercent(42)).toBe(25);
    expect(hoursToPercent(168)).toBe(100);
  });
});
