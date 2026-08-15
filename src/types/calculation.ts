export type InputProvenance =
  | "user-entered"
  | "measured"
  | "device-label"
  | "preset"
  | "derived"
  | "external-model";

export interface AssumptionUsed {
  key: string;
  value: number | string;
  unit?: string;
  provenance: InputProvenance;
  description: string;
}

export interface CalculationWarning {
  code: string;
  severity: "info" | "caution";
  message: string;
}

export interface CalculationResult<T> {
  formulaVersion: string;
  result: T;
  assumptions: AssumptionUsed[];
  warnings: CalculationWarning[];
  qualityLabel: "specific-inputs" | "preset-assisted" | "external-model";
}
