"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
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
    <article className="page" style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <p className="eyebrow" style={{ color: "#ef4444" }}>Calculation Error</p>
      <h1>Something went wrong</h1>
      <p className="intro" style={{ margin: "1rem auto 2rem", maxWidth: "600px" }}>
        An unexpected error occurred while loading or processing this calculation.
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary"
          style={{ padding: "0.75rem 1.5rem", borderRadius: "0.5rem", cursor: "pointer" }}
        >
          Try Again
        </button>
        <Link
          href="/"
          className="btn-secondary"
          style={{ padding: "0.75rem 1.5rem", borderRadius: "0.5rem", textDecoration: "none" }}
        >
          Return Home
        </Link>
      </div>
    </article>
  );
}
