import { describe, it, expect } from "vitest";
import { calculateV2lRuntime } from "./engine";

describe("calculateV2lRuntime Engine", () => {
  it("calculates canonical 77 kWh benchmark at 88% efficiency on 350W load", () => {
    const res = calculateV2lRuntime({
      batteryCapacityKwh: 77,
      startingSocPercent: 90,
      drivingReservePercent: 20,
      averageLoadWatts: 350,
      v2lMaxOutputWatts: 3600,
      inverterEfficiencyPercent: 88,
    });

    // 77 * (0.90 - 0.20) * 0.88 = 47.432 -> 47.43 kWh AC
    // 47.432 / 0.35 = 135.5 hours -> 5.65 days
    expect(res.result.deliveredAcEnergyKwh).toBe(47.43);
    expect(res.result.totalRuntimeHours).toBe(135.5);
    expect(res.result.totalRuntimeDays).toBe(5.65);
    expect(res.result.reserveEnergyKwh).toBe(15.4);
    expect(res.result.preservedDrivingRangeMiles).toBe(51);
    expect(res.result.isOverloaded).toBe(false);
  });

  it("calculates exact reference table presets under canonical 88% efficiency", () => {
    // 58 kWh Standard Pack
    const res58 = calculateV2lRuntime({
      batteryCapacityKwh: 58,
      startingSocPercent: 90,
      drivingReservePercent: 20,
      averageLoadWatts: 350,
      inverterEfficiencyPercent: 88,
    });
    expect(res58.result.totalRuntimeHours).toBe(102.1);
    expect(res58.result.totalRuntimeDays).toBe(4.25);

    // 77.4 kWh Long Range
    const res774 = calculateV2lRuntime({
      batteryCapacityKwh: 77.4,
      startingSocPercent: 90,
      drivingReservePercent: 20,
      averageLoadWatts: 350,
      inverterEfficiencyPercent: 88,
    });
    expect(res774.result.totalRuntimeHours).toBe(136.2);
    expect(res774.result.totalRuntimeDays).toBe(5.68);

    // 99.8 kWh EV9 Pack
    const res998 = calculateV2lRuntime({
      batteryCapacityKwh: 99.8,
      startingSocPercent: 90,
      drivingReservePercent: 20,
      averageLoadWatts: 350,
      inverterEfficiencyPercent: 88,
    });
    expect(res998.result.totalRuntimeHours).toBe(175.7);
    expect(res998.result.totalRuntimeDays).toBe(7.32);

    // 131 kWh Extended Truck Pack
    const res131 = calculateV2lRuntime({
      batteryCapacityKwh: 131,
      startingSocPercent: 90,
      drivingReservePercent: 20,
      averageLoadWatts: 350,
      inverterEfficiencyPercent: 88,
    });
    expect(res131.result.totalRuntimeHours).toBe(230.6);
    expect(res131.result.totalRuntimeDays).toBe(9.61);
  });

  it("warns about V2L socket overload when load exceeds port limits", () => {
    const res = calculateV2lRuntime({
      batteryCapacityKwh: 77.4,
      startingSocPercent: 90,
      averageLoadWatts: 4200,
      v2lMaxOutputWatts: 3600,
    });

    expect(res.result.isOverloaded).toBe(true);
    expect(res.warnings.some((w) => w.code === "V2L_SOCKET_OVERLOAD")).toBe(true);
  });

  it("throws error on zero capacity or zero load", () => {
    expect(() =>
      calculateV2lRuntime({
        batteryCapacityKwh: 0,
        startingSocPercent: 90,
        averageLoadWatts: 350,
      })
    ).toThrow();
  });
});
