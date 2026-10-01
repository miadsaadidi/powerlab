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
  safetyMarginFraction?: number; // default 0.20 (20% planning headroom)
  fuelType?: "gasoline" | "propane" | "natural_gas" | "diesel";
}

export interface GeneratorSizeResultData {
  totalRunningWatts: number;
  maxInductiveSurgeDelta: number;
  totalStartingSurgeWatts: number;
  
  targetContinuousWatts: number;
  targetPeakSurgeWatts: number;
  planningMarginPercent: number;
  
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

interface GeneratorCapacityBracket {
  label: string;
  maxContinuousW: number;
  maxPeakW: number;
  typicalReceptacle: string;
  typicalConnectionNote: string;
  standbyClass: string;
}

const GENERATOR_BRACKETS: GeneratorCapacityBracket[] = [
  {
    label: "2,000W – 2,500W Inverter Generator class",
    maxContinuousW: 2000,
    maxPeakW: 2500,
    typicalReceptacle: "NEMA 5-20R (120V 20A Duplex)",
    typicalConnectionNote: "Verify generator receptacle and cord rating",
    standbyClass: "Portable inverter scale — dedicated extension cords",
  },
  {
    label: "3,500W – 4,500W Portable Generator class",
    maxContinuousW: 3600,
    maxPeakW: 4800,
    typicalReceptacle: "NEMA L5-30R (120V 30A Twist-Lock) or NEMA TT-30R",
    typicalConnectionNote: "Verify generator receptacle and cord rating",
    standbyClass: "Portable scale — manual transfer switch or extension cords",
  },
  {
    label: "7,500W – 9,500W Portable Generator class",
    maxContinuousW: 7500,
    maxPeakW: 9500,
    typicalReceptacle: "NEMA L14-30R (120V/240V 30A Twist-Lock)",
    typicalConnectionNote: "Verify generator receptacle and transfer switch rating",
    standbyClass: "10 kW – 14 kW Standby Generator class (Essential circuits)",
  },
  {
    label: "10,000W – 12,500W Heavy Portable Generator class",
    maxContinuousW: 10000,
    maxPeakW: 13000,
    typicalReceptacle: "NEMA 14-50R (120V/240V 50A)",
    typicalConnectionNote: "Verify generator receptacle and transfer switch rating",
    standbyClass: "14 kW – 18 kW Standby Generator class",
  },
  {
    label: "14 kW – 18 kW Large Portable or Standby Generator class",
    maxContinuousW: 14000,
    maxPeakW: 18000,
    typicalReceptacle: "Verify generator receptacle or hardwired transfer inlet",
    typicalConnectionNote: "Hardwired transfer equipment or listed inlet box",
    standbyClass: "18 kW – 22 kW Standby Generator class",
  },
  {
    label: "20 kW – 26 kW Standby Generator class",
    maxContinuousW: 20000,
    maxPeakW: 26000,
    typicalReceptacle: "Hardwired Automatic Transfer Switch (ATS)",
    typicalConnectionNote: "Permanently wired automatic transfer switch required",
    standbyClass: "22 kW – 26 kW Whole-Home Standby Generator class",
  },
];

export function calculateGeneratorSize(input: GeneratorSizeInput): GeneratorSizeResult {
  const { appliances, safetyMarginFraction = 0.20, fuelType = "gasoline" } = input;

  if (!appliances || appliances.length === 0) {
    throw new Error("Add at least one appliance to estimate generator size.");
  }

  let totalRunningWatts = 0;
  let maxInductiveSurgeDelta = 0;
  let totalItems = 0;
  let hasMissingSurge = false;

  for (const item of appliances) {
    if (!Number.isFinite(item.runningWatts) || item.runningWatts <= 0) {
      throw new Error(`Running watts for ${item.label} must be greater than zero.`);
    }
    const qty = Math.max(1, item.quantity || 1);
    totalItems += qty;
    totalRunningWatts += item.runningWatts * qty;

    const singleItemSurge = Number.isFinite(item.startingWatts) && item.startingWatts > 0
      ? item.startingWatts
      : item.runningWatts;

    if (item.startingWatts === undefined || item.startingWatts === null) {
      hasMissingSurge = true;
    }

    const surgeDelta = Math.max(0, singleItemSurge - item.runningWatts);
    if (surgeDelta > maxInductiveSurgeDelta) {
      maxInductiveSurgeDelta = surgeDelta;
    }
  }

  // Simplified sequential-start planning model:
  // Calculated_Peak_W = Total_Running_W + Max(Motor_Starting_W - Motor_Running_W)
  const totalStartingSurgeWatts = totalRunningWatts + maxInductiveSurgeDelta;

  // Apply planning margin (headroom)
  const targetContinuousWatts = Math.round(totalRunningWatts * (1 + safetyMarginFraction));
  const targetPeakSurgeWatts = Math.round(totalStartingSurgeWatts * (1 + safetyMarginFraction));
  const planningMarginPercent = Math.round(safetyMarginFraction * 100);

  // Dual-condition generator class selection: must satisfy BOTH continuous and peak surge requirements
  const matchedBracket = GENERATOR_BRACKETS.find(
    (b) => b.maxContinuousW >= targetContinuousWatts && b.maxPeakW >= targetPeakSurgeWatts
  );

  const selectedBracket = matchedBracket || {
    label: "30 kW+ Commercial Standby Generator class",
    maxContinuousW: 48000,
    maxPeakW: 60000,
    typicalReceptacle: "Hardwired Automatic Transfer Switch (ATS)",
    typicalConnectionNote: "Permanently wired automatic transfer switch required",
    standbyClass: "30 kW – 48 kW Liquid-Cooled Standby Generator class",
  };

  // Apparent Power in kVA (assuming standard 0.8 power factor for planning)
  const apparentPowerKva = Number(((targetContinuousWatts / 0.8) / 1000).toFixed(2));

  const assumptions: AssumptionUsed[] = [
    {
      key: "safety_margin",
      value: planningMarginPercent,
      unit: "%",
      provenance: "preset",
      description: "Planning headroom margin above running load to prevent generator engine bogging",
    },
    {
      key: "surge_logic",
      value: "Sequential motor startup",
      provenance: "preset",
      description: "Simplified sequential-start model: adds the single largest motor startup surge delta to continuous running load",
    },
    {
      key: "power_factor",
      value: 0.8,
      provenance: "preset",
      description: "Reference 0.8 power factor used for kVA planning conversion",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (hasMissingSurge) {
    warnings.push({
      code: "SURGE_DATA_ESTIMATED",
      severity: "info",
      message: "Some appliances lack manufacturer startup surge data; verify motor nameplate LRA for motorized loads.",
    });
  }

  if (targetContinuousWatts >= 10000) {
    warnings.push({
      code: "LARGE_WHOLE_HOME_LOAD",
      severity: "info",
      message: "Estimated continuous load exceeds 10 kW. A permanently installed standby generator with listed transfer equipment is typically recommended.",
    });
  }

  if (fuelType === "propane") {
    warnings.push({
      code: "PROPANE_DERATE",
      severity: "info",
      message: "Running on LP propane typically derates peak generator output by approximately 10% compared with gasoline due to fuel energy density.",
    });
  } else if (fuelType === "natural_gas") {
    warnings.push({
      code: "NATURAL_GAS_DERATE",
      severity: "info",
      message: "Running on natural gas typically derates generator capacity by approximately 15% to 20% compared with gasoline.",
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
      planningMarginPercent,
      recommendedPortableClass: selectedBracket.label,
      recommendedStandbyClass: selectedBracket.standbyClass,
      recommendedNemaOutlet: selectedBracket.typicalReceptacle,
      recommendedCordGauge: selectedBracket.typicalConnectionNote,
      apparentPowerKva,
      applianceCount: totalItems,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}
