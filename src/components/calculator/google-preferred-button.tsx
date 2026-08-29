"use client";

import { siteConfig } from "@/lib/site-config";
import { GOOGLE_PREFERRED_ACTIVE } from "@/components/calculator/google-preferred-banner";
export { GooglePreferredBanner, GOOGLE_PREFERRED_ACTIVE } from "@/components/calculator/google-preferred-banner";

interface GooglePreferredButtonProps {
  /**
   * Optional custom domain override. Defaults to domain parsed from siteConfig.url
   */
  domain?: string;
  /**
   * "banner" renders the full-width high-trust card with Option 4 messaging where the whole card is clickable.
   * "button" renders a 36px inline action button.
   */
  variant?: "banner" | "button";
  className?: string;
  /**
   * When true, hides the button.
   * Defaults to true (hidden) until PowerLab is verified in Google Preferred Sources.
   */
  hidden?: boolean;
}

export function GooglePreferredButton({
  domain,
  variant = "banner",
  className = "",
  hidden,
}: GooglePreferredButtonProps) {
  const isHidden = hidden !== undefined ? hidden : !GOOGLE_PREFERRED_ACTIVE;
  if (isHidden) {
    return null;
  }
  const targetDomain =
    domain ||
    (() => {
      try {
        return new URL(siteConfig.url).hostname.replace(/^www\./, "");
      } catch {
        return "powelab.org";
      }
    })();

  const targetUrl = `https://www.google.com/preferences/source?q=${encodeURIComponent(targetDomain)}`;

  // Google 4-color authentic "G" SVG
  const GoogleGIcon = ({ size = 18 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );

  // Crisp pushpin icon
  const PinIcon = ({ size = 13 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ transform: "rotate(45deg)", flexShrink: 0 }}
    >
      <path d="M16 3H8a1 1 0 0 0 0 2h1v5.59l-1.71 1.7A1 1 0 0 0 7 13v2a1 1 0 0 0 1 1h3v5a1 1 0 0 0 2 0v-5h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-.29-.71L15 10.59V5h1a1 1 0 0 0 0-2z" />
    </svg>
  );

  if (variant === "banner") {
    return (
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`google-preferred-banner ${className}`.trim()}
        title="Pin PowerLab to your Google preferences to see our calculators first in search and AI Overviews"
        aria-label="Found this helpful? Keep PowerLab first on Google — in 1 click, pin PowerLab to your Google preferences (opens in a new tab)"
        style={{
          width: "100%",
          marginTop: "1.1rem",
          padding: "0.85rem 1rem",
          borderRadius: "0.75rem",
          border: "1px solid var(--line, #d9d4c9)",
          background: "linear-gradient(135deg, var(--surface, #fffdf9) 0%, rgba(55, 94, 75, 0.05) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.85rem",
          flexWrap: "wrap",
          boxShadow: "0 2px 8px rgba(38, 68, 53, 0.04)",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", flex: "1 1 240px" }}>
          <div style={{ marginTop: "2px" }}>
            <GoogleGIcon size={20} />
          </div>
          <div>
            <strong
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--brand-strong, #264435)",
                lineHeight: 1.35,
              }}
            >
              Found this helpful? Keep PowerLab first on Google
            </strong>
            <span
              style={{
                display: "block",
                fontSize: "0.78rem",
                color: "var(--muted, #68736b)",
                marginTop: "0.15rem",
                lineHeight: 1.4,
              }}
            >
              In 1 click, pin PowerLab to your Google preferences. No forms, no sign-ups.
            </span>
          </div>
        </div>

        <span
          className="google-preferred-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            height: "36px",
            padding: "0 0.95rem",
            borderRadius: "0.5rem",
            background: "var(--brand, #375e4b)",
            color: "#ffffff",
            fontSize: "0.8125rem",
            fontWeight: 700,
            whiteSpace: "nowrap",
            boxShadow: "0 2px 6px rgba(38, 68, 53, 0.2)",
            transition: "all 140ms ease",
            flexShrink: 0,
          }}
        >
          <PinIcon size={13} />
          <span>Pin to Google</span>
        </span>
      </a>
    );
  }

  // Fallback inline action button
  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`button secondary-button google-preferred-btn ${className}`.trim()}
      title="Pin PowerLab to your Google preferences for top placement in search and AI Overviews"
      aria-label="Pin PowerLab to Google (opens in new tab)"
      style={{
        textDecoration: "none",
      }}
    >
      <GoogleGIcon size={15} />
      <span>Pin to Google</span>
      <PinIcon size={12} />
    </a>
  );
}
