import { describe, expect, it } from "vitest";
import { calculatePanelSystemCapacity, summarizeSolarOutput, type NormalizedSolarOutput } from "./engine";

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
});
