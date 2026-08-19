import type { CalculationResult } from "@/types/calculation";

export type EvRangeConsumptionUnit = "kwh-per-100-km" | "wh-per-km" | "mi-per-kwh" | "kwh-per-100-mi";
export type EvRangeDistanceUnit = "km" | "mi";

export interface EvRangeCalculationInput {
  batteryCapacityKWh: number;
  currentSoc: number;
  reserveSoc: number;
  batteryHealth: number;
  consumption: number;
  consumptionUnit: EvRangeConsumptionUnit;
}

export interface EvRangeScenario {
  label: string;
  consumptionKWhPerKm: number;
  rangeKm: number;
  rangeMiles: number;
}

export interface EvRangeResultData {
  batteryCapacityKWh: number;
  currentSoc: number;
  reserveSoc: number;
  batteryHealth: number;
  currentSocFraction: number;
  reserveSocFraction: number;
  batteryHealthFraction: number;
  availableSocFraction: number;
  effectiveCapacityKWh: number;
  energyAvailableKWh: number;
  consumptionKWhPerKm: number;
  rangeKm: number;
  rangeMiles: number;
  standardScenarios: EvRangeScenario[];
  sensitivityScenarios: EvRangeScenario[];
  chargeScenarios: Array<{ soc: number; availableSocFraction: number; energyKWh: number; rangeKm: number; rangeMiles: number }>;
}

export type EvRangeResult = CalculationResult<EvRangeResultData>;

const validUnit = (unit: string): unit is EvRangeConsumptionUnit => ["kwh-per-100-km", "wh-per-km", "mi-per-kwh", "kwh-per-100-mi"].includes(unit);
const positive = (value: number) => Number.isFinite(value) && value > 0;
const percentage = (value: number, allowZero = true) => Number.isFinite(value) && value >= (allowZero ? 0 : Number.MIN_VALUE) && value <= 100;
const rangeMiles = (km: number) => km * 0.6213711922;

export function normalizeConsumption(value: number, unit: EvRangeConsumptionUnit): number {
  if (!validUnit(unit) || !positive(value)) throw new Error("Enter a valid energy-consumption value and unit.");
  switch (unit) {
    case "kwh-per-100-km": return value / 100;
    case "wh-per-km": return value / 1000;
    case "mi-per-kwh": return 1 / (value * 1.609344);
    case "kwh-per-100-mi": return value / 160.9344;
  }
}

export function formatConsumptionValue(normalized: number, unit: EvRangeConsumptionUnit): number {
  if (!positive(normalized) || !validUnit(unit)) throw new Error("Enter a valid normalized consumption and unit.");
  switch (unit) {
    case "kwh-per-100-km": return normalized * 100;
    case "wh-per-km": return normalized * 1000;
    case "mi-per-kwh": return 1 / (normalized * 1.609344);
    case "kwh-per-100-mi": return normalized * 160.9344;
  }
}

function scenario(normalized: number, label: string, energyKWh: number): EvRangeScenario {
  const rangeKm = energyKWh / normalized;
  return { label, consumptionKWhPerKm: normalized, rangeKm, rangeMiles: rangeMiles(rangeKm) };
}

export function calculateEvRange(input: EvRangeCalculationInput): EvRangeResult {
  if (!positive(input.batteryCapacityKWh)) throw new Error("Battery capacity must be greater than zero.");
  if (!percentage(input.currentSoc) || !percentage(input.reserveSoc)) throw new Error("SOC values must be between 0% and 100%.");
  if (!percentage(input.batteryHealth, false)) throw new Error("Battery health must be greater than 0% and no more than 100%.");
  const consumptionKWhPerKm = normalizeConsumption(input.consumption, input.consumptionUnit);
  const currentSocFraction = input.currentSoc / 100;
  const reserveSocFraction = input.reserveSoc / 100;
  const batteryHealthFraction = input.batteryHealth / 100;
  const availableSocFraction = Math.max(0, currentSocFraction - reserveSocFraction);
  const effectiveCapacityKWh = input.batteryCapacityKWh * batteryHealthFraction;
  const energyAvailableKWh = effectiveCapacityKWh * availableSocFraction;
  const rangeKm = energyAvailableKWh / consumptionKWhPerKm;
  const standardScenarios = [0.15, 0.18, 0.22].map((value) => scenario(value, `${value * 100} kWh/100 km`, energyAvailableKWh));
  const sensitivityScenarios = [
    scenario(consumptionKWhPerKm * 0.85, "15% lower energy consumption", energyAvailableKWh),
    scenario(consumptionKWhPerKm, "Current consumption", energyAvailableKWh),
    scenario(consumptionKWhPerKm * 1.15, "15% higher energy consumption", energyAvailableKWh),
  ];
  const chargeScenarios = [80, 90, 100].map((soc) => {
    const available = Math.max(0, soc / 100 - reserveSocFraction);
    const energy = effectiveCapacityKWh * available;
    const scenarioRangeKm = energy / consumptionKWhPerKm;
    return { soc, availableSocFraction: available, energyKWh: energy, rangeKm: scenarioRangeKm, rangeMiles: rangeMiles(scenarioRangeKm) };
  });
  const warnings: EvRangeResult["warnings"] = [{ code: "PLANNING_ESTIMATE", severity: "info", message: "This estimate uses a constant energy-consumption assumption and does not model speed, weather, terrain, traffic or temperature." }];
  if (availableSocFraction === 0) warnings.push({ code: "AT_OR_BELOW_RESERVE", severity: "caution", message: "Your current SOC is at or below the reserve you chose, so there is no planned driving range above that reserve." });
  return {
    formulaVersion: "1.0.0",
    result: { batteryCapacityKWh: input.batteryCapacityKWh, currentSoc: input.currentSoc, reserveSoc: input.reserveSoc, batteryHealth: input.batteryHealth, currentSocFraction, reserveSocFraction, batteryHealthFraction, availableSocFraction, effectiveCapacityKWh, energyAvailableKWh, consumptionKWhPerKm, rangeKm, rangeMiles: rangeMiles(rangeKm), standardScenarios, sensitivityScenarios, chargeScenarios },
    assumptions: [
      { key: "batteryCapacityKWh", value: input.batteryCapacityKWh, unit: "kWh", provenance: "user-entered", description: "Rated usable/net battery capacity" },
      { key: "batteryHealth", value: input.batteryHealth, unit: "%", provenance: "user-entered", description: "Planning derating of reference battery capacity" },
      { key: "reserveSoc", value: input.reserveSoc, unit: "%", provenance: "user-entered", description: "User planning reserve" },
      { key: "consumptionKWhPerKm", value: consumptionKWhPerKm, unit: "kWh/km", provenance: "derived", description: "Normalized battery-side consumption" },
    ],
    warnings,
    qualityLabel: "specific-inputs",
  };
}
