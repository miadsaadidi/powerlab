import { describe, it, expect } from "vitest";
import { calculateSolarChargeController } from "./engine";

describe("calculateSolarChargeController Engine", () => {
  it("sizes MPPT controller for 800W 4S (4 x 200W, Voc=24.3V, -10C, 24V battery) correctly matching QA benchmark", () => {
    const res = calculateSolarChargeController({
      technology: "mppt",
      panelWatts: 200,
      panelCount: 4,
      batteryVoltage: 24,
      panelVoc: 24.3,
      panelIsc: 10.5,
      seriesCount: 4,
      parallelCount: 1,
      minWinterTempCelsius: -10,
      tempCoeffPercentPerCelsius: -0.33,
    });

    // 800W total
    expect(res.result.totalArrayWatts).toBe(800);
    // 4S Voc at 25C = 97.2V
    expect(res.result.nominalArrayVoc25C).toBe(97.2);
    // Cold Voc at -10C: 4 * 24.3 * [1 + 0.0033 * (25 - (-10))] = 97.2 * 1.1155 = 108.4V
    expect(res.result.worstCaseColdVoc).toBe(108.4);
    // Max voltage rating requires 150V controller
    expect(res.result.recommendedMaxVoltageRating).toBe(150);
    // Operating charging current = 800W / 24V = 33.3A
    expect(res.result.operatingChargeCurrentAmps).toBe(33.3);
    // Code continuous current (125% factor) = (800W / 24V) * 1.25 = 41.7A -> 50A controller rating
    expect(res.result.requiredChargeCurrentAmps).toBe(41.7);
    expect(res.result.recommendedControllerAmps).toBe(50);
    expect(res.result.recommendedModelClass).toBe("MPPT 150V / 50A Controller");
  });

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
      tempCoeffPercentPerCelsius: -0.33,
    });

    // 800W total
    expect(res.result.totalArrayWatts).toBe(800);
    // 2S Voc at 25C = 48.6V
    expect(res.result.nominalArrayVoc25C).toBe(48.6);
    // Cold Voc at -10C: 2 * 24.3 * 1.1155 = 54.2V
    expect(res.result.worstCaseColdVoc).toBe(54.2);
    // Max voltage rating is 75V
    expect(res.result.recommendedMaxVoltageRating).toBe(75);
    expect(res.result.operatingChargeCurrentAmps).toBe(33.3);
    expect(res.result.recommendedControllerAmps).toBe(50);
    expect(res.result.recommendedModelClass).toBe("MPPT 75V / 50A Controller");
  });

  it("handles negative vs positive temperature coefficient values consistently", () => {
    const resNegative = calculateSolarChargeController({
      technology: "mppt",
      panelWatts: 400,
      panelCount: 2,
      batteryVoltage: 24,
      panelVoc: 40,
      panelIsc: 10,
      seriesCount: 2,
      parallelCount: 1,
      minWinterTempCelsius: -5,
      tempCoeffPercentPerCelsius: -0.30,
    });

    const resPositive = calculateSolarChargeController({
      technology: "mppt",
      panelWatts: 400,
      panelCount: 2,
      batteryVoltage: 24,
      panelVoc: 40,
      panelIsc: 10,
      seriesCount: 2,
      parallelCount: 1,
      minWinterTempCelsius: -5,
      tempCoeffPercentPerCelsius: 0.30,
    });

    expect(resNegative.result.worstCaseColdVoc).toBe(resPositive.result.worstCaseColdVoc);
    // 2 * 40 * [1 + 0.0030 * 30] = 80 * 1.09 = 87.2V
    expect(resNegative.result.worstCaseColdVoc).toBe(87.2);
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

  it("calculates 800W on 12V, 24V, and 48V systems with 1.25 design factor and selects compliant controller ratings", () => {
    // 12V System: (800W / 12V) * 1.25 = 83.3A -> Requires 100A controller (80A is insufficient)
    const res12V = calculateSolarChargeController({
      technology: "mppt",
      panelWatts: 200,
      panelCount: 4,
      batteryVoltage: 12,
      panelVoc: 24.3,
      panelIsc: 10.5,
      seriesCount: 2,
      parallelCount: 2,
      minWinterTempCelsius: -10,
    });
    expect(res12V.result.operatingChargeCurrentAmps).toBe(66.7);
    expect(res12V.result.requiredChargeCurrentAmps).toBe(83.3);
    expect(res12V.result.recommendedControllerAmps).toBe(100);
    expect(res12V.result.recommendedControllerAmps).toBeGreaterThanOrEqual(res12V.result.requiredChargeCurrentAmps);

    // 24V System: (800W / 24V) * 1.25 = 41.7A -> Requires 50A controller (40A is insufficient)
    const res24V = calculateSolarChargeController({
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
    expect(res24V.result.operatingChargeCurrentAmps).toBe(33.3);
    expect(res24V.result.requiredChargeCurrentAmps).toBe(41.7);
    expect(res24V.result.recommendedControllerAmps).toBe(50);
    expect(res24V.result.recommendedControllerAmps).toBeGreaterThanOrEqual(res24V.result.requiredChargeCurrentAmps);

    // 48V System: (800W / 48V) * 1.25 = 20.8A -> Requires 30A controller (20A is insufficient)
    const res48V = calculateSolarChargeController({
      technology: "mppt",
      panelWatts: 200,
      panelCount: 4,
      batteryVoltage: 48,
      panelVoc: 24.3,
      panelIsc: 10.5,
      seriesCount: 2,
      parallelCount: 2,
      minWinterTempCelsius: -10,
    });
    expect(res48V.result.operatingChargeCurrentAmps).toBe(16.7);
    expect(res48V.result.requiredChargeCurrentAmps).toBe(20.8);
    expect(res48V.result.recommendedControllerAmps).toBe(30);
    expect(res48V.result.recommendedControllerAmps).toBeGreaterThanOrEqual(res48V.result.requiredChargeCurrentAmps);
  });

  it("calculates cold Voc with known negative βVoc and requires 250V controller class when cold Voc exceeds 150V", () => {
    // 4 modules in series with Voc=40V each at -20°C with βVoc = -0.30%/°C
    // ΔT = 25 - (-20) = 45°C. Multiplier = 1 + (0.30/100) * 45 = 1.135.
    // 4 * 40 * 1.135 = 160 * 1.135 = 181.6V (exceeds 150V -> requires 250V rating)
    const res = calculateSolarChargeController({
      technology: "mppt",
      panelWatts: 400,
      panelCount: 4,
      batteryVoltage: 48,
      panelVoc: 40,
      panelIsc: 10,
      seriesCount: 4,
      parallelCount: 1,
      minWinterTempCelsius: -20,
      tempCoeffPercentPerCelsius: -0.30,
    });

    expect(res.result.nominalArrayVoc25C).toBe(160);
    expect(res.result.worstCaseColdVoc).toBe(181.6);
    expect(res.result.recommendedMaxVoltageRating).toBe(250);
    expect(res.result.worstCaseColdVoc).toBeLessThan(res.result.recommendedMaxVoltageRating);
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

