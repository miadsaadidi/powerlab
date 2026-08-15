# 06 — Energy Profile and Local Data Model

## Goal

Let related calculators reuse user-entered data without accounts or a database.

The Energy Profile is a convenience layer, not an authoritative record.

## Persistence

Browser `localStorage` only.

```text
energy-tools:profile:v1
```

No server profile.

## Recommended schema

```ts
export interface EnergyProfileV1 {
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
    provenance: "user-entered" | "device-label" | "preset";
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
    saveLocation: boolean;
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
}
```

## Privacy behavior

- precise solar coordinates remain transient unless the user explicitly chooses to save them locally;
- no name/email/account identifier;
- no server sync;
- no analytics event should contain the full Energy Profile;
- provide `Clear saved energy data`.

## Storage service

```ts
interface EnergyProfileStore {
  read(): EnergyProfileV1;
  write(profile: EnergyProfileV1): void;
  patch(update: DeepPartial<EnergyProfileV1>): void;
  reset(): void;
}
```

Requirements:

- guard browser-only API use;
- JSON parse failures fall back safely;
- schema version checked;
- invalid values are discarded or migrated safely;
- storage quota/errors do not break the calculator.

## Data provenance

Every important input/result assumption tracks source:

```text
user-entered
measured
device-label
preset
derived
external-model
```

A user-entered value always overrides a generic preset.

## Cross-calculator handoffs

### Electricity Usage → Battery Size / Home Battery / Solar Load

Pass selected appliance rows and derived daily/essential energy.

### Battery Size ↔ Battery Runtime

Pass capacity/load/chemistry/voltage/reserve/efficiency through explicit action.

### Solar Tilt → Solar Output / Solar Size

Pass location, tilt, azimuth and model assumptions.

### Solar Load → Solar Panel Size / Solar Battery Bank

Pass daily energy and essential load subset.

### EV Charging Time → EV Charging Cost

Pass battery capacity and SOC session.

### EV Range → EV Savings

Pass consumption.

## Handoff rule

Never silently overwrite destination state.

UI pattern:

```text
[Use this result in Battery Size Calculator]
```

Then destination loads a clearly identified imported scenario.

## Price fields

No tariffs are stored centrally.

Local preferences may remember the user’s own values:

```text
electricity price / kWh
fuel price / liter
currency
```

Calculators requiring prices:

- Energy Bill — required;
- EV Charging Cost — required;
- EV Savings — electricity + fuel prices required.

Electricity Usage may optionally reveal a simple cost estimate if the user enters a flat electricity price, but cost is not required for the core usage result.

## Local scenarios

If saved local scenarios are implemented, use a separate versioned key:

```text
energy-tools:scenarios:v1
```

Limit saved count, store only user-requested scenarios, and provide delete-all controls.

## No future cloud stub

Do not add unused Supabase tables, auth abstractions, RLS files or cloud-sync code “for later”. If cloud accounts are ever approved, design that feature then.
