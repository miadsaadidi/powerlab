import { describe, expect, it } from "vitest";
import { buildSolarBatteryHandoffUrl } from "./handoff";

describe("solar load handoffs", () => {
  it("does not create a handoff for an unpublished destination", () => {
    expect(buildSolarBatteryHandoffUrl(2.148, false)).toBeNull();
  });

  it("does not create a zero-load battery handoff", () => {
    expect(buildSolarBatteryHandoffUrl(0, true)).toBeNull();
  });

  it("passes the exact positive daily load with its source", () => {
    expect(buildSolarBatteryHandoffUrl(2.1480000000000006, true)).toBe(
      "/solar/solar-battery-bank-size-calculator?dailyLoadKWh=2.1480000000000006&source=solar-load",
    );
  });
});
