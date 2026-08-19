import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export interface SolarChargeControllerInput {
  technology: "mppt" | "pwm";
  panelWatts: number;
  panelCount: number;
  batteryVoltage: 12 | 24 | 48;
  panelVoc: number; // Open circuit voltage at 25°C
  panelIsc: number; // Short circuit current at 25°C
  seriesCount: number;
  parallelCount: number;
  minWinterTempCelsius?: number; // default -10°C
  tempCoeffPercentPerCelsius?: number; // default -0.33%/°C
}

export interface SolarChargeControllerResultData {
  technology: "mppt" | "pwm";
  totalArrayWatts: number;
  nominalBatteryVoltage: number;
  
  // Output Current (Amps into battery)
  requiredChargeCurrentAmps: number;
  recommendedControllerAmps: number;
  
  // Array Voltages
  nominalArrayVoc25C: number;
  worstCaseColdVoc: number;
  recommendedMaxVoltageRating: number;
  
  // Short Circuit Current
  arrayTotalIscAmps: number;
  
  // Recommended Hardware Class
  recommendedModelClass: string;
  voltageSafetyHeadroomVolts: number;
}

export type SolarChargeControllerResult = CalculationResult<SolarChargeControllerResultData>;

export function calculateSolarChargeController(input: SolarChargeControllerInput): SolarChargeControllerResult {
  const {
    technology,
    panelWatts,
    panelCount,
    batteryVoltage,
    panelVoc,
    panelIsc,
    seriesCount,
    parallelCount,
    minWinterTempCelsius = -10,
    tempCoeffPercentPerCelsius = -0.33,
  } = input;

  if (!Number.isFinite(panelWatts) || panelWatts <= 0) {
    throw new Error("Panel wattage must be greater than zero.");
  }
  if (!Number.isFinite(panelCount) || panelCount <= 0) {
    throw new Error("Panel count must be at least 1.");
  }
  if (!Number.isFinite(panelVoc) || panelVoc <= 0) {
    throw new Error("Panel open-circuit voltage (Voc) must be greater than zero.");
  }
  if (!Number.isFinite(panelIsc) || panelIsc <= 0) {
    throw new Error("Panel short-circuit current (Isc) must be greater than zero.");
  }
  if (!Number.isFinite(seriesCount) || seriesCount <= 0) {
    throw new Error("Series panel count must be at least 1.");
  }
  if (!Number.isFinite(parallelCount) || parallelCount <= 0) {
    throw new Error("Parallel strings count must be at least 1.");
  }

  const totalArrayWatts = panelWatts * panelCount;
  const nominalArrayVoc25C = Number((panelVoc * seriesCount).toFixed(1));
  const arrayTotalIscAmps = Number((panelIsc * parallelCount).toFixed(1));

  // Cold Weather Voc Rise Calculation (STC standard is 25°C)
  const tempDelta = 25 - minWinterTempCelsius;
  const absTempCoeff = Math.abs(tempCoeffPercentPerCelsius) / 100;
  const coldMultiplier = 1 + tempDelta * absTempCoeff;
  const worstCaseColdVoc = Number((nominalArrayVoc25C * coldMultiplier).toFixed(1));

  // Charging Current (Amps into Battery Bank)
  let requiredChargeCurrentAmps = 0;
  if (technology === "mppt") {
    // MPPT converts high PV voltage down to battery voltage at ~98% conversion efficiency
    // Add NEC 1.25 continuous safety factor
    const nominalCurrent = totalArrayWatts / batteryVoltage;
    requiredChargeCurrentAmps = Number((nominalCurrent * 1.25).toFixed(1));
  } else {
    // PWM does not convert voltage, current into battery equals array Isc * parallel strings * 1.25
    requiredChargeCurrentAmps = Number((arrayTotalIscAmps * 1.25).toFixed(1));
  }

  // Standard Commercial Hardware Brackets
  let recommendedMaxVoltageRating = 75;
  if (worstCaseColdVoc > 190) {
    recommendedMaxVoltageRating = 250;
  } else if (worstCaseColdVoc > 120) {
    recommendedMaxVoltageRating = 150;
  } else if (worstCaseColdVoc > 75) {
    recommendedMaxVoltageRating = 100;
  } else {
    recommendedMaxVoltageRating = 75;
  }

  // Commercial Amperage Brackets: 10A, 15A, 20A, 30A, 40A, 50A, 60A, 70A, 80A, 100A
  const standardAmps = [10, 15, 20, 30, 40, 50, 60, 70, 80, 100];
  const recommendedControllerAmps = standardAmps.find((a) => a >= requiredChargeCurrentAmps) ?? Math.ceil(requiredChargeCurrentAmps / 10) * 10;

  const voltageSafetyHeadroomVolts = Number((recommendedMaxVoltageRating - worstCaseColdVoc).toFixed(1));
  const recommendedModelClass = `${technology.toUpperCase()} ${recommendedMaxVoltageRating}V / ${recommendedControllerAmps}A Controller`;

  const assumptions: AssumptionUsed[] = [
    {
      key: "temp_coeff",
      value: `${tempCoeffPercentPerCelsius}%/°C`,
      provenance: "preset",
      description: "Standard silicon PV panel temperature coefficient for cold weather voltage rise",
    },
    {
      key: "nec_continuous_factor",
      value: 1.25,
      provenance: "preset",
      description: "NEC 125% continuous output safety margin for charge controllers",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (technology === "pwm" && worstCaseColdVoc > 30 && batteryVoltage === 12) {
    warnings.push({
      code: "PWM_VOLTAGE_MISMATCH",
      severity: "caution",
      message: "High panel voltage with a PWM controller results in massive power loss (up to 50%). Switch to MPPT technology to harvest full solar wattage.",
    });
  }

  if (voltageSafetyHeadroomVolts < 5) {
    warnings.push({
      code: "LOW_VOLTAGE_HEADROOM",
      severity: "caution",
      message: `Array cold-weather voltage (${worstCaseColdVoc}V) is dangerously close to the controller's ${recommendedMaxVoltageRating}V limit. Consider stepping up to a 150V controller to avoid hardware failure.`,
    });
  }

  return {
    formulaVersion: "1.0.0",
    result: {
      technology,
      totalArrayWatts,
      nominalBatteryVoltage: batteryVoltage,
      requiredChargeCurrentAmps,
      recommendedControllerAmps,
      nominalArrayVoc25C,
      worstCaseColdVoc,
      recommendedMaxVoltageRating,
      arrayTotalIscAmps,
      recommendedModelClass,
      voltageSafetyHeadroomVolts,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}
