import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export type AcRatingType = "SEER2" | "SEER" | "CEER" | "EER2" | "SACC" | "watts";

export interface AcCostInput {
  inputMode: "btu_seer" | "watts";
  ratingType?: AcRatingType;
  coolingCapacityBtu?: number;
  seer2Rating?: number; // Efficiency rating value (SEER2 / CEER / SACC / EER2)
  nameplateWatts?: number;
  dailyHours: number;
  compressorDutyCyclePercent?: number; // default 60%
  electricityRate: number; // $/kWh
  coolingSeasonMonths?: number; // default 4 months
}

export interface AcCostResultData {
  inputMode: "btu_seer" | "watts";
  ratingType: AcRatingType;
  effectiveElectricalWatts: number;
  activeHourKwh: number;
  clockHourKwh: number;
  costPerHour: number; // Clock-hour cost (with duty cycle)
  costPerActiveHour: number; // Full active hour (100% compressor run)
  costPerDay: number;
  costPerMonth: number;
  costPerSeason: number;
  
  // Efficiency Upgrade Comparisons
  costPerSeason10SeerLegacy: number;
  seasonalUpgradeSavings: number;
  
  dailyOperatingHours: number;
  dutyCyclePercent: number;
  electricityRate: number;
  coolingSeasonMonths: number;
}

export type AcCostResult = CalculationResult<AcCostResultData>;

export function calculateAcCost(input: AcCostInput): AcCostResult {
  const {
    inputMode,
    ratingType = inputMode === "watts" ? "watts" : "SEER2",
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
      throw new Error("Efficiency rating must be greater than zero.");
    }
    effectiveElectricalWatts = Math.round(coolingCapacityBtu / seer2Rating);
  } else {
    if (!Number.isFinite(nameplateWatts) || nameplateWatts <= 0) {
      throw new Error("AC power wattage must be greater than zero.");
    }
    effectiveElectricalWatts = Math.round(nameplateWatts);
  }

  const dutyFraction = Math.max(0.01, Math.min(1.0, compressorDutyCyclePercent / 100));
  const activeHourKwh = effectiveElectricalWatts / 1000;
  const clockHourKwh = activeHourKwh * dutyFraction;

  const costPerActiveHour = activeHourKwh * electricityRate;
  const costPerHour = clockHourKwh * electricityRate;
  const costPerDay = costPerHour * dailyHours;
  const daysPerMonth = 365.25 / 12; // 30.4375 average days per month
  const costPerMonth = costPerDay * daysPerMonth;
  const costPerSeason = costPerMonth * coolingSeasonMonths;

  // 10 SEER Legacy System Comparison using identical operating parameters
  const capacityBtu = inputMode === "btu_seer" ? coolingCapacityBtu : effectiveElectricalWatts * (seer2Rating || 12);
  const legacyElectricalWatts = Math.round(capacityBtu / 10);
  const legacyClockHourKwh = (legacyElectricalWatts / 1000) * dutyFraction;
  const legacyDailyCost = legacyClockHourKwh * dailyHours * electricityRate;
  const legacyMonthlyCost = legacyDailyCost * daysPerMonth;
  const costPerSeason10SeerLegacy = legacyMonthlyCost * coolingSeasonMonths;
  const seasonalUpgradeSavings = Math.max(0, costPerSeason10SeerLegacy - costPerSeason);

  const assumptions: AssumptionUsed[] = [
    {
      key: "duty_cycle",
      value: compressorDutyCyclePercent,
      unit: "%",
      provenance: "preset",
      description: "Illustrative compressor run-time percentage vs thermostat off-cycles in typical summer weather",
    },
    {
      key: "cooling_season",
      value: coolingSeasonMonths,
      unit: "months",
      provenance: "preset",
      description: "Representative residential active cooling season duration",
    },
    {
      key: "rating_model",
      value: ratingType,
      provenance: "preset",
      description: ratingType === "watts"
        ? "Direct electrical wattage measurement / nameplate power"
        : `Simplified seasonal planning model derived from nominal BTU capacity and ${ratingType} rating`,
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (dailyHours >= 18) {
    warnings.push({
      code: "CONTINUOUS_COOLING",
      severity: "info",
      message: "AC is running 18+ hours per day. Improving attic insulation, duct sealing, and window shading can significantly reduce run time.",
    });
  }

  return {
    formulaVersion: "1.0.0",
    result: {
      inputMode,
      ratingType,
      effectiveElectricalWatts,
      activeHourKwh,
      clockHourKwh,
      costPerHour,
      costPerActiveHour,
      costPerDay,
      costPerMonth,
      costPerSeason,
      costPerSeason10SeerLegacy,
      seasonalUpgradeSavings,
      dailyOperatingHours: dailyHours,
      dutyCyclePercent: compressorDutyCyclePercent,
      electricityRate,
      coolingSeasonMonths,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}

