import type { CalculationResult } from "@/types/calculation";

export interface SolarBatteryBankSizeInput {
  dailyLoadKWh: number;
  autonomyDays: number;
  chemistry: string;
  minimumSoc: number;
  inverterEfficiency: number;
  batteryHealth: number;
  designMargin: number;
  systemVoltage: number;
}

export interface SolarBatteryBankAutonomyComparison {
  autonomyDays: number;
  recommendedKWh: number;
  isSelected: boolean;
}

export type SolarBatteryBankSizeResult = CalculationResult<{
  dailyLoadKWh: number;
  autonomyDays: number;
  startingSoc: number;
  usableSocWindow: number;
  loadEnergyKWh: number;
  inverterAdjustedLoadKWh: number;
  minimumNominalKWh: number;
  recommendedKWh: number;
  systemVoltage: number;
  selectedVoltageAh: number;
  referenceAh: Array<{ voltage: number; ampHours: number }>;
  autonomyComparisons: SolarBatteryBankAutonomyComparison[];
}>;

const STARTING_SOC = 1;
const REFERENCE_VOLTAGES = [12, 24, 48] as const;
const finitePositive = (value: number) => Number.isFinite(value) && value > 0;
const fraction = (value: number) => Number.isFinite(value) && value > 0 && value <= 1;

export function calculateSolarBatteryBankSize(input: SolarBatteryBankSizeInput): SolarBatteryBankSizeResult {
  if (!finitePositive(input.dailyLoadKWh)) throw new Error("Daily load energy must be greater than zero.");
  if (!finitePositive(input.autonomyDays)) throw new Error("Autonomy must be greater than zero.");
  if (!Number.isFinite(input.minimumSoc) || input.minimumSoc < 0 || input.minimumSoc >= STARTING_SOC) throw new Error("Minimum SOC must be between 0% and less than 100%.");
  if (!fraction(input.inverterEfficiency) || !fraction(input.batteryHealth)) throw new Error("Inverter efficiency and battery health must be greater than 0% and no more than 100%.");
  if (!Number.isFinite(input.designMargin) || input.designMargin < 0 || input.designMargin > 1) throw new Error("Design margin must be between 0% and 100%.");
  if (!finitePositive(input.systemVoltage)) throw new Error("System voltage must be greater than zero.");

  const usableSocWindow = STARTING_SOC - input.minimumSoc;
  const loadEnergyKWh = input.dailyLoadKWh * input.autonomyDays;
  const inverterAdjustedLoadKWh = loadEnergyKWh / input.inverterEfficiency;
  const minimumNominalKWh = inverterAdjustedLoadKWh / (usableSocWindow * input.batteryHealth);
  const recommendedKWh = minimumNominalKWh * (1 + input.designMargin);
  const selectedVoltageAh = recommendedKWh * 1_000 / input.systemVoltage;
  const referenceAh = REFERENCE_VOLTAGES.map((voltage) => ({ voltage, ampHours: recommendedKWh * 1_000 / voltage }));
  const autonomyValues = [1, 2, 3, ...(input.autonomyDays === 1 || input.autonomyDays === 2 || input.autonomyDays === 3 ? [] : [input.autonomyDays])];
  const autonomyComparisons = autonomyValues.map((autonomyDays) => {
    const comparisonLoad = input.dailyLoadKWh * autonomyDays;
    const comparisonMinimum = comparisonLoad / (input.inverterEfficiency * usableSocWindow * input.batteryHealth);
    return { autonomyDays, recommendedKWh: comparisonMinimum * (1 + input.designMargin), isSelected: autonomyDays === input.autonomyDays };
  });

  return {
    formulaVersion: "1.0.0",
    result: {
      dailyLoadKWh: input.dailyLoadKWh,
      autonomyDays: input.autonomyDays,
      startingSoc: STARTING_SOC,
      usableSocWindow,
      loadEnergyKWh,
      inverterAdjustedLoadKWh,
      minimumNominalKWh,
      recommendedKWh,
      systemVoltage: input.systemVoltage,
      selectedVoltageAh,
      referenceAh,
      autonomyComparisons,
    },
    assumptions: [
      { key: "dailyLoadKWh", value: input.dailyLoadKWh, unit: "kWh/day", provenance: "user-entered", description: "Daily load energy delivered to AC loads" },
      { key: "autonomyDays", value: input.autonomyDays, unit: "days", provenance: "user-entered", description: "Stored-energy coverage without meaningful recharge" },
      { key: "startingSoc", value: STARTING_SOC, unit: "%", provenance: "preset", description: "Autonomy assumes a fully charged battery" },
      { key: "minimumSoc", value: input.minimumSoc, unit: "%", provenance: "user-entered", description: "Minimum SOC planning assumption" },
      { key: "inverterEfficiency", value: input.inverterEfficiency, unit: "%", provenance: "user-entered", description: "Inverter efficiency" },
      { key: "batteryHealth", value: input.batteryHealth, unit: "%", provenance: "user-entered", description: "Available capacity planning derating" },
      { key: "designMargin", value: input.designMargin, unit: "%", provenance: "user-entered", description: "Planning margin" },
      { key: "chemistry", value: input.chemistry, provenance: "preset", description: "Battery chemistry planning preset" },
      { key: "systemVoltage", value: input.systemVoltage, unit: "V", provenance: "user-entered", description: "Selected system voltage for Ah representation" },
    ],
    warnings: [],
    qualityLabel: "preset-assisted",
  };
}
