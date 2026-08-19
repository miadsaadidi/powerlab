import { describe, it, expect } from "vitest";
import { calculateSolarChargeController } from "./engine";

describe("calculateSolarChargeController Engine", () => {
  it("sizes MPPT controller for 800W 2S2P 24V battery correctly", () => {
    const res = calculateSolarChargeController({
      technology: "mppt",
      panelWatts: 200,
      panelCount: 4,
      batteryVoltage: 24,
      panelVoc: 24.3,
      panelIsc: 10.5,
      seriesCount: 2,
      parallelCount: 2,
      minWinterTempCelsius: -10,
    });

    // 800W total
    expect(res.result.totalArrayWatts).toBe(800);
    // 2S Voc at 25C = 48.6V
    expect(res.result.nominalArrayVoc25C).toBe(48.6);
    // Cold Voc at -10C (35C delta @ 0.33%/C = +11.55%) -> 48.6 * 1.1155 = 54.2V
    expect(res.result.worstCaseColdVoc).toBeGreaterThan(50);
    expect(res.result.worstCaseColdVoc).toBeLessThan(60);
    // Max voltage rating should be 75V or 100V
    expect(res.result.recommendedMaxVoltageRating).toBe(75);
    // Required amps into 24V battery = (800W / 24V) * 1.25 = 41.6A -> 50A controller
    expect(res.result.recommendedControllerAmps).toBe(50);
    expect(res.result.recommendedModelClass).toContain("MPPT 75V / 50A");
  });

  it("warns about PWM voltage mismatch on high voltage panels", () => {
    const res = calculateSolarChargeController({
      technology: "pwm",
      panelWatts: 400,
      panelCount: 1,
      batteryVoltage: 12,
      panelVoc: 49.5,
      panelIsc: 10.2,
      seriesCount: 1,
      parallelCount: 1,
      minWinterTempCelsius: 0,
    });

    expect(res.warnings.some((w) => w.code === "PWM_VOLTAGE_MISMATCH")).toBe(true);
  });

  it("throws error for invalid panel count or zero Voc", () => {
    expect(() =>
      calculateSolarChargeController({
        technology: "mppt",
        panelWatts: 200,
        panelCount: 0,
        batteryVoltage: 12,
        panelVoc: 0,
        panelIsc: 10.5,
        seriesCount: 1,
        parallelCount: 1,
      })
    ).toThrow();
  });
});
