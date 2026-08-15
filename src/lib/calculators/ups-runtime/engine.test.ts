import { describe, expect, it } from "vitest";
import { calculateUpsRuntime } from "./engine";

const base = {
  batteryCapacityMode: "direct-wh" as const,
  directWh: 216,
  batteryVoltage: 12,
  batteryAh: 9,
  batteryCount: 2,
  loadMode: "direct-watts" as const,
  directLoadW: 100,
  equipment: [],
  usableFraction: 0.5,
  batteryHealth: 1,
  upsEfficiency: 0.9,
  ratedUpsMaxWatts: null,
  upsVA: null,
  assumedUpsOutputPowerFactor: 0.8,
};

describe("UPS runtime engine", () => {
  it("calculates the documented direct 216 Wh fixture", () => {
    const result = calculateUpsRuntime(base).result;
    expect(result.nominalWh).toBe(216);
    expect(result.usableWh).toBe(108);
    expect(result.batterySideLoadW).toBeCloseTo(111.111, 3);
    expect(result.runtimeHours).toBeCloseTo(0.972, 3);
  });

  it("calculates the equivalent battery-bank fixture", () => {
    const result = calculateUpsRuntime({ ...base, batteryCapacityMode: "battery-bank", directWh: 500 }).result;
    expect(result.nominalWh).toBe(216);
  });

  it("uses only the active capacity source", () => {
    expect(calculateUpsRuntime({ ...base, directWh: 500, batteryCapacityMode: "battery-bank" }).result.nominalWh).toBe(216);
    expect(calculateUpsRuntime({ ...base, directWh: 500, batteryCapacityMode: "direct-wh" }).result.nominalWh).toBe(500);
  });

  it("uses only the active load source", () => {
    const equipment = [{ label: "Router", watts: 12, quantity: 1 }];
    expect(calculateUpsRuntime({ ...base, directLoadW: 100, loadMode: "equipment", equipment: [...equipment, { label: "Modem", watts: 10, quantity: 1 }, { label: "Desktop", watts: 200, quantity: 1 }] }).result.loadW).toBe(222);
    expect(calculateUpsRuntime({ ...base, loadMode: "direct-watts", equipment }).result.loadW).toBe(100);
  });

  it("uses rated watts over VA-derived capability", () => {
    const result = calculateUpsRuntime({ ...base, ratedUpsMaxWatts: 900, upsVA: 1000, directLoadW: 850 }).result;
    expect(result.upsCapabilityWatts).toBe(900);
    expect(result.upsCapabilitySource).toBe("rated-watts");
    expect(result.overloadState).toBe("none");
  });

  it("distinguishes confirmed and estimated overload", () => {
    expect(calculateUpsRuntime({ ...base, ratedUpsMaxWatts: 80 }).result.overloadState).toBe("confirmed-overload");
    expect(calculateUpsRuntime({ ...base, upsVA: 1000, assumedUpsOutputPowerFactor: 0.8, directLoadW: 900 }).result.overloadState).toBe("estimated-overload");
  });

  it("validates active battery-bank and VA inputs", () => {
    expect(() => calculateUpsRuntime({ ...base, batteryCapacityMode: "battery-bank", batteryCount: 1.5 })).toThrow(/whole number/);
    expect(() => calculateUpsRuntime({ ...base, upsVA: 1000, assumedUpsOutputPowerFactor: 0 })).toThrow(/power factor/);
  });
});
