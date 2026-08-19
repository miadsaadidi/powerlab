import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "PowerLab — Connected Energy Planning & Calculators";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090d16 0%, #0d1527 50%, #081a2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#f8fafc",
          padding: "48px",
          position: "relative",
        }}
      >
        {/* Subtle grid backdrop decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Glowing badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(2, 132, 199, 0.15)",
            border: "1px solid rgba(2, 132, 199, 0.4)",
            borderRadius: "9999px",
            padding: "8px 24px",
            marginBottom: "28px",
            fontSize: "20px",
            fontWeight: "600",
            color: "#38bdf8",
            letterSpacing: "0.05em",
          }}
        >
          <span>⚡</span>
          <span>POWERLAB ENERGY PLANNING</span>
        </div>

        {/* Main Headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "800",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "1000px",
            marginBottom: "20px",
            background: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Deterministic Energy Calculators
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "26px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "850px",
            marginBottom: "44px",
            lineHeight: 1.4,
          }}
        >
          Home Energy ↔ Battery Storage ↔ Solar PV ↔ Electric Vehicles
        </div>

        {/* 4 Pillars Pills */}
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          {[
            { label: "☀️ Solar PV", border: "rgba(245, 158, 11, 0.4)", bg: "rgba(245, 158, 11, 0.1)" },
            { label: "🔋 Battery Storage", border: "rgba(16, 185, 129, 0.4)", bg: "rgba(16, 185, 129, 0.1)" },
            { label: "⚡ Home Energy", border: "rgba(14, 165, 233, 0.4)", bg: "rgba(14, 165, 233, 0.1)" },
            { label: "🚗 EV Charging", border: "rgba(168, 85, 247, 0.4)", bg: "rgba(168, 85, 247, 0.1)" },
          ].map((pillar) => (
            <div
              key={pillar.label}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 20px",
                background: pillar.bg,
                border: `1px solid ${pillar.border}`,
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "600",
                color: "#e2e8f0",
              }}
            >
              {pillar.label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
