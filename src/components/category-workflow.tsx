import Link from "next/link";

interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  href: string;
  badge: string;
  icon: string;
}

interface CategoryWorkflowProps {
  categoryTitle: string;
  categoryDescription: string;
  steps: WorkflowStep[];
}

export function CategoryWorkflow({ categoryTitle, categoryDescription, steps }: CategoryWorkflowProps) {
  return (
    <section className="category-workflow-section" style={{ marginTop: "2.5rem", marginBottom: "3rem" }}>
      <div style={{ marginBottom: "1.25rem" }}>
        <p className="eyebrow">Interactive Planning Journey</p>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0.25rem 0 0.5rem" }}>
          Recommended {categoryTitle} Engineering Workflow
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "720px", margin: 0 }}>
          {categoryDescription}
        </p>
      </div>

      <div
        className="workflow-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          position: "relative",
        }}
      >
        {steps.map((item) => (
          <Link
            key={item.step}
            href={item.href}
            className="flow-node-card workflow-card"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1.35rem",
              borderRadius: "0.85rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: "4px solid #0284c7",
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {/* Top Row: Step Badge on left, Icon on right */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "9999px",
                  background: "#0284c7",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.step}
              </div>
              <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
            </div>

            {/* Title */}
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700 }}>
              {item.title}
            </h3>

            {/* Metric / Stage Badge */}
            <div
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#0284c7",
                background: "var(--bg-secondary, #f8fafc)",
                padding: "2px 8px",
                borderRadius: "4px",
                marginBottom: "0.6rem",
              }}
            >
              {item.badge}
            </div>

            {/* Description */}
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4, flexGrow: 1 }}>
              {item.description}
            </p>

            {/* Bottom Action Link */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: "#0284c7",
              }}
            >
              <span>Launch Step {item.step}</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
