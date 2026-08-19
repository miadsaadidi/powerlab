"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0b0f19", color: "#f8fafc", fontFamily: "system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", margin: 0 }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Application Error</h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>A critical error occurred while rendering the page.</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{ backgroundColor: "#0284c7", color: "#ffffff", border: "none", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600 }}
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
