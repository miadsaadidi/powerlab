import { describe, it, expect } from "vitest";
import { calculateAcCost } from "./engine";

describe("calculateAcCost Engine", () => {
  it("A. Regional-rate propagation: changing rate from $0.1834 to $0.315 updates all dependent cost outputs", () => {
    const baseParams = {
      inputMode: "watts" as const,
      nameplateWatts: 2400,
      dailyHours: 8,
      compressorDutyCyclePercent: 60,
      coolingSeasonMonths: 4,
    };

    const benchmarkRes = calculateAcCost({
      ...baseParams,
      electricityRate: 0.1834,
    });

    const regionalRes = calculateAcCost({
      ...baseParams,
      electricityRate: 0.315,
    });

    // Verify rate propagation
    expect(benchmarkRes.result.costPerActiveHour).toBeCloseTo(2.4 * 0.1834, 4);
    expect(regionalRes.result.costPerActiveHour).toBeCloseTo(2.4 * 0.315, 4);

    expect(benchmarkRes.result.costPerHour).toBeCloseTo(2.4 * 0.6 * 0.1834, 4);
    expect(regionalRes.result.costPerHour).toBeCloseTo(2.4 * 0.6 * 0.315, 4);

    expect(benchmarkRes.result.costPerDay).toBeCloseTo(2.4 * 0.6 * 8 * 0.1834, 4);
    expect(regionalRes.result.costPerDay).toBeCloseTo(2.4 * 0.6 * 8 * 0.315, 4);

    expect(benchmarkRes.result.costPerMonth).toBeCloseTo(2.4 * 0.6 * 8 * (365.25 / 12) * 0.1834, 2);
    expect(regionalRes.result.costPerMonth).toBeCloseTo(2.4 * 0.6 * 8 * (365.25 / 12) * 0.315, 2);

    expect(regionalRes.result.costPerMonth).toBeGreaterThan(benchmarkRes.result.costPerMonth);
  });

  it("B. 3-ton canonical benchmark: 36,000 BTU @ 15.0 SEER2, 60% duty, 8 hrs/day @ $0.1834/kWh", () => {
    const res = calculateAcCost({
      inputMode: "btu_seer",
      ratingType: "SEER2",
      coolingCapacityBtu: 36000,
      seer2Rating: 15.0,
      dailyHours: 8,
      compressorDutyCyclePercent: 60,
      electricityRate: 0.1834,
      coolingSeasonMonths: 4,
    });

    // 36000 / 15.0 = 2400 W (2.40 kW)
    expect(res.result.effectiveElectricalWatts).toBe(2400);
    expect(res.result.activeHourKwh).toBe(2.4);

    // Active hour cost = 2.4 * 0.1834 = $0.4402
    expect(res.result.costPerActiveHour).toBeCloseTo(0.4402, 4);

    // Clock hour kWh = 2.4 * 0.60 = 1.44 kWh
    expect(res.result.clockHourKwh).toBe(1.44);

    // Clock hour cost = 1.44 * 0.1834 = $0.2641
    expect(res.result.costPerHour).toBeCloseTo(0.2641, 4);

    // Daily cost = 1.44 * 8 * 0.1834 = $2.1128
    expect(res.result.costPerDay).toBeCloseTo(2.1128, 4);

    // Monthly cost = 1.44 * 8 * (365.25 / 12) * 0.1834 = $64.306 ≈ $64.31
    expect(res.result.costPerMonth).toBeCloseTo(64.31, 2);

    // Seasonal upgrade savings vs 10 SEER
    expect(res.result.seasonalUpgradeSavings).toBeGreaterThan(0);
  });

  it("C. Duty cycle: Clock-hour energy = Input_kW * Duty_Cycle", () => {
    const res = calculateAcCost({
      inputMode: "watts",
      nameplateWatts: 3000,
      dailyHours: 10,
      compressorDutyCyclePercent: 50,
      electricityRate: 0.20,
    });

    expect(res.result.activeHourKwh).toBe(3.0);
    expect(res.result.clockHourKwh).toBe(1.5);
  });

  it("D. Full active hour: Active-hour cost = Input_kW * Rate", () => {
    const res = calculateAcCost({
      inputMode: "watts",
      nameplateWatts: 1500,
      dailyHours: 5,
      compressorDutyCyclePercent: 75,
      electricityRate: 0.25,
    });

    expect(res.result.costPerActiveHour).toBeCloseTo(1.5 * 0.25, 4);
  });

  it("E. Seasonal calculation: uses explicitly selected season duration", () => {
    const res3Mos = calculateAcCost({
      inputMode: "watts",
      nameplateWatts: 2000,
      dailyHours: 8,
      compressorDutyCyclePercent: 60,
      electricityRate: 0.18,
      coolingSeasonMonths: 3,
    });

    const res6Mos = calculateAcCost({
      inputMode: "watts",
      nameplateWatts: 2000,
      dailyHours: 8,
      compressorDutyCyclePercent: 60,
      electricityRate: 0.18,
      coolingSeasonMonths: 6,
    });

    expect(res6Mos.result.costPerSeason).toBeCloseTo(res3Mos.result.costPerSeason * 2, 2);
  });

  it("F. Rating-method separation: verifies SEER2, CEER, SACC and watts modes", () => {
    const windowRes = calculateAcCost({
      inputMode: "btu_seer",
      ratingType: "CEER",
      coolingCapacityBtu: 5000,
      seer2Rating: 11.0,
      dailyHours: 8,
      compressorDutyCyclePercent: 60,
      electricityRate: 0.1834,
    });
    expect(windowRes.result.effectiveElectricalWatts).toBe(455);

    const portableRes = calculateAcCost({
      inputMode: "btu_seer",
      ratingType: "SACC",
      coolingCapacityBtu: 8000,
      seer2Rating: 9.5,
      dailyHours: 8,
      compressorDutyCyclePercent: 60,
      electricityRate: 0.1834,
    });
    expect(portableRes.result.effectiveElectricalWatts).toBe(842);

    const directRes = calculateAcCost({
      inputMode: "watts",
      nameplateWatts: 545,
      dailyHours: 8,
      compressorDutyCyclePercent: 60,
      electricityRate: 0.1834,
    });
    expect(directRes.result.effectiveElectricalWatts).toBe(545);
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

    expect(() =>
      calculateAcCost({
        inputMode: "watts",
        nameplateWatts: 1000,
        dailyHours: 8,
        electricityRate: 0,
      })
    ).toThrow();
  });
});

