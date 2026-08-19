import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export interface SpaceHeaterCostInput {
  heaterWatts: number;
  dailyHours: number;
  dutyCyclePercent?: number; // default 70%
  electricityRate: number; // $/kWh
  winterMonths?: number; // default 3
}

export interface SpaceHeaterCostResultData {
  heaterWatts: number;
  effectiveHourlyKwh: number;
  costPerHour: number;
  costPerNight8h: number;
  costPerDay: number;
  costPerMonth: number;
  costPerWinterSeason: number;
  
  // Continuous vs Thermostat Comparison
  continuousMonthlyCost: number;
  thermostatSavingsPerMonth: number;
  
  dailyOperatingHours: number;
  dutyCyclePercent: number;
}

export type SpaceHeaterCostResult = CalculationResult<SpaceHeaterCostResultData>;

export function calculateSpaceHeaterCost(input: SpaceHeaterCostInput): SpaceHeaterCostResult {
  const {
    heaterWatts,
    dailyHours,
    dutyCyclePercent = 70,
    electricityRate,
    winterMonths = 3,
  } = input;

  if (!Number.isFinite(heaterWatts) || heaterWatts <= 0) {
    throw new Error("Space heater power (Watts) must be greater than zero.");
  }
  if (!Number.isFinite(dailyHours) || dailyHours <= 0 || dailyHours > 24) {
    throw new Error("Daily operating hours must be between 0.1 and 24 hours.");
  }
  if (!Number.isFinite(electricityRate) || electricityRate <= 0) {
    throw new Error("Electricity rate ($/kWh) must be greater than zero.");
  }

  const dutyFraction = Math.max(0.1, Math.min(1.0, dutyCyclePercent / 100));
  const effectiveHourlyKwh = Number(((heaterWatts / 1000) * dutyFraction).toFixed(3));

  const costPerHour = Number((effectiveHourlyKwh * electricityRate).toFixed(4));
  const costPerNight8h = Number((costPerHour * 8).toFixed(2));
  const costPerDay = Number((costPerHour * dailyHours).toFixed(2));
  const costPerMonth = Number((costPerDay * 30.4375).toFixed(2));
  const costPerWinterSeason = Number((costPerMonth * winterMonths).toFixed(2));

  // Comparison vs 100% continuous full-blast run
  const continuousHourlyKwh = heaterWatts / 1000;
  const continuousDailyCost = continuousHourlyKwh * dailyHours * electricityRate;
  const continuousMonthlyCost = Number((continuousDailyCost * 30.4375).toFixed(2));
  const thermostatSavingsPerMonth = Math.max(0, Number((continuousMonthlyCost - costPerMonth).toFixed(2)));

  const assumptions: AssumptionUsed[] = [
    {
      key: "duty_cycle",
      value: dutyCyclePercent,
      unit: "%",
      provenance: "preset",
      description: "Thermostat on/off cycling percentage in an enclosed insulated room",
    },
    {
      key: "night_baseline",
      value: 8,
      unit: "hours",
      provenance: "preset",
      description: "Standard overnight sleep duration",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (heaterWatts >= 1500 && dailyHours >= 16) {
    warnings.push({
      code: "HIGH_SPACE_HEATER_CONSUMPTION",
      severity: "info",
      message: "Running a 1,500W space heater for 16+ hours a day adds substantial cost. Using a whole-home heat pump or zone thermostat is up to 300% more energy efficient.",
    });
  }

  return {
    formulaVersion: "1.0.0",
    result: {
      heaterWatts,
      effectiveHourlyKwh,
      costPerHour,
      costPerNight8h,
      costPerDay,
      costPerMonth,
      costPerWinterSeason,
      continuousMonthlyCost,
      thermostatSavingsPerMonth,
      dailyOperatingHours: dailyHours,
      dutyCyclePercent,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}
