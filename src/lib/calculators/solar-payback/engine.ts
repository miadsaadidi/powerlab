import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export interface SolarPaybackInput {
  grossCost: number;
  incentivePercent?: number; // default 0% for current 2026 installations (30% for historical 2022-2025 §25D)
  annualProductionKwh: number;
  electricityRate: number; // $/kWh
  utilityInflationPercent?: number; // default 3.5%
  panelDegradationPercent?: number; // default 0.5%
  annualOmCost?: number; // default $0
  inverterReplacementCost?: number; // default $1800
  inverterReplacementYear?: number; // default 13
  analysisYears?: number; // default 25
}

export interface YearlyCashFlowRow {
  year: number;
  solarYieldKwh: number;
  utilityRate: number;
  grossAvoidedCost: number;
  omExpense: number;
  inverterExpense: number;
  netAnnualSavings: number;
  cumulativeCashFlow: number; // Cumulative position from -NetSystemCost
  cumulativeNetSavings: number; // Cumulative avoided cost savings minus operating expenses
  gridElectricityCostWithoutSolar: number;
}

export interface SolarPaybackResultData {
  grossCost: number;
  netSystemCost: number;
  incentivePercent: number;
  taxCreditSavings: number;
  paybackYears: number; // fractional year (e.g. 7.4) or analysisYears
  paybackMonths: number;
  isPaybackAchieved: boolean;
  year1Savings: number;
  lifetime25YearSavings: number; // Cumulative net savings over analysis period
  lifetimeNetProfit: number; // Cumulative Net Savings minus Net System Cost
  roiPercent: number; // (lifetimeNetProfit / netSystemCost) * 100
  annualAverageSavings: number;
  yearlyCashFlows: YearlyCashFlowRow[];
}

export type SolarPaybackResult = CalculationResult<SolarPaybackResultData>;

export function calculateSolarPayback(input: SolarPaybackInput): SolarPaybackResult {
  const {
    grossCost,
    incentivePercent = 0,
    annualProductionKwh,
    electricityRate,
    utilityInflationPercent = 3.5,
    panelDegradationPercent = 0.5,
    annualOmCost = 0,
    inverterReplacementCost = 1800,
    inverterReplacementYear = 13,
    analysisYears = 25,
  } = input;

  if (!Number.isFinite(grossCost) || grossCost <= 0) {
    throw new Error("System gross cost must be greater than zero.");
  }
  if (!Number.isFinite(annualProductionKwh) || annualProductionKwh <= 0) {
    throw new Error("Annual solar production (kWh) must be greater than zero.");
  }
  if (!Number.isFinite(electricityRate) || electricityRate <= 0) {
    throw new Error("Electricity rate ($/kWh) must be greater than zero.");
  }

  const validIncentivePercent = Math.max(0, Math.min(100, incentivePercent));
  const taxCreditSavings = Math.round(grossCost * (validIncentivePercent / 100));
  const netSystemCost = Math.max(0, grossCost - taxCreditSavings);

  const inflationFrac = (utilityInflationPercent || 0) / 100;
  const degradationFrac = (panelDegradationPercent || 0) / 100;

  const yearlyCashFlows: YearlyCashFlowRow[] = [];
  let cumulativeSavings = 0;
  let cumulativeGridCost = 0;
  let exactPaybackFractionalYear: number | null = null;
  let year1Savings = 0;

  for (let yr = 1; yr <= analysisYears; yr++) {
    const solarYieldKwh = Math.round(annualProductionKwh * Math.pow(1 - degradationFrac, yr - 1));
    const currentUtilityRate = Number((electricityRate * Math.pow(1 + inflationFrac, yr - 1)).toFixed(4));
    const grossAvoidedCost = Math.round(solarYieldKwh * currentUtilityRate);
    const omExpense = Math.round(annualOmCost);
    const inverterExpense = yr === inverterReplacementYear ? Math.round(inverterReplacementCost) : 0;
    const netAnnualSavings = grossAvoidedCost - omExpense - inverterExpense;

    if (yr === 1) {
      year1Savings = grossAvoidedCost;
    }

    const previousCumulative = cumulativeSavings;
    cumulativeSavings += netAnnualSavings;
    const cumulativeCashFlow = cumulativeSavings - netSystemCost;

    const baselineGridCost = Math.round(annualProductionKwh * currentUtilityRate);
    cumulativeGridCost += baselineGridCost;

    if (exactPaybackFractionalYear === null && cumulativeSavings >= netSystemCost) {
      const remainingToPay = netSystemCost - previousCumulative;
      const fractionOfYear = netAnnualSavings > 0 ? remainingToPay / netAnnualSavings : 0;
      exactPaybackFractionalYear = Number(((yr - 1) + Math.max(0, Math.min(1, fractionOfYear))).toFixed(2));
    }

    yearlyCashFlows.push({
      year: yr,
      solarYieldKwh,
      utilityRate: currentUtilityRate,
      grossAvoidedCost,
      omExpense,
      inverterExpense,
      netAnnualSavings,
      cumulativeCashFlow,
      cumulativeNetSavings: cumulativeSavings,
      gridElectricityCostWithoutSolar: cumulativeGridCost,
    });
  }

  const isPaybackAchieved = exactPaybackFractionalYear !== null;
  const finalPayback = exactPaybackFractionalYear ?? analysisYears;
  const paybackYearsInt = Math.floor(finalPayback);
  const paybackMonthsInt = Math.round((finalPayback - paybackYearsInt) * 12);

  const lifetime25YearSavings = cumulativeSavings;
  const lifetimeNetProfit = Math.round(lifetime25YearSavings - netSystemCost);
  const roiPercent = netSystemCost > 0 ? Math.round((lifetimeNetProfit / netSystemCost) * 100) : 0;
  const annualAverageSavings = Math.round(lifetime25YearSavings / analysisYears);

  const assumptions: AssumptionUsed[] = [
    {
      key: "incentive_credit",
      value: validIncentivePercent,
      unit: "%",
      provenance: "user-entered",
      description: validIncentivePercent > 0
        ? "Applied solar tax credit or rebate incentive (e.g. historical 2022–2025 §25D)"
        : "Current default scenario: 0% federal tax credit (expenditures after Dec 31, 2025)",
    },
    {
      key: "utility_escalation",
      value: utilityInflationPercent,
      unit: "%/yr",
      provenance: "preset",
      description: "Representative annual utility electricity price escalation rate",
    },
    {
      key: "panel_degradation",
      value: panelDegradationPercent,
      unit: "%/yr",
      provenance: "preset",
      description: "Illustrative annual PV degradation rate derating panel energy yield",
    },
    {
      key: "inverter_replacement",
      value: inverterReplacementCost,
      unit: "$",
      provenance: "preset",
      description: `Midpoint inverter replacement cost modeled at Year ${inverterReplacementYear}`,
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (validIncentivePercent > 0) {
    warnings.push({
      code: "HISTORICAL_TAX_CREDIT_SELECTED",
      severity: "info",
      message: "The 30% Section 25D Residential Clean Energy Credit applied to qualifying expenditures placed in service through December 31, 2025. Verify current statutory tax incentives for new installations.",
    });
  }

  if (finalPayback >= 15 || !isPaybackAchieved) {
    warnings.push({
      code: "EXTENDED_PAYBACK",
      severity: "info",
      message: "Estimated payback period is 15+ years. Consider checking for local utility rebates or verifying your local electricity price and tariff structure.",
    });
  }

  return {
    formulaVersion: "1.0.0",
    result: {
      grossCost,
      netSystemCost,
      incentivePercent: validIncentivePercent,
      taxCreditSavings,
      paybackYears: finalPayback,
      paybackMonths: paybackMonthsInt,
      isPaybackAchieved,
      year1Savings,
      lifetime25YearSavings,
      lifetimeNetProfit,
      roiPercent,
      annualAverageSavings,
      yearlyCashFlows,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}

