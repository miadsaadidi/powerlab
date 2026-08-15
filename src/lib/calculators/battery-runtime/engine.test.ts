import { describe, expect, it } from "vitest";
import { calculateBatteryRuntime } from "./engine";

const baseInput = {
  capacityWh: 1_000,
  loadWatts: 100,
  loadType: "ac" as const,
  startingSoc: 1,
  reserveSoc: 0.2,
  batteryHealth: 1,
  acInverterEfficiency: 0.9,
  dcConversionEfficiency: 1,
  dutyCycle: 1,
};

describe("calculateBatteryRuntime", () => {
  it("calculates the default 1000 Wh AC scenario transparently", () => {
    const result = calculateBatteryRuntime(baseInput);

    expect(result.result.nominalEnergyWh).toBe(1_000);
    expect(result.result.usableBatteryWh).toBe(800);
    expect(result.result.batterySideLoadWatts).toBeCloseTo(111.111111);
    expect(result.result.runtimeHours).toBeCloseTo(7.2);
  });

  it("normalizes kWh before applying the charge window", () => {
    const result = calculateBatteryRuntime({ ...baseInput, capacityWh: undefined, capacityKwh: 1 });

    expect(result.result.nominalEnergyWh).toBe(1_000);
    expect(result.result.runtimeHours).toBeCloseTo(7.2);
  });

  it("derives nominal energy from amp-hours and voltage", () => {
    const result = calculateBatteryRuntime({ ...baseInput, capacityWh: undefined, capacityAh: 100, voltage: 12 });

    expect(result.result.nominalEnergyWh).toBe(1_200);
  });

  it("does not apply inverter losses to a direct DC load", () => {
    const result = calculateBatteryRuntime({ ...baseInput, loadType: "dc", dcConversionEfficiency: 1 });

    expect(result.result.batterySideLoadWatts).toBe(100);
    expect(result.result.runtimeHours).toBe(8);
  });

  it("calculates mixed appliance loads using average watts but preserves peak load", () => {
    const result = calculateBatteryRuntime({
      ...baseInput,
      loadWatts: 0,
      appliances: [
        { label: "TV", watts: 100, quantity: 1, loadType: "ac", dutyCycle: 1 },
        { label: "Router", watts: 12, quantity: 1, loadType: "ac", dutyCycle: 1 },
        { label: "LED bulb", watts: 10, quantity: 3, loadType: "ac", dutyCycle: 1 },
      ],
    });

    expect(result.result.averageLoadWatts).toBe(142);
    expect(result.result.peakConnectedLoadWatts).toBe(142);
    expect(result.result.batterySideLoadWatts).toBeCloseTo(157.777778);
    expect(result.result.runtimeHours).toBeCloseTo(5.0704225);
  });

  it("keeps a refrigerator's duty-cycle average separate from its peak load", () => {
    const result = calculateBatteryRuntime({
      ...baseInput,
      appliances: [{ label: "Refrigerator", watts: 150, quantity: 1, loadType: "ac", dutyCycle: 0.35 }],
    });

    expect(result.result.averageLoadWatts).toBe(52.5);
    expect(result.result.peakConnectedLoadWatts).toBe(150);
  });

  it("uses only the chosen SOC window and never double-counts a preset DoD", () => {
    const result = calculateBatteryRuntime({ ...baseInput, startingSoc: 0.5, reserveSoc: 0.2 });

    expect(result.result.usableBatteryWh).toBe(300);
  });

  it("rejects invalid charge windows", () => {
    expect(() => calculateBatteryRuntime({ ...baseInput, startingSoc: 0.2, reserveSoc: 0.2 })).toThrow(
      "Starting charge must be above your minimum remaining charge.",
    );
  });

  it("rejects non-positive capacity and load values", () => {
    expect(() => calculateBatteryRuntime({ ...baseInput, capacityWh: 0 })).toThrow(
      "Enter a battery capacity greater than zero.",
    );
    expect(() => calculateBatteryRuntime({ ...baseInput, loadWatts: -1 })).toThrow(
      "Enter a load greater than zero.",
    );
  });

  it("requires voltage for amp-hour capacity and valid efficiencies", () => {
    expect(() => calculateBatteryRuntime({ ...baseInput, capacityWh: undefined, capacityAh: 100 })).toThrow(
      "Choose a battery voltage when capacity is entered in Ah.",
    );
    expect(() => calculateBatteryRuntime({ ...baseInput, acInverterEfficiency: 1.01 })).toThrow(
      "Efficiency must be greater than 0% and no more than 100%.",
    );
  });
});
