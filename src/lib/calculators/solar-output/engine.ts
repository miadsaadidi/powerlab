const MONTH_LABELS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;

export interface NormalizedSolarOutput {
  annualAcKWh: number;
  monthlyAcKWh: number[];
  capacityFactorPercent?: number;
  warnings: string[];
}

export interface SolarOutputSummary {
  annualAcKWh: number;
  averageDailyKWh: number;
  specificYieldKWhPerKwYear: number;
  capacityFactorPercent?: number;
  bestMonth: { index: number; label: string; kWh: number };
  lowestMonth: { index: number; label: string; kWh: number };
  coveragePercent: number | null;
  warnings: string[];
}

function validateProviderOutput(provider: NormalizedSolarOutput) {
  if (!Number.isFinite(provider.annualAcKWh) || provider.annualAcKWh < 0) throw new Error("PVWatts returned an invalid annual production value.");
  if (provider.monthlyAcKWh.length !== 12 || provider.monthlyAcKWh.some((value) => !Number.isFinite(value) || value < 0)) throw new Error("PVWatts returned an invalid monthly production array.");
  if (provider.capacityFactorPercent !== undefined && (!Number.isFinite(provider.capacityFactorPercent) || provider.capacityFactorPercent < 0)) throw new Error("PVWatts returned an invalid capacity factor.");
  if (provider.warnings.some((warning) => typeof warning !== "string")) throw new Error("PVWatts returned invalid warnings.");
}

export function calculatePanelSystemCapacity(panelCount: number, panelWatts: number) {
  if (!Number.isFinite(panelCount) || !Number.isInteger(panelCount) || panelCount < 1) throw new Error("Panel count must be a positive whole number.");
  if (!Number.isFinite(panelWatts) || panelWatts <= 0) throw new Error("Panel wattage must be greater than zero.");
  const systemCapacityKw = panelCount * panelWatts / 1000;
  if (!Number.isFinite(systemCapacityKw) || systemCapacityKw <= 0) throw new Error("Calculated system size must be greater than zero.");
  return systemCapacityKw;
}

export function summarizeSolarOutput(input: { systemCapacityKw: number; provider: NormalizedSolarOutput; annualElectricityUsageKWh: number | null }): SolarOutputSummary {
  if (!Number.isFinite(input.systemCapacityKw) || input.systemCapacityKw <= 0) throw new Error("System size must be greater than zero.");
  validateProviderOutput(input.provider);
  const bestIndex = input.provider.monthlyAcKWh.reduce((best, value, index, values) => value > values[best] ? index : best, 0);
  const lowestIndex = input.provider.monthlyAcKWh.reduce((lowest, value, index, values) => value < values[lowest] ? index : lowest, 0);
  return {
    annualAcKWh: input.provider.annualAcKWh,
    averageDailyKWh: input.provider.annualAcKWh / 365,
    specificYieldKWhPerKwYear: input.provider.annualAcKWh / input.systemCapacityKw,
    capacityFactorPercent: input.provider.capacityFactorPercent,
    bestMonth: { index: bestIndex, label: MONTH_LABELS[bestIndex], kWh: input.provider.monthlyAcKWh[bestIndex] },
    lowestMonth: { index: lowestIndex, label: MONTH_LABELS[lowestIndex], kWh: input.provider.monthlyAcKWh[lowestIndex] },
    coveragePercent: input.annualElectricityUsageKWh !== null && Number.isFinite(input.annualElectricityUsageKWh) && input.annualElectricityUsageKWh > 0 ? input.provider.annualAcKWh / input.annualElectricityUsageKWh * 100 : null,
    warnings: input.provider.warnings,
  };
}
