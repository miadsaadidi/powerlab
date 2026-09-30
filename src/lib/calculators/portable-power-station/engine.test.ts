import { describe, expect, it } from "vitest";
import {
  calculatePortablePowerStation,
  type PortableCapacityInput,
  type PortableEquipmentInput,
  type PortableRuntimeInput,
} from "./engine";

const canonicalRuntimeDefaults: PortableRuntimeInput = {
  mode: "runtime",
  capacityWh: 1000,
  load: { loadMode: "direct-watts", directLoadW: 60, peakLoadW: null },
  continuousOutputW: 1000,
  surgeOutputW: null,
  acEfficiency: 0.88,
  reserveFraction: 0.1,
  batteryHealth: 1,
};

const equipment = (rows: PortableEquipmentInput[]): PortableRuntimeInput => ({
  ...canonicalRuntimeDefaults,
  load: { loadMode: "equipment", equipment: rows },
});

describe("portable power station engine", () => {
  it("calculates 1000Wh / 60W with 90% usable and 88% efficiency to 13.2h", () => {
    const result = calculatePortablePowerStation(canonicalRuntimeDefaults);

    expect(result.result.usableStoredWh).toBe(900);
    expect(result.result.deliveredAcWh).toBe(792);
    expect(result.result.runtimeHours).toBeCloseTo(13.2, 4);
    expect(result.result.continuousCapability).toBe("valid");
  });

  it("calculates 1024Wh / 100W with canonical assumptions", () => {
    const result = calculatePortablePowerStation({
      ...canonicalRuntimeDefaults,
      capacityWh: 1024,
      load: { loadMode: "direct-watts", directLoadW: 100, peakLoadW: null },
    });

    expect(result.result.usableStoredWh).toBeCloseTo(921.6);
    expect(result.result.deliveredAcWh).toBeCloseTo(811.008);
    expect(result.result.runtimeHours).toBeCloseTo(8.11008, 4);
  });

  it("passes when connected load is below continuous inverter rating", () => {
    const result = calculatePortablePowerStation({
      ...canonicalRuntimeDefaults,
      continuousOutputW: 500,
      load: { loadMode: "direct-watts", directLoadW: 60, peakLoadW: null },
    });
    expect(result.result.continuousCapability).toBe("valid");
  });

  it("flags continuous overload when connected load exceeds continuous rating", () => {
    const result = calculatePortablePowerStation({
      ...canonicalRuntimeDefaults,
      continuousOutputW: 50,
      load: { loadMode: "direct-watts", directLoadW: 60, peakLoadW: null },
    });
    expect(result.result.continuousCapability).toBe("overload");
  });

  it("returns not-evaluated for surge status when surge output or startup load is missing", () => {
    const missingSurgeOutput = calculatePortablePowerStation({
      ...canonicalRuntimeDefaults,
      surgeOutputW: null,
      load: { loadMode: "direct-watts", directLoadW: 60, peakLoadW: 120 },
    });
    expect(missingSurgeOutput.result.surgeCheck).toBe("not-evaluated");

    const missingPeakLoad = calculatePortablePowerStation({
      ...canonicalRuntimeDefaults,
      surgeOutputW: 1500,
      load: { loadMode: "direct-watts", directLoadW: 60, peakLoadW: null },
    });
    expect(missingPeakLoad.result.surgeCheck).toBe("not-evaluated");
  });

  it("passes when surge inputs are present and below peak rating", () => {
    const result = calculatePortablePowerStation({
      ...canonicalRuntimeDefaults,
      surgeOutputW: 1500,
      load: { loadMode: "direct-watts", directLoadW: 60, peakLoadW: 300 },
    });
    expect(result.result.surgeCheck).toBe("passes");
  });

  it("fails (confirmed-overload) when startup load exceeds peak surge rating", () => {
    const result = calculatePortablePowerStation({
      ...canonicalRuntimeDefaults,
      surgeOutputW: 500,
      load: { loadMode: "direct-watts", directLoadW: 60, peakLoadW: 600 },
    });
    expect(result.result.surgeCheck).toBe("confirmed-overload");
  });

  it("uses duty cycle for average energy but not connected running watts in equipment mode", () => {
    const result = calculatePortablePowerStation(
      equipment([
        { label: "Refrigerator", watts: 150, quantity: 1, dutyCycle: 0.35, surgeWatts: 600 },
        { label: "TV", watts: 100, quantity: 1, dutyCycle: 1, surgeWatts: 100 },
      ])
    );

    expect(result.result.averageLoadW).toBeCloseTo(152.5);
    expect(result.result.connectedRunningW).toBeCloseTo(250);
  });

  it("verifies reference-table benchmark values match the canonical formula", () => {
    const stations = [300, 500, 1000, 2000];
    const usableFactor = 0.9;
    const inverterEfficiency = 0.88;

    // Laptop: 45W
    for (const wh of stations) {
      const deliveredAc = wh * usableFactor * inverterEfficiency;
      const expectedHours = deliveredAc / 45;
      const res = calculatePortablePowerStation({
        ...canonicalRuntimeDefaults,
        capacityWh: wh,
        load: { loadMode: "direct-watts", directLoadW: 45, peakLoadW: null },
      });
      expect(res.result.runtimeHours).toBeCloseTo(expectedHours, 4);
    }

    // Camping fridge: 20W
    for (const wh of stations) {
      const deliveredAc = wh * usableFactor * inverterEfficiency;
      const expectedHours = deliveredAc / 20;
      const res = calculatePortablePowerStation({
        ...canonicalRuntimeDefaults,
        capacityWh: wh,
        load: { loadMode: "direct-watts", directLoadW: 20, peakLoadW: null },
      });
      expect(res.result.runtimeHours).toBeCloseTo(expectedHours, 4);
    }

    // CPAP: 35W
    for (const wh of stations) {
      const deliveredAc = wh * usableFactor * inverterEfficiency;
      const expectedHours = deliveredAc / 35;
      const res = calculatePortablePowerStation({
        ...canonicalRuntimeDefaults,
        capacityWh: wh,
        load: { loadMode: "direct-watts", directLoadW: 35, peakLoadW: null },
      });
      expect(res.result.runtimeHours).toBeCloseTo(expectedHours, 4);
    }

    // Starlink: 60W
    for (const wh of stations) {
      const deliveredAc = wh * usableFactor * inverterEfficiency;
      const expectedHours = deliveredAc / 60;
      const res = calculatePortablePowerStation({
        ...canonicalRuntimeDefaults,
        capacityWh: wh,
        load: { loadMode: "direct-watts", directLoadW: 60, peakLoadW: null },
      });
      expect(res.result.runtimeHours).toBeCloseTo(expectedHours, 4);
    }
  });

  it("calculates required capacity in capacity mode", () => {
    const input: PortableCapacityInput = {
      mode: "capacity",
      desiredRuntimeHours: 8,
      load: { loadMode: "direct-watts", directLoadW: 60, peakLoadW: null },
      continuousOutputW: 1000,
      surgeOutputW: null,
      acEfficiency: 0.88,
      reserveFraction: 0.1,
      batteryHealth: 1,
    };

    const result = calculatePortablePowerStation(input);
    // Required delivered Wh = 60 * 8 = 480 Wh
    // Required nominal Wh = 480 / 0.88 / 0.90 = 606.0606 Wh
    expect(result.result.requiredDeliveredWh).toBe(480);
    expect(result.result.requiredNominalWh).toBeCloseTo(606.0606, 4);
  });

  it("rejects invalid inputs", () => {
    expect(() => calculatePortablePowerStation({ ...canonicalRuntimeDefaults, capacityWh: 0 })).toThrow();
    expect(() => calculatePortablePowerStation({ ...canonicalRuntimeDefaults, load: { loadMode: "direct-watts", directLoadW: 0, peakLoadW: null } })).toThrow();
    expect(() => calculatePortablePowerStation({ ...canonicalRuntimeDefaults, acEfficiency: 0 })).toThrow();
    expect(() => calculatePortablePowerStation({ ...canonicalRuntimeDefaults, reserveFraction: 1 })).toThrow();
  });
});
