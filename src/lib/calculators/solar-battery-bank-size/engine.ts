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

export interface BatteryHardwareOption {
  id: string;
  name: string;
  unitVoltage: number;
  unitAh: number;
  unitKWh: number;
  seriesCount: number;
  parallelCount: number;
  totalUnits: number;
  hardwareNominalKWh: number;
  hardwareNominalAh: number;
  configurationLabel: string;
}

export function getHardwareConfigurations(requiredKWh: number, systemVoltage: number): BatteryHardwareOption[] {
  if (!Number.isFinite(requiredKWh) || requiredKWh <= 0 || !Number.isFinite(systemVoltage) || systemVoltage <= 0) {
    return [];
  }

  const options: BatteryHardwareOption[] = [];

  // Option 1: 12V 100Ah Standard Deep-Cycle Units (1.2 kWh each)
  if (systemVoltage >= 12 && systemVoltage % 12 === 0) {
    const seriesCount = systemVoltage / 12;
    const stringKWh = seriesCount * 1.2;
    const parallelCount = Math.max(1, Math.ceil(requiredKWh / stringKWh));
    const totalUnits = seriesCount * parallelCount;
    const hardwareNominalKWh = totalUnits * 1.2;
    const hardwareNominalAh = parallelCount * 100;
    options.push({
      id: "12v-100ah",
      name: "12V 100Ah Deep-Cycle Units",
      unitVoltage: 12,
      unitAh: 100,
      unitKWh: 1.2,
      seriesCount,
      parallelCount,
      totalUnits,
      hardwareNominalKWh,
      hardwareNominalAh,
      configurationLabel: `${seriesCount}S${parallelCount}P (${systemVoltage}V / ${hardwareNominalAh}Ah)`,
    });
  }

  // Option 2: 48V 100Ah / 5.12 kWh Server Rack Modules (for 48V or 51.2V nominal systems)
  if (Math.abs(systemVoltage - 48) < 4 || Math.abs(systemVoltage - 51.2) < 4) {
    const parallelCount = Math.max(1, Math.ceil(requiredKWh / 5.12));
    options.push({
      id: "48v-server-rack",
      name: "5.12 kWh 48V Server-Rack Modules",
      unitVoltage: 48,
      unitAh: 100,
      unitKWh: 5.12,
      seriesCount: 1,
      parallelCount,
      totalUnits: parallelCount,
      hardwareNominalKWh: parallelCount * 5.12,
      hardwareNominalAh: parallelCount * 100,
      configurationLabel: `1S${parallelCount}P (48V / ${parallelCount * 100}Ah)`,
    });
  } else if (systemVoltage >= 24 && systemVoltage % 24 === 0) {
    // 24V 100Ah Modules (2.4 kWh)
    const seriesCount = systemVoltage / 24;
    const stringKWh = seriesCount * 2.4;
    const parallelCount = Math.max(1, Math.ceil(requiredKWh / stringKWh));
    const totalUnits = seriesCount * parallelCount;
    options.push({
      id: "24v-100ah",
      name: "24V 100Ah Modular Batteries",
      unitVoltage: 24,
      unitAh: 100,
      unitKWh: 2.4,
      seriesCount,
      parallelCount,
      totalUnits,
      hardwareNominalKWh: totalUnits * 2.4,
      hardwareNominalAh: parallelCount * 100,
      configurationLabel: `${seriesCount}S${parallelCount}P (${systemVoltage}V / ${parallelCount * 100}Ah)`,
    });
  }

  // Option 3: Native System-Voltage 200Ah Pack
  const packUnitKWh = (systemVoltage * 200) / 1000;
  const packParallelCount = Math.max(1, Math.ceil(requiredKWh / packUnitKWh));
  options.push({
    id: `${systemVoltage}v-200ah`,
    name: `${systemVoltage}V 200Ah Commercial Blocks`,
    unitVoltage: systemVoltage,
    unitAh: 200,
    unitKWh: packUnitKWh,
    seriesCount: 1,
    parallelCount: packParallelCount,
    totalUnits: packParallelCount,
    hardwareNominalKWh: packParallelCount * packUnitKWh,
    hardwareNominalAh: packParallelCount * 200,
    configurationLabel: `1S${packParallelCount}P (${systemVoltage}V / ${packParallelCount * 200}Ah)`,
  });

  return options;
}
