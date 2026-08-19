import { describe, expect, it } from "vitest";
import { calculateEvRange, formatConsumptionValue, normalizeConsumption, type EvRangeCalculationInput } from "./engine";

const base: EvRangeCalculationInput = {
  batteryCapacityKWh: 60,
  currentSoc: 80,
  reserveSoc: 10,
  batteryHealth: 100,
  consumption: 18,
  consumptionUnit: "kwh-per-100-km",
};

describe("EV Range engine", () => {
  it("normalizes percentage-point SOC and health values", () => {
    const result = calculateEvRange(base).result;
    expect(result.currentSocFraction).toBeCloseTo(0.8);
    expect(result.reserveSocFraction).toBeCloseTo(0.1);
    expect(result.batteryHealthFraction).toBeCloseTo(1);
    expect(result.availableSocFraction).toBeCloseTo(0.7);
    expect(result.energyAvailableKWh).toBeCloseTo(42);
    expect(result.rangeKm).toBeCloseTo(233.3333333);
    expect(result.rangeMiles).toBeCloseTo(144.99, 1);
  });

  it("normalizes equivalent consumption units to the same physical value", () => {
    expect(normalizeConsumption(18, "kwh-per-100-km")).toBeCloseTo(0.18);
    expect(normalizeConsumption(180, "wh-per-km")).toBeCloseTo(0.18);
    expect(normalizeConsumption(3.452062179, "mi-per-kwh")).toBeCloseTo(0.18, 8);
    expect(normalizeConsumption(28.968192, "kwh-per-100-mi")).toBeCloseTo(0.18, 8);
  });

  it("converts equivalent unit displays without changing physical consumption", () => {
    const normalized = normalizeConsumption(18, "kwh-per-100-km");
    expect(formatConsumptionValue(normalized, "wh-per-km")).toBeCloseTo(180);
    expect(formatConsumptionValue(normalized, "mi-per-kwh")).toBeCloseTo(3.452062179, 7);
    expect(formatConsumptionValue(normalized, "kwh-per-100-mi")).toBeCloseTo(28.968192, 6);
    const roundTrip = normalizeConsumption(formatConsumptionValue(normalized, "mi-per-kwh"), "mi-per-kwh");
    expect(roundTrip).toBeCloseTo(normalized, 10);
  });

  it("applies health as a normalized fraction", () => {
    const result = calculateEvRange({ ...base, batteryHealth: 90 }).result;
    expect(result.batteryHealthFraction).toBeCloseTo(0.9);
    expect(result.energyAvailableKWh).toBeCloseTo(37.8);
  });

  it("returns zero planned range at or below reserve", () => {
    const result = calculateEvRange({ ...base, currentSoc: 20, reserveSoc: 20 }).result;
    expect(result.availableSocFraction).toBe(0);
    expect(result.energyAvailableKWh).toBe(0);
    expect(result.rangeKm).toBe(0);
  });

  it("handles reciprocal efficiency units correctly", () => {
    const three = calculateEvRange({ ...base, consumption: 3, consumptionUnit: "mi-per-kwh" }).result.rangeKm;
    const four = calculateEvRange({ ...base, consumption: 4, consumptionUnit: "mi-per-kwh" }).result.rangeKm;
    expect(four).toBeGreaterThan(three);
  });

  it("calculates canonical and normalized sensitivity scenarios", () => {
    const result = calculateEvRange(base).result;
    expect(result.standardScenarios.map((scenario) => scenario.consumptionKWhPerKm)).toEqual([0.15, 0.18, 0.22]);
    expect(result.sensitivityScenarios[0].rangeKm).toBeGreaterThan(result.sensitivityScenarios[1].rangeKm);
    expect(result.sensitivityScenarios[2].rangeKm).toBeLessThan(result.sensitivityScenarios[1].rangeKm);
  });

  it("normalizes charge-level scenarios as percentage points", () => {
    const scenarios = calculateEvRange(base).result.chargeScenarios;
    expect(scenarios.find((scenario) => scenario.soc === 80)?.availableSocFraction).toBeCloseTo(0.7);
    expect(scenarios.find((scenario) => scenario.soc === 90)?.availableSocFraction).toBeCloseTo(0.8);
    expect(scenarios.find((scenario) => scenario.soc === 100)?.availableSocFraction).toBeCloseTo(0.9);
  });

  it("rejects invalid percentage-point inputs", () => {
    expect(() => calculateEvRange({ ...base, currentSoc: 101 })).toThrow();
    expect(() => calculateEvRange({ ...base, reserveSoc: -1 })).toThrow();
    expect(() => calculateEvRange({ ...base, batteryHealth: 0 })).toThrow();
  });
});
