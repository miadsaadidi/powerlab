import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export interface InverterLoadItem {
  id: string;
  label: string;
  runningWatts: number;
  surgeWatts: number;
  quantity: number;
}

export interface InverterSizeInput {
  appliances: InverterLoadItem[];
  batteryVoltage: 12 | 24 | 48;
  inverterEfficiencyPercent?: number; // default 90%
  safetyHeadroomFraction?: number; // default 0.20 (20%)
  waveformPreference?: "pure_sine" | "modified_sine";
}

export interface InverterSizeResultData {
  totalRunningWatts: number;
  maxMotorSurgeDelta: number;
  totalSurgeWatts: number;
  
  targetContinuousWatts: number;
  targetPeakSurgeWatts: number;
  
  // Recommendations
  recommendedInverterWatts: number;
  recommendedInverterSurgeWatts: number;
  recommendedInverterClass: string;
  
  // DC Current & Fuse Sizing
  maxContinuousDcAmps: number;
  recommendedDcFuseAmps: number;
  recommendedBatteryCableGauge: string;
  
  batteryVoltage: 12 | 24 | 48;
  waveformRecommended: "pure_sine" | "modified_sine";
}

export type InverterSizeResult = CalculationResult<InverterSizeResultData>;

export function calculateInverterSize(input: InverterSizeInput): InverterSizeResult {
  const {
    appliances,
    batteryVoltage,
    inverterEfficiencyPercent = 90,
    safetyHeadroomFraction = 0.20,
    waveformPreference = "pure_sine",
  } = input;

  if (!appliances || appliances.length === 0) {
    throw new Error("Add at least one appliance to calculate inverter size.");
  }

  let totalRunningWatts = 0;
  let maxMotorSurgeDelta = 0;

  for (const item of appliances) {
    if (!Number.isFinite(item.runningWatts) || item.runningWatts <= 0) {
      throw new Error(`Running watts for ${item.label} must be greater than zero.`);
    }
    const qty = Math.max(1, item.quantity || 1);
    totalRunningWatts += item.runningWatts * qty;

    const singleSurge = Math.max(item.runningWatts, item.surgeWatts || item.runningWatts);
    const surgeDelta = singleSurge - item.runningWatts;
    if (surgeDelta > maxMotorSurgeDelta) {
      maxMotorSurgeDelta = surgeDelta;
    }
  }

  const totalSurgeWatts = totalRunningWatts + maxMotorSurgeDelta;
  const targetContinuousWatts = Math.round(totalRunningWatts * (1 + safetyHeadroomFraction));
  const targetPeakSurgeWatts = Math.round(totalSurgeWatts * (1 + safetyHeadroomFraction));

  // Standard Commercial Inverter Sizes (Watts)
  const standardInverterRatings = [300, 600, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 8000, 10000];
  const recommendedInverterWatts = standardInverterRatings.find((r) => r >= targetContinuousWatts) ?? Math.ceil(targetContinuousWatts / 1000) * 1000;
  const recommendedInverterSurgeWatts = recommendedInverterWatts * 2; // standard 2x surge rating

  // DC Current Draw Calculation
  const efficiencyFrac = Math.max(0.7, Math.min(0.98, inverterEfficiencyPercent / 100));
  const maxContinuousDcAmps = Number(((recommendedInverterWatts / (batteryVoltage * efficiencyFrac))).toFixed(1));

  // Fuse Sizing (1.25 continuous safety factor)
  const standardFuses = [30, 40, 50, 60, 80, 100, 125, 150, 175, 200, 250, 300, 400, 500];
  const requiredFuseAmps = maxContinuousDcAmps * 1.25;
  const recommendedDcFuseAmps = standardFuses.find((f) => f >= requiredFuseAmps) ?? Math.ceil(requiredFuseAmps / 50) * 50;

  // Battery Cable Gauge Recommendation (NEC 75°C Copper)
  let recommendedBatteryCableGauge = "10 AWG";
  if (recommendedDcFuseAmps <= 30) recommendedBatteryCableGauge = "10 AWG";
  else if (recommendedDcFuseAmps <= 50) recommendedBatteryCableGauge = "8 AWG";
  else if (recommendedDcFuseAmps <= 70) recommendedBatteryCableGauge = "6 AWG";
  else if (recommendedDcFuseAmps <= 90) recommendedBatteryCableGauge = "4 AWG";
  else if (recommendedDcFuseAmps <= 120) recommendedBatteryCableGauge = "2 AWG";
  else if (recommendedDcFuseAmps <= 160) recommendedBatteryCableGauge = "1/0 AWG";
  else if (recommendedDcFuseAmps <= 200) recommendedBatteryCableGauge = "2/0 AWG";
  else if (recommendedDcFuseAmps <= 260) recommendedBatteryCableGauge = "4/0 AWG";
  else recommendedBatteryCableGauge = "2× 4/0 AWG or 250 kcmil";

  const recommendedInverterClass = `${recommendedInverterWatts.toLocaleString()}W Pure Sine Wave (${recommendedInverterSurgeWatts.toLocaleString()}W Surge)`;

  const assumptions: AssumptionUsed[] = [
    {
      key: "inverter_efficiency",
      value: inverterEfficiencyPercent,
      unit: "%",
      provenance: "preset",
      description: "Typical DC-to-AC pure sine wave inverter conversion efficiency",
    },
    {
      key: "headroom_margin",
      value: Math.round(safetyHeadroomFraction * 100),
      unit: "%",
      provenance: "preset",
      description: "Continuous operating headroom to avoid triggering inverter overload alarms",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (maxContinuousDcAmps >= 200 && batteryVoltage === 12) {
    warnings.push({
      code: "HIGH_DC_CURRENT_12V",
      severity: "caution",
      message: `DC current draw is extremely high (${maxContinuousDcAmps}A at 12V). Stepping up to a 24V or 48V battery bank will cut amperage in half and drastically reduce cable thickness.`,
    });
  }

  return {
    formulaVersion: "1.0.0",
    result: {
      totalRunningWatts,
      maxMotorSurgeDelta,
      totalSurgeWatts,
      targetContinuousWatts,
      targetPeakSurgeWatts,
      recommendedInverterWatts,
      recommendedInverterSurgeWatts,
      recommendedInverterClass,
      maxContinuousDcAmps,
      recommendedDcFuseAmps,
      recommendedBatteryCableGauge,
      batteryVoltage,
      waveformRecommended: "pure_sine",
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}
