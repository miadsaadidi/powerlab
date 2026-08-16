import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getPrimaryNavigation } from "@/lib/navigation";
import { EnergyLogo } from "@/components/energy-logo";

export function SiteHeader() {
  return <header className="site-header"><Link className="brand" href="/"><EnergyLogo /><span>{siteConfig.name}</span></Link><nav aria-label="Primary navigation">{getPrimaryNavigation().map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav></header>;
}
