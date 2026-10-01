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

  it("calculates canonical benchmark scenario (10,800 kWh, 1,450 yield, 10% margin, 400W panel)", () => {
    const result = calculateSolarPanelSize({
      annualTargetKWh: 10_800,
      specificYieldKWhPerKwYear: 1_450,
      panelWatts: 400,
      designMargin: 0.10,
    });
    expect(result.baseRequiredKw).toBeCloseTo(7.448275, 4);
    expect(result.recommendedKw).toBeCloseTo(8.193103, 4);
    expect(result.panelCount).toBe(21);
    expect(result.installedKw).toBe(8.4);
    expect(result.modeledAnnualKWh).toBeCloseTo(8.4 * 1450);
  });

  it("calculates canonical reference sizing matrix scenarios", () => {
    // 300 kWh/mo = 3,600 kWh/yr -> 2.731 kW target -> 7 panels -> 2.8 kW
    const r300 = calculateSolarPanelSize({ annualTargetKWh: 3_600, specificYieldKWhPerKwYear: 1_450, panelWatts: 400, designMargin: 0.1 });
    expect(r300.recommendedKw).toBeCloseTo(2.731, 2);
    expect(r300.panelCount).toBe(7);
    expect(r300.installedKw).toBe(2.8);

    // 600 kWh/mo = 7,200 kWh/yr -> 5.462 kW target -> 14 panels -> 5.6 kW
    const r600 = calculateSolarPanelSize({ annualTargetKWh: 7_200, specificYieldKWhPerKwYear: 1_450, panelWatts: 400, designMargin: 0.1 });
    expect(r600.recommendedKw).toBeCloseTo(5.462, 2);
    expect(r600.panelCount).toBe(14);
    expect(r600.installedKw).toBe(5.6);

    // 1,200 kWh/mo = 14,400 kWh/yr -> 10.924 kW target -> 28 panels -> 11.2 kW
    const r1200 = calculateSolarPanelSize({ annualTargetKWh: 14_400, specificYieldKWhPerKwYear: 1_450, panelWatts: 400, designMargin: 0.1 });
    expect(r1200.recommendedKw).toBeCloseTo(10.924, 2);
    expect(r1200.panelCount).toBe(28);
    expect(r1200.installedKw).toBe(11.2);

    // 1,500 kWh/mo = 18,000 kWh/yr -> 13.655 kW target -> 35 panels -> 14.0 kW
    const r1500 = calculateSolarPanelSize({ annualTargetKWh: 18_000, specificYieldKWhPerKwYear: 1_450, panelWatts: 400, designMargin: 0.1 });
    expect(r1500.recommendedKw).toBeCloseTo(13.655, 2);
    expect(r1500.panelCount).toBe(35);
    expect(r1500.installedKw).toBe(14.0);
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
