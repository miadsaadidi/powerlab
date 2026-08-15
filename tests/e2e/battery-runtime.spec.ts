import { expect, test } from "@playwright/test";

test("calculates runtime with keyboard-accessible inputs", async ({ page }) => {
  await page.goto("/battery/battery-runtime-calculator");

  await expect(page.getByRole("heading", { level: 1, name: "Battery Runtime Calculator" })).toBeVisible();
  await page.locator("#battery-capacity").fill("1000");
  await page.locator("#total-load").fill("100");
  await page.getByRole("button", { name: "Calculate Runtime" }).press("Enter");

  await expect(page.getByRole("paragraph").filter({ hasText: "7 h 12 min" }).first()).toBeVisible();
  await expect(page.getByText("Assumptions used")).toBeVisible();
  await page.getByRole("button", { name: "Show advanced assumptions" }).press("Enter");
  await expect(page.getByLabel("Minimum remaining charge (%)")).toBeVisible();
});

test("shows the battery capacity result immediately and isolates mode drafts", async ({ page }) => {
  await page.goto("/battery/battery-capacity-calculator");

  await expect(page.getByRole("heading", { level: 1, name: "Battery Capacity Calculator" })).toBeVisible();
  await expect(page.getByText("1.20 kWh").first()).toBeVisible();
  await expect(page.getByText("960 Wh").first()).toBeVisible();

  await page.getByRole("radio", { name: "I know Wh / kWh" }).check();
  await page.locator("#capacity-energy").fill("2400");
  await page.locator("#capacity-energy-voltage").selectOption("24");
  await expect(page.getByText("100 Ah").first()).toBeVisible();

  await page.getByRole("radio", { name: "I know Ah / mAh" }).check();
  await expect(page.locator("#capacity-charge")).toHaveValue("100");
  await page.getByRole("radio", { name: "I know Wh / kWh" }).check();
  await expect(page.locator("#capacity-energy")).toHaveValue("2400");
});
