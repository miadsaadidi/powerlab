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
      inverterEfficiencyPercent: 92,
      safetyHeadroomFraction: 0.20,
    });

    // Total running = 150 + 1000 + 90 = 1240W
    expect(res.result.totalRunningWatts).toBe(1240);
    // Fridge surge delta = 1200 - 150 = 1050W
    expect(res.result.maxMotorSurgeDelta).toBe(1050);
    // Target continuous = 1240 * 1.2 = 1488W -> 1500W or 2000W inverter
    expect(res.result.recommendedInverterWatts).toBeGreaterThanOrEqual(1500);
    // DC current at 12V 1500W with 92% eff = 1500 / (12 * 0.92) = 135.9A
    expect(res.result.maxContinuousDcAmps).toBe(135.9);
    expect(res.result.recommendedDcFuseAmps).toBeGreaterThan(150);
    expect(res.result.recommendedBatteryCableGauge).toBeDefined();
  });

  it("matches the exact benchmark matrix DC amperage at 92% efficiency", () => {
    // Helper to calculate single inverter rating current
    const getAmps = (watts: number, volts: 12 | 24 | 48) => {
      const res = calculateInverterSize({
        appliances: [{ id: "test", label: "Load", runningWatts: Math.round(watts / 1.2), surgeWatts: Math.round(watts / 1.2), quantity: 1 }],
        batteryVoltage: volts,
        inverterEfficiencyPercent: 92,
        safetyHeadroomFraction: 0.20,
      });
      return res.result.maxContinuousDcAmps;
    };

    // 500W
    expect(getAmps(500, 12)).toBe(45.3);
    expect(getAmps(500, 24)).toBe(22.6);
    expect(getAmps(500, 48)).toBe(11.3);

    // 1000W
    expect(getAmps(1000, 12)).toBe(90.6);
    expect(getAmps(1000, 24)).toBe(45.3);
    expect(getAmps(1000, 48)).toBe(22.6);

    // 2000W
    expect(getAmps(2000, 12)).toBe(181.2);
    expect(getAmps(2000, 24)).toBe(90.6);
    expect(getAmps(2000, 48)).toBe(45.3);

    // 3000W
    expect(getAmps(3000, 12)).toBe(271.7);
    expect(getAmps(3000, 24)).toBe(135.9);
    expect(getAmps(3000, 48)).toBe(67.9);

    // 5000W
    expect(getAmps(5000, 24)).toBe(226.4);
    expect(getAmps(5000, 48)).toBe(113.2);
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

