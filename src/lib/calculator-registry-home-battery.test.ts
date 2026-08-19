import { describe, expect, it } from "vitest";
import { calculatorRegistry, isCalculatorPublished } from "./calculator-registry";

describe("Home Battery Size publication gate", () => {
  it("is published after explicit approval", () => {
    const calculator = calculatorRegistry.find((item) => item.id === "home-battery-size");
    expect(calculator?.category).toBe("home-energy");
    expect(calculator?.route).toBe("/home-energy/home-battery-size-calculator");
    expect(calculator?.status).toBe("published");
    expect(isCalculatorPublished("home-battery-size")).toBe(true);
  });
});
