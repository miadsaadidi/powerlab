import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export interface SolarPaybackInput {
  grossCost: number;
  incentivePercent?: number; // default 30%
  annualProductionKwh: number;
  electricityRate: number; // $/kWh
  utilityInflationPercent?: number; // default 3.5%
  panelDegradationPercent?: number; // default 0.5%
  inverterReplacementCost?: number; // default $1800
  inverterReplacementYear?: number; // default 13
  analysisYears?: number; // default 25
}

export interface YearlyCashFlowRow {
  year: number;
  solarYieldKwh: number;
  utilityRate: number;
  annualSavings: number; // Gross electricity bill savings ($)
  inverterExpense: number; // Mid-life inverter replacement or maintenance ($)
  netAnnualSavings: number; // annualSavings - inverterExpense ($)
  cumulativeNetSavings: number; // Running net cumulative cash flow ($)
  gridElectricityCostWithoutSolar: number;
}

export interface SolarPaybackResultData {
  grossCost: number;
  netSystemCost: number;
  taxCreditSavings: number;
  paybackYears: number; // e.g. 7.4 years
  paybackMonths: number;
  lifetime25YearGrossSavings: number; // Gross 25-year electric bill savings ($)
  lifetime25YearInverterCost: number; // Total inverter replacement expense ($)
  lifetime25YearSavings: number; // Net cumulative 25-year savings after inverter ($)
  lifetimeNetBenefit: number; // Net savings minus net capital cost ($)
  lifetimeNetProfit: number; // Alias for backwards compatibility
  roiPercent: number; // (lifetimeNetBenefit / netSystemCost) * 100
  annualAverageSavings: number;
  yearlyCashFlows: YearlyCashFlowRow[];
}

export type SolarPaybackResult = CalculationResult<SolarPaybackResultData>;

export function calculateSolarPayback(input: SolarPaybackInput): SolarPaybackResult {
  const {
    grossCost,
    incentivePercent = 30,
    annualProductionKwh,
    electricityRate,
    utilityInflationPercent = 3.5,
    panelDegradationPercent = 0.5,
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

  const taxCreditSavings = Math.round(grossCost * (Math.max(0, incentivePercent) / 100));
  const netSystemCost = Math.max(0, grossCost - taxCreditSavings);

  const inflationFrac = utilityInflationPercent / 100;
  const degradationFrac = panelDegradationPercent / 100;

  const yearlyCashFlows: YearlyCashFlowRow[] = [];
  let cumulativeSavings = 0;
  let cumulativeGridCost = 0;
  let totalGrossSavings = 0;
  let totalInverterCost = 0;
  let exactPaybackFractionalYear: number | null = null;

  for (let yr = 1; yr <= analysisYears; yr++) {
    const solarYieldKwh = Math.round(annualProductionKwh * Math.pow(1 - degradationFrac, yr - 1));
    const currentUtilityRate = Number((electricityRate * Math.pow(1 + inflationFrac, yr - 1)).toFixed(4));
    const annualSavings = Math.round(solarYieldKwh * currentUtilityRate);
    const inverterExpense = yr === inverterReplacementYear ? inverterReplacementCost : 0;
    const netYearlySavings = annualSavings - inverterExpense;

    totalGrossSavings += annualSavings;
    totalInverterCost += inverterExpense;

    const previousCumulative = cumulativeSavings;
    cumulativeSavings += netYearlySavings;

    const baselineGridCost = Math.round(annualProductionKwh * currentUtilityRate);
    cumulativeGridCost += baselineGridCost;

    if (exactPaybackFractionalYear === null && cumulativeSavings >= netSystemCost) {
      const remainingToPay = netSystemCost - previousCumulative;
      const fractionOfYear = netYearlySavings > 0 ? remainingToPay / netYearlySavings : 0;
      exactPaybackFractionalYear = Number(((yr - 1) + Math.max(0, Math.min(1, fractionOfYear))).toFixed(2));
    }

    yearlyCashFlows.push({
      year: yr,
      solarYieldKwh,
      utilityRate: currentUtilityRate,
      annualSavings,
      inverterExpense,
      netAnnualSavings: netYearlySavings,
      cumulativeNetSavings: cumulativeSavings,
      gridElectricityCostWithoutSolar: cumulativeGridCost,
    });
  }

  const finalPayback = exactPaybackFractionalYear ?? analysisYears;
  const paybackYearsInt = Math.floor(finalPayback);
  const paybackMonthsInt = Math.round((finalPayback - paybackYearsInt) * 12);

  const lifetime25YearSavings = cumulativeSavings;
  const lifetimeNetBenefit = Math.round(lifetime25YearSavings - netSystemCost);
  const roiPercent = netSystemCost > 0 ? Math.round((lifetimeNetBenefit / netSystemCost) * 100) : 0;
  const annualAverageSavings = Math.round(lifetime25YearSavings / analysisYears);

  const assumptions: AssumptionUsed[] = [
    {
      key: "incentive_itc",
      value: incentivePercent,
      unit: "%",
      provenance: "user-entered",
      description: "Federal Investment Tax Credit (IRC Section 25D) / local rebate assumption",
    },
    {
      key: "utility_escalation",
      value: utilityInflationPercent,
      unit: "%/yr",
      provenance: "preset",
      description: "Projected annual utility electricity tariff compound growth rate",
    },
    {
      key: "panel_degradation",
      value: panelDegradationPercent,
      unit: "%/yr",
      provenance: "preset",
      description: "Estimated annual photovoltaic module degradation rate",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (finalPayback >= 15) {
    warnings.push({
      code: "LONG_PAYBACK",
      severity: "info",
      message: "Estimated payback period is 15+ years. Review local utility rate structures, export credit policies, and potential state/utility rebates.",
    });
  }

  return {
    formulaVersion: "1.1.0",
    result: {
      grossCost,
      netSystemCost,
      taxCreditSavings,
      paybackYears: finalPayback,
      paybackMonths: paybackMonthsInt,
      lifetime25YearGrossSavings: totalGrossSavings,
      lifetime25YearInverterCost: totalInverterCost,
      lifetime25YearSavings,
      lifetimeNetBenefit,
      lifetimeNetProfit: lifetimeNetBenefit,
      roiPercent,
      annualAverageSavings,
      yearlyCashFlows,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}

