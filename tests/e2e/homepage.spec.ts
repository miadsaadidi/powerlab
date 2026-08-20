import { expect, test } from "@playwright/test";

test("exposes published calculators through category filters", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 2, name: /All 30 Energy Planning Calculators/ })).toBeVisible();
  for (const category of ["Battery", "Solar PV", "Home Energy", "EV"]) {
    await expect(page.getByRole("tab", { name: new RegExp(category) })).toBeVisible();
  }
  await expect(page.locator(".home-calc-card")).toHaveCount(30);
});

test("keeps the top navigation usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const navigation = page.getByRole("dialog", { name: "Site Navigation" });
  await expect(navigation).toBeVisible();
  expect(await navigation.evaluate((element) => element.getBoundingClientRect().width)).toBeLessThanOrEqual(390);
  expect(await page.locator("body").evaluate((element) => element.scrollWidth)).toBeLessThanOrEqual(390);
});
