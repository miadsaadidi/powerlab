import { describe, expect, it } from "vitest";
import { calculateBatteryCapacity, type BatteryCapacityInput } from "./engine";

const assumptions = {
  startingSoc: 1,
  minimumSoc: 0.2,
  batteryHealth: 1,
  chemistry: "LiFePO4 / LFP",
};

describe("calculateBatteryCapacity", () => {
  it("converts Ah to Wh, kWh and mAh", () => {
    const result = calculateBatteryCapacity({
      mode: "charge-to-energy",
      charge: 100,
      chargeUnit: "ah",
      voltage: 12,
      ...assumptions,
    });

    expect(result.result.capacityAh).toBe(100);
    expect(result.result.capacityMah).toBe(100_000);
    expect(result.result.nominalWh).toBe(1_200);
    expect(result.result.nominalKWh).toBe(1.2);
    expect(result.result.usableWh).toBe(960);
  });

  it("converts mAh to Ah and Wh", () => {
    const result = calculateBatteryCapacity({
      mode: "charge-to-energy",
      charge: 100_000,
      chargeUnit: "mah",
      voltage: 12,
      ...assumptions,
    });

    expect(result.result.capacityAh).toBe(100);
    expect(result.result.nominalWh).toBe(1_200);
  });

  it("converts Wh and kWh to Ah", () => {
    const result = calculateBatteryCapacity({
      mode: "energy-to-charge",
      energy: 1.2,
      energyUnit: "kwh",
      voltage: 12,
      ...assumptions,
    });

    expect(result.result.nominalWh).toBe(1_200);
    expect(result.result.capacityAh).toBe(100);
    expect(result.result.capacityMah).toBe(100_000);
  });

  it("returns equivalent Ah values by voltage without treating them as recommendations", () => {
    const result = calculateBatteryCapacity({
      mode: "energy-to-charge",
      energy: 1_200,
      energyUnit: "wh",
      voltage: 12,
      ...assumptions,
    });

    expect(result.result.equivalentAh).toEqual([
      { voltage: 12, capacityAh: 100 },
      { voltage: 24, capacityAh: 50 },
      { voltage: 48, capacityAh: 25 },
    ]);
  });

  it("finds the actual voltage without snapping to a preset", () => {
    const result = calculateBatteryCapacity({
      mode: "find-voltage",
      energy: 1_250,
      energyUnit: "wh",
      charge: 100,
      chargeUnit: "ah",
      ...assumptions,
    });

    expect(result.result.voltage).toBe(12.5);
    expect(result.result.nominalWh).toBe(1_250);
  });

  it("keeps full precision for round-trip conversions", () => {
    const forward = calculateBatteryCapacity({
      mode: "charge-to-energy",
      charge: 123.45,
      chargeUnit: "ah",
      voltage: 12.8,
      ...assumptions,
    });
    const backward = calculateBatteryCapacity({
      mode: "energy-to-charge",
      energy: forward.result.nominalWh,
      energyUnit: "wh",
      voltage: 12.8,
      ...assumptions,
    });

    expect(forward.result.nominalWh).toBeCloseTo(1_580.16, 10);
    expect(backward.result.capacityAh).toBeCloseTo(123.45, 10);
  });

  it("keeps health separate from the SOC window", () => {
    const result = calculateBatteryCapacity({
      mode: "energy-to-charge",
      energy: 1_200,
      energyUnit: "wh",
      voltage: 12,
      startingSoc: 1,
      minimumSoc: 0.2,
      batteryHealth: 0.9,
      chemistry: "LiFePO4 / LFP",
    });

    expect(result.result.usableWh).toBe(864);
  });

  it("rejects invalid active-mode values and SOC relationships", () => {
    const base: BatteryCapacityInput = {
      mode: "charge-to-energy",
      charge: 100,
      chargeUnit: "ah",
      voltage: 12,
      ...assumptions,
    };

    expect(() => calculateBatteryCapacity({ ...base, charge: 0 })).toThrow("Charge capacity must be greater than zero.");
    expect(() => calculateBatteryCapacity({ ...base, voltage: 0 })).toThrow("Voltage must be greater than zero.");
    expect(() => calculateBatteryCapacity({ ...base, startingSoc: 0.2 })).toThrow("Starting charge must be above minimum charge.");
    expect(() => calculateBatteryCapacity({ ...base, startingSoc: 0.2, minimumSoc: 0.3 })).toThrow("Starting charge must be above minimum charge.");
    expect(() => calculateBatteryCapacity({ ...base, batteryHealth: 0 })).toThrow("Battery health must be greater than 0% and no more than 100%.");
  });
});
