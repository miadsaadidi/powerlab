import { describe, expect, it } from "vitest";
import { calculateUpsBatterySize, type UpsBatterySizeInput } from "./engine";

const defaults: UpsBatterySizeInput = {
  loadSource: "watts",
  loadW: 300,
  runtimeHours: 0.5,
  busVoltage: 24,
  upsEfficiency: 0.9,
  usableFraction: 0.5,
  batteryHealth: 1,
  designMargin: 0.1,
};

describe("UPS battery size engine", () => {
  it("calculates the documented Watts fixture", () => {
    const result = calculateUpsBatterySize(defaults).result;
    expect(result.loadEnergyWh).toBeCloseTo(150);
    expect(result.batteryEnergyBeforeReserveWh).toBeCloseTo(166.6667);
    expect(result.minimumNominalWh).toBeCloseTo(333.3333);
    expect(result.recommendedWh).toBeCloseTo(366.6667);
    expect(result.recommendedAhAtBus).toBeCloseTo(15.2778);
  });

  it("converts equivalent VA and power factor to the same real load", () => {
    const watts = calculateUpsBatterySize(defaults).result;
    const va = calculateUpsBatterySize({
      ...defaults,
      loadSource: "va",
      loadVA: 375,
      powerFactor: 0.8,
    }).result;
    expect(va.loadW).toBeCloseTo(300);
    expect(va.recommendedWh).toBeCloseTo(watts.recommendedWh);
  });

  it("changes Ah but not required Wh when bus voltage changes", () => {
    const twelve = calculateUpsBatterySize({ ...defaults, busVoltage: 12 }).result;
    const fortyEight = calculateUpsBatterySize({ ...defaults, busVoltage: 48 }).result;
    expect(twelve.recommendedWh).toBeCloseTo(fortyEight.recommendedWh);
    expect(twelve.recommendedAhAtBus).toBeCloseTo(fortyEight.recommendedAhAtBus * 4);
  });

  it("rejects percentage points passed to the fraction-based engine", () => {
    expect(() => calculateUpsBatterySize({ ...defaults, upsEfficiency: 90 })).toThrow(/efficiency/i);
    expect(() => calculateUpsBatterySize({ ...defaults, usableFraction: 50 })).toThrow(/usable/i);
  });

  it("rejects invalid active Watts and VA fields", () => {
    expect(() => calculateUpsBatterySize({ ...defaults, loadW: 0 })).toThrow(/load/i);
    expect(() => calculateUpsBatterySize({ ...defaults, loadSource: "va", loadVA: 375, powerFactor: 0 })).toThrow(/power factor/i);
  });
});
