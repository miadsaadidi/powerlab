import type { CalculationResult } from "@/types/calculation";

export type UpsLoadInput =
  | { loadSource: "watts"; loadW: number }
  | { loadSource: "va"; loadVA: number; powerFactor: number };

export type UpsBatteryModuleInput = {
  moduleVoltage: number;
  moduleAh: number;
};

export type UpsBatterySizeCommonInput = {
  runtimeHours: number;
  busVoltage: number;
  upsEfficiency: number;
  usableFraction: number;
  batteryHealth: number;
  designMargin: number;
  batteryChemistry?: string;
  module?: UpsBatteryModuleInput;
};

export type UpsBatterySizeInput = UpsLoadInput & UpsBatterySizeCommonInput;

export interface UpsRuntimeComparison {
  runtimeMinutes: number;
  recommendedWh: number;
  isSelected: boolean;
}

export type UpsBatterySizeResult = CalculationResult<{
  loadW: number;
  runtimeHours: number;
  loadEnergyWh: number;
  batteryEnergyBeforeReserveWh: number;
  minimumNominalWh: number;
  recommendedWh: number;
  recommendedKWh: number;
  recommendedAhAtBus: number;
  runtimeComparisons: UpsRuntimeComparison[];
  energyEquivalentModuleCount: number | null;
  energyEquivalentInstalledWh: number | null;
}>;

const positive = (value: number) => Number.isFinite(value) && value > 0;
const fraction = (value: number) => Number.isFinite(value) && value > 0 && value <= 1;
const margin = (value: number) => Number.isFinite(value) && value >= 0 && value <= 1;

function resolveLoad(input: UpsLoadInput) {
  if (input.loadSource === "watts") {
    if (!positive(input.loadW)) throw new Error("Enter a load greater than zero.");
    return input.loadW;
  }
  if (!positive(input.loadVA)) throw new Error("Enter a UPS load greater than zero.");
  if (!fraction(input.powerFactor)) throw new Error("Power factor must be greater than 0 and no more than 1.");
  return input.loadVA * input.powerFactor;
}

function validate(input: UpsBatterySizeInput) {
  if (!positive(input.runtimeHours)) throw new Error("Enter a runtime greater than zero.");
  if (!positive(input.busVoltage)) throw new Error("Enter a bus voltage greater than zero.");
  if (!fraction(input.upsEfficiency)) throw new Error("UPS efficiency must be greater than 0 and no more than 1.");
  if (!fraction(input.usableFraction)) throw new Error("Usable fraction must be greater than 0 and no more than 1.");
  if (!fraction(input.batteryHealth)) throw new Error("Battery health must be greater than 0 and no more than 1.");
  if (!margin(input.designMargin)) throw new Error("Design margin must be between 0 and 1.");
  if (input.module && (!positive(input.module.moduleVoltage) || !positive(input.module.moduleAh))) throw new Error("Module voltage and Ah must be greater than zero.");
}

export function calculateUpsBatterySize(input: UpsBatterySizeInput): UpsBatterySizeResult {
  validate(input);
  const loadW = resolveLoad(input);
  const loadEnergyWh = loadW * input.runtimeHours;
  const batteryEnergyBeforeReserveWh = loadEnergyWh / input.upsEfficiency;
  const minimumNominalWh = batteryEnergyBeforeReserveWh / (input.usableFraction * input.batteryHealth);
  const recommendedWh = minimumNominalWh * (1 + input.designMargin);
  const runtimeComparisons = [15, 30, 60].map((runtimeMinutes) => ({
    runtimeMinutes,
    recommendedWh: minimumNominalWh * (runtimeMinutes / 60) * (1 + input.designMargin),
    isSelected: Math.abs(input.runtimeHours * 60 - runtimeMinutes) < Number.EPSILON,
  }));
  if (!runtimeComparisons.some((item) => item.isSelected)) runtimeComparisons.push({ runtimeMinutes: input.runtimeHours * 60, recommendedWh, isSelected: true });
  const moduleNominalWh = input.module ? input.module.moduleVoltage * input.module.moduleAh : null;
  const energyEquivalentModuleCount = moduleNominalWh ? Math.ceil(recommendedWh / moduleNominalWh) : null;
  const energyEquivalentInstalledWh = energyEquivalentModuleCount && moduleNominalWh ? energyEquivalentModuleCount * moduleNominalWh : null;
  return {
    formulaVersion: "1.0.0",
    result: {
      loadW,
      runtimeHours: input.runtimeHours,
      loadEnergyWh,
      batteryEnergyBeforeReserveWh,
      minimumNominalWh,
      recommendedWh,
      recommendedKWh: recommendedWh / 1000,
      recommendedAhAtBus: recommendedWh / input.busVoltage,
      runtimeComparisons,
      energyEquivalentModuleCount,
      energyEquivalentInstalledWh,
    },
    assumptions: [
      { key: "upsEfficiency", value: input.upsEfficiency, unit: "fraction", provenance: "user-entered", description: "UPS conversion efficiency" },
      { key: "usableFraction", value: input.usableFraction, unit: "fraction", provenance: "preset", description: "Usable battery fraction" },
      { key: "batteryHealth", value: input.batteryHealth, unit: "fraction", provenance: "user-entered", description: "Available battery capacity relative to nominal" },
      { key: "designMargin", value: input.designMargin, unit: "fraction", provenance: "user-entered", description: "Planning margin" },
    ],
    warnings: [
      { code: "ENERGY_ONLY", severity: "info", message: "This estimates stored-energy requirements only; it does not verify battery compatibility, wiring, topology or installation safety." },
    ],
    qualityLabel: input.loadSource === "va" ? "preset-assisted" : "specific-inputs",
  };
}
