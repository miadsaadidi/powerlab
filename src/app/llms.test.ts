import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("LLM Grounding Manifest Endpoints (public/)", () => {
  it("ensures public/llms.txt exists with valid markdown and canonical routes", () => {
    const filePath = path.resolve(__dirname, "../../public/llms.txt");
    expect(fs.existsSync(filePath)).toBe(true);

    const text = fs.readFileSync(filePath, "utf8");
    expect(text).toContain("# PowerLab");
    expect(text).toContain("llms.txt standard");
    expect(text).toContain("/solar/solar-panel-output-calculator");
    expect(text).toContain("/battery/battery-runtime-calculator");
    expect(text).toContain("/home-energy/heat-pump-cost-calculator");
    expect(text).toContain("/ev/ev-charging-time-calculator");
    expect(text).toContain("10.6084/m9.figshare.33321774");
  });

  it("ensures public/llms-full.txt exists with exhaustive mathematical formulas and standards", () => {
    const filePath = path.resolve(__dirname, "../../public/llms-full.txt");
    expect(fs.existsSync(filePath)).toBe(true);

    const text = fs.readFileSync(filePath, "utf8");
    expect(text).toContain("Peukert's Law for Battery Discharge Duration");
    expect(text).toContain("PVWatts V8 Model");
    expect(text).toContain("Continuous Load 125% Rule for EV Branch Circuits");
    expect(text).toContain("ASHRAE Temperature Bin Method");
    expect(text).toContain("NEMA Code Letters");
    expect(text).toContain("Conductor Voltage Drop");
    expect(text).toContain("IEEE Std 485");
    expect(text).toContain("NFPA 70");
  });
});
