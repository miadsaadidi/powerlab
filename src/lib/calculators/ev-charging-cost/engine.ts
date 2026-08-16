export type EvChargingCostMode = "session" | "driving";
export type ConsumptionUnit = "kwh-per-100-km" | "kwh-per-100-mi";
export type DistanceUnit = "km" | "mi";
export type DistancePeriod = "day" | "week" | "month" | "year";

export interface EvChargingCostInput {
  mode: EvChargingCostMode;
  batteryCapacityKWh?: number;
  startSoc?: number;
  targetSoc?: number;
  consumption?: number;
  consumptionUnit?: ConsumptionUnit;
  distance?: number;
  distanceUnit?: DistanceUnit;
  distancePeriod?: DistancePeriod;
  pricePerKWh: number;
  sourceToBatteryEfficiency: number;
}

export interface EvChargingCostScenario {
  label: string;
  multiplier: number;
  pricePerKWh: number;
  cost: number;
}

export interface EvChargingCostResult {
  mode: EvChargingCostMode;
  batteryEnergyKWh: number;
  sourceEnergyKWh: number;
  selectedPeriodCost: number;
  selectedPeriodLabel: "session" | DistancePeriod;
  dailyCost: number;
  monthlyCost: number;
  annualCost: number;
  dailyDistanceKm?: number;
  batteryConsumptionKWhPerKm?: number;
  costPer100Km?: number;
  costPer100Mi?: number;
  scenarios: EvChargingCostScenario[];
}

const DAYS_PER_YEAR = 365.25;
const DAYS_PER_MONTH = DAYS_PER_YEAR / 12;
const MILES_TO_KM = 1.609344;
const KM_PER_100_MI = 160.9344;

const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

function validateCommon(input: EvChargingCostInput) {
  if (!finite(input.pricePerKWh) || input.pricePerKWh < 0) throw new Error("Electricity price must be zero or greater.");
  if (!finite(input.sourceToBatteryEfficiency) || input.sourceToBatteryEfficiency <= 0 || input.sourceToBatteryEfficiency > 1) throw new Error("Source-to-battery efficiency must be greater than 0% and no more than 100%.");
}

function periodDays(period: DistancePeriod): number {
  if (period === "day") return 1;
  if (period === "week") return 7;
  if (period === "month") return DAYS_PER_MONTH;
  return DAYS_PER_YEAR;
}

function priceScenarios(pricePerKWh: number, cost: number): EvChargingCostScenario[] {
  return [
    { label: "75% price", multiplier: 0.75, pricePerKWh: pricePerKWh * 0.75, cost: cost * 0.75 },
    { label: "100% price", multiplier: 1, pricePerKWh, cost },
    { label: "125% price", multiplier: 1.25, pricePerKWh: pricePerKWh * 1.25, cost: cost * 1.25 },
  ];
}

export function calculateEvChargingCost(input: EvChargingCostInput): EvChargingCostResult {
  validateCommon(input);

  if (input.mode === "session") {
    if (!finite(input.batteryCapacityKWh) || input.batteryCapacityKWh <= 0) throw new Error("Enter usable battery capacity greater than zero.");
    if (!finite(input.startSoc) || !finite(input.targetSoc) || input.startSoc < 0 || input.startSoc > 1 || input.targetSoc <= input.startSoc || input.targetSoc > 1) throw new Error("Target charge must be above starting charge and no more than 100%.");
    const batteryEnergyKWh = input.batteryCapacityKWh * (input.targetSoc - input.startSoc);
    const sourceEnergyKWh = batteryEnergyKWh / input.sourceToBatteryEfficiency;
    const selectedPeriodCost = sourceEnergyKWh * input.pricePerKWh;
    return {
      mode: input.mode,
      batteryEnergyKWh,
      sourceEnergyKWh,
      selectedPeriodCost,
      selectedPeriodLabel: "session",
      dailyCost: selectedPeriodCost,
      monthlyCost: selectedPeriodCost,
      annualCost: selectedPeriodCost,
      scenarios: priceScenarios(input.pricePerKWh, selectedPeriodCost),
    };
  }

  if (!finite(input.consumption) || input.consumption <= 0) throw new Error("Battery consumption must be greater than zero.");
  if (input.consumptionUnit !== "kwh-per-100-km" && input.consumptionUnit !== "kwh-per-100-mi") throw new Error("Choose a supported battery consumption unit.");
  if (!finite(input.distance) || input.distance < 0) throw new Error("Distance must be zero or greater.");
  if (input.distanceUnit !== "km" && input.distanceUnit !== "mi") throw new Error("Choose a supported distance unit.");
  if (input.distancePeriod !== "day" && input.distancePeriod !== "week" && input.distancePeriod !== "month" && input.distancePeriod !== "year") throw new Error("Choose a supported distance period.");

  const batteryConsumptionKWhPerKm = input.consumptionUnit === "kwh-per-100-km" ? input.consumption / 100 : input.consumption / KM_PER_100_MI;
  const distanceKm = input.distanceUnit === "km" ? input.distance : input.distance * MILES_TO_KM;
  const selectedPeriodCost = distanceKm * batteryConsumptionKWhPerKm / input.sourceToBatteryEfficiency * input.pricePerKWh;
  const days = periodDays(input.distancePeriod);
  const dailyCost = selectedPeriodCost / days;
  const monthlyCost = dailyCost * DAYS_PER_MONTH;
  const annualCost = dailyCost * DAYS_PER_YEAR;
  const batteryEnergyKWh = distanceKm * batteryConsumptionKWhPerKm;
  const sourceEnergyKWh = batteryEnergyKWh / input.sourceToBatteryEfficiency;
  const sourceEnergyPerKm = batteryConsumptionKWhPerKm / input.sourceToBatteryEfficiency;
  return {
    mode: input.mode,
    batteryEnergyKWh,
    sourceEnergyKWh,
    selectedPeriodCost,
    selectedPeriodLabel: input.distancePeriod,
    dailyCost,
    monthlyCost,
    annualCost,
    dailyDistanceKm: distanceKm / days,
    batteryConsumptionKWhPerKm,
    costPer100Km: sourceEnergyPerKm * 100 * input.pricePerKWh,
    costPer100Mi: sourceEnergyPerKm * KM_PER_100_MI * input.pricePerKWh,
    scenarios: priceScenarios(input.pricePerKWh, selectedPeriodCost),
  };
}
