import { APPLIANCES } from "../../../data/appliances";
import { getApplianceUsagePreset } from "../../../data/appliance-usage-presets";
import type { EnergyProfileV1 } from "../../energy-profile/store";
import type { SolarLoadRowInput } from "./engine";

const appliance = (id: string) => APPLIANCES.find((item) => item.id === id) ?? APPLIANCES.find((item) => item.id === "custom")!;

export function createStarterSolarLoadRows(): SolarLoadRowInput[] {
  const refrigerator = appliance("refrigerator");
  const router = appliance("wifi-router");
  const bulb = appliance("led-bulb");
  const tv = appliance("led-tv");
  return [
    { id: "refrigerator", label: refrigerator.label, watts: 150, quantity: 1, hoursPerDay: 24, dutyCycle: 0.35, essential: true },
    { id: "wifi-router", label: router.label, watts: 12, quantity: 1, hoursPerDay: 24, dutyCycle: 1, essential: true },
    { id: "led-bulbs", label: "LED bulbs", watts: bulb.watts, quantity: 4, hoursPerDay: 5, dutyCycle: 1, essential: true },
    { id: "led-tv", label: tv.label, watts: tv.watts, quantity: 1, hoursPerDay: 4, dutyCycle: 1, essential: false },
  ];
}

type ProfileRow = EnergyProfileV1["usageRows"][number];

export function importSolarLoadRows(rows: ProfileRow[]): SolarLoadRowInput[] {
  return rows.flatMap((row) => {
    const watts = row.watts;
    const hoursPerDay = row.hoursPerDay;
    const daysPerWeek = row.daysPerWeek;
    if (row.mode !== "watts-time" || watts === null || !Number.isFinite(watts) || watts <= 0 || !Number.isFinite(row.quantity) || !Number.isInteger(row.quantity) || row.quantity <= 0 || hoursPerDay === null || !Number.isFinite(hoursPerDay) || hoursPerDay < 0 || daysPerWeek === null || !Number.isFinite(daysPerWeek) || daysPerWeek < 1 || daysPerWeek > 7 || !Number.isFinite(row.dutyCycle) || row.dutyCycle <= 0 || row.dutyCycle > 1) return [];
    const preset = row.presetId ? APPLIANCES.find((item) => item.id === row.presetId) : undefined;
    const schedule = getApplianceUsagePreset(row.presetId ?? "custom");
    return [{
      id: `profile-${row.id}`,
      label: row.label || preset?.label || "Imported appliance",
      watts,
      quantity: row.quantity,
      hoursPerDay: hoursPerDay * daysPerWeek / 7,
      dutyCycle: row.dutyCycle || schedule.dutyCycle,
      essential: false,
    }];
  });
}
