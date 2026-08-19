import { describe, expect, it } from "vitest";
import { calculatorRegistry, isCalculatorPublished } from "./calculator-registry";

describe("Appliance Wattage Calculator publication gate", () => {
  it("publishes the completed calculator through the registry", () => {
    const calculator = calculatorRegistry.find((item) => item.id === "appliance-wattage");
    expect(calculator?.route).toBe("/home-energy/appliance-wattage-calculator");
    expect(calculator?.category).toBe("home-energy");
    expect(calculator?.status).toBe("published");
    expect(isCalculatorPublished("appliance-wattage")).toBe(true);
  });
});
