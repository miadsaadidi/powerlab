import { describe, expect, it } from "vitest";
import { calculateSolarBatteryBankSize } from "./engine";

const defaults = {
  dailyLoadKWh: 5,
  autonomyDays: 1,
  startingSoc: 1,
  minimumSoc: 0.2,
  inverterEfficiency: 0.9,
  batteryHealth: 1,
  designMargin: 0.1,
  systemVoltage: 48,
  chemistry: "lifepo4" as const,
};

describe("solar battery bank size engine", () => {
  it("calculates the documented default energy and Ah result", () => {
    const result = calculateSolarBatteryBankSize(defaults).result;
    expect(result.loadEnergyKWh).toBeCloseTo(5);
    expect(result.usableSocWindow).toBeCloseTo(0.8);
    expect(result.minimumNominalKWh).toBeCloseTo(6.9444444444);
    expect(result.recommendedKWh).toBeCloseTo(7.6388888889);
    expect(result.selectedVoltageAh).toBeCloseTo(159.1435185);
  });

  it("applies inverter loss exactly once to load-side energy", () => {
    expect(calculateSolarBatteryBankSize(defaults).result.inverterAdjustedLoadKWh).toBeCloseTo(5 / 0.9);
    expect(calculateSolarBatteryBankSize({ ...defaults, inverterEfficiency: 1 }).result.inverterAdjustedLoadKWh).toBeCloseTo(5);
  });

  it("keeps the starting SOC assumption fixed at 100 percent", () => {
    const result = calculateSolarBatteryBankSize(defaults).result;
    expect(result.startingSoc).toBe(1);
    expect(result.usableSocWindow).toBeCloseTo(1 - defaults.minimumSoc);
  });

  it("changes Ah but not energy when system voltage changes", () => {
    const values = [12, 24, 48, 51.2].map((systemVoltage) => calculateSolarBatteryBankSize({ ...defaults, systemVoltage }).result);
    expect(values.map((value) => value.recommendedKWh)).toEqual(values.map(() => expect.closeTo(values[0].recommendedKWh, 10)));
    expect(values[3].selectedVoltageAh).toBeCloseTo(values[0].selectedVoltageAh * 12 / 51.2);
  });

  it("returns reference Ah equivalents for 12, 24 and 48 volts", () => {
    const result = calculateSolarBatteryBankSize(defaults).result;
    expect(result.referenceAh.map((item) => item.voltage)).toEqual([12, 24, 48]);
    expect(result.referenceAh.map((item) => item.ampHours)).toEqual([
      expect.closeTo(636.574074, 6),
      expect.closeTo(318.287037, 6),
      expect.closeTo(159.143519, 6),
    ]);
  });

  it("supports custom autonomy without rounding it to a reference row", () => {
    const result = calculateSolarBatteryBankSize({ ...defaults, autonomyDays: 1.5 }).result;
    expect(result.loadEnergyKWh).toBeCloseTo(7.5);
    expect(result.autonomyComparisons.map((item) => item.autonomyDays)).toEqual([1, 2, 3, 1.5]);
    expect(result.autonomyComparisons.at(-1)?.isSelected).toBe(true);
  });

  it("rejects invalid planning inputs", () => {
    expect(() => calculateSolarBatteryBankSize({ ...defaults, dailyLoadKWh: 0 })).toThrow();
    expect(() => calculateSolarBatteryBankSize({ ...defaults, autonomyDays: 0 })).toThrow();
    expect(() => calculateSolarBatteryBankSize({ ...defaults, minimumSoc: 1 })).toThrow();
    expect(() => calculateSolarBatteryBankSize({ ...defaults, inverterEfficiency: 0 })).toThrow();
    expect(() => calculateSolarBatteryBankSize({ ...defaults, systemVoltage: 0 })).toThrow();
  });
});
