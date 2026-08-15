import type { Metadata } from "next";
import Link from "next/link";
import { UpsRuntimeCalculator } from "@/components/calculator/ups-runtime-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";

const published = isCalculatorPublished("ups-runtime");

export const metadata: Metadata = {
  title: "UPS Runtime Calculator — Estimate Backup Time",
  description: "Estimate UPS backup runtime from battery energy, load watts, usable energy, battery health and UPS efficiency.",
  alternates: { canonical: "/battery/ups-runtime-calculator" },
  robots: { index: published, follow: true },
  openGraph: { title: "UPS Runtime Calculator — Estimate Backup Time", description: "Estimate UPS backup runtime from battery energy, load watts, usable energy, battery health and UPS efficiency." },
};

export default function UpsRuntimePage() {
  const structuredData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() }, { "@type": "ListItem", position: 2, name: "Battery", item: new URL("/battery", siteConfig.url).toString() }, { "@type": "ListItem", position: 3, name: "UPS Runtime Calculator", item: new URL("/battery/ups-runtime-calculator", siteConfig.url).toString() }] };
  return <article className="page calculator-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/battery">Battery</Link><span aria-hidden="true">/</span><span>UPS Runtime Calculator</span></nav><p className="eyebrow">UPS planning</p><h1>UPS Runtime Calculator</h1><p className="intro">Estimate how long a UPS can support your equipment from battery energy, load watts, usable energy, battery health and UPS efficiency. Use the manufacturer&apos;s rated watt capacity when you know it.</p><UpsRuntimeCalculator /><section><h2>How to calculate UPS runtime</h2><p>The calculator estimates usable battery energy, accounts for UPS efficiency and divides that energy by the battery-side load. It is a vendor-neutral planning estimate, not a model-specific runtime curve.</p><p><code>runtime hours = usable battery Wh ÷ (load watts ÷ UPS efficiency)</code></p></section><section><h2>UPS VA versus watts</h2><p>VA describes apparent power, while watts describe real power. A rough relationship is <code>watts = VA × power factor</code>, but the manufacturer&apos;s rated watt limit should be preferred. VA multiplied by an assumed power factor is labeled as an estimate and never overrides rated watts.</p></section><section><h2>How battery age and usable energy affect runtime</h2><p>Usable fraction is an editable planning assumption for the share of nominal battery energy considered available. Battery health separately represents remaining capacity compared with a healthy battery. Lead-acid capacity can decrease at higher discharge rates, so manufacturer runtime curves are preferred for specific UPS models.</p></section><section><h2>Worked UPS runtime example</h2><p>A 216 Wh battery with a 50% planning usable fraction provides 108 Wh of usable energy. At 100 W load and 90% UPS efficiency, the battery-side load is about 111 W, giving an estimate of approximately 58 minutes.</p></section><section><h2>Limitations and methodology</h2><p>UPS manufacturers may use proprietary runtime curves. Battery age, temperature and discharge rate can change the actual result. Review the <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link> for the broader planning approach.</p></section></article>;
}
