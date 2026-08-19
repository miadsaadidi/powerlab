export const BATTERY_RUNTIME_DEFAULTS = {
  capacityWh: 1_000,
  capacityAh: 100,
  batteryVoltage: 12,
  loadWatts: 100,
  startingSoc: 1,
  reserveSoc: 0.2,
  batteryHealth: 1,
  acInverterEfficiency: 0.9,
  dcConversionEfficiency: 1,
  dutyCycle: 1,
  peukertEnabled: false,
} as const;

export const BATTERY_CAPACITY_DEFAULTS = {
  mode: "charge-to-energy",
  capacityAh: 100,
  voltage: 12,
  batteryChemistry: "lifepo4",
  startingSoc: 1,
  reserveSoc: 0.2,
  batteryHealth: 1,
} as const;

export const BATTERY_SIZE_DEFAULTS = {
  loadWatts: 500,
  runtimeHours: 4,
  batteryChemistry: "lifepo4",
  voltage: 24,
  acInverterEfficiency: 0.9,
  dcConversionEfficiency: 1,
  startingSoc: 1,
  reserveSoc: 0.2,
  batteryHealth: 1,
  designMargin: 0.1,
} as const;

export const UPS_RUNTIME_DEFAULTS = {
  batteryCapacityMode: "direct-wh",
  directWh: 216,
  batteryVoltage: 12,
  batteryAh: 9,
  batteryCount: 2,
  loadMode: "direct-watts",
  directLoadW: 100,
  usableFraction: 0.5,
  batteryHealth: 1,
  upsEfficiency: 0.9,
  ratedUpsMaxWatts: null,
  upsVA: null,
  assumedUpsOutputPowerFactor: 0.8,
} as const;

export const UPS_BATTERY_SIZE_DEFAULTS = {
  loadSource: "watts",
  loadW: 300,
  loadVA: 375,
  powerFactor: 0.8,
  runtimeHours: 0.5,
  busVoltage: 24,
  upsEfficiency: 0.9,
  usableFraction: 0.5,
  batteryHealth: 1,
  designMargin: 0.1,
  batteryChemistry: "agm",
} as const;

export const PORTABLE_POWER_STATION_DEFAULTS = {
  capacityWh: 1024,
  continuousOutputW: 1800,
  directLoadW: 100,
  acEfficiency: 0.9,
  batteryHealth: 1,
  reserveFraction: 0.05,
  desiredRuntimeHours: 8,
} as const;

export const BATTERY_CHEMISTRIES = [
  { id: "lifepo4", label: "LiFePO4 / LFP", reserveSoc: 0.2, peukertExponent: 1.05 },
  { id: "lithium-ion", label: "Lithium-ion", reserveSoc: 0.2, peukertExponent: 1.05 },
  { id: "agm", label: "AGM", reserveSoc: 0.5, peukertExponent: 1.25 },
  { id: "gel", label: "Gel", reserveSoc: 0.5, peukertExponent: 1.25 },
  { id: "flooded-lead-acid", label: "Flooded lead-acid", reserveSoc: 0.5, peukertExponent: 1.25 },
  { id: "custom", label: "Other / Custom", reserveSoc: 0.2, peukertExponent: 1.05 },
] as const;

export const BATTERY_VOLTAGE_PRESETS = [6, 12, 12.8, 24, 25.6, 36, 48, 51.2] as const;

export function resolveChemistryReserve(chemistryId: string, currentReserve: number, reserveCustomized: boolean) {
  const preset = BATTERY_CHEMISTRIES.find((item) => item.id === chemistryId);
  return preset && !reserveCustomized ? preset.reserveSoc : currentReserve;
}

export function resolveChemistryUsableFraction(chemistryId: string, currentFraction: number, customized: boolean) {
  const preset = BATTERY_CHEMISTRIES.find((item) => item.id === chemistryId);
  return preset && !customized ? 1 - preset.reserveSoc : currentFraction;
}
