import { describe, it, expect } from "vitest";
import { calculateSpaceHeaterCost } from "./engine";

describe("calculateSpaceHeaterCost Engine", () => {
  it("calculates 1500W bedroom heater overnight running cost accurately", () => {
    const res = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 70,
      electricityRate: 0.18,
      winterMonths: 3,
    });

    // Effective hourly kWh = (1.5 kW) * 0.7 = 1.05 kWh/hr
    expect(res.result.effectiveHourlyKwh).toBe(1.05);
    // Cost per hour = 1.05 * 0.18 = $0.189/hr
    expect(res.result.costPerHour).toBeCloseTo(0.189, 3);
    // Overnight 8h cost = 0.189 * 8 = ~$1.51/night
    expect(res.result.costPerNight8h).toBeCloseTo(1.51, 1);
    // Monthly = ~$46/mo
    expect(res.result.costPerMonth).toBeGreaterThan(40);
    expect(res.result.costPerMonth).toBeLessThan(55);
    // Thermostat savings should be positive
    expect(res.result.thermostatSavingsPerMonth).toBeGreaterThan(15);
  });

  it("calculates 500W personal under-desk heater correctly", () => {
    const res = calculateSpaceHeaterCost({
      heaterWatts: 500,
      dailyHours: 8,
      dutyCyclePercent: 100, // continuous
      electricityRate: 0.18,
    });

    // 0.5 kW * 0.18 = $0.09/hr
    expect(res.result.costPerHour).toBe(0.09);
    // 8h day = $0.72/day
    expect(res.result.costPerDay).toBe(0.72);
  });

  it("throws error for negative watts or zero electricity rate", () => {
    expect(() =>
      calculateSpaceHeaterCost({
        heaterWatts: 0,
        dailyHours: 8,
        electricityRate: 0.18,
      })
    ).toThrow();
  });
});
