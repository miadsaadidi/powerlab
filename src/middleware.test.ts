import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";

describe("Middleware Canonical Host and Path Redirection", () => {
  it("redirects apex powelab.org to www.powelab.org with 308", () => {
    const req = new NextRequest("http://powelab.org/calculators", {
      headers: { host: "powelab.org" },
    });
    const res = middleware(req);
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://www.powelab.org/calculators");
  });

  it("removes trailing slash with 308 redirect", () => {
    const req = new NextRequest("https://www.powelab.org/calculators/", {
      headers: { host: "www.powelab.org" },
    });
    const res = middleware(req);
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://www.powelab.org/calculators");
  });

  it("handles apex AND trailing slash in a single 308 hop without redirect chain", () => {
    const req = new NextRequest("http://powelab.org/guides/", {
      headers: { host: "powelab.org" },
    });
    const res = middleware(req);
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://www.powelab.org/guides");
  });

  it("preserves query parameters during redirect", () => {
    const req = new NextRequest("http://powelab.org/calculators/?ref=test&param=123", {
      headers: { host: "powelab.org" },
    });
    const res = middleware(req);
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://www.powelab.org/calculators?ref=test&param=123");
  });

  it("allows root / on preferred hostname to pass through without redirect", () => {
    const req = new NextRequest("https://www.powelab.org/", {
      headers: { host: "www.powelab.org" },
    });
    const res = middleware(req);
    expect(res.headers.get("location")).toBeNull();
  });

  it("allows canonical canonical paths on preferred hostname to pass through", () => {
    const req = new NextRequest("https://www.powelab.org/battery/battery-runtime-calculator", {
      headers: { host: "www.powelab.org" },
    });
    const res = middleware(req);
    expect(res.headers.get("location")).toBeNull();
  });

  it("bypasses redirects for IndexNow verification file", () => {
    const req = new NextRequest("http://powelab.org/c94b7e8d1a2f43b68019e34a75d28b12.txt", {
      headers: { host: "powelab.org" },
    });
    const res = middleware(req);
    expect(res.headers.get("location")).toBeNull();
  });
});
