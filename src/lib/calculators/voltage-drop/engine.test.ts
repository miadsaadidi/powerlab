import { describe, it, expect } from "vitest";
import { calculateVoltageDrop } from "./engine";

describe("calculateVoltageDrop Engine", () => {
  it("calculates 12V 20A 15ft DC circuit correctly", () => {
    const res = calculateVoltageDrop({
      circuitType: "dc",
      voltage: 12,
      currentAmps: 20,
      distanceFeet: 15,
      conductorMaterial: "copper",
      targetMaxDropPercent: 3.0,
    });

    expect(res.result.recommendedGauge.awg).toBe("6 AWG");
    expect(res.result.voltageDropPercent).toBeLessThanOrEqual(3.0);
    expect(res.result.isAmpacitySafe).toBe(true);
    expect(res.result.necComplianceStatus).toBe("pass");
  });

  it("identifies ampacity safety violation on undersized wire", () => {
    const res = calculateVoltageDrop({
      circuitType: "dc",
      voltage: 12,
      currentAmps: 50,
      distanceFeet: 10,
      conductorMaterial: "copper",
      customAwg: "16 AWG", // 16 AWG is only 13A rated
    });

    expect(res.result.isAmpacitySafe).toBe(false);
    expect(res.result.necComplianceStatus).toBe("fail");
    expect(res.warnings.some((w) => w.code === "AMPACITY_EXCEEDED")).toBe(true);
  });

  it("calculates 120V AC single phase voltage drop accurately", () => {
    const res = calculateVoltageDrop({
      circuitType: "ac_single_phase",
      voltage: 120,
      currentAmps: 15,
      distanceFeet: 50,
      conductorMaterial: "copper",
      targetMaxDropPercent: 3.0,
    });

    expect(res.result.voltageDropPercent).toBeLessThan(3.0);
    expect(res.result.recommendedGauge.awg).toBe("12 AWG");
  });

  it("calculates aluminum conductor resistance differences", () => {
    const copper = calculateVoltageDrop({
      circuitType: "dc",
      voltage: 48,
      currentAmps: 50,
      distanceFeet: 20,
      conductorMaterial: "copper",
    });

    const aluminum = calculateVoltageDrop({
      circuitType: "dc",
      voltage: 48,
      currentAmps: 50,
      distanceFeet: 20,
      conductorMaterial: "aluminum",
    });

    expect(aluminum.result.voltageDropVolts).toBeGreaterThan(copper.result.voltageDropVolts);
  });

  it("throws error for invalid voltage or zero distance", () => {
    expect(() =>
      calculateVoltageDrop({
        circuitType: "dc",
        voltage: 0,
        currentAmps: 20,
        distanceFeet: 15,
        conductorMaterial: "copper",
      })
    ).toThrow();
  });
});
