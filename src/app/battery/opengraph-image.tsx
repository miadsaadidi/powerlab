import { ImageResponse } from "next/og";

export const alt = "PowerLab — Battery & Storage Calculators (Runtime, Sizing, Capacity, UPS & Charging)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #091410 0%, #0d201a 50%, #051d14 100%)",
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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.08) 2%, transparent 0%)",
            backgroundSize: "40px 40px",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.45)",
            borderRadius: "9999px",
            padding: "8px 24px",
            marginBottom: "24px",
            fontSize: "20px",
            fontWeight: "700",
            color: "#34d399",
            letterSpacing: "0.06em",
          }}
        >
          <span>🔋</span>
          <span>POWERLAB BATTERY STORAGE</span>
        </div>

        <div
          style={{
            fontSize: "60px",
            fontWeight: "800",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "1000px",
            marginBottom: "18px",
            background: "linear-gradient(180deg, #ffffff 0%, #a7f3d0 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Battery Runtime &amp; Sizing Calculators
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#d1d5db",
            textAlign: "center",
            maxWidth: "880px",
            marginBottom: "40px",
            lineHeight: 1.4,
          }}
        >
          Backup Time ↔ Ah to Wh ↔ UPS Runtime ↔ Charge Time ↔ Whole-Home Sizing
        </div>

        <div
          style={{
            display: "flex",
            gap: "14px",
          }}
        >
          {[
            "⏱️ Runtime under Load",
            "🔋 Ah ↔ Wh Conversion",
            "⚡ Inverter Loss Loss Models",
            "🖥️ UPS & Server Sizing",
          ].map((feature) => (
            <div
              key={feature}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 18px",
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.35)",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#d1fae5",
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
