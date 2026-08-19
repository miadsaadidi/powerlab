"use client";

import { useEffect } from "react";

export function EmbedDetector() {
  useEffect(() => {
    const isEmbedParam = new URLSearchParams(window.location.search).get("embed") === "true";
    const isIframe = window.self !== window.top;

    if (isEmbedParam || isIframe) {
      document.documentElement.classList.add("embed-mode");
      document.body.classList.add("embed-mode");
    }
  }, []);

  return null;
}
