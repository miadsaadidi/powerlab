export const ENERGY_PROFILE_STORAGE_KEY = "energy-tools:profile:v1";

export interface EnergyProfileV1 {
  version: 1;
  battery: {
    capacityWh: number | null;
    capacityAh: number | null;
    nominalVoltage: number | null;
    chemistry: string | null;
    batteryHealth: number;
    reserveSoc: number | null;
  };
  batteryCharging: BatteryChargingProfile | null;
  runtimeHandoff: {
    loadWatts: number | null;
    loadType: "ac" | "dc" | "mixed" | null;
    appliances: Array<{ label: string; watts: number; quantity: number; loadType: "ac" | "dc"; dutyCycle: number }>;
  };
  solar: {
    latitude: number | null;
    longitude: number | null;
    systemCapacityKw: number | null;
    panelPowerW: number | null;
    tiltDeg: number | null;
    azimuthDeg: number | null;
  };
  usageRows: Array<{
    id: string;
    label: string;
    presetId?: string;
    mode: "watts-time" | "kwh-cycle" | "label-energy";
    watts: number | null;
    quantity: number;
    hoursPerDay: number | null;
    daysPerWeek: number | null;
    dutyCycle: number;
    kWhPerCycle: number | null;
    cyclesPerWeek: number | null;
    labelKWh: number | null;
    labelPeriod: "month" | "year" | null;
    origin: "preset" | "user-edited" | "label-value";
  }>;
  electricityPricePerKwh: number | null;
  electricityCurrency: string | null;
  evCharging: {
    batteryCapacityKWh: number | null;
    startSoc: number | null;
    targetSoc: number | null;
    chargerPowerKw: number | null;
    chargingType: "AC" | "DC" | null;
    vehicleMaxAcPowerKw: number | null;
    vehicleMaxDcPowerKw: number | null;
    acEfficiency: number | null;
    dcEfficiency: number | null;
    dcTaperMode: "generic" | "constant" | null;
  };
}

export interface BatteryChargingProfile {
  mode: "ah-amps" | "energy-power";
  capacityAh: number | null;
  capacityWh: number | null;
  voltage: number | null;
  startSoc: number | null;
  targetSoc: number | null;
  chargerCurrentA: number | null;
  chargerOutputPowerW: number | null;
  batteryMaxChargeCurrentA: number | null;
  batteryMaxChargePowerW: number | null;
  chemistry: string | null;
  batteryChargeEfficiency: number | null;
  planningOverheadEnabled: boolean | null;
  planningOverheadFactor: number | null;
}

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const defaultProfile = (): EnergyProfileV1 => ({
  version: 1,
  battery: {
    capacityWh: null,
    capacityAh: null,
    nominalVoltage: null,
    chemistry: null,
    batteryHealth: 1,
    reserveSoc: null,
  },
  batteryCharging: null,
  runtimeHandoff: { loadWatts: null, loadType: null, appliances: [] },
  solar: { latitude: null, longitude: null, systemCapacityKw: null, panelPowerW: null, tiltDeg: null, azimuthDeg: null },
  usageRows: [],
  electricityPricePerKwh: null,
  electricityCurrency: null,
  evCharging: { batteryCapacityKWh: null, startSoc: null, targetSoc: null, chargerPowerKw: null, chargingType: null, vehicleMaxAcPowerKw: null, vehicleMaxDcPowerKw: null, acEfficiency: null, dcEfficiency: null, dcTaperMode: null },
});

export function createEnergyProfileStore(storage: StorageLike) {
  const read = (): EnergyProfileV1 => {
    try {
      const parsed: unknown = JSON.parse(storage.getItem(ENERGY_PROFILE_STORAGE_KEY) ?? "null");
      if (typeof parsed === "object" && parsed !== null && "version" in parsed && parsed.version === 1) {
        const profile = parsed as Partial<EnergyProfileV1>;
        return {
          ...defaultProfile(),
          ...profile,
          battery: { ...defaultProfile().battery, ...profile.battery },
          batteryCharging: profile.batteryCharging ? { ...defaultBatteryChargingProfile(), ...profile.batteryCharging } : null,
          runtimeHandoff: { ...defaultProfile().runtimeHandoff, ...profile.runtimeHandoff },
          solar: { ...defaultProfile().solar, ...profile.solar },
          usageRows: Array.isArray(profile.usageRows) ? profile.usageRows : [],
          electricityPricePerKwh: typeof profile.electricityPricePerKwh === "number" ? profile.electricityPricePerKwh : null,
          electricityCurrency: typeof profile.electricityCurrency === "string" ? profile.electricityCurrency : null,
          evCharging: { ...defaultProfile().evCharging, ...profile.evCharging },
        };
      }
    } catch { /* invalid browser data falls back safely */ }
    return defaultProfile();
  };
  const write = (profile: EnergyProfileV1) => {
    try {
      storage.setItem(ENERGY_PROFILE_STORAGE_KEY, JSON.stringify(profile));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("energy-profile-updated", { detail: profile }));
      }
    } catch { /* storage failures are non-fatal */ }
  };
  return {
    read,
    write,
    patchBattery(update: Partial<EnergyProfileV1["battery"]>) {

      const profile = read();
      write({ ...profile, battery: { ...profile.battery, ...update } });
    },
    patchBatteryCharging(update: Partial<BatteryChargingProfile>) {
      const profile = read();
      write({ ...profile, batteryCharging: { ...defaultBatteryChargingProfile(), ...(profile.batteryCharging ?? {}), ...update } });
    },
    patchRuntimeHandoff(update: Partial<EnergyProfileV1["runtimeHandoff"]>) {
      const profile = read();
      write({ ...profile, runtimeHandoff: { ...profile.runtimeHandoff, ...update } });
    },
    patchSolar(update: Partial<EnergyProfileV1["solar"]>) {
      const profile = read();
      write({ ...profile, solar: { ...profile.solar, ...update } });
    },
    patchUsageRows(usageRows: EnergyProfileV1["usageRows"]) {
      const profile = read();
      write({ ...profile, usageRows });
    },
    patchElectricityPricePerKwh(value: number | null) {
      const profile = read();
      write({ ...profile, electricityPricePerKwh: value });
    },
    patchElectricityCurrency(value: string | null) {
      const profile = read();
      write({ ...profile, electricityCurrency: value });
    },
    patchEvCharging(update: Partial<EnergyProfileV1["evCharging"]>) {
      const profile = read();
      write({ ...profile, evCharging: { ...profile.evCharging, ...update } });
    },
    reset() {
      try {
        storage.removeItem(ENERGY_PROFILE_STORAGE_KEY);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("energy-profile-updated", { detail: defaultProfile() }));
        }
      } catch { /* non-fatal */ }
    },
  };
}

function defaultBatteryChargingProfile(): BatteryChargingProfile {
  return {
    mode: "ah-amps",
    capacityAh: null,
    capacityWh: null,
    voltage: null,
    startSoc: null,
    targetSoc: null,
    chargerCurrentA: null,
    chargerOutputPowerW: null,
    batteryMaxChargeCurrentA: null,
    batteryMaxChargePowerW: null,
    chemistry: null,
    batteryChargeEfficiency: null,
    planningOverheadEnabled: null,
    planningOverheadFactor: null,
  };
}
