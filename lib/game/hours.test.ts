import { describe, expect, it } from "vitest";
import { percentToHours, hoursToPercent, TOTAL_HOURS } from "./hours";

describe("hours helpers", () => {
  it("uses a 40-hour week as the base", () => {
    expect(TOTAL_HOURS).toBe(40);
  });

  it("converts percent to hours", () => {
    expect(percentToHours(25)).toBe(10);
    expect(percentToHours(15)).toBe(6);
    expect(percentToHours(100)).toBe(40);
    expect(percentToHours(0)).toBe(0);
  });

  it("converts hours back to percent", () => {
    expect(hoursToPercent(10)).toBe(25);
    expect(hoursToPercent(40)).toBe(100);
  });
});
