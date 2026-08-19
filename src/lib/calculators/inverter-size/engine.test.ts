import { describe, it, expect } from "vitest";
import { calculateInverterSize } from "./engine";

describe("calculateInverterSize Engine", () => {
  it("sizes inverter for camper van with fridge and microwave on 12V correctly", () => {
    const res = calculateInverterSize({
      appliances: [
        { id: "fridge", label: "Fridge", runningWatts: 150, surgeWatts: 1200, quantity: 1 },
        { id: "microwave", label: "Microwave", runningWatts: 1000, surgeWatts: 1000, quantity: 1 },
        { id: "laptop", label: "Laptop", runningWatts: 90, surgeWatts: 90, quantity: 1 },
      ],
      batteryVoltage: 12,
      inverterEfficiencyPercent: 90,
      safetyHeadroomFraction: 0.20,
    });

    // Total running = 150 + 1000 + 90 = 1240W
    expect(res.result.totalRunningWatts).toBe(1240);
    // Fridge surge delta = 1200 - 150 = 1050W
    expect(res.result.maxMotorSurgeDelta).toBe(1050);
    // Target continuous = 1240 * 1.2 = 1488W -> 1500W or 2000W inverter
    expect(res.result.recommendedInverterWatts).toBeGreaterThanOrEqual(1500);
    // DC current at 12V 1500W = 1500 / (12 * 0.9) = 138.8A
    expect(res.result.maxContinuousDcAmps).toBeGreaterThan(100);
    expect(res.result.recommendedDcFuseAmps).toBeGreaterThan(150);
    expect(res.result.recommendedBatteryCableGauge).toBeDefined();
  });

  it("warns about extreme 12V DC current on large inverters", () => {
    const res = calculateInverterSize({
      appliances: [
        { id: "heater", label: "Space Heater", runningWatts: 2500, surgeWatts: 2500, quantity: 1 },
      ],
      batteryVoltage: 12,
    });

    expect(res.warnings.some((w) => w.code === "HIGH_DC_CURRENT_12V")).toBe(true);
  });

  it("throws error for empty appliance list", () => {
    expect(() =>
      calculateInverterSize({
        appliances: [],
        batteryVoltage: 12,
      })
    ).toThrow();
  });
});
