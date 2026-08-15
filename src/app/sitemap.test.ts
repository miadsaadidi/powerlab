import { describe, expect, it } from "vitest";
import { getSitemapPaths } from "./sitemap";

describe("publication-aware sitemap", () => {
  it("includes only published category and calculator routes", () => {
    const paths = getSitemapPaths();
    expect(paths).toContain("/");
    expect(paths).toContain("/battery");
    expect(paths).toContain("/battery/battery-runtime-calculator");
    expect(paths).toContain("/battery/battery-size-calculator");
    expect(paths).toContain("/solar");
    expect(paths).toContain("/solar/solar-panel-tilt-calculator");
    expect(paths).toContain("/home-energy");
    expect(paths).toContain("/home-energy/electricity-usage-calculator");
    expect(paths).toContain("/ev");
    expect(paths).toContain("/ev/ev-charging-time-calculator");
    expect(paths).toContain("/solar/solar-panel-output-calculator");
    expect(paths).toContain("/battery/ups-runtime-calculator");
    expect(paths).not.toContain("/battery/battery-capacity-calculator");
  });
});
