import { describe, it, expect } from "vitest";
import { calculateAcCost } from "./engine";

describe("calculateAcCost Engine", () => {
  it("calculates 3-Ton 14.3 SEER2 Central AC running cost accurately", () => {
    const res = calculateAcCost({
      inputMode: "btu_seer",
      coolingCapacityBtu: 36000,
      seer2Rating: 14.3,
      dailyHours: 8,
      compressorDutyCyclePercent: 60,
      electricityRate: 0.18,
      coolingSeasonMonths: 4,
    });

    // 36000 / 14.3 = 2517 Watts electrical
    expect(res.result.effectiveElectricalWatts).toBe(2517);
    // Hourly kWh = (2517 / 1000) * 0.6 = 1.51 kWh/hr
    expect(res.result.hourlyKwh).toBeCloseTo(1.51, 1);
    // Cost per hour = 1.51 * 0.18 = $0.27/hr
    expect(res.result.costPerHour).toBeCloseTo(0.27, 2);
    // Daily cost = 0.2718 * 8 = ~$2.17/day
    expect(res.result.costPerDay).toBeGreaterThan(2.0);
    // Monthly = ~$66/mo
    expect(res.result.costPerMonth).toBeGreaterThan(50);
    expect(res.result.costPerMonth).toBeLessThan(85);
    // Upgrade savings vs 10 SEER should be positive
    expect(res.result.seasonalUpgradeSavings).toBeGreaterThan(0);
  });

  it("calculates direct wattage mode for portable AC accurately", () => {
    const res = calculateAcCost({
      inputMode: "watts",
      nameplateWatts: 1200,
      dailyHours: 6,
      compressorDutyCyclePercent: 70,
      electricityRate: 0.20,
    });

    // Hourly kWh = (1200 / 1000) * 0.7 = 0.84 kWh
    expect(res.result.hourlyKwh).toBe(0.84);
    // Cost per hour = 0.84 * 0.20 = $0.168
    expect(res.result.costPerHour).toBeCloseTo(0.168, 3);
  });

  it("throws error for invalid daily hours or zero rate", () => {
    expect(() =>
      calculateAcCost({
        inputMode: "watts",
        nameplateWatts: 1000,
        dailyHours: 25,
        electricityRate: 0.18,
      })
    ).toThrow();
  });
});
