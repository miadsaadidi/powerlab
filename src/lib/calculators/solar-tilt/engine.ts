export interface SeasonalTilts {
  summer: number;
  yearRound: number;
  winter: number;
}

export interface OrientationSuggestion {
  label: "North" | "South" | "Equator";
  degrees: 0 | 180 | null;
}

export interface GroundAlbedoResult {
  groundViewFactor: number;
  reflectedIrradianceGainPct: number;
  snowSheddingEffectiveness: "Low (Risk of Snow Accumulation)" | "Moderate" | "Optimal (Natural Snow Shedding)";
}

export const clampTilt = (value: number) => Math.min(90, Math.max(0, value));

export function validateLatitude(value: number): string | null {
  if (!Number.isFinite(value)) return "Enter a valid latitude.";
  if (value < -90 || value > 90) return "Latitude must be between -90° and 90°.";
  return null;
}

export function calculateAnnualTilt(latitude: number) {
  return clampTilt(Math.abs(latitude));
}

export function calculateSeasonalTilts(latitude: number): SeasonalTilts {
  const annual = calculateAnnualTilt(latitude);
  return {
    summer: clampTilt(annual - 15),
    yearRound: annual,
    winter: clampTilt(annual + 15),
  };
}

export function calculateGroundAlbedoGain(tiltDeg: number, albedoType: "standard" | "snow" | "concrete" = "standard"): GroundAlbedoResult {
  const tilt = clampTilt(tiltDeg);
  const rad = (tilt * Math.PI) / 180;
  const groundViewFactor = (1 - Math.cos(rad)) / 2;
  const rho = albedoType === "snow" ? 0.70 : albedoType === "concrete" ? 0.35 : 0.20;
  const reflectedIrradianceGainPct = Number((groundViewFactor * rho * 100).toFixed(2));

  const snowSheddingEffectiveness =
    tilt >= 45 ? "Optimal (Natural Snow Shedding)" :
    tilt >= 25 ? "Moderate" :
    "Low (Risk of Snow Accumulation)";

  return {
    groundViewFactor: Number(groundViewFactor.toFixed(4)),
    reflectedIrradianceGainPct,
    snowSheddingEffectiveness,
  };
}

export function getEquatorFacingAzimuth(latitude: number): OrientationSuggestion {
  if (latitude > 0) return { label: "South", degrees: 180 };
  if (latitude < 0) return { label: "North", degrees: 0 };
  return { label: "Equator", degrees: null };
}
