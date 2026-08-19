"use client";

import { useEffect, useRef, useState } from "react";

interface ShareButtonProps {
  title?: string;
  text?: string;
  getShareUrl?: () => string;
  className?: string;
}

export function ShareButton({
  title = "PowerLab Energy Calculation",
  text = "Check out this energy planning calculation on PowerLab:",
  getShareUrl,
  className = "",
}: ShareButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const resolveUrl = () => (getShareUrl ? getShareUrl() : window.location.href);

  const handleShareClick = async () => {
    const url = resolveUrl();
    setShareUrl(url);

    // 1. If Web Share API is supported, try native OS share sheet
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch (err: unknown) {
        // If user cancelled, don't open modal. If error, fall through to modal.
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
      }
    }

    // 2. Otherwise open the rich share popover modal
    setModalOpen(true);
  };

  const handleCopy = async () => {
    try {
      const url = shareUrl || resolveUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (inputRef.current) {
        inputRef.current.select();
      }
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) {
        setModalOpen(false);
      }
    };
    if (modalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const encodedUrl = encodeURIComponent(shareUrl || (typeof window !== "undefined" ? window.location.href : ""));
  const encodedText = encodeURIComponent(`${text} `);

  return (
    <div className={`share-button-wrapper ${className}`.trim()}>
      <button
        type="button"
        className="button secondary-button share-btn"
        onClick={handleShareClick}
        aria-label="Share this calculation"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        <span>Share Calculation</span>
      </button>

      {modalOpen && (
        <div
          className="share-modal-backdrop"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
        >
          <div
            className="share-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="share-modal-header">
              <h3 id="share-modal-title" className="share-modal-title">Share this Calculation</h3>
              <button
                type="button"
                className="share-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close share dialog"
              >
                ✕
              </button>
            </div>

            <p className="share-modal-desc">
              Share your exact inputs and results with friends, clients, or online forums.
            </p>

            <div className="share-link-box">
              <input
                ref={inputRef}
                type="text"
                readOnly
                value={shareUrl}
                aria-label="Shareable link URL"
                className="share-link-input"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                type="button"
                className="button share-copy-action-btn"
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            <div className="share-social-grid">
              <a
                href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-share-btn share-reddit"
                aria-label="Share on Reddit"
              >
                <span>Reddit</span>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-share-btn share-x"
                aria-label="Share on X (Twitter)"
              >
                <span>X / Twitter</span>
              </a>
              <a
                href={`https://wa.me/?text=${encodedText}${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-share-btn share-whatsapp"
                aria-label="Share via WhatsApp"
              >
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}${encodedUrl}`}
                className="social-share-btn share-email"
                aria-label="Share via Email"
              >
                <span>Email</span>
              </a>
              <button
                type="button"
                className="social-share-btn"
                onClick={() => {
                  setModalOpen(false);
                  setTimeout(() => window.print(), 200);
                }}
                style={{
                  background: "var(--surface, #ffffff)",
                  border: "1px solid var(--border-color, #cbd5e1)",
                  color: "var(--ink)",
                  cursor: "pointer",
                }}
                aria-label="Print or Save PDF Spec Sheet"
              >
                <span>🖨️ Print / PDF</span>
              </button>
            </div>


            <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--border-color, #e2e8f0)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  🧩 Embed on Your Website or Blog
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    const embedHtml = `<iframe src="${shareUrl || resolveUrl()}" width="100%" height="600" style="border:1px solid #cbd5e1; border-radius:8px;" title="${title} — PowerLab"></iframe><p style="font-size:12px;text-align:right;"><a href="${shareUrl || resolveUrl()}" target="_blank">⚡ Powered by PowerLab</a></p>`;
                    await navigator.clipboard.writeText(embedHtml);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0284c7",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Copy Embed HTML
                </button>
              </div>
              <textarea
                readOnly
                rows={2}
                value={`<iframe src="${shareUrl || resolveUrl()}" width="100%" height="600" style="border:1px solid #cbd5e1; border-radius:8px;" title="${title} — PowerLab"></iframe><p style="font-size:12px;text-align:right;"><a href="${shareUrl || resolveUrl()}" target="_blank">⚡ Powered by PowerLab</a></p>`}
                style={{
                  width: "100%",
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--border-color, #cbd5e1)",
                  background: "var(--bg-secondary, #f8fafc)",
                  color: "var(--text-color, #0f172a)",
                  resize: "none",
                }}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

