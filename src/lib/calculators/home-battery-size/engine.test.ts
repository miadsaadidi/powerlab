import { describe, expect, it } from "vitest";
import { calculateHomeBatterySize, normalizeHomeEnergy, type HomeEnergyUnit } from "./engine";

const base = {
  dailyKWh: 300 / (365.25 / 12),
  scopeFraction: 0.5,
  backupHours: 12,
  minimumSoc: 0.2,
  inverterEfficiency: 0.9,
  batteryHealth: 1,
  designMargin: 0.1,
};

describe("home battery size engine", () => {
  it("calculates the documented default fixture", () => {
    const result = calculateHomeBatterySize(base);
    expect(result.selectedScopeDailyLoadKWh).toBeCloseTo(4.9281314);
    expect(result.backupLoadEnergyKWh).toBeCloseTo(2.4640657);
    expect(result.minimumNominalKWh).toBeCloseTo(3.4223135);
    expect(result.recommendedKWh).toBeCloseTo(3.764545);
    expect(result.usableSocWindow).toBe(0.8);
  });

  it("supports custom scope and custom multi-day duration", () => {
    const result = calculateHomeBatterySize({ ...base, scopeFraction: 0.35, backupHours: 36 });
    expect(result.selectedScopeDailyLoadKWh).toBeCloseTo(3.449646);
    expect(result.backupLoadEnergyKWh).toBeCloseTo(5.174469);
    expect(calculateHomeBatterySize({ ...base, backupHours: 48 }).backupLoadEnergyKWh).toBeCloseTo(base.dailyKWh * 0.5 * 2);
  });

  it("calculates scope comparisons with 30%, 50%, and 100% presets", () => {
    const preset = calculateHomeBatterySize({ ...base, scopeFraction: 0.5 });
    expect(preset.scopeComparisons.filter((row) => row.isSelected)).toHaveLength(1);
    expect(preset.scopeComparisons.find((row) => row.scopeFraction === 0.5)?.label).toContain("Partial home");
    const custom = calculateHomeBatterySize({ ...base, scopeFraction: 0.35 });
    expect(custom.scopeComparisons.map((row) => row.scopeFraction)).toEqual([0.3, 0.5, 1, 0.35]);
    expect(custom.scopeComparisons.find((row) => row.scopeFraction === 0.35)?.label).toContain("Your selection");
  });

  it("converts monthly and daily energy without changing normalized daily energy", () => {
    const monthly = normalizeHomeEnergy(300, "month");
    const daily = normalizeHomeEnergy(monthly.value, monthly.unit === "month" ? "month" : "day");
    expect(normalizeHomeEnergy(300, "month").dailyKWh).toBeCloseTo(9.8562628);
    expect(normalizeHomeEnergy(10, "day").monthlyKWh).toBe(304.375);
    expect(monthly.dailyKWh).toBeCloseTo(normalizeHomeEnergy(normalizeHomeEnergy(300, "month").dailyKWh, "day").dailyKWh);
    expect(daily.dailyKWh).toBeCloseTo(monthly.dailyKWh);
  });

  it("round-trips monthly to daily to monthly using full precision", () => {
    const monthly = normalizeHomeEnergy(300, "month");
    const dailyValue = monthly.dailyKWh;
    const roundTrip = normalizeHomeEnergy(dailyValue, "day").monthlyKWh;
    expect(roundTrip).toBeCloseTo(300, 10);
  });

  it("verifies all reference matrix benchmark values with canonical formula", () => {
    const matrixRows = [
      { dailyKWh: 15, critical12h: 3.44, partial24h: 11.46, whole24h: 22.92 },
      { dailyKWh: 30, critical12h: 6.88, partial24h: 22.92, whole24h: 45.83 },
      { dailyKWh: 45, critical12h: 10.31, partial24h: 34.38, whole24h: 68.75 },
      { dailyKWh: 60, critical12h: 13.75, partial24h: 45.83, whole24h: 91.67 },
    ];

    for (const row of matrixRows) {
      // Critical 30%, 12h
      const crit = calculateHomeBatterySize({
        dailyKWh: row.dailyKWh,
        scopeFraction: 0.3,
        backupHours: 12,
        minimumSoc: 0.2,
        inverterEfficiency: 0.9,
        batteryHealth: 1.0,
        designMargin: 0.1,
      });
      expect(Number(crit.recommendedKWh.toFixed(2))).toBeCloseTo(row.critical12h, 1);

      // Partial 50%, 24h
      const part = calculateHomeBatterySize({
        dailyKWh: row.dailyKWh,
        scopeFraction: 0.5,
        backupHours: 24,
        minimumSoc: 0.2,
        inverterEfficiency: 0.9,
        batteryHealth: 1.0,
        designMargin: 0.1,
      });
      expect(Number(part.recommendedKWh.toFixed(2))).toBeCloseTo(row.partial24h, 1);

      // Whole Home 100%, 24h
      const whole = calculateHomeBatterySize({
        dailyKWh: row.dailyKWh,
        scopeFraction: 1.0,
        backupHours: 24,
        minimumSoc: 0.2,
        inverterEfficiency: 0.9,
        batteryHealth: 1.0,
        designMargin: 0.1,
      });
      expect(Number(whole.recommendedKWh.toFixed(2))).toBeCloseTo(row.whole24h, 1);
    }
  });

  it("rejects invalid inputs", () => {
    expect(() => calculateHomeBatterySize({ ...base, dailyKWh: 0 })).toThrow();
    expect(() => calculateHomeBatterySize({ ...base, scopeFraction: 0 })).toThrow();
    expect(() => calculateHomeBatterySize({ ...base, backupHours: 0 })).toThrow();
    expect(() => calculateHomeBatterySize({ ...base, minimumSoc: 1 })).toThrow();
    expect(() => calculateHomeBatterySize({ ...base, inverterEfficiency: 0 })).toThrow();
    expect(() => calculateHomeBatterySize({ ...base, batteryHealth: 0 })).toThrow();
    expect(() => calculateHomeBatterySize({ ...base, designMargin: -0.1 })).toThrow();
  });
});
