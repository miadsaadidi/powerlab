export type CalculatorStatus = "planned" | "building" | "published";

export interface CalculatorRegistryItem {
  id: string;
  name: string;
  category: "solar" | "battery" | "home-energy" | "ev";
  route: string;
  phase: 1 | 2 | 3 | 4;
  status: CalculatorStatus;
  primaryKeyword: string;
  seoTitle: string;
  metaDescription: string;
  relatedCalculatorIds: string[];
}

export const calculatorRegistry: CalculatorRegistryItem[] = [
  {
    id: "ev-charging-time",
    name: "EV Charging Time Calculator",
    category: "ev",
    route: "/ev/ev-charging-time-calculator",
    phase: 1,
    status: "published",
    primaryKeyword: "ev charging time calculator",
    seoTitle: "EV Charging Time Calculator — AC & DC Charge Time",
    metaDescription: "Estimate EV charging time from battery capacity, start and target charge, charger power and vehicle limits with clear AC and DC assumptions.",
    relatedCalculatorIds: [],
  },
  {
    id: "electricity-usage",
    name: "Electricity Usage Calculator",
    category: "home-energy",
    route: "/home-energy/electricity-usage-calculator",
    phase: 1,
    status: "published",
    primaryKeyword: "electricity usage calculator",
    seoTitle: "Electricity Usage Calculator — kWh by Appliance & Home",
    metaDescription: "Estimate daily, monthly and annual electricity use from appliance watts, schedules, cycles or energy-label values with editable assumptions.",
    relatedCalculatorIds: [],
  },
  {
    id: "solar-panel-tilt",
    name: "Solar Panel Tilt Calculator",
    category: "solar",
    route: "/solar/solar-panel-tilt-calculator",
    phase: 1,
    status: "published",
    primaryKeyword: "solar panel tilt calculator",
    seoTitle: "Solar Panel Tilt Calculator — Find the Best Angle",
    metaDescription: "Calculate a solar panel tilt starting point from your location, then compare roof angles with modeled annual and monthly solar production.",
    relatedCalculatorIds: [],
  },
  {
    id: "solar-panel-output",
    name: "Solar Panel Output Calculator",
    category: "solar",
    route: "/solar/solar-panel-output-calculator",
    phase: 2,
    status: "published",
    primaryKeyword: "solar panel output calculator",
    seoTitle: "Solar Panel Output Calculator — Estimate kWh Production",
    metaDescription: "Estimate monthly and annual solar panel output from system size, location, tilt, azimuth and losses using a location-aware PVWatts model.",
    relatedCalculatorIds: ["solar-panel-tilt"],
  },
  {
    id: "battery-runtime",
    name: "Battery Runtime Calculator",
    category: "battery",
    route: "/battery/battery-runtime-calculator",
    phase: 1,
    status: "published",
    primaryKeyword: "battery runtime calculator",
    seoTitle: "Battery Runtime Calculator — Estimate Backup Time",
    metaDescription: "Estimate battery runtime from Wh or Ah, voltage, load, state of charge, reserve and inverter efficiency. See usable energy, assumptions and runtime scenarios.",
    relatedCalculatorIds: ["battery-size"],
  },
  {
    id: "battery-size",
    name: "Battery Size Calculator",
    category: "battery",
    route: "/battery/battery-size-calculator",
    phase: 1,
    status: "published",
    primaryKeyword: "battery size calculator",
    seoTitle: "Battery Size Calculator — kWh & Ah for Backup Power",
    metaDescription: "Calculate battery capacity for a load and backup time.",
    relatedCalculatorIds: ["battery-runtime"],
  },
  {
    id: "ups-runtime",
    name: "UPS Runtime Calculator",
    category: "battery",
    route: "/battery/ups-runtime-calculator",
    phase: 2,
    status: "published",
    primaryKeyword: "ups runtime calculator",
    seoTitle: "UPS Runtime Calculator — Estimate Backup Time",
    metaDescription: "Estimate UPS backup runtime from battery energy, load watts, usable energy, battery health and UPS efficiency.",
    relatedCalculatorIds: [],
  },
  {
    id: "battery-capacity",
    name: "Battery Capacity Calculator",
    category: "battery",
    route: "/battery/battery-capacity-calculator",
    phase: 2,
    status: "published",
    primaryKeyword: "battery capacity calculator",
    seoTitle: "Battery Capacity Calculator — Convert Ah, Wh & kWh",
    metaDescription: "Convert battery capacity between amp-hours, watt-hours and kWh using voltage, and estimate usable energy from state of charge, reserve and battery health.",
    relatedCalculatorIds: ["battery-runtime"],
  },
];

export const publishedCalculators = () =>
  calculatorRegistry.filter((calculator) => calculator.status === "published");

export const isCalculatorPublished = (id: string) =>
  calculatorRegistry.some((calculator) => calculator.id === id && calculator.status === "published");
