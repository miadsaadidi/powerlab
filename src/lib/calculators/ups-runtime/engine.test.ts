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

  it("calculates default 216 Wh @ 100W load to 58.32 minutes (~58 min)", () => {
    const result = calculateUpsRuntime(base).result;
    const minutes = result.runtimeHours * 60;
    expect(minutes).toBeCloseTo(58.32, 2);
  });

  it("scales load durations inversely across comparison loads", () => {
    // 50W -> 116.64 min
    const res50 = calculateUpsRuntime({ ...base, directLoadW: 50 }).result;
    expect(res50.runtimeHours * 60).toBeCloseTo(116.64, 2);

    // 100W -> 58.32 min
    const res100 = calculateUpsRuntime({ ...base, directLoadW: 100 }).result;
    expect(res100.runtimeHours * 60).toBeCloseTo(58.32, 2);

    // 150W -> 38.88 min
    const res150 = calculateUpsRuntime({ ...base, directLoadW: 150 }).result;
    expect(res150.runtimeHours * 60).toBeCloseTo(38.88, 2);
  });

  it("reproduces matrix values consistently (50% usable, 90% efficiency)", () => {
    // 650VA / 84Wh @ 25W -> 90.72 min
    const m650_25 = calculateUpsRuntime({ ...base, directWh: 84, directLoadW: 25 }).result;
    expect(m650_25.runtimeHours * 60).toBeCloseTo(90.72, 2);

    // 1000VA / 168Wh @ 100W -> 45.36 min
    const m1000_100 = calculateUpsRuntime({ ...base, directWh: 168, directLoadW: 100 }).result;
    expect(m1000_100.runtimeHours * 60).toBeCloseTo(45.36, 2);

    // 1500VA / 216Wh @ 350W -> 16.66 min
    const m1500_350 = calculateUpsRuntime({ ...base, directWh: 216, directLoadW: 350 }).result;
    expect(m1500_350.runtimeHours * 60).toBeCloseTo(16.6628, 2);

    // 2200VA / 432Wh @ 600W -> 19.44 min
    const m2200_600 = calculateUpsRuntime({ ...base, directWh: 432, directLoadW: 600 }).result;
    expect(m2200_600.runtimeHours * 60).toBeCloseTo(19.44, 2);
  });

  it("validates active battery-bank and VA inputs", () => {
    expect(() => calculateUpsRuntime({ ...base, batteryCapacityMode: "battery-bank", batteryCount: 1.5 })).toThrow(/whole number/);
    expect(() => calculateUpsRuntime({ ...base, upsVA: 1000, assumedUpsOutputPowerFactor: 0 })).toThrow(/power factor/);
    expect(() => calculateUpsRuntime({ ...base, directWh: 0 })).toThrow("Enter battery energy greater than zero.");
    expect(() => calculateUpsRuntime({ ...base, directLoadW: -5 })).toThrow("Enter a load greater than zero.");
    expect(() => calculateUpsRuntime({ ...base, upsEfficiency: 1.5 })).toThrow("greater than 0% and no more than 100%");
  });
});
