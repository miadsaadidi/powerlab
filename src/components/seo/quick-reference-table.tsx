"use client";

import { useState } from "react";

export interface QuickReferenceColumn {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  isPrimary?: boolean;
}

export interface QuickReferenceRow {
  [key: string]: string | number | boolean | undefined;
  isHighlighted?: boolean;
  badge?: string;
}

export interface QuickReferenceTableProps {
  title: string;
  subtitle?: string;
  columns: QuickReferenceColumn[];
  rows: QuickReferenceRow[];
  footerNote?: string;
  standardReference?: string;
  className?: string;
}

export function QuickReferenceTable({
  title,
  subtitle,
  columns,
  rows,
  footerNote,
  standardReference = "Verified Engineering Standards (IEEE / NEC / NREL / ASHRAE)",
  className = "",
}: QuickReferenceTableProps) {
  const [copied, setCopied] = useState(false);

  const copyAsMarkdown = () => {
    const headers = `| ${columns.map((c) => c.header).join(" | ")} |`;
    const dividers = `| ${columns.map((c) => (c.align === "right" ? "---:" : c.align === "center" ? ":---:" : ":---")).join(" | ")} |`;
    const dataRows = rows.map(
      (r) => `| ${columns.map((c) => String(r[c.key] ?? "-")).join(" | ")} |`
    );
    const markdown = `${title}\n\n${headers}\n${dividers}\n${dataRows.join("\n")}\n\n*Reference: ${standardReference}*`;

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className={`quick-reference-table-card ${className}`.trim()}
      aria-label={title}
      style={{
        margin: "2rem 0",
        borderRadius: "0.75rem",
        border: "1px solid var(--line, #e2e8f0)",
        background: "var(--surface-card, #ffffff)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
        overflow: "hidden",
      }}
    >
      {/* Table Header Card */}
      <div
        style={{
          padding: "1rem 1.25rem",
          background: "var(--surface, #f8fafc)",
          borderBottom: "1px solid var(--line, #e2e8f0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--text-main, #0f172a)",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            📊 {title}
          </h3>
          {subtitle && (
            <p
              style={{
                margin: "0.25rem 0 0 0",
                fontSize: "0.82rem",
                color: "var(--text-muted, #64748b)",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={copyAsMarkdown}
          aria-label="Copy table data as Markdown"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.3rem 0.65rem",
            borderRadius: "0.375rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--text-main, #0f172a)",
            background: "var(--surface-card, #ffffff)",
            border: "1px solid var(--line, #cbd5e1)",
            cursor: "pointer",
            transition: "all 150ms ease",
          }}
        >
          {copied ? (
            <>
              <span style={{ color: "#16a34a" }}>✓</span> Copied Table!
            </>
          ) : (
            <>
              <span>📋</span> Copy Table (Markdown)
            </>
          )}
        </button>
      </div>

      {/* Responsive Table Body */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.86rem",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                background: "var(--surface-header, #0f172a)",
                color: "#ffffff",
                borderBottom: "1px solid #334155",
              }}
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    padding: "0.7rem 0.9rem",
                    fontWeight: 700,
                    textAlign: col.align || "left",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  background: row.isHighlighted
                    ? "rgba(2, 132, 199, 0.08)"
                    : idx % 2 === 0
                    ? "var(--surface-card, #ffffff)"
                    : "var(--surface, #f8fafc)",
                  borderBottom: "1px solid var(--line-subtle, #f1f5f9)",
                  transition: "background 100ms ease",
                }}
              >
                {columns.map((col) => {
                  const val = row[col.key];
                  const isPrimary = col.isPrimary;
                  return (
                    <td
                      key={col.key}
                      style={{
                        padding: "0.65rem 0.9rem",
                        textAlign: col.align || "left",
                        fontWeight: isPrimary || row.isHighlighted ? 700 : 500,
                        color:
                          row.isHighlighted && isPrimary
                            ? "var(--primary, #0284c7)"
                            : "var(--text-main, #0f172a)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {String(val ?? "-")}
                      {isPrimary && row.badge && (
                        <span
                          style={{
                            marginLeft: "0.5rem",
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            padding: "0.15rem 0.4rem",
                            borderRadius: "0.25rem",
                            background: "#0284c7",
                            color: "#ffffff",
                          }}
                        >
                          {row.badge}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Notes */}
      <div
        style={{
          padding: "0.65rem 1.25rem",
          background: "var(--surface, #f8fafc)",
          borderTop: "1px solid var(--line-subtle, #f1f5f9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "var(--text-muted, #64748b)",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span>{footerNote || "Values represent standard laboratory test baselines and continuous ratings."}</span>
        <span style={{ fontWeight: 600 }}>Source: {standardReference}</span>
      </div>
    </section>
  );
}
