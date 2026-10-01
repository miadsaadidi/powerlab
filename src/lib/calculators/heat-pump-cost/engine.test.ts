import { describe, it, expect } from "vitest";
import { calculateHeatPumpCost, BTU_PER_KWH } from "./engine";
import { QUICK_HEAT_PUMP_PRESETS, HEAT_PUMP_DEFAULTS } from "@/data/heat-pump-defaults";

describe("calculateHeatPumpCost Engine & Canonical Precision", () => {
  it("1. calculates heat pump electricity and cost accurately (50 MMBTU, COP 3.20, $0.1834/kWh)", () => {
    const res = calculateHeatPumpCost({
      annualHeatingDemandMmbtu: 50,
      heatPumpScop: 3.2,
      electricityRate: 0.1834,
      existingFuelType: "natural_gas",
      furnaceAfuePercent: 80,
      gasPricePerTherm: 1.45,
    });

    // 50,000,000 / (3.2 * 3412.142) = 4,579.24 kWh -> 4,579 kWh rounded
    expect(res.result.heatPumpTotalKwh).toBe(4579);
    // 4579.24 * 0.1834 = $839.83 -> rounds to $840 in integer display
    expect(res.result.heatPumpAnnualCost).toBe(839.83);
    expect(Math.round(res.result.heatPumpAnnualCost)).toBe(840);
  });

  it("2. calculates natural gas baseline accurately (50 MMBTU, 80% AFUE, $1.45/therm)", () => {
    const res = calculateHeatPumpCost({
      annualHeatingDemandMmbtu: 50,
      heatPumpScop: 3.2,
      electricityRate: 0.1834,
      existingFuelType: "natural_gas",
      furnaceAfuePercent: 80,
      gasPricePerTherm: 1.45,
    });

    // 50,000,000 / (100,000 * 0.80) = 625.0 Therms
    expect(res.result.existingFuelUnitsConsumed).toBe(625.0);
    // 625 * 1.45 = $906.25 -> rounds to $906 in integer display
    expect(res.result.existingSystemAnnualCost).toBe(906.25);
    expect(Math.round(res.result.existingSystemAnnualCost)).toBe(906);

    // Savings = 906.25 - 839.83 = $66.42 -> $66 in integer display
    expect(res.result.annualCostDifference).toBe(66.42);
    expect(Math.round(res.result.annualCostDifference)).toBe(66);
    expect(res.result.isHeatPumpCheaper).toBe(true);
  });

  it("3. calculates natural gas break-even rate accurately (gas $1.45, AFUE 80%, COP 3.0)", () => {
    const res = calculateHeatPumpCost({
      annualHeatingDemandMmbtu: 50,
      heatPumpScop: 3.0,
      electricityRate: 0.1834,
      existingFuelType: "natural_gas",
      furnaceAfuePercent: 80,
      gasPricePerTherm: 1.45,
    });

    // (1.45 / 100000) * 3412.142 * (3.0 / 0.80) = 0.185536... $/kWh (18.55¢/kWh)
    expect(res.result.breakEvenElectricityRate).toBeCloseTo(0.1855, 3);
  });

  it("4. calculates propane replacement scenario (50 MMBTU, 80% AFUE, $3.20/gal, COP 3.20)", () => {
    const res = calculateHeatPumpCost({
      annualHeatingDemandMmbtu: 50,
      heatPumpScop: 3.2,
      electricityRate: 0.1834,
      existingFuelType: "propane",
      furnaceAfuePercent: 80,
      propanePricePerGallon: 3.20,
    });

    // 50,000,000 / (91,500 * 0.80) = 683.06 gal
    expect(res.result.existingFuelUnitsConsumed).toBe(683.1);
    // 683.06 * 3.20 = $2,185.79 -> $2,186
    expect(Math.round(res.result.existingSystemAnnualCost)).toBe(2186);
    expect(res.result.isHeatPumpCheaper).toBe(true);
    // Savings = 2,185.79 - 839.83 = $1,345.96 -> $1,346
    expect(Math.round(res.result.annualCostDifference)).toBe(1346);
  });

  it("5. calculates heating oil replacement scenario (60 MMBTU, 80% AFUE, $4.10/gal, COP 3.0)", () => {
    const res = calculateHeatPumpCost({
      annualHeatingDemandMmbtu: 60,
      heatPumpScop: 3.0,
      electricityRate: 0.1834,
      existingFuelType: "heating_oil",
      furnaceAfuePercent: 80,
      oilPricePerGallon: 4.10,
    });

    // 60,000,000 / (138,500 * 0.80) = 541.5 gal
    expect(res.result.existingFuelUnitsConsumed).toBe(541.5);
    // 541.516 * 4.10 = $2,220.22
    expect(res.result.existingSystemAnnualCost).toBe(2220.22);
    expect(res.result.isHeatPumpCheaper).toBe(true);
  });

  it("6. calculates electric resistance baseboard comparison (50 MMBTU, COP 1.0 vs Heat Pump COP 3.2)", () => {
    const res = calculateHeatPumpCost({
      annualHeatingDemandMmbtu: 50,
      heatPumpScop: 3.2,
      electricityRate: 0.1834,
      existingFuelType: "electric_baseboard",
      furnaceAfuePercent: 100,
    });

    // 50,000,000 / 3,412.142 = 14,653.55 kWh -> 14,654 kWh
    expect(Math.round(res.result.existingFuelUnitsConsumed)).toBe(14654);
    // Baseboard cost = 14653.55 * 0.1834 = $2,687.46 -> $2,687
    expect(Math.round(res.result.existingSystemAnnualCost)).toBe(2687);
    // Savings = 2,687.46 - 839.83 = $1,847.63 -> $1,848
    expect(Math.round(res.result.annualCostDifference)).toBe(1848);
  });

  it("7. verifies consistency invariant: Savings = Baseline Cost - Heat Pump Cost", () => {
    const fuels = ["natural_gas", "propane", "heating_oil", "electric_baseboard"] as const;
    for (const fuel of fuels) {
      const res = calculateHeatPumpCost({
        annualHeatingDemandMmbtu: 50,
        heatPumpScop: 3.2,
        electricityRate: 0.1834,
        existingFuelType: fuel,
        furnaceAfuePercent: 80,
        gasPricePerTherm: 1.45,
        propanePricePerGallon: 3.20,
        oilPricePerGallon: 4.10,
      });

      const calculatedDiff = Number((res.result.existingSystemAnnualCost - res.result.heatPumpAnnualCost).toFixed(2));
      expect(res.result.annualCostDifference).toBe(calculatedDiff);
    }
  });

  it("8. verifies preset consistency and defaults", () => {
    for (const preset of QUICK_HEAT_PUMP_PRESETS) {
      expect(preset.label).toContain(`${preset.mmbtu} MMBTU`);
      expect(preset.label).toMatch(new RegExp(`${preset.scop}(\\.0)? COP`));
    }

    const defaultPreset = QUICK_HEAT_PUMP_PRESETS.find(
      (p) =>
        p.mmbtu === HEAT_PUMP_DEFAULTS.annualHeatingDemandMmbtu &&
        p.scop === HEAT_PUMP_DEFAULTS.heatPumpScop &&
        p.fuel === HEAT_PUMP_DEFAULTS.existingFuelType
    );
    expect(defaultPreset).toBeDefined();
  });

  it("9. throws error for invalid non-positive inputs", () => {
    expect(() =>
      calculateHeatPumpCost({
        annualHeatingDemandMmbtu: 0,
        heatPumpScop: 3.0,
        electricityRate: 0.18,
        existingFuelType: "natural_gas",
        furnaceAfuePercent: 80,
      })
    ).toThrow();

    expect(() =>
      calculateHeatPumpCost({
        annualHeatingDemandMmbtu: 50,
        heatPumpScop: 0,
        electricityRate: 0.18,
        existingFuelType: "natural_gas",
        furnaceAfuePercent: 80,
      })
    ).toThrow();
  });
});

