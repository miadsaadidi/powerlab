# PowerLab — Deterministic Clean Energy Planning & Modeling Platform

[![Website](https://img.shields.io/badge/Live%20Platform-powelab.org-10b981?style=flat-square)](https://www.powelab.org)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-58%20Suites%20%7C%20264%20Tests%20Passing-6e9f18?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Standards](https://img.shields.io/badge/Standards-IEEE%20%7C%20NEC%20%7C%20NREL%20%7C%20ASHRAE-blue?style=flat-square)](https://www.powelab.org/methodology)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**PowerLab** is an open-source, deterministic computational modeling platform designed to unify clean energy planning across:

$$\text{Home Energy} \longleftrightarrow \text{Battery Storage} \longleftrightarrow \text{Solar Photovoltaics} \longleftrightarrow \text{Electric Vehicles}$$

Unlike commercial aggregators that rely on opaque heuristic estimates or lead-generation funnels, PowerLab provides open mathematical models, transparent loss derivations, and standards-compliant engineering formulas with zero database tracking.

---

## ⚡ Key Architectural Pillars

- **Pure Deterministic Engines:** Every calculation engine in `src/lib/calculators/` is written in pure TypeScript with zero external dependencies, deterministic test suites, and transparent formulas.
- **Physical Loss Mechanisms Included:** Models dynamic depth of discharge (DoD), Peukert capacity derating ($I^k \cdot t = C$), inverter standby tare draw ($15\text{W}\text{--}30\text{W}$ continuous), locked rotor inrush amperage (LRA), and cold-temperature open-circuit voltage ($V_{oc}$) expansion.
- **Privacy by Design:** Zero database, zero authentication, zero user tracking, and no cookies. User energy profiles and multi-tool scenarios persist strictly within local browser `localStorage`.
- **Governing Standards:** Formulations adhere to IEEE Std 485, National Electrical Code (NEC / NFPA 70 Articles 625, 690, 702, and 706), NREL PVWatts V8 algorithms, and ASHRAE climatic design conditions.
- **Direct Academic & Educational Alignment:** Officially mapped as open courseware on [OER Commons](https://www.oercommons.org/courses/powerlab-deterministic-energy-systems-battery-storage-modeling-suite) for university engineering programs, CTE electrical apprenticeships, and physics classrooms.

---

## 📊 Calculator & Modeling Suites

| Domain | Key Interactive Tools & Models |
| :--- | :--- |
| 🔋 **Battery Storage** | • [Battery Runtime Calculator](https://www.powelab.org/battery/battery-runtime-calculator) (Peukert + Inverter Tare)<br>• [Battery Size Calculator](https://www.powelab.org/battery/battery-size-calculator)<br>• [Battery Capacity Calculator](https://www.powelab.org/battery/battery-capacity-calculator)<br>• [Battery Charging Time Calculator](https://www.powelab.org/battery/battery-charging-time-calculator)<br>• [UPS Runtime](https://www.powelab.org/battery/ups-runtime-calculator) & [UPS Battery Sizing](https://www.powelab.org/battery/ups-battery-size-calculator)<br>• [Home Battery Size Calculator](https://www.powelab.org/battery/home-battery-size-calculator)<br>• [Portable Power Station Calculator](https://www.powelab.org/battery/portable-power-station-calculator) |
| ☀️ **Solar Photovoltaics** | • [Solar Panel Tilt Calculator](https://www.powelab.org/solar/solar-panel-tilt-calculator) (PVWatts V8 + Latitude Cosine Angle)<br>• [Solar Panel Output Calculator](https://www.powelab.org/solar/solar-panel-output-calculator)<br>• [Solar Panel Size Calculator](https://www.powelab.org/solar/solar-panel-size-calculator)<br>• [Solar Battery Bank Sizing](https://www.powelab.org/solar/solar-battery-bank-size-calculator)<br>• [MPPT Solar Charge Controller Calculator](https://www.powelab.org/solar/solar-charge-controller-calculator)<br>• [Solar System Payback & ROI](https://www.powelab.org/solar/solar-payback-calculator) |
| ⚡ **Home Energy & Loads** | • [Electricity Usage Calculator](https://www.powelab.org/home-energy/electricity-usage-calculator)<br>• [Energy Bill Calculator](https://www.powelab.org/home-energy/energy-bill-calculator)<br>• [Appliance Wattage & Duty Cycle](https://www.powelab.org/home-energy/appliance-wattage-calculator)<br>• [Generator Sizing Calculator](https://www.powelab.org/home-energy/generator-size-calculator) (Motor Inrush & Starting kVA)<br>• [Air Conditioner Operating Cost Calculator](https://www.powelab.org/home-energy/air-conditioner-cost-calculator) (SEER2 Derating)<br>• [Heat Pump Cost & COP Calculator](https://www.powelab.org/home-energy/heat-pump-cost-calculator)<br>• [Space Heater Electricity Cost Calculator](https://www.powelab.org/home-energy/space-heater-cost-calculator) |
| 🚗 **Electric Vehicles** | • [EV Charging Time Calculator](https://www.powelab.org/ev/ev-charging-time-calculator) (Level 1, Level 2, DC Fast)<br>• [EV Charging Cost Calculator](https://www.powelab.org/ev/ev-charging-cost-calculator)<br>• [EV Range Calculator](https://www.powelab.org/ev/ev-range-calculator) (Aerodynamic Drag & HVAC Auxiliary Loads)<br>• [EV Fuel Savings Calculator](https://www.powelab.org/ev/ev-savings-calculator)<br>• [EV Charger Dedicated Breaker Sizing](https://www.powelab.org/ev/ev-charger-breaker-size-calculator) (NEC 625 125% Rule)<br>• [Vehicle-to-Load (V2L) Runtime Calculator](https://www.powelab.org/ev/v2l-runtime-calculator) |

---

## 🛠️ Tech Stack & Source Layout

- **Framework:** Next.js 15 (App Router, React 19, Server-Rendered SEO/GEO content)
- **Language:** TypeScript 5.9 (Strict Type Checking, 0 `any`)
- **Styling:** Modular CSS & Custom Design System (Fluid Typography, Dark/Light palettes, Semantic HTML5)
- **Testing:** Vitest 3.2 (Unit tests, edge-case bounds, invariant tests, handoff integration suites)
- **Deployment:** Vercel Automated Edge Integration

```text
src/
├── app/                  # Next.js App Router (Calculators, Guides, APIs)
│   ├── battery/          # Battery storage planning routes
│   ├── solar/            # Solar PV calculation routes
│   ├── home-energy/      # Residential load and appliance routes
│   ├── ev/               # Electric vehicle energy and charging routes
│   ├── guides/           # Technical educational reference guides
│   └── api/              # Proxy endpoints (PVWatts V8, IndexNow)
├── components/           # Accessible, mobile-first design system
│   ├── calculator/       # Calculator shells, formula cards, assumption trays
│   ├── inputs/           # Accessible numeric and slider controls
│   └── seo/              # LaTeX drawers, JSON-LD schema, citations
├── data/                 # Deterministic static datasets (ASHRAE, NREL, appliances)
├── lib/
│   ├── calculators/      # PURE DETERMINISTIC ENGINES (Isolated from UI/DOM)
│   ├── energy-profile/   # LocalStorage cross-calculator state sync
│   ├── providers/        # External model adapters (NREL PVWatts)
│   └── seo/              # Structured data generators and canonical metadata
└── types/                # Shared domain schemas and calculation envelopes
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/miadsaadidi/powerlab.git
   cd powerlab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   # Or with Turbopack acceleration:
   npm run dev:all
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

4. **Run the test suite:**
   ```bash
   npm test
   ```

5. **Typecheck verification:**
   ```bash
   npm run typecheck
   ```

---

## 🔬 Peer Review & Academic Contribution

We welcome contributions from electrical engineers, researchers, solar installers, and educators. Whether auditing engine equations against published IEEE/IEC literature, providing real-world battery discharge curves, or introducing classroom lab modules:

- Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our branch lifecycle and PR review rules.
- Participate in ongoing modeling discussions on [GitHub Discussions](https://github.com/miadsaadidi/powerlab/discussions).
- Open an [Issue](https://github.com/miadsaadidi/powerlab/issues) if you discover an unhandled physical loss factor or edge-case discrepancy.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Calculators, formulas, and educational guides are maintained for open research and public benefit.
