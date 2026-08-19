import { describe, expect, it } from "vitest";
import { buildSolarBatteryHandoffUrl } from "./handoff";

describe("home battery solar handoff", () => {
  it("passes selected-scope daily load only", () => {
    expect(buildSolarBatteryHandoffUrl(5, true)).toBe("/solar/solar-battery-bank-size-calculator?dailyLoadKWh=5&source=home-battery-size");
  });

  it("does not hand off when the destination is unpublished or load is invalid", () => {
    expect(buildSolarBatteryHandoffUrl(5, false)).toBeNull();
    expect(buildSolarBatteryHandoffUrl(0, true)).toBeNull();
  });
});
