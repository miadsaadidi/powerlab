"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            // Service worker registered successfully
          })
          .catch((err) => {
            console.debug("PWA service worker registration notice:", err);
          });
      });
    }
  }, []);

  return null;
}
