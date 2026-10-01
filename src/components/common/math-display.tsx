"use client";

import React, { useState } from "react";

export interface MathDisplayProps {
  /** Textual formula to copy (plain math or LaTeX) */
  copyText?: string;
  /** Optional title for the formula box */
  title?: string;
  /** Custom formula JSX (e.g. using MathFraction, MathVar, etc.) or string */
  children?: React.ReactNode;
  /** Optional secondary condition or formula */
  condition?: React.ReactNode;
  /** Optional benchmark / example calculation text */
  benchmark?: React.ReactNode;
  /** Style variant: 'card' (boxed) or 'inline' */
  variant?: "card" | "inline";
}

/**
 * Reusable Mathematical Fraction Component
 */
export function MathFraction({
  numerator,
  denominator,
}: {
  numerator: React.ReactNode;
  denominator: React.ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        verticalAlign: "middle",
        textAlign: "center",
        padding: "0 0.35rem",
        margin: "0 0.2rem",
      }}
    >
      <span
        style={{
          borderBottom: "1.5px solid currentColor",
          paddingBottom: "0.15rem",
          display: "block",
          fontSize: "0.95em",
          lineHeight: 1.2,
        }}
      >
        {numerator}
      </span>
      <span
        style={{
          paddingTop: "0.15rem",
          display: "block",
          fontSize: "0.95em",
          lineHeight: 1.2,
        }}
      >
        {denominator}
      </span>
    </span>
  );
}

/**
 * Reusable Variable with Subscript & optional Superscript
 */
export function MathVar({
  symbol,
  sub,
  sup,
  italic = true,
}: {
  symbol: string;
  sub?: string | React.ReactNode;
  sup?: string | React.ReactNode;
  italic?: boolean;
}) {
  return (
    <span style={{ fontStyle: italic ? "italic" : "normal", fontFamily: '"STIX Two Math", "Cambria Math", "Times New Roman", serif' }}>
      {symbol}
      {sub && (
        <sub style={{ fontSize: "0.72em", fontStyle: "normal", marginLeft: "0.05rem", verticalAlign: "-0.25em" }}>
          {sub}
        </sub>
      )}
      {sup && (
        <sup style={{ fontSize: "0.72em", fontStyle: "normal", marginLeft: "0.05rem", verticalAlign: "0.45em" }}>
          {sup}
        </sup>
      )}
    </span>
  );
}

/**
 * Intelligent string math token formatter that automatically formats variables (with subscripts),
 * multiplication signs, inequality signs, and arrows.
 */
export function formatMathString(str: string): React.ReactNode {
  // Normalize operators and remove unwanted artifacts
  let clean = str
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1) / ($2)")
    .replace(/\\left\(/g, "(")
    .replace(/\\right\)/g, ")")
    .replace(/\\times/g, "×")
    .replace(/\\cdot/g, "·")
    .replace(/\\le/g, "≤")
    .replace(/\\ge/g, "≥")
    .replace(/\\implies/g, "⟹")
    .replace(/-->/g, "⟹")
    .replace(/=>/g, "⟹")
    .replace(/<=/g, "≤")
    .replace(/>=/g, "≥")
    .replace(/\*/g, "×")
    .replace(/÷/g, " / ")
    .replace(/\\beta/g, "β")
    .replace(/\\theta/g, "θ")
    .replace(/\\phi/g, "ϕ")
    .replace(/\\rho/g, "ρ")
    .replace(/\\gamma/g, "γ")
    .replace(/\\eta/g, "η")
    .replace(/\$/g, "");

  // If there is an implication/derivation arrow (⟹), split into clauses
  if (clean.includes("⟹")) {
    const parts = clean.split("⟹");
    return (
      <span style={{ display: "inline-flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        {formatMathExpression(parts[0].trim())}
        <span style={{ color: "#f59e0b", margin: "0 0.35rem", fontWeight: 700 }}>⟹</span>
        {formatMathExpression(parts[1].trim())}
      </span>
    );
  }

  return formatMathExpression(clean);
}

/**
 * Parses an algebraic expression, handling equations and vertical fractions automatically.
 */
function formatMathExpression(expr: string): React.ReactNode {
  // Check for equation with equality
  if (expr.includes(" = ")) {
    const eqIdx = expr.indexOf(" = ");
    const lhs = expr.substring(0, eqIdx).trim();
    const rhs = expr.substring(eqIdx + 3).trim();

    return (
      <span style={{ display: "inline-flex", alignItems: "center", flexWrap: "wrap", gap: "0.35rem" }}>
        <span>{formatSubscriptsAndSymbols(lhs)}</span>
        <span>=</span>
        <span>{formatRhs(rhs)}</span>
      </span>
    );
  }

  return formatRhs(expr);
}

/**
 * Handles fractions in RHS or standalone expressions
 */
function formatRhs(rhs: string): React.ReactNode {
  // Check if expression is a top-level division: A / B or (A) / B or (A) / (B)
  // Look for single division slash not inside complex nested brackets
  const slashMatch = rhs.match(/^(\(.+\)|[a-zA-Z0-9_·×\s\-\+\(\)]+)\s*\/\s*(\(.+\)|[a-zA-Z0-9_·×\s\-\+\(\)]+)$/);
  if (slashMatch && !rhs.includes(" / ") || (slashMatch && rhs.split("/").length === 2)) {
    let num = slashMatch[1].trim();
    let den = slashMatch[2].trim();

    // Strip wrapping parentheses if present
    if (num.startsWith("(") && num.endsWith(")")) {
      num = num.substring(1, num.length - 1).trim();
    }
    if (den.startsWith("(") && den.endsWith(")")) {
      den = den.substring(1, den.length - 1).trim();
    }

    return (
      <MathFraction
        numerator={<span>{formatSubscriptsAndSymbols(num)}</span>}
        denominator={<span>{formatSubscriptsAndSymbols(den)}</span>}
      />
    );
  }

  return formatSubscriptsAndSymbols(rhs);
}

/**
 * Converts words with underscores (e.g. I_source_cont) to MathVar and replaces symbols.
 */
function formatSubscriptsAndSymbols(text: string): React.ReactNode {
  // Split tokens by spaces and operators
  const tokens = text.split(/(\s+|[×≤≥=+\-·()÷])/);

  return tokens.map((token, idx) => {
    if (!token) return null;

    // Check if token is a variable with subscript: e.g. I_source_cont, P_dc_STC, A_cmil, V_nominal, DoD_max
    if (/^[a-zA-Z][a-zA-Z0-9]*_[a-zA-Z0-9_,]+$/.test(token)) {
      const underIdx = token.indexOf("_");
      const sym = token.substring(0, underIdx);
      const sub = token.substring(underIdx + 1).replace(/_/g, ", ");
      return <MathVar key={idx} symbol={sym} sub={sub} />;
    }

    // Single character variable: e.g. I, V, L, K, P, H, t
    if (/^[a-zA-Z]$/.test(token) && !["a", "an", "the", "in", "is", "or", "of", "to"].includes(token.toLowerCase())) {
      return <MathVar key={idx} symbol={token} />;
    }

    return <span key={idx}>{token}</span>;
  });
}

/**
 * Modern Mathematical Display Card Component
 */
export function MathDisplay({
  copyText,
  title = "Calculation Formula & Sizing Principle",
  children,
  condition,
  benchmark,
  variant = "card",
}: MathDisplayProps) {
  const [copied, setCopied] = useState(false);

  // Extract raw text for copying
  const resolvedCopyText =
    copyText || (typeof children === "string" ? children : undefined);

  const handleCopy = () => {
    if (!resolvedCopyText) return;
    navigator.clipboard.writeText(resolvedCopyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render children: if string, automatically parse and typeset it
  const renderedFormula =
    typeof children === "string" ? formatMathString(children) : children;

  const renderedCondition =
    typeof condition === "string" ? formatMathString(condition) : condition;

  if (variant === "inline") {
    return (
      <span
        style={{
          fontFamily: '"STIX Two Math", "Cambria Math", "Times New Roman", serif',
          fontSize: "1.05em",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {renderedFormula}
      </span>
    );
  }

  return (
    <div
      className="math-display-card"
      style={{
        borderRadius: "0.65rem",
        overflow: "hidden",
        border: "1px solid var(--border, #334155)",
        background: "linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 1) 100%)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        marginTop: "0.75rem",
        color: "#f8fafc",
      }}
    >
      {/* Math Card Header Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.45rem 0.85rem",
          background: "rgba(30, 41, 59, 0.8)",
          borderBottom: "1px solid rgba(51, 65, 85, 0.8)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ fontSize: "0.85rem", color: "#38bdf8" }}>∑</span>
          <span
            style={{
              fontSize: "0.74rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
              color: "#cbd5e1",
              textTransform: "uppercase",
            }}
          >
            {title}
          </span>
        </div>

        {resolvedCopyText && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy mathematical formula"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.2rem 0.55rem",
              borderRadius: "0.3rem",
              fontSize: "0.68rem",
              fontFamily: "ui-monospace, monospace",
              fontWeight: 600,
              background: copied ? "rgba(16, 185, 129, 0.25)" : "rgba(255, 255, 255, 0.08)",
              color: copied ? "#34d399" : "#cbd5e1",
              border: copied ? "1px solid #10b981" : "1px solid rgba(255, 255, 255, 0.15)",
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
          >
            {copied ? (
              <>
                <span>✓</span> Copied
              </>
            ) : (
              <>
                <span>📋</span> Copy Formula
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Mathematical Typeset Formula Body */}
      <div
        style={{
          padding: "1.1rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.65rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: '"STIX Two Math", "Cambria Math", "Times New Roman", "KaTeX_Main", serif',
            fontSize: "1.15rem",
            lineHeight: 1.6,
            color: "#38bdf8",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.4rem",
            textShadow: "0 0 16px rgba(56, 189, 248, 0.2)",
          }}
        >
          {renderedFormula}
        </div>

        {/* Optional Secondary Constraint / Condition */}
        {renderedCondition && (
          <div
            style={{
              fontSize: "0.85rem",
              fontFamily: '"STIX Two Math", "Cambria Math", "Times New Roman", serif',
              color: "#94a3b8",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              paddingTop: "0.25rem",
              borderTop: "1px dashed rgba(255, 255, 255, 0.1)",
            }}
          >
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#f59e0b", fontWeight: 700, letterSpacing: "0.04em" }}>
              Condition:
            </span>
            <span>{renderedCondition}</span>
          </div>
        )}
      </div>

      {/* Benchmark Example Footer */}
      {benchmark && (
        <div
          style={{
            padding: "0.55rem 0.95rem",
            background: "rgba(15, 23, 42, 0.6)",
            borderTop: "1px solid rgba(51, 65, 85, 0.6)",
            fontSize: "0.78rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.45rem",
            lineHeight: 1.45,
          }}
        >
          <span style={{ color: "#a78bfa", fontWeight: 700, flexShrink: 0, fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            Benchmark:
          </span>
          <span style={{ color: "#cbd5e1" }}>{benchmark}</span>
        </div>
      )}
    </div>
  );
}
