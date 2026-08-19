export interface SolarPanelSizeInput {
  annualTargetKWh: number;
  specificYieldKWhPerKwYear: number;
  normalizedMonthlyKWhPerKw?: number[];
  panelWatts: number;
  designMargin: number;
}

export interface SolarPanelComparison {
  panelWatts: number;
  panelCount: number;
  installedKw: number;
  isSelected: boolean;
}

export interface SolarPanelSizeResult {
  annualTargetKWh: number;
  specificYieldKWhPerKwYear: number;
  baseRequiredKw: number;
  recommendedKw: number;
  panelCount: number;
  installedKw: number;
  modeledAnnualKWh: number;
  modeledMonthlyKWh: number[] | null;
  annualEnergyCoveragePercent: number;
  panelComparisons: SolarPanelComparison[];
}

export type EnergyTargetPeriod = "day" | "month" | "year";

export function normalizeEnergyTargetToAnnual(value: number, period: EnergyTargetPeriod) {
  if (!Number.isFinite(value) || value <= 0) throw new Error("Energy target must be greater than zero.");
  if (period === "day") return value * 365.25;
  if (period === "month") return value * 12;
  return value;
}

const comparisonWatts = [350, 400, 450] as const;

function validate(input: SolarPanelSizeInput) {
  if (!Number.isFinite(input.annualTargetKWh) || input.annualTargetKWh <= 0) throw new Error("Annual energy target must be greater than zero.");
  if (!Number.isFinite(input.specificYieldKWhPerKwYear) || input.specificYieldKWhPerKwYear <= 0) throw new Error("PVWatts modeled zero annual production, so a finite array size cannot be calculated. Review the location and solar settings or use a known manual specific yield.");
  if (!Number.isFinite(input.panelWatts) || input.panelWatts <= 0) throw new Error("Panel wattage must be greater than zero.");
  if (!Number.isFinite(input.designMargin) || input.designMargin < 0 || input.designMargin > 1) throw new Error("Design margin must be between 0% and 100%.");
  if (input.normalizedMonthlyKWhPerKw !== undefined && (input.normalizedMonthlyKWhPerKw.length !== 12 || input.normalizedMonthlyKWhPerKw.some((value) => !Number.isFinite(value) || value < 0))) throw new Error("Normalized monthly solar production must contain 12 valid non-negative values.");
}

export function calculateSolarPanelSize(input: SolarPanelSizeInput): SolarPanelSizeResult {
  validate(input);
  const baseRequiredKw = input.annualTargetKWh / input.specificYieldKWhPerKwYear;
  const recommendedKw = baseRequiredKw * (1 + input.designMargin);
  const panelCount = Math.ceil(recommendedKw * 1_000 / input.panelWatts);
  const installedKw = panelCount * input.panelWatts / 1_000;
  const modeledAnnualKWh = installedKw * input.specificYieldKWhPerKwYear;
  const panelWattages = [...comparisonWatts, ...(comparisonWatts.includes(input.panelWatts as typeof comparisonWatts[number]) ? [] : [input.panelWatts])].sort((a, b) => a - b);
  return {
    annualTargetKWh: input.annualTargetKWh,
    specificYieldKWhPerKwYear: input.specificYieldKWhPerKwYear,
    baseRequiredKw,
    recommendedKw,
    panelCount,
    installedKw,
    modeledAnnualKWh,
    modeledMonthlyKWh: input.normalizedMonthlyKWhPerKw ? input.normalizedMonthlyKWhPerKw.map((value) => installedKw * value) : null,
    annualEnergyCoveragePercent: modeledAnnualKWh / input.annualTargetKWh * 100,
    panelComparisons: panelWattages.map((panelWatts) => ({
      panelWatts,
      panelCount: Math.ceil(recommendedKw * 1_000 / panelWatts),
      installedKw: Math.ceil(recommendedKw * 1_000 / panelWatts) * panelWatts / 1_000,
      isSelected: panelWatts === input.panelWatts,
    })),
  };
}
