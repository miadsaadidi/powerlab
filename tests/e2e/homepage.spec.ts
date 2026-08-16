import { expect, test } from "@playwright/test";

test("groups published calculators by category in a compact desktop grid", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 2, name: "Battery" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Solar" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Home Energy" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "EV" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Battery" }).getByRole("link")).toHaveAttribute("href", "/battery");
  await expect(page.getByRole("heading", { level: 2, name: "Solar" }).getByRole("link")).toHaveAttribute("href", "/solar");
  await expect(page.getByRole("heading", { level: 2, name: "Battery" }).getByRole("link")).toHaveCSS("font-weight", "600");
  expect(await page.locator(".available-tool-category h2").evaluateAll((headings) => headings.map((heading) => heading.textContent))).toEqual(["Battery", "Solar", "Home Energy", "EV"]);
  await expect.poll(async () => page.locator(".home-tool-cards").first().evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length)).toBe(5);
});

test("keeps the top navigation usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation).toBeVisible();
  expect(await navigation.evaluate((element) => element.getBoundingClientRect().width)).toBeLessThanOrEqual(390);
  expect(await page.locator("body").evaluate((element) => element.scrollWidth)).toBeLessThanOrEqual(390);
});
