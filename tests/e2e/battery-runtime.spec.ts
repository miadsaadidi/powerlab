import { expect, test } from "@playwright/test";

test("calculates runtime with keyboard-accessible inputs", async ({ page }) => {
  await page.goto("/battery/battery-runtime-calculator");

  await expect(page.getByRole("heading", { level: 1, name: "Battery Runtime Calculator" })).toBeVisible();
  await page.getByLabel("Battery capacity (Wh)").fill("1000");
  await page.getByLabel("Average load (W)").fill("100");
  await page.getByRole("button", { name: "Calculate runtime" }).press("Enter");

  await expect(page.getByText("6 h 24 min")).toBeVisible();
  await expect(page.getByText("Assumptions used")).toBeVisible();
  await page.getByRole("button", { name: "Show advanced assumptions" }).press("Enter");
  await expect(page.getByLabel("Minimum reserve (%)")).toBeVisible();
});
