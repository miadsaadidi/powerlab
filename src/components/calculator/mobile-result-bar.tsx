"use client";

interface MobileResultBarProps {
  label: string;
  value: string;
  targetId?: string;
  unit?: string;
  subtext?: string;
}

export function MobileResultBar({
  label,
  value,
  targetId = "calculator-result",
  unit,
  subtext,
}: MobileResultBarProps) {
  const handleJump = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="mobile-result-bar" role="complementary" aria-label="Mobile result quick view">
      <div className="mobile-result-content">
        <span className="mobile-result-label">{label}</span>
        <span className="mobile-result-value">
          <strong>{value}</strong> {unit && <small>{unit}</small>}
        </span>
        {subtext && <span className="mobile-result-subtext">{subtext}</span>}
      </div>
      <button
        type="button"
        className="mobile-result-jump-btn"
        onClick={handleJump}
        aria-label={`Jump to ${label} breakdown`}
      >
        Breakdown ↓
      </button>
    </div>
  );
}
