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

  it("calculates scope comparisons and avoids duplicate custom reference rows", () => {
    const preset = calculateHomeBatterySize({ ...base, scopeFraction: 0.5 });
    expect(preset.scopeComparisons.filter((row) => row.isSelected)).toHaveLength(1);
    expect(preset.scopeComparisons.find((row) => row.scopeFraction === 0.5)?.label).toContain("Partial home");
    const custom = calculateHomeBatterySize({ ...base, scopeFraction: 0.35 });
    expect(custom.scopeComparisons.map((row) => row.scopeFraction)).toEqual([0.25, 0.5, 1, 0.35]);
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

  it("rejects invalid inputs", () => {
    expect(() => calculateHomeBatterySize({ ...base, dailyKWh: 0 })).toThrow();
    expect(() => calculateHomeBatterySize({ ...base, scopeFraction: 0 })).toThrow();
    expect(() => calculateHomeBatterySize({ ...base, backupHours: 0 })).toThrow();
    expect(() => calculateHomeBatterySize({ ...base, minimumSoc: 1 })).toThrow();
  });
});
