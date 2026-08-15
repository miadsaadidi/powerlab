export interface SolarProductionRequest {
  latitude: number;
  longitude: number;
  systemCapacityKw: number;
  tiltDeg: number;
  azimuthDeg: number;
  moduleType: 0 | 1 | 2;
  arrayType: 0 | 1 | 2 | 3 | 4;
  lossesPercent: number;
  dcAcRatio?: number;
  inverterEfficiencyPercent?: number;
}

export interface SolarProductionResult {
  provider: "pvwatts-v8";
  annualAcKwh: number;
  monthlyAcKwh: number[];
  monthlyDcKwh?: number[];
  monthlyPoaKwhM2?: number[];
  monthlySolarRadiationKwhM2Day?: number[];
  annualSolarRadiationKwhM2Day?: number;
  capacityFactorPercent?: number;
  assumptions: Record<string, number | string>;
  warnings: string[];
}

type RawPvWattsResponse = {
  outputs?: {
    ac_annual?: unknown;
    ac_monthly?: unknown;
    dc_monthly?: unknown;
    poa_monthly?: unknown;
    solrad_monthly?: unknown;
    solrad_annual?: unknown;
    capacity_factor?: unknown;
  };
  errors?: unknown;
  warnings?: unknown;
};

export const PVWATTS_DEFAULT_API_URL = "https://developer.nlr.gov/api/pvwatts/v8.json";

const finiteNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
const numberArray = (value: unknown) => Array.isArray(value) && value.every(finiteNumber) ? value : undefined;

export function normalizeSolarRequest(input: SolarProductionRequest) {
  if (!Number.isFinite(input.latitude) || input.latitude < -90 || input.latitude > 90) throw new Error("Latitude must be between -90° and 90°.");
  if (!Number.isFinite(input.longitude) || input.longitude < -180 || input.longitude > 180) throw new Error("Longitude must be between -180° and 180°.");
  if (!Number.isFinite(input.tiltDeg) || input.tiltDeg < 0 || input.tiltDeg > 90) throw new Error("Tilt must be between 0° and 90°.");
  if (!Number.isFinite(input.azimuthDeg) || input.azimuthDeg < 0 || input.azimuthDeg >= 360) throw new Error("Azimuth must be between 0° and 359.99°.");
  if (!Number.isFinite(input.systemCapacityKw) || input.systemCapacityKw <= 0) throw new Error("System size must be greater than zero.");
  if (!Number.isFinite(input.lossesPercent) || input.lossesPercent < 0 || input.lossesPercent > 100) throw new Error("System losses must be between 0% and 100%.");
  if (!Number.isFinite(input.dcAcRatio) || (input.dcAcRatio ?? 0) <= 0) throw new Error("DC/AC ratio must be greater than zero.");
  if (!Number.isFinite(input.inverterEfficiencyPercent) || (input.inverterEfficiencyPercent ?? 0) <= 0 || (input.inverterEfficiencyPercent ?? 0) > 100) throw new Error("Inverter efficiency must be between 1% and 100%.");
  return input;
}

export function normalizePvWattsResponse(raw: RawPvWattsResponse, request: SolarProductionRequest): SolarProductionResult {
  const outputs = raw.outputs;
  const monthlyAcKwh = numberArray(outputs?.ac_monthly);
  if (!finiteNumber(outputs?.ac_annual) || outputs.ac_annual < 0 || !monthlyAcKwh || monthlyAcKwh.length !== 12 || monthlyAcKwh.some((value) => value < 0)) throw new Error("PVWatts returned an incomplete production result.");
  if (outputs.capacity_factor !== undefined && (!finiteNumber(outputs.capacity_factor) || outputs.capacity_factor < 0)) throw new Error("PVWatts returned an invalid capacity factor.");
  const warnings = [
    ...(Array.isArray(raw.warnings) ? raw.warnings.filter((item): item is string => typeof item === "string") : []),
    ...(Array.isArray(raw.errors) ? raw.errors.filter((item): item is string => typeof item === "string") : []),
  ];
  return {
    provider: "pvwatts-v8",
    annualAcKwh: outputs.ac_annual,
    monthlyAcKwh,
    monthlyDcKwh: numberArray(outputs.dc_monthly),
    monthlyPoaKwhM2: numberArray(outputs.poa_monthly),
    monthlySolarRadiationKwhM2Day: numberArray(outputs.solrad_monthly),
    annualSolarRadiationKwhM2Day: finiteNumber(outputs.solrad_annual) ? outputs.solrad_annual : undefined,
    capacityFactorPercent: finiteNumber(outputs.capacity_factor) ? outputs.capacity_factor : undefined,
    assumptions: {
      latitude: request.latitude,
      longitude: request.longitude,
      systemCapacityKw: request.systemCapacityKw,
      tiltDeg: request.tiltDeg,
      azimuthDeg: request.azimuthDeg,
      lossesPercent: request.lossesPercent,
      dcAcRatio: request.dcAcRatio ?? 1.2,
      inverterEfficiencyPercent: request.inverterEfficiencyPercent ?? 96,
    },
    warnings,
  };
}

export function buildPvWattsParams(request: SolarProductionRequest) {
  return new URLSearchParams({
    api_key: process.env.PVWATTS_API_KEY ?? "",
    lat: String(request.latitude),
    lon: String(request.longitude),
    dataset: "nsrdb",
    system_capacity: String(request.systemCapacityKw),
    module_type: String(request.moduleType),
    array_type: String(request.arrayType),
    losses: String(request.lossesPercent),
    tilt: String(request.tiltDeg),
    azimuth: String(request.azimuthDeg),
    dc_ac_ratio: String(request.dcAcRatio ?? 1.2),
    inv_eff: String(request.inverterEfficiencyPercent ?? 96),
    gcr: "0.4",
    timeframe: "monthly",
  });
}

export async function requestPvWatts(request: SolarProductionRequest): Promise<SolarProductionResult> {
  normalizeSolarRequest(request);
  const apiKey = process.env.PVWATTS_API_KEY;
  if (!apiKey) throw new Error("Solar production modeling is not configured.");
  const endpoint = process.env.PVWATTS_API_URL ?? PVWATTS_DEFAULT_API_URL;
  const params = buildPvWattsParams(request);
  const response = await fetch(`${endpoint}?${params.toString()}`, { signal: AbortSignal.timeout(15_000), next: { revalidate: 3600 } });
  if (!response.ok) throw new Error("Solar production modeling is temporarily unavailable.");
  return normalizePvWattsResponse(await response.json() as RawPvWattsResponse, request);
}
