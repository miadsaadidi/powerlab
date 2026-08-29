import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { getSitemapPaths } from "@/app/sitemap";

const INDEXNOW_KEY = "c94b7e8d1a2f43b68019e34a75d28b12";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const host = new URL(siteConfig.url).host;

    let urlList: string[] = body.urlList;
    if (!urlList || !Array.isArray(urlList) || urlList.length === 0) {
      urlList = getSitemapPaths().map((p) => new URL(p, siteConfig.url).toString());
    }

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: response.ok || response.status === 200 || response.status === 202,
      status: response.status,
      submittedUrls: urlList.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "IndexNow submission failed" },
      { status: 500 }
    );
  }
}
