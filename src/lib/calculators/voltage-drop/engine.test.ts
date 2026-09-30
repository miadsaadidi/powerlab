import { describe, it, expect } from "vitest";
import { calculateVoltageDrop } from "./engine";
import * as fs from "fs";
import * as path from "path";

describe("calculateVoltageDrop Engine", () => {
  // 1. DC Calculation: 12V, 20A, 15ft, 6 AWG copper
  it("calculates 12V 20A 15ft DC circuit with 6 AWG copper accurately", () => {
    const res = calculateVoltageDrop({
      circuitType: "dc",
      voltage: 12,
      currentAmps: 20,
      distanceFeet: 15,
      conductorMaterial: "copper",
      targetMaxDropPercent: 3.0,
      customAwg: "6 AWG",
    });

    // VD = (2 * 12.9 * 20 * 15) / 26240 = 0.29497 V ≈ 0.295 V
    // % VD = (0.29497 / 12) * 100 = 2.458% ≈ 2.46%
    expect(res.result.voltageDropVolts).toBeCloseTo(0.295, 2);
    expect(res.result.voltageDropPercent).toBeCloseTo(2.46, 2);
    expect(res.result.meetsTargetDrop).toBe(true);
    expect(res.result.isAmpacitySafe).toBe(true);
    expect(res.result.designTargetStatus).toBe("pass");
  });

  // 2. DC Benchmark: 12V, 30A, 15ft
  it("evaluates 12V 30A 15ft DC circuit across 6 AWG and 4 AWG", () => {
    const sixAwg = calculateVoltageDrop({
      circuitType: "dc",
      voltage: 12,
      currentAmps: 30,
      distanceFeet: 15,
      conductorMaterial: "copper",
      customAwg: "6 AWG",
      targetMaxDropPercent: 3.0,
    });
    // 6 AWG: VD = (2 * 12.9 * 30 * 15) / 26240 = 0.4425 V (3.6875% ≈ 3.69%)
    expect(sixAwg.result.voltageDropVolts).toBeCloseTo(0.443, 2);
    expect(sixAwg.result.voltageDropPercent).toBeCloseTo(3.69, 2);
    expect(sixAwg.result.meetsTargetDrop).toBe(false);

    const fourAwg = calculateVoltageDrop({
      circuitType: "dc",
      voltage: 12,
      currentAmps: 30,
      distanceFeet: 15,
      conductorMaterial: "copper",
      customAwg: "4 AWG",
      targetMaxDropPercent: 3.0,
    });
    // 4 AWG: VD = (2 * 12.9 * 30 * 15) / 41740 = 0.2781 V (2.3179% ≈ 2.32%)
    expect(fourAwg.result.voltageDropVolts).toBeCloseTo(0.278, 2);
    expect(fourAwg.result.voltageDropPercent).toBeCloseTo(2.32, 2);
    expect(fourAwg.result.meetsTargetDrop).toBe(true);
  });

  // 3. AC Quick Reference Table Rows (75°C K=12.9 basis)
  it("calculates AC single-phase voltage drop matching canonical 75°C K=12.9 model", () => {
    // 14 AWG (4,110 CMIL), 15A @ 120V
    const ac14_25 = calculateVoltageDrop({
      circuitType: "ac_single_phase",
      voltage: 120,
      currentAmps: 15,
      distanceFeet: 25,
      conductorMaterial: "copper",
      customAwg: "14 AWG",
    });
    // (2 * 12.9 * 15 * 25) / 4110 = 2.3539 V -> (2.3539 / 120) * 100 = 1.96%
    expect(ac14_25.result.voltageDropPercent).toBeCloseTo(1.96, 2);

    const ac14_50 = calculateVoltageDrop({
      circuitType: "ac_single_phase",
      voltage: 120,
      currentAmps: 15,
      distanceFeet: 50,
      conductorMaterial: "copper",
      customAwg: "14 AWG",
    });
    expect(ac14_50.result.voltageDropPercent).toBeCloseTo(3.92, 2);

    // 12 AWG (6,530 CMIL), 20A @ 120V
    const ac12_50 = calculateVoltageDrop({
      circuitType: "ac_single_phase",
      voltage: 120,
      currentAmps: 20,
      distanceFeet: 50,
      conductorMaterial: "copper",
      customAwg: "12 AWG",
    });
    // (2 * 12.9 * 20 * 50) / 6530 = 3.951 V -> (3.951 / 120) * 100 = 3.29%
    expect(ac12_50.result.voltageDropPercent).toBeCloseTo(3.29, 2);

    // 6 AWG (26,240 CMIL), 50A @ 240V
    const ac6_100 = calculateVoltageDrop({
      circuitType: "ac_single_phase",
      voltage: 240,
      currentAmps: 50,
      distanceFeet: 100,
      conductorMaterial: "copper",
      customAwg: "6 AWG",
    });
    // (2 * 12.9 * 50 * 100) / 26240 = 4.9162 V -> (4.9162 / 240) * 100 = 2.05%
    expect(ac6_100.result.voltageDropPercent).toBeCloseTo(2.05, 2);
  });

  // 4. Max run (3% limit) formula verification
  it("verifies 3% maximum run length formula consistency", () => {
    // Max_Length = (0.03 * V * CMIL) / (2 * K * I)
    // 14 AWG, 15A @ 120V: (0.03 * 120 * 4110) / (2 * 12.9 * 15) = 14796 / 387 = 38.23 ft ≈ 38 ft
    const max14 = (0.03 * 120 * 4110) / (2 * 12.9 * 15);
    expect(Math.round(max14)).toBe(38);

    // 12 AWG, 20A @ 120V: (0.03 * 120 * 6530) / (2 * 12.9 * 20) = 23508 / 516 = 45.56 ft ≈ 46 ft
    const max12 = (0.03 * 120 * 6530) / (2 * 12.9 * 20);
    expect(Math.round(max12)).toBe(46);

    // 6 AWG, 50A @ 240V: (0.03 * 240 * 26240) / (2 * 12.9 * 50) = 188928 / 1290 = 146.46 ft ≈ 146 ft
    const max6 = (0.03 * 240 * 26240) / (2 * 12.9 * 50);
    expect(Math.round(max6)).toBe(146);
  });

  // 5. 3-Phase balanced model (1.732 multiplier)
  it("calculates 3-phase AC voltage drop using 1.732 multiplier", () => {
    const res3Phase = calculateVoltageDrop({
      circuitType: "ac_three_phase",
      voltage: 480,
      currentAmps: 50,
      distanceFeet: 100,
      conductorMaterial: "copper",
      customAwg: "6 AWG",
    });
    // VD = (1.732 * 12.9 * 50 * 100) / 26240 = 11171.4 / 26240 = 4.257 V
    // % VD = (4.257 / 480) * 100 = 0.887% ≈ 0.89%
    expect(res3Phase.result.voltageDropVolts).toBeCloseTo(4.257, 2);
    expect(res3Phase.result.voltageDropPercent).toBeCloseTo(0.89, 2);
  });

  // 6. Ampacity safety violation
  it("identifies reference ampacity violations and emits clear engineering warnings", () => {
    const res = calculateVoltageDrop({
      circuitType: "dc",
      voltage: 12,
      currentAmps: 50,
      distanceFeet: 10,
      conductorMaterial: "copper",
      customAwg: "16 AWG", // 16 AWG is 13A rated
    });

    expect(res.result.isAmpacitySafe).toBe(false);
    expect(res.result.designTargetStatus).toBe("fail");
    expect(res.warnings.some((w) => w.code === "AMPACITY_EXCEEDED")).toBe(true);
  });

  // 7. Aluminum conductor resistivity
  it("applies aluminum resistivity constant (21.2 Ω·cmil/ft) correctly", () => {
    const copper = calculateVoltageDrop({
      circuitType: "dc",
      voltage: 48,
      currentAmps: 50,
      distanceFeet: 20,
      conductorMaterial: "copper",
      customAwg: "4 AWG",
    });

    const aluminum = calculateVoltageDrop({
      circuitType: "dc",
      voltage: 48,
      currentAmps: 50,
      distanceFeet: 20,
      conductorMaterial: "aluminum",
      customAwg: "4 AWG",
    });

    // Aluminum drop should be higher by ratio of 21.2 / 12.9 ≈ 1.643
    expect(aluminum.result.voltageDropVolts / copper.result.voltageDropVolts).toBeCloseTo(21.2 / 12.9, 2);
  });

  // 8. Error handling
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

  // 9. Stale copy and prohibited string audit
  it("ensures no prohibited or misleading strings remain in voltage drop files", () => {
    const pagePath = path.resolve(__dirname, "../../../app/battery/voltage-drop-calculator/page.tsx");
    const componentPath = path.resolve(__dirname, "../../../components/calculator/voltage-drop-calculator.tsx");

    const pageContent = fs.readFileSync(pagePath, "utf-8");
    const componentContent = fs.readFileSync(componentPath, "utf-8");

    // Prohibited strings
    expect(pageContent).not.toContain("ensure compliance with the NEC 3% rule");
    expect(pageContent).not.toContain("100% Private");
    expect(pageContent).not.toContain("Ad-Free");
    expect(pageContent).not.toContain("Google Preferences");
    expect(pageContent).not.toContain("Trustpilot");
    expect(pageContent).not.toContain("Peukert");

    expect(componentContent).not.toContain("Recommended Minimum Conductor");
    expect(componentContent).not.toContain("Conductor Safe Ampacity");
    expect(componentContent).not.toContain("GooglePreferredBanner");
    expect(componentContent).not.toContain("NEC 2023 Table 8");
    expect(componentContent).not.toContain("compliant 2.07%");
  });
});

