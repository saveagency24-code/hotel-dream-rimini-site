export type ConversionEventName =
  | "lead_form_submit"
  | "newsletter_submit"
  | "click_phone"
  | "click_whatsapp"
  | "click_email"
  | "booking_portal_click";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackConversion(eventName: ConversionEventName, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const payload = { event: eventName, ...params };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params || {});
  }
}
