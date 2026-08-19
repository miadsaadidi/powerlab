"use client";

import { useState } from "react";

interface SpecDataField {
  label: string;
  value: string | number;
  unit?: string;
}

interface ExportSpecButtonProps {
  title?: string;
  calculatorName: string;
  inputs?: SpecDataField[];
  results?: SpecDataField[];
  assumptions?: SpecDataField[];
}

export function ExportSpecButton({
  title = "Export Spec",
  calculatorName,
  inputs = [],
  results = [],
  assumptions = [],
}: ExportSpecButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const generateMarkdown = () => {
    const lines = [
      `# PowerLab Engineering Specification: ${calculatorName}`,
      `Generated: ${new Date().toUTCString()}`,
      `Source: ${typeof window !== "undefined" ? window.location.href : "https://powerlab.energy"}`,
      "",
      "## 1. Primary Calculation Results",
      "| Metric | Value | Unit |",
      "| :--- | :--- | :--- |",
      ...results.map((r) => `| ${r.label} | ${r.value} | ${r.unit ?? "-"} |`),
      "",
      "## 2. Input Parameters",
      "| Parameter | Value | Unit |",
      "| :--- | :--- | :--- |",
      ...inputs.map((i) => `| ${i.label} | ${i.value} | ${i.unit ?? "-"} |`),
      "",
      "## 3. Engineering Assumptions & Deratings",
      "| Assumption | Value | Unit |",
      "| :--- | :--- | :--- |",
      ...assumptions.map((a) => `| ${a.label} | ${a.value} | ${a.unit ?? "-"} |`),
      "",
      "---",
      "*PowerLab Deterministic Energy Planning Engine — Database-Free & Privacy Preserving*",
    ];
    return lines.join("\n");
  };

  const generateCsv = () => {
    const rows = [
      ["Section", "Parameter", "Value", "Unit"],
      ...results.map((r) => ["Result", `"${r.label}"`, `"${r.value}"`, `"${r.unit ?? ""}"`]),
      ...inputs.map((i) => ["Input", `"${i.label}"`, `"${i.value}"`, `"${i.unit ?? ""}"`]),
      ...assumptions.map((a) => ["Assumption", `"${a.label}"`, `"${a.value}"`, `"${a.unit ?? ""}"`]),
    ];
    return rows.map((r) => r.join(",")).join("\n");
  };

  const downloadFile = (content: string, filename: string, mimeType: string, typeLabel: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(typeLabel);
    setTimeout(() => {
      setDownloadSuccess(null);
      setIsOpen(false);
    }, 1500);
  };

  const handleDownloadMd = () => {
    const safeName = calculatorName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    downloadFile(generateMarkdown(), `${safeName}-spec.md`, "text/markdown", "Markdown Spec");
  };

  const handleDownloadCsv = () => {
    const safeName = calculatorName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    downloadFile(generateCsv(), `${safeName}-data.csv`, "text/csv", "CSV Sheet");
  };

  return (
    <div className="export-spec-wrapper" style={{ position: "relative", display: "inline-block" }}>
      <button
        className="button secondary-button export-spec-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        title="Download Calculation Spec Sheet (CSV or Markdown)"
      >
        <span aria-hidden="true">📑</span>
        <span>{title}</span>
      </button>

      {isOpen && (
        <div className="export-dropdown" role="menu">
          <p className="export-dropdown-title">Download Calculation Spec</p>
          <button className="export-dropdown-item" type="button" onClick={handleDownloadMd}>
            <span>📝</span> Download Markdown (.md)
          </button>
          <button className="export-dropdown-item" type="button" onClick={handleDownloadCsv}>
            <span>📊</span> Download CSV Data (.csv)
          </button>
          {downloadSuccess && (
            <p className="export-success-msg" role="status">✓ {downloadSuccess} downloaded!</p>
          )}
        </div>
      )}
    </div>
  );
}
