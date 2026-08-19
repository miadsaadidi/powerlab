import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export interface V2lRuntimeInput {
  batteryCapacityKwh: number;
  startingSocPercent: number; // e.g. 90%
  drivingReservePercent?: number; // default 20%
  averageLoadWatts: number;
  v2lMaxOutputWatts?: number; // default 3600W
  inverterEfficiencyPercent?: number; // default 92%
}

export interface DayDischargeRow {
  day: number;
  remainingKwh: number;
  socPercent: number;
}

export interface V2lRuntimeResultData {
  totalRuntimeHours: number;
  totalRuntimeDays: number;
  
  // Usable Energy & Reserve
  startingEnergyKwh: number;
  reserveEnergyKwh: number;
  availableBackupEnergyKwh: number;
  deliveredAcEnergyKwh: number;
  
  // Driving Range Safeguard
  preservedDrivingRangeMiles: number;
  
  averageLoadWatts: number;
  isOverloaded: boolean;
  
  dischargeTimeline: DayDischargeRow[];
}

export type V2lRuntimeResult = CalculationResult<V2lRuntimeResultData>;

export function calculateV2lRuntime(input: V2lRuntimeInput): V2lRuntimeResult {
  const {
    batteryCapacityKwh,
    startingSocPercent,
    drivingReservePercent = 20,
    averageLoadWatts,
    v2lMaxOutputWatts = 3600,
    inverterEfficiencyPercent = 92,
  } = input;

  if (!Number.isFinite(batteryCapacityKwh) || batteryCapacityKwh <= 0) {
    throw new Error("EV battery capacity (kWh) must be greater than zero.");
  }
  if (!Number.isFinite(startingSocPercent) || startingSocPercent <= 0 || startingSocPercent > 100) {
    throw new Error("Starting state of charge must be between 1% and 100%.");
  }
  if (!Number.isFinite(averageLoadWatts) || averageLoadWatts <= 0) {
    throw new Error("Average appliance load (Watts) must be greater than zero.");
  }

  const startingEnergyKwh = Number((batteryCapacityKwh * (startingSocPercent / 100)).toFixed(2));
  const reserveEnergyKwh = Number((batteryCapacityKwh * (Math.max(0, drivingReservePercent) / 100)).toFixed(2));
  const availableBackupEnergyKwh = Math.max(0, Number((startingEnergyKwh - reserveEnergyKwh).toFixed(2)));

  const efficiencyFrac = Math.max(0.7, Math.min(0.98, inverterEfficiencyPercent / 100));
  const deliveredAcEnergyKwh = Number((availableBackupEnergyKwh * efficiencyFrac).toFixed(2));

  const totalRuntimeHours = averageLoadWatts > 0 ? Number(((deliveredAcEnergyKwh * 1000) / averageLoadWatts).toFixed(1)) : 0;
  const totalRuntimeDays = Number((totalRuntimeHours / 24).toFixed(1));

  // Preserved driving range (assuming typical 3.3 miles / kWh EV efficiency)
  const preservedDrivingRangeMiles = Math.round(reserveEnergyKwh * 3.3);

  // Overload check
  const isOverloaded = averageLoadWatts > v2lMaxOutputWatts;

  // Multi-day discharge timeline simulation
  const dischargeTimeline: DayDischargeRow[] = [];
  const dailyKwhConsumed = (averageLoadWatts * 24) / (1000 * efficiencyFrac);
  let currentEnergyKwh = startingEnergyKwh;

  for (let d = 0; d <= Math.ceil(totalRuntimeDays); d++) {
    if (d === 0) {
      dischargeTimeline.push({
        day: 0,
        remainingKwh: startingEnergyKwh,
        socPercent: startingSocPercent,
      });
    } else {
      currentEnergyKwh = Math.max(reserveEnergyKwh, currentEnergyKwh - dailyKwhConsumed);
      const currentSoc = Number(((currentEnergyKwh / batteryCapacityKwh) * 100).toFixed(0));
      dischargeTimeline.push({
        day: d,
        remainingKwh: Number(currentEnergyKwh.toFixed(1)),
        socPercent: currentSoc,
      });
    }
  }

  const assumptions: AssumptionUsed[] = [
    {
      key: "driving_reserve",
      value: drivingReservePercent,
      unit: "%",
      provenance: "user-entered",
      description: "Protected battery energy reserve retained for post-outage emergency driving",
    },
    {
      key: "v2l_efficiency",
      value: inverterEfficiencyPercent,
      unit: "%",
      provenance: "preset",
      description: "Vehicle high-voltage DC to 120V/240V AC bidirectional inverter conversion efficiency",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (isOverloaded) {
    warnings.push({
      code: "V2L_SOCKET_OVERLOAD",
      severity: "caution",
      message: `Connected load (${averageLoadWatts}W) exceeds the vehicle's maximum V2L port capacity (${v2lMaxOutputWatts}W). Reduce load to prevent socket breaker trip.`,
    });
  }

  if (startingSocPercent <= drivingReservePercent) {
    warnings.push({
      code: "SOC_BELOW_RESERVE",
      severity: "caution",
      message: "Current state of charge is equal to or below your emergency driving reserve. No backup energy is available without dipping into driving range.",
    });
  }

  return {
    formulaVersion: "1.0.0",
    result: {
      totalRuntimeHours,
      totalRuntimeDays,
      startingEnergyKwh,
      reserveEnergyKwh,
      availableBackupEnergyKwh,
      deliveredAcEnergyKwh,
      preservedDrivingRangeMiles,
      averageLoadWatts,
      isOverloaded,
      dischargeTimeline,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}
