import { describe, it, expect } from "vitest";
import { calculateGeneratorSize } from "./engine";

describe("calculateGeneratorSize Engine", () => {
  it("calculates sequential motor startup correctly for storm essentials", () => {
    const res = calculateGeneratorSize({
      appliances: [
        { id: "refrigerator", label: "Refrigerator", runningWatts: 150, startingWatts: 1200, quantity: 1 },
        { id: "wifi", label: "Wi-Fi", runningWatts: 25, startingWatts: 25, quantity: 1 },
        { id: "lights", label: "LED Lights", runningWatts: 100, startingWatts: 100, quantity: 1 },
      ],
      safetyMarginFraction: 0.20,
    });

    // Total running = 150 + 25 + 100 = 275W
    expect(res.result.totalRunningWatts).toBe(275);
    // Fridge surge delta = 1200 - 150 = 1050W
    expect(res.result.maxInductiveSurgeDelta).toBe(1050);
    // Peak starting watts = 275 + 1050 = 1325W
    expect(res.result.totalStartingSurgeWatts).toBe(1325);
    // Continuous with 20% margin = 275 * 1.2 = 330W
    expect(res.result.targetContinuousWatts).toBe(330);
    expect(res.result.recommendedPortableClass).toContain("2,000W");
  });

  it("handles heavy inductive motor loads (Well pump + Sump pump + AC)", () => {
    const res = calculateGeneratorSize({
      appliances: [
        { id: "sump", label: "Sump Pump", runningWatts: 800, startingWatts: 2400, quantity: 1 },
        { id: "well", label: "Well Pump", runningWatts: 1800, startingWatts: 5000, quantity: 1 },
        { id: "fridge", label: "Fridge", runningWatts: 150, startingWatts: 1200, quantity: 1 },
      ],
      safetyMarginFraction: 0.20,
    });

    // Total running = 800 + 1800 + 150 = 2750W
    expect(res.result.totalRunningWatts).toBe(2750);
    // Max surge delta is well pump: 5000 - 1800 = 3200W (vs sump pump 2400 - 800 = 1600W)
    expect(res.result.maxInductiveSurgeDelta).toBe(3200);
    // Total starting = 2750 + 3200 = 5950W
    expect(res.result.totalStartingSurgeWatts).toBe(5950);
    // Target with margin = 2750 * 1.2 = 3300W
    expect(res.result.targetContinuousWatts).toBe(3300);
    expect(res.result.recommendedNemaOutlet).toContain("NEMA");
  });

  it("throws error on empty appliance list", () => {
    expect(() =>
      calculateGeneratorSize({
        appliances: [],
      })
    ).toThrow();
  });
});
