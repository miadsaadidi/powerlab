import { describe, expect, it } from "vitest";
import { calculateSolarPanelSize, normalizeEnergyTargetToAnnual } from "./engine";

const fixture = {
  annualTargetKWh: 3_600,
  specificYieldKWhPerKwYear: 1_500,
  normalizedMonthlyKWhPerKw: [100, 110, 120, 130, 140, 150, 160, 150, 140, 130, 110, 60],
  panelWatts: 400,
  designMargin: 0.1,
};

describe("solar panel size engine", () => {
  it("keeps base, recommended and installed array sizes separate", () => {
    const result = calculateSolarPanelSize(fixture);
    expect(result.baseRequiredKw).toBeCloseTo(2.4);
    expect(result.recommendedKw).toBeCloseTo(2.64);
    expect(result.panelCount).toBe(7);
    expect(result.installedKw).toBeCloseTo(2.8);
    expect(result.modeledAnnualKWh).toBeCloseTo(4_200);
    expect(result.annualEnergyCoveragePercent).toBeCloseTo(116.6666667);
  });

  it("scales authoritative monthly normalized yield without rebuilding annual output", () => {
    const result = calculateSolarPanelSize(fixture);
    expect(result.modeledMonthlyKWh).toEqual(fixture.normalizedMonthlyKWhPerKw.map((value) => value * 2.8));
    expect(result.modeledAnnualKWh).toBe(4_200);
  });

  it("supports a zero normalized month", () => {
    expect(calculateSolarPanelSize({ ...fixture, normalizedMonthlyKWhPerKw: [0, ...fixture.normalizedMonthlyKWhPerKw.slice(1)] }).modeledMonthlyKWh?.[0]).toBe(0);
  });

  it("rejects zero annual yield with a recoverable sizing error", () => {
    expect(() => calculateSolarPanelSize({ ...fixture, specificYieldKWhPerKwYear: 0 })).toThrow("zero annual production");
  });

  it("compares custom panel wattage without snapping it to a preset", () => {
    const result = calculateSolarPanelSize({ ...fixture, panelWatts: 420 });
    const comparisons = result.panelComparisons;
    expect(comparisons.map((item) => item.panelWatts)).toEqual([350, 400, 420, 450]);
    expect(comparisons.find((item) => item.panelWatts === 420)?.isSelected).toBe(true);
    expect(comparisons.find((item) => item.panelWatts === 400)?.isSelected).toBe(false);
  });

  it("normalizes daily, monthly and annual targets consistently", () => {
    const daily = calculateSolarPanelSize({ ...fixture, annualTargetKWh: normalizeEnergyTargetToAnnual(40, "day") });
    const monthly = calculateSolarPanelSize({ ...fixture, annualTargetKWh: normalizeEnergyTargetToAnnual(1_217.5, "month") });
    const annual = calculateSolarPanelSize({ ...fixture, annualTargetKWh: normalizeEnergyTargetToAnnual(14_610, "year") });
    expect(daily.baseRequiredKw).toBeCloseTo(monthly.baseRequiredKw);
    expect(monthly.baseRequiredKw).toBeCloseTo(annual.baseRequiredKw);
  });

  it("rejects invalid sizing values and exposes no battery concepts", () => {
    expect(() => calculateSolarPanelSize({ ...fixture, annualTargetKWh: 0 })).toThrow();
    expect(() => calculateSolarPanelSize({ ...fixture, panelWatts: -1 })).toThrow();
    expect(() => calculateSolarPanelSize({ ...fixture, designMargin: 1.1 })).toThrow();
    expect(calculateSolarPanelSize(fixture)).not.toHaveProperty("batteryCapacity");
    expect(calculateSolarPanelSize(fixture)).not.toHaveProperty("autonomyDays");
    expect(calculateSolarPanelSize(fixture)).not.toHaveProperty("startingSoc");
  });
});
