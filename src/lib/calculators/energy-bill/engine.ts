export type EnergyBillMode = "usage-for-period" | "meter-readings";

export interface EnergyBillInput {
  mode: EnergyBillMode;
  energyKWh?: number;
  previousReading?: number;
  currentReading?: number;
  billingDays: number;
  pricePerKWh: number;
  fixedChargeForPeriod: number;
  dailyStandingCharge: number;
  taxPercent: number;
}

export interface EnergyBillScenario {
  label: string;
  reductionPercent: number;
  energyKWh: number;
  energyCharge: number;
  fixedChargeForPeriod: number;
  standingCharge: number;
  subtotal: number;
  tax: number;
  total: number;
}

export interface EnergyBillResult {
  energyKWh: number;
  billingDays: number;
  pricePerKWh: number;
  energyCharge: number;
  fixedChargeForPeriod: number;
  standingCharge: number;
  subtotal: number;
  taxPercent: number;
  tax: number;
  total: number;
  averageDailyKWh: number;
  averageDailyCost: number;
  annualizedEnergyKWh: number;
  annualizedTotal: number;
  scenarios: EnergyBillScenario[];
}

const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

function validate(input: EnergyBillInput) {
  if (!finite(input.billingDays) || !Number.isInteger(input.billingDays) || input.billingDays < 1) throw new Error("Billing period must be a whole number of days, starting at 1.");
  if (!finite(input.pricePerKWh) || input.pricePerKWh < 0) throw new Error("Price per kWh must be zero or greater.");
  if (!finite(input.fixedChargeForPeriod) || input.fixedChargeForPeriod < 0) throw new Error("Fixed charge must be zero or greater.");
  if (!finite(input.dailyStandingCharge) || input.dailyStandingCharge < 0) throw new Error("Standing charge must be zero or greater.");
  if (!finite(input.taxPercent) || input.taxPercent < 0 || input.taxPercent > 1) throw new Error("Tax must be between 0% and 100%.");
  if (input.mode === "usage-for-period") {
    if (!finite(input.energyKWh) || input.energyKWh < 0) throw new Error("Usage for this bill must be zero or greater.");
  } else {
    if (!finite(input.previousReading) || input.previousReading < 0) throw new Error("Previous meter reading must be zero or greater.");
    if (!finite(input.currentReading) || input.currentReading < 0) throw new Error("Current meter reading must be zero or greater.");
    if ((input.currentReading ?? 0) < (input.previousReading ?? 0)) throw new Error("Current meter reading cannot be lower than the previous reading.");
  }
}

function calculateScenario(energyKWh: number, input: EnergyBillInput, label: string, reductionPercent: number): EnergyBillScenario {
  const energyCharge = energyKWh * input.pricePerKWh;
  const standingCharge = input.dailyStandingCharge * input.billingDays;
  const subtotal = energyCharge + input.fixedChargeForPeriod + standingCharge;
  const tax = subtotal * input.taxPercent;
  return { label, reductionPercent, energyKWh, energyCharge, fixedChargeForPeriod: input.fixedChargeForPeriod, standingCharge, subtotal, tax, total: subtotal + tax };
}

export function calculateEnergyBill(input: EnergyBillInput): EnergyBillResult {
  validate(input);
  const energyKWh = input.mode === "usage-for-period" ? input.energyKWh ?? 0 : (input.currentReading ?? 0) - (input.previousReading ?? 0);
  const current = calculateScenario(energyKWh, input, "Current usage", 0);
  const scenarios = [current, calculateScenario(energyKWh * 0.9, input, "10% less usage", 10), calculateScenario(energyKWh * 0.8, input, "20% less usage", 20)];
  return {
    energyKWh,
    billingDays: input.billingDays,
    pricePerKWh: input.pricePerKWh,
    energyCharge: current.energyCharge,
    fixedChargeForPeriod: current.fixedChargeForPeriod,
    standingCharge: current.standingCharge,
    subtotal: current.subtotal,
    taxPercent: input.taxPercent,
    tax: current.tax,
    total: current.total,
    averageDailyKWh: energyKWh / input.billingDays,
    averageDailyCost: current.total / input.billingDays,
    annualizedEnergyKWh: energyKWh / input.billingDays * 365,
    annualizedTotal: current.total / input.billingDays * 365,
    scenarios,
  };
}
