import { describe, expect, it } from "vitest";
import { GET as keyHandler } from "../../c94b7e8d1a2f43b68019e34a75d28b12.txt/route";
import { getSitemapPaths } from "../../../app/sitemap";

describe("IndexNow verification and sitemap coverage", () => {
  it("serves the exact IndexNow key with correct text headers", async () => {
    const response = await keyHandler();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/plain");
    const text = await response.text();
    expect(text).toBe("c94b7e8d1a2f43b68019e34a75d28b12");
  });

  it("ensures sitemap paths contains all 49 canonical URLs including utility and guides", () => {
    const paths = getSitemapPaths();
    expect(paths).toContain("/");
    expect(paths).toContain("/terms");
    expect(paths).toContain("/about");
    expect(paths).toContain("/privacy");
    expect(paths).toContain("/guides");
    expect(paths).toContain("/developers");
    expect(paths).toContain("/methodology");
    expect(paths).toContain("/sources");
    expect(paths.length).toBe(49);
  });
});
