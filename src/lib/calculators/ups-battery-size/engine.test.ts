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
  it("calculates the canonical 375 Wh / 31.25 Ah @ 12V example correctly", () => {
    const result = calculateUpsBatterySize({
      loadSource: "watts",
      loadW: 300,
      runtimeHours: 0.5,
      busVoltage: 12,
      upsEfficiency: 0.88,
      usableFraction: 0.5,
      batteryHealth: 1.0,
      designMargin: 0.1,
    }).result;

    expect(result.loadEnergyWh).toBeCloseTo(150);
    expect(result.batteryEnergyBeforeReserveWh).toBeCloseTo(150 / 0.88);
    expect(result.minimumNominalWh).toBeCloseTo(150 / (0.88 * 0.5));
    expect(result.recommendedWh).toBeCloseTo(375, 2);
    expect(result.recommendedAhAtBus).toBeCloseTo(31.25, 2);
  });

  it("calculates reference matrix benchmark points accurately", () => {
    // 100W load at 90% efficiency, 50% usable fraction, 10% margin, 100% health
    const matrix100W_15m = calculateUpsBatterySize({ ...defaults, loadW: 100, runtimeHours: 15 / 60 }).result;
    expect(matrix100W_15m.recommendedWh).toBeCloseTo(61.11, 1);

    const matrix100W_30m = calculateUpsBatterySize({ ...defaults, loadW: 100, runtimeHours: 30 / 60 }).result;
    expect(matrix100W_30m.recommendedWh).toBeCloseTo(122.22, 1);

    const matrix100W_60m = calculateUpsBatterySize({ ...defaults, loadW: 100, runtimeHours: 60 / 60 }).result;
    expect(matrix100W_60m.recommendedWh).toBeCloseTo(244.44, 1);

    // 300W load
    const matrix300W_15m = calculateUpsBatterySize({ ...defaults, loadW: 300, runtimeHours: 15 / 60 }).result;
    expect(matrix300W_15m.recommendedWh).toBeCloseTo(183.33, 1);

    const matrix300W_30m = calculateUpsBatterySize({ ...defaults, loadW: 300, runtimeHours: 30 / 60 }).result;
    expect(matrix300W_30m.recommendedWh).toBeCloseTo(366.67, 1);

    const matrix300W_60m = calculateUpsBatterySize({ ...defaults, loadW: 300, runtimeHours: 60 / 60 }).result;
    expect(matrix300W_60m.recommendedWh).toBeCloseTo(733.33, 1);

    // 600W load
    const matrix600W_15m = calculateUpsBatterySize({ ...defaults, loadW: 600, runtimeHours: 15 / 60 }).result;
    expect(matrix600W_15m.recommendedWh).toBeCloseTo(366.67, 1);

    const matrix600W_30m = calculateUpsBatterySize({ ...defaults, loadW: 600, runtimeHours: 30 / 60 }).result;
    expect(matrix600W_30m.recommendedWh).toBeCloseTo(733.33, 1);

    const matrix600W_60m = calculateUpsBatterySize({ ...defaults, loadW: 600, runtimeHours: 60 / 60 }).result;
    expect(matrix600W_60m.recommendedWh).toBeCloseTo(1466.67, 1);

    // 1200W load
    const matrix1200W_15m = calculateUpsBatterySize({ ...defaults, loadW: 1200, runtimeHours: 15 / 60, busVoltage: 48 }).result;
    expect(matrix1200W_15m.recommendedWh).toBeCloseTo(733.33, 1);
    expect(matrix1200W_15m.recommendedAhAtBus).toBeCloseTo(15.28, 1);

    const matrix1200W_30m = calculateUpsBatterySize({ ...defaults, loadW: 1200, runtimeHours: 30 / 60, busVoltage: 48 }).result;
    expect(matrix1200W_30m.recommendedWh).toBeCloseTo(1466.67, 1);
    expect(matrix1200W_30m.recommendedAhAtBus).toBeCloseTo(30.56, 1);

    const matrix1200W_60m = calculateUpsBatterySize({ ...defaults, loadW: 1200, runtimeHours: 60 / 60, busVoltage: 48 }).result;
    expect(matrix1200W_60m.recommendedWh).toBeCloseTo(2933.33, 1);
    expect(matrix1200W_60m.recommendedAhAtBus).toBeCloseTo(61.11, 1);
  });

  it("calculates valid series and parallel module counts", () => {
    // 300W for 30m requires ~366.67 Wh.
    // Bus voltage = 24V, Module = 12V 9Ah (108 Wh per module).
    // Series count = 24V / 12V = 2 modules per string (216 Wh per string).
    // Parallel strings = ceil(366.67 / 216) = 2 strings.
    // Total modules = 2 × 2 = 4 modules (432 Wh installed).
    const withModule = calculateUpsBatterySize({
      ...defaults,
      loadW: 300,
      runtimeHours: 0.5,
      busVoltage: 24,
      module: { moduleVoltage: 12, moduleAh: 9 },
    }).result;

    expect(withModule.moduleConfiguration).not.toBeNull();
    expect(withModule.moduleConfiguration?.seriesCount).toBe(2);
    expect(withModule.moduleConfiguration?.parallelStrings).toBe(2);
    expect(withModule.moduleConfiguration?.totalModules).toBe(4);
    expect(withModule.moduleConfiguration?.installedNominalWh).toBe(432);
    expect(withModule.moduleConfiguration?.installedNominalWh).toBeGreaterThanOrEqual(withModule.recommendedWh);
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
