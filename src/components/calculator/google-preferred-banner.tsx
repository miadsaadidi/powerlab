"use client";

import { siteConfig } from "@/lib/site-config";

interface GooglePreferredBannerProps {
  /**
   * Optional custom CSS class name
   */
  className?: string;
  /**
   * Optional custom domain override. Defaults to domain parsed from siteConfig.url (powelab.org)
   */
  domain?: string;
  /**
   * When true, hides the banner.
   * Defaults to true (hidden) until PowerLab is verified and indexed in the Google Preferred Sources directory.
   */
  hidden?: boolean;
}

/**
 * Master release flag for Google Preferred Source banner.
 * Set to `true` once the property is indexed and searchable on https://www.google.com/preferences/source
 */
export const GOOGLE_PREFERRED_ACTIVE = true;

/**
 * Reusable Google Preferred Source card for all PowerLab calculators.
 * 
 * Usage in any calculator:
 * ```tsx
 * import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
 * 
 * // Inside your calculator results panel:
 * <GooglePreferredBanner />
 * ```
 */
export function GooglePreferredBanner({
  className = "",
  domain,
  hidden,
}: GooglePreferredBannerProps) {
  // If explicitly hidden or if the master switch is off (unless explicitly forced with hidden={false})
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
        {/* Google 4-color authentic "G" SVG */}
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ flexShrink: 0, marginTop: "2px" }}
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
            Save PowerLab to your Favorites
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
            In 1 click, add PowerLab to your preferred engineering tools. No forms, no sign-ups.
          </span>
        </div>
      </div>

      <span
        className="google-preferred-cta"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          height: "36px",
          padding: "0 0.95rem",
          borderRadius: "0.5rem",
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--line, #cbd5e1)",
          color: "var(--ink, #0f172a)",
          fontSize: "0.8125rem",
          fontWeight: 700,
          whiteSpace: "nowrap",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
          transition: "all 140ms ease",
          flexShrink: 0,
        }}
      >
        <svg
          width={16}
          height={16}
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
        <span>Add to Favorites</span>
      </span>
    </a>
  );
}
