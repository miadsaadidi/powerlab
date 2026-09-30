export type HeatingFuelType = "natural_gas" | "propane" | "heating_oil" | "electric_baseboard";

export interface HeatPumpPreset {
  label: string;
  mmbtu: number;
  scop: number;
  fuel: HeatingFuelType;
  afue: number;
  gasRate?: number;
  propaneRate?: number;
  oilRate?: number;
  elecrate: number;
}

export const HEAT_PUMP_DEFAULTS = {
  annualHeatingDemandMmbtu: 50, // 50 MMBTU (50,000,000 BTU) delivered heat illustrative scenario
  heatPumpScop: 3.2, // Simplified seasonal COP of 3.2
  electricityRate: 0.1834, // $/kWh (illustrative reference rate)
  existingFuelType: "natural_gas" as HeatingFuelType,
  furnaceAfuePercent: 80, // 80% standard AFUE furnace
  gasPricePerTherm: 1.45, // $/Therm
  propanePricePerGallon: 3.20, // $/gal
  oilPricePerGallon: 4.10, // $/gal
} as const;

export const QUICK_HEAT_PUMP_PRESETS: readonly HeatPumpPreset[] = [
  { label: "🏠 Sunbelt Mild Scenario (30 MMBTU · 3.5 COP vs 80% Gas)", mmbtu: 30, scop: 3.5, fuel: "natural_gas", afue: 80, gasRate: 1.50, elecrate: 0.1834 },
  { label: "🏡 Midwest Standard Scenario (50 MMBTU · 3.2 COP vs 80% Gas)", mmbtu: 50, scop: 3.2, fuel: "natural_gas", afue: 80, gasRate: 1.45, elecrate: 0.1834 },
  { label: "❄️ Northern Cold Scenario (70 MMBTU · 2.8 COP vs 96% Gas)", mmbtu: 70, scop: 2.8, fuel: "natural_gas", afue: 96, gasRate: 1.35, elecrate: 0.1834 },
  { label: "🪵 Rural Propane Replacement Scenario (50 MMBTU · 3.2 COP vs Propane)", mmbtu: 50, scop: 3.2, fuel: "propane", afue: 80, propaneRate: 3.20, elecrate: 0.1834 },
  { label: "🛢️ Northeast Oil Replacement Scenario (60 MMBTU · 3.0 COP vs Oil)", mmbtu: 60, scop: 3.0, fuel: "heating_oil", afue: 80, oilRate: 4.10, elecrate: 0.1834 },
] as const;
