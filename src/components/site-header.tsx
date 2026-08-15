import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getPrimaryNavigation } from "@/lib/navigation";

export function SiteHeader() {
  return <header className="site-header"><Link className="brand" href="/">{siteConfig.name}</Link><nav aria-label="Primary navigation">{getPrimaryNavigation().map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav></header>;
}
