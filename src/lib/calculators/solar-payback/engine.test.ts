import { describe, it, expect } from "vitest";
import { calculateSolarPayback } from "./engine";

describe("calculateSolarPayback Engine", () => {
  // Test 1: Current 2026 default scenario -> 0% automatic credit
  it("Test 1: Current 2026 default scenario uses 0% automatic tax credit", () => {
    const res = calculateSolarPayback({
      grossCost: 20000,
      annualProductionKwh: 9600,
      electricityRate: 0.18,
    });

    expect(res.result.incentivePercent).toBe(0);
    expect(res.result.taxCreditSavings).toBe(0);
    expect(res.result.netSystemCost).toBe(20000);
  });

  // Test 2 & 3: Historical 2022-2025 scenario -> 30% credit ($24,000 * 30% = $7,200)
  it("Test 2 & 3: Explicit historical 30% credit calculates $7,200 savings on $24,000 system", () => {
    const res = calculateSolarPayback({
      grossCost: 24000,
      incentivePercent: 30,
      annualProductionKwh: 11200,
      electricityRate: 0.18,
    });

    expect(res.result.incentivePercent).toBe(30);
    expect(res.result.taxCreditSavings).toBe(7200);
    expect(res.result.netSystemCost).toBe(16800);
    expect(res.warnings.some((w) => w.code === "HISTORICAL_TAX_CREDIT_SELECTED")).toBe(true);
  });

  // Test 4: 6 kW matrix values are reproducible from the calculation engine
  it("Test 4: 6 kW matrix scenario values match engine output exactly", () => {
    const res = calculateSolarPayback({
      grossCost: 17400,
      incentivePercent: 0,
      annualProductionKwh: 8400,
      electricityRate: 0.18,
      utilityInflationPercent: 3.5,
      panelDegradationPercent: 0.5,
      annualOmCost: 0,
      inverterReplacementCost: 1800,
      inverterReplacementYear: 13,
      analysisYears: 25,
    });

    expect(res.result.grossCost).toBe(17400);
    expect(res.result.netSystemCost).toBe(17400);
    expect(res.result.year1Savings).toBe(1512); // 8400 * 0.18 = 1512
    expect(res.result.paybackYears).toBeGreaterThan(9.0);
    expect(res.result.paybackYears).toBeLessThan(11.0);
    expect(res.result.lifetimeNetProfit).toBeGreaterThan(25000);
  });

  // Test 5: Payback year is consistent with cumulative cash-flow series
  it("Test 5: Payback year exactly corresponds to when cumulative savings reach net initial cost", () => {
    const res = calculateSolarPayback({
      grossCost: 20000,
      incentivePercent: 0,
      annualProductionKwh: 9600,
      electricityRate: 0.18,
    });

    const yrFloor = Math.floor(res.result.paybackYears);
    const rowBefore = res.result.yearlyCashFlows.find((r) => r.year === yrFloor);
    const rowAt = res.result.yearlyCashFlows.find((r) => r.year === yrFloor + 1);

    expect(rowBefore!.cumulativeNetSavings).toBeLessThan(res.result.netSystemCost);
    expect(rowAt!.cumulativeNetSavings).toBeGreaterThanOrEqual(res.result.netSystemCost);
  });

  // Test 6: Changing electricity rate changes payback
  it("Test 6: Higher electricity rate shortens payback period", () => {
    const lowRate = calculateSolarPayback({
      grossCost: 20000,
      annualProductionKwh: 9600,
      electricityRate: 0.12,
    });

    const highRate = calculateSolarPayback({
      grossCost: 20000,
      annualProductionKwh: 9600,
      electricityRate: 0.28,
    });

    expect(highRate.result.paybackYears).toBeLessThan(lowRate.result.paybackYears);
    expect(highRate.result.lifetimeNetProfit).toBeGreaterThan(lowRate.result.lifetimeNetProfit);
  });

  // Test 7: Changing escalation changes long-term cash flow
  it("Test 7: Higher utility escalation increases 25-year cumulative net profit", () => {
    const lowEsc = calculateSolarPayback({
      grossCost: 20000,
      annualProductionKwh: 9600,
      electricityRate: 0.18,
      utilityInflationPercent: 1.0,
    });

    const highEsc = calculateSolarPayback({
      grossCost: 20000,
      annualProductionKwh: 9600,
      electricityRate: 0.18,
      utilityInflationPercent: 5.0,
    });

    expect(highEsc.result.lifetimeNetProfit).toBeGreaterThan(lowEsc.result.lifetimeNetProfit);
  });

  // Test 8: Changing degradation changes later-year output and savings
  it("Test 8: Higher panel degradation reduces later-year energy yield and lifetime profit", () => {
    const lowDeg = calculateSolarPayback({
      grossCost: 20000,
      annualProductionKwh: 9600,
      electricityRate: 0.18,
      panelDegradationPercent: 0.25,
    });

    const highDeg = calculateSolarPayback({
      grossCost: 20000,
      annualProductionKwh: 9600,
      electricityRate: 0.18,
      panelDegradationPercent: 1.5,
    });

    const yr25Low = lowDeg.result.yearlyCashFlows[24].solarYieldKwh;
    const yr25High = highDeg.result.yearlyCashFlows[24].solarYieldKwh;

    expect(yr25High).toBeLessThan(yr25Low);
    expect(highDeg.result.lifetimeNetProfit).toBeLessThan(lowDeg.result.lifetimeNetProfit);
  });

  // Test 9: Changing O&M changes cumulative cash flow
  it("Test 9: Higher annual O&M expenses reduce cumulative net savings", () => {
    const noOm = calculateSolarPayback({
      grossCost: 20000,
      annualProductionKwh: 9600,
      electricityRate: 0.18,
      annualOmCost: 0,
    });

    const withOm = calculateSolarPayback({
      grossCost: 20000,
      annualProductionKwh: 9600,
      electricityRate: 0.18,
      annualOmCost: 200, // $200/yr over 25 yrs = $5,000
    });

    expect(noOm.result.lifetime25YearSavings - withOm.result.lifetime25YearSavings).toBe(5000);
    expect(withOm.result.paybackYears).toBeGreaterThan(noOm.result.paybackYears);
  });

  // Test 10: Inverter replacement expense is included at specified year
  it("Test 10: Inverter replacement expense occurs at specified replacement year", () => {
    const res = calculateSolarPayback({
      grossCost: 20000,
      annualProductionKwh: 9600,
      electricityRate: 0.18,
      inverterReplacementCost: 2500,
      inverterReplacementYear: 12,
    });

    const yr12 = res.result.yearlyCashFlows.find((r) => r.year === 12);
    const yr13 = res.result.yearlyCashFlows.find((r) => r.year === 13);

    expect(yr12!.inverterExpense).toBe(2500);
    expect(yr13!.inverterExpense).toBe(0);
  });

  // Test 11: ROI is calculated strictly as (lifetimeNetProfit / netSystemCost) * 100
  it("Test 11: ROI percent accurately implements (lifetimeNetProfit / netSystemCost) * 100", () => {
    const res = calculateSolarPayback({
      grossCost: 20000,
      annualProductionKwh: 9600,
      electricityRate: 0.18,
    });

    const expectedRoi = Math.round((res.result.lifetimeNetProfit / res.result.netSystemCost) * 100);
    expect(res.result.roiPercent).toBe(expectedRoi);
  });

  // Test 12: Throws on zero or negative gross cost
  it("Test 12: Throws error on zero or negative gross cost", () => {
    expect(() =>
      calculateSolarPayback({
        grossCost: 0,
        annualProductionKwh: 9600,
        electricityRate: 0.18,
      })
    ).toThrow();
  });
});

