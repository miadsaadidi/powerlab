export const SOLAR_PAYBACK_DEFAULTS = {
  grossCost: 20000,
  incentivePercent: 0, // 0% default for current 2026+ installations (expenditures after Dec 31, 2025)
  annualProductionKwh: 9600, // standard 8kW system in moderate sun (~1,200 kWh/kW/yr)
  electricityRate: 0.18, // $/kWh representative EIA baseline
  utilityInflationPercent: 3.5, // %/yr
  panelDegradationPercent: 0.5, // %/yr
  annualOmCost: 0, // $/yr
  inverterReplacementCost: 1800, // $ at Year 13
  inverterReplacementYear: 13,
  analysisYears: 25,
} as const;

export const QUICK_PAYBACK_PRESETS = [
  { label: "6 kW System ($17.4k Gross · 8.4k kWh/yr · 0% Credit)", grossCost: 17400, incentivePercent: 0, annualKwh: 8400, rate: 0.18 },
  { label: "8 kW System ($23.2k Gross · 11.2k kWh/yr · 0% Credit)", grossCost: 23200, incentivePercent: 0, annualKwh: 11200, rate: 0.18 },
  { label: "10 kW System ($29.0k Gross · 14.0k kWh/yr · 0% Credit)", grossCost: 29000, incentivePercent: 0, annualKwh: 14000, rate: 0.18 },
  { label: "12 kW System ($34.8k Gross · 16.8k kWh/yr · 0% Credit)", grossCost: 34800, incentivePercent: 0, annualKwh: 16800, rate: 0.18 },
  { label: "Historical 2022–2025 §25D (8 kW · $23.2k · 30% Credit)", grossCost: 23200, incentivePercent: 30, annualKwh: 11200, rate: 0.18 },
];

