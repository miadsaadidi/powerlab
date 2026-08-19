export type HeatingFuelType = "natural_gas" | "propane" | "heating_oil" | "electric_baseboard";

export const HEAT_PUMP_DEFAULTS = {
  annualHeatingDemandMmbtu: 50, // 50 MMBTU (50,000,000 BTU) delivered heat
  heatPumpScop: 3.2, // 320% seasonal COP (~9.0 HSPF2)
  electricityRate: 0.18, // $/kWh
  existingFuelType: "natural_gas" as HeatingFuelType,
  furnaceAfuePercent: 80, // 80% standard AFUE furnace
  gasPricePerTherm: 1.40, // $/Therm
  propanePricePerGallon: 3.20, // $/gal
  oilPricePerGallon: 4.10, // $/gal
} as const;

export const QUICK_HEAT_PUMP_PRESETS = [
  { label: "🏠 Sunbelt Mild Home (30 MMBTU · 3.5 COP vs 80% Gas)", mmbtu: 30, scop: 3.5, fuel: "natural_gas" as const, afue: 80, gasRate: 1.50, elecrate: 0.18 },
  { label: "🏡 Midwest Standard (50 MMBTU · 3.2 COP vs 80% Gas)", mmbtu: 50, scop: 3.2, fuel: "natural_gas" as const, afue: 80, gasRate: 1.40, elecrate: 0.18 },
  { label: "❄️ Northern Cold Climate (70 MMBTU · 2.8 COP vs 96% Gas)", mmbtu: 70, scop: 2.8, fuel: "natural_gas" as const, afue: 96, gasRate: 1.35, elecrate: 0.18 },
  { label: "🪵 Rural Propane Replacement (50 MMBTU · 3.2 COP vs Propane)", mmbtu: 50, scop: 3.2, fuel: "propane" as const, afue: 80, propaneRate: 3.20, elecrate: 0.18 },
  { label: "🛢️ Northeast Heating Oil Replacement (60 MMBTU · 3.0 COP vs Oil)", mmbtu: 60, scop: 3.0, fuel: "heating_oil" as const, afue: 80, oilRate: 4.10, elecrate: 0.18 },
];
