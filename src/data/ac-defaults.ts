export const AC_COST_DEFAULTS = {
  inputMode: "btu_seer" as "btu_seer" | "watts",
  coolingCapacityBtu: 36000, // 3.0 Ton Central AC
  seer2Rating: 14.3, // standard modern SEER2
  nameplateWatts: 2500,
  dailyHours: 8,
  compressorDutyCyclePercent: 60, // 60% active cooling duty
  electricityRate: 0.18, // $/kWh
  coolingSeasonMonths: 4, // June - September
} as const;

export const QUICK_AC_PRESETS = [
  { label: "🪟 Small Bedroom Window AC (5k BTU · 11 CEER)", mode: "btu_seer" as const, btu: 5000, seer: 11.0, watts: 450, hours: 8, duty: 60 },
  { label: "🚪 Living Room Window AC (10k BTU · 12 CEER)", mode: "btu_seer" as const, btu: 10000, seer: 12.0, watts: 830, hours: 8, duty: 60 },
  { label: "📦 Portable AC Unit (12k BTU · 9.5 SACC)", mode: "btu_seer" as const, btu: 12000, seer: 9.5, watts: 1260, hours: 8, duty: 65 },
  { label: "🌬️ Ductless Mini-Split (18k BTU / 1.5 Ton · 20 SEER2)", mode: "btu_seer" as const, btu: 18000, seer: 20.0, watts: 900, hours: 8, duty: 55 },
  { label: "🏡 Suburban Central AC (36k BTU / 3 Ton · 14.3 SEER2)", mode: "btu_seer" as const, btu: 36000, seer: 14.3, watts: 2500, hours: 8, duty: 60 },
];
