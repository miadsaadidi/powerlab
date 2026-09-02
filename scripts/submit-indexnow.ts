import { getSitemapPaths } from "../src/app/sitemap";
import { siteConfig } from "../src/lib/site-config";

const INDEXNOW_KEY = "c94b7e8d1a2f43b68019e34a75d28b12";

async function submitIndexNow() {
  const host = new URL(siteConfig.url).host;
  const paths = getSitemapPaths();
  const urlList = paths.map((p) => new URL(p, siteConfig.url).toString());

  console.log(`Submitting ${urlList.length} URLs to IndexNow for host: ${host}...`);

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://yandex.com/indexnow",
    "https://www.bing.com/indexnow"
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      console.log(`[${endpoint}] Status: ${res.status} ${res.statusText}`);
      if (res.ok || res.status === 200 || res.status === 202) {
        console.log(`Successfully submitted ${urlList.length} URLs via ${endpoint}!`);
      } else {
        const text = await res.text();
        console.warn(`[${endpoint}] Response: ${text}`);
      }
    } catch (err) {
      console.error(`[${endpoint}] Request failed:`, err);
    }
  }
}

submitIndexNow();
