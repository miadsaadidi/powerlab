import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export interface AcCostInput {
  inputMode: "btu_seer" | "watts";
  coolingCapacityBtu?: number;
  seer2Rating?: number;
  nameplateWatts?: number;
  dailyHours: number;
  compressorDutyCyclePercent?: number; // default 60%
  electricityRate: number; // $/kWh
  coolingSeasonMonths?: number; // default 4 months
}

export interface AcCostResultData {
  effectiveElectricalWatts: number;
  hourlyKwh: number;
  costPerHour: number;
  costPerDay: number;
  costPerMonth: number;
  costPerSeason: number;
  
  // Efficiency Upgrade Comparisons
  costPerSeason10SeerLegacy: number;
  seasonalUpgradeSavings: number;
  
  dailyOperatingHours: number;
  dutyCyclePercent: number;
}

export type AcCostResult = CalculationResult<AcCostResultData>;

export function calculateAcCost(input: AcCostInput): AcCostResult {
  const {
    inputMode,
    coolingCapacityBtu = 36000,
    seer2Rating = 14.3,
    nameplateWatts = 2500,
    dailyHours,
    compressorDutyCyclePercent = 60,
    electricityRate,
    coolingSeasonMonths = 4,
  } = input;

  if (!Number.isFinite(dailyHours) || dailyHours <= 0 || dailyHours > 24) {
    throw new Error("Daily operating hours must be between 0.1 and 24 hours.");
  }
  if (!Number.isFinite(electricityRate) || electricityRate <= 0) {
    throw new Error("Electricity rate ($/kWh) must be greater than zero.");
  }

  let effectiveElectricalWatts = 0;
  if (inputMode === "btu_seer") {
    if (!Number.isFinite(coolingCapacityBtu) || coolingCapacityBtu <= 0) {
      throw new Error("Cooling capacity (BTU) must be greater than zero.");
    }
    if (!Number.isFinite(seer2Rating) || seer2Rating <= 0) {
      throw new Error("SEER2 rating must be greater than zero.");
    }
    effectiveElectricalWatts = Math.round(coolingCapacityBtu / seer2Rating);
  } else {
    if (!Number.isFinite(nameplateWatts) || nameplateWatts <= 0) {
      throw new Error("AC power wattage must be greater than zero.");
    }
    effectiveElectricalWatts = nameplateWatts;
  }

  const dutyFraction = Math.max(0.1, Math.min(1.0, compressorDutyCyclePercent / 100));
  const hourlyKwh = Number(((effectiveElectricalWatts / 1000) * dutyFraction).toFixed(3));

  const costPerHour = Number((hourlyKwh * electricityRate).toFixed(4));
  const costPerDay = Number((costPerHour * dailyHours).toFixed(2));
  const costPerMonth = Number((costPerDay * 30.4375).toFixed(2));
  const costPerSeason = Number((costPerMonth * coolingSeasonMonths).toFixed(2));

  // 10 SEER Legacy System Comparison
  const capacityBtu = inputMode === "btu_seer" ? coolingCapacityBtu : effectiveElectricalWatts * (seer2Rating || 12);
  const legacyHourlyKwh = (capacityBtu / 10 / 1000) * dutyFraction;
  const costPerSeason10SeerLegacy = Number((legacyHourlyKwh * electricityRate * dailyHours * 30.4375 * coolingSeasonMonths).toFixed(2));
  const seasonalUpgradeSavings = Math.max(0, Number((costPerSeason10SeerLegacy - costPerSeason).toFixed(2)));

  const assumptions: AssumptionUsed[] = [
    {
      key: "duty_cycle",
      value: compressorDutyCyclePercent,
      unit: "%",
      provenance: "preset",
      description: "Compressor run-time percentage vs thermostat off-cycles in typical summer weather",
    },
    {
      key: "cooling_season",
      value: coolingSeasonMonths,
      unit: "months",
      provenance: "preset",
      description: "Standard residential active air conditioning period (June through September)",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (dailyHours >= 18) {
    warnings.push({
      code: "CONTINUOUS_COOLING",
      severity: "info",
      message: "AC is running 18+ hours per day. Ensuring adequate attic insulation and shading windows can significantly reduce run time.",
    });
  }

  return {
    formulaVersion: "1.0.0",
    result: {
      effectiveElectricalWatts,
      hourlyKwh,
      costPerHour,
      costPerDay,
      costPerMonth,
      costPerSeason,
      costPerSeason10SeerLegacy,
      seasonalUpgradeSavings,
      dailyOperatingHours: dailyHours,
      dutyCyclePercent: compressorDutyCyclePercent,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}
