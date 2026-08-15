export interface SeasonalTilts {
  summer: number;
  yearRound: number;
  winter: number;
}

export interface OrientationSuggestion {
  label: "North" | "South" | "Equator";
  degrees: 0 | 180 | null;
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

export function getEquatorFacingAzimuth(latitude: number): OrientationSuggestion {
  if (latitude > 0) return { label: "South", degrees: 180 };
  if (latitude < 0) return { label: "North", degrees: 0 };
  return { label: "Equator", degrees: null };
}
