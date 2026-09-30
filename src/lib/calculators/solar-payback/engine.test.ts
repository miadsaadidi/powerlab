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
      inverterReplacementCost: 1800,
      inverterReplacementYear: 13,
    });

    expect(res.result.netSystemCost).toBe(14000);
    expect(res.result.taxCreditSavings).toBe(6000);
    // Year 1 savings is 9600 * 0.18 = $1,728/yr
    // Year 7 cumulative = $13,236. Remaining = $764. Year 8 = $2,123.
    // 7 + (764 / 2123) = 7.36 -> 7.4 years
    expect(res.result.paybackYears).toBe(7.36);
    expect(res.result.paybackMonths).toBe(4);
    expect(res.result.lifetime25YearGrossSavings).toBe(62861);
    expect(res.result.lifetime25YearInverterCost).toBe(1800);
    expect(res.result.lifetime25YearSavings).toBe(61061);
    expect(res.result.lifetimeNetBenefit).toBe(47061);
    expect(res.result.roiPercent).toBe(336);
    expect(res.result.yearlyCashFlows.length).toBe(25);

    // Verify mathematical integrity of the cash flow series
    let runningCumulative = 0;
    res.result.yearlyCashFlows.forEach((row, idx) => {
      expect(row.netAnnualSavings).toBe(row.annualSavings - row.inverterExpense);
      runningCumulative += row.netAnnualSavings;
      expect(row.cumulativeNetSavings).toBe(runningCumulative);
      if (idx === 12) {
        // Year 13 inverter expense check
        expect(row.inverterExpense).toBe(1800);
        expect(row.netAnnualSavings).toBe(row.annualSavings - 1800);
      }
    });

    expect(runningCumulative).toBe(res.result.lifetime25YearSavings);
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
    expect(res.result.lifetimeNetBenefit).toBeGreaterThan(50000);
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

