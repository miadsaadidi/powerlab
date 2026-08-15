export const SOLAR_DEFAULTS = {
  exampleLatitude: 34,
  exampleLongitude: -6.84,
  systemCapacityKw: 1,
  moduleType: 0,
  arrayType: 1,
  lossesPercent: 14,
  dcAcRatio: 1.2,
  inverterEfficiencyPercent: 96,
  gcr: 0.4,
  timeframe: "monthly",
} as const;

export const AZIMUTH_PRESETS = [
  { value: 0, label: "North" },
  { value: 90, label: "East" },
  { value: 180, label: "South" },
  { value: 270, label: "West" },
] as const;

export const PVWATTS_MODULE_TYPES = [
  { value: 0, label: "Standard" },
  { value: 1, label: "Premium" },
  { value: 2, label: "Thin film" },
] as const;

export const PVWATTS_ARRAY_TYPES = [
  { value: 0, label: "Fixed — Open Rack" },
  { value: 1, label: "Fixed — Roof Mounted" },
  { value: 2, label: "1-Axis Tracking" },
  { value: 3, label: "1-Axis Backtracking" },
  { value: 4, label: "2-Axis Tracking" },
] as const;
