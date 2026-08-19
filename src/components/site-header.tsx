"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getPrimaryNavigation } from "@/lib/navigation";
import { EnergyLogo } from "@/components/energy-logo";
import { EnergyProfileDrawer } from "@/components/energy-profile-drawer";
import { CommandPalette } from "@/components/navigation/command-palette";
import { UnitConverterModal } from "@/components/unit-converter-modal";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_DETAILS: Record<string, { icon: string; subtitle: string; color: string }> = {
  "/": { icon: "🏠", subtitle: "All 30 Energy Calculators", color: "#c65d24" },
  "/solar": { icon: "☀️", subtitle: "Tilt, Output, Sizing, Payback & MPPT", color: "#f59e0b" },
  "/battery": { icon: "🔋", subtitle: "Runtime, Sizing, Voltage Drop & Inverters", color: "#10b981" },
  "/home-energy": { icon: "⚡", subtitle: "Usage, Bills, Generators & Heat Pumps", color: "#0284c7" },
  "/ev": { icon: "🚗", subtitle: "Charging Time, V2L Backup & Breaker Sizing", color: "#8b5cf6" },
};

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getPrimaryNavigation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        {/* Brand Logo & Name */}
        <Link className="brand" href="/" aria-label={`${siteConfig.name} Home`}>
          <EnergyLogo />
          <span className="brand-name">{siteConfig.name}</span>
        </Link>

        {/* Right Action Cluster & Menu Toggle Button */}
        <div className="site-header-right">
          <CommandPalette />
          <UnitConverterModal />
          <ThemeToggle />
          <EnergyProfileDrawer />

          {/* Right Icon Menu Toggle Button */}
          <button
            type="button"
            className={`header-menu-btn ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="site-navigation-drawer"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
            <span className="header-menu-label">Menu</span>
          </button>
        </div>
      </header>

      {/* Toggleable Navigation Menu Overlay & Drawer */}
      {menuOpen && (
        <div
          className="menu-drawer-backdrop"
          onClick={() => setMenuOpen(false)}
        >
          <div
            id="site-navigation-drawer"
            className="menu-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation"
          >
            <div className="menu-drawer-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0, flex: 1 }}>
                <EnergyLogo />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <strong
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                      display: "block",
                      lineHeight: 1.2,
                    }}
                  >
                    {siteConfig.name}
                  </strong>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      whiteSpace: "nowrap",
                      display: "block",
                    }}
                  >
                    Deterministic Energy Planning
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="menu-drawer-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            </div>


            {/* Navigation Categories */}
            <div className="menu-drawer-section">
              <span className="menu-drawer-label">Planning Categories</span>
              <div className="menu-drawer-links">
                {navItems.map((item) => {
                  const details = NAV_DETAILS[item.href] ?? { icon: "⚡", subtitle: "Energy Tool", color: "#c65d24" };
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`menu-nav-card ${isActive ? "active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        borderLeft: `4px solid ${details.color}`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        <span style={{ fontSize: "1.5rem" }}>{details.icon}</span>
                        <div>
                          <strong style={{ fontSize: "0.95rem", display: "block", color: "var(--ink)" }}>{item.label}</strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{details.subtitle}</span>
                        </div>
                      </div>
                      <span className="menu-nav-arrow" aria-hidden="true">→</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Supporting & Transparency Links */}
            <div className="menu-drawer-footer">
              <span className="menu-drawer-label">Documentation &amp; Standards</span>
              <div className="menu-footer-links">
                <Link href="/methodology" onClick={() => setMenuOpen(false)}>📐 Methodology</Link>
                <Link href="/sources" onClick={() => setMenuOpen(false)}>📚 Data Sources</Link>
                <Link href="/privacy" onClick={() => setMenuOpen(false)}>🛡️ Privacy Policy</Link>
                <Link href="/terms" onClick={() => setMenuOpen(false)}>📜 Terms of Use</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
