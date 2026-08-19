import type { CalculationResult } from "@/types/calculation";

export interface SolarLoadRowInput {
  id: string;
  label: string;
  watts: number;
  quantity: number;
  hoursPerDay: number;
  dutyCycle: number;
  essential: boolean;
}

export interface SolarLoadInput {
  rows: SolarLoadRowInput[];
}

export type SolarLoadResult = CalculationResult<{
  rows: Array<SolarLoadRowInput & { dailyWh: number; connectedW: number }>;
  totalDailyKWh: number;
  essentialDailyKWh: number;
  otherDailyKWh: number;
  connectedRunningW: number;
  essentialConnectedW: number;
  topContributors: Array<{ id: string; label: string; dailyKWh: number; sharePercent: number }>;
  comparison: {
    allLoads: { dailyKWh: number; connectedW: number };
    essentialOnly: { dailyKWh: number; connectedW: number };
  };
}>;

const finite = (value: number) => Number.isFinite(value);

export function calculateSolarLoad(input: SolarLoadInput): SolarLoadResult {
  if (!Array.isArray(input.rows) || input.rows.length === 0) throw new Error("Add at least one appliance.");

  input.rows.forEach((row) => {
    if (!row || typeof row.label !== "string" || !row.label.trim()) throw new Error("Enter an appliance name.");
    if (!finite(row.watts) || row.watts <= 0) throw new Error("Watts must be greater than zero.");
    if (!finite(row.quantity) || !Number.isInteger(row.quantity) || row.quantity <= 0) throw new Error("Quantity must be a positive whole number.");
    if (!finite(row.hoursPerDay) || row.hoursPerDay < 0 || row.hoursPerDay > 24) throw new Error("Hours per day must be between 0 and 24.");
    if (!finite(row.dutyCycle) || row.dutyCycle <= 0 || row.dutyCycle > 1) throw new Error("Duty cycle must be greater than 0% and no more than 100%.");
    if (typeof row.essential !== "boolean") throw new Error("Choose whether the load is marked essential.");
  });

  const rows = input.rows.map((row) => ({
    ...row,
    dailyWh: row.watts * row.quantity * row.hoursPerDay * row.dutyCycle,
    connectedW: row.watts * row.quantity,
  }));
  const totalDailyWh = rows.reduce((sum, row) => sum + row.dailyWh, 0);
  const essentialDailyWh = rows.reduce((sum, row) => sum + (row.essential ? row.dailyWh : 0), 0);
  const connectedRunningW = rows.reduce((sum, row) => sum + row.connectedW, 0);
  const essentialConnectedW = rows.reduce((sum, row) => sum + (row.essential ? row.connectedW : 0), 0);
  const totalDailyKWh = totalDailyWh / 1_000;
  const essentialDailyKWh = essentialDailyWh / 1_000;
  const topContributors = totalDailyWh > 0
    ? rows.slice().sort((a, b) => b.dailyWh - a.dailyWh).map((row) => ({ id: row.id, label: row.label, dailyKWh: row.dailyWh / 1_000, sharePercent: row.dailyWh / totalDailyWh * 100 }))
    : [];

  return {
    formulaVersion: "1.0.0",
    result: {
      rows,
      totalDailyKWh,
      essentialDailyKWh,
      otherDailyKWh: totalDailyKWh - essentialDailyKWh,
      connectedRunningW,
      essentialConnectedW,
      topContributors,
      comparison: {
        allLoads: { dailyKWh: totalDailyKWh, connectedW: connectedRunningW },
        essentialOnly: { dailyKWh: essentialDailyKWh, connectedW: essentialConnectedW },
      },
    },
    assumptions: [
      { key: "loadRows", value: rows.length, unit: "appliances", provenance: "user-entered", description: "Editable appliance load rows" },
      { key: "dutyCycle", value: "per row", provenance: "preset", description: "Cycling planning estimates are editable" },
      { key: "connectedRunningW", value: connectedRunningW, unit: "W", provenance: "derived", description: "Listed loads if they operate together" },
    ],
    warnings: [],
    qualityLabel: "preset-assisted",
  };
}
