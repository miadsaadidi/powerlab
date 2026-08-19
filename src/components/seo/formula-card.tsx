interface FormulaCardProps {
  title?: string;
  formula: string;
  formulaDescription?: string;
  variables: Array<{
    symbol: string;
    label: string;
    description: string;
    unit?: string;
  }>;
  notes?: string[];
}

export function FormulaCard({
  title = "Calculation Formula & Mathematical Methodology",
  formula,
  formulaDescription,
  variables,
  notes,
}: FormulaCardProps) {
  return (
    <section className="formula-card" aria-labelledby="formula-heading">
      <h2 id="formula-heading">{title}</h2>
      {formulaDescription && <p className="formula-intro">{formulaDescription}</p>}

      <div className="formula-box">
        <span className="formula-label">Formula</span>
        <code className="formula-expression">{formula}</code>
      </div>

      <div className="formula-glossary-section">
        <h3>Variable Definitions</h3>
        <dl className="formula-glossary">
          {variables.map((v) => (
            <div key={v.symbol} className="glossary-item">
              <dt>
                <code>{v.symbol}</code>
                <span>{v.label}</span>
                {v.unit && <small>({v.unit})</small>}
              </dt>
              <dd>{v.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      {notes && notes.length > 0 && (
        <div className="formula-notes">
          <h4>Engineering Notes &amp; Standards</h4>
          <ul>
            {notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
