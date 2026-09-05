---
title: "Building Pure Deterministic Energy Planning Engines in TypeScript (Zero-Database Architecture)"
published: true
description: "How we built open-access, zero-database energy modeling calculators using pure TypeScript functions, immutable math engines, and typed provenance tracking."
tags: typescript, webdev, opensource, architecture
canonical_url: "https://www.powelab.org/developers"
series: "Open Energy Modeling in TypeScript"
---

When building engineering tools for sizing solar arrays, lithium battery storage banks, or residential EV chargers, modern web development frequently defaults to complex architectures: serverless databases, session auth, backend ORMs, and closed-source subscription APIs.

However, computational physics and electrical engineering don't need a database to calculate Ohm's law, Peukert's electrochemical capacity de-rating, or NREL Perez solar transposition models.

In building [PowerLab](https://www.powelab.org), an open-access engineering suite across solar, battery, and home energy systems, we established an uncompromising architectural constraint: **Zero databases, zero user-tracking cookies, zero server-side state, and 100% deterministic pure TypeScript engines.**

Here is how we structured this deterministic architecture, implemented typed input provenance, and decoupled computational modeling from the React view layer.

---

## 1. The Core Philosophy: Deterministic Purity

Every calculator engine in our codebase obeys three strict mathematical constraints:

1. **Pure Function Signature:** `(inputs: EngineInputs) => CalculationResult<EngineOutputs>`
2. **Zero Side Effects:** Engines never import React hooks, never touch the browser `DOM` or `localStorage`, never trigger network requests, and never read system clocks directly.
3. **Reproducible Invariants:** Identical numerical inputs must return the exact same bit-for-bit output across all execution environments (Node.js, edge workers, browser V8, Vitest).

```typescript
// src/lib/calculators/battery-runtime.ts
export interface BatteryRuntimeInputs {
  batteryCapacityAh: number;
  nominalVoltageV: number;
  continuousLoadWatts: number;
  depthOfDischargeFraction: number; // e.g., 0.80 for LiFePO4, 0.50 for Lead-Acid
  inverterEfficiencyFraction: number; // e.g., 0.90
  peukertExponent: number; // e.g., 1.02 for LFP, 1.25 for AGM/FLA
}

export interface BatteryRuntimeOutputs {
  runtimeHours: number;
  usableEnergyWh: number;
  effectiveCurrentDrawAmps: number;
  peukertLossFraction: number;
}
```

---

## 2. Typed Input Provenance & Transparent Assumptions

In engineering software, returning a single opaque number (e.g., `12.4 hours`) without exposing the assumptions that produced it leads to dangerous real-world errors. If a user sized a backup battery without realizing the engine assumed an 85% inverter efficiency or a 1.25 Peukert exponent, they would face sudden power cutoffs during an outage.

To eliminate "black box" math, every calculation returns a standardized `CalculationResult<T>` envelope containing typed provenance tracking:

```typescript
// src/types/calculator.ts
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
```

When rendering in the UI or exporting to our [open developer API](https://www.powelab.org/developers), the client unpacks this envelope into an interactive LaTeX equation card and a transparent assumptions audit table.

---

## 3. Implementing Peukert's Electrochemical Law in Pure TypeScript

To demonstrate the engine in practice, consider calculating battery discharge under high loads. Standard naive calculators use nominal energy:

$$\text{Runtime} = \frac{\text{Ah} \times \text{Volts} \times \text{DoD} \times \eta}{\text{Load (Watts)}}$$

However, Wilhelm Peukert proved in 1897 that effective capacity degrades non-linearly as discharge current increases:

$$C_p = I^k \cdot t \implies t = \frac{C_p}{I^k} = \frac{C_0 \cdot \left(\frac{C_0}{R_{rating}}\right)^{k-1}}{I^k}$$

Where $k$ is the Peukert exponent ($k \approx 1.02$ for Lithium Iron Phosphate LiFePO4, but $k \approx 1.25$ for Lead-Acid).

Here is our pure TypeScript engine implementation:

```typescript
export function calculateBatteryRuntime(
  inputs: BatteryRuntimeInputs
): CalculationResult<BatteryRuntimeOutputs> {
  const {
    batteryCapacityAh,
    nominalVoltageV,
    continuousLoadWatts,
    depthOfDischargeFraction,
    inverterEfficiencyFraction,
    peukertExponent,
  } = inputs;

  // 1. Validation Invariants
  if (batteryCapacityAh <= 0 || nominalVoltageV <= 0 || continuousLoadWatts <= 0) {
    throw new Error("Physical inputs must be positive non-zero numbers.");
  }

  // 2. DC Current Draw from Inverter
  const effectiveDcWatts = continuousLoadWatts / inverterEfficiencyFraction;
  const currentDrawAmps = effectiveDcWatts / nominalVoltageV;

  // 3. Peukert Non-Linear Discharge Time (assuming standard 20h reference rating)
  const referenceRatingHours = 20;
  const referenceDischargeCurrent = batteryCapacityAh / referenceRatingHours;
  
  // Adjusted capacity based on current rate
  const peukertAdjustedCapacityAh =
    batteryCapacityAh * Math.pow(referenceDischargeCurrent / currentDrawAmps, peukertExponent - 1);

  // Usable Ah after Depth-of-Discharge (DoD)
  const usableAh = peukertAdjustedCapacityAh * depthOfDischargeFraction;
  const runtimeHours = usableAh / currentDrawAmps;
  const usableEnergyWh = batteryCapacityAh * nominalVoltageV * depthOfDischargeFraction;

  const peukertLossFraction = Math.max(
    0,
    1 - peukertAdjustedCapacityAh / batteryCapacityAh
  );

  const warnings: CalculationWarning[] = [];
  if (currentDrawAmps > batteryCapacityAh * 1.5) {
    warnings.push({
      code: "HIGH_C_RATE",
      severity: "caution",
      message: `Discharge rate exceeds 1.5C (${currentDrawAmps.toFixed(1)}A), causing significant internal thermal dissipation.`,
    });
  }

  return {
    formulaVersion: "2026.1-peukert-ieee485",
    result: {
      runtimeHours: Number(runtimeHours.toFixed(2)),
      usableEnergyWh: Math.round(usableEnergyWh),
      effectiveCurrentDrawAmps: Number(currentDrawAmps.toFixed(2)),
      peukertLossFraction: Number(peukertLossFraction.toFixed(3)),
    },
    assumptions: [
      {
        key: "inverterEfficiency",
        value: `${(inverterEfficiencyFraction * 100).toFixed(0)}%`,
        provenance: "preset",
        description: "DC-to-AC pure sine wave inverter conversion loss.",
      },
      {
        key: "peukertExponent",
        value: peukertExponent,
        provenance: peukertExponent > 1.1 ? "preset" : "user-entered",
        description: "Electrochemical internal resistance rate-capacity de-rating factor.",
      },
    ],
    warnings,
    qualityLabel: "specific-inputs",
  };
}
```

---

## 4. Why Invariant Unit Testing Replaces Manual UI QA

Because these engines are pure TypeScript functions without UI dependencies, we can verify physics invariants across hundreds of edge-case test suites in under 300 milliseconds using Vitest:

```typescript
describe("Battery Runtime Invariant Tests", () => {
  it("satisfies monotonic invariant: doubling capacity strictly increases runtime", () => {
    const base = {
      batteryCapacityAh: 100,
      nominalVoltageV: 12,
      continuousLoadWatts: 200,
      depthOfDischargeFraction: 0.8,
      inverterEfficiencyFraction: 0.9,
      peukertExponent: 1.05,
    };

    const res1 = calculateBatteryRuntime(base);
    const res2 = calculateBatteryRuntime({ ...base, batteryCapacityAh: 200 });

    expect(res2.result.runtimeHours).toBeGreaterThan(res1.result.runtimeHours);
  });

  it("proves LiFePO4 outlasts Lead-Acid under high C-rate loads due to Peukert factor", () => {
    const highLoad = {
      batteryCapacityAh: 100,
      nominalVoltageV: 12,
      continuousLoadWatts: 800, // High ~74A draw
      depthOfDischargeFraction: 0.8,
      inverterEfficiencyFraction: 0.9,
    };

    const lfp = calculateBatteryRuntime({ ...highLoad, peukertExponent: 1.02 });
    const leadAcid = calculateBatteryRuntime({ ...highLoad, peukertExponent: 1.25 });

    expect(lfp.result.runtimeHours).toBeGreaterThan(leadAcid.result.runtimeHours * 1.3);
  });
});
```

---

## 5. Exploring the Full Open Model

You can test these models live in our [Interactive Battery Runtime Calculator](https://www.powelab.org/battery/battery-runtime-calculator) or inspect the full developer documentation and API endpoints at [PowerLab Developers](https://www.powelab.org/developers).

By keeping engineering calculations decoupled in deterministic TypeScript, we achieve sub-millisecond execution times, 100% user privacy, and zero infrastructure hosting overhead.
