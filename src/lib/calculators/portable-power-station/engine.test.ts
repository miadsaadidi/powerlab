import { describe, expect, it } from "vitest";
import {
  calculatePortablePowerStation,
  type PortableCapacityInput,
  type PortableEquipmentInput,
  type PortableRuntimeInput,
} from "./engine";

const runtimeDefaults: PortableRuntimeInput = {
  mode: "runtime",
  capacityWh: 1024,
  load: { loadMode: "direct-watts", directLoadW: 100, peakLoadW: null },
  continuousOutputW: 1800,
  surgeOutputW: null,
  acEfficiency: 0.9,
  reserveFraction: 0.05,
  batteryHealth: 1,
};

const equipment = (rows: PortableEquipmentInput[]): PortableRuntimeInput => ({
  ...runtimeDefaults,
  load: { loadMode: "equipment", equipment: rows },
});

describe("portable power station engine", () => {
  it("calculates the default nominal, stored and delivered energy separately", () => {
    const result = calculatePortablePowerStation(runtimeDefaults);

    expect(result.result.usableStoredWh).toBeCloseTo(972.8);
    expect(result.result.deliveredAcWh).toBeCloseTo(875.52);
    expect(result.result.runtimeHours).toBeCloseTo(8.7552);
    expect(result.result.continuousCapability).toBe("valid");
  });

  it("uses duty cycle for average energy but not connected running watts", () => {
    const result = calculatePortablePowerStation(equipment([
      { label: "Refrigerator", watts: 150, quantity: 1, dutyCycle: 0.35, surgeWatts: null },
      { label: "TV", watts: 100, quantity: 1, dutyCycle: 1, surgeWatts: null },
    ]));

    expect(result.result.averageLoadW).toBeCloseTo(152.5);
    expect(result.result.connectedRunningW).toBeCloseTo(250);
  });

  it("flags continuous overload from connected running load in runtime mode", () => {
    const result = calculatePortablePowerStation({
      ...equipment([{ label: "Refrigerator", watts: 150, quantity: 1, dutyCycle: 0.35, surgeWatts: null }]),
      continuousOutputW: 100,
    });

    expect(result.result.continuousCapability).toBe("overload");
    expect(result.result.runtimeHours).toBeDefined();
  });

  it("keeps capacity energy sizing available while reporting output incompatibility", () => {
    const input: PortableCapacityInput = {
      mode: "capacity",
      desiredRuntimeHours: 8,
      load: { loadMode: "equipment", equipment: [{ label: "Refrigerator", watts: 150, quantity: 1, dutyCycle: 0.35, surgeWatts: null }] },
      continuousOutputW: 100,
      surgeOutputW: null,
      acEfficiency: 0.9,
      reserveFraction: 0.05,
      batteryHealth: 1,
    };

    const result = calculatePortablePowerStation(input);

    expect(result.result.requiredNominalWh).toBeCloseTo(491.228);
    expect(result.result.continuousCapability).toBe("overload");
  });

  it("requires direct startup load to be at least the running load", () => {
    expect(() => calculatePortablePowerStation({
      ...runtimeDefaults,
      load: { loadMode: "direct-watts", directLoadW: 100, peakLoadW: 90 },
    })).toThrow(/peak/i);
  });

  it("keeps incomplete equipment startup data unknown instead of inferring it", () => {
    const result = calculatePortablePowerStation({
      ...equipment([
        { label: "Refrigerator", watts: 150, quantity: 1, dutyCycle: 1, surgeWatts: 600 },
        { label: "Router", watts: 12, quantity: 1, dutyCycle: 1, surgeWatts: null },
      ]),
      surgeOutputW: 800,
    });

    expect(result.result.minimumKnownStartupW).toBe(612);
    expect(result.result.startupDataComplete).toBe(false);
    expect(result.result.surgeCheck).toBe("incomplete");
  });

  it("checks a complete simultaneous startup estimate", () => {
    const result = calculatePortablePowerStation({
      ...equipment([
        { label: "Refrigerator", watts: 150, quantity: 1, dutyCycle: 1, surgeWatts: 600 },
        { label: "Router", watts: 12, quantity: 1, dutyCycle: 1, surgeWatts: 12 },
      ]),
      surgeOutputW: 800,
    });

    expect(result.result.startupDataComplete).toBe(true);
    expect(result.result.startupLoadW).toBe(612);
    expect(result.result.surgeCheck).toBe("passes");
  });

  it("recognizes definite surge failure from the known minimum when data is incomplete", () => {
    const result = calculatePortablePowerStation({
      ...equipment([
        { label: "Motor", watts: 500, quantity: 1, dutyCycle: 1, surgeWatts: 1500 },
        { label: "Other appliance", watts: 100, quantity: 1, dutyCycle: 1, surgeWatts: null },
      ]),
      surgeOutputW: 1200,
    });

    expect(result.result.minimumKnownStartupW).toBe(1600);
    expect(result.result.surgeCheck).toBe("confirmed-overload");
  });

  it("compares runtime scenarios and capacity runtime targets", () => {
    const runtime = calculatePortablePowerStation(runtimeDefaults);
    expect(runtime.result.runtimeComparisons.map((item) => item.multiplier)).toEqual([0.5, 1, 1.5]);

    const capacity: PortableCapacityInput = {
      mode: "capacity",
      desiredRuntimeHours: 8,
      load: { loadMode: "direct-watts", directLoadW: 100, peakLoadW: null },
      continuousOutputW: 1800,
      surgeOutputW: null,
      acEfficiency: 0.9,
      reserveFraction: 0.05,
      batteryHealth: 1,
    };
    expect(calculatePortablePowerStation(capacity).result.runtimeTargetComparisons.map((item) => item.multiplier)).toEqual([0.5, 1, 2]);
  });

  it("rejects invalid active values", () => {
    expect(() => calculatePortablePowerStation({ ...runtimeDefaults, capacityWh: 0 })).toThrow();
    expect(() => calculatePortablePowerStation({ ...runtimeDefaults, load: { loadMode: "direct-watts", directLoadW: 0, peakLoadW: null } })).toThrow();
    expect(() => calculatePortablePowerStation({ ...runtimeDefaults, acEfficiency: 0 })).toThrow();
  });
});
