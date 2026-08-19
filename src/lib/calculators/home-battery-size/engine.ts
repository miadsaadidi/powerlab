export type HomeEnergyUnit = "month" | "day";

export interface HomeBatterySizeInput {
  dailyKWh: number;
  scopeFraction: number;
  backupHours: number;
  minimumSoc: number;
  inverterEfficiency: number;
  batteryHealth: number;
  designMargin: number;
}

export interface HomeBatteryScopeComparison {
  scopeFraction: number;
  label: string;
  recommendedKWh: number;
  isSelected: boolean;
}

export interface HomeBatterySizeResult {
  dailyKWh: number;
  scopeFraction: number;
  selectedScopeDailyLoadKWh: number;
  backupHours: number;
  backupLoadEnergyKWh: number;
  startingSoc: number;
  usableSocWindow: number;
  minimumNominalKWh: number;
  recommendedKWh: number;
  scopeComparisons: HomeBatteryScopeComparison[];
}

const DAYS_PER_YEAR = 365.25;
const DAYS_PER_MONTH = DAYS_PER_YEAR / 12;
const scopePresets = [
  { scopeFraction: 0.25, label: "Critical loads — 25% estimate" },
  { scopeFraction: 0.5, label: "Partial home — 50% estimate" },
  { scopeFraction: 1, label: "Whole home — 100%" },
] as const;

export function normalizeHomeEnergy(value: number, unit: HomeEnergyUnit) {
  if (!Number.isFinite(value) || value <= 0) throw new Error("Household energy must be greater than zero.");
  const dailyKWh = unit === "month" ? value / DAYS_PER_MONTH : value;
  return { value, unit, dailyKWh, monthlyKWh: dailyKWh * DAYS_PER_MONTH };
}

function validate(input: HomeBatterySizeInput) {
  if (!Number.isFinite(input.dailyKWh) || input.dailyKWh <= 0) throw new Error("Household energy must be greater than zero.");
  if (!Number.isFinite(input.scopeFraction) || input.scopeFraction <= 0 || input.scopeFraction > 1) throw new Error("Backup scope must be greater than 0% and no more than 100%.");
  if (!Number.isFinite(input.backupHours) || input.backupHours <= 0) throw new Error("Backup duration must be greater than zero.");
  if (!Number.isFinite(input.minimumSoc) || input.minimumSoc < 0 || input.minimumSoc >= 1) throw new Error("Minimum SOC must be between 0% and less than 100%.");
  if (!Number.isFinite(input.inverterEfficiency) || input.inverterEfficiency <= 0 || input.inverterEfficiency > 1) throw new Error("Inverter efficiency must be greater than 0% and no more than 100%.");
  if (!Number.isFinite(input.batteryHealth) || input.batteryHealth <= 0 || input.batteryHealth > 1) throw new Error("Battery health must be greater than 0% and no more than 100%.");
  if (!Number.isFinite(input.designMargin) || input.designMargin < 0 || input.designMargin > 1) throw new Error("Design margin must be between 0% and 100%.");
}

export function calculateHomeBatterySize(input: HomeBatterySizeInput): HomeBatterySizeResult {
  validate(input);
  const startingSoc = 1;
  const usableSocWindow = startingSoc - input.minimumSoc;
  const selectedScopeDailyLoadKWh = input.dailyKWh * input.scopeFraction;
  const backupLoadEnergyKWh = selectedScopeDailyLoadKWh * input.backupHours / 24;
  const minimumNominalKWh = backupLoadEnergyKWh / (input.inverterEfficiency * usableSocWindow * input.batteryHealth);
  const recommendedKWh = minimumNominalKWh * (1 + input.designMargin);
  const comparisons: HomeBatteryScopeComparison[] = scopePresets.map((preset) => ({
    ...preset,
    recommendedKWh: backupLoadEnergyKWh / input.scopeFraction * preset.scopeFraction / (input.inverterEfficiency * usableSocWindow * input.batteryHealth) * (1 + input.designMargin),
    isSelected: preset.scopeFraction === input.scopeFraction,
  }));
  if (!scopePresets.some((preset) => preset.scopeFraction === input.scopeFraction)) comparisons.push({ scopeFraction: input.scopeFraction, label: `Your selection — ${input.scopeFraction * 100}%`, recommendedKWh, isSelected: true });
  return { dailyKWh: input.dailyKWh, scopeFraction: input.scopeFraction, selectedScopeDailyLoadKWh, backupHours: input.backupHours, backupLoadEnergyKWh, startingSoc, usableSocWindow, minimumNominalKWh, recommendedKWh, scopeComparisons: comparisons };
}
