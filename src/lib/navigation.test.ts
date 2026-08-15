import { describe, expect, it } from "vitest";
import { getPrimaryNavigation, getPublishedCategories, getPublishedCalculatorsForCategory } from "./navigation";
import type { CalculatorRegistryItem } from "./calculator-registry";

describe("publication-aware navigation", () => {
  it("exposes every category with a published calculator", () => {
    expect(getPrimaryNavigation().map((item) => item.label)).toEqual(["Home", "Battery", "Solar", "Home Energy", "EV", "Methodology", "Sources"]);
    expect(getPublishedCategories()).toEqual(["battery", "solar", "home-energy", "ev"]);
    expect(getPublishedCalculatorsForCategory("battery").map((calculator) => calculator.id)).toEqual(["battery-runtime", "battery-size", "ups-runtime", "battery-capacity"]);
    expect(getPublishedCalculatorsForCategory("solar").map((calculator) => calculator.id)).toEqual(["solar-panel-tilt", "solar-panel-output"]);
    expect(getPublishedCalculatorsForCategory("home-energy").map((calculator) => calculator.id)).toEqual(["electricity-usage"]);
  });

  it("activates EV surfaces when its registry status becomes published", () => {
    const fixture: CalculatorRegistryItem[] = [
      { id: "battery-runtime", name: "Battery Runtime Calculator", category: "battery", route: "/battery/battery-runtime-calculator", phase: 1, status: "published", primaryKeyword: "", seoTitle: "", metaDescription: "", relatedCalculatorIds: [] },
      { id: "ev-charging-time", name: "EV Charging Time Calculator", category: "ev", route: "/ev/ev-charging-time-calculator", phase: 1, status: "published", primaryKeyword: "", seoTitle: "", metaDescription: "", relatedCalculatorIds: [] },
    ];
    expect(getPublishedCategories(fixture)).toEqual(["battery", "ev"]);
    expect(getPublishedCalculatorsForCategory("ev", fixture).map((calculator) => calculator.route)).toEqual(["/ev/ev-charging-time-calculator"]);
  });
});
