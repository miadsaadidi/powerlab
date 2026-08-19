import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export interface GeneratorApplianceItem {
  id: string;
  label: string;
  runningWatts: number;
  startingWatts: number;
  quantity: number;
}

export interface GeneratorSizeInput {
  appliances: GeneratorApplianceItem[];
  safetyMarginFraction?: number; // default 0.20 (20%)
  fuelType?: "gasoline" | "propane" | "natural_gas" | "diesel";
}

export interface GeneratorSizeResultData {
  totalRunningWatts: number;
  maxInductiveSurgeDelta: number;
  totalStartingSurgeWatts: number;
  
  targetContinuousWatts: number;
  targetPeakSurgeWatts: number;
  
  // Recommendations
  recommendedPortableClass: string;
  recommendedStandbyClass: string;
  recommendedNemaOutlet: string;
  recommendedCordGauge: string;
  
  // Power factor & Volt-Amps
  apparentPowerKva: number;
  
  applianceCount: number;
}

export type GeneratorSizeResult = CalculationResult<GeneratorSizeResultData>;

export function calculateGeneratorSize(input: GeneratorSizeInput): GeneratorSizeResult {
  const { appliances, safetyMarginFraction = 0.20, fuelType = "gasoline" } = input;

  if (!appliances || appliances.length === 0) {
    throw new Error("Add at least one appliance to calculate generator size.");
  }

  let totalRunningWatts = 0;
  let maxInductiveSurgeDelta = 0;
  let totalItems = 0;

  for (const item of appliances) {
    if (!Number.isFinite(item.runningWatts) || item.runningWatts <= 0) {
      throw new Error(`Running watts for ${item.label} must be greater than zero.`);
    }
    const qty = Math.max(1, item.quantity || 1);
    totalItems += qty;
    totalRunningWatts += item.runningWatts * qty;

    const singleItemSurge = Math.max(item.runningWatts, item.startingWatts || item.runningWatts);
    const surgeDelta = singleItemSurge - item.runningWatts;
    if (surgeDelta > maxInductiveSurgeDelta) {
      maxInductiveSurgeDelta = surgeDelta;
    }
  }

  const totalStartingSurgeWatts = totalRunningWatts + maxInductiveSurgeDelta;
  const targetContinuousWatts = Math.round(totalRunningWatts * (1 + safetyMarginFraction));
  const targetPeakSurgeWatts = Math.round(totalStartingSurgeWatts * (1 + safetyMarginFraction));

  // Portable Generator Class Selection
  let recommendedPortableClass = "";
  let recommendedNemaOutlet = "";
  let recommendedCordGauge = "";

  if (targetContinuousWatts <= 2200) {
    recommendedPortableClass = "2,000W – 2,500W Quiet Inverter Generator";
    recommendedNemaOutlet = "Standard 5-20R (120V 20A Duplex)";
    recommendedCordGauge = "14 AWG or 12 AWG Heavy Extension Cord";
  } else if (targetContinuousWatts <= 3800) {
    recommendedPortableClass = "3,500W – 4,500W RV-Ready Portable Generator";
    recommendedNemaOutlet = "NEMA TT-30R / L5-30R (120V 30A)";
    recommendedCordGauge = "10 AWG Heavy Duty 3-Prong Cord";
  } else if (targetContinuousWatts <= 7500) {
    recommendedPortableClass = "7,500W – 9,500W Dual-Fuel Portable Generator";
    recommendedNemaOutlet = "NEMA L14-30R (120V/240V 30A 4-Prong Twist Lock)";
    recommendedCordGauge = "10 AWG 4-Conductor Generator Cord";
  } else if (targetContinuousWatts <= 12000) {
    recommendedPortableClass = "10,000W – 12,500W Tri-Fuel Heavy Portable";
    recommendedNemaOutlet = "NEMA 14-50R (120V/240V 50A 4-Prong)";
    recommendedCordGauge = "6 AWG 4-Conductor Heavy Power Cord";
  } else {
    recommendedPortableClass = "15 kW – 18 kW Large Trailered Portable";
    recommendedNemaOutlet = "Direct 50A / 100A Hardwired Transfer Connection";
    recommendedCordGauge = "4 AWG or 2 AWG Hardwire";
  }

  // Standby Class Selection (Standard whole house brackets)
  let recommendedStandbyClass = "";
  if (targetContinuousWatts <= 10000) {
    recommendedStandbyClass = "10 kW – 14 kW Automatic Standby Generator (Air-Cooled)";
  } else if (targetContinuousWatts <= 18000) {
    recommendedStandbyClass = "18 kW – 22 kW Whole-Home Standby Generator (Air-Cooled)";
  } else if (targetContinuousWatts <= 26000) {
    recommendedStandbyClass = "24 kW – 26 kW Large Whole-Home Standby";
  } else {
    recommendedStandbyClass = "30 kW – 48 kW Commercial Liquid-Cooled Generator";
  }

  // Apparent Power in kVA (assuming standard 0.8 power factor for motors)
  const apparentPowerKva = Number(((targetContinuousWatts / 0.8) / 1000).toFixed(2));

  const assumptions: AssumptionUsed[] = [
    {
      key: "safety_margin",
      value: Math.round(safetyMarginFraction * 100),
      unit: "%",
      provenance: "preset",
      description: "Continuous operating headroom to prevent generator engine bogging and thermal overload",
    },
    {
      key: "surge_logic",
      value: "Sequential motor startup",
      provenance: "preset",
      description: "Adds the single largest inductive motor startup surge to running load rather than summing all surges simultaneously",
    },
    {
      key: "power_factor",
      value: 0.8,
      provenance: "preset",
      description: "Standard inductive power factor assumed for generator sizing kVA conversion",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (targetContinuousWatts >= 10000) {
    warnings.push({
      code: "LARGE_WHOLE_HOME_LOAD",
      severity: "info",
      message: "Total continuous load exceeds 10 kW. A permanently installed standby generator with an automatic transfer switch (ATS) is recommended over portable units.",
    });
  }

  if (fuelType === "propane") {
    warnings.push({
      code: "PROPANE_DERATE",
      severity: "info",
      message: "Running on LP propane typically produces 10% lower peak wattage than gasoline due to fuel energy density.",
    });
  }

  return {
    formulaVersion: "1.0.0",
    result: {
      totalRunningWatts,
      maxInductiveSurgeDelta,
      totalStartingSurgeWatts,
      targetContinuousWatts,
      targetPeakSurgeWatts,
      recommendedPortableClass,
      recommendedStandbyClass,
      recommendedNemaOutlet,
      recommendedCordGauge,
      apparentPowerKva,
      applianceCount: totalItems,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}
