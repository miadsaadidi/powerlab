import { describe, it, expect } from "vitest";
import { calculateSolarPayback } from "./engine";

describe("calculateSolarPayback Engine", () => {
  it("calculates 8kW suburban home payback period accurately", () => {
    const res = calculateSolarPayback({
      grossCost: 20000,
      incentivePercent: 30, // Net cost = $14,000
      annualProductionKwh: 9600,
      electricityRate: 0.18,
      utilityInflationPercent: 3.5,
      panelDegradationPercent: 0.5,
    });

    expect(res.result.netSystemCost).toBe(14000);
    expect(res.result.taxCreditSavings).toBe(6000);
    // Year 1 savings is ~9600 * 0.18 = $1,728/yr
    // 14000 / 1728 = ~7.4 to 7.8 years with inflation and inverter cost
    expect(res.result.paybackYears).toBeGreaterThan(6.0);
    expect(res.result.paybackYears).toBeLessThan(9.0);
    expect(res.result.lifetimeNetProfit).toBeGreaterThan(30000);
    expect(res.result.roiPercent).toBeGreaterThan(200);
    expect(res.result.yearlyCashFlows.length).toBe(25);
  });

  it("handles high-yield Sunbelt solar correctly", () => {
    const res = calculateSolarPayback({
      grossCost: 19000,
      incentivePercent: 30,
      annualProductionKwh: 12800,
      electricityRate: 0.22,
    });

    // Net cost = $13,300, Year 1 savings = 12800 * 0.22 = $2,816/yr -> Payback ~4.5 - 5.5 yrs
    expect(res.result.paybackYears).toBeLessThan(6.0);
  });

  it("throws error on negative or zero gross cost", () => {
    expect(() =>
      calculateSolarPayback({
        grossCost: 0,
        annualProductionKwh: 9600,
        electricityRate: 0.18,
      })
    ).toThrow();
  });
});
