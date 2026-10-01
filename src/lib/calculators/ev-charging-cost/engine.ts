import type { AssumptionUsed, CalculationResult, CalculationWarning, InputProvenance } from "@/types/calculation";

export type EvChargingCostMode = "session" | "driving";
export type ConsumptionUnit = "kwh-per-100-km" | "kwh-per-100-mi";
export type ConsumptionBasis = "battery-consumption" | "wall-consumption";
export type DistanceUnit = "km" | "mi";
export type DistancePeriod = "day" | "week" | "month" | "year";

export interface EvChargingCostInput {
  mode: EvChargingCostMode;
  batteryCapacityKWh?: number;
  batteryCapacityKwh?: number; // alias
  startSoc?: number; // 0..1 fraction or 0..100 percentage
  targetSoc?: number; // 0..1 fraction or 0..100 percentage
  startSocPercent?: number; // explicit percentage 0..100
  targetSocPercent?: number; // explicit percentage 0..100
  consumption?: number;
  consumptionUnit?: ConsumptionUnit;
  consumptionBasis?: ConsumptionBasis;
  distance?: number;
  distanceUnit?: DistanceUnit;
  distancePeriod?: DistancePeriod;
  pricePerKWh: number;
  sourceToBatteryEfficiency?: number; // 0..1 fraction or 0..100 percentage (default 0.90)
}

export interface EvChargingCostScenario {
  label: string;
  multiplier: number;
  pricePerKWh: number;
  cost: number;
}

export interface EvChargingCostData {
  mode: EvChargingCostMode;
  batteryEnergyAddedKwh: number;
  batteryEnergyKWh: number; // alias
  sourceEnergyKwh: number;
  sourceEnergyKWh: number; // alias
  chargingEfficiency: number;
  sourceToBatteryEfficiency: number; // alias
  electricityRate: number;
  sessionCost: number;
  selectedPeriodCost: number;
  selectedPeriodLabel: "session" | DistancePeriod;
  dailyCost: number;
  monthlyCost: number;
  annualCost: number;
  dailyDistanceKm?: number;
  batteryConsumptionKWhPerKm?: number;
  wallConsumptionKWhPerKm?: number;
  costPerKm?: number;
  costPerMile?: number;
  costPer100Km?: number;
  costPer100Mi?: number;
  costPer100Miles?: number;
  consumptionBasis?: ConsumptionBasis;
  scenarios: EvChargingCostScenario[];
}

export type EvChargingCostResult = CalculationResult<EvChargingCostData> & EvChargingCostData;

const DAYS_PER_YEAR = 365.25;
const DAYS_PER_MONTH = DAYS_PER_YEAR / 12;
const MILES_TO_KM = 1.609344;
const KM_PER_100_MI = 160.9344;

const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

function resolveSocFraction(value: number | undefined, percentValue: number | undefined): number {
  if (percentValue !== undefined && Number.isFinite(percentValue)) {
    return percentValue / 100;
  }
  if (value === undefined || !Number.isFinite(value)) return NaN;
  if (value >= 0 && value <= 1) return value;
  return value / 100;
}

function resolveEfficiency(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) return 0.90;
  if (value > 0 && value <= 1) return value;
  if (value >= 5 && value <= 100) return value / 100;
  return value;
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
  if (!finite(input.pricePerKWh) || input.pricePerKWh < 0) {
    throw new Error("Electricity price must be zero or greater.");
  }

  const efficiency = resolveEfficiency(input.sourceToBatteryEfficiency);
  if (efficiency <= 0 || efficiency > 1) {
    throw new Error("Source-to-battery efficiency must be greater than 0% and no more than 100%.");
  }

  const assumptions: AssumptionUsed[] = [
    {
      key: "electricityRate",
      value: input.pricePerKWh,
      unit: "$/kWh",
      provenance: "user-entered",
      description: "Electricity price per billed/source kilowatt-hour",
    },
    {
      key: "chargingEfficiency",
      value: efficiency * 100,
      unit: "%",
      provenance: "preset",
      description: "Overall source-to-battery charging efficiency — illustrative assumption",
    },
  ];

  const warnings: CalculationWarning[] = [];

  if (input.mode === "session") {
    const capacity = input.batteryCapacityKwh ?? input.batteryCapacityKWh;
    if (!finite(capacity) || capacity <= 0) {
      throw new Error("Enter usable battery capacity greater than zero.");
    }

    const startSoc = resolveSocFraction(input.startSoc, input.startSocPercent);
    const targetSoc = resolveSocFraction(input.targetSoc, input.targetSocPercent);

    if (!finite(startSoc) || startSoc < 0 || startSoc > 1) {
      throw new Error("Starting charge must be between 0% and 100%.");
    }
    if (!finite(targetSoc) || targetSoc < 0 || targetSoc > 1) {
      throw new Error("Target charge must be between 0% and 100%.");
    }
    if (targetSoc < startSoc) {
      throw new Error("Target charge must be greater than or equal to starting charge.");
    }

    const deltaSoc = targetSoc - startSoc;
    const batteryEnergyAddedKwh = capacity * deltaSoc;
    const sourceEnergyKwh = batteryEnergyAddedKwh / efficiency;
    const sessionCost = sourceEnergyKwh * input.pricePerKWh;

    const data: EvChargingCostData = {
      mode: "session",
      batteryEnergyAddedKwh,
      batteryEnergyKWh: batteryEnergyAddedKwh,
      sourceEnergyKwh,
      sourceEnergyKWh: sourceEnergyKwh,
      chargingEfficiency: efficiency,
      sourceToBatteryEfficiency: efficiency,
      electricityRate: input.pricePerKWh,
      sessionCost,
      selectedPeriodCost: sessionCost,
      selectedPeriodLabel: "session",
      dailyCost: sessionCost,
      monthlyCost: sessionCost,
      annualCost: sessionCost,
      scenarios: priceScenarios(input.pricePerKWh, sessionCost),
    };

    return {
      formulaVersion: "ev-charging-cost-v2",
      result: data,
      assumptions,
      warnings,
      qualityLabel: "specific-inputs",
      ...data,
    };
  }

  // Driving mode
  if (!finite(input.consumption) || input.consumption <= 0) {
    throw new Error("Energy consumption must be greater than zero.");
  }
  const consumptionUnit = input.consumptionUnit ?? "kwh-per-100-km";
  if (consumptionUnit !== "kwh-per-100-km" && consumptionUnit !== "kwh-per-100-mi") {
    throw new Error("Choose a supported consumption unit.");
  }
  if (!finite(input.distance) || input.distance < 0) {
    throw new Error("Distance must be zero or greater.");
  }
  const distanceUnit = input.distanceUnit ?? "km";
  if (distanceUnit !== "km" && distanceUnit !== "mi") {
    throw new Error("Choose a supported distance unit.");
  }
  const distancePeriod = input.distancePeriod ?? "day";
  if (distancePeriod !== "day" && distancePeriod !== "week" && distancePeriod !== "month" && distancePeriod !== "year") {
    throw new Error("Choose a supported distance period.");
  }

  const consumptionBasis = input.consumptionBasis ?? "battery-consumption";

  // If consumptionBasis is "battery-consumption" (e.g. onboard trip meter), charging losses must be added to reach wall energy.
  // If consumptionBasis is "wall-consumption" (e.g. EPA label), the consumption value already includes charging losses.
  const rawKWhPerKm = consumptionUnit === "kwh-per-100-km" ? input.consumption / 100 : input.consumption / KM_PER_100_MI;
  const distanceKm = distanceUnit === "km" ? input.distance : input.distance * MILES_TO_KM;

  let batteryConsumptionKWhPerKm: number;
  let wallConsumptionKWhPerKm: number;

  if (consumptionBasis === "wall-consumption") {
    wallConsumptionKWhPerKm = rawKWhPerKm;
    batteryConsumptionKWhPerKm = rawKWhPerKm * efficiency;
  } else {
    batteryConsumptionKWhPerKm = rawKWhPerKm;
    wallConsumptionKWhPerKm = rawKWhPerKm / efficiency;
  }

  const batteryEnergyAddedKwh = distanceKm * batteryConsumptionKWhPerKm;
  const sourceEnergyKwh = distanceKm * wallConsumptionKWhPerKm;
  const selectedPeriodCost = sourceEnergyKwh * input.pricePerKWh;

  const days = periodDays(distancePeriod);
  const dailyCost = days > 0 ? selectedPeriodCost / days : 0;
  const monthlyCost = dailyCost * DAYS_PER_MONTH;
  const annualCost = dailyCost * DAYS_PER_YEAR;

  const costPerKm = wallConsumptionKWhPerKm * input.pricePerKWh;
  const costPerMile = costPerKm * MILES_TO_KM;
  const costPer100Km = costPerKm * 100;
  const costPer100Mi = costPerMile * 100;

  const data: EvChargingCostData = {
    mode: "driving",
    batteryEnergyAddedKwh,
    batteryEnergyKWh: batteryEnergyAddedKwh,
    sourceEnergyKwh,
    sourceEnergyKWh: sourceEnergyKwh,
    chargingEfficiency: efficiency,
    sourceToBatteryEfficiency: efficiency,
    electricityRate: input.pricePerKWh,
    sessionCost: selectedPeriodCost,
    selectedPeriodCost,
    selectedPeriodLabel: distancePeriod,
    dailyCost,
    monthlyCost,
    annualCost,
    dailyDistanceKm: distanceKm / days,
    batteryConsumptionKWhPerKm,
    wallConsumptionKWhPerKm,
    costPerKm,
    costPerMile,
    costPer100Km,
    costPer100Mi,
    costPer100Miles: costPer100Mi,
    consumptionBasis,
    scenarios: priceScenarios(input.pricePerKWh, selectedPeriodCost),
  };

  return {
    formulaVersion: "ev-charging-cost-v2",
    result: data,
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
    ...data,
  };
}
