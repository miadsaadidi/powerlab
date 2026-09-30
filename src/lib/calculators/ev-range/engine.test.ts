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
  describe("Item 11 Required Validation Tests", () => {
    it("Test A: 60 kWh, 80% SOC, 10% reserve, 18 kWh/100 km -> 42 kWh, 233.33 km, ~145.0 miles", () => {
      const result = calculateEvRange({
        batteryCapacityKWh: 60,
        currentSoc: 80,
        reserveSoc: 10,
        batteryHealth: 100,
        consumption: 18,
        consumptionUnit: "kwh-per-100-km",
      }).result;

      expect(result.availableSocFraction).toBeCloseTo(0.70, 5);
      expect(result.energyAvailableKWh).toBeCloseTo(42.0, 5);
      expect(result.rangeKm).toBeCloseTo(42 / 0.18, 5); // 233.3333... km
      expect(result.rangeMiles).toBeCloseTo(233.33333333333334 / 1.609344, 4); // ~144.9866 mi
      expect(Number(result.rangeMiles.toFixed(1))).toBe(145.0);
    });

    it("Test B: 75 kWh, 80% SOC, 10% reserve, 3.5 mi/kWh -> 52.5 kWh, 183.75 miles", () => {
      const result = calculateEvRange({
        batteryCapacityKWh: 75,
        currentSoc: 80,
        reserveSoc: 10,
        batteryHealth: 100,
        consumption: 3.5,
        consumptionUnit: "mi-per-kwh",
      }).result;

      expect(result.availableSocFraction).toBeCloseTo(0.70, 5);
      expect(result.energyAvailableKWh).toBeCloseTo(52.5, 5);
      expect(result.rangeMiles).toBeCloseTo(52.5 * 3.5, 5); // exactly 183.75 miles
      expect(result.rangeKm).toBeCloseTo(183.75 * 1.609344, 4); // 295.717 km
    });

    it("Test C: SOH test: 75 kWh, 80% SOC, 10% reserve, 90% SOH, 3.5 mi/kWh -> 165.375 miles", () => {
      const result = calculateEvRange({
        batteryCapacityKWh: 75,
        currentSoc: 80,
        reserveSoc: 10,
        batteryHealth: 90,
        consumption: 3.5,
        consumptionUnit: "mi-per-kwh",
      }).result;

      expect(result.effectiveCapacityKWh).toBeCloseTo(67.5, 5); // 75 * 0.90
      expect(result.energyAvailableKWh).toBeCloseTo(47.25, 5); // 67.5 * 0.70
      expect(result.rangeMiles).toBeCloseTo(47.25 * 3.5, 5); // exactly 165.375 miles
    });

    it("Test D: Unit conversion: 18 kWh/100 km = ~3.452 mi/kWh", () => {
      const normalized = normalizeConsumption(18, "kwh-per-100-km"); // 0.18 kWh/km
      const miPerKwh = formatConsumptionValue(normalized, "mi-per-kwh");
      expect(miPerKwh).toBeCloseTo(3.452062, 5);
      expect(Number(miPerKwh.toFixed(3))).toBe(3.452);
    });

    it("Test E: Edge cases handling", () => {
      // Current SOC = Reserve SOC -> 0 range
      const equalSoc = calculateEvRange({ ...base, currentSoc: 20, reserveSoc: 20 }).result;
      expect(equalSoc.availableSocFraction).toBe(0);
      expect(equalSoc.energyAvailableKWh).toBe(0);
      expect(equalSoc.rangeKm).toBe(0);
      expect(equalSoc.rangeMiles).toBe(0);

      // Current SOC < Reserve SOC -> 0 range with warning
      const belowReserve = calculateEvRange({ ...base, currentSoc: 10, reserveSoc: 20 });
      expect(belowReserve.result.availableSocFraction).toBe(0);
      expect(belowReserve.result.rangeKm).toBe(0);
      expect(belowReserve.warnings.some((w) => w.code === "AT_OR_BELOW_RESERVE")).toBe(true);

      // SOH = 0 -> validation error
      expect(() => calculateEvRange({ ...base, batteryHealth: 0 })).toThrow("Battery health must be greater than 0%");

      // Consumption <= 0 -> validation error
      expect(() => calculateEvRange({ ...base, consumption: 0 })).toThrow("energy-consumption");
      expect(() => calculateEvRange({ ...base, consumption: -15 })).toThrow("energy-consumption");

      // Battery capacity <= 0 -> validation error
      expect(() => calculateEvRange({ ...base, batteryCapacityKWh: 0 })).toThrow("Battery capacity must be greater than zero");
      expect(() => calculateEvRange({ ...base, batteryCapacityKWh: -50 })).toThrow("Battery capacity must be greater than zero");
    });
  });

  describe("Scenario and sensitivity calculations", () => {
    it("calculates canonical and normalized sensitivity scenarios", () => {
      const result = calculateEvRange(base).result;
      expect(result.standardScenarios.map((s) => s.consumptionKWhPerKm)).toEqual([0.15, 0.18, 0.22]);
      expect(result.sensitivityScenarios[0].rangeKm).toBeGreaterThan(result.sensitivityScenarios[1].rangeKm);
      expect(result.sensitivityScenarios[2].rangeKm).toBeLessThan(result.sensitivityScenarios[1].rangeKm);
    });

    it("normalizes charge-level scenarios as percentage points", () => {
      const scenarios = calculateEvRange(base).result.chargeScenarios;
      expect(scenarios.find((s) => s.soc === 80)?.availableSocFraction).toBeCloseTo(0.7);
      expect(scenarios.find((s) => s.soc === 90)?.availableSocFraction).toBeCloseTo(0.8);
      expect(scenarios.find((s) => s.soc === 100)?.availableSocFraction).toBeCloseTo(0.9);
    });

    it("rejects invalid percentage-point inputs", () => {
      expect(() => calculateEvRange({ ...base, currentSoc: 101 })).toThrow();
      expect(() => calculateEvRange({ ...base, reserveSoc: -1 })).toThrow();
    });
  });
});
