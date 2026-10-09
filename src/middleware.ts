import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const requestUrl = request.nextUrl;

  // Allow IndexNow key verification file to be served directly on apex or www without redirect
  if (requestUrl.pathname.includes("c94b7e8d1a2f43b68019e34a75d28b12")) {
    return NextResponse.next();
  }

  const isApex = host === "powelab.org";
  const hasTrailingSlash = requestUrl.pathname !== "/" && requestUrl.pathname.endsWith("/");

  // Canonicalize host to www.powelab.org and remove trailing slashes in a single 308 redirect
  if (isApex || hasTrailingSlash) {
    const redirectUrl = new URL(request.url);
    if (isApex) {
      redirectUrl.host = "www.powelab.org";
      redirectUrl.protocol = "https:";
    }
    if (hasTrailingSlash) {
      redirectUrl.pathname = redirectUrl.pathname.replace(/\/+$/, "");
    }
    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, llms.txt, llms-full.txt
     * - public assets like icon.svg, sw.js, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|llms-full.txt|icon.svg|sw.js).*)",
  ],
};
