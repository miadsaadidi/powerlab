export type AnalyticsEvent =
  | "calculator_view"
  | "calculator_calculate"
  | "calculator_advanced_open"
  | "calculator_mode_change"
  | "calculator_appliance_add"
  | "calculator_preset_click"
  | "calculator_handoff";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, properties: Record<string, string | boolean | number> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("energy-tools:analytics", { detail: { event, properties } }));
  if (typeof window.gtag === "function") {
    window.gtag("event", event, properties);
  }
}
