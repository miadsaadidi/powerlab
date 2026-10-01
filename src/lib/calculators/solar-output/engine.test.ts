import { describe, expect, it } from "vitest";
import { calculatePanelSystemCapacity, calculateSimplifiedSolarOutput, summarizeSolarOutput, type NormalizedSolarOutput } from "./engine";

const mockedProviderOutput: NormalizedSolarOutput = {
  annualAcKWh: 7500,
  monthlyAcKWh: [500, 600, 700, 800, 900, 1000, 850, 750, 650, 550, 450, 300],
  capacityFactorPercent: 17.1,
  warnings: [],
};

describe("solar output engine", () => {
  it("interprets authoritative mocked PVWatts output", () => {
    const result = summarizeSolarOutput({ systemCapacityKw: 5, provider: mockedProviderOutput, annualElectricityUsageKWh: null });
    expect(result.annualAcKWh).toBe(7500);
    expect(result.averageDailyKWh).toBeCloseTo(7500 / 365, 8);
    expect(result.specificYieldKWhPerKwYear).toBe(1500);
    expect(result.capacityFactorPercent).toBe(17.1);
    expect(result.bestMonth).toEqual({ index: 5, label: "June", kWh: 1000 });
    expect(result.lowestMonth).toEqual({ index: 11, label: "December", kWh: 300 });
  });

  it("allows a valid zero-production provider result", () => {
    const result = summarizeSolarOutput({ systemCapacityKw: 5, provider: { annualAcKWh: 0, monthlyAcKWh: Array(12).fill(0), warnings: [] }, annualElectricityUsageKWh: null });
    expect(result.annualAcKWh).toBe(0);
    expect(result.averageDailyKWh).toBe(0);
  });

  it("rejects negative or incomplete provider output", () => {
    expect(() => summarizeSolarOutput({ systemCapacityKw: 5, provider: { ...mockedProviderOutput, annualAcKWh: -1 }, annualElectricityUsageKWh: null })).toThrow();
    expect(() => summarizeSolarOutput({ systemCapacityKw: 5, provider: { ...mockedProviderOutput, monthlyAcKWh: [1, 2] }, annualElectricityUsageKWh: null })).toThrow();
  });

  it("calculates annual coverage without clamping above 100 percent", () => {
    const result = summarizeSolarOutput({ systemCapacityKw: 5, provider: mockedProviderOutput, annualElectricityUsageKWh: 6000 });
    expect(result.coveragePercent).toBe(125);
  });

  it("converts a positive integer panel count and wattage to system capacity", () => {
    expect(calculatePanelSystemCapacity(10, 400)).toBe(4);
  });

  it("rejects non-integer, zero and negative panel counts", () => {
    expect(() => calculatePanelSystemCapacity(10.5, 400)).toThrow();
    expect(() => calculatePanelSystemCapacity(0, 400)).toThrow();
    expect(() => calculatePanelSystemCapacity(-1, 400)).toThrow();
  });

  describe("calculateSimplifiedSolarOutput", () => {
    it("matches canonical QA Case 1 (400W panel at 4.5 PSH)", () => {
      const result = calculateSimplifiedSolarOutput({
        dcCapacityKw: 0.4,
        peakSunHours: 4.5,
        dcLossPercent: 14,
        inverterEfficiencyPercent: 96,
      });
      // 0.40 * 4.5 * 0.86 * 0.96 = 1.48608
      expect(result.dailyAcKWh).toBeCloseTo(1.486, 3);
      expect(result.annualAcKWh).toBeCloseTo(542.79, 1);
    });

    it("matches canonical QA Case 2 (6.0 kW system at 5.15 PSH)", () => {
      const result = calculateSimplifiedSolarOutput({
        dcCapacityKw: 6.0,
        peakSunHours: 5.15,
        dcLossPercent: 14,
        inverterEfficiencyPercent: 96,
      });
      // 6.0 * 5.15 * 0.86 * 0.96 = 25.51104
      expect(result.dailyAcKWh).toBeCloseTo(25.511, 3);
      expect(result.annualAcKWh).toBeCloseTo(9317.9, 1);
    });

    it("scales output proportionally with inverter efficiency", () => {
      const base = calculateSimplifiedSolarOutput({ dcCapacityKw: 10, peakSunHours: 5, dcLossPercent: 14, inverterEfficiencyPercent: 96 });
      const lower = calculateSimplifiedSolarOutput({ dcCapacityKw: 10, peakSunHours: 5, dcLossPercent: 14, inverterEfficiencyPercent: 90 });
      expect(lower.dailyAcKWh / base.dailyAcKWh).toBeCloseTo(90 / 96, 5);
    });

    it("scales output proportionally with DC losses", () => {
      const loss14 = calculateSimplifiedSolarOutput({ dcCapacityKw: 10, peakSunHours: 5, dcLossPercent: 14, inverterEfficiencyPercent: 96 });
      const loss20 = calculateSimplifiedSolarOutput({ dcCapacityKw: 10, peakSunHours: 5, dcLossPercent: 20, inverterEfficiencyPercent: 96 });
      expect(loss20.dailyAcKWh / loss14.dailyAcKWh).toBeCloseTo(0.80 / 0.86, 5);
    });

    it("scales output proportionally with PSH", () => {
      const psh4 = calculateSimplifiedSolarOutput({ dcCapacityKw: 10, peakSunHours: 4 });
      const psh6 = calculateSimplifiedSolarOutput({ dcCapacityKw: 10, peakSunHours: 6 });
      expect(psh6.dailyAcKWh / psh4.dailyAcKWh).toBeCloseTo(6 / 4, 5);
    });
  });
});
