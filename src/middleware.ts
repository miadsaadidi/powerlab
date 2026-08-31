import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // Canonicalize host to www.powelab.org in production
  // If request arrives at apex powelab.org, issue a permanent 308 redirect to www.powelab.org
  if (host === "powelab.org") {
    url.host = "www.powelab.org";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  // Remove trailing slashes (except root "/") for uniform canonical indexing
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public assets like icon.svg, sw.js, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.svg|sw.js).*)",
  ],
};
