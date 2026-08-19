"use client";

interface SolarMonthlyYieldProps {
  monthlyKwh: number[]; // 12 numbers for Jan - Dec
  annualKwh?: number;
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function SolarMonthlyYieldChart({ monthlyKwh, annualKwh }: SolarMonthlyYieldProps) {
  if (!monthlyKwh || monthlyKwh.length !== 12) return null;

  const maxVal = Math.max(...monthlyKwh, 100);
  const total = annualKwh || monthlyKwh.reduce((a, b) => a + b, 0);
  const avgMonthly = total / 12;

  // SVG dimensions
  const svgWidth = 560;
  const svgHeight = 190;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 25;
  const padBottom = 30;
  const graphWidth = svgWidth - padLeft - padRight;
  const graphHeight = svgHeight - padTop - padBottom;
  const barWidth = graphWidth / 12 - 8;

  return (
    <div
      className="chart-container"
      style={{
        margin: "1.25rem 0",
        padding: "1rem",
        borderRadius: "0.75rem",
        background: "var(--bg-secondary, #f8fafc)",
        border: "1px solid var(--border-color, #e2e8f0)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <strong style={{ fontSize: "0.9rem", color: "var(--brand-strong)" }}>
          ☀️ Modeled Monthly Solar Generation (PVWatts V8)
        </strong>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
          Annual Total: {Math.round(total).toLocaleString()} kWh/yr
        </span>
      </div>

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
        role="img"
        aria-label="Monthly Solar Production Bar Chart"
      >
        {/* Average Line */}
        {(() => {
          const y = padTop + graphHeight - (avgMonthly / maxVal) * graphHeight;
          return (
            <g>
              <line
                x1={padLeft}
                y1={y}
                x2={padLeft + graphWidth}
                y2={y}
                stroke="#f59e0b"
                strokeDasharray="4 3"
                strokeWidth="1.5"
              />
              <text
                x={padLeft + 4}
                y={y - 4}
                fontSize="8.5"
                fill="#f59e0b"
                fontWeight="700"
              >
                Avg: {Math.round(avgMonthly)} kWh/mo
              </text>
            </g>
          );
        })()}

        {/* 12 Monthly Bars */}
        {monthlyKwh.map((kwh, index) => {
          const x = padLeft + index * (graphWidth / 12) + 4;
          const barH = (kwh / maxVal) * graphHeight;
          const y = padTop + graphHeight - barH;
          const isSummerPeak = kwh === maxVal;

          return (
            <g key={index}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx="3"
                fill={isSummerPeak ? "#f59e0b" : "#fbbf24"}
                opacity={isSummerPeak ? "1" : "0.85"}
              />
              {/* Value on top of bar */}
              <text
                x={x + barWidth / 2}
                y={y - 4}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="700"
                fill="var(--ink, #0f172a)"
              >
                {Math.round(kwh)}
              </text>
              {/* Month Label below */}
              <text
                x={x + barWidth / 2}
                y={padTop + graphHeight + 15}
                textAnchor="middle"
                fontSize="9.5"
                fill="var(--text-muted, #64748b)"
                fontWeight={isSummerPeak ? "700" : "500"}
              >
                {MONTH_LABELS[index]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
