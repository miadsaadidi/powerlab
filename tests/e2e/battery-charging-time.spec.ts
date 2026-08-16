import { expect, test } from "@playwright/test";

test("calculates with selected and effective charger rates", async ({ page }) => {
  await page.goto("/battery/battery-charging-time-calculator");

  await expect(page.getByRole("heading", { level: 1, name: "Battery Charging Time Calculator" })).toBeVisible();
  await expect(page.getByText("Complete the inputs and calculate to see an estimate.")).toBeVisible();
  await page.getByRole("button", { name: "Calculate Charging Time" }).click();
  await expect(page.getByText("4 h 15 min", { exact: true }).first()).toBeVisible();
  await expect(page.locator(".result-breakdown").getByText("Selected charger output", { exact: true }).locator(".." )).toContainText("20 A");
  await expect(page.locator(".result-breakdown").getByText("Effective charging rate", { exact: true }).locator(".." )).toContainText("20 A");
  await expect(page.getByText("Battery maximum charge rate is unknown")).toBeVisible();

  await page.getByRole("button", { name: "Show advanced assumptions" }).click();
  await page.getByLabel("Battery maximum charge current (A, optional)").fill("10");
  await page.getByRole("button", { name: "Recalculate" }).click();
  await expect(page.locator(".result-breakdown").getByText("Selected charger output", { exact: true }).locator(".." )).toContainText("20 A");
  await expect(page.locator(".result-breakdown").getByText("Effective charging rate", { exact: true }).locator(".." )).toContainText("10 A");
  await expect(page.getByText("Battery charge limit", { exact: true })).toBeVisible();
});

test("keeps mode drafts isolated and marks mode changes stale", async ({ page }) => {
  await page.goto("/battery/battery-charging-time-calculator");
  await page.getByLabel("Ah + charger amps").check();
  await page.locator("#charging-capacity-ah").fill("100");
  await page.locator("#charging-current").fill("20");
  await page.getByRole("button", { name: "Calculate Charging Time" }).click();

  await page.getByLabel("Wh/kWh + charger watts").check();
  await expect(page.getByText("Inputs changed")).toBeVisible();
  await page.locator("#charging-capacity-energy").fill("1200");
  await page.locator("#charging-power").fill("300");
  await page.getByRole("button", { name: "Recalculate" }).click();
  await expect(page.getByText("3 h 24 min", { exact: true }).first()).toBeVisible();

  await page.getByLabel("Ah + charger amps").check();
  await expect(page.locator("#charging-capacity-ah")).toHaveValue("100");
  await expect(page.locator("#charging-current")).toHaveValue("20");
});
