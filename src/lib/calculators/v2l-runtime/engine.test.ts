import { describe, it, expect } from "vitest";
import { calculateV2lRuntime } from "./engine";

describe("calculateV2lRuntime Engine", () => {
  it("calculates multi-day outage runtime for Ioniq 5 (77.4 kWh) on 350W essential load", () => {
    const res = calculateV2lRuntime({
      batteryCapacityKwh: 77.4,
      startingSocPercent: 90,
      drivingReservePercent: 20,
      averageLoadWatts: 350,
      v2lMaxOutputWatts: 3600,
      inverterEfficiencyPercent: 92,
    });

    // Starting = 77.4 * 0.9 = 69.66 kWh
    // Reserve = 77.4 * 0.2 = 15.48 kWh
    // Available = 69.66 - 15.48 = 54.18 kWh
    // Delivered AC = 54.18 * 0.92 = 49.85 kWh
    // Runtime hours = (49.85 * 1000) / 350 = 142.4 hours (~5.9 days)
    expect(res.result.totalRuntimeHours).toBeGreaterThan(130);
    expect(res.result.totalRuntimeDays).toBeGreaterThan(5.5);
    // Preserved driving miles = 15.48 * 3.3 = ~51 miles
    expect(res.result.preservedDrivingRangeMiles).toBeGreaterThan(45);
    expect(res.result.isOverloaded).toBe(false);
  });

  it("warns about V2L socket overload when load exceeds port limits", () => {
    const res = calculateV2lRuntime({
      batteryCapacityKwh: 77.4,
      startingSocPercent: 90,
      averageLoadWatts: 4200,
      v2lMaxOutputWatts: 3600,
    });

    expect(res.result.isOverloaded).toBe(true);
    expect(res.warnings.some((w) => w.code === "V2L_SOCKET_OVERLOAD")).toBe(true);
  });

  it("throws error on zero capacity or zero load", () => {
    expect(() =>
      calculateV2lRuntime({
        batteryCapacityKwh: 0,
        startingSocPercent: 90,
        averageLoadWatts: 350,
      })
    ).toThrow();
  });
});
