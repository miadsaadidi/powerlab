export type UsageMode = "watts-time" | "kwh-cycle" | "label-energy";
export type LabelPeriod = "month" | "year";

export interface UsageInput {
  mode: UsageMode;
  watts?: number;
  quantity: number;
  hoursPerDay?: number;
  daysPerWeek?: number;
  dutyCycle?: number;
  kWhPerCycle?: number;
  cyclesPerWeek?: number;
  labelKWh?: number;
  labelPeriod?: LabelPeriod;
  pricePerKWh?: number;
}

export interface UsageResult {
  mode: UsageMode;
  weeklyKWh: number;
  averageDailyKWh: number;
  monthlyKWh: number;
  annualKWh: number;
  dailyCost?: number;
  monthlyCost?: number;
  annualCost?: number;
}

export interface UsageProfileRow {
  id: string;
  label: string;
  input: UsageInput;
}

export interface UsageProfileResult {
  totalAnnualKWh: number;
  totalMonthlyKWh: number;
  totalAverageDailyKWh: number;
  rows: Array<UsageProfileRow & { result: UsageResult; sharePercent: number }>;
}

const DAYS_PER_YEAR = 365.25;
const WEEKS_PER_YEAR = DAYS_PER_YEAR / 7;
const DAYS_PER_WEEK = 7;

const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

function validateCommon(input: UsageInput) {
  if (!finite(input.quantity) || input.quantity <= 0) throw new Error("Enter a quantity greater than zero.");
  if (input.pricePerKWh !== undefined && (!finite(input.pricePerKWh) || input.pricePerKWh < 0)) throw new Error("Enter an electricity price of zero or more.");
}

function validateDays(value: number | undefined) {
  if (!finite(value) || value < 1 || value > 7) throw new Error("Days per week must be between 1 and 7.");
}

function addCost(result: Omit<UsageResult, "dailyCost" | "monthlyCost" | "annualCost">, price: number | undefined): UsageResult {
  if (price === undefined) return result;
  return { ...result, dailyCost: result.averageDailyKWh * price, monthlyCost: result.monthlyKWh * price, annualCost: result.annualKWh * price };
}

export function calculateUsage(input: UsageInput): UsageResult {
  validateCommon(input);
  let annualKWh: number;
  let weeklyKWh: number;

  if (input.mode === "watts-time") {
    if (!finite(input.watts) || input.watts <= 0) throw new Error("Enter watts greater than zero.");
    if (!finite(input.hoursPerDay) || input.hoursPerDay <= 0 || input.hoursPerDay > 24) throw new Error("Hours per day must be greater than zero and no more than 24.");
    validateDays(input.daysPerWeek);
    if (!finite(input.dutyCycle) || input.dutyCycle <= 0 || input.dutyCycle > 1) throw new Error("Duty cycle must be between 1% and 100%.");
    weeklyKWh = input.watts * input.quantity * input.hoursPerDay * (input.daysPerWeek ?? 0) * (input.dutyCycle ?? 0) / 1000;
    annualKWh = (weeklyKWh / DAYS_PER_WEEK) * DAYS_PER_YEAR;
  } else if (input.mode === "kwh-cycle") {
    if (!finite(input.kWhPerCycle) || input.kWhPerCycle <= 0) throw new Error("Enter energy per cycle greater than zero.");
    if (!finite(input.cyclesPerWeek) || input.cyclesPerWeek <= 0) throw new Error("Enter cycles per week greater than zero.");
    weeklyKWh = input.kWhPerCycle * input.cyclesPerWeek * input.quantity;
    annualKWh = weeklyKWh * WEEKS_PER_YEAR;
  } else {
    if (!finite(input.labelKWh) || input.labelKWh <= 0) throw new Error("Enter label energy greater than zero.");
    if (input.labelPeriod !== "month" && input.labelPeriod !== "year") throw new Error("Choose a label energy period.");
    const suppliedKWh = input.labelKWh * input.quantity;
    annualKWh = input.labelPeriod === "year" ? suppliedKWh : suppliedKWh * 12;
    weeklyKWh = annualKWh / WEEKS_PER_YEAR;
  }

  if (!finite(annualKWh) || annualKWh <= 0) throw new Error("Enter usage values greater than zero.");
  const averageDailyKWh = annualKWh / DAYS_PER_YEAR;
  return addCost({ mode: input.mode, weeklyKWh, averageDailyKWh, monthlyKWh: annualKWh / 12, annualKWh }, input.pricePerKWh);
}

export function calculateOneHourLess(input: UsageInput): (UsageResult & { reductionKWh: number }) | null {
  if (input.mode !== "watts-time" || !finite(input.hoursPerDay) || input.hoursPerDay < 1) return null;
  const current = calculateUsage(input);
  const reduced = calculateUsage({ ...input, hoursPerDay: input.hoursPerDay - 1 });
  return { ...reduced, reductionKWh: current.annualKWh - reduced.annualKWh };
}

export function calculateUsageProfile(rows: UsageProfileRow[]): UsageProfileResult {
  if (rows.length === 0) throw new Error("Add at least one appliance.");
  const calculated = rows.map((row) => ({ ...row, result: calculateUsage(row.input) }));
  const totalAnnualKWh = calculated.reduce((sum, row) => sum + row.result.annualKWh, 0);
  if (totalAnnualKWh <= 0) throw new Error("Enter usage greater than zero.");
  return {
    totalAnnualKWh,
    totalMonthlyKWh: totalAnnualKWh / 12,
    totalAverageDailyKWh: totalAnnualKWh / DAYS_PER_YEAR,
    rows: calculated.map((row) => ({ ...row, sharePercent: row.result.annualKWh / totalAnnualKWh * 100 })),
  };
}

export const USAGE_CONSTANTS = { daysPerYear: DAYS_PER_YEAR, weeksPerYear: WEEKS_PER_YEAR } as const;
