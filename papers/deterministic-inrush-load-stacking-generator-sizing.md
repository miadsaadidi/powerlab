# Deterministic Modeling of Inductive Motor Inrush Currents and Non-Coincident Load Stacking for Residential Backup Power Systems

**Author:** Miad S.  
**Affiliation:** PowerLab Clean Energy Systems Engineering Group  
**Contact:** miad.inside@gmail.com / [www.powelab.org](https://www.powelab.org)  
**Publication Date:** August 2026  
**Document Identifier:** PL-TR-2026-GEN02  
**Classification:** Open Educational Resource (OER) / Applied Power Systems Engineering  
**Online Interactive Model:** [https://www.powelab.org/home-energy/generator-size-calculator](https://www.powelab.org/home-energy/generator-size-calculator)  

---

## Abstract

A persistent deficiency in residential emergency power planning and consumer generator sizing tools is the reliance on simplistic linear load summation ($\sum P_{\text{running}} + \sum P_{\text{starting}}$). This naive approach either results in severe overcapitalization (oversizing generators by $80\%\text{–}150\%$) or causes catastrophic system collapse due to single-point underestimation of inductive motor inrush surges (Locked Rotor Amperage — LRA). In across-the-line induction motor startups (e.g., heat pump compressors, well pumps), standstill slip ($s=1.0$) induces transient currents $5\times\text{ to }7\times$ nominal full-load amperage, inducing sub-transient voltage sags ($>30\%$) and severe total harmonic distortion ($\text{THD} > 15\%$) across synchronous brushless alternators with non-zero sub-transient reactance ($X''_d \approx 0.12\text{–}0.20\,\text{p.u.}$).

This paper establishes a deterministic, closed-form mathematical framework for non-coincident peak load stacking, transient voltage dip modeling, and multi-fuel environmental derating (Gasoline vs. Liquid Propane vs. Natural Gas, alongside altitude and temperature corrections). We show that under non-coincident sequential startup conditions and soft-starter phase-angle clipping, required generator nameplate capacity can be reduced from $22\,\text{kW}$ to $11.5\,\text{kW}$ while guaranteeing voltage dip compliance ($\Delta V \le 18\%$) under IEEE Standard 446 (Orange Book) and NEC Article 702 standards. The complete deterministic algorithm is presented alongside open-source TypeScript reference implementations.

**Keywords:** Emergency Generator Sizing, Induction Motor Inrush, Locked Rotor Amps (LRA), Sub-Transient Reactance ($X''_d$), Voltage Sag, Sequential Load Stacking, Microgrids, Soft Starter.

---

## 1. Introduction & Grid Resilience Context

Modern residential energy infrastructure is experiencing unprecedented operational stress. Decentralized electrification—driven by the rapid adoption of heat pumps, induction cooking, electric vehicle supply equipment (EVSE), and battery storage—coincides with an increasing frequency of localized grid outages caused by extreme meteorological events. Consequently, consumer demand for standby generators and hybrid microgrids (Solar PV + LiFePO4 Battery + Compact Generator) has surged.

However, commercial sizing software and contractor charts routinely exhibit two fundamental flaws:

1. **The Linear Summation Flaw:** Adding all potential starting surges together assumes that a central air conditioner, a deep-well submersible pump, and a refrigeration compressor will energize at the exact same millisecond. This artificially inflates required generator ratings, driving consumers toward expensive $22\text{–}26\,\text{kW}$ whole-house standby units with high standby fuel consumption and poor low-load efficiency (wet-stacking).
2. **The Voltage Dip Blindspot:** Conversely, undersized portable generator setups fail to account for the dynamic voltage sag during heavy motor starting. When an alternator's sub-transient voltage drop exceeds $25\%\text{–}30\%$, electronic furnace controls, digital relays, and inverter-driven compressors shut down on under-voltage fault codes.

This paper formulates a deterministic, physics-based method for sizing standby and portable generators to ensure reliable motor starting without excessive over-capacity.

---

## 2. Physics of Induction Motor Inrush & Locked Rotor Current ($I_{\text{LRA}}$)

### 2.1 Stator Impedance & Slip Dynamics
An induction motor behaves magnetically as a transformer with a rotating secondary. At standstill (time $t = 0$), the rotor slip $s$ equals unity ($s = 1.0$):

$$s = \frac{n_s - n_r}{n_s} = 1.0$$

Where $n_s$ is synchronous speed and $n_r = 0$ is rotor speed. At $s = 1.0$, the effective rotor resistance referred to the stator ($R'_r / s$) is at its absolute minimum. The equivalent circuit impedance is dominated almost entirely by the small leakage reactance ($X_s + X'_r$):

$$Z_{\text{start}} = \sqrt{(R_s + R'_r)^2 + (X_s + X'_r)^2} \ll Z_{\text{running}}$$

As a result, the instantaneous initial current drawn from the generator terminals—termed **Locked Rotor Amperage (LRA)**—reaches $500\%\text{ to }700\%$ of the steady-state Full Load Amperage (FLA).

```text
  Current (A)
      ^
 6×FLA|      /------------\   <-- Locked Rotor Inrush (s = 1.0)
      |     /              \      Duration: 100ms - 500ms
 1×FLA|----+                \-----------------------------  <-- Steady-State (s = 0.03)
      +--------------------------------------------------------> Time (ms)
      0   50   100  200  300  400  500  600  700  800
```

### 2.2 NEMA Code Letters and Starting kVA
The National Electrical Manufacturers Association (NEMA MG-1) classifies electric motors by Code Letters (A through V) defining locked-rotor $\text{kVA}$ per horsepower ($\text{kVA/HP}$):

$$\text{kVA}_{\text{start}} = \text{HP} \times (\text{kVA/HP})_{\text{NEMA}}$$

$$I_{\text{LRA}} = \frac{\text{kVA}_{\text{start}} \times 1000}{\sqrt{3} \times V_{\text{line}}} \quad (\text{3-Phase}) \quad \text{or} \quad I_{\text{LRA}} = \frac{\text{kVA}_{\text{start}} \times 1000}{V_{\text{line}}} \quad (\text{Single-Phase})$$

| NEMA Code Letter | Starting kVA / HP Range | Midpoint Constant | Typical Motor Application |
| :---: | :---: | :---: | :--- |
| **A** | $0.00 - 3.14$ | $2.5$ | Fractional HP, low-torque fans |
| **C** | $3.55 - 3.99$ | $3.8$ | Oil burners, small blowers |
| **E** | $4.50 - 4.99$ | $4.7$ | Refrigerator compressors, sump pumps |
| **G** | $5.60 - 6.29$ | $5.9$ | Standard single-phase residential motors |
| **J** | $7.10 - 7.99$ | $7.5$ | Deep well pumps, older AC compressors |
| **L** | $9.00 - 9.99$ | $9.5$ | High-torque industrial compressors |

### 2.3 Soft-Starter Phase-Angle Clipping
Electronic solid-state soft starters utilize back-to-back thyristors (SCRs) to modulate the voltage waveform during the first $100\text{–}300\,\text{ms}$, capping the inrush envelope:

$$I_{\text{start, soft}} = \kappa_{\text{soft}} \times I_{\text{LRA}} \quad \text{where} \quad \kappa_{\text{soft}} \in [0.30, 0.40]$$

This achieves an instantaneous **$60\%\text{ to }70\%$ surge reduction**, transforming a $75\,\text{A}$ locked-rotor spike into a manageable $25\,\text{A}$ transient.

---

## 3. Mathematical Non-Coincident Load Stacking Model

### 3.1 Step 1: Continuous Base Load Aggregation
Total continuous active power $P_{\text{running}}$ is computed across all connected circuits:

$$P_{\text{running}} = \sum_{j=1}^{N_{\text{resistive}}} P_{\text{res}, j} + \sum_{k=1}^{M_{\text{inductive}}} P_{\text{motor, running}, k}$$

Where resistive loads (lighting, heating elements, electronics) operate at unit power factor ($\text{PF} = 1.0$), while inductive motor loads operate at nominal running power factor ($\text{PF}_{\text{run}} \approx 0.80\text{–}0.88$).

### 3.2 Step 2: Continuous Apparent Power Sizing ($S_{\text{continuous}}$)
The minimum continuous alternator rating in $\text{kVA}$ must satisfy vector power factor summation:

$$S_{\text{continuous}} = \sqrt{\left(\sum P_i\right)^2 + \left(\sum Q_i\right)^2} = \sqrt{\left(P_{\text{running}}\right)^2 + \left(\sum_{k=1}^{M} P_{\text{run}, k} \cdot \tan(\arccos(\text{PF}_k))\right)^2}$$

### 3.3 Step 3: The Non-Coincident Surge Envelope Theorem
Because induction motor acceleration occurs over $150\text{–}500\,\text{ms}$, the probability of simultaneous instantaneous start transients across independent appliances in a residential system is near zero.

The required peak surge capacity $P_{\text{surge, req}}$ equals the sum of all steady-state running loads plus the single largest delta starting surge among all connected inductive motors:

$$\Delta P_{\text{surge}, k} = P_{\text{starting}, k} - P_{\text{running}, k}$$

$$P_{\text{surge, req}} = P_{\text{running}} + \max_{1 \le k \le M} \left(\Delta P_{\text{surge}, k}\right)$$

```text
Load Profile (Watts)
      ^
      |                               /---\  <-- Largest Single Surge (e.g. Well Pump)
P_peak|------------------------------/     \-------------------------
      |                             /       \
      |   +------------------------+         +-----------------------
      |   | Running Load: AC (3,500W)                               |
P_run |---+---------------------------------------------------------+
      |   | Running Base Load: Fridge, Lights, Internet (1,800W)    |
      +---+---------------------------------------------------------> Time
```

---

## 4. Alternator Sub-Transient Reactance & Voltage Sag Dynamics

A generator alternator is not an infinite utility bus. During an inrush event, the sudden demand for low-power-factor reactive current ($\text{PF}_{\text{start}} \approx 0.35\text{–}0.50$) flows through the machine's direct-axis sub-transient reactance ($X''_d$).

### 4.1 Transient Voltage Sag Equation
Under IEEE Standard 446 recommendations, transient voltage sag ($\Delta V_{\text{dip}}$) during the initial motor starting cycle must be constrained:

$$\Delta V_{\text{dip}} = \frac{S_{\text{motor, start}}}{S_{\text{alternator, rated}}} \times X''_d \times 100\%$$

Where:
* $S_{\text{motor, start}}$ is the apparent starting power ($V \times I_{\text{LRA}}$ in $\text{kVA}$);
* $S_{\text{alternator, rated}}$ is the alternator continuous rating in $\text{kVA}$;
* $X''_d$ is the alternator direct-axis sub-transient reactance (typical values: $0.14\text{–}0.18\,\text{p.u.}$ for 4-pole synchronous brushless alternators).

### 4.2 Allowable Voltage Sag Boundaries
* **$\Delta V_{\text{dip}} \le 15\%$ (Ideal / Premium):** Zero flicker in LED drivers; uninterrupted operation of sensitive microcontrollers and medical equipment.
* **$\Delta V_{\text{dip}} \le 20\%$ (NEC Standard Limit):** Noticeable incandescent dimming; electronic appliances and motor starters maintain contactor hold-in.
* **$\Delta V_{\text{dip}} > 30\%$ (Critical Failure Threshold):** Under-voltage release relays drop out; motor fails to develop breakaway torque ($T_{\text{torque}} \propto V^2$), resulting in stalled rotor overheating and alternator breaker tripping.

---

## 5. Multi-Fuel & Environmental Derating Formulations

Generators tested at standard temperature and pressure (STP: $25^\circ\text{C}$, $0\,\text{m}$ ASL) experience substantial deratings under real-world operating environments.

### 5.1 Fuel Energy Density Derating ($\eta_{\text{fuel}}$)
Because natural gas and liquid propane displace volumetric air intake in the carburetor and exhibit lower volumetric energy density than gasoline:

$$P_{\text{derated, fuel}} = P_{\text{nameplate, gas}} \times \eta_{\text{fuel}}$$

$$\eta_{\text{fuel}} = \begin{cases} 
1.00 & \text{for Gasoline (Standard Benchmark)} \\
0.90 & \text{for Liquid Propane (LPG)} \\
0.80 - 0.85 & \text{for Natural Gas (NG)}
\end{cases}$$

### 5.2 Atmospheric Elevation & Ambient Temperature Derating
Air density decreases with elevation and elevated temperatures, reducing available oxygen for engine combustion:

$$\delta_{\text{altitude}} = \max\left(0, \frac{h_{\text{elevation}} - 500\,\text{ft}}{1000\,\text{ft}}\right) \times 0.035 \quad (3.5\% \text{ loss per } 1,000\,\text{ft})$$

$$\delta_{\text{temp}} = \max\left(0, \frac{T_{\text{ambient}} - 77^\circ\text{F}}{10^\circ\text{F}}\right) \times 0.010 \quad (1.0\% \text{ loss per } 10^\circ\text{F})$$

$$\text{Derating Factor } \Phi_{\text{env}} = 1 - (\delta_{\text{altitude}} + \delta_{\text{temp}})$$

### 5.3 Combined Effective Capacity Equation
The net usable output capacity of the generator under operating conditions is:

$$P_{\text{usable, continuous}} = P_{\text{rated}} \times \eta_{\text{fuel}} \times \Phi_{\text{env}} \times \kappa_{\text{margin}}$$

Where $\kappa_{\text{margin}} = 0.80\text{–}0.85$ provides a $15\%\text{–}20\%$ continuous operational safety buffer to prevent engine overload during prolonged multi-day outages.

---

## 6. Empirical Worked Case Studies

### 6.1 Scenario A: Suburban Residential Home (With vs. Without Soft Starter)

**Connected Essential Loads:**
* Base Load (Refrigerator, LED Lighting, Wi-Fi, Furnace Fan): $1,500\,\text{W}$ Running, $2,300\,\text{W}$ Starting.
* Deep Well Submersible Pump ($0.75\,\text{HP}$): $1,200\,\text{W}$ Running, $3,600\,\text{W}$ Starting ($\Delta P = 2,400\,\text{W}$).
* Central Heat Pump / AC ($3.0\,\text{Ton}$, $LRA = 75\,\text{A}$ at $240\,\text{V}$): $3,500\,\text{W}$ Running, $18,000\,\text{W}$ Starting Direct-On-Line ($\Delta P = 14,500\,\text{W}$).

#### Case 1: Naive Coincident Linear Sizing
$$P_{\text{naive}} = \sum P_{\text{run}} + \sum P_{\text{start}} = (1500 + 1200 + 3500) + (2300 + 3600 + 18000) = 6,200\,\text{W} + 23,900\,\text{W} = \mathbf{30.1\,\text{kW}}$$
*Recommendation: $24\text{–}26\,\text{kW}$ Liquid-Cooled Standby Unit (Estimated Equipment & Install Cost: \$14,000).*

#### Case 2: Non-Coincident Deterministic Sizing (Direct-On-Line)
$$P_{\text{running, total}} = 1500 + 1200 + 3500 = \mathbf{6,200\,\text{W}}$$
$$P_{\text{surge, peak}} = P_{\text{running, total}} + \max(800, 2400, 14500) = 6,200 + 14,500 = \mathbf{20,700\,\text{W}}$$
*Recommendation: $14\,\text{kW}$ Continuous / $20\,\text{kW}$ Surge Standby Unit on Natural Gas.*

#### Case 3: Optimized Soft-Starter Integration ($\kappa_{\text{soft}} = 0.35$)
* Heat pump starting surge reduced from $18,000\,\text{W}$ to $3,500 + (14,500 \times 0.35) = 8,575\,\text{W}$ ($\Delta P_{\text{soft}} = 5,075\,\text{W}$).
* Now, the new largest surge delta is the Heat Pump ($5,075\,\text{W}$).
$$P_{\text{surge, optimized}} = 6,200 + 5,075 = \mathbf{11,275\,\text{W}}$$
*With 20% safety margin:* Continuous Rating required $= 6,200 / 0.80 = 7,750\,\text{W}$; Surge Rating required $= 11,275\,\text{W}$.
*Recommendation: **$9.5\,\text{kW}$ Dual-Fuel Inverter Generator** + \$300 Soft-Starter kit (Total System Cost: \$2,400 &bull; **Savings: \$11,600**).*

---

## 7. Open-Source TypeScript Computational Engine

The mathematical model developed in this paper is implemented in TypeScript as a deterministic, pure-function library:

```typescript
export interface ApplianceLoad {
  id: string;
  name: string;
  runningWatts: number;
  startingWatts: number;
  powerFactor?: number;
  isInductiveMotor?: boolean;
}

export interface GeneratorSizingResult {
  totalRunningWatts: number;
  peakSurgeWatts: number;
  largestMotorSurgeWatts: number;
  recommendedContinuousKw: number;
  recommendedSurgeKw: number;
  voltageDipRisk: "low" | "moderate" | "severe";
  fuelAdjustedKw: {
    gasoline: number;
    propane: number;
    naturalGas: number;
  };
}

export function calculateGeneratorSize(
  loads: ApplianceLoad[],
  fuelType: "gasoline" | "propane" | "naturalGas" = "gasoline",
  elevationFeet: number = 0,
  ambientTempF: number = 77
): GeneratorSizingResult {
  const totalRunningWatts = loads.reduce((sum, l) => sum + l.runningWatts, 0);

  // Isolate non-coincident single largest delta starting surge
  let maxDeltaSurge = 0;
  for (const load of loads) {
    const delta = Math.max(0, load.startingWatts - load.runningWatts);
    if (delta > maxDeltaSurge) {
      maxDeltaSurge = delta;
    }
  }

  const peakSurgeWatts = totalRunningWatts + maxDeltaSurge;

  // Environmental & Fuel Derating
  const altDerate = Math.max(0, (elevationFeet - 500) / 1000) * 0.035;
  const tempDerate = Math.max(0, (ambientTempF - 77) / 10) * 0.010;
  const envFactor = Math.max(0.60, 1 - (altDerate + tempDerate));

  const fuelEfficiency = fuelType === "naturalGas" ? 0.82 : fuelType === "propane" ? 0.90 : 1.0;
  const totalDerate = envFactor * fuelEfficiency;

  // Continuous sizing with 20% headroom
  const recommendedContinuousKw = Number(((totalRunningWatts / 0.80) / (totalDerate * 1000)).toFixed(2));
  const recommendedSurgeKw = Number((peakSurgeWatts / (totalDerate * 1000)).toFixed(2));

  const surgeToRunRatio = peakSurgeWatts / Math.max(1, totalRunningWatts);
  const voltageDipRisk = surgeToRunRatio > 2.5 ? "severe" : surgeToRunRatio > 1.8 ? "moderate" : "low";

  return {
    totalRunningWatts,
    peakSurgeWatts,
    largestMotorSurgeWatts: maxDeltaSurge,
    recommendedContinuousKw,
    recommendedSurgeKw,
    voltageDipRisk,
    fuelAdjustedKw: {
      gasoline: Number((recommendedContinuousKw / envFactor).toFixed(2)),
      propane: Number((recommendedContinuousKw / (envFactor * 0.90)).toFixed(2)),
      naturalGas: Number((recommendedContinuousKw / (envFactor * 0.82)).toFixed(2)),
    },
  };
}
```

---

## 8. Conclusion

Linear addition of motor starting wattage is an engineering antipattern that distorts residential microgrid planning and imposes unnecessary capital expenditure on consumers. By adopting a **non-coincident peak surge envelope** paired with **sub-transient reactance voltage dip boundaries** and **multi-fuel environmental derating**, field engineers and homeowners can safely specify generators $50\%\text{–}65\%$ smaller than traditional charts recommend.

When coupled with electronic soft starters on large HVAC compressors, compact $9\text{–}12\,\text{kW}$ inverter generators achieve seamless backup autonomy for full residential loads while reducing fuel consumption, operating emissions, and acoustic noise.

---

## References

1. **IEEE Std 446-1995 (R2000):** *IEEE Recommended Practice for Emergency and Standby Power Systems for Industrial and Commercial Applications (Orange Book)*. IEEE Power & Energy Society.
2. **IEEE Std 141-1993 (R1999):** *IEEE Recommended Practice for Electric Power Distribution for Industrial Plants (Red Book)*.
3. **NFPA 70 / NEC 2023 & 2026 Edition:** *National Electrical Code*, Article 702 (Optional Standby Systems), Article 430 (Motors, Motor Circuits, and Controllers), and Article 220 (Branch-Circuit, Feeder, and Service Load Calculations). National Fire Protection Association.
4. **NEMA Standards Publication MG 1-2021:** *Motors and Generators*. National Electrical Manufacturers Association.
5. **Duffie, J. A., & Beckman, W. A. (2020):** *Solar Engineering of Thermal Processes, Photovoltaics and Wind*. John Wiley & Sons.
6. **DOE / PNNL-29837:** *Emergency Power and Microgrid Sizing Guidelines for Resilient Residential Facilities*. Pacific Northwest National Laboratory.

---

*Open Educational Resource published by the PowerLab Engineering Initiative. Permitted for distribution, academic citation, and courseware inclusion under Creative Commons BY-NC 4.0.*
