import { describe, expect, it } from "vitest";
import { calculateApplianceWattage, type ApplianceWattageInput } from "./engine";
import * as fs from "fs";
import * as path from "path";

const base = (overrides: Partial<ApplianceWattageInput> = {}): ApplianceWattageInput => ({
  source: { sourceMode: "label-watts", unitRunningWatts: 100 },
  quantity: 1,
  runtimeHours: 4,
  dutyCycle: 1,
  startupSource: "unknown",
  costEnabled: false,
  ...overrides,
});

describe("Appliance Wattage Calculator engine", () => {
  // 1. V × A × PF running-power calculation
  it("calculates running power using V × A × PF and separates apparent VA from real W", () => {
    const result = calculateApplianceWattage(base({
      source: {
        sourceMode: "label-volts-amps",
        volts: 120,
        amps: 7.2,
        powerFactor: 0.82,
      },
    }));
    // Apparent power S = 120 * 7.2 = 864 VA
    expect(result.apparentVA).toBe(864);
    // Real power P = 120 * 7.2 * 0.82 = 708.48 W
    expect(result.unitRunningWatts).toBeCloseTo(708.48, 2);
    expect(result.totalRunningWatts).toBeCloseTo(708.48, 2);
  });

  // 2. V × LRA starting-VA calculation
  it("calculates starting apparent power using V × LRA", () => {
    const result = calculateApplianceWattage(base({
      quantity: 1,
      startupSource: "lra-amps",
      lraVolts: 120,
      lraAmps: 38,
      lraPowerFactor: 0.50,
    }));
    // Starting apparent surge = 120 * 38 = 4,560 VA (4.56 kVA)
    expect(result.unitStartupVA).toBe(4560);
    expect(result.totalStartupVA).toBe(4560);
    // Starting real watts with 0.50 starting PF assumption = 4560 * 0.50 = 2280 W
    expect(result.unitStartupWatts).toBe(2280);
    expect(result.totalStartupWatts).toBe(2280);
    expect(result.startupDataSource).toBe("lra-amps");
  });

  // 3. Duty-cycle energy calculation: E_kWh = (Running_W × Runtime_Hours × Duty_Cycle) / 1000
  it("calculates daily energy according to Running_W × Hours × Duty_Cycle / 1000", () => {
    const result = calculateApplianceWattage(base({
      source: { sourceMode: "label-watts", unitRunningWatts: 708.48 },
      runtimeHours: 1,
      dutyCycle: 0.20,
    }));
    // 708.48 * 1 * 0.20 / 1000 = 0.141696 kWh ≈ 0.1417 kWh
    expect(result.energyWh).toBeCloseTo(141.696, 2);
    expect(result.energyKWh).toBeCloseTo(0.1417, 3);
  });

  // 4. 100% duty-cycle behavior
  it("computes full energy without reduction when duty cycle is 100% (1.0)", () => {
    const result = calculateApplianceWattage(base({
      source: { sourceMode: "label-watts", unitRunningWatts: 500 },
      runtimeHours: 8,
      dutyCycle: 1.0,
    }));
    expect(result.energyWh).toBe(4000);
    expect(result.energyKWh).toBe(4.0);
  });

  // 5. 0% duty-cycle behavior
  it("computes zero energy when duty cycle is 0% while preserving connected running watts", () => {
    const result = calculateApplianceWattage(base({
      source: { sourceMode: "label-watts", unitRunningWatts: 500 },
      runtimeHours: 8,
      dutyCycle: 0,
    }));
    expect(result.totalRunningWatts).toBe(500);
    expect(result.energyWh).toBe(0);
    expect(result.energyKWh).toBe(0);
  });

  // 6. Custom appliance values & quantity scaling
  it("scales running and starting power by quantity correctly for custom inputs", () => {
    const result = calculateApplianceWattage(base({
      source: { sourceMode: "label-watts", unitRunningWatts: 250 },
      quantity: 4,
      runtimeHours: 6,
      dutyCycle: 0.5,
      startupSource: "explicit-watts",
      startupWatts: 750,
      costEnabled: true,
      pricePerKWh: 0.1834,
    }));
    expect(result.unitRunningWatts).toBe(250);
    expect(result.totalRunningWatts).toBe(1000);
    expect(result.unitStartupWatts).toBe(750);
    expect(result.totalStartupWatts).toBe(3000);
    // Total energy: 1000 W * 6 hrs * 0.5 duty / 1000 = 3 kWh
    expect(result.energyKWh).toBe(3.0);
    // Cost: 3 kWh * 0.1834 = $0.5502
    expect(result.optionalCost).toBeCloseTo(0.5502, 4);
  });

  // 7. LRA missing → starting surge remains unevaluated
  it("leaves starting surge unevaluated when LRA or startup data is unknown", () => {
    const result = calculateApplianceWattage(base({
      startupSource: "unknown",
    }));
    expect(result.unitStartupWatts).toBeNull();
    expect(result.totalStartupWatts).toBeNull();
    expect(result.unitStartupVA).toBeNull();
    expect(result.totalStartupVA).toBeNull();
    expect(result.startupDataSource).toBe("unknown");
  });

  // 8. Distinguishes units W, VA, kW, and kVA
  it("distinguishes apparent power (VA) and real power (W) across unit and total fields", () => {
    const result = calculateApplianceWattage(base({
      source: {
        sourceMode: "label-volts-amps",
        volts: 240,
        amps: 10,
        powerFactor: 0.85,
      },
      quantity: 2,
      startupSource: "lra-amps",
      lraVolts: 240,
      lraAmps: 50,
      lraPowerFactor: 0.50,
    }));
    // Running apparent: 240 * 10 = 2400 VA
    expect(result.apparentVA).toBe(2400);
    // Running real: 2400 * 0.85 = 2040 W
    expect(result.unitRunningWatts).toBe(2040);
    expect(result.totalRunningWatts).toBe(4080);
    // Starting apparent: 240 * 50 = 12000 VA (12.0 kVA)
    expect(result.unitStartupVA).toBe(12000);
    expect(result.totalStartupVA).toBe(24000);
    // Starting real: 12000 * 0.50 = 6000 W
    expect(result.unitStartupWatts).toBe(6000);
    expect(result.totalStartupWatts).toBe(12000);
  });

  // 9. Benchmark worked example verification
  it("matches the 0.5 HP sump pump worked example benchmark exactly", () => {
    // 120V × 7.2A × 0.82 PF = 708.48 W ≈ 709 W
    // 120V × 38A LRA = 4,560 VA = 4.56 kVA
    // 20% duty cycle, 1 hour scheduled: 708.48 × 1 × 0.20 / 1000 = 0.141696 kWh
    // Cost at $0.1834/kWh = 0.141696 × 0.1834 ≈ $0.025987 ≈ $0.0260
    const pumpResult = calculateApplianceWattage(base({
      source: {
        sourceMode: "label-volts-amps",
        volts: 120,
        amps: 7.2,
        powerFactor: 0.82,
      },
      quantity: 1,
      runtimeHours: 1,
      dutyCycle: 0.20,
      startupSource: "lra-amps",
      lraVolts: 120,
      lraAmps: 38,
      lraPowerFactor: 0.50,
      costEnabled: true,
      pricePerKWh: 0.1834,
    }));

    expect(pumpResult.apparentVA).toBe(864);
    expect(Math.round(pumpResult.unitRunningWatts)).toBe(708);
    expect(pumpResult.unitStartupVA).toBe(4560);
    expect(pumpResult.energyKWh).toBeCloseTo(0.1417, 3);
    expect(pumpResult.optionalCost).toBeCloseTo(0.0260, 3);
  });

  // 10. Audit for forbidden stale strings in source files
  it("ensures no stale 'Governing Standard' or '100% Private & Ad-Free' strings remain on page files", () => {
    const pagePath = path.resolve(__dirname, "../../../app/home-energy/appliance-wattage-calculator/page.tsx");
    const componentPath = path.resolve(__dirname, "../../../components/calculator/appliance-wattage-calculator.tsx");

    const pageContent = fs.readFileSync(pagePath, "utf-8");
    const componentContent = fs.readFileSync(componentPath, "utf-8");

    // Must not contain forbidden strings
    expect(pageContent).not.toMatch(/Governing Standard(?!s & Model Basis)/);
    expect(pageContent).not.toContain("100% Private");
    expect(pageContent).not.toContain("Ad-Free");
    expect(pageContent).not.toContain("Google Preferences");
    expect(pageContent).not.toContain("Trustpilot");
    expect(pageContent).not.toContain("Engineering-grade");

    expect(componentContent).not.toContain("100% Private");
    expect(componentContent).not.toContain("Ad-Free");
    expect(componentContent).not.toContain("GooglePreferredBanner");
  });
});

