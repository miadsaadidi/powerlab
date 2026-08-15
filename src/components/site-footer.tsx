import Link from "next/link";
import { getFooterNavigation } from "@/lib/navigation";

export function SiteFooter() {
  return <footer className="site-footer"><p>Practical energy estimates with transparent, editable assumptions.</p><nav aria-label="Footer navigation">{getFooterNavigation().map((item) => <Link href={item.href} key={item.href}>{item.label === "Battery" ? "Battery Calculators" : item.label === "Solar" ? "Solar Calculators" : item.label === "Home Energy" ? "Home Energy Calculators" : item.label}</Link>)}</nav></footer>;
}
