"use client";

export interface WaterfallStep {
  label: string;
  value: number;
  unit: string;
  subtext?: string;
  isLoss?: boolean;
  isFinal?: boolean;
}

interface LossWaterfallProps {
  title?: string;
  steps: WaterfallStep[];
  ariaLabel?: string;
}

export function LossWaterfall({
  title = "Energy Loss Waterfall",
  steps,
  ariaLabel = "Step-down energy conversion flow",
}: LossWaterfallProps) {
  if (steps.length === 0) return null;

  const maxValue = Math.max(...steps.map((s) => s.value), 1);

  return (
    <div className="loss-waterfall" role="region" aria-label={ariaLabel}>
      {title && <h4 className="loss-waterfall-title">{title}</h4>}
      <div className="loss-waterfall-steps">
        {steps.map((step, index) => {
          const widthPercent = Math.max(8, Math.min(100, (step.value / maxValue) * 100));
          return (
            <div
              key={`${step.label}-${index}`}
              className={`loss-step ${step.isFinal ? "is-final" : ""} ${step.isLoss ? "is-loss" : ""}`}
            >
              <div className="loss-step-header">
                <span className="loss-step-label">{step.label}</span>
                <span className="loss-step-val">
                  <strong>{Math.round(step.value).toLocaleString()}</strong> {step.unit}
                </span>
              </div>
              <div className="loss-step-bar-track" aria-hidden="true">
                <div
                  className="loss-step-bar-fill"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              {step.subtext && <span className="loss-step-sub">{step.subtext}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
