export type EnergyProvenance = "profile-derived" | "user-edited";
export type EnergyChange = "value" | "unit";

export function energyProvenanceAfterChange(current: EnergyProvenance, change: EnergyChange): EnergyProvenance {
  return change === "unit" ? current : "user-edited";
}
