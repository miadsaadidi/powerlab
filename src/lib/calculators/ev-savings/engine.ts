export type DistanceUnit = "km" | "mi";
export type EvConsumptionUnit = "kwh-per-100-km" | "kwh-per-100-mi" | "mi-per-kwh";
export type FuelConsumptionUnit = "l-per-100-km" | "km-per-l" | "us-mpg";
export type FuelPriceUnit = "per-liter" | "per-us-gallon";

export interface EvSavingsInput {
  annualDistance: number;
  distanceUnit: DistanceUnit;
  evConsumption: number;
  evConsumptionUnit: EvConsumptionUnit;
  electricityPricePerKWh: number;
  chargingEfficiency: number;
  fuelConsumption: number;
  fuelConsumptionUnit: FuelConsumptionUnit;
  fuelPrice: number;
  fuelPriceUnit: FuelPriceUnit;
  annualEvMaintenance?: number;
  annualIceMaintenance?: number;
}

export interface EvSavingsScenario {
  label: string;
  multiplier: number;
  electricityPricePerKWh: number;
  evEnergyCost: number;
  savings: number;
}

export interface EvSavingsResult {
  annualDistanceKm: number;
  annualDistanceMiles: number;
  evKWhPerKm: number;
  fuelLitersPerKm: number;
  fuelPricePerLiter: number;
  evBatteryEnergyKWh: number;
  evGridEnergyKWh: number;
  evEnergyCost: number;
  fuelLiters: number;
  fuelGallons: number;
  fuelCost: number;
  operatingSavings: number;
  monthlyOperatingSavings: number;
  maintenanceDifference: number | null;
  totalComparedSavings: number | null;
  primarySavings: number;
  primaryScope: "operating" | "maintenance-adjusted";
  evCostPer100Km: number;
  evCostPer100Mi: number;
  fuelCostPer100Km: number;
  fuelCostPer100Mi: number;
  fuelEconomy: { lPer100Km: number; kmPerL: number; usMpg: number };
  scenarios: EvSavingsScenario[];
}

const MILES_TO_KM = 1.609344;
const LITERS_PER_US_GALLON = 3.785411784;
const KM_PER_US_MILE = 1.609344;
const KM_PER_100_MI = 160.9344;
const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

function requirePositive(value: unknown, message: string): asserts value is number {
  if (!finite(value) || value <= 0) throw new Error(message);
}

function requireNonNegative(value: unknown, message: string): asserts value is number {
  if (!finite(value) || value < 0) throw new Error(message);
}

export function evConsumptionToKWhPerKm(value: number, unit: EvConsumptionUnit): number {
  requirePositive(value, "EV battery consumption must be greater than zero.");
  if (unit === "kwh-per-100-km") return value / 100;
  if (unit === "kwh-per-100-mi") return value / KM_PER_100_MI;
  if (unit === "mi-per-kwh") return 1 / (value * KM_PER_US_MILE);
  throw new Error("Choose a supported EV consumption unit.");
}

export function fuelConsumptionToLitersPerKm(value: number, unit: FuelConsumptionUnit): number {
  requirePositive(value, "Fuel consumption must be greater than zero.");
  if (unit === "l-per-100-km") return value / 100;
  if (unit === "km-per-l") return 1 / value;
  if (unit === "us-mpg") return LITERS_PER_US_GALLON / (value * KM_PER_US_MILE);
  throw new Error("Choose a supported fuel consumption unit.");
}

export function fuelPriceToPerLiter(value: number, unit: FuelPriceUnit): number {
  requireNonNegative(value, "Fuel price must be zero or greater.");
  return unit === "per-liter" ? value : value / LITERS_PER_US_GALLON;
}

function validateMaintenance(value: number | undefined, label: string): void {
  if (value !== undefined) requireNonNegative(value, `${label} must be zero or greater.`);
}

function resolveEfficiency(eff: number): number {
  if (!finite(eff) || eff <= 0) throw new Error("Charging efficiency must be greater than 0.");
  if (eff > 0 && eff <= 1) return eff;
  if (eff >= 5 && eff <= 100) return eff / 100;
  throw new Error("Charging efficiency must be no more than 100%.");
}

export function calculateEvSavings(input: EvSavingsInput): EvSavingsResult {
  requirePositive(input.annualDistance, "Annual distance must be greater than zero.");
  if (input.distanceUnit !== "km" && input.distanceUnit !== "mi") throw new Error("Choose a supported distance unit.");
  
  const efficiency = resolveEfficiency(input.chargingEfficiency);
  requireNonNegative(input.electricityPricePerKWh, "Electricity price must be zero or greater.");
  if (input.fuelPriceUnit !== "per-liter" && input.fuelPriceUnit !== "per-us-gallon") throw new Error("Choose a supported fuel price unit.");
  
  validateMaintenance(input.annualEvMaintenance, "Annual EV maintenance");
  validateMaintenance(input.annualIceMaintenance, "Annual ICE maintenance");

  const annualDistanceKm = input.distanceUnit === "km" ? input.annualDistance : input.annualDistance * MILES_TO_KM;
  const annualDistanceMiles = annualDistanceKm / MILES_TO_KM;
  
  const evKWhPerKm = evConsumptionToKWhPerKm(input.evConsumption, input.evConsumptionUnit);
  const fuelLitersPerKm = fuelConsumptionToLitersPerKm(input.fuelConsumption, input.fuelConsumptionUnit);
  const fuelPricePerLiter = fuelPriceToPerLiter(input.fuelPrice, input.fuelPriceUnit);

  // Exact battery energy before charging losses
  const evBatteryEnergyKWh = annualDistanceKm * evKWhPerKm;
  // Wall/grid energy drawn factoring in charging efficiency exactly once
  const evGridEnergyKWh = evBatteryEnergyKWh / efficiency;
  const evEnergyCost = evGridEnergyKWh * input.electricityPricePerKWh;

  const fuelLiters = annualDistanceKm * fuelLitersPerKm;
  const fuelGallons = fuelLiters / LITERS_PER_US_GALLON;
  const fuelCost = fuelLiters * fuelPricePerLiter;
  const operatingSavings = fuelCost - evEnergyCost;

  const hasMaintenance = input.annualEvMaintenance !== undefined && input.annualIceMaintenance !== undefined;
  const maintenanceDifference = hasMaintenance ? input.annualIceMaintenance! - input.annualEvMaintenance! : null;
  const totalComparedSavings = hasMaintenance ? operatingSavings + maintenanceDifference! : null;
  const primarySavings = totalComparedSavings ?? operatingSavings;

  const evCostPer100Km = (evKWhPerKm / efficiency) * 100 * input.electricityPricePerKWh;
  const evCostPer100Mi = (evKWhPerKm / efficiency) * KM_PER_100_MI * input.electricityPricePerKWh;
  const fuelCostPer100Km = fuelLitersPerKm * 100 * fuelPricePerLiter;
  const fuelCostPer100Mi = fuelLitersPerKm * KM_PER_100_MI * fuelPricePerLiter;

  const scenarios = [0.75, 1, 1.25].map((multiplier) => {
    const scenarioPrice = input.electricityPricePerKWh * multiplier;
    const scenarioEvCost = evGridEnergyKWh * scenarioPrice;
    const scenarioOperatingSavings = fuelCost - scenarioEvCost;
    return {
      label: multiplier === 1 ? "Current electricity price" : `${multiplier < 1 ? "75%" : "125%"} of current price`,
      multiplier,
      electricityPricePerKWh: scenarioPrice,
      evEnergyCost: scenarioEvCost,
      savings: hasMaintenance ? scenarioOperatingSavings + maintenanceDifference! : scenarioOperatingSavings,
    };
  });

  return {
    annualDistanceKm,
    annualDistanceMiles,
    evKWhPerKm,
    fuelLitersPerKm,
    fuelPricePerLiter,
    evBatteryEnergyKWh,
    evGridEnergyKWh,
    evEnergyCost,
    fuelLiters,
    fuelGallons,
    fuelCost,
    operatingSavings,
    monthlyOperatingSavings: operatingSavings / 12,
    maintenanceDifference,
    totalComparedSavings,
    primarySavings,
    primaryScope: hasMaintenance ? "maintenance-adjusted" : "operating",
    evCostPer100Km,
    evCostPer100Mi,
    fuelCostPer100Km,
    fuelCostPer100Mi,
    fuelEconomy: {
      lPer100Km: fuelLitersPerKm * 100,
      kmPerL: 1 / fuelLitersPerKm,
      usMpg: LITERS_PER_US_GALLON / (fuelLitersPerKm * KM_PER_US_MILE),
    },
    scenarios,
  };
}
