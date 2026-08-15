# 07 — Initial Static Data & Defaults Specification

**Purpose:** implementation-ready baseline data for Codex.  
**Architecture:** no database, no auth, no user accounts, no tariff database, no EV model catalog.  
**Persistence:** browser `localStorage`.  
**External dependency:** PVWatts V8 (or an approved equivalent) for location-aware solar production.  
**AI:** optional explanation layer only; never the numeric source of calculator results.  
**Last reviewed:** 2026-08-13.

---

# 1. Core rules

1. Every preset must be editable.
2. A user-entered product/spec-sheet value always overrides a generic preset.
3. Presets are convenience estimates, not model-specific claims.
4. Do not silently replace user-entered values with presets.
5. Do not store live electricity tariffs, fuel prices, or vendor-specific EV data.
6. Price fields are user inputs and may persist locally.
7. Keep calculation engines separate from React UI.
8. Keep external API/provider responses behind an internal normalized interface.
9. Show assumptions in results.
10. Label calculator outputs as planning estimates where product-specific specs are unknown.

Recommended source precedence:

```text
user-entered spec
    >
external solar API result
    >
source-backed default
    >
generic convenience preset
```

---

# 2. Static-data structure

```text
src/data/
├── units.ts
├── currencies.ts
├── appliances.ts
├── appliance-categories.ts
├── battery-chemistries.ts
├── battery-voltages.ts
├── battery-capacities.ts
├── battery-defaults.ts
├── inverter-defaults.ts
├── ups-defaults.ts
├── solar-defaults.ts
├── solar-panel-presets.ts
├── ev-chargers.ts
├── ev-defaults.ts
├── price-input-defaults.ts
└── calculator-validation.ts
```

Suggested metadata:

```ts
export type DataConfidence = "reference" | "generic-estimate" | "user-input";

export type PresetSource = {
  label: string;
  url?: string;
  reviewedAt: string;
};
```

---

# 3. Units and conversions

```ts
export const POWER_UNITS = [
  { id: "W", label: "W", toW: 1 },
  { id: "kW", label: "kW", toW: 1000 },
] as const;

export const ENERGY_UNITS = [
  { id: "Wh", label: "Wh", toWh: 1 },
  { id: "kWh", label: "kWh", toWh: 1000 },
] as const;

export const CAPACITY_UNITS = [
  { id: "Ah", label: "Ah" },
  { id: "Wh", label: "Wh" },
  { id: "kWh", label: "kWh" },
] as const;

export const TIME_UNITS = [
  { id: "minutes", toHours: 1 / 60 },
  { id: "hours", toHours: 1 },
  { id: "days", toHours: 24 },
] as const;

export const KM_PER_MILE = 1.609344;
export const MILES_PER_KM = 0.6213711922;
export const LITERS_PER_US_GALLON = 3.785411784;
export const US_GALLONS_PER_LITER = 0.2641720524;
export const AVERAGE_DAYS_PER_MONTH = 365.25 / 12;
```

Core formulas:

```text
Wh = V × Ah
kWh = Wh / 1000
Ah = Wh / V
kWh = kW × hours
cost = kWh × user-entered price/kWh
```

Never convert Ah to Wh without voltage.

---

# 4. Currency display data

No exchange-rate API is needed. Currency is display metadata only.

```ts
export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "MAD", symbol: "MAD", label: "Moroccan Dirham" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "NZD", symbol: "NZ$", label: "New Zealand Dollar" },
  { code: "CHF", symbol: "CHF", label: "Swiss Franc" },
  { code: "SEK", symbol: "kr", label: "Swedish Krona" },
  { code: "NOK", symbol: "kr", label: "Norwegian Krone" },
  { code: "DKK", symbol: "kr", label: "Danish Krone" },
  { code: "PLN", symbol: "zł", label: "Polish Zloty" },
  { code: "CZK", symbol: "Kč", label: "Czech Koruna" },
  { code: "HUF", symbol: "Ft", label: "Hungarian Forint" },
  { code: "RON", symbol: "lei", label: "Romanian Leu" },
  { code: "BGN", symbol: "лв", label: "Bulgarian Lev" },
  { code: "TRY", symbol: "₺", label: "Turkish Lira" },
  { code: "AED", symbol: "AED", label: "UAE Dirham" },
  { code: "SAR", symbol: "SAR", label: "Saudi Riyal" },
  { code: "QAR", symbol: "QAR", label: "Qatari Riyal" },
  { code: "EGP", symbol: "E£", label: "Egyptian Pound" },
  { code: "ZAR", symbol: "R", label: "South African Rand" },
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan" },
  { code: "KRW", symbol: "₩", label: "South Korean Won" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real" },
  { code: "MXN", symbol: "MX$", label: "Mexican Peso" },
  { code: "CUSTOM", symbol: "", label: "Other / custom" },
] as const;
```

Do not infer tariffs from currency.

---

# 5. Price inputs

```ts
export const PRICE_INPUT_DEFAULTS = {
  electricityPricePerKwh: null,
  fuelPricePerLiter: null,
  fuelPricePerGallon: null,
  fixedMonthlyCharge: 0,
  taxPercent: 0,
} as const;
```

Price-dependent calculators:

| Calculator | User-entered price |
|---|---|
| Energy Bill | electricity price/kWh |
| EV Charging Cost | electricity price/kWh |
| EV Savings | electricity price/kWh + fuel price |
| Future Solar Savings/Payback | electricity price/kWh + system cost |

No price is required for the physical outputs of the other calculators.

---

# 6. Battery chemistry presets

These are editable planning defaults.

```ts
export const BATTERY_CHEMISTRIES = [
  {
    id: "lifepo4",
    label: "LiFePO₄ / LFP",
    family: "lithium",
    defaultUsableDoD: 0.80,
    defaultReserveSoc: 0.20,
    defaultChargeEfficiency: 0.99,
    defaultPeukertExponent: 1.05,
  },
  {
    id: "liion",
    label: "Lithium-ion (generic)",
    family: "lithium",
    defaultUsableDoD: 0.80,
    defaultReserveSoc: 0.20,
    defaultChargeEfficiency: 0.99,
    defaultPeukertExponent: 1.05,
  },
  {
    id: "agm",
    label: "AGM lead-acid",
    family: "lead-acid",
    defaultUsableDoD: 0.50,
    defaultReserveSoc: 0.50,
    defaultChargeEfficiency: 0.90,
    defaultPeukertExponent: 1.25,
  },
  {
    id: "gel",
    label: "Gel lead-acid",
    family: "lead-acid",
    defaultUsableDoD: 0.50,
    defaultReserveSoc: 0.50,
    defaultChargeEfficiency: 0.90,
    defaultPeukertExponent: 1.25,
  },
  {
    id: "flooded",
    label: "Flooded lead-acid",
    family: "lead-acid",
    defaultUsableDoD: 0.50,
    defaultReserveSoc: 0.50,
    defaultChargeEfficiency: 0.85,
    defaultPeukertExponent: 1.25,
  },
  {
    id: "other",
    label: "Other / custom",
    family: "custom",
    defaultUsableDoD: null,
    defaultReserveSoc: null,
    defaultChargeEfficiency: null,
    defaultPeukertExponent: null,
  },
] as const;
```

Source-backed baseline:
- Victron documents `1.05` as a lithium Peukert starting value when unknown and `1.25` for lead-acid.
- Victron recommends a `99%` lithium charge-efficiency setting in its battery monitor context.
- Victron uses a 50% lead-acid discharge floor as a common default and notes lithium can typically be discharged deeper, subject to supplier limits.
- Trojan recommends relatively shallow lead-acid discharge and commonly 50% or less for longevity.

These remain editable assumptions, not universal chemistry limits.

---

# 7. Battery voltage presets

```ts
export const BATTERY_VOLTAGES = [
  6,
  12,
  12.8,
  24,
  25.6,
  36,
  48,
  51.2,
] as const;
```

Labels should explain `12.8 / 25.6 / 51.2 V` as common LFP nominal configurations. Always provide Custom.

---

# 8. Battery capacity presets

```ts
export const BATTERY_AH_PRESETS = [
  7, 9, 12, 18, 20, 35, 50, 75, 100, 120, 150, 200, 250, 300, 400, 500
] as const;

export const BATTERY_WH_PRESETS = [
  100, 200, 256, 300, 500, 512, 750, 768,
  1000, 1024, 1500, 2000, 2048, 3000, 3072,
  5000, 7500, 10000, 13500, 15000, 20000
] as const;
```

These are generic convenience options, not a product catalog.

---

# 9. Battery health / SOC presets

```ts
export const BATTERY_HEALTH_PRESETS = [1.00, 0.95, 0.90, 0.85, 0.80, 0.70] as const;
export const SOC_PRESETS = [1.00, 0.90, 0.80, 0.75, 0.50, 0.25, 0.20, 0.10] as const;

export const DEFAULT_BATTERY_HEALTH = 1.00;
export const DEFAULT_STARTING_SOC = 1.00;
```

Never infer battery health from age alone.

---

# 10. Inverter / conversion efficiency

Battery and UPS inverter defaults are distinct from PVWatts solar inverter settings.

```ts
export const AC_INVERTER_EFFICIENCIES = [
  0.80, 0.85, 0.90, 0.92, 0.95, 0.97
] as const;

export const DEFAULT_AC_INVERTER_EFFICIENCY = 0.90;
export const DEFAULT_DC_DIRECT_EFFICIENCY = 1.00;
```

Use the product's actual efficiency when known.

---

# 11. Shared battery defaults

```ts
export const BATTERY_DEFAULTS = {
  batteryHealth: 1.00,
  startingSoc: 1.00,
  safetyMargin: 0.10,
  inverterEfficiency: 0.90,
  dutyCycle: 1.00,
  designMargin: 0.10,
  autonomyDays: 1,
} as const;
```

Result breakdown should expose:

```text
nominal energy
→ current-SOC energy
→ usable/reserved energy
→ health-adjusted energy
→ conversion/inverter-adjusted delivered energy
→ runtime / required size
```

Avoid double-counting both DoD and reserve. Internally choose one convention:

```text
usableFraction = 1 - minimumSOC
```

---

# 12. Peukert defaults

```ts
export const PEUKERT = {
  disabled: 1.00,
  lithium: 1.05,
  leadAcid: 1.25,
} as const;
```

Implementation rule:
- Basic mode: off by default.
- Advanced mode: useful mainly for Ah-based lead-acid runtime calculations.
- Do not fake a precise Peukert correction if rated current/discharge-hour data is unknown.

---

# 13. UPS defaults

```ts
export const UPS_DEFAULTS = {
  efficiency: 0.90,
  assumedPowerFactorWhenOnlyVAIsKnown: 0.80,
  batteryHealth: 1.00,
  safetyMargin: 0.10,
} as const;

export const UPS_EFFICIENCIES = [0.80, 0.85, 0.90, 0.92, 0.95] as const;
export const UPS_POWER_FACTORS = [0.60, 0.70, 0.80, 0.90, 1.00] as const;
```

Prefer manufacturer max watts over `VA × assumed power factor`.

---

# 14. Portable power-station presets

```ts
export const POWER_STATION_CAPACITIES_WH = [
  256, 300, 500, 512, 768, 1000, 1024, 1500, 2000, 2048, 3000, 3072
] as const;

export const POWER_STATION_AC_OUTPUTS_W = [
  300, 500, 600, 1000, 1200, 1500, 1800, 2000, 2400, 3000
] as const;

export const DEFAULT_POWER_STATION_AC_EFFICIENCY = 0.90;
```

---

# 15. Appliance categories

```ts
export const APPLIANCE_CATEGORIES = [
  "Lighting",
  "Electronics & Computing",
  "Kitchen",
  "Refrigeration",
  "Laundry & Cleaning",
  "Heating & Cooling",
  "Water Heating",
  "Pumps & Motors",
  "Workshop / Tools",
  "Outdoor",
  "Other",
] as const;
```

---

# 16. Appliance preset library

All values below are generic starter estimates and must remain editable. Actual nameplate watts, measured watts, or energy-label kWh should take precedence.

Recommended type:

```ts
export type AppliancePreset = {
  id: string;
  category: string;
  label: string;
  defaultWatts: number;
  typicalMinWatts: number;
  typicalMaxWatts: number;
  defaultDutyCycle: number;
  surgeMultiplier?: number;
  notes?: string;
};
```

```ts
export const APPLIANCES: AppliancePreset[] = [
  { id: "led-bulb", category: "Lighting", label: "LED bulb", defaultWatts: 10, typicalMinWatts: 5, typicalMaxWatts: 20, defaultDutyCycle: 1 },
  { id: "cfl-bulb", category: "Lighting", label: "CFL bulb", defaultWatts: 15, typicalMinWatts: 9, typicalMaxWatts: 25, defaultDutyCycle: 1 },
  { id: "incandescent-bulb", category: "Lighting", label: "Incandescent bulb", defaultWatts: 60, typicalMinWatts: 25, typicalMaxWatts: 100, defaultDutyCycle: 1 },
  { id: "led-strip", category: "Lighting", label: "LED light strip", defaultWatts: 30, typicalMinWatts: 10, typicalMaxWatts: 100, defaultDutyCycle: 1 },

  { id: "wifi-router", category: "Electronics & Computing", label: "Wi-Fi router", defaultWatts: 12, typicalMinWatts: 5, typicalMaxWatts: 25, defaultDutyCycle: 1 },
  { id: "modem", category: "Electronics & Computing", label: "Modem / ONT", defaultWatts: 10, typicalMinWatts: 4, typicalMaxWatts: 20, defaultDutyCycle: 1 },
  { id: "laptop", category: "Electronics & Computing", label: "Laptop", defaultWatts: 65, typicalMinWatts: 20, typicalMaxWatts: 150, defaultDutyCycle: 1 },
  { id: "desktop", category: "Electronics & Computing", label: "Desktop computer", defaultWatts: 200, typicalMinWatts: 80, typicalMaxWatts: 500, defaultDutyCycle: 1 },
  { id: "gaming-pc", category: "Electronics & Computing", label: "Gaming desktop", defaultWatts: 500, typicalMinWatts: 250, typicalMaxWatts: 900, defaultDutyCycle: 1 },
  { id: "monitor", category: "Electronics & Computing", label: "Computer monitor", defaultWatts: 30, typicalMinWatts: 15, typicalMaxWatts: 80, defaultDutyCycle: 1 },
  { id: "tv-medium", category: "Electronics & Computing", label: "Small / medium LED TV", defaultWatts: 70, typicalMinWatts: 30, typicalMaxWatts: 120, defaultDutyCycle: 1 },
  { id: "tv-large", category: "Electronics & Computing", label: "Large LED / OLED TV", defaultWatts: 150, typicalMinWatts: 80, typicalMaxWatts: 300, defaultDutyCycle: 1 },
  { id: "streaming-device", category: "Electronics & Computing", label: "Streaming device", defaultWatts: 5, typicalMinWatts: 2, typicalMaxWatts: 15, defaultDutyCycle: 1 },
  { id: "game-console", category: "Electronics & Computing", label: "Game console", defaultWatts: 150, typicalMinWatts: 50, typicalMaxWatts: 250, defaultDutyCycle: 1 },
  { id: "phone-charger", category: "Electronics & Computing", label: "Phone charger", defaultWatts: 10, typicalMinWatts: 5, typicalMaxWatts: 30, defaultDutyCycle: 1 },
  { id: "tablet-charger", category: "Electronics & Computing", label: "Tablet charger", defaultWatts: 20, typicalMinWatts: 10, typicalMaxWatts: 45, defaultDutyCycle: 1 },
  { id: "inkjet-printer", category: "Electronics & Computing", label: "Inkjet printer — printing", defaultWatts: 30, typicalMinWatts: 10, typicalMaxWatts: 60, defaultDutyCycle: 1 },
  { id: "laser-printer", category: "Electronics & Computing", label: "Laser printer — printing", defaultWatts: 500, typicalMinWatts: 250, typicalMaxWatts: 1000, defaultDutyCycle: 1 },

  { id: "refrigerator", category: "Refrigeration", label: "Refrigerator", defaultWatts: 150, typicalMinWatts: 80, typicalMaxWatts: 300, defaultDutyCycle: 0.35, surgeMultiplier: 3, notes: "Prefer annual label kWh when available." },
  { id: "freezer", category: "Refrigeration", label: "Freezer", defaultWatts: 120, typicalMinWatts: 70, typicalMaxWatts: 250, defaultDutyCycle: 0.40, surgeMultiplier: 3, notes: "Prefer annual label kWh when available." },
  { id: "mini-fridge", category: "Refrigeration", label: "Mini refrigerator", defaultWatts: 70, typicalMinWatts: 40, typicalMaxWatts: 120, defaultDutyCycle: 0.35, surgeMultiplier: 3 },

  { id: "microwave", category: "Kitchen", label: "Microwave oven", defaultWatts: 1200, typicalMinWatts: 700, typicalMaxWatts: 1800, defaultDutyCycle: 1 },
  { id: "kettle", category: "Kitchen", label: "Electric kettle", defaultWatts: 1800, typicalMinWatts: 1000, typicalMaxWatts: 3000, defaultDutyCycle: 1 },
  { id: "toaster", category: "Kitchen", label: "Toaster", defaultWatts: 1000, typicalMinWatts: 700, typicalMaxWatts: 1500, defaultDutyCycle: 1 },
  { id: "coffee-maker", category: "Kitchen", label: "Coffee maker", defaultWatts: 1000, typicalMinWatts: 600, typicalMaxWatts: 1500, defaultDutyCycle: 1 },
  { id: "espresso-machine", category: "Kitchen", label: "Espresso machine", defaultWatts: 1400, typicalMinWatts: 900, typicalMaxWatts: 2000, defaultDutyCycle: 1 },
  { id: "rice-cooker", category: "Kitchen", label: "Rice cooker", defaultWatts: 700, typicalMinWatts: 300, typicalMaxWatts: 1200, defaultDutyCycle: 1 },
  { id: "slow-cooker", category: "Kitchen", label: "Slow cooker", defaultWatts: 250, typicalMinWatts: 100, typicalMaxWatts: 400, defaultDutyCycle: 1 },
  { id: "air-fryer", category: "Kitchen", label: "Air fryer", defaultWatts: 1500, typicalMinWatts: 1000, typicalMaxWatts: 2000, defaultDutyCycle: 1 },
  { id: "blender", category: "Kitchen", label: "Blender", defaultWatts: 500, typicalMinWatts: 250, typicalMaxWatts: 1500, defaultDutyCycle: 1 },
  { id: "food-processor", category: "Kitchen", label: "Food processor", defaultWatts: 600, typicalMinWatts: 300, typicalMaxWatts: 1200, defaultDutyCycle: 1 },
  { id: "dishwasher", category: "Kitchen", label: "Dishwasher — active estimate", defaultWatts: 1200, typicalMinWatts: 700, typicalMaxWatts: 1800, defaultDutyCycle: 0.50, notes: "Prefer kWh/cycle from label." },
  { id: "electric-oven", category: "Kitchen", label: "Electric oven", defaultWatts: 2500, typicalMinWatts: 1800, typicalMaxWatts: 5000, defaultDutyCycle: 0.65 },
  { id: "electric-hob", category: "Kitchen", label: "Electric / induction hob zone", defaultWatts: 1800, typicalMinWatts: 1000, typicalMaxWatts: 3500, defaultDutyCycle: 0.70 },

  { id: "washing-machine", category: "Laundry & Cleaning", label: "Washing machine", defaultWatts: 500, typicalMinWatts: 250, typicalMaxWatts: 1200, defaultDutyCycle: 0.60, notes: "Prefer kWh/cycle if known." },
  { id: "electric-dryer", category: "Laundry & Cleaning", label: "Electric dryer", defaultWatts: 3000, typicalMinWatts: 1800, typicalMaxWatts: 5500, defaultDutyCycle: 0.70 },
  { id: "iron", category: "Laundry & Cleaning", label: "Iron", defaultWatts: 1500, typicalMinWatts: 800, typicalMaxWatts: 2200, defaultDutyCycle: 0.65 },
  { id: "vacuum", category: "Laundry & Cleaning", label: "Vacuum cleaner", defaultWatts: 800, typicalMinWatts: 400, typicalMaxWatts: 1600, defaultDutyCycle: 1 },

  { id: "ceiling-fan", category: "Heating & Cooling", label: "Ceiling fan", defaultWatts: 50, typicalMinWatts: 20, typicalMaxWatts: 100, defaultDutyCycle: 1 },
  { id: "table-fan", category: "Heating & Cooling", label: "Table / pedestal fan", defaultWatts: 40, typicalMinWatts: 20, typicalMaxWatts: 80, defaultDutyCycle: 1 },
  { id: "window-ac", category: "Heating & Cooling", label: "Window air conditioner", defaultWatts: 1200, typicalMinWatts: 500, typicalMaxWatts: 2000, defaultDutyCycle: 0.70, surgeMultiplier: 2.5 },
  { id: "split-ac", category: "Heating & Cooling", label: "Split-system air conditioner", defaultWatts: 1500, typicalMinWatts: 500, typicalMaxWatts: 3500, defaultDutyCycle: 0.65, surgeMultiplier: 2, notes: "Variable-speed units vary widely." },
  { id: "portable-ac", category: "Heating & Cooling", label: "Portable air conditioner", defaultWatts: 1200, typicalMinWatts: 800, typicalMaxWatts: 1800, defaultDutyCycle: 0.70, surgeMultiplier: 2.5 },
  { id: "space-heater", category: "Heating & Cooling", label: "Electric space heater", defaultWatts: 1500, typicalMinWatts: 500, typicalMaxWatts: 2000, defaultDutyCycle: 0.70 },
  { id: "heat-pump", category: "Heating & Cooling", label: "Residential heat pump — running estimate", defaultWatts: 1800, typicalMinWatts: 700, typicalMaxWatts: 5000, defaultDutyCycle: 0.60, notes: "Use actual measured/nameplate input when possible." },
  { id: "dehumidifier", category: "Heating & Cooling", label: "Dehumidifier", defaultWatts: 500, typicalMinWatts: 250, typicalMaxWatts: 800, defaultDutyCycle: 0.60 },
  { id: "humidifier", category: "Heating & Cooling", label: "Humidifier", defaultWatts: 40, typicalMinWatts: 15, typicalMaxWatts: 300, defaultDutyCycle: 0.60 },

  { id: "water-heater", category: "Water Heating", label: "Electric resistance water heater", defaultWatts: 4500, typicalMinWatts: 1500, typicalMaxWatts: 5500, defaultDutyCycle: 0.25 },
  { id: "small-water-heater", category: "Water Heating", label: "Point-of-use water heater", defaultWatts: 1500, typicalMinWatts: 1000, typicalMaxWatts: 3000, defaultDutyCycle: 0.30 },

  { id: "small-water-pump", category: "Pumps & Motors", label: "Small water pump", defaultWatts: 500, typicalMinWatts: 200, typicalMaxWatts: 1000, defaultDutyCycle: 1, surgeMultiplier: 3 },
  { id: "well-pump", category: "Pumps & Motors", label: "Well pump", defaultWatts: 1000, typicalMinWatts: 500, typicalMaxWatts: 2500, defaultDutyCycle: 1, surgeMultiplier: 3 },
  { id: "pool-pump", category: "Pumps & Motors", label: "Pool pump", defaultWatts: 1000, typicalMinWatts: 500, typicalMaxWatts: 2500, defaultDutyCycle: 1, surgeMultiplier: 2.5 },
  { id: "sump-pump", category: "Pumps & Motors", label: "Sump pump", defaultWatts: 750, typicalMinWatts: 300, typicalMaxWatts: 1500, defaultDutyCycle: 1, surgeMultiplier: 3 },

  { id: "drill", category: "Workshop / Tools", label: "Electric drill", defaultWatts: 800, typicalMinWatts: 400, typicalMaxWatts: 1200, defaultDutyCycle: 1, surgeMultiplier: 1.5 },
  { id: "circular-saw", category: "Workshop / Tools", label: "Circular saw", defaultWatts: 1500, typicalMinWatts: 1000, typicalMaxWatts: 2200, defaultDutyCycle: 1, surgeMultiplier: 2 },
  { id: "air-compressor", category: "Workshop / Tools", label: "Small air compressor", defaultWatts: 1200, typicalMinWatts: 700, typicalMaxWatts: 2500, defaultDutyCycle: 0.50, surgeMultiplier: 3 },

  { id: "custom", category: "Other", label: "Custom appliance / load", defaultWatts: 100, typicalMinWatts: 1, typicalMaxWatts: 10000, defaultDutyCycle: 1 },
];
```

Energy-input precedence:

```text
1. user-entered kWh/year
2. user-entered kWh/month
3. user-entered kWh/cycle × cycles
4. measured watts × runtime
5. nameplate watts × runtime
6. generic preset watts × runtime
```

For cycling appliances, annual label kWh is often preferable to `watts × 24h`.

---

# 17. Electricity Usage defaults

Support:

```ts
export const ELECTRICITY_USAGE_MODES = [
  "watts-and-time",
  "kwh-per-cycle",
  "label-kwh-period",
] as const;

export const USAGE_DEFAULTS = {
  quantity: 1,
  hoursPerDay: 1,
  daysPerWeek: 7,
  usesPerDay: 1,
  cyclesPerWeek: 1,
  billingDays: 30,
} as const;
```

Outputs:

```text
daily kWh
weekly kWh
monthly kWh
annual kWh
optional cost
```

---

# 18. Energy Bill defaults

```ts
export const ENERGY_BILL_DEFAULTS = {
  monthlyKwh: null,
  electricityPricePerKwh: null,
  fixedMonthlyCharge: 0,
  taxPercent: 0,
  billingDays: 30,
} as const;
```

Phase 1: flat rate only. Do not add tiered/time-of-use tariff databases.

---

# 19. EV charging power presets

DOE AFDC currently places Level 1 around 1–2 kW, Level 2 around 2.9–19.2 kW, and DC fast charging up to about 500 kW.

```ts
export const EV_CHARGERS = [
  { id: "ac-1.4", type: "AC", level: "Level 1", powerKw: 1.4 },
  { id: "ac-1.9", type: "AC", level: "Level 1", powerKw: 1.9 },

  { id: "ac-3.0", type: "AC", level: "Level 2", powerKw: 3.0 },
  { id: "ac-3.6", type: "AC", level: "Level 2", powerKw: 3.6 },
  { id: "ac-7.2", type: "AC", level: "Level 2", powerKw: 7.2 },
  { id: "ac-9.6", type: "AC", level: "Level 2", powerKw: 9.6 },
  { id: "ac-11.5", type: "AC", level: "Level 2", powerKw: 11.5 },
  { id: "ac-19.2", type: "AC", level: "Level 2", powerKw: 19.2 },

  { id: "dc-25", type: "DC", level: "DC Fast", powerKw: 25 },
  { id: "dc-50", type: "DC", level: "DC Fast", powerKw: 50 },
  { id: "dc-75", type: "DC", level: "DC Fast", powerKw: 75 },
  { id: "dc-100", type: "DC", level: "DC Fast", powerKw: 100 },
  { id: "dc-150", type: "DC", level: "DC Fast", powerKw: 150 },
  { id: "dc-250", type: "DC", level: "DC Fast", powerKw: 250 },
  { id: "dc-350", type: "DC", level: "DC Fast", powerKw: 350 },
  { id: "dc-500", type: "DC", level: "DC Fast", powerKw: 500 },
] as const;
```

Always provide Custom.

---

# 20. EV battery and consumption presets

No EV model database.

```ts
export const EV_BATTERY_CAPACITIES_KWH = [
  20, 30, 40, 50, 60, 70, 75, 80, 90, 100, 120
] as const;

export const EV_CONSUMPTION_PRESETS = [
  { id: "very-efficient", label: "Very efficient", kwhPer100Km: 13 },
  { id: "efficient", label: "Efficient", kwhPer100Km: 15 },
  { id: "typical", label: "Typical", kwhPer100Km: 18 },
  { id: "higher", label: "Higher consumption", kwhPer100Km: 22 },
  { id: "large", label: "Large / high consumption", kwhPer100Km: 27 },
] as const;
```

Support:

```text
kWh/100 km
Wh/km
mi/kWh
kWh/100 mi
```

Normalize internally to `Wh/km`.

```ts
export const kwhPer100KmToWhPerKm = (v: number) => v * 10;
export const whPerKmToKwhPer100Km = (v: number) => v / 10;
export const miPerKwhToWhPerKm = (v: number) => 1000 / (v * 1.609344);
```

---

# 21. EV charging-efficiency presets

Editable planning assumptions:

```ts
export const EV_CHARGING_EFFICIENCIES = {
  level1: 0.85,
  level2: 0.90,
  dcFast: 0.93,
} as const;
```

ENERGY STAR indicates Level 2 is generally more efficient than Level 1, while certified DC fast equipment in relevant tested ranges can achieve at least ~93% active efficiency. Actual grid-to-battery efficiency varies.

---

# 22. Generic DC taper model

Transparent heuristic only:

```ts
export const GENERIC_DC_TAPER = [
  { startSoc: 0.00, endSoc: 0.50, powerFactor: 1.00 },
  { startSoc: 0.50, endSoc: 0.80, powerFactor: 0.80 },
  { startSoc: 0.80, endSoc: 0.90, powerFactor: 0.55 },
  { startSoc: 0.90, endSoc: 1.00, powerFactor: 0.30 },
] as const;
```

UI options:

```text
Simple constant-power estimate
Generic DC taper estimate
```

Always cap:

```text
effectivePower = min(chargerPower, vehicleMaxChargePower)
```

Do not present generic taper as vehicle-specific.

---

# 23. EV calculator defaults

## Charging Time

```ts
export const EV_CHARGING_TIME_DEFAULTS = {
  batteryCapacityKwh: 60,
  startSoc: 0.20,
  targetSoc: 0.80,
  chargerPowerKw: 7.2,
  vehicleMaxChargePowerKw: null,
  chargingType: "AC",
  acEfficiency: 0.90,
  dcEfficiency: 0.93,
  dcTaperMode: "generic",
} as const;
```

## Charging Cost

```ts
export const EV_CHARGING_COST_DEFAULTS = {
  batteryCapacityKwh: 60,
  startSoc: 0.20,
  targetSoc: 0.80,
  chargingEfficiency: 0.90,
  electricityPricePerKwh: null,
} as const;
```

Show both energy added to battery and estimated source/grid energy.

## Range

```ts
export const EV_RANGE_DEFAULTS = {
  usableBatteryKwh: 60,
  currentSoc: 1.00,
  consumptionKwhPer100Km: 18,
  reserveSoc: 0.10,
} as const;
```

Show sensitivity at ±10% consumption.

## Savings

```ts
export const EV_SAVINGS_DEFAULTS = {
  annualDistanceKm: 15000,
  evConsumptionKwhPer100Km: 18,
  electricityPricePerKwh: null,
  comparisonFuelType: "gasoline",
  fuelConsumptionLPer100Km: 7.0,
  fuelPricePerLiter: null,
  optionalAnnualEvMaintenance: null,
  optionalAnnualIceMaintenance: null,
} as const;
```

Do not assume maintenance savings automatically.

---

# 24. Solar API baseline — PVWatts V8

Preferred provider: PVWatts V8.

Current documented core request inputs:

```text
system_capacity
module_type
losses
array_type
tilt
azimuth
lat/lon OR file_id
api_key
```

Current documented defaults:

```text
dc_ac_ratio = 1.2
gcr = 0.4
inv_eff = 96
timeframe = monthly
```

Current documented output includes:

```text
poa_monthly
dc_monthly
ac_monthly
ac_annual
solrad_monthly
solrad_annual
capacity_factor
```

Use a Next.js server route; never expose the provider API key in browser code.

---

# 25. Solar static defaults

```ts
export const SOLAR_DEFAULTS = {
  systemCapacityKw: 5,
  moduleType: 0,
  arrayType: 1,
  lossesPercent: 14,
  dcAcRatio: 1.2,
  inverterEfficiencyPercent: 96,
  gcr: 0.4,
  timeframe: "monthly",
  dataset: "nsrdb",
} as const;
```

`14%` is a rounded planning baseline. Keep editable.

---

# 26. PVWatts exact enum mapping

```ts
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
```

---

# 27. Solar angles / orientation

PVWatts validation:

```ts
export const SOLAR_ANGLE_LIMITS = {
  tiltMinDeg: 0,
  tiltMaxDeg: 90,
  azimuthMinDeg: 0,
  azimuthMaxExclusiveDeg: 360,
} as const;

export const AZIMUTH_PRESETS = [
  { value: 0, label: "North" },
  { value: 90, label: "East" },
  { value: 180, label: "South" },
  { value: 270, label: "West" },
] as const;

export const equatorFacingAzimuth = (latitude: number) =>
  latitude >= 0 ? 180 : 0;
```

Simple no-API tilt starting point:

```ts
export const simpleAnnualTiltStartingPoint = (latitude: number) =>
  Math.min(90, Math.max(0, Math.abs(latitude)));
```

Label exactly as a **simple latitude-based starting estimate**, not a universal optimum.

---

# 28. Solar optimization request strategy

Avoid brute-force API calls.

Recommended:

```text
1. Calculate instant latitude-based tilt.
2. Test a bounded set of candidate tilts.
3. Compare user roof tilt to candidate(s).
4. Pick best coarse result.
5. Optionally refine around best ±5°.
6. Cache identical provider requests.
```

Phase 1 lightweight candidates:

```text
user tilt
latitude-based tilt
latitude - 10°
latitude + 10°
```

all clamped to 0–90°.

PVWatts currently documents a standard limit of 1,000 requests/hour, so avoid large per-user sweeps.

---

# 29. Solar system / panel presets

```ts
export const SOLAR_SYSTEM_SIZES_KW = [
  0.5, 1, 1.5, 2, 3, 4, 5, 6, 7.5, 8, 10, 12, 15, 20
] as const;

export const SOLAR_PANEL_POWER_W = [
  250, 300, 350, 400, 450, 500, 550, 600
] as const;

export const DEFAULT_SOLAR_PANEL_POWER_W = 400;

export const SOLAR_LOSS_PRESETS_PERCENT = [5, 10, 14, 20, 25] as const;
```

No solar-panel model database.

---

# 30. Solar calculator defaults

## Panel Output

```ts
export const SOLAR_OUTPUT_DEFAULTS = {
  systemCapacityKw: 5,
  panelPowerW: 400,
  tiltDeg: null,
  azimuthDeg: null,
  moduleType: 0,
  arrayType: 1,
  lossesPercent: 14,
  dcAcRatio: 1.2,
  inverterEfficiencyPercent: 96,
} as const;
```

Outputs:

```text
annual AC kWh
monthly AC kWh
specific yield kWh/kW-year
capacity factor
monthly solar radiation
```

## Panel Size

```ts
export const SOLAR_PANEL_SIZE_DEFAULTS = {
  targetEnergyKwhPerDay: null,
  panelPowerW: 400,
  lossesPercent: 14,
  designMargin: 0.10,
} as const;
```

Prefer API-derived location-specific yield over a universal peak-sun-hours constant.

## Solar Battery Bank

```ts
export const SOLAR_BATTERY_BANK_DEFAULTS = {
  dailyEnergyKwh: null,
  autonomyDays: 1,
  reserveFraction: 0.20,
  inverterEfficiency: 0.90,
  batteryHealth: 1.00,
  designMargin: 0.10,
  batteryChemistry: "lifepo4",
  systemVoltage: 48,
} as const;

export const AUTONOMY_DAYS = [0.5, 1, 1.5, 2, 3, 5, 7] as const;
```

## Solar Load

Reuse `APPLIANCES`.

```ts
export type SolarLoad = {
  applianceId?: string;
  label: string;
  quantity: number;
  watts: number;
  hoursPerDay: number;
  dutyCycle: number;
  essential: boolean;
};
```

Outputs:

```text
daily energy
peak simultaneous watts
essential energy
non-essential energy
optional surge estimate
```

---

# 31. Battery calculator defaults

## Battery Runtime

```ts
export const BATTERY_RUNTIME_DEFAULTS = {
  capacityInputMode: "wh",
  batteryCapacityWh: 1000,
  batteryCapacityAh: 100,
  batteryVoltage: 12,
  loadWatts: 100,
  batteryChemistry: "lifepo4",
  startingSoc: 1.00,
  usableDoD: 0.80,
  batteryHealth: 1.00,
  inverterEfficiency: 0.90,
  dutyCycle: 1.00,
  peukertEnabled: false,
} as const;
```

## Battery Size

```ts
export const BATTERY_SIZE_DEFAULTS = {
  loadWatts: 500,
  runtimeHours: 4,
  batteryChemistry: "lifepo4",
  voltage: 12,
  inverterEfficiency: 0.90,
  reserveFraction: 0.20,
  batteryHealth: 1.00,
  designMargin: 0.10,
} as const;
```

## Battery Capacity

```ts
export const BATTERY_CAPACITY_DEFAULTS = {
  voltage: 12,
  ampHours: 100,
  wattHours: null,
  chemistry: "lifepo4",
  usableDoD: 0.80,
  startingSoc: 1.00,
  batteryHealth: 1.00,
} as const;
```

## Battery Charging Time

```ts
export const BATTERY_CHARGING_TIME_DEFAULTS = {
  capacityAh: 100,
  voltage: 12,
  capacityWh: null,
  startSoc: 0.20,
  targetSoc: 1.00,
  chargerCurrentA: 20,
  chargerPowerW: null,
  chargeEfficiency: 0.90,
  chemistry: "agm",
  taperAdjustmentMode: "simple",
} as const;

export const CHARGE_TIME_OVERHEAD = {
  lithium: 1.05,
  leadAcid: 1.15,
} as const;
```

The overhead is an explicit application heuristic, not a physical constant.

## Home Battery Size

```ts
export const HOME_BATTERY_SIZE_DEFAULTS = {
  dailyEnergyKwh: null,
  backupHours: 12,
  essentialLoadFraction: 0.50,
  batteryChemistry: "lifepo4",
  usableDoD: 0.80,
  inverterEfficiency: 0.90,
  batteryHealth: 1.00,
  designMargin: 0.10,
} as const;

export const BACKUP_HOURS = [2, 4, 6, 8, 12, 24, 48, 72] as const;
```

## UPS Runtime

```ts
export const UPS_RUNTIME_DEFAULTS = {
  loadWatts: 200,
  upsMaxWatts: null,
  upsVA: null,
  assumedPowerFactor: 0.80,
  batteryCapacityWh: 500,
  batteryHealth: 1.00,
  upsEfficiency: 0.90,
  usableFraction: 0.50,
} as const;
```

## UPS Battery Size

```ts
export const UPS_BATTERY_SIZE_DEFAULTS = {
  loadWatts: 300,
  runtimeMinutes: 30,
  upsEfficiency: 0.90,
  batteryChemistry: "agm",
  reserveFraction: 0.50,
  batteryHealth: 1.00,
  designMargin: 0.10,
  dcBusVoltage: 24,
} as const;
```

## Portable Power Station

```ts
export const PORTABLE_POWER_STATION_DEFAULTS = {
  capacityWh: 1024,
  acOutputMaxW: 1800,
  loadWatts: 100,
  acEfficiency: 0.90,
  batteryHealth: 1.00,
  reserveFraction: 0.05,
} as const;
```

---

# 32. Shared Energy Profile

Browser-local only.

```ts
export type EnergyProfileV1 = {
  version: 1;

  preferences: {
    powerUnit: "W" | "kW";
    energyUnit: "Wh" | "kWh";
    distanceUnit: "km" | "mi";
    currencyCode: string;
    electricityPricePerKwh: number | null;
    fuelPricePerLiter: number | null;
  };

  appliances: Array<{
    id: string;
    label: string;
    watts: number;
    quantity: number;
    hoursPerDay: number;
    dutyCycle: number;
    essential: boolean;
  }>;

  battery: {
    chemistry: string | null;
    nominalVoltage: number | null;
    capacityAh: number | null;
    capacityWh: number | null;
    batteryHealth: number;
    reserveFraction: number | null;
  };

  solar: {
    latitude: number | null;
    longitude: number | null;
    systemCapacityKw: number | null;
    panelPowerW: number | null;
    tiltDeg: number | null;
    azimuthDeg: number | null;
  };

  ev: {
    batteryCapacityKwh: number | null;
    consumptionKwhPer100Km: number | null;
    chargerPowerKw: number | null;
    vehicleMaxChargePowerKw: number | null;
  };
};
```

Storage:

```ts
export const ENERGY_PROFILE_STORAGE_KEY = "energy-tools:profile:v1";
```

Allow:
- Reset calculator
- Reset saved preferences
- Clear all Energy Profile data

Exact location should stay transient unless the user explicitly saves it locally.

---

# 33. Validation bounds

These are application sanity bounds, not universal physical limits.

```ts
export const VALIDATION = {
  percent: { min: 0, max: 100 },

  watts: { min: 0.1, max: 1_000_000 },
  kilowatts: { min: 0.0001, max: 1000 },
  wattHours: { min: 0.1, max: 100_000_000 },
  kilowattHours: { min: 0.0001, max: 100_000 },

  batteryVoltage: { min: 1, max: 1000 },
  batteryAh: { min: 0.1, max: 100_000 },

  runtimeHours: { min: 0.001, max: 8760 },

  efficiency: { min: 0.01, max: 1.00 },
  dutyCycle: { min: 0.01, max: 1.00 },

  soc: { min: 0, max: 1 },
  dod: { min: 0.01, max: 1 },

  latitude: { min: -90, max: 90 },
  longitude: { min: -180, max: 180 },
  solarTiltDeg: { min: 0, max: 90 },
  solarAzimuthDeg: { min: 0, maxExclusive: 360 },

  electricityPricePerKwh: { min: 0, max: 1000 },
  fuelPrice: { min: 0, max: 10000 },

  evBatteryKwh: { min: 1, max: 500 },
  evChargerPowerKw: { min: 0.1, max: 1000 },
  evConsumptionKwhPer100Km: { min: 5, max: 100 },
} as const;
```

Use warnings rather than blocking unusual-but-valid values.

---

# 34. Result rounding

Calculate at full precision and round only for display.

```ts
export const DISPLAY_PRECISION = {
  watts: 0,
  kilowatts: 2,
  wh: 0,
  kwh: 2,
  ah: 1,
  volts: 1,
  percent: 1,
  hours: 2,
  minutes: 0,
  currency: 2,
  distance: 0,
  angleDeg: 0,
} as const;
```

---

# 35. Calculator-to-data matrix

| Calculator | Static data | External API | Price |
|---|---|---|---|
| Battery Runtime | battery + inverter + appliances | No | No |
| Battery Size | battery + inverter | No | No |
| Battery Capacity | battery + voltages | No | No |
| Battery Charging Time | battery + charge defaults | No | No |
| UPS Runtime | battery + UPS | No | No |
| UPS Battery Size | battery + UPS | No | No |
| Home Battery Size | battery + Energy Profile | No | No |
| Portable Power Station | capacity/output + appliances | No | No |
| Electricity Usage | appliances + units | No | Optional |
| Energy Bill | units + currencies | No | **Yes** |
| Appliance Wattage | appliances | No | No |
| Solar Panel Tilt | solar defaults | **Yes for production comparison** | No |
| Solar Panel Output | solar defaults | **Yes** | No |
| Solar Panel Size | panel presets | **Yes** | No |
| Solar Battery Bank Size | battery + load data | Optional handoff | No |
| Solar Load | appliances | No | No |
| EV Charging Time | EV charger + efficiency | No | No |
| EV Charging Cost | EV charger + currency | No | **Yes** |
| EV Range | EV consumption | No | No |
| EV Savings | EV consumption + currency | No | **Yes** |

---

# 36. Cross-calculator handoffs

```text
Electricity Usage
  → Home Battery Size
  → Solar Panel Size
  → Solar Battery Bank Size

Solar Panel Tilt
  → Solar Panel Output
  → Solar Panel Size

Battery Size
  ↔ Battery Runtime

Appliance Wattage
  → Electricity Usage
  → Battery Runtime
  → Solar Load

EV Charging Time
  → EV Charging Cost

EV Range
  → EV Savings
```

Only transfer results after explicit user action such as “Use this result in…”.

---

# 37. Solar API normalized contract

```ts
export type SolarProductionRequest = {
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
};

export type SolarProductionResult = {
  provider: "pvwatts-v8";
  annualAcKwh: number;
  monthlyAcKwh: number[];
  monthlyDcKwh?: number[];
  monthlyPoaKwhM2?: number[];
  monthlySolarRadiationKwhM2Day?: number[];
  annualSolarRadiationKwhM2Day?: number;
  capacityFactorPercent?: number;
  warnings: string[];
  assumptions: {
    systemCapacityKw: number;
    tiltDeg: number;
    azimuthDeg: number;
    moduleType: number;
    arrayType: number;
    lossesPercent: number;
    dcAcRatio: number;
    inverterEfficiencyPercent: number;
  };
};
```

---

# 38. Solar API failure behavior

```text
Solar Tilt:
  keep local latitude-based starting estimate
  mark production comparison unavailable

Solar Output:
  do not invent production
  display retry state

Solar Panel Size:
  do not silently substitute a universal yield
  optionally allow an explicit advanced manual kWh/kW-year value
```

---

# 39. Cache policy

No database cache.

Server/framework cache key should include:

```text
provider version
rounded lat/lon
system capacity
tilt
azimuth
module type
array type
losses
dc/ac ratio
inverter efficiency
```

Historical climate-model outputs do not need second-by-second refreshes.

---

# 40. Methodology / trust UI

Every calculator page should expose:

```text
How this estimate works
Assumptions used
Which inputs came from presets
How to improve accuracy
Sources / methodology
```

Recommended result labels:

```text
Based on your entered specifications
Uses one or more generic presets
Uses location-based solar model data
```

---

# 41. Data-review policy

Static data module metadata:

```ts
export const DATA_METADATA = {
  reviewedAt: "2026-08-13",
  schemaVersion: 1,
};
```

Review when:
- PVWatts/API version changes
- calculator formula changes
- EV charging classifications materially change
- battery default policy changes
- source-backed assumptions are revised

---

# 42. Explicitly excluded datasets

```text
NO country electricity tariff database
NO fuel-price database
NO EV make/model database
NO battery SKU database
NO inverter product catalog
NO solar-panel product catalog
NO user database
NO account/auth database
NO server-side saved scenarios
```

---

# 43. Sources

## PVWatts V8
NLR Developer Network — current PVWatts V8 API documentation:  
https://developer.nlr.gov/docs/solar/pvwatts/v8/

Used for:
- current API version
- request parameters
- module/array enums
- tilt/azimuth limits
- `dc_ac_ratio = 1.2`
- `gcr = 0.4`
- `inv_eff = 96`
- output fields
- documented request limit

## EV charging
U.S. Department of Energy Alternative Fuels Data Center:  
https://afdc.energy.gov/fuels/electricity-stations

Used for broad Level 1 / Level 2 / DC charging-power ranges.

ENERGY STAR EV charger information:  
https://www.energystar.gov/products/ev_chargers

Used to inform the direction of generic charging-efficiency assumptions. Actual charger/vehicle efficiency remains editable.

## Battery
Victron SmartShunt configuration:  
https://www.victronenergy.com/media/pg/SmartShunt/en/configuration.html

Victron SmartShunt settings:  
https://www.victronenergy.com/media/pg/SmartShunt/en/all-features-and-settings.html

Trojan Battery maintenance guidance:  
https://www.trojanbattery.com/resources/battery-maintenance

Used for generic Peukert / charge-efficiency / discharge-floor planning baselines.

## Appliance use
U.S. Energy Information Administration residential electricity overview:  
https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php

ENERGY STAR refrigerator product data:  
https://www.energystar.gov/productfinder/product/certified-residential-refrigerators/results

Important: the individual appliance wattage rows above are **application-maintained generic estimates**, not copied from a single authoritative appliance catalog. Actual measured/nameplate/energy-label data should always override them.

---

# 44. Codex implementation checklist

## Shared
- [ ] Create static data modules.
- [ ] Create unit normalization helpers.
- [ ] Create validation helpers.
- [ ] Create display rounding helpers.
- [ ] Make all presets editable.
- [ ] Track preset vs user-entered values.
- [ ] Implement `localStorage` Energy Profile v1.
- [ ] Implement reset/clear controls.
- [ ] Do not add Supabase/database/auth.

## Battery
- [ ] Chemistry presets.
- [ ] Voltage presets.
- [ ] Capacity presets.
- [ ] Health/SOC presets.
- [ ] Inverter efficiency.
- [ ] Advanced Peukert mode.
- [ ] Prevent reserve/DoD double counting.
- [ ] Show nominal vs usable energy.

## Appliances / Home
- [ ] Appliance library.
- [ ] Custom appliances.
- [ ] Runtime / quantity / duty-cycle inputs.
- [ ] kWh/cycle and label-energy input modes.
- [ ] User-entered electricity price only.

## Solar
- [ ] PVWatts V8 server proxy.
- [ ] API key server-side only.
- [ ] Normalize response.
- [ ] Local basic tilt estimate.
- [ ] API production comparison.
- [ ] Bounded candidate search.
- [ ] Framework/server cache.
- [ ] Graceful API failure.
- [ ] Never fabricate production fallback.

## EV
- [ ] Generic capacity presets.
- [ ] Charger-power presets.
- [ ] Vehicle max-power input.
- [ ] Generic charging efficiencies.
- [ ] Transparent optional DC taper.
- [ ] No EV model DB.
- [ ] No tariff DB.
- [ ] Electricity/fuel prices are user inputs.

---

# 45. Final implementation baseline

```text
STATIC TYPESCRIPT ARRAYS / CONFIG
    +
PURE DETERMINISTIC CALCULATOR ENGINES
    +
LOCALSTORAGE ENERGY PROFILE
    +
SERVER-SIDE PVWATTS V8 PROXY
    +
OPTIONAL AI EXPLANATION LAYER

NO DATABASE
NO AUTH
NO TARIFF STORE
NO EV MODEL CATALOG
```

This file is the initial data contract. Preset values can be refined later without changing the architecture.
